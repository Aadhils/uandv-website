import { Badge } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  EMPLOYEE_PIPELINE_LABELS,
  formatDisplayDate,
  getEmployeeLeadRows,
} from '@/lib/employee';
import type { LeadSource } from '@/lib/crm';

const sourceLabels: Record<LeadSource, string> = {
  website: 'Website',
  whatsapp: 'WhatsApp',
  referral: 'Referral',
  campaign: 'Campaign',
  walk_in: 'Walk-in',
  other: 'Other',
};

export function EmployeeLeadsPage() {
  const rows = getEmployeeLeadRows();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title="Assigned Leads"
        description="Only leads assigned to you via ownerEmployeeId. Full CRM directory is Admin-only."
      />

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        emptyMessage="No leads assigned to you."
        columns={[
          {
            key: 'name',
            header: 'Name',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
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
            key: 'contact',
            header: 'Contact',
            render: (row) => (
              <div className="text-sm">
                <p>{row.phone}</p>
                <p className="text-xs text-uv-foreground-muted">{row.email}</p>
              </div>
            ),
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
            key: 'service',
            header: 'Interested service',
            mobileLabel: 'Service',
            render: (row) => row.interestedService,
          },
          {
            key: 'score',
            header: 'Lead score',
            render: (row) => (
              <div className="min-w-[7rem]">
                <ProgressBar value={row.leadScore} label="Score" size="sm" />
              </div>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <StatusBadge
                status={row.status}
                label={EMPLOYEE_PIPELINE_LABELS[row.status]}
              />
            ),
          },
          {
            key: 'next',
            header: 'Next follow-up',
            render: (row) =>
              row.nextFollowUp ? (
                <Badge variant="outline">
                  {formatDisplayDate(row.nextFollowUp)}
                </Badge>
              ) : (
                '—'
              ),
          },
          {
            key: 'activity',
            header: 'Last activity',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.lastActivity}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
