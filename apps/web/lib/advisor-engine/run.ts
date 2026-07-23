import {
  formatAdvisorBudget,
  saveLatestAnalysis,
} from '@/lib/business-advisor';
import { PARTNER_CATEGORY_LABELS } from '@/lib/partners';
import type { PartnerCategory } from '@/lib/partners';
import {
  buildWizardSummary,
  createCrmLeadFromWizard,
  generateAnalysisFromWizard,
  getWizardGoalTitle,
  type WizardAnswers,
  type WizardGoalId,
} from '@/lib/discovery-wizard';

import { downloadAdvisorReport, formatAdvisorReportText } from './download';
import { computeReadinessScore } from './readiness';
import { buildAiRecommendations, buildRoadmapFromAnalysis } from './roadmap';
import type { AdvisorEngineReport } from './types';
import { ADVISOR_ENGINE_STORAGE_KEY } from './types';

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function saveAdvisorEngineReport(report: AdvisorEngineReport): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(
      ADVISOR_ENGINE_STORAGE_KEY,
      JSON.stringify(report),
    );
    queueMicrotask(() => notify());
  } catch {
    // ignore
  }
}

export function loadAdvisorEngineReport(): AdvisorEngineReport | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(ADVISOR_ENGINE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdvisorEngineReport;
  } catch {
    return null;
  }
}

export function subscribeAdvisorEngineReport(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function clearAdvisorEngineReport(): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(ADVISOR_ENGINE_STORAGE_KEY);
    queueMicrotask(() => notify());
  } catch {
    // ignore
  }
}

export type RunAdvisorEngineResult =
  | { ok: true; report: AdvisorEngineReport }
  | { ok: false; error: string };

/**
 * Runs the advisor engine from discovery answers.
 * Reuses analyzeBusinessRequirement via generateAnalysisFromWizard.
 */
export function runAdvisorEngine(
  goalId: WizardGoalId,
  answers: WizardAnswers,
  options?: {
    customerName?: string;
    crmLeadId?: string | null;
    createCrmLead?: boolean;
  },
): RunAdvisorEngineResult {
  const analysisResult = generateAnalysisFromWizard(goalId, answers, {
    customerName: options?.customerName,
  });

  if (!analysisResult.ok) {
    return { ok: false, error: analysisResult.error };
  }

  const analysis = analysisResult.analysis;
  saveLatestAnalysis(analysis);

  let crmLeadId = options?.crmLeadId ?? null;
  if (options?.createCrmLead !== false && !crmLeadId) {
    const lead = createCrmLeadFromWizard(goalId, answers);
    crmLeadId = lead.id;
  }

  const wizardSummary = buildWizardSummary(goalId, answers, { crmLeadId });
  const readiness = computeReadinessScore(goalId, answers, analysis);
  const roadmap = buildRoadmapFromAnalysis(analysis);
  const aiRecommendations = buildAiRecommendations(analysis);

  const partnerIds = [
    ...new Set([
      ...analysis.suggestedPartnerCategories,
      ...wizardSummary.recommendedPartnerCategories.map((p) => p.id),
    ]),
  ] as PartnerCategory[];

  const recommendedPartnerCategories = partnerIds.slice(0, 6).map((id) => ({
    id,
    label: PARTNER_CATEGORY_LABELS[id],
  }));

  const recommendedServices = [
    ...new Set([
      ...analysis.recommendedServices,
      ...wizardSummary.selectedServices,
    ]),
  ];

  const report: AdvisorEngineReport = {
    id: `adv-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    goalId,
    goalTitle: getWizardGoalTitle(goalId),
    readiness,
    analysis,
    wizardSummary,
    roadmap,
    estimatedBudgetInr: analysis.estimatedBudgetInr,
    estimatedBudgetLabel: formatAdvisorBudget(analysis.estimatedBudgetInr),
    estimatedTimelineWeeks: analysis.estimatedTimelineWeeks,
    estimatedTimelineLabel: `About ${analysis.estimatedTimelineWeeks} weeks`,
    requiredRegistrations: analysis.requiredRegistrations,
    requiredLicenses: analysis.requiredLicenses,
    recommendedServices,
    recommendedPartnerCategories,
    aiRecommendations,
    crmLeadId,
  };

  saveAdvisorEngineReport(report);
  return { ok: true, report };
}

export { downloadAdvisorReport, formatAdvisorReportText };
