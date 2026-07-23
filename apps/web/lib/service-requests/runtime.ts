/**
 * Service request runtime overlay — Sprint 3.2.
 * Pattern mirrors CRM leads / partner marketplace runtime.
 */

import { BOS_SPINE } from '@/lib/business-os';
import { getPartnerById } from '@/lib/partners';

import {
  demoServiceMarketplaceRequests,
  demoServiceRequestEvents,
} from './demo-data';
import { matchPartnersForRequest, rematchServiceRequest } from './matching';
import type {
  CreateServiceRequestInput,
  ServiceRequest,
  ServiceRequestEvent,
  ServiceRequestStatus,
} from './types';
import { SERVICE_REQUESTS_RUNTIME_KEY } from './types';

type ServiceRequestRuntimeStore = {
  requests: ServiceRequest[];
  events: ServiceRequestEvent[];
  /** Overrides keyed by seed request id */
  overrides: Record<string, Partial<ServiceRequest>>;
};

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function emptyStore(): ServiceRequestRuntimeStore {
  return { requests: [], events: [], overrides: {} };
}

export function loadServiceRequestRuntime(): ServiceRequestRuntimeStore {
  if (!canUseStorage()) return emptyStore();
  try {
    const raw = window.localStorage.getItem(SERVICE_REQUESTS_RUNTIME_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as ServiceRequestRuntimeStore;
    return {
      requests: Array.isArray(parsed.requests) ? parsed.requests : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
      overrides:
        parsed.overrides && typeof parsed.overrides === 'object'
          ? parsed.overrides
          : {},
    };
  } catch {
    return emptyStore();
  }
}

function saveStore(store: ServiceRequestRuntimeStore): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(
      SERVICE_REQUESTS_RUNTIME_KEY,
      JSON.stringify(store),
    );
    queueMicrotask(() => notify());
  } catch {
    // ignore
  }
}

