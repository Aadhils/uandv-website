import { EmployeePageHeader } from '@/components/employee/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { getEmployeeCustomerRows } from '@/lib/employee';

export function EmployeeCustomersPage() {
  const rows = getEmployeeCustomerRows();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title="Assigned Customers"
        description="Customers owned by you only. Payment editing and global customer controls are not available in Employee Workspace."
      />

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        emptyMessage="No customers assigned to you."
        columns={[
          {
            key: 'name',
            header: 'Customer',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.customerId}
                </p>
              </div>
            ),
          },
          {
            key: 'company',
            header: 'Company',
            render: (row) => row.company,
          },
          {
            key: 'projects',
            header: 'Active projects',
            mobileLabel: 'Projects',
            render: (row) => String(row.activeProjects),
          },
          {
            key: 'latest',
            header: 'Latest communication',
            mobileLabel: 'Latest',
            render: (row) => (
              <span className="text-uv-foreground-muted">
                {row.latestCommunication}
              </span>
            ),
          },
          {
            key: 'approval',
            header: 'Pending approval',
            render: (row) => row.pendingApproval,
          },
          {
            key: 'support',
            header: 'Support status',
            render: (row) => <StatusBadge status={row.supportStatus} />,
          },
          {
            key: 'next',
            header: 'Next action',
            render: (row) => row.nextAction,
          },
        ]}
      />
    </div>
  );
}
