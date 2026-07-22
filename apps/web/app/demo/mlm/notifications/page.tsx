'use client';

import { useState } from 'react';

import { Button } from '@uandv/ui';

import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/mlm/ui';
import { demoNotifications } from '@/lib/demo/mlm/mock-data';

export default function MlmNotificationsPage() {
  const [items, setItems] = useState(demoNotifications);

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  };

  const toggleRead = (id: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, read: !item.read } : item)),
    );
  };

  const unread = items.filter((item) => !item.read).length;

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Notifications"
        description="Payout, team, KYC, order, and system alerts for the demo account."
        actions={
          <Button type="button" variant="outline" onClick={markAllRead}>
            Mark all read
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <DemoCard title="Unread">
          <p className="text-2xl font-bold text-uv-foreground">{unread}</p>
        </DemoCard>
        <DemoCard title="Total">
          <p className="text-2xl font-bold text-uv-foreground">{items.length}</p>
        </DemoCard>
      </div>

      <DemoCard title="Inbox">
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className={`rounded-uv-xl border px-4 py-4 ${
                item.read
                  ? 'border-uv-border bg-uv-background'
                  : 'border-uv-brand/30 bg-uv-brand-muted/40'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-uv-foreground">{item.title}</p>
                    <StatusBadge status={item.type} />
                    {!item.read ? <StatusBadge status="pending" /> : null}
                  </div>
                  <p className="mt-2 text-sm text-uv-foreground-muted">{item.body}</p>
                  <p className="mt-2 text-xs text-uv-foreground-muted">{item.date}</p>
                </div>
                <Button type="button" size="sm" variant="outline" onClick={() => toggleRead(item.id)}>
                  {item.read ? 'Mark unread' : 'Mark read'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
