'use client';

import * as React from 'react';

import { Badge, Button, NotificationList } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  demoAdminNotifications,
  formatDisplayDate,
  type AdminNotification,
  type AdminNotificationKind,
} from '@/lib/admin';

const kindLabels: Record<AdminNotificationKind, string> = {
  signup: 'New Signup',
  payment_due: 'Payment Due',
  project_delay: 'Project Delay',
  renewal_due: 'Renewal Due',
};

export function AdminNotificationsPage() {
  const [items, setItems] =
    React.useState<AdminNotification[]>(demoAdminNotifications);

  const listItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: `${kindLabels[item.kind]} · ${item.description}`,
    time: formatDisplayDate(item.createdAt),
    unread: item.unread,
  }));

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <AdminPageHeader
        title="Admin Notifications"
        description="New signup, payment due, project delay, and renewal due alerts. Local demo state only."
        actions={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setItems((current) =>
                current.map((item) => ({ ...item, unread: false })),
              )
            }
          >
            Mark all as read
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2" aria-label="Notification kinds">
        {(Object.keys(kindLabels) as AdminNotificationKind[]).map((kind) => (
          <Badge key={kind} variant="outline">
            {kindLabels[kind]}
          </Badge>
        ))}
      </div>

      <div className="rounded-uv-xl border border-uv-border bg-uv-card p-4 sm:p-6">
        <NotificationList items={listItems} />
      </div>
    </div>
  );
}
