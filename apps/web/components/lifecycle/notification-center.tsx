'use client';

import * as React from 'react';

import { Badge, Button, NotificationList } from '@uandv/ui';

import {
  formatDisplayDate,
  type CustomerNotification,
  type NotificationCategory,
} from '@/lib/customer';

const categoryLabels: Record<NotificationCategory, string> = {
  project: 'Project',
  payment: 'Payment',
  document: 'Document',
  support: 'Support',
  legal: 'Legal',
};

export type NotificationCenterProps = {
  initialItems: CustomerNotification[];
};

/** Notification Center with local mark-as-read demo behaviour. */
export function NotificationCenter({ initialItems }: NotificationCenterProps) {
  const [items, setItems] = React.useState(initialItems);

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
  };

  const markOneRead = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  };

  const listItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: `${categoryLabels[item.category]} · ${item.description}`,
    time: formatDisplayDate(item.createdAt),
    unread: item.unread,
  }));

  const unreadCount = items.filter((item) => item.unread).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-uv-foreground-muted">
          {unreadCount} unread · mark-as-read is local demo state only
        </p>
        <Button type="button" variant="outline" size="sm" onClick={markAllRead}>
          Mark all as read
        </Button>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Notification categories">
        {(Object.keys(categoryLabels) as NotificationCategory[]).map((key) => (
          <Badge key={key} variant="outline">
            {categoryLabels[key]}
          </Badge>
        ))}
      </div>

      <div className="rounded-uv-xl border border-uv-border bg-uv-card p-4 sm:p-6">
        <NotificationList items={listItems} />
      </div>

      <ul className="space-y-2" aria-label="Mark individual notifications">
        {items
          .filter((item) => item.unread)
          .map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="rounded-uv-md text-sm font-medium text-uv-brand underline-offset-4 hover:underline uv-focus-ring"
                onClick={() => markOneRead(item.id)}
              >
                Mark “{item.title}” as read
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
