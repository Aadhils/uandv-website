export * from './types';
export * from './demo-data';
export * from './runtime';
export * from './filters';

import {
  PARTNER_CATEGORY_LABELS,
  demoBusinessTemplates,
  demoMarketplaceServices,
  demoPartnerAssignments,
  demoPartnerCommunications,
  demoPartnerDocuments,
  demoPartnerPayments,
  demoPartnerPerformance,
  demoPartners,
} from './demo-data';
import {
  applyPartnerStatusOverride,
  listRegisteredPartners,
  loadPartnerRuntime,
  registerPartnerRuntimeCacheInvalidator,
  subscribePartnerRuntime,
} from './runtime';
import type {
  BusinessServiceTemplate,
  MarketplaceService,
  Partner,
  PartnerAssignment,
  PartnerCommunication,
  PartnerDocument,
  PartnerPaymentSummary,
  PartnerPerformance,
  PartnerVerificationStatus,
} from './types';

/**
 * Seed + runtime registered partners with demo verification overlays.
 * Keeps Release 3.6 catalog intact while allowing Sprint 3.1.1 registration.
 */
export function getMergedPartners(): Partner[] {
  const { statusOverrides } = loadPartnerRuntime();
  const registered = listRegisteredPartners().map((partner) =>
    applyPartnerStatusOverride(partner, statusOverrides),
  );
  const registeredIds = new Set(registered.map((p) => p.id));
  const seed = demoPartners
    .filter((partner) => !registeredIds.has(partner.id))
    .map((partner) => applyPartnerStatusOverride(partner, statusOverrides));
  return [...seed, ...registered];
}

export function getPartnerById(id: string): Partner | undefined {
  return getMergedPartners().find((p) => p.id === id);
}

export function getAllPartners(): Partner[] {
  return getMergedPartners();
}

export function searchPartners(query: string): Partner[] {
  const q = query.trim().toLowerCase();
  const all = getMergedPartners();
  if (!q) return all;
  return all.filter((p) => {
    const haystack = [
      p.id,
      p.companyName,
      p.contactPerson,
      p.city,
      p.state,
      p.serviceArea,
      PARTNER_CATEGORY_LABELS[p.category],
      ...p.skills,
      p.verificationStatus,
      p.availability,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getPartnersByCategory(category: Partner['category']): Partner[] {
  return getMergedPartners().filter((p) => p.category === category);
}

export function getPartnersByVerification(
  status: PartnerVerificationStatus,
): Partner[] {
  return getMergedPartners().filter((p) => p.verificationStatus === status);
}

export function getPartnerPerformance(
  partnerId: string,
): PartnerPerformance | undefined {
  return demoPartnerPerformance.find((p) => p.partnerId === partnerId);
}

export function getAssignmentsForPartner(
  partnerId: string,
): PartnerAssignment[] {
  return demoPartnerAssignments.filter((a) => a.partnerId === partnerId);
}

export function getPaymentSummaryForPartner(
  partnerId: string,
): PartnerPaymentSummary | undefined {
  return demoPartnerPayments.find((p) => p.partnerId === partnerId);
}

export function getDocumentsForPartner(partnerId: string): PartnerDocument[] {
  return demoPartnerDocuments.filter((d) => d.partnerId === partnerId);
}

export function getCommunicationsForPartner(
  partnerId: string,
): PartnerCommunication[] {
  return demoPartnerCommunications
    .filter((c) => c.partnerId === partnerId)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
}

export function getMarketplaceServices(): MarketplaceService[] {
  return [...demoMarketplaceServices];
}

export function getMarketplaceServiceById(
  id: string,
): MarketplaceService | undefined {
  return demoMarketplaceServices.find((s) => s.id === id);
}

export function getBusinessTemplates(): BusinessServiceTemplate[] {
  return [...demoBusinessTemplates];
}

export function getBusinessTemplateById(
  id: string,
): BusinessServiceTemplate | undefined {
  return demoBusinessTemplates.find((t) => t.id === id);
}

export function comparePartners(partnerIds: string[]): Partner[] {
  return partnerIds
    .map((id) => getPartnerById(id))
    .filter((p): p is Partner => Boolean(p));
}

export function formatPartnerInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPartnerDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00`));
}

export function formatPartnerDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function partnerDirectoryStats() {
  const partners = getMergedPartners();
  return {
    total: partners.length,
    verified: partners.filter((p) => p.verificationStatus === 'verified')
      .length,
    pending: partners.filter((p) => p.verificationStatus === 'pending')
      .length,
    available: partners.filter((p) => p.availability === 'available').length,
    categories: new Set(partners.map((p) => p.category)).size,
  };
}

/** Public directory defaults to verified partners (pending only if registered demo). */
export function getPublicDirectoryPartners(): Partner[] {
  return getMergedPartners().filter(
    (p) =>
      p.verificationStatus === 'verified' ||
      p.verificationStatus === 'pending',
  );
}

/**
 * Stable SSR/hydration snapshot for useSyncExternalStore.
 * Seed-only (no localStorage). Same reference on every call.
 */
const SERVER_PUBLIC_DIRECTORY_PARTNERS: Partner[] = demoPartners.filter(
  (p) =>
    p.verificationStatus === 'verified' ||
    p.verificationStatus === 'pending',
);

export function getPublicDirectoryPartnersServerSnapshot(): Partner[] {
  return SERVER_PUBLIC_DIRECTORY_PARTNERS;
}

/** Client snapshot cache — invalidated when partner runtime notifies. */
let clientPublicDirectoryCache: Partner[] | null = null;

registerPartnerRuntimeCacheInvalidator(() => {
  clientPublicDirectoryCache = null;
});

export function getPublicDirectoryPartnersClientSnapshot(): Partner[] {
  if (clientPublicDirectoryCache === null) {
    clientPublicDirectoryCache = getPublicDirectoryPartners();
  }
  return clientPublicDirectoryCache;
}

/**
 * Subscribe to partner runtime on the client only.
 * Cache invalidation is handled globally on notify().
 */
export function subscribePublicDirectoryPartners(
  listener: () => void,
): () => void {
  return subscribePartnerRuntime(listener);
}

/** Stats derived from a partners list (hydration-safe; no localStorage read). */
export function partnerDirectoryStatsFrom(partners: Partner[]) {
  return {
    total: partners.length,
    verified: partners.filter((p) => p.verificationStatus === 'verified')
      .length,
    pending: partners.filter((p) => p.verificationStatus === 'pending')
      .length,
    available: partners.filter((p) => p.availability === 'available').length,
    categories: new Set(partners.map((p) => p.category)).size,
  };
}
