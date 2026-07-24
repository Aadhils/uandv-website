'use client';

import * as React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoAdminTickets,
  formatDisplayDate,
  type AdminTicket,
} from '@/lib/admin';

export function AdminSupportPage() {
  const [selectedId, setSelectedId] = React.useState(
    demoAdminTickets[0]?.id ?? '',
  );
  const [replyNote, setReplyNote] = React.useState('');
  const [statusNote, setStatusNote] = React.useState<string | null>(null);

  const selected =
    demoAdminTickets.find((ticket) => ticket.id === selectedId) ??
    demoAdminTickets[0];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Support Center"
        description="Ticket queue, reply UI, priority, and assigned staff. No live messaging."
      />

      <ResponsiveDataList
        rows={demoAdminTickets}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.subject}
        columns={[
          {
            key: 'id',
            header: 'Ticket',
            render: (row) => (
              <button
                type="button"
                className="font-mono text-xs text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
                onClick={() => setSelectedId(row.id)}
              >
                {row.id}
              </button>
            ),
          },
          {
            key: 'subject',
            header: 'Subject',
            hideOnMobile: true,
            render: (row: AdminTicket) => (
              <div>
                <p className="font-medium">{row.subject}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.customerName}
                </p>
              </div>
            ),
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
            key: 'staff',
            header: 'Assigned staff',
            mobileLabel: 'Staff',
            render: (row) => row.assignedStaff,
          },
          {
            key: 'updated',
            header: 'Updated',
            render: (row) => formatDisplayDate(row.updatedAt),
          },
        ]}
      />

      {selected ? (
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">
              Reply · {selected.id}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium">{selected.subject}</p>
            <p className="rounded-uv-lg border border-dashed border-uv-border bg-uv-background-subtle px-4 py-3 text-sm text-uv-foreground-muted">
              {selected.latestReply}
            </p>
            <label htmlFor="admin-reply" className="uv-label">
              Reply
            </label>
            <Textarea
              id="admin-reply"
              value={replyNote}
              onChange={(event) => setReplyNote(event.target.value)}
              placeholder="Type a demo reply…"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-uv-lg bg-uv-brand px-4 text-sm font-medium text-uv-brand-foreground uv-focus-ring"
                onClick={() =>
                  setStatusNote('Demo reply recorded locally — not sent.')
                }
              >
                Send reply (demo)
              </button>
              <PlaceholderAction>Close ticket</PlaceholderAction>
            </div>
            {statusNote ? (
              <p className="text-sm text-uv-foreground-muted" role="status">
                {statusNote}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
