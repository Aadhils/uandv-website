import type { GuideLanguage, JourneyId } from '@/lib/business-guide';

import { enDiscovery } from './copy/en';
import { hiDiscovery, mlDiscovery, taDiscovery } from './copy/locales';
import type {
  BusinessSummary,
  ChallengeId,
  DiscoveryAnswers,
  DiscoveryCopy,
  GoalId,
  IndustryId,
  RecommendedService,
  StageId,
  TimelineId,
} from './types';

const catalog: Record<GuideLanguage, DiscoveryCopy> = {
  en: enDiscovery,
  ta: taDiscovery,
  hi: hiDiscovery,
  ml: mlDiscovery,
};

export function getDiscoveryCopy(
  language: GuideLanguage = 'en',
): DiscoveryCopy {
  return catalog[language] ?? catalog.en;
}

export function optionLabel(
  copy: DiscoveryCopy,
  group: string,
  id: string,
): string {
  return copy.options[`${group}.${id}`] ?? id;
}

function uniqueServices(services: RecommendedService[]) {
  const seen = new Set<string>();
  return services.filter((service) => {
    if (seen.has(service.id)) return false;
    seen.add(service.id);
    return true;
  });
}

function industryServices(industry?: IndustryId): RecommendedService[] {
  switch (industry) {
    case 'restaurant':
      return [
        { id: 'restaurant-pos', labelKey: 'restaurant-pos' },
        { id: 'website', labelKey: 'website' },
        { id: 'mobile-app', labelKey: 'mobile-app' },
      ];
    case 'hotel':
      return [
        { id: 'hotel-management', labelKey: 'hotel-management' },
        { id: 'website', labelKey: 'website' },
        { id: 'mobile-app', labelKey: 'mobile-app' },
      ];
    case 'retail':
    case 'supermarket':
      return [
        { id: 'ecommerce', labelKey: 'ecommerce' },
        { id: 'website', labelKey: 'website' },
        { id: 'crm', labelKey: 'crm' },
      ];
    case 'healthcare':
    case 'education':
    case 'manufacturing':
    case 'finance':
    case 'real-estate':
    case 'technology':
      return [
        { id: 'custom-software', labelKey: 'custom-software' },
        { id: 'website', labelKey: 'website' },
      ];
    case 'travel':
      return [
        { id: 'custom-software', labelKey: 'custom-software' },
        { id: 'website', labelKey: 'website' },
        { id: 'mobile-app', labelKey: 'mobile-app' },
      ];
    default:
      return [
        { id: 'business-consulting', labelKey: 'business-consulting' },
        { id: 'website', labelKey: 'website' },
      ];
  }
}

function challengeServices(challenge?: ChallengeId): RecommendedService[] {
  switch (challenge) {
    case 'getting-more-customers':
    case 'digital-marketing':
      return [{ id: 'digital-marketing', labelKey: 'digital-marketing' }];
    case 'website':
      return [{ id: 'website', labelKey: 'website' }];
    case 'mobile-app':
      return [{ id: 'mobile-app', labelKey: 'mobile-app' }];
    case 'branding':
      return [{ id: 'branding', labelKey: 'branding' }];
    case 'automation':
    case 'ai':
      return [{ id: 'ai-automation', labelKey: 'ai-automation' }];
    case 'managing-operations':
      return [
        { id: 'erp', labelKey: 'erp' },
        { id: 'crm', labelKey: 'crm' },
      ];
    case 'complete-business-solution':
      return [
        { id: 'business-consulting', labelKey: 'business-consulting' },
        { id: 'branding', labelKey: 'branding' },
        { id: 'website', labelKey: 'website' },
        { id: 'digital-marketing', labelKey: 'digital-marketing' },
      ];
    default:
      return [];
  }
}

function stageServices(stage?: StageId): RecommendedService[] {
  if (stage === 'business-idea' || stage === 'startup') {
    return [
      { id: 'company-registration', labelKey: 'company-registration' },
      { id: 'startup-support', labelKey: 'startup-support' },
      { id: 'branding', labelKey: 'branding' },
    ];
  }
  if (stage === 'growing-business' || stage === 'established-business') {
    return [
      { id: 'crm', labelKey: 'crm' },
      { id: 'digital-marketing', labelKey: 'digital-marketing' },
    ];
  }
  if (stage === 'enterprise') {
    return [
      { id: 'erp', labelKey: 'erp' },
      { id: 'custom-software', labelKey: 'custom-software' },
    ];
  }
  return [];
}

function journeyServices(journeyId: JourneyId): RecommendedService[] {
  switch (journeyId) {
    case 'start-new-business':
      return [
        { id: 'company-registration', labelKey: 'company-registration' },
        { id: 'branding', labelKey: 'branding' },
        { id: 'website', labelKey: 'website' },
      ];
    case 'grow-existing-business':
      return [
        { id: 'digital-marketing', labelKey: 'digital-marketing' },
        { id: 'crm', labelKey: 'crm' },
      ];
    case 'build-software-or-app':
      return [
        { id: 'custom-software', labelKey: 'custom-software' },
        { id: 'mobile-app', labelKey: 'mobile-app' },
      ];
    case 'automate-with-ai':
      return [{ id: 'ai-automation', labelKey: 'ai-automation' }];
    case 'partner-with-uandv':
      return [{ id: 'business-consulting', labelKey: 'business-consulting' }];
    default:
      return [];
  }
}

