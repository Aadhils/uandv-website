import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getInvoicesForAdmin,
  getPaymentsForAdmin,
} from '@/lib/finance';

export function AdminPaymentsPage() {
  const invoices = getInvoicesForAdmin();
  const payments = getPaymentsForAdmin();
  const pending = payments.filter(
    (p) =>
      p.status === 'pending' ||
      p.status === 'overdue' ||
      p.status === 'upcoming',
  );
  const pendingTotal = pending.reduce((sum, p) => sum + p.amountInr, 0);
  const overdue = payments.filter((p) => p.status === 'overdue').length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Payment Tracker"
        description="Unified invoice and payment milestone tracker across customers and projects. No payment gateway."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Payment metrics">
        <StatsCard
          label="Open / upcoming"
          value={formatFinanceInr(pendingTotal)}
          hint={`${pending.length} payment(s)`}
          icon="Wallet"
        />
        <StatsCard label="Overdue" value={String(overdue)} icon="CircleAlert" />
        <StatsCard
          label="Invoices"
          value={String(invoices.length)}
          hint="Shared finance ledger"
          icon="FileText"
        />
        <StatsCard
          label="Reminders sent"
          value={String(
            invoices.filter((i) => i.reminderStatus === 'sent').length,
          )}
          icon="Bell"
        />
      </section>

      <section aria-labelledby="payment-entries-heading" className="space-y-3">
        <h2
          id="payment-entries-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Payment entries
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
                    {row.customerBusinessName}
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
              key: 'due',
              header: 'Due',
              render: (row) => formatFinanceDate(row.dueDate),
            },
            {
              key: 'actions',
              header: 'Actions',
              render: () => (
                <div className="flex flex-wrap gap-2">
                  <PlaceholderAction>Record payment</PlaceholderAction>
                  <PlaceholderAction>Remind</PlaceholderAction>
                </div>
              ),
            },
          ]}
        />
      </section>

      <section aria-labelledby="invoice-heading" className="space-y-3">
        <h2
          id="invoice-heading"
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
              render: (row) => (
                <div>
                  <p className="font-medium">{row.number}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {row.customerBusinessName}
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
              key: 'reminder',
              header: 'Reminder',
              render: (row) => <StatusBadge status={row.reminderStatus} />,
            },
          ]}
        />
      </section>
    </div>
  );
}
