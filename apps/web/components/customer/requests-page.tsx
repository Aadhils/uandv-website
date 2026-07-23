import { CustomerPageHeader } from '@/components/customer/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoServiceRequests,
  formatDisplayDate,
} from '@/lib/customer';

export function CustomerRequestsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Service Requests"
        description="Track change requests and new service asks. Submission is a demo placeholder."
        actions={<PlaceholderAction>New service request</PlaceholderAction>}
      />

      <ResponsiveDataList
        rows={demoServiceRequests}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        columns={[
          {
            key: 'id',
            header: 'Request ID',
            render: (row) => (
              <span className="font-mono text-xs">{row.id}</span>
            ),
          },
          {
            key: 'title',
            header: 'Title',
            hideOnMobile: true,
            render: (row) => <span className="font-medium">{row.title}</span>,
          },
          {
            key: 'category',
            header: 'Category',
            render: (row) => row.category,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'priority',
            header: 'Priority',
            render: (row) => <StatusBadge status={row.priority} />,
          },
          {
            key: 'created',
            header: 'Created',
            render: (row) => formatDisplayDate(row.createdAt),
          },
          {
            key: 'team',
            header: 'Assigned team',
            mobileLabel: 'Team',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.assignedTeam}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
