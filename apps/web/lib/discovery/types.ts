import type { GuideLanguage } from '@/lib/business-guide';

export const discoveryQuestionIds = [
  'industry',
  'stage',
  'challenge',
  'goal',
  'timeline',
  'budget',
] as const;

export type DiscoveryQuestionId = (typeof discoveryQuestionIds)[number];

export type IndustryId =
  | 'restaurant'
  | 'hotel'
  | 'retail'
  | 'supermarket'
  | 'healthcare'
  | 'education'
  | 'manufacturing'
  | 'travel'
  | 'finance'
  | 'real-estate'
  | 'technology'
  | 'other';

export type StageId =
  | 'business-idea'
  | 'startup'
  | 'growing-business'
  | 'established-business'
  | 'enterprise';

export type ChallengeId =
  | 'getting-more-customers'
  | 'website'
  | 'mobile-app'
  | 'branding'
  | 'digital-marketing'
  | 'automation'
  | 'ai'
  | 'managing-operations'
  | 'complete-business-solution';

export type GoalId =
  | 'increase-revenue'
  | 'save-time'
  | 'reduce-costs'
  | 'expand-business'
  | 'launch-faster'
  | 'digital-transformation';

export type TimelineId =
  | 'immediately'
  | 'within-30-days'
  | 'within-3-months'
  | 'research-phase';

export type BudgetId =
  | '25k-50k'
  | '50k-1l'
  | '1l-5l'
  | '5l-plus'
  | 'not-sure';

export type DiscoveryAnswers = {
  industry?: IndustryId;
  stage?: StageId;
  challenge?: ChallengeId;
  goal?: GoalId;
  timeline?: TimelineId;
  budget?: BudgetId;
};

export type DiscoveryOption<T extends string = string> = {
  id: T;
  labelKey: string;
};

export type DiscoveryQuestionDef = {
  id: DiscoveryQuestionId;
  promptKey: string;
  helperKey: string;
  optional?: boolean;
  options: DiscoveryOption[];
};

export type RecommendedService = {
  id: string;
  labelKey: string;
};

export type BusinessSummary = {
  businessLabel: string;
  stageLabel: string;
  goalLabel: string;
  challengeLabel: string;
  timelineLabel: string;
  budgetLabel: string;
  services: RecommendedService[];
  estimatedTimelineDays: number;
  readinessPercent: number;
  journeyId: string;
  journeyTitle: string;
};

export type DiscoveryCopy = {
  language: GuideLanguage;
  /** Small badge above the conversation panel */
  sectionBadge: string;
  bridgeTitle: string;
  /** Supports multi-line paragraphs separated by \\n */
  bridgeBody: string;
  startCta: string;
  /** Shown before the first question (never "Step 0") */
  progressBeginLabel: string;
  /** Conversation progress — e.g. "Conversation {current} of {total}" */
  progressConversationLabel: string;
  progressCompleteLabel: string;
  backLabel: string;
  skipBudgetLabel: string;
  continueLabel: string;
  summaryEyebrow: string;
  summaryTitle: string;
  labelYourBusiness: string;
  labelCurrentStage: string;
  labelMainGoal: string;
  labelBiggestChallenge: string;
  labelPreferredStart: string;
  labelBudget: string;
  labelRecommendedServices: string;
  labelEstimatedTimeline: string;
  labelBusinessReadiness: string;
  timelineDays: string;
  disclaimer: string;
  ctaDownloadRoadmap: string;
  ctaBookSession: string;
  ctaWhatsApp: string;
  ctaEmailReport: string;
  restartLabel: string;
  changeAnswerHint: string;
  /** Short reassuring lines shown after each answer */
  reassuranceMessages: string[];
  questions: Record<DiscoveryQuestionId, { prompt: string; helper: string }>;
  options: Record<string, string>;
  serviceLabels: Record<string, string>;
};
