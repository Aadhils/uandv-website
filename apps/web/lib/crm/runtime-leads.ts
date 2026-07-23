import type { Lead, LeadPriority } from '@/lib/crm';
import { demoCrmEmployees } from '@/lib/crm';

const RUNTIME_LEADS_KEY = 'uandv-crm-runtime-leads';

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function listRuntimeLeads(): Lead[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(RUNTIME_LEADS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getRuntimeLeadById(id: string): Lead | undefined {
  return listRuntimeLeads().find((lead) => lead.id === id);
}

export function saveRuntimeLead(lead: Lead): Lead {
  if (!canUseStorage()) return lead;
  try {
    const existing = listRuntimeLeads().filter((item) => item.id !== lead.id);
    const next = [lead, ...existing].slice(0, 40);
    window.localStorage.setItem(RUNTIME_LEADS_KEY, JSON.stringify(next));
    queueMicrotask(() => notify());
  } catch {
    // ignore
  }
  return lead;
}

export function subscribeRuntimeLeads(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function pickDemoEmployee(goalHint?: string) {
  const byDept =
    goalHint === 'partner-with-uandv'
      ? demoCrmEmployees.find((e) => e.department === 'Consulting')
      : demoCrmEmployees.find((e) => e.department === 'Sales');
  return byDept ?? demoCrmEmployees[0]!;
}

export function buildPriorityFromTimeline(
  timeline: string | undefined,
): LeadPriority {
  if (timeline === 'asap') return 'urgent';
  if (timeline === '30-days') return 'high';
  if (timeline === '90-days') return 'medium';
  return 'medium';
}
