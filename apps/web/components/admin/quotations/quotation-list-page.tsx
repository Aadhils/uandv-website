'use client';

import Link from 'next/link';
import * as React from 'react';

import { Button, Input, Select, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { formatInr, formatQuotationDate } from '@/lib/quotations/format';
import type { QuotationDto } from '@/lib/quotations/mapper';

type QuotationListRow = Pick<
  QuotationDto,
  | 'id'
  | 'quotationNumber'
  | 'customerName'
  | 'customerEmail'
  | 'leadReference'
  | 'title'
  | 'grandTotal'
  | 'status'
  | 'validityDate'
  | 'createdAt'
>;

type Stats = {
  draft: number;
  sent: number;
  awaitingResponse: number;
  accepted: number;
  rejectedOrExpired: number;
};

export function AdminQuotationsListPage({
  initialRows,
  initialStats,
}: {
  initialRows: QuotationListRow[];
  initialStats: Stats;
}) {
  const [rows, setRows] = React.useState(initialRows);
  const [stats, setStats] = React.useState(initialStats);
  const [q, setQ] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (status) params.set('status', status);
      const response = await fetch(`/api/admin/quotations?${params.toString()}`);
      const result = (await response.json()) as {
        ok?: boolean;
        quotations?: QuotationListRow[];
        stats?: Stats;
      };
      if (result.ok && result.quotations) {
        setRows(result.quotations);
        if (result.stats) setStats(result.stats);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        badge="live"
        title="Quotation Management"
        description="Create, send, and track customer quotations linked to CRM leads."
        actions={
          <Link href="/admin/quotations/new" className={cn(buttonVariants({ size: 'sm' }))}>
            New quotation
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Quotation metrics">
        <StatsCard label="Draft" value={String(stats.draft)} icon="FileText" />
        <StatsCard label="Sent" value={String(stats.sent)} icon="Send" />
        <StatsCard label="Awaiting response" value={String(stats.awaitingResponse)} icon="Clock" />
        <StatsCard label="Accepted" value={String(stats.accepted)} icon="Check" />
        <StatsCard label="Rejected / expired" value={String(stats.rejectedOrExpired)} icon="CircleAlert" />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="q-search" className="mb-1 block text-sm font-medium">
            Search
          </label>
          <Input
            id="q-search"
            placeholder="Number, customer, email, lead ref…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <label htmlFor="q-status" className="mb-1 block text-sm font-medium">
            Status
          </label>
          <Select id="q-status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="VIEWED">Viewed</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="EXPIRED">Expired</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>
        <Button type="button" onClick={refresh} disabled={loading}>
          {loading ? 'Loading…' : 'Apply'}
        </Button>
      </div>

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.quotationNumber}
        emptyMessage="No quotations yet. Create one from a CRM lead or start a new quotation."
        columns={[
          {
            key: 'number',
            header: 'Quotation',
            render: (row) => (
              <Link href={`/admin/quotations/${row.id}`} className="font-medium text-uv-brand hover:underline">
                {row.quotationNumber}
              </Link>
            ),
          },
          { key: 'customer', header: 'Customer', render: (row) => row.customerName },
          { key: 'lead', header: 'Lead', hideOnMobile: true, render: (row) => row.leadReference ?? '—' },
          { key: 'amount', header: 'Total', render: (row) => formatInr(row.grandTotal) },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status.toLowerCase()} />,
          },
          {
            key: 'validity',
            header: 'Valid until',
            hideOnMobile: true,
            render: (row) => formatQuotationDate(row.validityDate),
          },
        ]}
      />
    </div>
  );
}
