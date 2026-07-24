import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getQuotationsForAdmin,
} from '@/lib/finance';

export function AdminQuotationsPage() {
  const rows = getQuotationsForAdmin();
  const open = rows.filter(
    (q) => q.status === 'sent' || q.status === 'draft',
  ).length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Quotation Management"
        description="Create and track quotations linked to customers and projects. Demo ledger only — no e-sign or billing backend."
        actions={<PlaceholderAction>New quotation</PlaceholderAction>}
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Quotation metrics">
        <StatsCard
          label="All quotations"
          value={String(rows.length)}
          icon="FileText"
        />
        <StatsCard label="Open / draft" value={String(open)} icon="Clock" />
        <StatsCard
          label="Pipeline value"
          value={formatFinanceInr(
            rows
              .filter((q) => q.status === 'sent' || q.status === 'draft')
              .reduce((sum, q) => sum + q.amountInr, 0),
          )}
          icon="Wallet"
        />
      </section>

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.number}
        columns={[
          {
            key: 'number',
            header: 'Quotation',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.number}</p>
                <p className="text-xs text-uv-foreground-muted">{row.title}</p>
              </div>
            ),
          },
          {
            key: 'customer',
            header: 'Customer',
            render: (row) => row.customerBusinessName,
          },
          {
            key: 'project',
            header: 'Project',
            render: (row) => row.projectTitle ?? '—',
          },
          {
            key: 'amount',
            header: 'Amount',
            render: (row) => formatFinanceInr(row.amountInr),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'dates',
            header: 'Issued / valid',
            render: (row) => (
              <span className="text-sm">
                {formatFinanceDate(row.issuedAt)} →{' '}
                {formatFinanceDate(row.validUntil)}
              </span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-2">
                <PlaceholderAction>View</PlaceholderAction>
                <PlaceholderAction>Send</PlaceholderAction>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
