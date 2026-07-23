'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { Badge, buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  MatchBreakdownCard,
  ServiceRequestTimeline,
} from '@/components/service-requests/shared';
import {
  customerApproveRequest,
  formatBudgetRange,
  getServiceRequestById,
  listServiceRequestEvents,
  partnerCategoryLabel,
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

export function CustomerServiceRequestDetailPage({
  requestId,
}: {
  requestId: string;
}) {
  const request = useRequest(requestId);
  const events = useSyncExternalStore(
    subscribeServiceRequests,
    () => listServiceRequestEvents(requestId).filter((e) => e.customerVisible),
    () => listServiceRequestEvents(requestId).filter((e) => e.customerVisible),
  );

  if (!request) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-xl font-semibold">Request not found</h1>
        <Link href="/dashboard/service-requests" className={cn(buttonVariants())}>
          Back to requests
        </Link>
      </div>
    );
  }

  const topMatches = request.matchResults.slice(0, 3);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title={request.requestedService}
        description={`${request.id} · ${partnerCategoryLabel(request.partnerCategory)} · customer-safe tracking`}
        actions={
          <Link
            href="/dashboard/service-requests"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            All requests
          </Link>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Info label="Status" value={serviceRequestStatusLabel(request.status)} />
        <Info
          label="Assigned partner"
          value={request.assignedPartnerName ?? 'Not assigned yet'}
        />
        <Info
          label="Budget"
          value={formatBudgetRange(request.budgetMinInr, request.budgetMaxInr)}
        />
        <Info
          label="Expected delivery"
          value={request.expectedCompletionDate ?? 'TBD'}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Request details</h2>
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-uv-foreground-subtle">City / state</dt>
              <dd>
                {request.city}, {request.state}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Priority</dt>
              <dd>
                <StatusBadge status={request.priority} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Timeline</dt>
              <dd>{request.timelineDays} days</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Source</dt>
              <dd className="capitalize">{request.source}</dd>
            </div>
          </dl>
          <div>
            <p className="text-xs text-uv-foreground-subtle">Required documents</p>
            <ul className="mt-1 list-disc pl-4 text-sm">
              {request.requiredDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>
          {request.assignedPartnerId ? (
            <p className="text-sm text-uv-foreground-muted">
              Match reason:{' '}
              {request.matchResults.find(
                (m) => m.partnerId === request.assignedPartnerId,
              )?.reasons[0] ?? 'Assigned by U&V Admin'}
            </p>
          ) : null}
        </div>

        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Timeline</h2>
          <ServiceRequestTimeline events={events} />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-semibold">Smart Matching recommendations</h2>
          <Badge variant="warning">Demo Intelligence</Badge>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {topMatches.map((match) => (
            <MatchBreakdownCard key={match.partnerId} match={match} />
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-uv-xl border border-uv-border p-4">
        <h2 className="font-semibold">Messages (placeholder)</h2>
        <p className="text-sm text-uv-foreground-muted">
          Messaging is demo-only. Use Support Center for live conversations.
        </p>
        <Link
          href="/dashboard/support"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Open support
        </Link>
      </section>

      {request.status === 'delivered' || request.status === 'awaiting_customer' ? (
        <section className="flex flex-wrap gap-2">
          <button
            type="button"
            className={cn(buttonVariants())}
            onClick={() => customerApproveRequest(request.id, 5, 'Approved in demo')}
          >
            Approve deliverable
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: 'outline' }))}
            onClick={() =>
              customerApproveRequest(request.id, 4, 'Approved with minor notes')
            }
          >
            Approve & rate 4★
          </button>
        </section>
      ) : null}

      {request.customerRating ? (
        <p className="text-sm text-uv-foreground-muted">
          Your rating: ★ {request.customerRating}
          {request.customerRatingNote ? ` · ${request.customerRatingNote}` : ''}
        </p>
      ) : null}
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
