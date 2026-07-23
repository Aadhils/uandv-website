import { AdminPageHeader } from '@/components/admin/page-header';
import { requirePartner } from '@/components/admin/partners/require-partner';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatPartnerDate,
  getAssignmentsForPartner,
} from '@/lib/partners';

export function AdminPartnerProjectsPage({
  partnerId,
}: {
  partnerId: string;
}) {
  requirePartner(partnerId);
  const rows = getAssignmentsForPartner(partnerId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Assigned Projects"
        description="Partner assignments linked to shared project IDs. Demo mapping only."
      />
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.projectTitle}
        emptyMessage="No projects assigned to this partner."
        columns={[
          {
            key: 'project',
            header: 'Project',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.projectTitle}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.projectId} · {row.customerBusinessName}
                </p>
              </div>
            ),
          },
          {
            key: 'role',
            header: 'Role',
            render: (row) => row.roleLabel,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'assigned',
            header: 'Assigned',
            render: (row) => formatPartnerDate(row.assignedAt),
          },
          {
            key: 'due',
            header: 'Due',
            render: (row) =>
              row.dueDate ? formatPartnerDate(row.dueDate) : '—',
          },
        ]}
      />
    </div>
  );
}
