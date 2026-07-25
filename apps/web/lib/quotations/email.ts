import {
  escapeHtml,
  getContactNotificationEmail,
  getResendClient,
  getResendFromEmail,
} from '@/lib/contact-email';
import { formatInr, formatQuotationDate } from '@/lib/quotations/format';
import { siteConfig } from '@/lib/site';

export type QuotationEmailQuotation = {
  quotationNumber: string;
  title: string;
  customerName: string;
  customerEmail: string;
  grandTotal: string;
  validityDate: Date;
  quotationId: string;
};

function dashboardQuotationUrl(quotationId: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}/dashboard/quotations/${quotationId}`;
}

export async function sendQuotationToCustomerEmail(
  quotation: QuotationEmailQuotation,
): Promise<{ sent: boolean }> {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[quotation-email] Resend not configured; skipping customer email');
    return { sent: false };
  }

  const viewUrl = dashboardQuotationUrl(quotation.quotationId);
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;">
      <h2 style="margin:0 0 12px;font-size:22px;">Your quotation from ${escapeHtml(siteConfig.name)}</h2>
      <p style="margin:0 0 16px;">Dear ${escapeHtml(quotation.customerName)},</p>
      <p style="margin:0 0 16px;">We have prepared quotation <strong>${escapeHtml(quotation.quotationNumber)}</strong> for <strong>${escapeHtml(quotation.title)}</strong>.</p>
      <table style="border-collapse:collapse;margin:0 0 20px;">
        <tr><td style="padding:4px 16px 4px 0;color:#64748b;">Amount</td><td><strong>${escapeHtml(formatInr(quotation.grandTotal))}</strong></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#64748b;">Valid until</td><td>${escapeHtml(formatQuotationDate(quotation.validityDate))}</td></tr>
      </table>
      <p style="margin:0 0 20px;">Sign in to your customer workspace to review, accept, or reject this quotation.</p>
      <p style="margin:0 0 24px;"><a href="${escapeHtml(viewUrl)}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;">View quotation</a></p>
      <p style="margin:0;color:#64748b;font-size:14px;">If the button does not work, copy this link: ${escapeHtml(viewUrl)}</p>
      <p style="margin:24px 0 0;">— ${escapeHtml(siteConfig.legalName)}</p>
    </div>
  `;

  await resend.emails.send({
    from: getResendFromEmail(),
    to: [quotation.customerEmail],
    subject: `Quotation ${quotation.quotationNumber} from ${siteConfig.name}`,
    html,
  });

  return { sent: true };
}

export async function notifyAdminQuotationResponseEmail(input: {
  quotationNumber: string;
  customerName: string;
  customerEmail: string;
  action: 'accepted' | 'rejected';
  reason?: string | null;
}): Promise<{ sent: boolean }> {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[quotation-email] Resend not configured; skipping admin notification');
    return { sent: false };
  }

  const actionLabel = input.action === 'accepted' ? 'Accepted' : 'Rejected';
  const reasonBlock =
    input.action === 'rejected' && input.reason
      ? `<p style="margin:16px 0 0;"><strong>Reason:</strong> ${escapeHtml(input.reason)}</p>`
      : '';

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
      <h2 style="margin:0 0 12px;">Quotation ${escapeHtml(actionLabel)}</h2>
      <p style="margin:0 0 8px;"><strong>${escapeHtml(input.quotationNumber)}</strong></p>
      <p style="margin:0;">Customer: ${escapeHtml(input.customerName)} (${escapeHtml(input.customerEmail)})</p>
      ${reasonBlock}
    </div>
  `;

  await resend.emails.send({
    from: getResendFromEmail(),
    to: [getContactNotificationEmail()],
    subject: `[${input.quotationNumber}] Quotation ${actionLabel.toLowerCase()} by customer`,
    html,
  });

  return { sent: true };
}
