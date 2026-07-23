import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@uandv/ui';

import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { formatDisplayDate, type SupportTicket } from '@/lib/customer';

export type SupportTicketCenterProps = {
  tickets: SupportTicket[];
};

/** Support Ticket Center — conversation is placeholder only. */
export function SupportTicketCenter({ tickets }: SupportTicketCenterProps) {
  const focusTicket =
    tickets.find(
      (ticket) =>
        ticket.status === 'open' ||
        ticket.status === 'in_progress' ||
        ticket.status === 'waiting',
    ) ?? tickets[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-uv-foreground-muted">
          Track tickets and placeholder conversations. No live messaging yet.
        </p>
        <PlaceholderAction>Create ticket</PlaceholderAction>
      </div>

      <ResponsiveDataList
        rows={tickets}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.subject}
        columns={[
          {
            key: 'id',
            header: 'Ticket ID',
            render: (row) => (
              <span className="font-mono text-xs">{row.id}</span>
            ),
          },
          {
            key: 'subject',
            header: 'Subject',
            hideOnMobile: true,
            render: (row) => <span className="font-medium">{row.subject}</span>,
          },
          {
            key: 'priority',
            header: 'Priority',
            render: (row) => <StatusBadge status={row.priority} />,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'updated',
            header: 'Last updated',
            render: (row) => formatDisplayDate(row.updatedAt),
          },
        ]}
      />

      {focusTicket ? (
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">
              Conversation · {focusTicket.id}
            </CardTitle>
            <CardDescription>{focusTicket.subject}</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="rounded-uv-lg border border-dashed border-uv-border bg-uv-background-subtle px-4 py-6 text-sm text-uv-foreground-muted"
              role="status"
            >
              {focusTicket.conversationPreview}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
