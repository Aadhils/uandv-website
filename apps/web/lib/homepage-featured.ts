import type { IconName } from '@uandv/ui';

export type FeaturedIndustryCard = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

export const featuredIndustries: FeaturedIndustryCard[] = [
  {
    title: 'MLM Software',
    description: 'Distributor portals, genealogy, and payout operations.',
    href: '/mlm',
    icon: 'Network',
  },
  {
    title: 'Travel & Tourism',
    description: 'Booking flows for agents, packages, and travelers.',
    href: '/portfolio/travel-booking-website',
    icon: 'Plane',
  },
  {
    title: 'Retail & E-commerce',
    description: 'Storefronts, catalogs, and conversion-focused commerce.',
    href: '/portfolio/ecommerce-store',
    icon: 'Store',
  },
  {
    title: 'Financial Technology Solutions',
    description:
      'Secure platforms for brokers, advisors, research firms, and FinTech startups.',
    href: '/fintech',
    icon: 'Wallet',
  },
];

export const homepageWhyChooseCount = 3;

export type BusinessEcosystemCard = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

/** Consolidated homepage ecosystem — full catalogs live on inner pages. */
export const businessEcosystemCards: BusinessEcosystemCard[] = [
  {
    title: 'Company Registration',
    description: 'Structure, documentation, and launch readiness with guided support.',
    href: '/services/business-registration-support',
    icon: 'Briefcase',
  },
  {
    title: 'Legal & Compliance',
    description: 'Policies, filings, and compliance coordination through trusted specialists.',
    href: '/business-solutions',
    icon: 'FileText',
  },
  {
    title: 'Logo & Branding',
    description: 'Identity systems that make your business look credible from day one.',
    href: '/services/branding-logo-design',
    icon: 'Palette',
  },
  {
    title: 'Website & Mobile Apps',
    description: 'Fast, conversion-focused websites and mobile apps built for growth.',
    href: '/services/website-development',
    icon: 'Smartphone',
  },
  {
    title: 'Custom Software Development',
    description: 'Software shaped around your workflows — not generic templates.',
    href: '/services/custom-software-development',
    icon: 'Code2',
  },
  {
    title: 'AI Automation',
    description: 'Practical AI that removes busywork and speeds decisions.',
    href: '/services/ai-automation',
    icon: 'Bot',
  },
  {
    title: 'Digital Marketing',
    description: 'Campaigns and systems that attract the right customers.',
    href: '/digital-marketing',
    icon: 'Megaphone',
  },
  {
    title: 'Startup & Growth Planning',
    description: 'Business roadmaps, prioritisation, and founder guidance from idea to scale.',
    href: '/startup',
    icon: 'Wallet',
  },
  {
    title: 'Startup Support',
    description: 'Roadmaps, prioritization, and founder guidance from idea to launch.',
    href: '/startup',
    icon: 'Rocket',
  },
  {
    title: 'Vendor & Partner Network',
    description: 'Curated specialists for delivery beyond our core team when you need them.',
    href: '/partners',
    icon: 'Handshake',
  },
  {
    title: 'Long-term Business Growth Support',
    description: 'A sustained partnership across technology, brand, and revenue expansion.',
    href: '/why-uandv',
    icon: 'TrendingUp',
  },
];
