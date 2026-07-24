import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  LEAD_PIPELINE_LABELS,
  demoLeadAssignments,
} from '@/lib/crm';

export function LeadAssignmentsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Employee Assignment"
        description="Assign leads, set department and priority, and reassign ownership. Admin-only · shared identity employee IDs · demo UI."
      />

      <div className="flex justify-end">
        <PlaceholderAction>Assign lead</PlaceholderAction>
      </div>

      <ResponsiveDataList
        rows={demoLeadAssignments}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.leadName}
        columns={[
          {
            key: 'lead',
            header: 'Lead',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.leadName}</p>
                <p className="text-xs text-uv-foreground-muted">{row.company}</p>
              </div>
            ),
          },
          {
            key: 'employee',
            header: 'Assigned employee',
            mobileLabel: 'Employee',
            render: (row) => row.assignedEmployee,
          },
          {
            key: 'department',
            header: 'Department',
            render: (row) => row.department,
          },
          {
            key: 'priority',
            header: 'Priority',
            render: (row) => <StatusBadge status={row.priority} />,
          },
          {
            key: 'status',
            header: 'Pipeline status',
            mobileLabel: 'Status',
            render: (row) => (
              <StatusBadge
                status={row.status}
                label={LEAD_PIPELINE_LABELS[row.status]}
              />
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => <PlaceholderAction>Reassign ownership</PlaceholderAction>,
          },
        ]}
      />
    </div>
  );
}
