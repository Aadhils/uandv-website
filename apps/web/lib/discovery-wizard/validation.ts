import type {
  WizardAnswerValue,
  WizardAnswers,
  WizardQuestion,
  WizardValidationResult,
} from './types';

function isBlankString(value: WizardAnswerValue): boolean {
  return typeof value !== 'string' || value.trim().length === 0;
}

function asStringArray(value: WizardAnswerValue): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string' && value.trim()) {
    return [value];
  }
  return [];
}

export function validateWizardAnswer(
  question: WizardQuestion,
  value: WizardAnswerValue | undefined,
): WizardValidationResult {
  const empty =
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0);

  if (empty) {
    if (!question.required) {
      return { ok: true };
    }
    return {
      ok: false,
      message: 'Please choose an answer before continuing.',
    };
  }

  switch (question.type) {
    case 'short_text':
    case 'long_text': {
      if (isBlankString(value)) {
        return {
          ok: false,
          message: 'A short description helps us guide you better.',
        };
      }
      const text = String(value).trim();
      if (text.length < 8) {
        return {
          ok: false,
          message: 'Please add a little more detail (at least a short sentence).',
        };
      }
      if (question.maxLength && text.length > question.maxLength) {
        return {
          ok: false,
          message: `Please keep this under ${question.maxLength} characters.`,
        };
      }
      return { ok: true };
    }
    case 'numeric': {
      const num = typeof value === 'number' ? value : Number(value);
      if (!Number.isFinite(num)) {
        return { ok: false, message: 'Please enter a valid number.' };
      }
      if (question.min !== undefined && num < question.min) {
        return {
          ok: false,
          message: `Please enter a value of at least ${question.min}.`,
        };
      }
      if (question.max !== undefined && num > question.max) {
        return {
          ok: false,
          message: `Please enter a value of at most ${question.max}.`,
        };
      }
      return { ok: true };
    }
    case 'multi_select':
    case 'tag_select': {
      const selected = asStringArray(value);
      const min = question.minSelections ?? (question.required ? 1 : 0);
      if (selected.length < min) {
        return {
          ok: false,
          message:
            min === 1
              ? 'Please select at least one option.'
              : `Please select at least ${min} options.`,
        };
      }
      if (
        question.maxSelections !== undefined &&
        selected.length > question.maxSelections
      ) {
        return {
          ok: false,
          message: `Please select no more than ${question.maxSelections} options.`,
        };
      }
      return { ok: true };
    }
    case 'budget_range': {
      if (isBlankString(value) && typeof value !== 'string') {
        return { ok: false, message: 'Please choose a budget range.' };
      }
      return { ok: true };
    }
    case 'timeline':
    case 'single_select':
    case 'yes_no':
    case 'location': {
      if (isBlankString(value)) {
        return { ok: false, message: 'Please select one option to continue.' };
      }
      return { ok: true };
    }
    default:
      return { ok: true };
  }
}

export function validateWizardStep(
  question: WizardQuestion,
  answers: WizardAnswers,
): WizardValidationResult {
  return validateWizardAnswer(question, answers[question.id]);
}
