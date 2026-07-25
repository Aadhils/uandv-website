import { getServiceBySlug } from '@/lib/services';
import { buildWhatsAppUrl, siteConfig } from '@/lib/site';

export type ContactEnquiryHandoff = {
  reference: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  message: string;
};

export function resolveContactServiceLabel(interestSlug?: string): string {
  const slug = interestSlug?.trim();
  if (!slug) return 'General enquiry';

  const service = getServiceBySlug(slug);
  if (service) return service.title;

  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Full enquiry handoff for the Contact page success-state WhatsApp button. */
export function buildContactEnquiryWhatsAppMessage(
  enquiry: ContactEnquiryHandoff,
): string {
  const service = resolveContactServiceLabel(enquiry.interest);
  const phone = enquiry.phone?.trim() || '—';
  const company = enquiry.company?.trim() || '—';

  return [
    'Hello U&V Team,',
    'A new enquiry has been submitted.',
    'Reference ID:',
    enquiry.reference,
    'Name:',
    enquiry.name,
    'Email:',
    enquiry.email,
    'Phone:',
    phone,
    'Company:',
    company,
    'Interested Service:',
    service,
    'Message:',
    enquiry.message.trim(),
    'Submitted via:',
    siteConfig.url,
  ].join('\n');
}

/** Opens WhatsApp app on mobile and WhatsApp Web on desktop. */
export function buildContactEnquiryWhatsAppUrl(
  enquiry: ContactEnquiryHandoff,
): string {
  return buildWhatsAppUrl(buildContactEnquiryWhatsAppMessage(enquiry));
}
