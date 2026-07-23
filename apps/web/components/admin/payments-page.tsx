import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoAdminInvoices,
  formatDisplayDate,
  formatInr,
} from '@/lib/admin';

export function AdminPaymentsPage() {
  const pending = demoAdminInvoices.filter(
    (invoice) =>
      invoice.status === 'pending' ||
      invoice.status === 'overdue' ||
      invoice.status === 'upcoming',
  );
  const pendingTotal = pending.reduce((sum, item) => sum + item.amountInr, 0);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Payment Center"
        description="Pending payments, invoice status, history, and reminder placeholders. No payment gateway."
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Payment metrics">
        <StatsCard
          label="Pending payments"
          value={formatInr(pendingTotal)}
          hint={`${pending.length} invoice(s)`}
          icon="Wallet"
        />
        <StatsCard
          label="Reminders sent"
          value={String(
            demoAdminInvoices.filter((i) => i.reminderStatus === 'sent').length,
          )}
          hint="Demo reminder status"
          icon="Bell"
        />
        <StatsCard
          label="Paid (sample)"
          value={String(
            demoAdminInvoices.filter((i) => i.status === 'paid').length,
          )}
          hint="From demo ledger"
          icon="Check"
        />
      </section>

      <ResponsiveDataList
        rows={demoAdminInvoices}
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
                  {row.customerName}
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
            header: 'Invoice status',
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
            key: 'reminder',
            header: 'Reminder status',
            render: (row) => <StatusBadge status={row.reminderStatus} />,
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => <PlaceholderAction>Send reminder</PlaceholderAction>,
          },
        ]}
      />
    </div>
  );
}
