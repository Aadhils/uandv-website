import { StatsCard } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getInvoicesForCustomer,
  getPaymentsForCustomer,
} from '@/lib/finance';
import { DEMO_CUSTOMER_ID } from '@/lib/projects';

export function CustomerPaymentsPage() {
  const payments = getPaymentsForCustomer(DEMO_CUSTOMER_ID);
  const invoices = getInvoicesForCustomer(DEMO_CUSTOMER_ID);
  const outstanding = payments
    .filter((p) => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amountInr, 0);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Payments"
        description="Your invoices and payment status only. Vendor settlements and internal expenses are hidden."
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Payment summary">
        <StatsCard
          label="Outstanding"
          value={formatFinanceInr(outstanding)}
          icon="Wallet"
        />
        <StatsCard
          label="Invoices"
          value={String(invoices.length)}
          icon="FileText"
        />
        <StatsCard
          label="Paid entries"
          value={String(payments.filter((p) => p.status === 'paid').length)}
          icon="Check"
        />
      </section>

      <section aria-labelledby="cust-pay-heading" className="space-y-3">
        <h2
          id="cust-pay-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Payment status
        </h2>
        <ResponsiveDataList
          rows={payments}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.label}
          columns={[
            {
              key: 'label',
              header: 'Payment',
              hideOnMobile: true,
              render: (row) => (
                <div>
                  <p className="font-medium">{row.label}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {row.projectTitle ?? 'General'}
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
              key: 'due',
              header: 'Due date',
              render: (row) => formatFinanceDate(row.dueDate),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: () => <PlaceholderAction>Pay now</PlaceholderAction>,
            },
          ]}
        />
      </section>

      <section aria-labelledby="cust-inv-heading" className="space-y-3">
        <h2
          id="cust-inv-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
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
              render: (row) => row.number,
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
              key: 'due',
              header: 'Due',
              render: (row) => formatFinanceDate(row.dueDate),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: () => (
                <div className="flex flex-wrap gap-2">
                  <PlaceholderAction>View</PlaceholderAction>
                  <PlaceholderAction>Download</PlaceholderAction>
                </div>
              ),
            },
          ]}
        />
      </section>
    </div>
  );
}
