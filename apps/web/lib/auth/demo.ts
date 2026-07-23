/**
 * Demo-only identity helpers for workspace entry.
 * Not production-secure. No passwords are stored or logged.
 */

import type { WorkspaceRole } from './roles';
import type { DemoWorkspaceSession } from './identity';

export const AUTH_DEMO_NOTICE =
  'Demo frontend only — not production-secure. No real accounts, email, OTP, or sessions yet.';

const DEMO_FLAG_KEY = 'uv_auth_demo_preview';
const DEMO_SESSION_KEY = 'uv_auth_demo_session';

/** Marks a soft demo “session” flag for UI continuity. Never stores credentials. */
export function setDemoAuthPreview(active: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (active) {
      sessionStorage.setItem(DEMO_FLAG_KEY, '1');
    } else {
      sessionStorage.removeItem(DEMO_FLAG_KEY);
      sessionStorage.removeItem(DEMO_SESSION_KEY);
    }
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export function hasDemoAuthPreview(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(DEMO_FLAG_KEY) === '1';
  } catch {
    return false;
  }
}

/** Soft role-aware demo session — shared identity engine preview only. */
export function setDemoWorkspaceSession(session: DemoWorkspaceSession): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem(DEMO_FLAG_KEY, '1');
  } catch {
    // Ignore storage failures
  }
}

export function getDemoWorkspaceSession(): DemoWorkspaceSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(DEMO_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoWorkspaceSession;
    if (!parsed?.userId || !parsed?.activeRole) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setDemoActiveRole(role: WorkspaceRole, userId: string): void {
  setDemoWorkspaceSession({ userId, activeRole: role });
}
