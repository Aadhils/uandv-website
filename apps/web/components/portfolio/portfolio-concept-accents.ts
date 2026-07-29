import type { CSSProperties } from 'react';

import type { CaseStudy, PortfolioCategory } from '@/lib/portfolio';

export type PortfolioAccent = {
  a: string;
  b: string;
  glow: string;
  /** Short family label for QA / reports */
  family: string;
};

/** Safe default when slug/category accent lookup fails — keeps the page rendering. */
export const FALLBACK_PORTFOLIO_ACCENT: PortfolioAccent = {
  family: 'brand',
  a: '#A78BFA',
  b: '#7C3AED',
  glow: 'rgb(124 58 237 / 0.14)',
};

/**
 * Distinct U&V-family accents per concept (slug).
 * Grid order (3-col): no three neighbours share the same / near-identical family.
 */
export const portfolioConceptAccents: Record<string, PortfolioAccent> = {
  'restaurant-ordering-platform': {
    family: 'coral',
    a: '#FB7185',
    b: '#E11D48',
    glow: 'rgb(225 29 72 / 0.28)',
  },
  'travel-booking-website': {
    family: 'cyan',
    a: '#67E8F9',
    b: '#0891B2',
    glow: 'rgb(8 145 178 / 0.3)',
  },
  'mlm-management-software': {
    family: 'violet',
    a: '#C4B5FD',
    b: '#7C3AED',
    glow: 'rgb(124 58 237 / 0.32)',
  },
  'taxi-booking-application': {
    family: 'emerald',
    a: '#6EE7B7',
    b: '#059669',
    glow: 'rgb(5 150 105 / 0.3)',
  },
  'enterprise-erp-crm-software': {
    family: 'deep-navy',
    a: '#93C5FD',
    b: '#1E3A8A',
    glow: 'rgb(30 58 138 / 0.28)',
  },
  'travel-tourism-management-suite': {
    family: 'sky',
    a: '#7DD3FC',
    b: '#0284C7',
    glow: 'rgb(2 132 199 / 0.3)',
  },
  'business-erp-system': {
    family: 'indigo',
    a: '#A5B4FC',
    b: '#4F46E5',
    glow: 'rgb(79 70 229 / 0.3)',
  },
  'ecommerce-store': {
    family: 'magenta',
    a: '#F0ABFC',
    b: '#C026D3',
    glow: 'rgb(192 38 211 / 0.28)',
  },
  'hotel-management-software': {
    family: 'amber',
    a: '#FCD34D',
    b: '#D97706',
    glow: 'rgb(217 119 6 / 0.28)',
  },
  'ai-customer-support-automation': {
    family: 'ultraviolet',
    a: '#D8B4FE',
    b: '#6D28D9',
    glow: 'rgb(109 40 217 / 0.32)',
  },
  'corporate-website-platform': {
    family: 'electric-blue',
    a: '#60A5FA',
    b: '#2563EB',
    glow: 'rgb(37 99 235 / 0.3)',
  },
  'field-operations-mobile-app': {
    family: 'lavender',
    a: '#DDD6FE',
    b: '#6366F1',
    glow: 'rgb(99 102 241 / 0.28)',
  },
  'sales-crm-platform': {
    family: 'rose',
    a: '#FDA4AF',
    b: '#BE123C',
    glow: 'rgb(190 18 60 / 0.26)',
  },
  'hospital-management-system': {
    family: 'teal',
    a: '#5EEAD4',
    b: '#0F766E',
    glow: 'rgb(15 118 110 / 0.3)',
  },
  'school-erp-platform': {
    family: 'gold',
    a: '#FBBF24',
    b: '#B45309',
    glow: 'rgb(180 83 9 / 0.28)',
  },
};

/** Category fallback when a slug is unknown — still U&V-family, used rarely. */
export const portfolioCategoryAccents: Record<
  Exclude<PortfolioCategory, 'All'>,
  PortfolioAccent
> = {
  'Website Development': portfolioConceptAccents['corporate-website-platform'],
  'Mobile Apps': {
    family: 'lavender',
    a: '#C4B5FD',
    b: '#6366F1',
    glow: 'rgb(99 102 241 / 0.22)',
  },
  'MLM Software': portfolioConceptAccents['mlm-management-software'],
  'ERP Systems': portfolioConceptAccents['business-erp-system'],
  'CRM Solutions': portfolioConceptAccents['sales-crm-platform'],
  'Restaurant POS': portfolioConceptAccents['restaurant-ordering-platform'],
  'Taxi Booking': portfolioConceptAccents['taxi-booking-application'],
  'Travel & Tourism': portfolioConceptAccents['travel-booking-website'],
  'Hospital Management': portfolioConceptAccents['hospital-management-system'],
  'School ERP': portfolioConceptAccents['school-erp-platform'],
  'AI Automation': portfolioConceptAccents['ai-customer-support-automation'],
  'E-Commerce': portfolioConceptAccents['ecommerce-store'],
};

export function getPortfolioAccent(
  category: Exclude<PortfolioCategory, 'All'>,
): PortfolioAccent {
  return portfolioCategoryAccents[category] ?? FALLBACK_PORTFOLIO_ACCENT;
}

/** Prefer slug-level accent so banner + card border stay unique per concept. */
export function getPortfolioAccentForStudy(
  study: Pick<CaseStudy, 'slug' | 'category'> | null | undefined,
): PortfolioAccent {
  if (!study) return FALLBACK_PORTFOLIO_ACCENT;
  const bySlug = study.slug ? portfolioConceptAccents[study.slug] : undefined;
  if (bySlug?.a && bySlug?.b) return bySlug;
  if (study.category) {
    return getPortfolioAccent(study.category);
  }
  return FALLBACK_PORTFOLIO_ACCENT;
}

export function portfolioAccentStyle(
  accent: PortfolioAccent | null | undefined,
): CSSProperties {
  const safe = accent?.a && accent?.b ? accent : FALLBACK_PORTFOLIO_ACCENT;
  return {
    ['--pc-accent-a' as string]: safe.a,
    ['--pc-accent-b' as string]: safe.b,
    ['--pc-glow' as string]: safe.glow ?? FALLBACK_PORTFOLIO_ACCENT.glow,
  };
}
