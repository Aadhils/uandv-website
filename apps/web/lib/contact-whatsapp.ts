import { getServiceBySlug } from '@/lib/services';
import { buildWhatsAppUrl } from '@/lib/site';

export type ContactEnquiryHandoff = {
  reference?: string;
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

/** Prefill body for Contact enquiry WhatsApp handoff (optional fields omitted when empty). */
export function buildContactEnquiryWhatsAppMessage(
  enquiry: ContactEnquiryHandoff,
): string {
  const service = resolveContactServiceLabel(enquiry.interest);
  const phone = enquiry.phone?.trim();
  const company = enquiry.company?.trim();
  const reference = enquiry.reference?.trim();

  const lines = [
    'Hello U&V Team,',
    'I would like to submit an enquiry.',
    ...(reference ? ['', 'Reference ID:', reference] : []),
    '',
    'Name:',
    enquiry.name.trim(),
    'Email:',
    enquiry.email.trim(),
    ...(phone ? ['Phone:', phone] : []),
    ...(company ? ['Company:', company] : []),
    'Help with:',
    service,
    'Message:',
    enquiry.message.trim(),
  ];

  return lines.join('\n');
}

/** Opens WhatsApp app on mobile and WhatsApp Web on desktop. */
export function buildContactEnquiryWhatsAppUrl(
  enquiry: ContactEnquiryHandoff,
): string {
  return buildWhatsAppUrl(buildContactEnquiryWhatsAppMessage(enquiry));
}
