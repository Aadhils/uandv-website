import { Badge } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import {
  demoDocuments,
  formatDisplayDate,
  type DocumentCategory,
} from '@/lib/customer';

const categoryLabels: Record<DocumentCategory, string> = {
  agreements: 'Agreements',
  invoices: 'Invoices',
  legal: 'Legal documents',
  project_files: 'Project files',
  certificates: 'Certificates',
};

export function CustomerDocumentsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Documents"
        description="Categorised files with version and audit placeholders. Upload/download are not connected."
        actions={<PlaceholderAction>Upload document</PlaceholderAction>}
      />

      <div className="flex flex-wrap gap-2" aria-label="Document categories">
        {(Object.keys(categoryLabels) as DocumentCategory[]).map((key) => (
          <Badge key={key} variant="outline">
            {categoryLabels[key]}
          </Badge>
        ))}
      </div>

      <ResponsiveDataList
        rows={demoDocuments}
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
                <p className="text-xs text-uv-foreground-subtle">{row.auditLabel}</p>
              </div>
            ),
          },
          {
            key: 'category',
            header: 'Category',
            render: (row) => categoryLabels[row.category],
          },
          {
            key: 'version',
            header: 'Version',
            render: (row) => row.version,
          },
          {
            key: 'updated',
            header: 'Updated',
            render: (row) => formatDisplayDate(row.updatedAt),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-2">
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
