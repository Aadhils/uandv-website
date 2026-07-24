/**
 * Partner Network & Service Marketplace — Release 3.6.
 * Extended by Sprint 3.1.1 Partner Marketplace Foundation
 * (registration, public profiles, approval queue, public listing).
 */

export type PartnerCategory =
  | 'company_registration'
  | 'gst_consultant'
  | 'chartered_accountant'
  | 'lawyer'
  | 'trademark_consultant'
  | 'digital_marketing'
  | 'seo'
  | 'graphic_design'
  | 'printing'
  | 'website_development'
  | 'mobile_app_development'
  | 'ai_automation'
  | 'video_production'
  | 'cloud_services'
  | 'hosting'
  | 'hr_services'
  | 'recruitment'
  | 'business_consultant'
  | 'loan_consultant'
  | 'investor_network'
  | 'insurance'
  | 'logistics';

export type PartnerVerificationStatus =
  | 'pending'
  | 'verified'
  | 'suspended'
  | 'inactive'
  | 'rejected';

export type PartnerAvailability = 'available' | 'limited' | 'unavailable';

export type CommissionType = 'fixed' | 'percent' | 'hybrid' | 'retainer';

export type DocumentPackStatus =
  | 'missing'
  | 'partial'
  | 'submitted'
  | 'verified';

export type BankVerificationStatus =
  | 'not_started'
  | 'pending'
  | 'verified'
  | 'failed';

export type Partner = {
  id: string;
  category: PartnerCategory;
  companyName: string;
  contactPerson: string;
  city: string;
  state: string;
  serviceArea: string;
  skills: string[];
  rating: number;
  verificationStatus: PartnerVerificationStatus;
  availability: PartnerAvailability;
  experienceYears: number;
  performanceScore: number;
  commissionType: CommissionType;
  documentsStatus: DocumentPackStatus;
  bankVerificationStatus: BankVerificationStatus;
  summary: string;
  slaHours: number;
};

export type PartnerPerformance = {
  partnerId: string;
  completedProjects: number;
  delayedProjects: number;
  averageRating: number;
  customerSatisfaction: number;
  onTimeDeliveryPercent: number;
  revisionCount: number;
  responseTimeHours: number;
};

export type PartnerAssignment = {
  id: string;
  partnerId: string;
  projectId: string;
  projectTitle: string;
  customerBusinessName: string;
  roleLabel: string;
  status: 'active' | 'completed' | 'on_hold';
  assignedAt: string;
  dueDate: string | null;
};

export type PartnerPaymentSummary = {
  partnerId: string;
  earnedInr: number;
  pendingInr: number;
  paidInr: number;
  lastPayoutAt: string | null;
  notes: string;
};

export type PartnerDocument = {
  id: string;
  partnerId: string;
  name: string;
  kind: string;
  status: DocumentPackStatus;
  uploadedAt: string | null;
};

export type PartnerCommunication = {
  id: string;
  partnerId: string;
  occurredAt: string;
  channel: 'call' | 'email' | 'whatsapp' | 'meeting' | 'internal_note';
  title: string;
  detail: string;
  actorName: string;
};

export type MarketplaceService = {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  description: string;
  estimatedPriceInr: number;
  estimatedDurationDays: number;
  requiredDocuments: string[];
  suggestedPartnerIds: string[];
  customerEligibility: string;
  businessChecklist: string[];
};

export type BusinessTemplateId =
  | 'restaurant'
  | 'travel_agency'
  | 'school'
  | 'hospital'
  | 'retail_shop'
  | 'manufacturing'
  | 'construction'
  | 'it_company'
  | 'mlm_company'
  | 'startup';

export type BusinessServiceTemplate = {
  id: BusinessTemplateId;
  name: string;
  summary: string;
  requiredRegistrations: string[];
  requiredLicenses: string[];
  recommendedServiceIds: string[];
  suggestedTimelineWeeks: number;
  suggestedBudgetInr: { min: number; max: number };
  requiredPartnerCategories: PartnerCategory[];
};
