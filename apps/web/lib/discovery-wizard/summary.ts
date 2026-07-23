import { getWizardFlow, getWizardGoalTitle } from './flows';
import { getActiveQuestions } from './dynamic-flow';
import type {
  WizardAnswerValue,
  WizardAnswers,
  WizardGoalId,
  WizardOption,
  WizardQuestion,
  WizardSummary,
} from './types';
import type { PartnerCategory } from '@/lib/partners';
import { PARTNER_CATEGORY_LABELS } from '@/lib/partners';
import { formatAdvisorBudget } from '@/lib/business-advisor';

function labelFor(
  question: WizardQuestion | undefined,
  value: WizardAnswerValue | undefined,
): string {
  if (value === undefined || value === null) return 'Not provided';
  if (Array.isArray(value)) {
    if (!value.length) return 'Not provided';
    return value
      .map((id) => question?.options?.find((opt) => opt.id === id)?.label ?? id)
      .join(', ');
  }
  if (typeof value === 'number') return String(value);
  return question?.options?.find((opt) => opt.id === value)?.label ?? value;
}

function optionLabels(
  options: WizardOption[] | undefined,
  ids: string[],
): string[] {
  if (!options) return ids;
  return ids.map(
    (id) => options.find((option) => option.id === id)?.label ?? id,
  );
}

function asIds(value: WizardAnswerValue | undefined): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string');
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

function buildServices(
  goalId: WizardGoalId,
  answers: WizardAnswers,
): string[] {
  const support = asIds(answers.support_areas);
  const features = asIds(answers.main_features);
  const channels = asIds(answers.marketing_channels);
  const processes = asIds(answers.manual_processes);

  const mapped = new Set<string>();

  for (const id of support) {
    const map: Record<string, string> = {
      'registration-legal': 'Business registration support',
      branding: 'Branding & logo design',
      website: 'Website development',
      'mobile-app': 'Mobile app development',
      'business-software': 'Custom software development',
      funding: 'Funding readiness advisory',
      marketing: 'Digital marketing',
      recruitment: 'Recruitment support',
      'vendor-support': 'Vendor / partner network',
      'crm-erp': 'CRM / ERP setup',
      automation: 'AI automation',
      strategy: 'Growth consulting',
    };
    if (map[id]) mapped.add(map[id]);
  }

  if (goalId === 'build-software-or-app') {
    mapped.add('Custom software development');
    if (features.includes('payments')) mapped.add('Payment integration');
    if (features.includes('ai')) mapped.add('AI feature design');
  }

  if (goalId === 'automate-with-ai') {
    mapped.add('AI automation');
    if (processes.includes('customer-support')) {
      mapped.add('AI customer support workflows');
    }
    if (processes.includes('lead-followup')) {
      mapped.add('Lead follow-up automation');
    }
  }

  if (goalId === 'grow-existing-business') {
    if (channels.includes('google') || channels.includes('instagram')) {
      mapped.add('Digital marketing');
    }
    if (answers.digital_presence === 'none' || answers.digital_presence === 'outdated') {
      mapped.add('Website development');
    }
  }

  if (goalId === 'partner-with-uandv') {
    mapped.add('Partner onboarding review');
    mapped.add('Collaboration scoping');
  }

  if (!mapped.size) {
    mapped.add('Discovery consultation');
  }

  return [...mapped];
}

function buildRisks(goalId: WizardGoalId, answers: WizardAnswers): string[] {
  const risks: string[] = [];

  if (answers.estimated_budget === 'not-sure' || answers.estimated_budget === 'under-50k') {
    risks.push('Budget clarity may be too early for a full build.');
  }
  if (answers.launch_timeline === 'asap') {
    risks.push('Aggressive timeline may require phased delivery.');
  }
  if (answers.registration_status === 'not-started' || answers.registration_status === 'unsure') {
    risks.push('Registration readiness is incomplete.');
  }
  if (answers.design_spec === 'none') {
    risks.push('Product scope may expand without designs or a written brief.');
  }
  if (answers.data_availability === 'starting' || answers.data_availability === 'documents') {
    risks.push('Data readiness may slow AI automation.');
  }
  if (answers.verification_docs === 'need-help' || answers.verification_docs === 'later') {
    risks.push('Partner verification documents are not ready yet.');
  }
  if (goalId === 'grow-existing-business' && answers.lead_volume === 'unknown') {
    risks.push('Lead tracking is unclear — growth diagnosis will stay high-level.');
  }
  if (!risks.length) {
    risks.push('No major blockers detected from the answers so far.');
  }
  return risks;
}

