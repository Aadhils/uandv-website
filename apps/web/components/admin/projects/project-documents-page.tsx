import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  documentCategoryLabel,
  formatProjectDate,
  getDocumentsForProject,
} from '@/lib/projects';

export function AdminProjectDocumentsPage({
  projectId,
}: {
  projectId: string;
}) {
  requireProject(projectId);
  const rows = getDocumentsForProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Project Documents"
        description="Visibility-scoped documents. Never shows real credentials. Upload/view/download are placeholders."
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
            key: 'owner',
            header: 'Owner',
            render: (row) => row.ownerName,
          },
          {
            key: 'visibility',
            header: 'Visibility',
            render: (row) => <StatusBadge status={row.visibility} />,
          },
          {
            key: 'uploaded',
            header: 'Uploaded',
            render: (row) => formatProjectDate(row.uploadedAt),
          },
          {
            key: 'review',
            header: 'Review',
            render: (row) => <StatusBadge status={row.reviewStatus} />,
          },
          {
            key: 'approval',
            header: 'Approval',
            render: (row) => <StatusBadge status={row.approvalStatus} />,
          },
          {
            key: 'audit',
            header: 'Audit',
            render: (row) => (
              <span className="text-xs text-uv-foreground-muted">
                {row.auditPlaceholder}
              </span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-1">
                <PlaceholderAction>View</PlaceholderAction>
                <PlaceholderAction>Download</PlaceholderAction>
                <PlaceholderAction>Upload</PlaceholderAction>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

