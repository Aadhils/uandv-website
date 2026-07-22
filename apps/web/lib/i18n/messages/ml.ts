import type { Messages } from '../types';
import { enMessages } from './en';

/**
 * Malayalam locale scaffold for Sprint 2.
 * Keys match English; values intentionally reuse English until reviewed translations arrive.
 * Do not machine-translate — replace with human-reviewed Malayalam copy.
 */
export const mlMessages: Messages = {
  ...enMessages,
  locale: 'ml',
};
