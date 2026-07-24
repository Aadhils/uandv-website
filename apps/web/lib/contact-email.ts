import { Resend } from 'resend';

import { siteConfig } from '@/lib/site';

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  message: string;
  visitorType?: string;
  journey?: string;
  partnerType?: string;
  preferredLanguage?: string;
  sourcePage?: string;
  reference?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM_WITH_NAME_RE = /^(.+?)\s*<([^>]+)>$/;

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value);
}

/** Trim and reject blank keys — empty string must not pass as configured. */
export function getResendApiKey(): string | undefined {
  const key = process.env.RESEND_API_KEY?.trim();
  return key ? key : undefined;
}

export function getResendClient() {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

function getSiteMailDomain(): string {
  try {
    return new URL(siteConfig.url).hostname.replace(/^www\./i, '');
  } catch {
    return 'uandv.com';
  }
}

/**
 * RFC-safe From header — quote display names that contain &, commas, etc.
 * Resend expects: `"U&V Technologies" <enquiries@uandv.com>`
 */
export function formatResendFromAddress(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;

  const bareEmail = trimmed.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ? trimmed
    : null;
  if (bareEmail) {
    return bareEmail;
  }

  const match = trimmed.match(FROM_WITH_NAME_RE);
  if (!match) {
    return trimmed;
  }

  let [, name, email] = match;
  name = name.trim().replace(/^["']|["']$/g, '');
  email = email.trim();

  if (/[,;@<>()[\]\\.:]|&/.test(name) && !name.startsWith('"')) {
    name = `"${name.replace(/"/g, '\\"')}"`;
  }

  return `${name} <${email}>`;
}

function defaultProductionFromAddress(): string {
  const domain = getSiteMailDomain();
  return formatResendFromAddress(
    `"${siteConfig.legalName}" <enquiries@${domain}>`,
  );
}

function defaultDevelopmentFromAddress(): string {
  return formatResendFromAddress(
    `"${siteConfig.legalName}" <onboarding@resend.dev>`,
  );
}

/**
 * Sender for Resend. In production, never use @resend.dev — it only delivers
 * to the Resend account owner (403 for info@uandv.com and other recipients).
 */
export function getResendFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  const fallback =
    process.env.NODE_ENV === 'production'
      ? defaultProductionFromAddress()
      : defaultDevelopmentFromAddress();

  let from = formatResendFromAddress(configured || fallback);

  if (
    process.env.NODE_ENV === 'production' &&
    /@resend\.dev>/i.test(from)
  ) {
    const corrected = defaultProductionFromAddress();
    console.warn(
      '[contact-email] RESEND_FROM_EMAIL uses @resend.dev in production; using verified domain sender instead:',
      corrected,
    );
    from = corrected;
  }

  return from;
}

/** Primary team inbox for new enquiry notifications. */
export function getContactNotificationEmail(): string {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    siteConfig.email
  );
}

/** Team inbox — notification address plus optional secondary copy. */
export function getContactToEmails(): string[] {
  const primary = getContactNotificationEmail();
  const secondary =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL_SECONDARY?.trim() ||
    siteConfig.emailSecondary;
  return Array.from(new Set([primary, secondary].filter(Boolean)));
}

export function formatResendError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return String(error);
  }
  const record = error as {
    message?: string;
    name?: string;
    statusCode?: number;
  };
  return [record.name, record.message, record.statusCode]
    .filter((part) => part !== undefined && part !== '')
    .join(' — ');
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function buildEnquiryEmailHtml(payload: ContactPayload) {
  const rows = [
    ['Reference', payload.reference || '—'],
    ['Name', payload.name],
    ['Email', payload.email],
    ['Phone', payload.phone || '—'],
    ['Company', payload.company || '—'],
    ['Interest', payload.interest || '—'],
    ['Visitor type', payload.visitorType || '—'],
    ['Selected journey', payload.journey || '—'],
    ['Partner type', payload.partnerType || '—'],
    ['Guide language', payload.preferredLanguage || '—'],
    ['Source page', payload.sourcePage || '—'],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h2 style="margin:0 0 12px;font-size:20px;">New website enquiry</h2>
      <p style="margin:0 0 16px;color:#475569;">Submitted via ${escapeHtml(siteConfig.url)}</p>
      <table style="border-collapse:collapse;margin-bottom:16px;">${rows}</table>
      <p style="margin:0 0 8px;font-weight:600;">Message</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

export function buildConfirmationEmailHtml(payload: ContactPayload) {
  const referenceLine = payload.reference
    ? `<p style="margin:0 0 12px;">Your enquiry reference is <strong>${escapeHtml(payload.reference)}</strong>.</p>`
    : '';

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h2 style="margin:0 0 12px;font-size:20px;">Thank you, ${escapeHtml(payload.name)}.</h2>
      <p style="margin:0 0 12px;">We received your enquiry and will respond within 24 business hours.</p>
      ${referenceLine}
      <p style="margin:0 0 12px;color:#475569;">If you need a faster reply, you can also message us on WhatsApp from our contact page.</p>
      <p style="margin:0;">— ${escapeHtml(siteConfig.legalName)}</p>
    </div>
  `;
}
