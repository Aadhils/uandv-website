'use client';

import Clarity from '@microsoft/clarity';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function cleanParams(params?: AnalyticsParams) {
  if (!params) return undefined;
  const next: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      next[key] = value;
    }
  }
  return next;
}

/**
 * Fire a custom event to GA4 and Microsoft Clarity.
 * Safe to call on the client only; no-ops during SSR.
 */
export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = cleanParams(params);

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
    }
  } catch {
    // Analytics must never break UX.
  }

  try {
    // Clarity custom events + tags (official SDK)
    Clarity.event(eventName);
    if (payload?.journey_name !== undefined) {
      Clarity.setTag('journey_name', String(payload.journey_name));
    }
    if (payload?.cta !== undefined) {
      Clarity.setTag('cta', String(payload.cta));
    }
  } catch {
    // Clarity may be blocked by privacy tools.
  }
}
