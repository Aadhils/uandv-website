'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { ServiceRequestSummaryCard } from '@/components/service-requests/shared';
import { VENDOR_DEMO_ID } from '@/lib/vendor/demo-data';
import {
  getRequestsForVendor,
  subscribeServiceRequests,
} from '@/lib/service-requests';

function useOpportunities() {
  return useSyncExternalStore(
    subscribeServiceRequests,
    () => getRequestsForVendor(VENDOR_DEMO_ID),
    () => getRequestsForVendor(VENDOR_DEMO_ID),
  );
}

/**
 * Partner opportunities via Vendor Workspace (ptn-008 ↔ ven-001).
 */
export function VendorOpportunitiesPage() {
  const rows = useOpportunities();

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold sm:text-3xl">
          Partner opportunities
        </h1>
        <p className="max-w-2xl text-sm text-uv-foreground-muted">
          New assignments and recommended opportunities for Karthik Design Studio
          (ven-001 / ptn-008). Customer-safe context only.
        </p>
        <Link
          href="/vendor/work"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          My Work
        </Link>
      </header>

      <ul className="grid gap-3">
        {rows.map((request) => (
          <ServiceRequestSummaryCard
            key={request.id}
            request={request}
            href={`/vendor/requests/${request.id}`}
          />
        ))}
      </ul>
      {rows.length === 0 ? (
        <p className="text-sm text-uv-foreground-muted">
          No open opportunities right now.
        </p>
      ) : null}
    </div>
  );
}
