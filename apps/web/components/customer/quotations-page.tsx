import { StatsCard } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getQuotationsForCustomer,
} from '@/lib/finance';
import { DEMO_CUSTOMER_ID } from '@/lib/projects';

export function CustomerQuotationsPage() {
  const rows = getQuotationsForCustomer(DEMO_CUSTOMER_ID);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Quotations"
        description="Your quotations only. Draft admin quotations stay hidden until sent."
      />

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Quotation summary">
        <StatsCard
          label="Your quotations"
          value={String(rows.length)}
          icon="FileText"
        />
        <StatsCard
          label="Open value"
          value={formatFinanceInr(
            rows
              .filter((q) => q.status === 'sent')
              .reduce((sum, q) => sum + q.amountInr, 0),
          )}
          icon="Wallet"
        />
      </section>

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.number}
        emptyMessage="No quotations shared with you yet."
        columns={[
          {
            key: 'number',
            header: 'Quotation',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.number}</p>
                <p className="text-xs text-uv-foreground-muted">{row.title}</p>
              </div>
            ),
          },
          {
            key: 'amount',
            header: 'Amount',
            render: (row) => formatFinanceInr(row.amountInr),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'valid',
            header: 'Valid until',
            render: (row) => formatFinanceDate(row.validUntil),
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
