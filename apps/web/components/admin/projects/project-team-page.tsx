import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDate,
  getAssignmentsForProject,
} from '@/lib/projects';

export function AdminProjectTeamPage({ projectId }: { projectId: string }) {
  requireProject(projectId);
  const rows = getAssignmentsForProject(projectId).filter(
    (a) => a.role !== 'vendor',
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Project Employees"
        description="Owners, employees, reviewers, and approvers. Reassign is a placeholder."
      />
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.participantName}
        columns={[
          {
            key: 'name',
            header: 'Participant',
            hideOnMobile: true,
            render: (row) => row.participantName,
          },
          {
            key: 'role',
            header: 'Role',
            render: (row) => <StatusBadge status={row.role} />,
          },
          {
            key: 'responsibility',
            header: 'Responsibility',
            render: (row) => row.responsibility,
          },
          {
            key: 'assigned',
            header: 'Assigned',
            render: (row) => formatProjectDate(row.assignedAt),
          },
          {
            key: 'due',
            header: 'Due',
            render: (row) =>
              row.dueDate ? formatProjectDate(row.dueDate) : '—',
          },
          {
            key: 'workload',
            header: 'Workload',
            render: (row) => row.workloadPlaceholder,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => <PlaceholderAction>Reassign</PlaceholderAction>,
          },
        ]}
      />
    </div>
  );
}