function estimateTimelineDays(
  stage?: StageId,
  timeline?: TimelineId,
  challenge?: ChallengeId,
): number {
  let days = 45;
  if (stage === 'business-idea' || stage === 'startup') days = 45;
  if (stage === 'growing-business') days = 60;
  if (stage === 'established-business' || stage === 'enterprise') days = 75;
  if (challenge === 'complete-business-solution') days += 15;
  if (timeline === 'immediately') days = Math.max(30, days - 10);
  if (timeline === 'research-phase') days += 15;
  return days;
}

function estimateReadiness(answers: DiscoveryAnswers): number {
  let score = 48;
  if (answers.industry) score += 8;
  if (answers.stage) score += 8;
  if (answers.challenge) score += 8;
  if (answers.goal) score += 8;
  if (answers.timeline) score += 8;
  if (answers.budget && answers.budget !== 'not-sure') score += 8;
  if (answers.stage === 'established-business' || answers.stage === 'enterprise') {
    score += 4;
  }
  if (answers.timeline === 'immediately' || answers.timeline === 'within-30-days') {
    score += 4;
  }
  return Math.min(92, score);
}

export function buildBusinessSummary(input: {
  answers: DiscoveryAnswers;
  journeyId: JourneyId;
  journeyTitle: string;
  copy: DiscoveryCopy;
}): BusinessSummary {
  const { answers, journeyId, journeyTitle, copy } = input;

  const services = uniqueServices([
    ...journeyServices(journeyId),
    ...stageServices(answers.stage),
    ...industryServices(answers.industry),
    ...challengeServices(answers.challenge),
  ]).slice(0, 7);

  const industryLabel = answers.industry
    ? optionLabel(copy, 'industry', answers.industry)
    : 'Business';
  const stageLabel = answers.stage
    ? optionLabel(copy, 'stage', answers.stage)
    : '—';

  let businessLabel = industryLabel;
  if (answers.stage === 'startup') {
    businessLabel = `${industryLabel} Startup`;
  } else if (answers.stage === 'business-idea') {
    businessLabel = `${industryLabel} — Business Idea`;
  } else if (answers.stage === 'growing-business') {
    businessLabel = `${industryLabel} Growth Business`;
  }

  return {
    businessLabel,
    stageLabel,
    goalLabel: answers.goal ? optionLabel(copy, 'goal', answers.goal) : '—',
    challengeLabel: answers.challenge
      ? optionLabel(copy, 'challenge', answers.challenge)
      : '—',
    timelineLabel: answers.timeline
      ? optionLabel(copy, 'timeline', answers.timeline)
      : '—',
    budgetLabel: answers.budget
      ? optionLabel(copy, 'budget', answers.budget)
      : optionLabel(copy, 'budget', 'not-sure'),
    services: services.map((service) => ({
      ...service,
      labelKey: copy.serviceLabels[service.id] ?? service.id,
    })),
    estimatedTimelineDays: estimateTimelineDays(
      answers.stage,
      answers.timeline,
      answers.challenge,
    ),
    readinessPercent: estimateReadiness(answers),
    journeyId,
    journeyTitle,
  };
}

export function formatProgressLabel(
  template: string,
  current: number,
  total: number,
) {
  return template
    .replace('{current}', String(current))
    .replace('{total}', String(total));
}

export function formatTimelineDays(template: string, days: number) {
  return template.replace('{days}', String(days));
}

export function buildRoadmapText(summary: BusinessSummary, copy: DiscoveryCopy) {
  const services = summary.services
    .map((service) => `✔ ${service.labelKey}`)
    .join('\n');

  return [
    'U&V Growth Roadmap',
    '==================',
    '',
    `${copy.labelYourBusiness}: ${summary.businessLabel}`,
    `${copy.labelCurrentStage}: ${summary.stageLabel}`,
    `${copy.labelMainGoal}: ${summary.goalLabel}`,
    `${copy.labelBiggestChallenge}: ${summary.challengeLabel}`,
    `${copy.labelPreferredStart}: ${summary.timelineLabel}`,
    `${copy.labelBudget}: ${summary.budgetLabel}`,
    '',
    copy.labelRecommendedServices,
    services,
    '',
    `${copy.labelEstimatedTimeline}: ${formatTimelineDays(copy.timelineDays, summary.estimatedTimelineDays)}`,
    `${copy.labelBusinessReadiness}: ${summary.readinessPercent}%`,
    '',
    copy.disclaimer,
    '',
    `Journey: ${summary.journeyTitle}`,
    'Prepared with your U&V growth partner — https://uandv.com',
  ].join('\n');
}

export type { GoalId };
