import type {
  AnalyzeResult,
  AnalysisPriority,
  BusinessAdvisorInput,
  BusinessAnalysis,
  RiskLevel,
} from './types';
import { detectCategory, getRule, inferStageFromText } from './rules';
import { buildActionPlan, detectOpportunities } from './recommendations';

const STORAGE_KEY = 'uandv-business-advisor-latest';
const REVIEW_STORAGE_KEY = 'uandv-business-advisor-reviews';

type Listener = () => void;
const latestListeners = new Set<Listener>();
const reviewListeners = new Set<Listener>();

function emit(listeners: Set<Listener>): void {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeLatestAnalysis(listener: Listener): () => void {
  latestListeners.add(listener);
  return () => {
    latestListeners.delete(listener);
  };
}

export function subscribeReviewPatches(listener: Listener): () => void {
  reviewListeners.add(listener);
  return () => {
    reviewListeners.delete(listener);
  };
}

export function emptyAdvisorInput(): BusinessAdvisorInput {
  return {
    businessGoal: '',
    businessType: '',
    currentStage: '',
    city: '',
    state: '',
    estimatedBudgetInr: null,
    desiredLaunchTimeline: '',
    existingRegistrations: '',
    existingDigitalAssets: '',
    preferredLanguage: 'English',
    additionalNotes: '',
  };
}

export function validateAdvisorInput(
  input: BusinessAdvisorInput,
): Partial<Record<keyof BusinessAdvisorInput, string>> {
  const errors: Partial<Record<keyof BusinessAdvisorInput, string>> = {};
  if (!input.businessGoal.trim() || input.businessGoal.trim().length < 8) {
    errors.businessGoal = 'Enter a business goal (at least 8 characters).';
  }
  if (!input.city.trim()) {
    errors.city = 'City is required.';
  }
  if (!input.state.trim()) {
    errors.state = 'State is required.';
  }
  if (
    input.estimatedBudgetInr !== null &&
    (Number.isNaN(input.estimatedBudgetInr) || input.estimatedBudgetInr < 0)
  ) {
    errors.estimatedBudgetInr = 'Budget must be a non-negative number.';
  }
  return errors;
}

function clampConfidence(score: number, input: BusinessAdvisorInput): number {
  let conf = Math.min(95, 45 + score * 8);
  if (input.businessType.trim()) conf += 4;
  if (input.currentStage) conf += 4;
  if (input.estimatedBudgetInr !== null) conf += 3;
  if (input.desiredLaunchTimeline.trim()) conf += 3;
  if (input.existingRegistrations.trim()) conf += 2;
  if (input.existingDigitalAssets.trim()) conf += 2;
  return Math.min(98, Math.round(conf));
}

function derivePriority(
  stage: BusinessAnalysis['businessStage'],
  risks: string[],
  confidence: number,
): AnalysisPriority {
  if (stage === 'struggling' || risks.length >= 4) return 'urgent';
  if (stage === 'launching' || stage === 'pre_launch') return 'high';
  if (confidence < 55) return 'medium';
  if (stage === 'idea' || stage === 'planning') return 'medium';
  return 'low';
}

function deriveRiskLevel(risks: string[]): RiskLevel {
  if (risks.length >= 4) return 'high';
  if (risks.length >= 2) return 'medium';
  return 'low';
}

function collectMissing(input: BusinessAdvisorInput): string[] {
  const missing: string[] = [];
  if (!input.businessType.trim()) missing.push('Business type not specified');
  if (!input.currentStage) missing.push('Current business stage not selected');
  if (input.estimatedBudgetInr === null) missing.push('Estimated budget not provided');
  if (!input.desiredLaunchTimeline.trim()) missing.push('Desired launch timeline missing');
  if (!input.existingRegistrations.trim()) {
    missing.push('Existing registrations not listed (or confirm none)');
  }
  if (!input.existingDigitalAssets.trim()) {
    missing.push('Existing digital assets not listed (or confirm none)');
  }
  if (!input.additionalNotes.trim()) missing.push('Additional context / constraints not provided');
  return missing;
}

function deriveIntent(goal: string, categoryIntent: string): string {
  const trimmed = goal.trim();
  if (trimmed.length <= 120) return trimmed;
  return categoryIntent;
}

export function analyzeBusinessRequirement(
  input: BusinessAdvisorInput,
  options?: {
    id?: string;
    customerId?: string;
    customerName?: string;
    createdAt?: string;
  },
): AnalyzeResult {
  const fieldErrors = validateAdvisorInput(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: 'Please fix validation errors before analyzing.',
      fieldErrors,
    };
  }

  try {
    const corpus = [
      input.businessGoal,
      input.businessType,
      input.additionalNotes,
      input.existingRegistrations,
      input.existingDigitalAssets,
    ].join(' ');

    const detected = detectCategory(corpus);
    const rule = getRule(detected.category);
    const stage = inferStageFromText(corpus, input.currentStage);
    const missingInformation = collectMissing(input);
    const riskIndicators = [
      ...rule.baseRisks,
      ...(missingInformation.length >= 4 ? ['High information gap before scoping'] : []),
      ...(input.estimatedBudgetInr !== null &&
      input.estimatedBudgetInr < rule.budgetMin * 0.4
        ? ['Stated budget may be below recommended range']
        : []),
    ];

    const goalConfidence = clampConfidence(detected.score, input);
    const priority = derivePriority(stage, riskIndicators, goalConfidence);
    const riskLevel = deriveRiskLevel(riskIndicators);
    const partners = rule.partners;
    const recommendedServices = [...rule.services];
    const opportunities = detectOpportunities(input, detected.category, recommendedServices);
    const actionPlan = buildActionPlan(detected.category, partners);

    const budget =
      input.estimatedBudgetInr !== null
        ? {
            min: Math.round(input.estimatedBudgetInr * 0.85),
            max: Math.round(Math.max(input.estimatedBudgetInr * 1.25, rule.budgetMin)),
          }
        : { min: rule.budgetMin, max: rule.budgetMax };

    const timelineWeeks = input.desiredLaunchTimeline.toLowerCase().includes('month')
      ? Math.max(4, rule.timelineWeeks - 2)
      : rule.timelineWeeks;

    const analysis: BusinessAnalysis = {
      id: options?.id ?? `ba-${Date.now()}`,
      createdAt: options?.createdAt ?? new Date().toISOString(),
      customerId: options?.customerId ?? 'cus-001',
      customerName: options?.customerName ?? 'Priya Sharma',
      input: { ...input },
      businessIntent: deriveIntent(input.businessGoal, rule.intent),
      businessCategory: detected.category,
      businessStage: stage,
      primaryObjective: rule.primaryObjective,
      goalConfidence,
      priority,
      requiredRegistrations: rule.registrations,
      requiredLicenses: rule.licenses,
      recommendedServices,
      suggestedSoftware: rule.software,
      suggestedPartnerCategories: partners,
      requiredDocuments: rule.documents,
      estimatedBudgetInr: budget,
      estimatedTimelineWeeks: timelineWeeks,
      riskIndicators,
      riskLevel,
      missingInformation,
      nextBestAction:
        missingInformation.length > 0
          ? 'Complete missing information, then schedule a discovery call with U&V.'
          : `Proceed with Phase 1 discovery for ${detected.category.replace(/_/g, ' ')}.`,
      actionPlan,
      opportunities,
      reviewStatus: 'new',
      internalNotes: '',
      assignedEmployeeName: null,
      assignedPartnerName: null,
      summary: `${rule.intent}. Priority ${priority}; confidence ${goalConfidence}%. Recommended path covers compliance, digital setup, and launch support.`,
    };

    return { ok: true, analysis };
  } catch {
    return {
      ok: false,
      error: 'Analysis failed due to an unexpected demo engine error. Try again or load a demo example.',
      fieldErrors: {},
    };
  }
}

