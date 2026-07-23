import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getSettlementsForAdmin,
} from '@/lib/finance';

export function AdminSettlementsPage() {
  const rows = getSettlementsForAdmin();
  const pending = rows.filter(
    (s) =>
      s.status === 'eligible' ||
      s.status === 'pending_approval' ||
      s.status === 'approved',
  );
  const pendingTotal = pending.reduce((sum, s) => sum + s.amountInr, 0);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Vendor Settlement"
        description="Admin settlement queue for vendor work orders. Separate from customer payment tracker. Demo only."
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Settlement metrics">
        <StatsCard
          label="Open settlements"
          value={formatFinanceInr(pendingTotal)}
          hint={`${pending.length} item(s)`}
          icon="Wallet"
        />
        <StatsCard
          label="Paid"
          value={String(rows.filter((s) => s.status === 'paid').length)}
          icon="Check"
        />
        <StatsCard
          label="On hold / disputed"
          value={String(
            rows.filter(
              (s) => s.status === 'on_hold' || s.status === 'disputed',
            ).length,
          )}
          icon="CircleAlert"
        />
      </section>

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.workOrderLabel}
        columns={[
          {
            key: 'vendor',
            header: 'Vendor',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.vendorName}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.workOrderLabel}
                </p>
              </div>
            ),
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
            key: 'invoice',
            header: 'Invoice ref',
            render: (row) => row.invoiceRef ?? '—',
          },
          {
            key: 'eligible',
            header: 'Eligible',
            render: (row) => formatFinanceDate(row.eligibleAt),
          },
          {
            key: 'notes',
            header: 'Admin notes',
            render: (row) => (
              <span className="text-xs text-uv-foreground-muted">
                {row.adminNotes}
              </span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-2">
                <PlaceholderAction>Approve</PlaceholderAction>
                <PlaceholderAction>Mark paid</PlaceholderAction>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
