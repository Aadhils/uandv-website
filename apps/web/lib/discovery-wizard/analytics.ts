import { trackEvent } from '@/lib/analytics';

import type { WizardGoalId } from './types';
import { WIZARD_EVENTS_KEY } from './types';

type WizardEventParams = Record<string, string | number | boolean | undefined>;

function logLocal(eventName: string, params?: WizardEventParams) {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(WIZARD_EVENTS_KEY);
    const list: Array<{ event: string; at: string; params?: WizardEventParams }> =
      raw ? (JSON.parse(raw) as typeof list) : [];
    list.push({ event: eventName, at: new Date().toISOString(), params });
    window.localStorage.setItem(WIZARD_EVENTS_KEY, JSON.stringify(list.slice(-40)));
  } catch {
    // ignore
  }
}

export function trackWizardEvent(
  eventName:
    | 'goal_selected'
    | 'wizard_started'
    | 'wizard_resumed'
    | 'step_completed'
    | 'wizard_abandoned'
    | 'wizard_completed'
    | 'analysis_generated'
    | 'demo_lead_submitted',
  params?: WizardEventParams & { goal_id?: WizardGoalId },
) {
  logLocal(eventName, params);
  trackEvent(`discovery_wizard_${eventName}`, params);
}
