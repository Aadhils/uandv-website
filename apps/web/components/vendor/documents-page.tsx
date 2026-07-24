import { VendorPageHeader } from '@/components/vendor/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoVendorDocuments,
  formatVendorDate,
  type VendorDocumentKind,
} from '@/lib/vendor';

const kindLabels: Record<VendorDocumentKind, string> = {
  nda: 'NDA',
  vendor_agreement: 'Vendor agreement',
  pan: 'PAN',
  gst: 'GST',
  bank_verification: 'Bank verification',
  kyc: 'KYC',
  work_order: 'Work order',
};

export function VendorDocumentsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Documents"
        description="Agreements and compliance documents with masked references only. Never shows real bank or identity numbers. Upload/view/download are placeholders."
      />

      <ResponsiveDataList
        rows={demoVendorDocuments}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        columns={[
          {
            key: 'title',
            header: 'Document',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {kindLabels[row.kind]}
                </p>
              </div>
            ),
          },
          {
            key: 'status',
            header: 'KYC / status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'masked',
            header: 'Reference (masked)',
            render: (row) => (
              <span className="font-mono text-xs text-uv-foreground-muted">
                {row.maskedReference}
              </span>
            ),
          },
          {
            key: 'expiry',
            header: 'Compliance expiry',
            render: (row) =>
              row.expiryDate ? formatVendorDate(row.expiryDate) : '—',
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
