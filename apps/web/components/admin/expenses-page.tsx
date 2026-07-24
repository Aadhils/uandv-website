import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  expenseCategoryLabel,
  formatFinanceDate,
  formatFinanceInr,
  getExpensesForAdmin,
} from '@/lib/finance';

export function AdminExpensesPage() {
  const rows = getExpensesForAdmin();
  const total = rows.reduce((sum, e) => sum + e.amountInr, 0);
  const pending = rows.filter(
    (e) => e.status === 'submitted' || e.status === 'draft',
  ).length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Expense Management"
        description="Admin-only expense ledger. Not visible to customers, vendors, or employees. Demo data only."
        actions={<PlaceholderAction>Add expense</PlaceholderAction>}
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Expense metrics">
        <StatsCard
          label="Expense total"
          value={formatFinanceInr(total)}
          icon="Wallet"
        />
        <StatsCard label="Pending approval" value={String(pending)} icon="Clock" />
        <StatsCard
          label="Entries"
          value={String(rows.length)}
          hint="Admin-only"
          icon="FileText"
        />
      </section>

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        columns={[
          {
            key: 'title',
            header: 'Expense',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-uv-foreground-muted">{row.notes}</p>
              </div>
            ),
          },
          {
            key: 'category',
            header: 'Category',
            render: (row) => expenseCategoryLabel(row.category),
          },
          {
            key: 'amount',
            header: 'Amount',
            render: (row) => formatFinanceInr(row.amountInr),
          },
          {
            key: 'project',
            header: 'Project',
            render: (row) => row.projectTitle ?? '—',
          },
          {
            key: 'vendor',
            header: 'Vendor',
            render: (row) => row.vendorName ?? '—',
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'date',
            header: 'Incurred',
            render: (row) => formatFinanceDate(row.incurredAt),
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
