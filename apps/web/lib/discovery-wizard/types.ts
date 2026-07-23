/**
 * AI Business Discovery Wizard — Sprint 3.10 Phase 2.
 * Deterministic / demo-only. No external AI APIs.
 */

import type { JourneyId } from '@/lib/business-guide';
import type { PartnerCategory } from '@/lib/partners';

export type WizardGoalId = JourneyId;

export type QuestionType =
  | 'single_select'
  | 'multi_select'
  | 'short_text'
  | 'long_text'
  | 'numeric'
  | 'budget_range'
  | 'timeline'
  | 'yes_no'
  | 'location'
  | 'tag_select';

export type WizardOption = {
  id: string;
  label: string;
  description?: string;
  /** Lucide icon name from @uandv/ui Icon registry */
  icon?: string;
};

export type WizardShowWhen = {
  questionId: string;
  /** Show when answer equals one of these ids */
  equals?: string | string[];
  /** Show when answer is not one of these ids */
  notEquals?: string | string[];
};

export type WizardQuestion = {
  id: string;
  type: QuestionType;
  title: string;
  helper?: string;
  required: boolean;
  options?: WizardOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  minSelections?: number;
  maxSelections?: number;
  /** Average seconds a visitor spends on this step */
  estimatedSeconds?: number;
  /** Conditional visibility based on prior answers */
  showWhen?: WizardShowWhen[];
};

export type WizardFlow = {
  goalId: WizardGoalId;
  title: string;
  intro: string;
  questions: WizardQuestion[];
};

export type WizardAnswerValue = string | string[] | number | null;

export type WizardAnswers = Record<string, WizardAnswerValue>;

export type WizardSessionStatus =
  | 'in_progress'
  | 'completed'
  | 'abandoned';

export type WizardSession = {
  version: 2;
  goalId: WizardGoalId;
  stepIndex: number;
  answers: WizardAnswers;
  status: WizardSessionStatus;
  startedAt: string;
  updatedAt: string;
  /** CRM lead id created after completion (demo localStorage) */
  crmLeadId?: string | null;
};

export type WizardValidationResult =
  | { ok: true }
  | { ok: false; message: string };

export type WizardSummary = {
  goalId: WizardGoalId;
  goalTitle: string;
  businessProfile: string;
  mainObjective: string;
  currentStage: string;
  keyRequirements: string[];
  selectedServices: string[];
  budgetRange: string;
  timeline: string;
  estimatedBudgetInr: { min: number; max: number };
  estimatedBudgetLabel: string;
  estimatedTimelineWeeks: number;
  estimatedTimelineLabel: string;
  recommendedPartnerCategories: Array<{
    id: PartnerCategory;
    label: string;
  }>;
  riskIndicators: string[];
  missingInformation: string[];
  recommendedNextAction: string;
  answerHighlights: Array<{ label: string; value: string }>;
  crmLeadId: string | null;
};

export type DemoLeadPreview = {
  leadId: string;
  customerName: string;
  goal: string;
  businessCategory: string;
  contactStatus: string;
  leadPriority: 'low' | 'medium' | 'high' | 'urgent';
  suggestedEmployee: string;
  suggestedPartner: string;
  estimatedValueInr: { min: number; max: number };
  nextFollowUpDate: string;
  createdAt: string;
};

export const WIZARD_STORAGE_KEY = 'uandv-discovery-wizard-session';
export const WIZARD_EVENTS_KEY = 'uandv-discovery-wizard-events';
export const SECONDS_PER_STEP_DEFAULT = 40;

export const WIZARD_GOALS: Array<{
  id: WizardGoalId;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'start-new-business',
    title: 'Start a New Business',
    description:
      'You have an idea. Let’s turn it into something real — step by step, without overwhelm.',
    icon: 'Rocket',
  },
  {
    id: 'grow-existing-business',
    title: 'Grow My Existing Business',
    description:
      'You’re already running. Let’s strengthen what’s working and remove what’s slowing you down.',
    icon: 'TrendingUp',
  },
  {
    id: 'build-software-or-app',
    title: 'Build Software or an App',
    description:
      'You need a product built properly — clear plan, clean design, reliable delivery.',
    icon: 'Smartphone',
  },
  {
    id: 'automate-with-ai',
    title: 'Automate My Business with AI',
    description:
      'Too much manual work? Let’s find where AI can save time — safely and practically.',
    icon: 'Sparkles',
  },
  {
    id: 'partner-with-uandv',
    title: 'Partner with U&V',
    description:
      'You want to grow together — as a collaborator, not just a client.',
    icon: 'Handshake',
  },
];
