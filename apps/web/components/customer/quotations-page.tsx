'use client';

import Link from 'next/link';
import * as React from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { formatInr, formatQuotationDate } from '@/lib/quotations/format';
import type { QuotationDto } from '@/lib/quotations/mapper';

type QuotationListRow = Pick<
  QuotationDto,
  | 'id'
  | 'quotationNumber'
  | 'title'
  | 'grandTotal'
  | 'status'
  | 'validityDate'
  | 'createdAt'
>;

export function CustomerQuotationsPage() {
  const [rows, setRows] = React.useState<QuotationListRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const response = await fetch('/api/me/quotations');
        const result = (await response.json()) as {
          ok?: boolean;
          quotations?: QuotationListRow[];
        };
        if (!response.ok || !result.ok || !result.quotations) {
          setError('Unable to load quotations.');
          return;
        }
        setRows(result.quotations);
      } catch {
        setError('Network error while loading quotations.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pending = rows.find((row) => row.status === 'SENT' || row.status === 'VIEWED');

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <CustomerPageHeader
        title="Quotations"
        description="Review proposals from U&V and accept or reject them securely."
      />

      {pending ? (
        <div className="rounded-uv-2xl border border-uv-warning/30 bg-uv-warning/5 p-4">
          <p className="text-sm font-medium">Action required</p>
          <p className="mt-1 text-sm text-uv-foreground-muted">
            Quotation {pending.quotationNumber} is awaiting your response.
          </p>
          <Link
            href={`/dashboard/quotations/${pending.id}`}
            className={cn(buttonVariants({ size: 'sm' }), 'mt-3 inline-flex')}
          >
            Review quotation
          </Link>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-uv-foreground-muted" role="status">
          Loading quotations…
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-uv-error" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && !error ? (
        <ResponsiveDataList
          rows={rows}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.quotationNumber}
          emptyMessage="No quotations yet. When U&V sends a proposal, it will appear here."
          columns={[
            {
              key: 'number',
              header: 'Quotation',
              render: (row) => (
                <Link
                  href={`/dashboard/quotations/${row.id}`}
                  className="font-medium text-uv-brand hover:underline"
                >
                  {row.quotationNumber}
                </Link>
              ),
            },
            { key: 'title', header: 'Title', hideOnMobile: true, render: (row) => row.title },
            { key: 'total', header: 'Total', render: (row) => formatInr(row.grandTotal) },
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
      ) : null}
    </div>
  );
}
