import { StatsCard } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getSettlementsForVendor,
} from '@/lib/finance';
import { demoVendorUser } from '@/lib/vendor';

export function VendorSettlementsPage() {
  const rows = getSettlementsForVendor(demoVendorUser.vendorId);
  const eligible = rows.filter(
    (s) => s.status === 'eligible' || s.status === 'approved',
  );
  const paid = rows.filter((s) => s.status === 'paid');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Settlements"
        description="Your settlement status only. Customer invoices, internal expenses, and other vendors are hidden."
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Settlement summary">
        <StatsCard
          label="Your settlements"
          value={String(rows.length)}
          icon="Briefcase"
        />
        <StatsCard
          label="Eligible / approved"
          value={formatFinanceInr(
            eligible.reduce((sum, s) => sum + s.amountInr, 0),
          )}
          icon="Wallet"
        />
        <StatsCard
          label="Paid"
          value={formatFinanceInr(paid.reduce((sum, s) => sum + s.amountInr, 0))}
          icon="Check"
        />
      </section>

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.workOrderLabel}
        emptyMessage="No settlements yet."
        columns={[
          {
            key: 'work',
            header: 'Work order',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.workOrderLabel}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.projectTitle
                    ? `Limited context · ${row.projectTitle}`
                    : 'Limited context'}
                </p>
              </div>
            ),
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
            header: 'Invoice',
            render: (row) => row.invoiceRef ?? '—',
          },
          {
            key: 'eligible',
            header: 'Eligible from',
            render: (row) => formatFinanceDate(row.eligibleAt),
          },
          {
            key: 'note',
            header: 'Note',
            render: (row) => (
              <span className="text-xs text-uv-foreground-muted">
                {row.vendorVisibleNote}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
