/**
 * Partner Marketplace filters & category helpers — Sprint 3.1.1.
 */

import { PARTNER_CATEGORY_LABELS } from './demo-data';
import type {
  MarketplaceService,
  Partner,
  PartnerCategory,
  PartnerVerificationStatus,
} from './types';

export type PartnerDirectoryFilters = {
  query?: string;
  category?: PartnerCategory | 'all';
  city?: string | 'all';
  minRating?: number;
  verification?: PartnerVerificationStatus | 'all';
  availability?: Partner['availability'] | 'all';
};

export type PartnerCategorySummary = {
  id: PartnerCategory;
  label: string;
  count: number;
};

export function filterPartners(
  partners: Partner[],
  filters: PartnerDirectoryFilters,
): Partner[] {
  const q = filters.query?.trim().toLowerCase() ?? '';
  const minRating = filters.minRating ?? 0;

  return partners.filter((partner) => {
    if (filters.category && filters.category !== 'all') {
      if (partner.category !== filters.category) return false;
    }
    if (filters.city && filters.city !== 'all') {
      if (partner.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    }
    if (filters.verification && filters.verification !== 'all') {
      if (partner.verificationStatus !== filters.verification) return false;
    }
    if (filters.availability && filters.availability !== 'all') {
      if (partner.availability !== filters.availability) return false;
    }
    if (partner.rating < minRating) return false;

    if (!q) return true;
    const haystack = [
      partner.id,
      partner.companyName,
      partner.contactPerson,
      partner.city,
      partner.state,
      partner.serviceArea,
      PARTNER_CATEGORY_LABELS[partner.category],
      ...partner.skills,
      partner.verificationStatus,
      partner.availability,
      partner.summary,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function listPartnerCategorySummaries(
  partners: Partner[],
): PartnerCategorySummary[] {
  const counts = new Map<PartnerCategory, number>();
  for (const partner of partners) {
    counts.set(partner.category, (counts.get(partner.category) ?? 0) + 1);
  }

  return (Object.keys(PARTNER_CATEGORY_LABELS) as PartnerCategory[]).map(
    (id) => ({
      id,
      label: PARTNER_CATEGORY_LABELS[id],
      count: counts.get(id) ?? 0,
    }),
  );
}

export function listPartnerCities(partners: Partner[]): string[] {
  return [...new Set(partners.map((p) => p.city))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function searchMarketplaceServices(
  services: MarketplaceService[],
  query: string,
  category?: string | 'all',
): MarketplaceService[] {
  const q = query.trim().toLowerCase();
  return services.filter((service) => {
    if (category && category !== 'all' && service.category !== category) {
      return false;
    }
    if (!q) return true;
    return [service.title, service.category, service.subCategory, service.description]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });
}

export type DemoPartnerReview = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  occurredAt: string;
};

/** Deterministic demo reviews derived from partner rating — no backend. */
export function getDemoPartnerReviews(partner: Partner): DemoPartnerReview[] {
  if (partner.rating <= 0) {
    return [
      {
        id: `${partner.id}-rev-new`,
        author: 'U&V review desk',
        rating: 0,
        comment: 'Awaiting first verified delivery reviews.',
        occurredAt: '2026-07-01',
      },
    ];
  }

  const authors = ['Priya S.', 'Karthik N.', 'Ananya R.', 'Divya P.'];
  const comments = [
    'Reliable delivery and clear communication throughout the engagement.',
    'Strong domain expertise — would recommend for similar scopes.',
    'Responsive on SLA and transparent about timelines.',
  ];

  const count = partner.rating >= 4.5 ? 3 : partner.rating >= 4 ? 2 : 1;
  return Array.from({ length: count }, (_, index) => ({
    id: `${partner.id}-rev-${index + 1}`,
    author: authors[index % authors.length]!,
    rating: Math.min(5, Math.max(3, Math.round(partner.rating))),
    comment: comments[index % comments.length]!,
    occurredAt: `2026-0${Math.max(1, 6 - index)}-${10 + index * 3}`,
  }));
}
