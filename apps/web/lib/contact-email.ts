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
/** Must match the domain shown as Verified in Resend → Domains (override via RESEND_MAIL_DOMAIN). */
const DEFAULT_MAIL_DOMAIN = 'uandv.com';
const ALLOWED_FROM_LOCAL_PARTS = ['enquiries', 'info'] as const;

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

function stripEnvQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

/**
 * Verified sending domain — must match Resend Domains exactly (e.g. uandv.com
 * or send.uandv.com). Do not derive from NEXT_PUBLIC_SITE_URL.
 */
export function getVerifiedMailDomain(): string {
  const configured = process.env.RESEND_MAIL_DOMAIN?.trim().toLowerCase();
  if (configured) {
    return configured.replace(/^www\./, '');
  }
  return DEFAULT_MAIL_DOMAIN;
}

/** Pull the mailbox from `Name <email@domain>` or a bare address. */
export function extractEmailAddress(raw: string): string | null {
  const trimmed = stripEnvQuotes(raw.trim());
  if (!trimmed) return null;

  if (EMAIL_RE.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  const match = trimmed.match(FROM_WITH_NAME_RE);
  if (!match) return null;

  const email = match[2]?.trim().toLowerCase();
  return email && EMAIL_RE.test(email) ? email : null;
}

/** Normalize env values that may include display names or stray whitespace. */
export function normalizeMailbox(raw: string | undefined | null): string | null {
  if (!raw?.trim()) return null;
  return extractEmailAddress(raw);
}

function isAllowedFromEmail(email: string): boolean {
  const domain = getVerifiedMailDomain();
  if (!email.endsWith(`@${domain}`)) return false;
  if (email.includes('@resend.dev')) return false;
  const local = email.split('@')[0];
  return (ALLOWED_FROM_LOCAL_PARTS as readonly string[]).includes(local);
}

function defaultFromEmail(): string {
  const domain = getVerifiedMailDomain();
  const local =
    process.env.RESEND_FROM_LOCAL_PART?.trim().toLowerCase() || 'enquiries';
  if ((ALLOWED_FROM_LOCAL_PARTS as readonly string[]).includes(local)) {
    return `${local}@${domain}`;
  }
  return `enquiries@${domain}`;
}

/**
 * Verified sender for Resend `from` — bare mailbox only (no display names).
 * Allowed: enquiries@{domain} or info@{domain}.
 */
export function getResendFromEmail(): string {
  const configuredRaw = process.env.RESEND_FROM_EMAIL?.trim() ?? null;
  const configured = configuredRaw ? normalizeMailbox(configuredRaw) : null;

  if (configured && isAllowedFromEmail(configured)) {
    return configured;
  }

  if (configured || configuredRaw) {
    console.warn('[contact-email] RESEND_FROM_EMAIL invalid for verified domain; using default', {
      envResendFromEmail: configuredRaw,
      parsed: configured,
      verifiedDomain: getVerifiedMailDomain(),
      defaultFrom: defaultFromEmail(),
    });
  }

  return defaultFromEmail();
}

export function getResendFromAddress(): string {
  return getResendFromEmail();
}

/** Primary team inbox for new enquiry notifications. */
export function getContactNotificationEmail(): string {
  const candidates = [
    process.env.CONTACT_TO_EMAIL,
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    siteConfig.email,
  ];

  for (const candidate of candidates) {
    const email = normalizeMailbox(candidate);
    if (email) return email;
  }

  return `info@${getVerifiedMailDomain()}`;
}

export type ResendMailConfig = {
  envResendFromEmail: string | null;
  envContactToEmail: string | null;
  envResendMailDomain: string | null;
  verifiedDomain: string;
  from: string;
  to: string;
};

export function getResendMailConfig(): ResendMailConfig {
  return {
    envResendFromEmail: process.env.RESEND_FROM_EMAIL?.trim() ?? null,
    envContactToEmail: process.env.CONTACT_TO_EMAIL?.trim() ?? null,
    envResendMailDomain: process.env.RESEND_MAIL_DOMAIN?.trim() ?? null,
    verifiedDomain: getVerifiedMailDomain(),
    from: getResendFromEmail(),
    to: getContactNotificationEmail(),
  };
}

export type ResendSendPayload = {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
};

export function buildEnquirySendPayload(input: {
  reference: string;
  payload: ContactPayload;
}): ResendSendPayload {
  const from = getResendFromEmail();
  const to = getContactNotificationEmail();
  const replyTo = normalizeMailbox(input.payload.email) ?? undefined;

  const subject = `[${input.reference}] New enquiry from ${input.payload.name}${
    input.payload.company ? ` - ${input.payload.company}` : ''
  }`;

  return {
    from,
    to: [to],
    ...(replyTo ? { replyTo } : {}),
    subject,
    html: buildEnquiryEmailHtml(input.payload),
  };
}

export function buildConfirmationSendPayload(input: {
  reference: string;
  payload: ContactPayload;
}): ResendSendPayload {
  const from = getResendFromEmail();
  const to = normalizeMailbox(input.payload.email);
  if (!to) {
    throw new Error('Invalid customer email for confirmation.');
  }

  return {
    from,
    to: [to],
    subject: `We received your enquiry ${input.reference} - ${siteConfig.name}`,
    html: buildConfirmationEmailHtml(input.payload),
  };
}

/** Team inbox — notification address plus optional secondary copy. */
export function getContactToEmails(): string[] {
  const primary = getContactNotificationEmail();
  const secondary = normalizeMailbox(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL_SECONDARY?.trim() ||
      siteConfig.emailSecondary,
  );
  const emails = [primary];
  if (secondary) {
    emails.push(secondary);
  }
  return Array.from(new Set(emails));
}

export function serializeResendError(error: unknown): string {
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

export function serializeResendResponse(response: {
  data: unknown;
  error: unknown;
}): string {
  try {
    return JSON.stringify(response, null, 2);
  } catch {
    return String(response);
  }
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