function estimateBudgetInr(answers: WizardAnswers): { min: number; max: number } {
  const key =
    typeof answers.estimated_budget === 'string'
      ? answers.estimated_budget
      : 'not-sure';
  const map: Record<string, { min: number; max: number }> = {
    'under-50k': { min: 25000, max: 50000 },
    '50k-1l': { min: 50000, max: 100000 },
    '1l-3l': { min: 100000, max: 300000 },
    '3l-5l': { min: 300000, max: 500000 },
    '5l-plus': { min: 500000, max: 1200000 },
    'not-sure': { min: 75000, max: 250000 },
  };
  return map[key] ?? map['not-sure']!;
}

function estimateTimelineWeeks(answers: WizardAnswers): number {
  const key =
    typeof answers.launch_timeline === 'string'
      ? answers.launch_timeline
      : 'flexible';
  const map: Record<string, number> = {
    asap: 4,
    '30-days': 6,
    '90-days': 12,
    '6-months': 20,
    flexible: 14,
  };
  return map[key] ?? 12;
}

function recommendPartnerCategories(
  goalId: WizardGoalId,
  answers: WizardAnswers,
  services: string[],
): Array<{ id: PartnerCategory; label: string }> {
  const ids = new Set<PartnerCategory>();

  if (goalId === 'start-new-business') {
    ids.add('company_registration');
    ids.add('business_consultant');
    if (answers.registration_status !== 'completed') {
      ids.add('gst_consultant');
      ids.add('chartered_accountant');
    }
    if (
      answers.business_name_status === 'need-help' ||
      answers.business_name_status === 'exploring' ||
      answers.branding_focus
    ) {
      ids.add('graphic_design');
    }
  }

  if (goalId === 'grow-existing-business') {
    ids.add('digital_marketing');
    ids.add('seo');
    ids.add('business_consultant');
  }

  if (goalId === 'build-software-or-app') {
    ids.add('website_development');
    ids.add('mobile_app_development');
    ids.add('cloud_services');
  }

  if (goalId === 'automate-with-ai') {
    ids.add('ai_automation');
    ids.add('cloud_services');
  }

  if (goalId === 'partner-with-uandv') {
    ids.add('business_consultant');
    const partner = answers.partner_category;
    if (partner === 'marketing') ids.add('digital_marketing');
    if (partner === 'technology' || partner === 'freelancer') {
      ids.add('website_development');
    }
    if (partner === 'investor') ids.add('investor_network');
  }

  for (const service of services) {
    const lower = service.toLowerCase();
    if (lower.includes('website')) ids.add('website_development');
    if (lower.includes('mobile')) ids.add('mobile_app_development');
    if (lower.includes('marketing')) ids.add('digital_marketing');
    if (lower.includes('brand')) ids.add('graphic_design');
    if (lower.includes('ai') || lower.includes('automation')) {
      ids.add('ai_automation');
    }
    if (lower.includes('registration')) ids.add('company_registration');
    if (lower.includes('funding')) ids.add('loan_consultant');
  }

  return [...ids].slice(0, 5).map((id) => ({
    id,
    label: PARTNER_CATEGORY_LABELS[id],
  }));
}

function buildMissing(answers: WizardAnswers, questions: WizardQuestion[]): string[] {
  const missing: string[] = [];
  for (const question of questions) {
    const value = answers[question.id];
    const empty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && !value.trim()) ||
      (Array.isArray(value) && value.length === 0);
    if (empty && question.required && !question.showWhen) {
      missing.push(question.title);
    }
  }
  if (answers.estimated_budget === 'not-sure') {
    missing.push('Confirmed budget range');
  }
  if (!missing.length) {
    missing.push('None — discovery answers look complete for a first review.');
  }
  return missing;
}

