import type { IconName } from '@uandv/ui';

import { siteConfig } from './site';

/** Truthful platform metrics — no fabricated client statistics. */
export const launchPlatformStats = [
  {
    value: siteConfig.founded,
    staticDisplay: `Since ${siteConfig.founded}`,
    prefix: '',
    suffix: '',
    label: 'Serving businesses across India',
  },
  {
    value: 15,
    prefix: '',
    suffix: '+',
    label: 'Service capabilities',
  },
  {
    value: 10,
    prefix: '',
    suffix: '+',
    label: 'Industry solution areas',
  },
  {
    value: 6,
    prefix: '',
    suffix: '+',
    label: 'Interactive product demos',
  },
] as const;

/**
 * Partner-value statements — common priorities from client engagements.
 * Not attributed to fabricated individuals or logos.
 */
export const launchPartnerVoices = [
  {
    quote:
      'We needed one accountable partner for strategy, design, and technology — not three vendors handing work off to each other.',
    context: 'Priority from growing businesses',
  },
  {
    quote:
      'Clear planning before development saved us from expensive rework and kept our team aligned on what mattered first.',
    context: 'What founders value in delivery',
  },
  {
    quote:
      'Having branding, software, and marketing coordinated under one roof made our launch feel cohesive and professional.',
    context: 'What SMEs appreciate at launch',
  },
] as const;

export const launchTrustReasons = [
  {
    title: 'End-to-end business and technology support',
    description:
      'Strategy, branding, software, automation, and growth coordinated by one accountable partner.',
  },
  {
    title: 'Custom solutions, not one-size-fits-all packages',
    description:
      'Every engagement is scoped around your business model, customers, and stage — not a generic template.',
  },
  {
    title: 'Clear planning before development',
    description:
      'We align on goals, priorities, and practical next steps before design or engineering begins.',
  },
  {
    title: 'Long-term support after launch',
    description:
      'U&V stays involved beyond go-live with iteration, maintenance, and growth support when you need it.',
  },
  {
    title: 'Technology, branding, marketing, and growth under one roof',
    description:
      'Reduce vendor fragmentation with a single team that understands your full business picture.',
  },
] as const;

export type LaunchServiceCard = {
  slug: string;
  title: string;
  benefit: string;
  icon: IconName;
};

/** Primary services shown on the homepage — maps to `/services/[slug]`. */
export const launchPrimaryServices: LaunchServiceCard[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    benefit: 'Premium, fast websites that build trust and convert visitors.',
    icon: 'Globe',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    benefit: 'Native-quality apps for iOS and Android with clear user journeys.',
    icon: 'Smartphone',
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    benefit: 'Tailored platforms that match how your team actually works.',
    icon: 'Code2',
  },
  {
    slug: 'erp-software',
    title: 'ERP & CRM Solutions',
    benefit: 'Connected operations, sales, and customer data in one system.',
    icon: 'Layers',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    benefit: 'Practical AI that removes repetitive work and speeds decisions.',
    icon: 'Sparkles',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    benefit: 'SEO, content, and campaigns designed for measurable growth.',
    icon: 'Megaphone',
  },
  {
    slug: 'branding-logo-design',
    title: 'Branding & Design',
    benefit: 'Identity and visual systems that look credible from day one.',
    icon: 'Palette',
  },
  {
    slug: 'business-registration-support',
    title: 'Business Registration Support',
    benefit: 'Guidance through setup steps so you can start with confidence.',
    icon: 'FileText',
  },
  {
    slug: 'startup-business-consulting',
    title: 'Startup Launch Support',
    benefit: 'From idea validation to launch planning with a practical roadmap.',
    icon: 'Rocket',
  },
  {
    slug: 'startup-business-consulting',
    title: 'Business Growth Consulting',
    benefit: 'Clear priorities and technology choices as you scale.',
    icon: 'TrendingUp',
  },
];

export type IndustrySolutionCard = {
  title: string;
  description: string;
  icon: IconName;
  href: string;
  accent: 'violet' | 'sky' | 'amber' | 'emerald' | 'rose' | 'orange' | 'indigo' | 'teal' | 'navy' | 'fuchsia';
};