export function saveLatestAnalysis(analysis: BusinessAnalysis): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(analysis));
  emit(latestListeners);
}

export function loadLatestAnalysis(): BusinessAnalysis | null {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BusinessAnalysis;
  } catch {
    return null;
  }
}

export type ReviewPatch = {
  reviewStatus?: BusinessAnalysis['reviewStatus'];
  internalNotes?: string;
  assignedEmployeeName?: string | null;
  assignedPartnerName?: string | null;
};

export function loadReviewPatches(): Record<string, ReviewPatch> {
  if (typeof window === 'undefined') return {};
  const raw = window.sessionStorage.getItem(REVIEW_STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, ReviewPatch>;
  } catch {
    return {};
  }
}

export function saveReviewPatch(analysisId: string, patch: ReviewPatch): void {
  if (typeof window === 'undefined') return;
  const all = loadReviewPatches();
  all[analysisId] = { ...all[analysisId], ...patch };
  window.sessionStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(all));
  emit(reviewListeners);
}

export function applyReviewPatch(
  analysis: BusinessAnalysis,
  patch: ReviewPatch | undefined,
): BusinessAnalysis {
  if (!patch) return analysis;
  return {
    ...analysis,
    reviewStatus: patch.reviewStatus ?? analysis.reviewStatus,
    internalNotes: patch.internalNotes ?? analysis.internalNotes,
    assignedEmployeeName:
      patch.assignedEmployeeName !== undefined
        ? patch.assignedEmployeeName
        : analysis.assignedEmployeeName,
    assignedPartnerName:
      patch.assignedPartnerName !== undefined
        ? patch.assignedPartnerName
        : analysis.assignedPartnerName,
  };
}
