import { CustomerPageHeader } from '@/components/customer/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { demoAgreements, formatDisplayDate } from '@/lib/customer';

export function CustomerAgreementsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Agreements"
        description="Contract titles, signature status, and digital trust placeholders. No e-sign provider connected."
      />

      <ResponsiveDataList
        rows={demoAgreements}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        columns={[
          {
            key: 'title',
            header: 'Agreement',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="mt-0.5 text-xs text-uv-foreground-subtle">
                  {row.auditLabel}
                </p>
              </div>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'signed',
            header: 'Signed date',
            render: (row) =>
              row.signedDate ? formatDisplayDate(row.signedDate) : '—',
          },
          {
            key: 'expiry',
            header: 'Expiry / renewal',
            mobileLabel: 'Renewal',
            render: (row) => formatDisplayDate(row.expiryOrRenewalDate),
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

      <p className="rounded-uv-lg border border-dashed border-uv-border bg-uv-background-subtle px-4 py-3 text-sm text-uv-foreground-muted">
        Digital trust / audit: checksum and signature certificate labels are
        placeholders only — not production legal evidence.
      </p>
    </div>
  );
}
