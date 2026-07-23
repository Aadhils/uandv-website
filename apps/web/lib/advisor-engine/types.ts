/**
 * AI Business Advisor Engine — Sprint 3.11.
 * Wraps discovery answers + existing Business Advisor analyzer.
 * Demo-only. No external AI APIs.
 */

import type { BusinessAnalysis } from '@/lib/business-advisor';
import type { PartnerCategory } from '@/lib/partners';
import type { WizardGoalId, WizardSummary } from '@/lib/discovery-wizard';

export type ReadinessBand = 'emerging' | 'developing' | 'ready' | 'strong';

export type ReadinessScore = {
  score: number;
  band: ReadinessBand;
  label: string;
  drivers: string[];
  gaps: string[];
};

export type RoadmapPhase = {
  phase: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  weeksHint: string;
  tasks: Array<{
    id: string;
    name: string;
    description: string;
    owner: string;
    durationDays: number;
  }>;
};

export type AdvisorRecommendation = {
  id: string;
  title: string;
  detail: string;
  priority: 'high' | 'medium' | 'low';
};

export type AdvisorEngineReport = {
  id: string;
  createdAt: string;
  goalId: WizardGoalId;
  goalTitle: string;
  readiness: ReadinessScore;
  analysis: BusinessAnalysis;
  wizardSummary: WizardSummary;
  roadmap: RoadmapPhase[];
  estimatedBudgetInr: { min: number; max: number };
  estimatedBudgetLabel: string;
  estimatedTimelineWeeks: number;
  estimatedTimelineLabel: string;
  requiredRegistrations: string[];
  requiredLicenses: string[];
  recommendedServices: string[];
  recommendedPartnerCategories: Array<{
    id: PartnerCategory;
    label: string;
  }>;
  aiRecommendations: AdvisorRecommendation[];
  crmLeadId: string | null;
};

export const ADVISOR_ENGINE_STORAGE_KEY = 'uandv-advisor-engine-latest';
