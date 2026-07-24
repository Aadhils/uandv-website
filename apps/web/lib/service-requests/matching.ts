/**
 * Deterministic Smart Partner Matching — Demo Intelligence (not real AI).
 */

import {
  getMergedPartners,
  getPartnerPerformance,
  type Partner,
  type PartnerCategory,
} from '@/lib/partners';

import type { MatchBreakdown, PartnerMatchResult, ServiceRequest } from './types';

export type MatchInput = {
  partnerCategory: PartnerCategory;
  city: string;
  state: string;
  budgetMinInr: number;
  budgetMaxInr: number;
  timelineDays: number;
  estimatedPriceInr?: number | null;
  skillsHint?: string[];
};

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function locationScore(partner: Partner, city: string, state: string): number {
  const cityMatch = partner.city.toLowerCase() === city.trim().toLowerCase();
  const stateMatch =
    partner.state.toLowerCase().includes(state.trim().toLowerCase()) ||
    partner.serviceArea.toLowerCase().includes(state.trim().toLowerCase());
  const areaRemote = partner.serviceArea.toLowerCase().includes('remote') ||
    partner.serviceArea.toLowerCase().includes('pan india');
  if (cityMatch) return 100;
  if (stateMatch) return 78;
  if (areaRemote) return 62;
  return 28;
}

function availabilityScore(partner: Partner): number {
  if (partner.availability === 'available') return 100;
  if (partner.availability === 'limited') return 65;
  return 20;
}

function performanceScore(partner: Partner): number {
  const perf = getPartnerPerformance(partner.id);
  const ratingPart = (partner.rating / 5) * 40;
  const scorePart = (partner.performanceScore / 100) * 35;
  const onTime = perf ? (perf.onTimeDeliveryPercent / 100) * 15 : 8;
  const response = perf
    ? clamp(100 - perf.responseTimeHours * 4, 0, 15)
    : 7;
  return clamp(ratingPart + scorePart + onTime + response);
}

function budgetScore(
  partner: Partner,
  budgetMax: number,
  estimatedPrice: number | null | undefined,
): number {
  const price =
    estimatedPrice && estimatedPrice > 0
      ? estimatedPrice
      : Math.round(budgetMax * (0.55 + (partner.experienceYears % 5) * 0.05));
  if (budgetMax <= 0) return 50;
  if (price <= budgetMax * 0.7) return 100;
  if (price <= budgetMax) return 82;
  if (price <= budgetMax * 1.15) return 55;
  return 25;
}

function serviceScore(
  partner: Partner,
  category: PartnerCategory,
  skillsHint: string[] | undefined,
): number {
  let score = partner.category === category ? 88 : 20;
  if (partner.verificationStatus === 'verified') score += 12;
  else if (partner.verificationStatus === 'pending') score += 2;
  else score -= 30;

  if (skillsHint?.length) {
    const hay = partner.skills.map((s) => s.toLowerCase()).join(' ');
    const hits = skillsHint.filter((s) =>
      hay.includes(s.toLowerCase()),
    ).length;
    score += Math.min(10, hits * 4);
  }

  score += Math.min(8, partner.experienceYears);
  return clamp(score);
}

function estimatePrice(
  partner: Partner,
  budgetMax: number,
  estimatedPrice: number | null | undefined,
): number {
  if (estimatedPrice && estimatedPrice > 0) {
    const skew = 0.9 + (partner.performanceScore / 100) * 0.2;
    return Math.round(estimatedPrice * skew);
  }
  return Math.round(budgetMax * (0.5 + partner.experienceYears * 0.02));
}

function estimateDuration(
  partner: Partner,
  timelineDays: number,
  estimatedDuration: number | null | undefined,
): number {
  if (estimatedDuration && estimatedDuration > 0) {
    return Math.max(
      3,
      Math.round(estimatedDuration * (partner.availability === 'available' ? 0.95 : 1.1)),
    );
  }
  return Math.max(5, Math.round(timelineDays * 0.85));
}

function buildReasons(
  partner: Partner,
  breakdown: MatchBreakdown,
): string[] {
  const reasons: string[] = [];
  if (breakdown.service >= 80) {
    reasons.push('Strong service-category alignment');
  }
  if (breakdown.location >= 75) {
    reasons.push('Good city / service-area coverage');
  }
  if (breakdown.availability >= 90) {
    reasons.push('Currently available');
  } else if (breakdown.availability >= 60) {
    reasons.push('Limited capacity — still schedulable');
  }
  if (breakdown.performance >= 75) {
    reasons.push('Solid demo rating and performance');
  }
  if (breakdown.budget >= 80) {
    reasons.push('Fits within budget band');
  }
  if (partner.verificationStatus === 'verified') {
    reasons.push('Verified partner');
  }
  return reasons.slice(0, 4);
}

/**
 * Returns top 3 partner matches with transparent score breakdown.
 * Label in UI as Smart Matching / Demo Intelligence — not real AI.
 */
export function matchPartnersForRequest(
  input: MatchInput,
  options?: { limit?: number; excludePartnerIds?: string[] },
): PartnerMatchResult[] {
  const limit = options?.limit ?? 3;
  const excluded = new Set(options?.excludePartnerIds ?? []);
  const candidates = getMergedPartners().filter(
    (p) =>
      !excluded.has(p.id) &&
      p.verificationStatus !== 'rejected' &&
      p.verificationStatus !== 'suspended' &&
      p.verificationStatus !== 'inactive',
  );

  const scored = candidates.map((partner) => {
    const service = serviceScore(
      partner,
      input.partnerCategory,
      input.skillsHint,
    );
    const location = locationScore(partner, input.city, input.state);
    const availability = availabilityScore(partner);
    const performance = performanceScore(partner);
    const budget = budgetScore(
      partner,
      input.budgetMaxInr,
      input.estimatedPriceInr,
    );

    // Prefer same category strongly in overall.
    const categoryBoost = partner.category === input.partnerCategory ? 8 : 0;
    const overall = clamp(
      service * 0.34 +
        location * 0.18 +
        availability * 0.16 +
        performance * 0.2 +
        budget * 0.12 +
        categoryBoost,
    );

    const breakdown: MatchBreakdown = {
      service,
      location,
      availability,
      performance,
      budget,
      overall,
    };

    return {
      partnerId: partner.id,
      companyName: partner.companyName,
      category: partner.category,
      city: partner.city,
      rating: partner.rating,
      performanceScore: partner.performanceScore,
      experienceYears: partner.experienceYears,
      availability: partner.availability,
      verificationStatus: partner.verificationStatus,
      estimatedPriceInr: estimatePrice(
        partner,
        input.budgetMaxInr,
        input.estimatedPriceInr,
      ),
      estimatedDurationDays: estimateDuration(
        partner,
        input.timelineDays,
        null,
      ),
      breakdown,
      reasons: buildReasons(partner, breakdown),
    } satisfies PartnerMatchResult;
  });

  return scored
    .sort((a, b) => b.breakdown.overall - a.breakdown.overall)
    .slice(0, limit);
}

export function rematchServiceRequest(
  request: ServiceRequest,
): PartnerMatchResult[] {
  return matchPartnersForRequest({
    partnerCategory: request.partnerCategory,
    city: request.city,
    state: request.state,
    budgetMinInr: request.budgetMinInr,
    budgetMaxInr: request.budgetMaxInr,
    timelineDays: request.timelineDays,
    estimatedPriceInr: request.estimatedPriceInr,
  });
}
