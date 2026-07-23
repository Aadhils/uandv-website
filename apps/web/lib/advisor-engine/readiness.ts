import type { BusinessAnalysis } from '@/lib/business-advisor';
import type { WizardAnswers, WizardGoalId } from '@/lib/discovery-wizard';
import { getActiveQuestions } from '@/lib/discovery-wizard';

import type { ReadinessBand, ReadinessScore } from './types';

function bandFor(score: number): ReadinessBand {
  if (score >= 80) return 'strong';
  if (score >= 65) return 'ready';
  if (score >= 45) return 'developing';
  return 'emerging';
}

function labelFor(band: ReadinessBand): string {
  switch (band) {
    case 'strong':
      return 'Strong readiness';
    case 'ready':
      return 'Investment-ready foundation';
    case 'developing':
      return 'Developing — clarify a few gaps';
    default:
      return 'Emerging — early discovery stage';
  }
}

/**
 * Deterministic readiness score from discovery completeness + analyzer signals.
 */
export function computeReadinessScore(
  goalId: WizardGoalId,
  answers: WizardAnswers,
  analysis: BusinessAnalysis,
): ReadinessScore {
  const questions = getActiveQuestions(goalId, answers);
  const answered = questions.filter((question) => {
    const value = answers[question.id];
    if (value === undefined || value === null) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  }).length;

  const completeness =
    questions.length === 0
      ? 50
      : Math.round((answered / questions.length) * 40);

  let score = 28 + completeness;

  const drivers: string[] = [];
  const gaps: string[] = [];

  if (answered >= questions.length) {
    drivers.push('Discovery answers are complete for this path.');
  } else {
    gaps.push('A few discovery answers are still missing.');
  }

  score += Math.round(analysis.goalConfidence * 0.2);

  if (analysis.riskLevel === 'low') {
    score += 8;
    drivers.push('Risk level looks manageable.');
  } else if (analysis.riskLevel === 'medium') {
    score += 3;
  } else {
    score -= 6;
    gaps.push('Risk indicators need attention before full execution.');
  }

  const missingReal = analysis.missingInformation.filter(
    (item) => !item.toLowerCase().startsWith('none'),
  );
  score -= Math.min(12, missingReal.length * 3);
  if (missingReal.length) {
    gaps.push(...missingReal.slice(0, 2));
  } else {
    drivers.push('No major information gaps flagged by the advisor.');
  }

  if (
    typeof answers.estimated_budget === 'string' &&
    answers.estimated_budget !== 'not-sure'
  ) {
    score += 6;
    drivers.push('Budget range is defined.');
  } else {
    gaps.push('Confirm a realistic budget range.');
  }

  if (
    typeof answers.launch_timeline === 'string' &&
    answers.launch_timeline !== 'flexible'
  ) {
    score += 4;
    drivers.push('Launch timing is defined.');
  }

  if (
    answers.registration_status === 'completed' ||
    answers.registration_status === 'in-progress'
  ) {
    score += 5;
    drivers.push('Registration progress is underway.');
  } else if (
    answers.registration_status === 'not-started' ||
    answers.registration_status === 'unsure'
  ) {
    score -= 3;
    gaps.push('Registration readiness is still early.');
  }

  if (analysis.recommendedServices.length >= 3) {
    drivers.push('Clear service recommendations are available.');
  }

  score = Math.max(18, Math.min(96, Math.round(score)));
  const band = bandFor(score);

  if (!drivers.length) {
    drivers.push('Continue refining discovery answers to improve readiness.');
  }

  return {
    score,
    band,
    label: labelFor(band),
    drivers: drivers.slice(0, 4),
    gaps: gaps.slice(0, 4),
  };
}
