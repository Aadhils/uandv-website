import type { Messages } from '../types';
import { enMessages } from './en';

/**
 * Hindi locale scaffold for Sprint 2.
 * Keys match English; values intentionally reuse English until reviewed translations arrive.
 * Do not machine-translate — replace with human-reviewed Hindi copy.
 */
export const hiMessages: Messages = {
  ...enMessages,
  locale: 'hi',
};
