'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { CreateServiceRequestForm } from '@/components/service-requests/create-request-form';
import { ServiceRequestSummaryCard } from '@/components/service-requests/shared';
import { ViewModeToggle } from '@/components/shared/view-mode-toggle';
import { BOS_SPINE } from '@/lib/business-os';
import {
  getRequestsForCustomer,
  subscribeServiceRequests,
} from '@/lib/service-requests';
import { useViewMode, viewModeLayoutClass } from '@/lib/ui/use-view-mode';

function useCustomerRequests() {
  return useSyncExternalStore(
    subscribeServiceRequests,
    () => getRequestsForCustomer(BOS_SPINE.customerId),
    () => getRequestsForCustomer(BOS_SPINE.customerId),
  );
}

export function CustomerServiceRequestsPage() {
  const rows = useCustomerRequests();
  const [view, setView] = useViewMode('customer-service-requests', 'list');

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Service Requests"
        description="Create marketplace service requests, review Smart Matching recommendations, and track partner delivery. Demo only."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <ViewModeToggle
              value={view}
              onChange={setView}
              label="Service requests layout"
            />
            <Link
              href="/marketplace"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Browse marketplace
            </Link>
          </div>
        }
      />

      <section aria-labelledby="new-request-heading" className="space-y-3">
        <h2
          id="new-request-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          New service request
        </h2>
        <CreateServiceRequestForm
          defaults={{
            source: 'dashboard',
            city: 'Chennai',
            state: 'Tamil Nadu',
            partnerCategory: 'website_development',
            requestedService: 'Business Website Development',
          }}
        />
      </section>

      <section aria-labelledby="my-requests-heading" className="space-y-3">
        <h2
          id="my-requests-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          My requests ({rows.length})
        </h2>
        <ul
          className={
            view === 'grid' ? viewModeLayoutClass.grid : viewModeLayoutClass.list
          }
        >
          {rows.map((request) => (
            <ServiceRequestSummaryCard
              key={request.id}
              request={request}
              href={`/dashboard/service-requests/${request.id}`}
            />
          ))}
        </ul>
        {rows.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">No requests yet.</p>
        ) : null}
      </section>
    </div>
  );
}
