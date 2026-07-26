export const contactPositioning = {
  eyebrow: 'Get in touch',
  headline: 'Let\u2019s understand your business before we recommend anything.',
  subheadline:
    'Whether you prefer the enquiry form, email, or WhatsApp — reaching U&V is straightforward. Share where you are today and what you want to achieve, and we will respond with practical next steps.',
  responseTime: 'Response within 24 business hours.',
} as const;

export const contactTrustPoints = [
  'Honest consultation',
  'Practical recommendations',
  'Long-term partnership',
  'No pressure to buy',
] as const;

export const contactEnquirySteps = [
  {
    title: 'Tell us about your business',
    description: 'Share your goals, stage, and what you are trying to solve.',
  },
  {
    title: 'We review your requirements',
    description: 'We read your enquiry carefully and match it to the right expertise.',
  },
  {
    title: 'We recommend the right solution',
    description: 'You receive practical guidance — not a generic sales pitch.',
  },
  {
    title: 'We contact you to discuss next steps',
    description: 'A clear conversation about scope, timing, and how U&V can help.',
  },
] as const;

export const contactChannels = {
  heading: 'How to reach us',
  description:
    'Choose the channel that suits you. We respond during business hours with clear, honest follow-up.',
} as const;

export const contactFormCopy = {
  title: 'Send your enquiry',
  description:
    'This is the only enquiry form on our website — every consultation CTA across U&V leads here.',
  requiredNote: 'Fields marked with * are required.',
  submitIdle: 'Submit enquiry',
  submitSending: 'Sending your enquiry…',
  submitHint: 'We typically respond within 24 business hours.',
  messageHint:
    'Share your business, goals, timeline, and any context that helps us understand what you need.',
  phoneHint: 'Optional — helps us reach you faster if needed.',
} as const;

export const contactSuccessCopy = {
  title: 'Thank you — we\u2019ve received your enquiry.',
  body:
    'A member of the U&V team will review your requirements and contact you within 24 business hours to discuss practical next steps. No pressure — just clarity on what makes sense for your business.',
  whatsappCta: 'Share details on WhatsApp',
  anotherMessage: 'Send another enquiry',
} as const;
