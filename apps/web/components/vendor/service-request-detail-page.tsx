'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { ServiceRequestTimeline } from '@/components/service-requests/shared';
import { VENDOR_DEMO_ID } from '@/lib/vendor/demo-data';
import {
  formatBudgetRange,
  getServiceRequestById,
  listServiceRequestEvents,
  partnerRespondToRequest,
  serviceRequestStatusLabel,
  subscribeServiceRequests,
} from '@/lib/service-requests';

function useRequest(requestId: string) {
  return useSyncExternalStore(
    subscribeServiceRequests,
    () => getServiceRequestById(requestId) ?? null,
    () => getServiceRequestById(requestId) ?? null,
  );
}

export function VendorServiceRequestDetailPage({
  requestId,
}: {
  requestId: string;
}) {
  const request = useRequest(requestId);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const events = useSyncExternalStore(
    subscribeServiceRequests,
    () =>
      listServiceRequestEvents(requestId).filter((e) => e.partnerVisible),
    () =>
      listServiceRequestEvents(requestId).filter((e) => e.partnerVisible),
  );

  if (!request) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Request not found</h1>
        <Link href="/vendor/opportunities" className={cn(buttonVariants())}>
          Back
        </Link>
      </div>
    );
  }

  const allowed =
    request.assignedPartnerId === 'ptn-008' ||
    request.vendorId === VENDOR_DEMO_ID ||
    request.recommendedPartnerIds.includes('ptn-008');

  if (!allowed) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Not available</h1>
        <p className="text-sm text-uv-foreground-muted">
          This opportunity is not visible to the demo vendor workspace.
        </p>
        <Link href="/vendor/opportunities" className={cn(buttonVariants())}>
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold">
          {request.requestedService}
        </h1>
        <p className="text-sm text-uv-foreground-muted">
          {request.id} · {serviceRequestStatusLabel(request.status)} · customer-safe
          context for {request.customerBusinessName}
        </p>
      </header>

      {message ? (
        <p className="rounded-uv-lg border border-uv-border px-3 py-2 text-sm" role="status">
          {message}
        </p>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Info label="City" value={`${request.city}, ${request.state}`} />
        <Info
          label="Budget band"
          value={formatBudgetRange(request.budgetMinInr, request.budgetMaxInr)}
        />
        <Info label="Timeline" value={`${request.timelineDays} days`} />
        <Info
          label="SLA"
          value={request.slaHours ? `${request.slaHours}h` : 'TBD'}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Customer-safe details</h2>
          <p className="text-sm text-uv-foreground-muted">
            Business: {request.customerBusinessName}
          </p>
          <p className="text-sm text-uv-foreground-muted">
            Expected completion: {request.expectedCompletionDate ?? 'TBD'}
          </p>
          <div>
            <p className="text-xs text-uv-foreground-subtle">Required documents</p>
            <ul className="mt-1 list-disc pl-4 text-sm">
              {request.requiredDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-uv-foreground-subtle">
            Internal admin notes are hidden in partner view.
          </p>
        </div>

        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Partner actions</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 py-2 text-sm"
            placeholder="Optional note to customer…"
          />
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['accept', 'Accept request'],
                ['decline', 'Decline'],
                ['clarify', 'Request clarification'],
                ['quote', 'Submit quotation (demo)'],
                ['start', 'Start work'],
                ['deliver', 'Mark delivered'],
              ] as const
            ).map(([action, label]) => (
              <button
                key={action}
                type="button"
                className={cn(
                  buttonVariants({
                    size: 'sm',
                    variant: action === 'accept' ? 'primary' : 'outline',
                  }),
                )}
                onClick={() => {
                  partnerRespondToRequest(request.id, action, note || undefined);
                  setMessage(`${label} recorded (demo).`);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-uv-xl border border-uv-border p-4">
        <h2 className="font-semibold">Timeline</h2>
        <ServiceRequestTimeline events={events} />
      </section>

      <Link
        href="/vendor/opportunities"
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        Back to opportunities
      </Link>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-uv-xl border border-uv-border px-3 py-3">
      <p className="text-xs text-uv-foreground-subtle">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
