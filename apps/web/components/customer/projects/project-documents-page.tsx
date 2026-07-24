import { CustomerPageHeader } from '@/components/customer/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  documentCategoryLabel,
  formatProjectDate,
  getCustomerVisibleDocuments,
  getProjectById,
} from '@/lib/projects';
import { notFound } from 'next/navigation';

export function CustomerProjectDocumentsPage({
  projectId,
}: {
  projectId: string;
}) {
  if (!getProjectById(projectId)) notFound();
  const rows = getCustomerVisibleDocuments(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Project Documents"
        description="Shared documents only. No credentials or secrets are shown."
      />
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        columns={[
          {
            key: 'name',
            header: 'Document',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {documentCategoryLabel(row.category)} · {row.version}
                </p>
              </div>
            ),
          },
          {
            key: 'uploaded',
            header: 'Uploaded',
            render: (row) => formatProjectDate(row.uploadedAt),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.reviewStatus} />,
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-1">
                <PlaceholderAction>View</PlaceholderAction>
                <PlaceholderAction>Download</PlaceholderAction>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
