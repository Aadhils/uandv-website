'use client';

import * as React from 'react';

import { Badge } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  EMPLOYEE_PIPELINE_LABELS,
  demoFollowUpNotes,
  formatDisplayDate,
  formatEmployeeDateTime,
  getEmployeeFollowUpRows,
} from '@/lib/employee';

export function EmployeeFollowUpsPage() {
  const [completedIds, setCompletedIds] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);
  const rows = getEmployeeFollowUpRows().filter(
    (row) => !completedIds.includes(row.id),
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <EmployeePageHeader
        title="Today’s Follow-ups"
        description="Assigned follow-up queue with demo call, WhatsApp, email, and note actions. Local complete/reschedule only — no telephony or messaging."
      />

      {message ? (
        <p className="rounded-uv-lg border border-uv-border bg-uv-background-muted/50 px-3 py-2 text-sm text-uv-foreground-muted" role="status">
          {message}
        </p>
      ) : null}

      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        emptyMessage="No open follow-ups on your assigned leads."
        columns={[
          {
            key: 'name',
            header: 'Lead / customer',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{row.name}</p>
                  {row.isToday ? <Badge variant="info">Today</Badge> : null}
                  {row.isOverdue ? <Badge variant="error">Overdue</Badge> : null}
                </div>
                <p className="text-xs text-uv-foreground-muted">{row.company}</p>
              </div>
            ),
          },
          {
            key: 'service',
            header: 'Interested service',
            mobileLabel: 'Service',
            render: (row) => row.interestedService,
          },
          {
            key: 'phone',
            header: 'Phone',
            render: (row) => row.phone,
          },
          {
            key: 'last',
            header: 'Last contact',
            render: (row) =>
              row.lastContact ? formatDisplayDate(row.lastContact) : '—',
          },
          {
            key: 'next',
            header: 'Next follow-up',
            render: (row) => (
              <span>
                {formatDisplayDate(row.nextFollowUpDate)} · {row.nextFollowUpTime}
              </span>
            ),
          },
          {
            key: 'priority',
            header: 'Priority',
            render: (row) => <StatusBadge status={row.priority} />,
          },
          {
            key: 'stage',
            header: 'Stage',
            render: (row) => (
              <StatusBadge
                status={row.stage}
                label={EMPLOYEE_PIPELINE_LABELS[row.stage]}
              />
            ),
          },
          {
            key: 'channels',
            header: 'Channels',
            render: () => (
              <div className="flex flex-wrap gap-1">
                <PlaceholderAction>Call</PlaceholderAction>
                <PlaceholderAction>WhatsApp</PlaceholderAction>
                <PlaceholderAction>Email</PlaceholderAction>
                <PlaceholderAction>Add note</PlaceholderAction>
              </div>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <div className="flex flex-wrap gap-1">
                <LocalDemoButton
                  onClick={() => {
                    setCompletedIds((prev) => [...prev, row.id]);
                    setMessage(`Demo: marked follow-up complete for ${row.name}.`);
                  }}
                >
                  Complete
                </LocalDemoButton>
                <LocalDemoButton
                  variant="secondary"
                  onClick={() =>
                    setMessage(
                      `Demo: reschedule requested for ${row.name} (not saved).`,
                    )
                  }
                >
                  Reschedule
                </LocalDemoButton>
              </div>
            ),
          },
        ]}
      />

      <section aria-label="Follow-up notes" className="space-y-4">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Follow-up notes
        </h2>
        <p className="text-sm text-uv-foreground-muted">
          Call, WhatsApp, email, meeting notes, interest, objections, and next
          actions — with author and timestamp placeholders.
        </p>
        <ul className="space-y-4">
          {demoFollowUpNotes.map((note) => (
            <li
              key={note.id}
              className="rounded-uv-xl border border-uv-border p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{note.leadName}</p>
                <p className="text-xs text-uv-foreground-subtle">
                  {note.author} · {formatEmployeeDateTime(note.authoredAt)}
                </p>
              </div>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-uv-foreground-subtle">Call outcome</dt>
                  <dd className="text-uv-foreground-muted">{note.callOutcome}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-subtle">WhatsApp outcome</dt>
                  <dd className="text-uv-foreground-muted">
                    {note.whatsappOutcome}
                  </dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-subtle">Email outcome</dt>
                  <dd className="text-uv-foreground-muted">{note.emailOutcome}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-subtle">Meeting notes</dt>
                  <dd className="text-uv-foreground-muted">{note.meetingNotes}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-subtle">Customer interest</dt>
                  <dd className="text-uv-foreground-muted">
                    {note.customerInterest}
                  </dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-subtle">Objections</dt>
                  <dd className="text-uv-foreground-muted">{note.objections}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-subtle">Next action</dt>
                  <dd className="text-uv-foreground-muted">{note.nextAction}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-subtle">Next follow-up</dt>
                  <dd className="text-uv-foreground-muted">
                    {formatDisplayDate(note.nextFollowUpDate)}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
