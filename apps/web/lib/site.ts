import type { IconName } from '@uandv/ui';

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
  { label: 'Business Solutions', href: '/business-consulting' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Why U&V', href: '/why-uandv' },
  { label: 'Digital Marketing', href: '/solutions/digital-marketing' },
  { label: 'MLM', href: '/solutions/mlm-software' },
  { label: 'FAQ', href: '/faq' },
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
