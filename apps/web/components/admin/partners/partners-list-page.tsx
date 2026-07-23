'use client';

import Link from 'next/link';
import * as React from 'react';

import { Input, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  PARTNER_CATEGORY_LABELS,
  partnerDirectoryStats,
  searchPartners,
} from '@/lib/partners';

export function AdminPartnersListPage() {
  const [query, setQuery] = React.useState('');
  const stats = partnerDirectoryStats();
  const rows = React.useMemo(() => searchPartners(query), [query]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Partner Network"
        description="Partner directory for the Business Service Ecosystem. Verification, availability, and performance are demo-only."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/assignment"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Smart Assignment
            </Link>
            <PlaceholderAction>Invite partner</PlaceholderAction>
          </div>
        }
      />

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
        aria-label="Partner directory metrics"
      >
        <StatsCard label="Partners" value={String(stats.total)} icon="Users" />
        <StatsCard label="Verified" value={String(stats.verified)} icon="Check" />
        <StatsCard label="Pending" value={String(stats.pending)} icon="Clock" />
        <StatsCard
          label="Available"
          value={String(stats.available)}
          icon="Sparkles"
        />
        <StatsCard
          label="Categories"
          value={String(stats.categories)}
          icon="Layers"
        />
      </section>

      <div className="max-w-md">
        <label htmlFor="admin-partner-search" className="sr-only">
          Search partners
        </label>
        <Input
          id="admin-partner-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, category, city, skills…"
          autoComplete="off"
        />
      </div>

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.companyName}
        emptyMessage="No partners match your search."
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
            header: 'City / State',
            render: (row) => `${row.city}, ${row.state}`,
          },
          {
            key: 'rating',
            header: 'Rating',
            render: (row) => `${row.rating.toFixed(1)} · ${row.performanceScore}`,
          },
          {
            key: 'verification',
            header: 'Verification',
            render: (row) => <StatusBadge status={row.verificationStatus} />,
          },
          {
            key: 'availability',
            header: 'Availability',
            render: (row) => <StatusBadge status={row.availability} />,
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <Link
                href={`/admin/partners/${row.id}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                Open
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
