import { StatsCard } from '@uandv/ui';

import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatDisplayDate,
  formatInr,
  type Invoice,
  type PaymentSummary,
} from '@/lib/customer';

export type PaymentCenterProps = {
  summary: PaymentSummary;
  invoices: Invoice[];
};

/** Payment Center UI — no gateway, download is placeholder only. */
export function PaymentCenter({ summary, invoices }: PaymentCenterProps) {
  return (
    <div className="space-y-8">
      <section
        aria-label="Payment summary"
        className="grid gap-4 sm:grid-cols-3"
      >
        <StatsCard
          label="Total paid"
          value={formatInr(summary.totalPaidInr)}
          hint="Demo ledger · no gateway"
          icon="Check"
        />
        <StatsCard
          label="Pending amount"
          value={formatInr(summary.pendingInr)}
          hint="Awaiting settlement"
          icon="Clock"
        />
        <StatsCard
          label="Upcoming payment"
          value={formatInr(summary.upcomingInr)}
          hint={summary.upcomingLabel}
          icon="Calendar"
        />
      </section>

      <section aria-label="Invoice list">
        <h2 className="mb-4 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Invoices
        </h2>
        <ResponsiveDataList
          rows={invoices}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.number}
          columns={[
            {
              key: 'number',
              header: 'Invoice',
              hideOnMobile: true,
              render: (row) => (
                <div>
                  <p className="font-medium">{row.number}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {row.description}
                  </p>
                </div>
              ),
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
              key: 'due',
              header: 'Due date',
              render: (row) => formatDisplayDate(row.dueDate),
            },
            {
              key: 'paid',
              header: 'Paid date',
              render: (row) =>
                row.paidDate ? formatDisplayDate(row.paidDate) : '—',
            },
            {
              key: 'actions',
              header: 'Actions',
              render: () => (
                <PlaceholderAction>Download invoice</PlaceholderAction>
              ),
            },
          ]}
        />
      </section>

      <p className="rounded-uv-lg border border-dashed border-uv-border bg-uv-background-subtle px-4 py-3 text-sm text-uv-foreground-muted">
        Payment Center is UI-only. No payment gateway, refunds, or live
        settlement in this sprint.
      </p>
    </div>
  );
}
