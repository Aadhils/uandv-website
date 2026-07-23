import type {
  BusinessAdvisorInput,
  BusinessStage,
} from '@/lib/business-advisor';
import { analyzeBusinessRequirement, saveLatestAnalysis } from '@/lib/business-advisor';

import { getWizardGoalTitle } from './flows';
import { buildWizardSummary } from './summary';
import type { WizardAnswers, WizardGoalId } from './types';

const CATEGORY_TO_TYPE: Record<string, string> = {
  retail: 'retail shop',
  restaurant: 'restaurant',
  travel: 'travel agency',
  software: 'it company software product',
  manufacturing: 'manufacturing',
  'professional-services': 'professional services',
  other: 'startup business',
};

const STAGE_MAP: Record<string, BusinessStage> = {
  idea: 'idea',
  planning: 'planning',
  'pre-launch': 'pre_launch',
  launching: 'launching',
  operating: 'operating',
  scaling: 'scaling',
  struggling: 'struggling',
};

const LOCATION_TO_REGION: Record<string, { city: string; state: string }> = {
  'tamil-nadu': { city: 'Chennai', state: 'Tamil Nadu' },
  kerala: { city: 'Kochi', state: 'Kerala' },
  karnataka: { city: 'Bengaluru', state: 'Karnataka' },
  'andhra-pradesh': { city: 'Vijayawada', state: 'Andhra Pradesh' },
  telangana: { city: 'Hyderabad', state: 'Telangana' },
  'other-india': { city: 'India', state: 'India' },
  'outside-india': { city: 'International', state: 'Outside India' },
};

const BUDGET_MIDPOINTS: Record<string, number | null> = {
  'under-50k': 40000,
  '50k-1l': 75000,
  '1l-3l': 200000,
  '3l-5l': 400000,
  '5l-plus': 750000,
  'not-sure': null,
};

const TIMELINE_TEXT: Record<string, string> = {
  asap: 'As soon as possible',
  '30-days': 'Within 30 days',
  '90-days': 'Within 90 days',
  '6-months': 'Within 6 months',
  flexible: 'Flexible timeline',
};

function asText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'number') return String(value);
  return '';
}

/**
 * Maps discovery-wizard answers into the existing Business Advisor input shape.
 * Does not duplicate analyzer logic.
 */
export function wizardAnswersToAdvisorInput(
  goalId: WizardGoalId,
  answers: WizardAnswers,
): BusinessAdvisorInput {
  const summary = buildWizardSummary(goalId, answers);
  const goalTitle = getWizardGoalTitle(goalId);

  const categoryKey = asText(answers.business_category);
  const businessType =
    CATEGORY_TO_TYPE[categoryKey] ||
    asText(answers.product_type) ||
    asText(answers.partner_category) ||
    summary.businessProfile ||
    goalTitle;

  const stageKey = asText(answers.current_stage);
  let currentStage: BusinessStage | '' = STAGE_MAP[stageKey] ?? '';
  if (!currentStage) {
    if (
      goalId === 'grow-existing-business' ||
      goalId === 'partner-with-uandv'
    ) {
      currentStage = 'operating';
    } else {
      currentStage = 'planning';
    }
  }

  const locationKey = asText(answers.business_location || answers.service_area);
  const region =
    LOCATION_TO_REGION[locationKey] ?? {
      city: 'Tamil Nadu',
      state: 'Tamil Nadu',
    };

  const budgetKey = asText(answers.estimated_budget);
  const estimatedBudgetInr =
    budgetKey && budgetKey in BUDGET_MIDPOINTS
      ? BUDGET_MIDPOINTS[budgetKey] ?? null
      : null;

  const timelineKey = asText(answers.launch_timeline);
  const desiredLaunchTimeline =
    TIMELINE_TEXT[timelineKey] || summary.timeline || 'To be confirmed';

  const idea = asText(answers.business_idea);
  const servicesOffered = asText(answers.services_offered);
  const businessGoal =
    idea ||
    servicesOffered ||
    `${goalTitle}: ${summary.mainObjective}`.slice(0, 400);

  const notesParts = [
    `Discovery goal: ${goalTitle}`,
    summary.keyRequirements.length
      ? `Key requirements: ${summary.keyRequirements.join('; ')}`
      : null,
    summary.selectedServices.length
      ? `Suggested services from discovery: ${summary.selectedServices.join('; ')}`
      : null,
    asText(answers.growth_problem)
      ? `Growth problem: ${asText(answers.growth_problem)}`
      : null,
    asText(answers.expected_outcome)
      ? `Expected AI outcome: ${asText(answers.expected_outcome)}`
      : null,
  ].filter(Boolean);

  return {
    businessGoal:
      businessGoal.length >= 8
        ? businessGoal
        : `I want help with ${goalTitle.toLowerCase()} for my business.`,
    businessType,
    currentStage,
    city: region.city,
    state: region.state,
    estimatedBudgetInr,
    desiredLaunchTimeline,
    existingRegistrations: asText(answers.registration_status),
    existingDigitalAssets: asText(answers.digital_presence || answers.design_spec),
    preferredLanguage: 'English',
    additionalNotes: notesParts.join('\n'),
  };
}

export function generateAnalysisFromWizard(
  goalId: WizardGoalId,
  answers: WizardAnswers,
  options?: { customerName?: string },
) {
  const input = wizardAnswersToAdvisorInput(goalId, answers);
  const result = analyzeBusinessRequirement(input, {
    id: `wiz-${Date.now().toString(36)}`,
    customerId: 'demo-discovery-visitor',
    customerName: options?.customerName ?? 'Discovery Visitor',
  });

  if (result.ok) {
    saveLatestAnalysis(result.analysis);
  }

  return result;
}
