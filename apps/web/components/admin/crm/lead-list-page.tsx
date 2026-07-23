import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  LEAD_PIPELINE_LABELS,
  demoLeads,
  type LeadSource,
} from '@/lib/crm';

const sourceLabels: Record<LeadSource, string> = {
  website: 'Website',
  whatsapp: 'WhatsApp',
  referral: 'Referral',
  campaign: 'Campaign',
  walk_in: 'Walk-in',
  other: 'Other',
};

export function LeadListPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Lead List"
        description="Name, company, contact, service interest, source, and status. Demo CRM list only."
      />

      <ResponsiveDataList
        rows={demoLeads}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        columns={[
          {
            key: 'name',
            header: 'Name',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{row.name}</p>
                  {row.isHot ? <Badge variant="warning">Hot</Badge> : null}
                </div>
                <p className="text-xs text-uv-foreground-muted">{row.id}</p>
              </div>
            ),
          },
          {
            key: 'company',
            header: 'Company',
            render: (row) => row.company,
          },
          {
            key: 'phone',
            header: 'Phone',
            render: (row) => row.phone,
          },
          {
            key: 'email',
            header: 'Email',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.email}</span>
            ),
          },
          {
            key: 'service',
            header: 'Interested service',
            mobileLabel: 'Service',
            render: (row) => row.interestedService,
          },
          {
            key: 'source',
            header: 'Source',
            render: (row) => (
              <StatusBadge
                status={row.source}
                label={sourceLabels[row.source]}
              />
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <StatusBadge
                status={row.status}
                label={LEAD_PIPELINE_LABELS[row.status]}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
