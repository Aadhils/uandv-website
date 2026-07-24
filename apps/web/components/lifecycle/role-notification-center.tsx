'use client';

import * as React from 'react';
import Link from 'next/link';

import { Badge, Button, NotificationList } from '@uandv/ui';

import type {
  LifecycleNotification,
  LifecycleNotificationCategory,
} from '@/lib/lifecycle';
import { formatLifecycleDateTime } from '@/lib/lifecycle';

const categoryLabels: Record<LifecycleNotificationCategory, string> = {
  project: 'Project',
  payment: 'Payment',
  document: 'Document',
  approval: 'Approval',
  support: 'Support',
  assignment: 'Assignment',
  deadline: 'Deadline',
  health: 'Health',
};

export type RoleNotificationCenterProps = {
  initialItems: LifecycleNotification[];
};

/** Role-scoped notification center — local mark-as-read only. */
export function RoleNotificationCenter({
  initialItems,
}: RoleNotificationCenterProps) {
  const [items, setItems] = React.useState(initialItems);
  const unreadCount = items.filter((item) => item.unread).length;

  const listItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: `${categoryLabels[item.category]} · ${item.description}`,
    time: formatLifecycleDateTime(item.createdAt),
    unread: item.unread,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-uv-foreground-muted">
          {unreadCount} unread · role-filtered · local demo state only
        </p>
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
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Notification categories">
        {(Object.keys(categoryLabels) as LifecycleNotificationCategory[]).map(
          (key) => (
            <Badge key={key} variant="outline">
              {categoryLabels[key]}
            </Badge>
          ),
        )}
      </div>

      <div className="rounded-uv-xl border border-uv-border bg-uv-card p-4 sm:p-6">
        <NotificationList items={listItems} />
      </div>

      <ul className="space-y-2" aria-label="Notification actions">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-2 text-sm"
          >
            <div className="flex flex-wrap gap-3">
              {item.unread ? (
                <button
                  type="button"
                  className="font-medium text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
                  onClick={() =>
                    setItems((current) =>
                      current.map((row) =>
                        row.id === item.id ? { ...row, unread: false } : row,
                      ),
                    )
                  }
                >
                  Mark “{item.title}” as read
                </button>
              ) : (
                <span className="text-uv-foreground-subtle">Read</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-uv-foreground-muted underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
                >
                  Open
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
