import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatFinanceDate,
  formatFinanceInr,
  getAgreementsForAdmin,
} from '@/lib/finance';

export function AdminAgreementsPage() {
  const rows = getAgreementsForAdmin();
  const pending = rows.filter((a) => a.status === 'pending_signature').length;
  const renewal = rows.filter((a) => a.status === 'renewal_due').length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Agreement Management"
        description="Service agreements linked to customers and projects. Signature actions are placeholders — no e-sign provider."
        actions={<PlaceholderAction>New agreement</PlaceholderAction>}
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Agreement metrics">
        <StatsCard label="Agreements" value={String(rows.length)} icon="FileText" />
        <StatsCard label="Pending signature" value={String(pending)} icon="Clock" />
        <StatsCard label="Renewal due" value={String(renewal)} icon="Calendar" />
      </section>

      <ResponsiveDataList
        rows={rows}
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
                <p className="text-xs text-uv-foreground-muted">
                  {row.auditLabel}
                </p>
              </div>
            ),
          },
          {
            key: 'customer',
            header: 'Customer',
            render: (row) => row.customerBusinessName,
          },
          {
            key: 'project',
            header: 'Project',
            render: (row) => row.projectTitle ?? '—',
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
            header: 'Signed',
            render: (row) =>
              row.signedAt ? formatFinanceDate(row.signedAt) : '—',
          },
          {
            key: 'renewal',
            header: 'Expiry / renewal',
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
