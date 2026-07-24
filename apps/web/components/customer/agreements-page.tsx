import { CustomerPageHeader } from '@/components/customer/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getAgreementsForCustomer,
} from '@/lib/finance';
import { DEMO_CUSTOMER_ID } from '@/lib/projects';

export function CustomerAgreementsPage() {
  const rows = getAgreementsForCustomer(DEMO_CUSTOMER_ID);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Agreements"
        description="Your service agreements only. Linked to your projects where applicable. No e-sign provider connected."
      />

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        emptyMessage="No agreements yet."
        columns={[
          {
            key: 'title',
            header: 'Agreement',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="mt-0.5 text-xs text-uv-foreground-subtle">
                  {row.projectTitle ?? 'Workspace agreement'} · {row.auditLabel}
                </p>
              </div>
            ),
          },
          {
            key: 'value',
            header: 'Value',
            render: (row) => formatFinanceInr(row.valueInr),
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
              row.signedAt ? formatFinanceDate(row.signedAt) : '—',
          },
          {
            key: 'expiry',
            header: 'Expiry / renewal',
            mobileLabel: 'Renewal',
            render: (row) => formatFinanceDate(row.expiryOrRenewalAt),
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
