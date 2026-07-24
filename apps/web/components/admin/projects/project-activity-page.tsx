import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDateTime,
  getAuditForProject,
} from '@/lib/projects';

export function AdminProjectActivityPage({
  projectId,
}: {
  projectId: string;
}) {
  requireProject(projectId);
  const rows = getAuditForProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Activity & Audit Trail"
        description="Demo audit entries with actor, timestamp, action, entity, and visibility. Not persisted."
      />
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.action}
        columns={[
          {
            key: 'when',
            header: 'When',
            hideOnMobile: true,
            render: (row) => formatProjectDateTime(row.occurredAt),
          },
          {
            key: 'actor',
            header: 'Actor',
            render: (row) => row.actorName,
          },
          {
            key: 'action',
            header: 'Action',
            render: (row) => row.action,
          },
          {
            key: 'entity',
            header: 'Entity',
            render: (row) => `${row.entityType}:${row.entityId}`,
          },
          {
            key: 'visibility',
            header: 'Visibility',
            render: (row) => <StatusBadge status={row.visibility} />,
          },
          {
            key: 'detail',
            header: 'Detail',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.detail}</span>
            ),
          },
        ]}
      />
    </div>
  );
}

