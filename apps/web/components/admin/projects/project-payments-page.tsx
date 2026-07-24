import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDate,
  formatProjectInr,
  getPaymentsForProject,
} from '@/lib/projects';

export function AdminProjectPaymentsPage({
  projectId,
}: {
  projectId: string;
}) {
  const project = requireProject(projectId);
  const payments = getPaymentsForProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Payment Milestones"
        description="Customer-visible payment summary foundation. Vendor settlement stays separate. No gateway or tax engine."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Project value"
          value={formatProjectInr(project.projectValueInr)}
          icon="Wallet"
        />
        <StatsCard
          label="Advance"
          value={formatProjectInr(project.advanceAmountInr)}
          icon="Check"
        />
        <StatsCard
          label="Paid"
          value={formatProjectInr(payments?.paidAmountInr ?? 0)}
          icon="TrendingUp"
        />
        <StatsCard
          label="Pending"
          value={formatProjectInr(payments?.pendingAmountInr ?? 0)}
          icon="Clock"
        />
      </section>

      {payments ? (
        <ResponsiveDataList
          rows={payments.milestones}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.label}
          columns={[
            {
              key: 'label',
              header: 'Milestone',
              hideOnMobile: true,
              render: (row) => row.label,
            },
            {
              key: 'amount',
              header: 'Amount',
              render: (row) => formatProjectInr(row.amountInr),
            },
            {
              key: 'due',
              header: 'Due date',
              render: (row) => formatProjectDate(row.dueDate),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              key: 'invoice',
              header: 'Invoice',
              render: (row) => <StatusBadge status={row.invoiceStatus} />,
            },
          ]}
        />
      ) : (
        <p className="text-sm text-uv-foreground-muted">No payment summary.</p>
      )}
    </div>
  );
}

