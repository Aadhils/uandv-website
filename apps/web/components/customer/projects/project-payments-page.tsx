import { StatsCard } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDate,
  formatProjectInr,
  getPaymentsForProject,
  getProjectById,
} from '@/lib/projects';
import { notFound } from 'next/navigation';

export function CustomerProjectPaymentsPage({
  projectId,
}: {
  projectId: string;
}) {
  const project = getProjectById(projectId);
  if (!project) notFound();
  const payments = getPaymentsForProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Payment Summary"
        description="Customer-visible payment milestones. No payment gateway connected."
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
              header: 'Due',
              render: (row) => formatProjectDate(row.dueDate),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
          ]}
        />
      ) : null}
    </div>
  );
}
