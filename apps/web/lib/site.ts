import type { IconName } from '@uandv/ui';

export const WHATSAPP_NUMBER = '919688884554';

export const DEFAULT_WHATSAPP_MESSAGE = [
  'Hello U&V Team,',
  'I would like to know more about your software and business solutions.',
  'Please contact me.',
].join('\n');

/** wa.me base URL without query — env may include legacy `?text` which we strip. */
export function getWhatsAppBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();
  if (configured) {
    return configured.split('?')[0] ?? `https://wa.me/${WHATSAPP_NUMBER}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}

/** Deep link for WhatsApp app and WhatsApp Web with optional pre-filled message. */
export function buildWhatsAppUrl(
  message: string = DEFAULT_WHATSAPP_MESSAGE,
): string {
  return `${getWhatsAppBaseUrl()}?text=${encodeURIComponent(message)}`;
}

export const siteConfig = {
  name: 'U&V',
  legalName: 'U&V Technologies',
  shortName: 'U&V',
  founded: 2020,
  tagline: 'Everything Your Business Needs Under One Roof.',
  footerDescription: [
    'Your Business Growth Partner.',
    'Everything your business needs under one roof.',
  ] as const,
  headline: 'Your Business Growth Partner',
  description:
    'U&V helps startups, SMEs, and enterprises launch, operate, and scale — from business idea and branding to software, automation, marketing, and long-term growth.',
  mission:
    'Follow dreams globally. We understand your business, the market you compete in, and the systems you need to grow with confidence.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://uandv.com',
  locale: 'en_IN',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@uandv.com',
  emailSecondary:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL_SECONDARY ?? 'uandv.com@gmail.com',
  /** WhatsApp deep link with default greeting — do not display phone digits on the Contact page */
  whatsapp: buildWhatsAppUrl(),
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    'https://linkedin.com/company/UandVi',
  social: {
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://facebook.com/UandV',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '',
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL ?? 'https://youtube.com/@UandV',
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ??
      'https://linkedin.com/company/UandVi',
    x: process.env.NEXT_PUBLIC_X_URL ?? 'https://x.com/UandVi',
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '',
  },
  /** Region only — no street address until officially provided */
  location: {
    region: 'Tamil Nadu',
    country: 'India',
  },
  hours: 'Mon–Sat, 10:00–19:00 IST',
} as const;

/**
 * Header + mobile marketing navigation (single source of truth).
 * Contact lives in the footer only.
 */
export const marketingNav = [
  { label: 'Home', href: '/' },
  { label: 'Business Solutions', href: '/business' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Why U&V', href: '/why-uandv' },
  { label: 'Digital Marketing', href: '/solutions/digital-marketing' },
  { label: 'MLM', href: '/solutions/mlm-software' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

export type MarketingSocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

/** Footer / contact social links — omits platforms without a configured URL. */
export function getMarketingSocialLinks(): MarketingSocialLink[] {
  const links: Array<MarketingSocialLink | null> = [
    {
      label: 'Email',
      href: `mailto:${siteConfig.email}`,
      icon: 'Mail',
    },
    {
      label: 'WhatsApp',
      href: siteConfig.whatsapp,
      icon: 'MessageCircle',
    },
    siteConfig.social.facebook
      ? {
          label: 'Facebook',
          href: siteConfig.social.facebook,
          icon: 'Facebook',
        }
      : null,
    siteConfig.social.instagram
      ? {
          label: 'Instagram',
          href: siteConfig.social.instagram,
          icon: 'Instagram',
        }
      : null,
    siteConfig.social.linkedin
      ? {
          label: 'LinkedIn',
          href: siteConfig.social.linkedin,
          icon: 'Linkedin',
        }
      : null,
    siteConfig.social.youtube
      ? {
          label: 'YouTube',
          href: siteConfig.social.youtube,
          icon: 'Youtube',
        }
      : null,
    siteConfig.social.x
      ? {
          label: 'X / Twitter',
          href: siteConfig.social.x,
          icon: 'Twitter',
        }
      : null,
    siteConfig.social.telegram
      ? {
          label: 'Telegram',
          href: siteConfig.social.telegram,
          icon: 'Send',
        }
      : null,
  ];

  return links.filter((link): link is MarketingSocialLink => Boolean(link));
}

export function formatLocation() {
  return `${siteConfig.location.region}, ${siteConfig.location.country}`;
}
