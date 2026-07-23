import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { demoCrmEmployees } from '@/lib/crm';

export function AdminEmployeesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Employees"
        description="Create or invite employees on the shared identity system. No separate employee credential database."
      />

      <div className="flex flex-wrap justify-end gap-2">
        <PlaceholderAction>Invite employee</PlaceholderAction>
        <PlaceholderAction>Create employee</PlaceholderAction>
      </div>

      <ResponsiveDataList
        rows={demoCrmEmployees}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        columns={[
          {
            key: 'name',
            header: 'Name',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-uv-foreground-muted">{row.email}</p>
              </div>
            ),
          },
          {
            key: 'userId',
            header: 'Shared user ID',
            mobileLabel: 'User ID',
            render: (row) => (
              <span className="font-mono text-xs text-uv-foreground-muted">
                {row.userId}
              </span>
            ),
          },
          {
            key: 'department',
            header: 'Department',
            render: (row) => row.department,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'perms',
            header: 'Permissions',
            render: (row) => `${row.permissions.length} enabled`,
          },
        ]}
      />
    </div>
  );
}
