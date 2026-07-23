import {
  PARTNER_CATEGORY_LABELS,
  getPartnerById,
  getPartnersByCategory,
  type Partner,
} from '@/lib/partners';

import { BOS_SPINE } from './spine';
import type { BosVendorRecommendation } from './types';

function toRecommendation(
  partner: Partner,
  reason: string,
  assigned: boolean,
): BosVendorRecommendation {
  return {
    partnerId: partner.id,
    companyName: partner.companyName,
    categoryLabel: PARTNER_CATEGORY_LABELS[partner.category],
    reason,
    href: '/admin/assignment',
    assignedToProject: assigned,
  };
}

/**
 * Vendor / partner recommendations tied to the Sunrise Retail spine.
 * Deterministic for SSR — no localStorage reads.
 */
export function getVendorRecommendations(): BosVendorRecommendation[] {
  const assignedIds = new Set<string>([
    BOS_SPINE.vendorPartnerId,
    BOS_SPINE.secondaryPartnerId,
  ]);

  const results: BosVendorRecommendation[] = [];

  const primary = getPartnerById(BOS_SPINE.vendorPartnerId);
  if (primary) {
    results.push(
      toRecommendation(
        primary,
        'Assigned creative partner for Sunrise website redesign (also Vendor Workspace ven-001).',
        true,
      ),
    );
  }

  const secondary = getPartnerById(BOS_SPINE.secondaryPartnerId);
  if (secondary) {
    results.push(
      toRecommendation(
        secondary,
        'Website development partner linked to the same project delivery track.',
        true,
      ),
    );
  }

  const categories: Partner['category'][] = [
    'website_development',
    'digital_marketing',
  ];

  for (const category of categories) {
    const matches = getPartnersByCategory(category).filter(
      (p) => !assignedIds.has(p.id) && p.verificationStatus === 'verified',
    );
    for (const partner of matches.slice(0, 1)) {
      assignedIds.add(partner.id);
      results.push(
        toRecommendation(
          partner,
          `Verified ${PARTNER_CATEGORY_LABELS[category]} partner for this journey.`,
          false,
        ),
      );
    }
  }

  return results.slice(0, 5);
}
