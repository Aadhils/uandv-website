import { buildWizardSummary } from './summary';
import type { DemoLeadPreview, WizardAnswers, WizardGoalId } from './types';

const EMPLOYEE_BY_GOAL: Record<WizardGoalId, string> = {
  'start-new-business': 'Priya N. · Business Consultant',
  'grow-existing-business': 'Arun K. · Growth Strategist',
  'build-software-or-app': 'Meera S. · Solution Architect',
  'automate-with-ai': 'Vikram R. · AI Solutions Lead',
  'partner-with-uandv': 'Divya M. · Partner Success',
};

const PARTNER_BY_GOAL: Record<WizardGoalId, string> = {
  'start-new-business': 'Local compliance partner (demo)',
  'grow-existing-business': 'Performance marketing partner (demo)',
  'build-software-or-app': 'UI/UX design partner (demo)',
  'automate-with-ai': 'Automation implementation partner (demo)',
  'partner-with-uandv': 'Internal partner desk (demo)',
};

const BUDGET_VALUE: Record<string, { min: number; max: number }> = {
  'under-50k': { min: 25000, max: 50000 },
  '50k-1l': { min: 50000, max: 100000 },
  '1l-3l': { min: 100000, max: 300000 },
  '3l-5l': { min: 300000, max: 500000 },
  '5l-plus': { min: 500000, max: 1200000 },
  'not-sure': { min: 75000, max: 250000 },
};

function addDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Demo-only lead preview. Does not create a real CRM record.
 */
export function buildDemoLeadPreview(
  goalId: WizardGoalId,
  answers: WizardAnswers,
): DemoLeadPreview {
  const summary = buildWizardSummary(goalId, answers);
  const budgetKey =
    typeof answers.estimated_budget === 'string'
      ? answers.estimated_budget
      : 'not-sure';
  const estimatedValueInr = BUDGET_VALUE[budgetKey] ?? BUDGET_VALUE['not-sure']!;

  const priority =
    answers.launch_timeline === 'asap'
      ? 'urgent'
      : answers.launch_timeline === '30-days'
        ? 'high'
        : summary.riskIndicators.some((risk) =>
              risk.toLowerCase().includes('incomplete'),
            )
          ? 'medium'
          : 'medium';

  return {
    leadId: `LEAD-DEMO-${Date.now().toString(36).toUpperCase()}`,
    customerName: 'Demo Visitor',
    goal: summary.goalTitle,
    businessCategory: summary.businessProfile,
    contactStatus: 'New · awaiting first outreach (demo)',
    leadPriority: priority,
    suggestedEmployee: EMPLOYEE_BY_GOAL[goalId],
    suggestedPartner: PARTNER_BY_GOAL[goalId],
    estimatedValueInr,
    nextFollowUpDate: addDays(priority === 'urgent' ? 1 : 2),
    createdAt: new Date().toISOString(),
  };
}
