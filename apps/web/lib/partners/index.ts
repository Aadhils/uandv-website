export * from './types';
export * from './demo-data';

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

export function getPartnerById(id: string): Partner | undefined {
  return demoPartners.find((p) => p.id === id);
}

export function getAllPartners(): Partner[] {
  return [...demoPartners];
}

export function searchPartners(query: string): Partner[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllPartners();
  return demoPartners.filter((p) => {
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
  return demoPartners.filter((p) => p.category === category);
}

export function getPartnersByVerification(
  status: PartnerVerificationStatus,
): Partner[] {
  return demoPartners.filter((p) => p.verificationStatus === status);
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
  return {
    total: demoPartners.length,
    verified: demoPartners.filter((p) => p.verificationStatus === 'verified')
      .length,
    pending: demoPartners.filter((p) => p.verificationStatus === 'pending')
      .length,
    available: demoPartners.filter((p) => p.availability === 'available')
      .length,
    categories: new Set(demoPartners.map((p) => p.category)).size,
  };
}
