import type { WizardAnswers, WizardGoalId } from './types';
import { buildWizardSummary } from './summary';

/**
 * Lightweight recommendation hints for the summary screen.
 * Deep analysis remains in the Business Advisor analyzer.
 */
export function recommendNextSteps(
  goalId: WizardGoalId,
  answers: WizardAnswers,
): string[] {
  const summary = buildWizardSummary(goalId, answers);
  const steps = [
    summary.recommendedNextAction,
    'Keep this discovery session saved locally so you can resume anytime.',
  ];

  if (summary.selectedServices.length) {
    steps.push(
      `Prioritize: ${summary.selectedServices.slice(0, 3).join(', ')}.`,
    );
  }

  if (
    summary.missingInformation[0] &&
    !summary.missingInformation[0].startsWith('None')
  ) {
    steps.push('Fill any missing details before a live consultation.');
  }

  return steps;
}
