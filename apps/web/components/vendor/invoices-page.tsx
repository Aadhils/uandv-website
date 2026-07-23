import { VendorPageHeader } from '@/components/vendor/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatInr,
  formatVendorDate,
  getVendorInvoices,
} from '@/lib/vendor';

export function VendorInvoicesPage() {
  const rows = getVendorInvoices();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Invoice Center"
        description="Raise and track invoices for assigned work orders. GST/TDS are placeholders — no real tax calculation or invoicing engine."
        actions={<PlaceholderAction>Raise invoice</PlaceholderAction>}
      />

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.invoiceNumber}
        columns={[
          {
            key: 'number',
            header: 'Invoice number',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.invoiceNumber}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.workOrderTitle}
                </p>
              </div>
            ),
          },
          {
            key: 'amount',
            header: 'Amount',
            render: (row) => formatInr(row.amountInr),
          },
          {
            key: 'gst',
            header: 'GST',
            render: (row) => (
              <span className="text-xs text-uv-foreground-muted">
                {row.gstPlaceholder}
              </span>
            ),
          },
          {
            key: 'tds',
            header: 'TDS',
            render: (row) => (
              <span className="text-xs text-uv-foreground-muted">
                {row.tdsPlaceholder}
              </span>
            ),
          },
          {
            key: 'submitted',
            header: 'Submitted',
            render: (row) =>
              row.submittedDate ? formatVendorDate(row.submittedDate) : '—',
          },
          {
            key: 'status',
            header: 'Approval status',
            render: (row) => <StatusBadge status={row.status} />,
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
