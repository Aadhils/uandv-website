import { CustomerPageHeader } from '@/components/customer/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDateTime,
  getCustomerVisibleActivities,
  getProjectById,
} from '@/lib/projects';
import { notFound } from 'next/navigation';

export function CustomerProjectActivityPage({
  projectId,
}: {
  projectId: string;
}) {
  const project = getProjectById(projectId);
  if (!project) notFound();

  const rows = getCustomerVisibleActivities(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Project Activity"
        description="Customer-visible delivery events only. Internal and admin-only entries are hidden."
      />
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        emptyMessage="No visible activity yet."
        columns={[
          {
            key: 'when',
            header: 'When',
            hideOnMobile: true,
            render: (row) => formatProjectDateTime(row.occurredAt),
          },
          {
            key: 'title',
            header: 'Event',
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.description}
                </p>
              </div>
            ),
          },
          {
            key: 'actor',
            header: 'By',
            render: (row) => row.actorName,
          },
          {
            key: 'type',
            header: 'Type',
            render: (row) => <StatusBadge status={row.eventType} />,
          },
        ]}
      />
    </div>
  );
}
