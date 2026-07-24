import { VendorPageHeader } from '@/components/vendor/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { formatVendorDate, getVendorDeliverables } from '@/lib/vendor';

export function VendorDeliverablesPage() {
  const rows = getVendorDeliverables();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Deliverables"
        description="Track versions, review status, and Admin feedback. Upload and version history are placeholders — no real file storage."
      />

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        columns={[
          {
            key: 'title',
            header: 'Deliverable',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.assignmentTitle}
                </p>
              </div>
            ),
          },
          {
            key: 'version',
            header: 'Version',
            render: (row) => row.version,
          },
          {
            key: 'due',
            header: 'Due date',
            render: (row) => formatVendorDate(row.dueDate),
          },
          {
            key: 'submitted',
            header: 'Submitted',
            render: (row) =>
              row.submittedDate ? formatVendorDate(row.submittedDate) : '—',
          },
          {
            key: 'status',
            header: 'Review status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'feedback',
            header: 'Admin feedback',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.adminFeedback}</span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-1">
                <PlaceholderAction>Upload</PlaceholderAction>
                <PlaceholderAction>Version history</PlaceholderAction>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
