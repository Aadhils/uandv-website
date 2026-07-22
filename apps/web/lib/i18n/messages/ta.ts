import type { Messages } from '../types';
import { enMessages } from './en';

/**
 * Tamil locale scaffold for Sprint 2.
 * Keys match English; values intentionally reuse English until reviewed translations arrive.
 * Do not machine-translate — replace with human-reviewed Tamil copy.
 */
export const taMessages: Messages = {
  ...enMessages,
  locale: 'ta',
};
