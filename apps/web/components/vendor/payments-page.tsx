import { StatsCard } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoVendorPaymentHistory,
  demoVendorPaymentSummary,
  formatInr,
  formatVendorDate,
} from '@/lib/vendor';

export function VendorPaymentsPage() {
  const summary = demoVendorPaymentSummary;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Payment Status"
        description="Approved, paid, and pending amounts for your invoices. No payment gateway or bank integration — placeholders only."
      />

      <section
        aria-label="Payment summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsCard
          label="Approved amount"
          value={formatInr(summary.approvedAmountInr)}
          icon="Check"
        />
        <StatsCard
          label="Paid amount"
          value={formatInr(summary.paidAmountInr)}
          icon="Wallet"
        />
        <StatsCard
          label="Pending amount"
          value={formatInr(summary.pendingAmountInr)}
          icon="Clock"
        />
        <StatsCard
          label="Expected payment"
          value={formatVendorDate(summary.expectedPaymentDate)}
          hint={summary.tdsDeductionPlaceholder}
          icon="Calendar"
        />
      </section>

      <section aria-label="Payment history" className="space-y-4">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Payment history
        </h2>
        <ResponsiveDataList
          rows={demoVendorPaymentHistory}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.invoiceNumber}
          columns={[
            {
              key: 'invoice',
              header: 'Invoice',
              hideOnMobile: true,
              render: (row) => row.invoiceNumber,
            },
            {
              key: 'amount',
              header: 'Amount',
              render: (row) => formatInr(row.amountInr),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              key: 'expected',
              header: 'Expected date',
              render: (row) => formatVendorDate(row.expectedDate),
            },
            {
              key: 'paid',
              header: 'Paid date',
              render: (row) =>
                row.paidDate ? formatVendorDate(row.paidDate) : '—',
            },
            {
              key: 'ref',
              header: 'Payment reference',
              render: (row) => (
                <span className="font-mono text-xs text-uv-foreground-muted">
                  {row.referencePlaceholder}
                </span>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}
