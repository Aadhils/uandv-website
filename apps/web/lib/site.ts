export const siteConfig = {
  name: 'U&V',
  legalName: 'U&V Technologies',
  shortName: 'U&V',
  founded: 2020,
  tagline: 'Everything your business needs under one roof.',
  footerDescription: [
    'Everything your business needs under one roof.',
    'AI • Software • Digital Transformation.',
  ] as const,
  headline: 'Your AI-powered business technology & growth partner.',
  description:
    'U&V helps startups, SMEs, and enterprises start, build, grow, and scale through technology, innovation, and trusted partnerships — from business setup to custom software, AI automation, and digital growth.',
  mission:
    'Follow dreams globally. We understand your business, the market you compete in, and the systems you need to grow with confidence.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://uandv.com',
  locale: 'en_IN',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@uandv.com',
  emailSecondary:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL_SECONDARY ?? 'uandv.com@gmail.com',
  /** WhatsApp deep link — do not display phone digits on the Contact page */
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    'https://wa.me/919688884554',
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    'https://linkedin.com/company/UandVi',
  social: {
    facebook: 'https://facebook.com/UandV',
    youtube: 'https://youtube.com/@UandV',
    linkedin: 'https://linkedin.com/company/UandVi',
    x: 'https://x.com/UandVi',
  },
  /** Region only — no street address until officially provided */
  location: {
    region: 'Tamil Nadu',
    country: 'India',
  },
  hours: 'Mon–Sat, 10:00–19:00 IST',
} as const;

export const marketingNav = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Why U&V', href: '/why-uandv' },
  { label: 'Business Solutions', href: '/business-consulting' },
  { label: 'MLM', href: '/solutions/mlm-software' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export function formatLocation() {
  return `${siteConfig.location.region}, ${siteConfig.location.country}`;
}
