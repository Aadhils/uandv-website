import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  LEAD_PIPELINE_LABELS,
  demoLeadFollowUps,
  formatDisplayDate,
} from '@/lib/crm';

export function LeadFollowUpsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Follow-up Center"
        description="Next follow-up, last contact, assigned employee, and reminders. No notification service connected."
      />

      <ResponsiveDataList
        rows={demoLeadFollowUps}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.leadName}
        emptyMessage="No follow-ups scheduled."
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
            key: 'next',
            header: 'Next follow-up',
            render: (row) => formatDisplayDate(row.nextFollowUp),
          },
          {
            key: 'last',
            header: 'Last contact',
            render: (row) =>
              row.lastContact === '—'
                ? '—'
                : formatDisplayDate(row.lastContact),
          },
          {
            key: 'employee',
            header: 'Assigned employee',
            mobileLabel: 'Employee',
            render: (row) => row.assignedEmployee,
          },
          {
            key: 'reminder',
            header: 'Reminder',
            render: (row) => row.reminder,
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
            render: () => <PlaceholderAction>Snooze reminder</PlaceholderAction>,
          },
        ]}
      />
    </div>
  );
}
