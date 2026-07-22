import type { DiscoveryQuestionDef } from './types';

/** Question structure — labels come from translation keys, never hardcoded in UI. */
export const discoveryQuestions: DiscoveryQuestionDef[] = [
  {
    id: 'industry',
    promptKey: 'questions.industry.prompt',
    helperKey: 'questions.industry.helper',
    options: [
      { id: 'restaurant', labelKey: 'options.industry.restaurant' },
      { id: 'hotel', labelKey: 'options.industry.hotel' },
      { id: 'retail', labelKey: 'options.industry.retail' },
      { id: 'supermarket', labelKey: 'options.industry.supermarket' },
      { id: 'healthcare', labelKey: 'options.industry.healthcare' },
      { id: 'education', labelKey: 'options.industry.education' },
      { id: 'manufacturing', labelKey: 'options.industry.manufacturing' },
      { id: 'travel', labelKey: 'options.industry.travel' },
      { id: 'finance', labelKey: 'options.industry.finance' },
      { id: 'real-estate', labelKey: 'options.industry.real-estate' },
      { id: 'technology', labelKey: 'options.industry.technology' },
      { id: 'other', labelKey: 'options.industry.other' },
    ],
  },
  {
    id: 'stage',
    promptKey: 'questions.stage.prompt',
    helperKey: 'questions.stage.helper',
    options: [
      { id: 'business-idea', labelKey: 'options.stage.business-idea' },
      { id: 'startup', labelKey: 'options.stage.startup' },
      { id: 'growing-business', labelKey: 'options.stage.growing-business' },
      {
        id: 'established-business',
        labelKey: 'options.stage.established-business',
      },
      { id: 'enterprise', labelKey: 'options.stage.enterprise' },
    ],
  },
  {
    id: 'challenge',
    promptKey: 'questions.challenge.prompt',
    helperKey: 'questions.challenge.helper',
    options: [
      {
        id: 'getting-more-customers',
        labelKey: 'options.challenge.getting-more-customers',
      },
      { id: 'website', labelKey: 'options.challenge.website' },
      { id: 'mobile-app', labelKey: 'options.challenge.mobile-app' },
      { id: 'branding', labelKey: 'options.challenge.branding' },
      {
        id: 'digital-marketing',
        labelKey: 'options.challenge.digital-marketing',
      },
      { id: 'automation', labelKey: 'options.challenge.automation' },
      { id: 'ai', labelKey: 'options.challenge.ai' },
      {
        id: 'managing-operations',
        labelKey: 'options.challenge.managing-operations',
      },
      {
        id: 'complete-business-solution',
        labelKey: 'options.challenge.complete-business-solution',
      },
    ],
  },
  {
    id: 'goal',
    promptKey: 'questions.goal.prompt',
    helperKey: 'questions.goal.helper',
    options: [
      { id: 'increase-revenue', labelKey: 'options.goal.increase-revenue' },
      { id: 'save-time', labelKey: 'options.goal.save-time' },
      { id: 'reduce-costs', labelKey: 'options.goal.reduce-costs' },
      { id: 'expand-business', labelKey: 'options.goal.expand-business' },
      { id: 'launch-faster', labelKey: 'options.goal.launch-faster' },
      {
        id: 'digital-transformation',
        labelKey: 'options.goal.digital-transformation',
      },
    ],
  },
  {
    id: 'timeline',
    promptKey: 'questions.timeline.prompt',
    helperKey: 'questions.timeline.helper',
    options: [
      { id: 'immediately', labelKey: 'options.timeline.immediately' },
      { id: 'within-30-days', labelKey: 'options.timeline.within-30-days' },
      { id: 'within-3-months', labelKey: 'options.timeline.within-3-months' },
      { id: 'research-phase', labelKey: 'options.timeline.research-phase' },
    ],
  },
  {
    id: 'budget',
    promptKey: 'questions.budget.prompt',
    helperKey: 'questions.budget.helper',
    optional: true,
    options: [
      { id: '25k-50k', labelKey: 'options.budget.25k-50k' },
      { id: '50k-1l', labelKey: 'options.budget.50k-1l' },
      { id: '1l-5l', labelKey: 'options.budget.1l-5l' },
      { id: '5l-plus', labelKey: 'options.budget.5l-plus' },
      { id: 'not-sure', labelKey: 'options.budget.not-sure' },
    ],
  },
];

export const TOTAL_DISCOVERY_STEPS = discoveryQuestions.length;
