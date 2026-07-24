import {
  PHASE_LABELS,
  type BusinessAnalysis,
} from '@/lib/business-advisor';

import type { AdvisorRecommendation, RoadmapPhase } from './types';

const OWNER_LABEL: Record<string, string> = {
  customer: 'You',
  uandv_employee: 'U&V team',
  partner: 'Partner',
  shared: 'Shared',
};

export function buildRoadmapFromAnalysis(
  analysis: BusinessAnalysis,
): RoadmapPhase[] {
  const weeksPerPhase = Math.max(
    1,
    Math.round(analysis.estimatedTimelineWeeks / 6),
  );

  return ([1, 2, 3, 4, 5, 6] as const).map((phase) => {
    const tasks = analysis.actionPlan
      .filter((task) => task.phase === phase)
      .map((task) => ({
        id: task.id,
        name: task.taskName,
        description: task.description,
        owner: OWNER_LABEL[task.suggestedOwner] ?? task.suggestedOwner,
        durationDays: task.estimatedDurationDays,
      }));

    return {
      phase,
      label: PHASE_LABELS[phase],
      weeksHint: `~${weeksPerPhase} week${weeksPerPhase === 1 ? '' : 's'}`,
      tasks,
    };
  });
}

export function buildAiRecommendations(
  analysis: BusinessAnalysis,
): AdvisorRecommendation[] {
  const items: AdvisorRecommendation[] = [];

  items.push({
    id: 'next-action',
    title: 'Next best action',
    detail: analysis.nextBestAction,
    priority: 'high',
  });

  if (analysis.riskIndicators[0]) {
    items.push({
      id: 'risk-focus',
      title: 'Address the top risk early',
      detail: analysis.riskIndicators[0],
      priority: analysis.riskLevel === 'high' ? 'high' : 'medium',
    });
  }

  if (analysis.recommendedServices[0]) {
    items.push({
      id: 'service-focus',
      title: 'Start with the highest-leverage service',
      detail: `Prioritize “${analysis.recommendedServices[0]}” in phase one so momentum compounds.`,
      priority: 'high',
    });
  }

  for (const opportunity of analysis.opportunities.slice(0, 2)) {
    items.push({
      id: opportunity.id,
      title: opportunity.title,
      detail: `${opportunity.reason} Suggested: ${opportunity.recommendedService}.`,
      priority: opportunity.opportunityScore >= 70 ? 'high' : 'medium',
    });
  }

  if (analysis.missingInformation[0] && !analysis.missingInformation[0].startsWith('None')) {
    items.push({
      id: 'fill-gaps',
      title: 'Close information gaps',
      detail: analysis.missingInformation[0],
      priority: 'medium',
    });
  }

  items.push({
    id: 'summary',
    title: 'Advisor summary',
    detail: analysis.summary,
    priority: 'low',
  });

  return items.slice(0, 6);
}
