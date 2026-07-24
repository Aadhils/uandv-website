import type {
  WizardAnswers,
  WizardGoalId,
  WizardQuestion,
  WizardShowWhen,
} from './types';
import { SECONDS_PER_STEP_DEFAULT } from './types';
import { getWizardFlow } from './flows';

function asComparable(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) return value;
  return null;
}

function matchesRule(
  answers: WizardAnswers,
  rule: WizardShowWhen,
): boolean {
  const raw = answers[rule.questionId];
  const value = asComparable(raw);

  if (rule.equals !== undefined) {
    const allowed = Array.isArray(rule.equals) ? rule.equals : [rule.equals];
    if (!value || !allowed.includes(value)) return false;
  }

  if (rule.notEquals !== undefined) {
    const blocked = Array.isArray(rule.notEquals)
      ? rule.notEquals
      : [rule.notEquals];
    if (value && blocked.includes(value)) return false;
  }

  return true;
}

export function isQuestionVisible(
  question: WizardQuestion,
  answers: WizardAnswers,
): boolean {
  if (!question.showWhen?.length) return true;
  return question.showWhen.every((rule) => matchesRule(answers, rule));
}

/**
 * Resolves the active  guided path for the selected goal.
 * Questions with `showWhen` appear only when prior answers match.
 */
export function getActiveQuestions(
  goalId: WizardGoalId,
  answers: WizardAnswers,
): WizardQuestion[] {
  return getWizardFlow(goalId).questions.filter((question) =>
    isQuestionVisible(question, answers),
  );
}

export function getQuestionSeconds(question: WizardQuestion): number {
  return question.estimatedSeconds ?? SECONDS_PER_STEP_DEFAULT;
}

export function estimateRemainingSeconds(
  questions: WizardQuestion[],
  stepIndex: number,
): number {
  if (!questions.length) return 0;
  const start = Math.max(0, Math.min(stepIndex, questions.length - 1));
  return questions
    .slice(start)
    .reduce((sum, question) => sum + getQuestionSeconds(question), 0);
}

export function formatRemainingTime(totalSeconds: number): string {
  if (totalSeconds <= 0) return 'Almost done';
  const minutes = Math.max(1, Math.ceil(totalSeconds / 60));
  if (minutes === 1) return 'About 1 minute left';
  return `About ${minutes} minutes left`;
}

export function clampStepIndex(
  stepIndex: number,
  questionCount: number,
): number {
  if (questionCount <= 0) return 0;
  return Math.min(Math.max(stepIndex, 0), questionCount - 1);
}
