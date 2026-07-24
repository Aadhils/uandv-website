import { AdminPageHeader } from '@/components/admin/page-header';
import { requirePartner } from '@/components/admin/partners/require-partner';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatPartnerDate,
  getDocumentsForPartner,
} from '@/lib/partners';

export function AdminPartnerDocumentsPage({
  partnerId,
}: {
  partnerId: string;
}) {
  requirePartner(partnerId);
  const rows = getDocumentsForPartner(partnerId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Partner Documents"
        description="NDA, GST, KYC, and bank verification placeholders. Never display real secrets."
      />
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        emptyMessage="No documents on file."
        columns={[
          {
            key: 'name',
            header: 'Document',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-uv-foreground-muted">{row.kind}</p>
              </div>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'uploaded',
            header: 'Uploaded',
            render: (row) =>
              row.uploadedAt ? formatPartnerDate(row.uploadedAt) : '—',
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-2">
                <PlaceholderAction>View</PlaceholderAction>
                <PlaceholderAction>Request update</PlaceholderAction>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
