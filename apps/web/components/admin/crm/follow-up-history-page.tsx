import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import {
  demoFollowUpHistory,
  formatDisplayDate,
} from '@/lib/crm';

export function AdminFollowUpHistoryPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Follow-up History"
        description="Review employee follow-up activity across leads. Admin-only · demo UI."
      />

      <ResponsiveDataList
        rows={demoFollowUpHistory}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.employeeName}
        columns={[
          {
            key: 'employee',
            header: 'Employee',
            hideOnMobile: true,
            render: (row) => row.employeeName,
          },
          {
            key: 'lead',
            header: 'Lead',
            render: (row) => row.leadName,
          },
          {
            key: 'action',
            header: 'Action',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.action}</span>
            ),
          },
          {
            key: 'when',
            header: 'When',
            render: (row) => formatDisplayDate(row.occurredAt),
          },
          {
            key: 'next',
            header: 'Next follow-up',
            render: (row) =>
              row.nextFollowUp ? formatDisplayDate(row.nextFollowUp) : '—',
          },
        ]}
      />
    </div>
  );
}