export function subscribeServiceRequests(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function pushEvent(
  store: ServiceRequestRuntimeStore,
  event: Omit<ServiceRequestEvent, 'id'> & { id?: string },
): ServiceRequestRuntimeStore {
  const nextEvent: ServiceRequestEvent = {
    id: event.id ?? `sre-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    requestId: event.requestId,
    occurredAt: event.occurredAt,
    title: event.title,
    description: event.description,
    actorRole: event.actorRole,
    actorName: event.actorName,
    customerVisible: event.customerVisible,
    partnerVisible: event.partnerVisible,
  };
  return {
    ...store,
    events: [nextEvent, ...store.events].slice(0, 200),
  };
}

export function listServiceRequests(): ServiceRequest[] {
  const store = loadServiceRequestRuntime();
  const seed = demoServiceMarketplaceRequests.map((req) => {
    const override = store.overrides[req.id];
    return override ? { ...req, ...override } : req;
  });
  const seedIds = new Set(seed.map((r) => r.id));
  const runtimeOnly = store.requests.filter((r) => !seedIds.has(r.id));
  return [...runtimeOnly, ...seed].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getServiceRequestById(id: string): ServiceRequest | undefined {
  return listServiceRequests().find((r) => r.id === id);
}

export function listServiceRequestEvents(
  requestId: string,
): ServiceRequestEvent[] {
  const store = loadServiceRequestRuntime();
  const seed = demoServiceRequestEvents.filter((e) => e.requestId === requestId);
  const runtime = store.events.filter((e) => e.requestId === requestId);
  return [...runtime, ...seed].sort((a, b) =>
    b.occurredAt.localeCompare(a.occurredAt),
  );
}

function upsertRequest(request: ServiceRequest): void {
  const store = loadServiceRequestRuntime();
  const isSeed = demoServiceMarketplaceRequests.some((r) => r.id === request.id);
  if (isSeed) {
    saveStore({
      ...store,
      overrides: { ...store.overrides, [request.id]: request },
    });
    return;
  }
  const others = store.requests.filter((r) => r.id !== request.id);
  saveStore({
    ...store,
    requests: [request, ...others].slice(0, 60),
  });
}

export function createServiceRequest(
  input: CreateServiceRequestInput,
): ServiceRequest {
  const matches = matchPartnersForRequest({
    partnerCategory: input.partnerCategory,
    city: input.city,
    state: input.state,
    budgetMinInr: input.budgetMinInr,
    budgetMaxInr: input.budgetMaxInr,
    timelineDays: input.timelineDays,
    estimatedPriceInr: input.estimatedPriceInr,
  });

  const request: ServiceRequest = {
    id: `sreq-${Date.now().toString(36)}`,
    customerId: input.customerId ?? BOS_SPINE.customerId,
    customerName: input.customerName ?? BOS_SPINE.customerName,
    customerBusinessName:
      input.customerBusinessName ?? BOS_SPINE.businessName,
    businessCategory: input.businessCategory,
    partnerCategory: input.partnerCategory,
    requestedService: input.requestedService,
    city: input.city,
    state: input.state,
    budgetMinInr: input.budgetMinInr,
    budgetMaxInr: input.budgetMaxInr,
    timelineDays: input.timelineDays,
    requiredDocuments: input.requiredDocuments,
    priority: input.priority ?? 'medium',
    status: matches.length ? 'recommended' : 'new',
    source: input.source,
    createdAt: new Date().toISOString().slice(0, 10),
    marketplaceServiceId: input.marketplaceServiceId ?? null,
    projectId: input.projectId ?? BOS_SPINE.projectId,
    recommendedPartnerIds: matches.map((m) => m.partnerId),
    matchResults: matches,
    assignedPartnerId: null,
    assignedPartnerName: null,
    vendorId: null,
    internalNotes: '',
    slaHours: null,
    expectedCompletionDate: null,
    partnerResponseNote: null,
    customerRating: null,
    customerRatingNote: null,
    estimatedPriceInr: input.estimatedPriceInr ?? null,
    estimatedDurationDays: input.estimatedDurationDays ?? null,
  };

  let store = loadServiceRequestRuntime();
  store = {
    ...store,
    requests: [request, ...store.requests].slice(0, 60),
  };
  store = pushEvent(store, {
    requestId: request.id,
    occurredAt: new Date().toISOString(),
    title: 'Request created',
    description: `${request.requestedService} created from ${request.source}.`,
    actorRole: 'customer',
    actorName: request.customerName,
    customerVisible: true,
    partnerVisible: false,
  });
  if (matches.length) {
    store = pushEvent(store, {
      requestId: request.id,
      occurredAt: new Date().toISOString(),
      title: 'Matching completed',
      description: `Smart Matching recommended ${matches.length} partners (Demo Intelligence).`,
      actorRole: 'system',
      actorName: 'Smart Matching',
      customerVisible: true,
      partnerVisible: false,
    });
  }
  saveStore(store);
  return request;
}

export function assignPartnerToRequest(
  requestId: string,
  partnerId: string,
  options?: {
    internalNotes?: string;
    slaHours?: number;
    expectedCompletionDate?: string;
    reassign?: boolean;
  },
): ServiceRequest | null {
  const current = getServiceRequestById(requestId);
  if (!current) return null;
  const partner = getPartnerById(partnerId);
  if (!partner) return null;

  const next: ServiceRequest = {
    ...current,
    assignedPartnerId: partner.id,
    assignedPartnerName: partner.companyName,
    vendorId: partner.id === 'ptn-008' ? 'ven-001' : current.vendorId,
    status: options?.reassign ? 'reassigned' : 'assigned',
    internalNotes: options?.internalNotes ?? current.internalNotes,
    slaHours: options?.slaHours ?? current.slaHours ?? partner.slaHours,
    expectedCompletionDate:
      options?.expectedCompletionDate ?? current.expectedCompletionDate,
  };

  // After reassign, move to assigned for partner inbox.
  if (next.status === 'reassigned') {
    next.status = 'assigned';
  }

  upsertRequest(next);
  let store = loadServiceRequestRuntime();
  store = pushEvent(store, {
    requestId,
    occurredAt: new Date().toISOString(),
    title: options?.reassign ? 'Partner reassigned' : 'Partner assigned',
    description: `${partner.companyName} assigned to this request.`,
    actorRole: 'admin',
    actorName: 'Admin',
    customerVisible: true,
    partnerVisible: true,
  });
  saveStore(store);
  return getServiceRequestById(requestId) ?? next;
}

export function updateServiceRequestStatus(
  requestId: string,
  status: ServiceRequestStatus,
  options?: {
    actorRole?: ServiceRequestEvent['actorRole'];
    actorName?: string;
    note?: string;
    customerVisible?: boolean;
  },
): ServiceRequest | null {
  const current = getServiceRequestById(requestId);
  if (!current) return null;
  const next: ServiceRequest = {
    ...current,
    status,
    partnerResponseNote: options?.note ?? current.partnerResponseNote,
  };
  upsertRequest(next);
  let store = loadServiceRequestRuntime();
  store = pushEvent(store, {
    requestId,
    occurredAt: new Date().toISOString(),
    title: `Status → ${status.replaceAll('_', ' ')}`,
    description: options?.note ?? `Request marked ${status}.`,
    actorRole: options?.actorRole ?? 'admin',
    actorName: options?.actorName ?? 'Admin',
    customerVisible: options?.customerVisible ?? true,
    partnerVisible: true,
  });
  saveStore(store);
  return getServiceRequestById(requestId) ?? next;
}

export function partnerRespondToRequest(
  requestId: string,
  action: 'accept' | 'decline' | 'clarify' | 'quote' | 'start' | 'deliver',
  note?: string,
): ServiceRequest | null {
  const map: Record<typeof action, ServiceRequestStatus> = {
    accept: 'partner_accepted',
    decline: 'declined',
    clarify: 'awaiting_customer',
    quote: 'awaiting_customer',
    start: 'in_progress',
    deliver: 'delivered',
  };
  const titles: Record<typeof action, string> = {
    accept: 'Partner accepted',
    decline: 'Partner declined',
    clarify: 'Clarification requested',
    quote: 'Quotation submitted (demo)',
    start: 'Work started',
    deliver: 'Deliverable submitted',
  };
  const current = getServiceRequestById(requestId);
  if (!current) return null;
  const next: ServiceRequest = {
    ...current,
    status: map[action],
    partnerResponseNote: note ?? current.partnerResponseNote,
  };
  upsertRequest(next);
  let store = loadServiceRequestRuntime();
  store = pushEvent(store, {
    requestId,
    occurredAt: new Date().toISOString(),
    title: titles[action],
    description: note ?? titles[action],
    actorRole: 'partner',
    actorName: current.assignedPartnerName ?? 'Partner',
    customerVisible: true,
    partnerVisible: true,
  });
  saveStore(store);
  return getServiceRequestById(requestId) ?? next;
}

export function customerApproveRequest(
  requestId: string,
  rating?: number,
  note?: string,
): ServiceRequest | null {
  const current = getServiceRequestById(requestId);
  if (!current) return null;
  const next: ServiceRequest = {
    ...current,
    status: 'completed',
    customerRating: rating ?? current.customerRating,
    customerRatingNote: note ?? current.customerRatingNote,
  };
  upsertRequest(next);
  let store = loadServiceRequestRuntime();
  store = pushEvent(store, {
    requestId,
    occurredAt: new Date().toISOString(),
    title: 'Customer approved',
    description: note
      ? `Approved with rating ${rating ?? '—'} · ${note}`
      : 'Customer approved the deliverable.',
    actorRole: 'customer',
    actorName: current.customerName,
    customerVisible: true,
    partnerVisible: true,
  });
  store = pushEvent(store, {
    requestId,
    occurredAt: new Date().toISOString(),
    title: 'Request completed',
    description: 'Service request marked completed.',
    actorRole: 'system',
    actorName: 'Business OS',
    customerVisible: true,
    partnerVisible: true,
  });
  saveStore(store);
  return getServiceRequestById(requestId) ?? next;
}

export function refreshRequestMatches(requestId: string): ServiceRequest | null {
  const current = getServiceRequestById(requestId);
  if (!current) return null;
  const matches = rematchServiceRequest(current);
  const next: ServiceRequest = {
    ...current,
    matchResults: matches,
    recommendedPartnerIds: matches.map((m) => m.partnerId),
    status:
      current.status === 'new' || current.status === 'recommended'
        ? 'recommended'
        : current.status,
  };
  upsertRequest(next);
  return getServiceRequestById(requestId) ?? next;
}

export function getRequestsForCustomer(customerId: string): ServiceRequest[] {
  return listServiceRequests().filter((r) => r.customerId === customerId);
}

export function getRequestsForPartner(partnerId: string): ServiceRequest[] {
  return listServiceRequests().filter(
    (r) =>
      r.assignedPartnerId === partnerId ||
      r.recommendedPartnerIds.includes(partnerId),
  );
}

export function getPartnerOpportunities(partnerId: string): ServiceRequest[] {
  return listServiceRequests().filter(
    (r) =>
      (r.assignedPartnerId === partnerId &&
        ['assigned', 'reassigned', 'partner_accepted', 'in_progress', 'awaiting_customer', 'delivered'].includes(
          r.status,
        )) ||
      (r.recommendedPartnerIds.includes(partnerId) &&
        ['recommended', 'new'].includes(r.status) &&
        !r.assignedPartnerId),
  );
}

export function getRequestsForVendor(vendorId: string): ServiceRequest[] {
  // Demo vendor ven-001 maps to partner ptn-008.
  const partnerId = vendorId === 'ven-001' ? 'ptn-008' : null;
  if (!partnerId) return [];
  return getPartnerOpportunities(partnerId);
}