export function buildWizardSummary(
  goalId: WizardGoalId,
  answers: WizardAnswers,
  options?: { crmLeadId?: string | null },
): WizardSummary {
  const flow = getWizardFlow(goalId);
  const activeQuestions = getActiveQuestions(goalId, answers);
  const goalTitle = getWizardGoalTitle(goalId);
  const byId = Object.fromEntries(
    flow.questions.map((question) => [question.id, question]),
  );

  const category = labelFor(byId.business_category, answers.business_category);
  const stage = labelFor(
    byId.current_stage ?? byId.years_in_operation,
    answers.current_stage ?? answers.years_in_operation,
  );
  const budget = labelFor(byId.estimated_budget, answers.estimated_budget);
  const timeline = labelFor(byId.launch_timeline, answers.launch_timeline);
  const estimatedBudgetInr = estimateBudgetInr(answers);
  const estimatedTimelineWeeks = estimateTimelineWeeks(answers);

  const profileParts = [
    category !== 'Not provided' ? category : null,
    labelFor(
      byId.business_location ?? byId.service_area,
      answers.business_location ?? answers.service_area,
    ),
    labelFor(byId.product_type, answers.product_type),
    labelFor(byId.partner_category, answers.partner_category),
  ].filter((part) => part && part !== 'Not provided');

  const objective =
    (typeof answers.business_idea === 'string' && answers.business_idea.trim()) ||
    (typeof answers.services_offered === 'string' &&
      answers.services_offered.trim()) ||
    labelFor(
      byId.growth_target ?? byId.expected_outcome ?? byId.growth_problem,
      answers.growth_target ??
        answers.expected_outcome ??
        answers.growth_problem,
    );

  const supportIds = asIds(answers.support_areas);
  const keyRequirements = [
    ...optionLabels(byId.support_areas?.options, supportIds),
    ...optionLabels(byId.main_features?.options, asIds(answers.main_features)),
    ...optionLabels(
      byId.manual_processes?.options,
      asIds(answers.manual_processes),
    ),
  ].filter(Boolean);

  if (
    typeof answers.services_offered === 'string' &&
    answers.services_offered.trim()
  ) {
    keyRequirements.push(answers.services_offered.trim());
  }

  const selectedServices = buildServices(goalId, answers);
  if (answers.website_priority === 'yes') {
    selectedServices.unshift('Website development');
  }
  if (answers.branding_focus && answers.branding_focus !== 'later') {
    selectedServices.unshift('Branding & logo design');
  }
  const uniqueServices = [...new Set(selectedServices)];

  const riskIndicators = buildRisks(goalId, answers);
  const missingInformation = buildMissing(answers, activeQuestions);
  const recommendedPartnerCategories = recommendPartnerCategories(
    goalId,
    answers,
    uniqueServices,
  );

  const nextAction =
    goalId === 'partner-with-uandv'
      ? 'Review partner fit and schedule a collaboration conversation.'
      : 'Review the consultation summary, then generate a requirement analysis or book a strategy conversation.';

  const answerHighlights = activeQuestions.slice(0, 6).map((question) => ({
    label: question.title,
    value: labelFor(question, answers[question.id]),
  }));

  return {
    goalId,
    goalTitle,
    businessProfile: profileParts.join(' · ') || goalTitle,
    mainObjective: objective || `Explore the ${goalTitle} path with U&V.`,
    currentStage: stage,
    keyRequirements: keyRequirements.length
      ? keyRequirements
      : uniqueServices.slice(0, 4),
    selectedServices: uniqueServices,
    budgetRange: budget,
    timeline: timeline !== 'Not provided' ? timeline : 'To be confirmed',
    estimatedBudgetInr,
    estimatedBudgetLabel: formatAdvisorBudget(estimatedBudgetInr),
    estimatedTimelineWeeks,
    estimatedTimelineLabel: `About ${estimatedTimelineWeeks} weeks`,
    recommendedPartnerCategories,
    riskIndicators,
    missingInformation,
    recommendedNextAction: nextAction,
    answerHighlights,
    crmLeadId: options?.crmLeadId ?? null,
  };
}

export function formatAnswerDisplay(
  question: WizardQuestion,
  value: WizardAnswerValue | undefined,
): string {
  return labelFor(question, value);
}
