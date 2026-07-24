/**
 * Partner Marketplace runtime overlay — Sprint 3.1.1.
 * Demo registration + verification overrides in localStorage.
 * Extends Release 3.6 Partner model — does not replace seed data.
 */

import type { Partner, PartnerVerificationStatus } from './types';

export const PARTNER_RUNTIME_KEY = 'uandv-partner-marketplace-runtime';

type PartnerRuntimeStore = {
  registered: Partner[];
  statusOverrides: Record<string, PartnerVerificationStatus>;
};

const listeners = new Set<() => void>();
const cacheInvalidators = new Set<() => void>();

function notify() {
  for (const invalidate of cacheInvalidators) invalidate();
  for (const listener of listeners) listener();
}

/** Register a cache clearer to run before store listeners (avoids stale snapshots). */
export function registerPartnerRuntimeCacheInvalidator(
  invalidate: () => void,
): () => void {
  cacheInvalidators.add(invalidate);
  return () => {
    cacheInvalidators.delete(invalidate);
  };
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function emptyStore(): PartnerRuntimeStore {
  return { registered: [], statusOverrides: {} };
}

export function loadPartnerRuntime(): PartnerRuntimeStore {
  if (!canUseStorage()) return emptyStore();
  try {
    const raw = window.localStorage.getItem(PARTNER_RUNTIME_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as PartnerRuntimeStore;
    return {
      registered: Array.isArray(parsed.registered) ? parsed.registered : [],
      statusOverrides:
        parsed.statusOverrides && typeof parsed.statusOverrides === 'object'
          ? parsed.statusOverrides
          : {},
    };
  } catch {
    return emptyStore();
  }
}

function savePartnerRuntime(store: PartnerRuntimeStore): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(PARTNER_RUNTIME_KEY, JSON.stringify(store));
    queueMicrotask(() => notify());
  } catch {
    // ignore
  }
}

/**
 * Subscribe to partner runtime changes. No-op on the server so
 * useSyncExternalStore only attaches listeners in the browser.
 */
export function subscribePartnerRuntime(listener: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === PARTNER_RUNTIME_KEY || event.key === null) {
      notify();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function listRegisteredPartners(): Partner[] {
  return loadPartnerRuntime().registered;
}

export function getPartnerStatusOverride(
  partnerId: string,
): PartnerVerificationStatus | undefined {
  return loadPartnerRuntime().statusOverrides[partnerId];
}

export function applyPartnerStatusOverride(
  partner: Partner,
  overrides: Record<string, PartnerVerificationStatus>,
): Partner {
  const next = overrides[partner.id];
  if (!next) return partner;
  return { ...partner, verificationStatus: next };
}

export type PartnerRegistrationInput = {
  companyName: string;
  contactPerson: string;
  category: Partner['category'];
  city: string;
  state: string;
  serviceArea: string;
  skills: string[];
  experienceYears: number;
  summary: string;
  commissionType: Partner['commissionType'];
  slaHours: number;
};

export function registerPartnerDemo(
  input: PartnerRegistrationInput,
): Partner {
  const partner: Partner = {
    id: `ptn-reg-${Date.now().toString(36)}`,
    category: input.category,
    companyName: input.companyName.trim(),
    contactPerson: input.contactPerson.trim(),
    city: input.city.trim(),
    state: input.state.trim(),
    serviceArea: input.serviceArea.trim() || 'Tamil Nadu',
    skills: input.skills.filter(Boolean).slice(0, 8),
    rating: 0,
    verificationStatus: 'pending',
    availability: 'limited',
    experienceYears: Math.max(0, Math.min(40, input.experienceYears)),
    performanceScore: 50,
    commissionType: input.commissionType,
    documentsStatus: 'submitted',
    bankVerificationStatus: 'pending',
    summary: input.summary.trim(),
    slaHours: Math.max(4, Math.min(72, input.slaHours)),
  };

  const store = loadPartnerRuntime();
  const next: PartnerRuntimeStore = {
    ...store,
    registered: [partner, ...store.registered.filter((p) => p.id !== partner.id)].slice(
      0,
      30,
    ),
  };
  savePartnerRuntime(next);
  return partner;
}

export function setPartnerVerificationDemo(
  partnerId: string,
  status: PartnerVerificationStatus,
): void {
  const store = loadPartnerRuntime();
  savePartnerRuntime({
    ...store,
    statusOverrides: {
      ...store.statusOverrides,
      [partnerId]: status,
    },
  });
}
