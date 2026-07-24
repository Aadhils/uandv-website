import type { WizardGoalId, WizardSession } from './types';
import { WIZARD_STORAGE_KEY } from './types';

const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined;
let cachedSession: WizardSession | null = null;

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function invalidateCache() {
  cachedRaw = undefined;
  cachedSession = null;
}

function migrateFromSessionStorage(): string | null {
  try {
    if (typeof window.sessionStorage === 'undefined') return null;
    const legacy = window.sessionStorage.getItem(WIZARD_STORAGE_KEY);
    if (!legacy) return null;
    window.localStorage.setItem(WIZARD_STORAGE_KEY, legacy);
    window.sessionStorage.removeItem(WIZARD_STORAGE_KEY);
    return legacy;
  } catch {
    return null;
  }
}

function normalizeSession(parsed: {
  version?: number;
  goalId?: WizardGoalId;
  stepIndex?: number;
  answers?: WizardSession['answers'];
  status?: WizardSession['status'];
  startedAt?: string;
  updatedAt?: string;
  crmLeadId?: string | null;
}): WizardSession | null {
  if (!parsed?.goalId) return null;
  if (parsed.version !== 1 && parsed.version !== 2) return null;
  return {
    version: 2,
    goalId: parsed.goalId,
    stepIndex: parsed.stepIndex ?? 0,
    answers: parsed.answers ?? {},
    status: parsed.status ?? 'in_progress',
    startedAt: parsed.startedAt ?? new Date().toISOString(),
    updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    crmLeadId: parsed.crmLeadId ?? null,
  };
}

export function createWizardSession(goalId: WizardGoalId): WizardSession {
  const now = new Date().toISOString();
  return {
    version: 2,
    goalId,
    stepIndex: 0,
    answers: {},
    status: 'in_progress',
    startedAt: now,
    updatedAt: now,
    crmLeadId: null,
  };
}

export function saveWizardSession(session: WizardSession): void {
  if (!canUseStorage()) return;
  try {
    const next: WizardSession = {
      ...session,
      version: 2,
      updatedAt: new Date().toISOString(),
    };
    const raw = JSON.stringify(next);
    window.localStorage.setItem(WIZARD_STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedSession = next;
    queueMicrotask(() => notify());
  } catch {
    // Ignore quota / private mode failures in demo mode.
  }
}

export function loadWizardSession(): WizardSession | null {
  if (!canUseStorage()) return null;
  try {
    let raw = window.localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!raw) {
      raw = migrateFromSessionStorage();
    }
    if (raw === cachedRaw) {
      return cachedSession;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedSession = null;
      return null;
    }
    const parsed = normalizeSession(
      JSON.parse(raw) as Parameters<typeof normalizeSession>[0],
    );
    if (!parsed) {
      cachedSession = null;
      return null;
    }
    cachedSession = parsed;
    return cachedSession;
  } catch {
    invalidateCache();
    return null;
  }
}

export function clearWizardSession(): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(WIZARD_STORAGE_KEY);
    try {
      window.sessionStorage.removeItem(WIZARD_STORAGE_KEY);
    } catch {
      // ignore
    }
    cachedRaw = null;
    cachedSession = null;
    queueMicrotask(() => notify());
  } catch {
    // ignore
  }
}

export function subscribeWizardSession(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function startWizardSession(goalId: WizardGoalId): WizardSession {
  const session = createWizardSession(goalId);
  saveWizardSession(session);
  return session;
}

export function abandonWizardSession(): void {
  const current = loadWizardSession();
  if (!current) return;
  saveWizardSession({ ...current, status: 'abandoned' });
}