export const launchIndustrySolutions: IndustrySolutionCard[] = [
  {
    title: 'MLM Software',
    description: 'Genealogy, payouts, and distributor portals built for compliance-ready growth.',
    icon: 'Network',
    href: '/solutions/mlm-software',
    accent: 'violet',
  },
  {
    title: 'Travel & Tourism',
    description: 'Booking flows for agents, packages, and customer self-service.',
    icon: 'Plane',
    href: '/portfolio/travel-booking-website',
    accent: 'sky',
  },
  {
    title: 'Hotel & Restaurant',
    description: 'Reservations, operations, and guest experiences in one platform.',
    icon: 'UtensilsCrossed',
    href: '/portfolio/hotel-management-software',
    accent: 'amber',
  },
  {
    title: 'Food Delivery',
    description: 'Ordering, dispatch, and partner dashboards for delivery brands.',
    icon: 'Package',
    href: '/portfolio/restaurant-ordering-platform',
    accent: 'emerald',
  },
  {
    title: 'Taxi / Driver Platforms',
    description: 'Rider apps, driver tools, and dispatch for mobility businesses.',
    icon: 'Car',
    href: '/portfolio/taxi-booking-application',
    accent: 'rose',
  },
  {
    title: 'Retail & E-commerce',
    description: 'Catalogs, checkout, and growth systems for product-led brands.',
    icon: 'Store',
    href: '/portfolio/ecommerce-store',
    accent: 'orange',
  },
  {
    title: 'Education',
    description: 'School ERP, portals, and admin tools for institutions.',
    icon: 'GraduationCap',
    href: '/portfolio/school-erp-platform',
    accent: 'indigo',
  },
  {
    title: 'Healthcare',
    description: 'Patient journeys, scheduling, and clinic operations concepts.',
    icon: 'HeartPulse',
    href: '/portfolio/hospital-management-system',
    accent: 'teal',
  },
  {
    title: 'Financial Services',
    description: 'Secure workflows for advisors, clients, and operations teams.',
    icon: 'Wallet',
    href: '/business',
    accent: 'navy',
  },
  {
    title: 'Startup & SME Solutions',
    description: 'Launch-ready technology stacks for founders and growing teams.',
    icon: 'Building2',
    href: '/business',
    accent: 'fuchsia',
  },
];

export const launchProcessSteps = [
  {
    title: 'Discover',
    description: 'Understand your goals, customers, constraints, and success criteria.',
  },
  {
    title: 'Plan',
    description: 'Define scope, priorities, timeline, and the practical roadmap ahead.',
  },
  {
    title: 'Design',
    description: 'Shape brand, UX, and system architecture before development starts.',
  },
  {
    title: 'Develop',
    description: 'Build websites, apps, software, and automations with production quality.',
  },
  {
    title: 'Test',
    description: 'Validate flows, performance, and readiness across devices and roles.',
  },
  {
    title: 'Launch',
    description: 'Go live with deployment, training, and a clear handoff plan.',
  },
  {
    title: 'Support & Growth',
    description: 'Iterate, maintain, and scale with U&V as your long-term technology partner.',
  },
] as const;

export const industryAccentClasses: Record<
  IndustrySolutionCard['accent'],
  { border: string; bg: string; icon: string }
> = {
  violet: {
    border: 'border-violet-200',
    bg: 'bg-violet-50',
    icon: 'text-violet-700 bg-violet-100',
  },
  sky: {
    border: 'border-sky-200',
    bg: 'bg-sky-50',
    icon: 'text-sky-700 bg-sky-100',
  },
  amber: {
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    icon: 'text-amber-800 bg-amber-100',
  },
  emerald: {
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    icon: 'text-emerald-700 bg-emerald-100',
  },
  rose: {
    border: 'border-rose-200',
    bg: 'bg-rose-50',
    icon: 'text-rose-700 bg-rose-100',
  },
  orange: {
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    icon: 'text-orange-700 bg-orange-100',
  },
  indigo: {
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
    icon: 'text-indigo-700 bg-indigo-100',
  },
  teal: {
    border: 'border-teal-200',
    bg: 'bg-teal-50',
    icon: 'text-teal-700 bg-teal-100',
  },
  navy: {
    border: 'border-[#102A56]/20',
    bg: 'bg-[#f0f4fa]',
    icon: 'text-[#102A56] bg-[#102A56]/10',
  },
  fuchsia: {
    border: 'border-fuchsia-200',
    bg: 'bg-fuchsia-50',
    icon: 'text-fuchsia-700 bg-fuchsia-100',
  },
};
