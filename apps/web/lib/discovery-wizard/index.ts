export type {
  DemoLeadPreview,
  QuestionType,
  WizardAnswerValue,
  WizardAnswers,
  WizardFlow,
  WizardGoalId,
  WizardOption,
  WizardQuestion,
  WizardSession,
  WizardSessionStatus,
  WizardShowWhen,
  WizardSummary,
  WizardValidationResult,
} from './types';

export {
  SECONDS_PER_STEP_DEFAULT,
  WIZARD_EVENTS_KEY,
  WIZARD_GOALS,
  WIZARD_STORAGE_KEY,
} from './types';

export {
  getWizardFlow,
  getWizardGoalTitle,
  listWizardFlows,
} from './flows';

export {
  clampStepIndex,
  estimateRemainingSeconds,
  formatRemainingTime,
  getActiveQuestions,
  getQuestionSeconds,
  isQuestionVisible,
} from './dynamic-flow';

export { validateWizardAnswer, validateWizardStep } from './validation';

export { buildWizardSummary, formatAnswerDisplay } from './summary';

export { recommendNextSteps } from './recommendations';

export {
  abandonWizardSession,
  clearWizardSession,
  createWizardSession,
  loadWizardSession,
  saveWizardSession,
  startWizardSession,
  subscribeWizardSession,
} from './session';

export {
  generateAnalysisFromWizard,
  wizardAnswersToAdvisorInput,
} from './business-advisor-adapter';

export { buildDemoLeadPreview } from './demo-lead';

export { createCrmLeadFromWizard } from './crm-lead';

export { trackWizardEvent } from './analytics';
