import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  LEAD_PIPELINE_LABELS,
  demoLeads,
} from '@/lib/crm';

export function LeadScoresPage() {
  const ranked = [...demoLeads].sort(
    (a, b) => b.activityScore - a.activityScore,
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Lead Score"
        description="Activity-based score and conversion probability. Demo scoring model only — not live analytics."
      />

      <ResponsiveDataList
        rows={ranked}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        columns={[
          {
            key: 'lead',
            header: 'Lead',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{row.name}</p>
                  {row.isHot ? <Badge variant="warning">Hot</Badge> : null}
                </div>
                <p className="text-xs text-uv-foreground-muted">{row.company}</p>
              </div>
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
          {
            key: 'activity',
            header: 'Activity score',
            mobileLabel: 'Activity',
            render: (row) => (
              <div className="min-w-[9rem]">
                <ProgressBar
                  value={row.activityScore}
                  label="Activity"
                  size="sm"
                />
              </div>
            ),
          },
          {
            key: 'probability',
            header: 'Conversion probability',
            mobileLabel: 'Conversion',
            render: (row) => (
              <div className="min-w-[9rem]">
                <ProgressBar
                  value={row.conversionProbability}
                  label="Conversion"
                  size="sm"
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
