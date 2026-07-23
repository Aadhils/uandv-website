/**
 * AI Business Requirement Analyzer — Sprint 3.7.1.
 * Deterministic / demo-only. No external AI APIs.
 */

import type { PartnerCategory } from '@/lib/partners';

export type BusinessCategory =
  | 'restaurant'
  | 'travel_agency'
  | 'school'
  | 'hospital'
  | 'retail_shop'
  | 'manufacturing'
  | 'construction'
  | 'it_company'
  | 'mlm_company'
  | 'startup'
  | 'real_estate'
  | 'ecommerce'
  | 'professional_services'
  | 'existing_business_growth'
  | 'funding_requirement'
  | 'generic_business_request';

export type BusinessStage =
  | 'idea'
  | 'planning'
  | 'pre_launch'
  | 'launching'
  | 'operating'
  | 'scaling'
  | 'struggling'
  | 'unknown';

export type AnalysisPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ReviewStatus = 'new' | 'in_review' | 'reviewed' | 'converted';

export type RiskLevel = 'low' | 'medium' | 'high';

export type PlanTaskStatus = 'pending' | 'ready' | 'blocked';

export type PlanTaskPriority = 'low' | 'medium' | 'high';

export type BusinessAdvisorInput = {
  businessGoal: string;
  businessType: string;
  currentStage: BusinessStage | '';
  city: string;
  state: string;
  estimatedBudgetInr: number | null;
  desiredLaunchTimeline: string;
  existingRegistrations: string;
  existingDigitalAssets: string;
  preferredLanguage: string;
  additionalNotes: string;
};

export type ActionPlanTask = {
  id: string;
  phase: 1 | 2 | 3 | 4 | 5 | 6;
  phaseLabel: string;
  taskName: string;
  description: string;
  priority: PlanTaskPriority;
  estimatedDurationDays: number;
  suggestedOwner: 'customer' | 'uandv_employee' | 'partner' | 'shared';
  suggestedPartnerCategory: PartnerCategory | null;
  dependencies: string[];
  status: PlanTaskStatus;
};

export type OpportunityRecommendation = {
  id: string;
  title: string;
  reason: string;
  recommendedService: string;
  opportunityScore: number;
};

export type ProjectConversionPreview = {
  projectTitle: string;
  customerName: string;
  projectCategory: BusinessCategory;
  suggestedServices: string[];
  milestones: string[];
  tasks: string[];
  suggestedEmployees: string[];
  suggestedPartners: string[];
  estimatedBudgetInr: { min: number; max: number };
  estimatedTimelineWeeks: number;
  initialProjectHealth: 'on_track' | 'at_risk';
};

export type BusinessAnalysis = {
  id: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  input: BusinessAdvisorInput;
  businessIntent: string;
  businessCategory: BusinessCategory;
  businessStage: BusinessStage;
  primaryObjective: string;
  goalConfidence: number;
  priority: AnalysisPriority;
  requiredRegistrations: string[];
  requiredLicenses: string[];
  recommendedServices: string[];
  suggestedSoftware: string[];
  suggestedPartnerCategories: PartnerCategory[];
  requiredDocuments: string[];
  estimatedBudgetInr: { min: number; max: number };
  estimatedTimelineWeeks: number;
  riskIndicators: string[];
  riskLevel: RiskLevel;
  missingInformation: string[];
  nextBestAction: string;
  actionPlan: ActionPlanTask[];
  opportunities: OpportunityRecommendation[];
  reviewStatus: ReviewStatus;
  internalNotes: string;
  assignedEmployeeName: string | null;
  assignedPartnerName: string | null;
  summary: string;
};

export type AnalyzeResult =
  | { ok: true; analysis: BusinessAnalysis }
  | { ok: false; error: string; fieldErrors: Partial<Record<keyof BusinessAdvisorInput, string>> };

export const BUSINESS_CATEGORY_LABELS: Record<BusinessCategory, string> = {
  restaurant: 'Restaurant',
  travel_agency: 'Travel Agency',
  school: 'School',
  hospital: 'Hospital',
  retail_shop: 'Retail Shop',
  manufacturing: 'Manufacturing',
  construction: 'Construction',
  it_company: 'IT Company',
  mlm_company: 'MLM Company',
  startup: 'Startup',
  real_estate: 'Real Estate',
  ecommerce: 'E-commerce',
  professional_services: 'Professional Services',
  existing_business_growth: 'Existing Business Growth',
  funding_requirement: 'Funding Requirement',
  generic_business_request: 'Generic Business Request',
};

export const BUSINESS_STAGE_LABELS: Record<BusinessStage, string> = {
  idea: 'Idea',
  planning: 'Planning',
  pre_launch: 'Pre-launch',
  launching: 'Launching',
  operating: 'Operating',
  scaling: 'Scaling',
  struggling: 'Struggling',
  unknown: 'Unknown',
};

export const PHASE_LABELS: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'Discovery and Requirement Validation',
  2: 'Registration and Compliance',
  3: 'Branding and Digital Setup',
  4: 'Software and Operations',
  5: 'Marketing and Launch',
  6: 'Growth and Support',
};

export function formatAdvisorInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatAdvisorBudget(range: { min: number; max: number }): string {
  return `${formatAdvisorInr(range.min)} – ${formatAdvisorInr(range.max)}`;
}
