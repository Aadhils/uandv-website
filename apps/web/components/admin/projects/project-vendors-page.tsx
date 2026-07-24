import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDate,
  getAssignmentsForProject,
  getTasksForProject,
} from '@/lib/projects';

export function AdminProjectVendorsPage({ projectId }: { projectId: string }) {
  const project = requireProject(projectId);
  const vendors = getAssignmentsForProject(projectId).filter(
    (a) => a.role === 'vendor',
  );
  const vendorTasks = getTasksForProject(projectId).filter(
    (t) => t.assigneeKind === 'vendor',
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Vendor Work Orders"
        description={`Vendors see limited context only when permitted (currently ${project.vendorContextPermitted ? 'permitted' : 'hidden'}). Linked to Vendor Workspace WOs.`}
      />

      <ResponsiveDataList
        rows={vendors}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.participantName}
        emptyMessage="No vendors assigned."
        columns={[
          {
            key: 'vendor',
            header: 'Vendor',
            hideOnMobile: true,
            render: (row) => row.participantName,
          },
          {
            key: 'responsibility',
            header: 'Scope',
            render: (row) => row.responsibility,
          },
          {
            key: 'due',
            header: 'Due',
            render: (row) =>
              row.dueDate ? formatProjectDate(row.dueDate) : '—',
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

      <section className="space-y-3">
        <h2 className="font-semibold">Linked vendor tasks</h2>
        <ul className="space-y-2">
          {vendorTasks.map((task) => (
            <li
              key={task.id}
              className="rounded-uv-lg border border-uv-border px-3 py-2 text-sm"
            >
              <p className="font-medium">{task.title}</p>
              <p className="text-uv-foreground-muted">
                WO {task.vendorWorkOrderId ?? '—'} · Due{' '}
                {formatProjectDate(task.dueDate)} ·{' '}
                <StatusBadge status={task.status} />
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

