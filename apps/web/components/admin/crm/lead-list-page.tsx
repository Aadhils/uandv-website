'use client';

import Link from 'next/link';
import * as React from 'react';

import { Input, Select, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import type { AdminEnquiryListItem } from '@/lib/enquiries/admin';
import { formatEnquiryDate } from '@/lib/enquiries/admin';
import {
  ENQUIRY_STATUS_BADGE,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_STATUS_VALUES,
} from '@/lib/enquiries/status';

type ServiceOption = {
  slug: string;
  title: string;
};

type LeadListPageProps = {
  enquiries: AdminEnquiryListItem[];
  serviceOptions: ServiceOption[];
};

export function LeadListPage({ enquiries, serviceOptions }: LeadListPageProps) {
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [service, setService] = React.useState('');
  const [sort, setSort] = React.useState<'desc' | 'asc'>('desc');

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let rows = enquiries.filter((row) => {
      if (status && row.status !== status) return false;
      if (service && row.serviceInterest !== service) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        row.reference,
        row.name,
        row.email,
        row.phone ?? '',
        row.company ?? '',
        row.serviceLabel,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    rows = [...rows].sort((a, b) => {
      const left = new Date(a.createdAt).getTime();
      const right = new Date(b.createdAt).getTime();
      return sort === 'desc' ? right - left : left - right;
    });

    return rows;
  }, [enquiries, query, service, sort, status]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        badge="live"
        title="Lead Management"
        description="Live enquiries from the contact form and website — search, filter, and open a lead to update status, notes, and follow-ups."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <label htmlFor="lead-search" className="sr-only">
            Search leads
          </label>
          <Input
            id="lead-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reference, name, email, phone, company…"
          />
        </div>
        <div>
          <label htmlFor="lead-status" className="sr-only">
            Filter by status
          </label>
          <Select
            id="lead-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">All statuses</option>
            {ENQUIRY_STATUS_VALUES.map((value) => (
              <option key={value} value={value}>
                {ENQUIRY_STATUS_LABELS[value]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="lead-service" className="sr-only">
            Filter by service
          </label>
          <Select
            id="lead-service"
            value={service}
            onChange={(event) => setService(event.target.value)}
          >
            <option value="">All services</option>
            {serviceOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-uv-foreground-muted">
          Showing {filtered.length} of {enquiries.length} leads
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="lead-sort" className="text-sm text-uv-foreground-muted">
            Sort by date
          </label>
          <Select
            id="lead-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as 'desc' | 'asc')
            }
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </Select>
        </div>
      </div>

      <ResponsiveDataList
        rows={filtered}
        getRowId={(row) => row.id}
        getRowHref={(row) => `/admin/leads/${row.id}`}
        mobileTitle={(row) => row.name}
        emptyMessage="No leads match your filters."
        columns={[
          {
            key: 'reference',
            header: 'Reference ID',
            render: (row) => (
              <Link
                href={`/admin/leads/${row.id}`}
                className="font-medium text-uv-brand hover:underline"
              >
                {row.reference}
              </Link>
            ),
          },
          {
            key: 'name',
            header: 'Customer Name',
            mobileLabel: 'Name',
            render: (row) => row.name,
          },
          {
            key: 'email',
            header: 'Email',
            hideOnMobile: true,
            render: (row) => (
              <a
                href={`mailto:${row.email}`}
                className="text-uv-foreground-muted hover:text-uv-brand hover:underline"
              >
                {row.email}
              </a>
            ),
          },
          {
            key: 'phone',
            header: 'Phone',
            render: (row) => row.phone || '—',
          },
          {
            key: 'service',
            header: 'Service',
            mobileLabel: 'Service',
            render: (row) => row.serviceLabel,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <StatusBadge
                status={ENQUIRY_STATUS_BADGE[row.status]}
                label={ENQUIRY_STATUS_LABELS[row.status]}
              />
            ),
          },
          {
            key: 'createdAt',
            header: 'Created',
            mobileLabel: 'Created',
            render: (row) => formatEnquiryDate(row.createdAt),
          },
        ]}
      />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/leads"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          CRM dashboard (demo)
        </Link>
      </div>
    </div>
  );
}
