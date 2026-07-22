import { Resend } from 'resend';

import { siteConfig } from '@/lib/site';

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  message: string;
  /** Sprint 1 journey lead context */
  visitorType?: string;
  journey?: string;
  partnerType?: string;
  preferredLanguage?: string;
  sourcePage?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value);
}

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export function getResendFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL ??
    `${siteConfig.legalName} <onboarding@resend.dev>`
  );
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
    ['Name', payload.name],
    ['Email', payload.email],
    ['Phone', payload.phone || '—'],
    ['Company', payload.company || '—'],
    ['Interest', payload.interest || '—'],
    ['Visitor type', payload.visitorType || '—'],
    ['Selected journey', payload.journey || '—'],
    ['Partner type', payload.partnerType || '—'],
    ['Preferred language', payload.preferredLanguage || '—'],
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
      <p style="margin:0 0 16px;color:#475569;">Submitted via ${escapeHtml(siteConfig.url)}/contact</p>
      <table style="border-collapse:collapse;margin-bottom:16px;">${rows}</table>
      <p style="margin:0 0 8px;font-weight:600;">Message</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

export function buildConfirmationEmailHtml(payload: ContactPayload) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h2 style="margin:0 0 12px;font-size:20px;">Thank you, ${escapeHtml(payload.name)}.</h2>
      <p style="margin:0 0 12px;">We received your enquiry and will respond within 24 business hours.</p>
      <p style="margin:0 0 12px;color:#475569;">If you need a faster reply, you can also message us on WhatsApp from our contact page.</p>
      <p style="margin:0;">— ${escapeHtml(siteConfig.legalName)}</p>
    </div>
  `;
}
