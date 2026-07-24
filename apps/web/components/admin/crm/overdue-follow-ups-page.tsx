import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  LEAD_PIPELINE_LABELS,
  formatDisplayDate,
  getOverdueFollowUps,
} from '@/lib/crm';

export function AdminOverdueFollowUpsPage() {
  const rows = getOverdueFollowUps();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Overdue Follow-ups"
        description="Monitor missed follow-up dates across all owned leads. Admin-only · demo UI."
      />

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.leadName}
        emptyMessage="No overdue follow-ups."
        columns={[
          {
            key: 'lead',
            header: 'Lead',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.leadName}</p>
                <p className="text-xs text-uv-foreground-muted">{row.company}</p>
              </div>
            ),
          },
          {
            key: 'due',
            header: 'Was due',
            render: (row) => (
              <div className="flex flex-wrap items-center gap-2">
                <span>{formatDisplayDate(row.nextFollowUp)}</span>
                <Badge variant="error">Overdue</Badge>
              </div>
            ),
          },
          {
            key: 'employee',
            header: 'Assigned employee',
            mobileLabel: 'Employee',
            render: (row) => row.assignedEmployee,
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
            key: 'actions',
            header: 'Actions',
            render: () => (
              <PlaceholderAction>Set follow-up date</PlaceholderAction>
            ),
          },
        ]}
      />
    </div>
  );
}
