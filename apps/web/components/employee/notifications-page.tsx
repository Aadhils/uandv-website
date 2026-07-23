'use client';

import * as React from 'react';

import { Badge } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoEmployeeNotifications,
  formatEmployeeDateTime,
  type EmployeeNotification,
  type EmployeeNotificationKind,
} from '@/lib/employee';

const kindLabels: Record<EmployeeNotificationKind, string> = {
  new_assignment: 'New assignment',
  follow_up_due: 'Follow-up due',
  follow_up_overdue: 'Follow-up overdue',
  meeting_reminder: 'Meeting reminder',
  admin_comment: 'Admin comment',
  lead_reassigned: 'Lead reassigned',
};

export function EmployeeNotificationsPage() {
  const [items, setItems] = React.useState<EmployeeNotification[]>(
    demoEmployeeNotifications,
  );

  const unread = items.filter((item) => !item.read).length;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <EmployeePageHeader
        title="Notifications"
        description="Assignments, follow-up reminders, meetings, and admin comments. Mark as read uses local state only."
        actions={
          <LocalDemoButton
            onClick={() =>
              setItems((prev) => prev.map((item) => ({ ...item, read: true })))
            }
          >
            Mark all read
          </LocalDemoButton>
        }
      />

      <p className="text-sm text-uv-foreground-muted">
        {unread} unread · demo notifications
      </p>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-uv-xl border border-uv-border p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge
                    status={item.kind}
                    label={kindLabels[item.kind]}
                  />
                  {!item.read ? <Badge variant="info">Unread</Badge> : null}
                </div>
                <p className="mt-2 font-semibold text-uv-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-uv-foreground-muted">
                  {item.detail}
                </p>
                <p className="mt-1 text-xs text-uv-foreground-subtle">
                  {formatEmployeeDateTime(item.occurredAt)}
                </p>
              </div>
              {!item.read ? (
                <LocalDemoButton
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((row) =>
                        row.id === item.id ? { ...row, read: true } : row,
                      ),
                    )
                  }
                >
                  Mark read
                </LocalDemoButton>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
