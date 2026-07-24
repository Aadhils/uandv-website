'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  listServiceRequests,
  partnerCategoryLabel,
  serviceRequestStatusLabel,
  subscribeServiceRequests,
} from '@/lib/service-requests';

function useAllRequests() {
  return useSyncExternalStore(
    subscribeServiceRequests,
    listServiceRequests,
    listServiceRequests,
  );
}

export function AdminServiceRequestsPage() {
  const rows = useAllRequests();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Service Requests"
        description="Review marketplace requests, Smart Matching shortlists, and partner assignment. Demo-local actions only."
        actions={
          <Link
            href="/admin/assignment"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Smart Assignment
          </Link>
        }
      />

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.requestedService}
        emptyMessage="No service requests."
        columns={[
          {
            key: 'id',
            header: 'Request',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <Link
                  href={`/admin/service-requests/${row.id}`}
                  className="font-medium text-uv-brand underline-offset-4 hover:underline"
                >
                  {row.requestedService}
                </Link>
                <p className="font-mono text-xs text-uv-foreground-muted">
                  {row.id}
                </p>
              </div>
            ),
          },
          {
            key: 'customer',
            header: 'Customer',
            render: (row) => row.customerBusinessName,
          },
          {
            key: 'category',
            header: 'Category',
            render: (row) => partnerCategoryLabel(row.partnerCategory),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <span className="text-sm">
                {serviceRequestStatusLabel(row.status)}
              </span>
            ),
          },
          {
            key: 'priority',
            header: 'Priority',
            render: (row) => <StatusBadge status={row.priority} />,
          },
          {
            key: 'partner',
            header: 'Partner',
            render: (row) => row.assignedPartnerName ?? '—',
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/service-requests/${row.id}`}
                  className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
                >
                  Open
                </Link>
                <Link
                  href={`/admin/service-requests/${row.id}/match`}
                  className={cn(buttonVariants({ size: 'sm' }))}
                >
                  Match
                </Link>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
