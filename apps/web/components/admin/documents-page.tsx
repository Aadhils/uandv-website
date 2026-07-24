import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoAdminDocuments,
  formatDisplayDate,
  type AdminDocumentKind,
} from '@/lib/admin';

const kindLabels: Record<AdminDocumentKind, string> = {
  agreement: 'Agreements',
  proposal: 'Proposals',
  invoice: 'Invoices',
  logo: 'Logo files',
  source_code: 'Source code',
  credentials: 'Credentials',
};

export function AdminDocumentsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Document Center"
        description="Agreements, proposals, invoices, brand files, source access, and credentials vault status. Secrets are never shown."
      />

      <div className="flex flex-wrap gap-2" aria-label="Document kinds">
        {(Object.keys(kindLabels) as AdminDocumentKind[]).map((kind) => (
          <Badge key={kind} variant="outline">
            {kindLabels[kind]}
          </Badge>
        ))}
      </div>

      <ResponsiveDataList
        rows={demoAdminDocuments}
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
                  {row.customerName}
                </p>
              </div>
            ),
          },
          {
            key: 'kind',
            header: 'Type',
            render: (row) => kindLabels[row.kind],
          },
          {
            key: 'vault',
            header: 'Credentials vault status',
            mobileLabel: 'Vault',
            render: (row) => (
              <StatusBadge
                status={row.vaultStatus}
                label={
                  row.vaultStatus === 'secure_vault'
                    ? 'Vaulted · not displayed'
                    : row.vaultStatus === 'pending_setup'
                      ? 'Pending setup'
                      : 'N/A'
                }
              />
            ),
          },
          {
            key: 'updated',
            header: 'Updated',
            render: (row) => formatDisplayDate(row.updatedAt),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) =>
              row.kind === 'credentials' ? (
                <PlaceholderAction>Vault only</PlaceholderAction>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <PlaceholderAction>View</PlaceholderAction>
                  <PlaceholderAction>Download</PlaceholderAction>
                </div>
              ),
          },
        ]}
      />

      <p className="text-xs text-uv-foreground-subtle" role="note">
        Credentials vault status is metadata only — passwords and keys are never
        rendered.
      </p>
    </div>
  );
}
