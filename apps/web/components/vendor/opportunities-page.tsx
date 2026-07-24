'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { ServiceRequestSummaryCard } from '@/components/service-requests/shared';
import { ViewModeToggle } from '@/components/shared/view-mode-toggle';
import {
  getRequestsForVendor,
  subscribeServiceRequests,
} from '@/lib/service-requests';
import { useViewMode, viewModeLayoutClass } from '@/lib/ui/use-view-mode';
import { VENDOR_DEMO_ID } from '@/lib/vendor/demo-data';

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
  const [view, setView] = useViewMode('vendor-opportunities', 'list');

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
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
        </div>
        <ViewModeToggle
          value={view}
          onChange={setView}
          label="Opportunities layout"
        />
      </header>

      <ul
        className={
          view === 'grid' ? viewModeLayoutClass.grid : viewModeLayoutClass.list
        }
      >
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
