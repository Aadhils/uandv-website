import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { getRisksForProject } from '@/lib/projects';

export function AdminProjectRisksPage({ projectId }: { projectId: string }) {
  requireProject(projectId);
  const rows = getRisksForProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Risks & Blockers"
        description="Admin-only foundation for delivery risks. Customer visibility is toggled per risk."
      />
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        emptyMessage="No risks logged."
        columns={[
          {
            key: 'title',
            header: 'Risk',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-uv-foreground-muted">{row.type}</p>
              </div>
            ),
          },
          {
            key: 'severity',
            header: 'Severity',
            render: (row) => <StatusBadge status={row.severity} />,
          },
          {
            key: 'owner',
            header: 'Owner',
            render: (row) => row.ownerName,
          },
          {
            key: 'impact',
            header: 'Impact',
            render: (row) => row.impact,
          },
          {
            key: 'mitigation',
            header: 'Mitigation',
            render: (row) => row.mitigation,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'delay',
            header: 'Delay days',
            render: (row) => String(row.delayDays),
          },
          {
            key: 'flags',
            header: 'Flags',
            render: (row) => (
              <span className="text-xs text-uv-foreground-muted">
                {row.customerVisible ? 'Customer visible · ' : 'Internal · '}
                {row.vendorDependency ? 'Vendor dependency' : 'No vendor dep'}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}

