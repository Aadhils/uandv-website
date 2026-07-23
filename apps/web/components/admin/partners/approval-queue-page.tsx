'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  PARTNER_CATEGORY_LABELS,
  getPartnersByVerification,
  partnerDirectoryStats,
  setPartnerVerificationDemo,
  subscribePartnerRuntime,
} from '@/lib/partners';

function usePendingPartners() {
  return useSyncExternalStore(
    subscribePartnerRuntime,
    () => getPartnersByVerification('pending'),
    () => getPartnersByVerification('pending'),
  );
}

/**
 * Admin Approval Queue — Sprint 3.1.1.
 * Uses getPartnersByVerification('pending') + demo status overrides.
 */
export function AdminPartnerApprovalsPage() {
  const pending = usePendingPartners();
  const stats = partnerDirectoryStats();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Partner Approval Queue"
        description="Review pending Partner Marketplace registrations and seed partners awaiting verification. Demo actions update this browser only."
        actions={
          <Link
            href="/admin/partners"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            All partners
          </Link>
        }
      />

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Approval metrics"
      >
        <StatsCard label="Pending" value={String(pending.length)} icon="Clock" />
        <StatsCard label="Verified" value={String(stats.verified)} icon="Check" />
        <StatsCard label="Total partners" value={String(stats.total)} icon="Users" />
        <StatsCard
          label="Categories"
          value={String(stats.categories)}
          icon="Layers"
        />
      </section>

      <ResponsiveDataList
        rows={pending}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.companyName}
        emptyMessage="No partners are pending approval."
        columns={[
          {
            key: 'company',
            header: 'Partner',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <Link
                  href={`/admin/partners/${row.id}`}
                  className="font-medium text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
                >
                  {row.companyName}
                </Link>
                <p className="text-xs text-uv-foreground-muted">
                  {row.id} · {row.contactPerson}
                </p>
              </div>
            ),
          },
          {
            key: 'category',
            header: 'Category',
            render: (row) => PARTNER_CATEGORY_LABELS[row.category],
          },
          {
            key: 'location',
            header: 'City',
            render: (row) => `${row.city}, ${row.state}`,
          },
          {
            key: 'docs',
            header: 'Documents',
            render: (row) => <StatusBadge status={row.documentsStatus} />,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.verificationStatus} />,
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={cn(buttonVariants({ size: 'sm' }))}
                  onClick={() => setPartnerVerificationDemo(row.id, 'verified')}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ size: 'sm', variant: 'outline' }),
                  )}
                  onClick={() => setPartnerVerificationDemo(row.id, 'rejected')}
                >
                  Reject
                </button>
                <Link
                  href={`/partners/${row.id}`}
                  className={cn(
                    buttonVariants({ size: 'sm', variant: 'ghost' }),
                  )}
                >
                  Public
                </Link>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
