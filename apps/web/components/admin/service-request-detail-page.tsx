'use client';

import Link from 'next/link';
import { useSyncExternalStore, useState } from 'react';

import { Input, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  MatchBreakdownCard,
  PartnerComparePanel,
  ServiceRequestTimeline,
} from '@/components/service-requests/shared';
import {
  assignPartnerToRequest,
  formatBudgetRange,
  getServiceRequestById,
  listServiceRequestEvents,
  partnerCategoryLabel,
  refreshRequestMatches,
  serviceRequestStatusLabel,
  subscribeServiceRequests,
  updateServiceRequestStatus,
} from '@/lib/service-requests';
import { searchPartners } from '@/lib/partners';

function useRequest(requestId: string) {
  return useSyncExternalStore(
    subscribeServiceRequests,
    () => getServiceRequestById(requestId) ?? null,
    () => getServiceRequestById(requestId) ?? null,
  );
}

export function AdminServiceRequestDetailPage({
  requestId,
}: {
  requestId: string;
}) {
  const request = useRequest(requestId);
  const events = useSyncExternalStore(
    subscribeServiceRequests,
    () => listServiceRequestEvents(requestId),
    () => listServiceRequestEvents(requestId),
  );
  const [notes, setNotes] = useState('');
  const [sla, setSla] = useState('24');
  const [due, setDue] = useState('2026-08-15');
  const [message, setMessage] = useState<string | null>(null);

  if (!request) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-xl font-semibold">Request not found</h1>
        <Link href="/admin/service-requests" className={cn(buttonVariants())}>
          Back
        </Link>
      </div>
    );
  }

  const assign = (partnerId: string, reassign = false) => {
    assignPartnerToRequest(requestId, partnerId, {
      internalNotes: notes || request.internalNotes,
      slaHours: Number(sla) || 24,
      expectedCompletionDate: due,
      reassign,
    });
    setMessage(`Partner ${partnerId} assigned (demo).`);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title={request.requestedService}
        description={`${request.id} · ${request.customerBusinessName} · ${partnerCategoryLabel(request.partnerCategory)}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/service-requests/${request.id}/match`}
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              Match workspace
            </Link>
            <Link
              href="/admin/service-requests"
              className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
            >
              All requests
            </Link>
          </div>
        }
      />

      {message ? (
        <p className="rounded-uv-lg border border-uv-border px-3 py-2 text-sm" role="status">
          {message}
        </p>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Info label="Status" value={serviceRequestStatusLabel(request.status)} />
        <Info label="Priority" value={request.priority} />
        <Info
          label="Budget"
          value={formatBudgetRange(request.budgetMinInr, request.budgetMaxInr)}
        />
        <Info
          label="Assigned"
          value={request.assignedPartnerName ?? 'Unassigned'}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Admin assignment</h2>
          <label className="block text-sm">
            Internal notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 py-2 text-sm"
              rows={3}
              placeholder={request.internalNotes || 'Internal notes…'}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              SLA hours
              <Input value={sla} onChange={(e) => setSla(e.target.value)} />
            </label>
            <label className="block text-sm">
              Expected completion
              <Input value={due} onChange={(e) => setDue(e.target.value)} />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {request.recommendedPartnerIds.slice(0, 3).map((partnerId) => (
              <button
                key={partnerId}
                type="button"
                className={cn(buttonVariants({ size: 'sm' }))}
                onClick={() => assign(partnerId, Boolean(request.assignedPartnerId))}
              >
                Assign {partnerId}
              </button>
            ))}
            <button
              type="button"
              className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
              onClick={() => {
                updateServiceRequestStatus(requestId, 'on_hold', {
                  note: 'Placed on hold by admin (demo).',
                });
                setMessage('Request placed on hold.');
              }}
            >
              On hold
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
              onClick={() => {
                updateServiceRequestStatus(requestId, 'cancelled', {
                  note: 'Cancelled by admin (demo).',
                });
                setMessage('Request cancelled.');
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ size: 'sm', variant: 'ghost' }))}
              onClick={() => {
                refreshRequestMatches(requestId);
                setMessage('Matches refreshed.');
              }}
            >
              Refresh matching
            </button>
          </div>
        </div>

        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Timeline</h2>
          <ServiceRequestTimeline events={events} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Recommended partners</h2>
        <div className="grid gap-3 lg:grid-cols-3">
          {request.matchResults.slice(0, 3).map((match) => (
            <MatchBreakdownCard key={match.partnerId} match={match} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Compare top matches</h2>
        <PartnerComparePanel matches={request.matchResults.slice(0, 3)} />
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Search other partners</h2>
        <p className="text-sm text-uv-foreground-muted">
          Quick picks from directory search — full compare lives on Match workspace.
        </p>
        <ul className="flex flex-wrap gap-2">
          {searchPartners(request.city)
            .filter((p) => p.category === request.partnerCategory)
            .slice(0, 4)
            .map((partner) => (
              <li key={partner.id}>
                <button
                  type="button"
                  className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
                  onClick={() => assign(partner.id, Boolean(request.assignedPartnerId))}
                >
                  Assign {partner.companyName}
                </button>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-uv-xl border border-uv-border px-3 py-3">
      <p className="text-xs text-uv-foreground-subtle">{label}</p>
      <p className="mt-1 text-sm font-medium capitalize">{value}</p>
    </div>
  );
}
