'use client';

import { useEffect, useMemo, useState } from 'react';

import { Button, cn } from '@uandv/ui';

import { formatInr } from '@/lib/demo/restaurant/mock-data';
import { useRestaurantDemoStore } from '@/lib/demo/restaurant/store-context';

import { DemoCard, DemoPageHeader, DemoStatCard, StatusBadge } from './ui';

function elapsedLabel(iso?: string) {
  if (!iso) return '0:00';
  const secs = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function KitchenDisplay() {
  const { orders, updateOrderStatus, updateItemPrep } = useRestaurantDemoStore();
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const kitchenOrders = useMemo(
    () =>
      orders.filter((o) =>
        ['accepted', 'preparing', 'ready'].includes(o.status),
      ),
    [orders],
  );

  const lanes = {
    new: kitchenOrders.filter((o) => o.status === 'accepted'),
    preparing: kitchenOrders.filter((o) => o.status === 'preparing'),
    ready: kitchenOrders.filter((o) => o.status === 'ready'),
  };

  const delayed = kitchenOrders.filter((o) => {
    const start = o.preparingAt || o.acceptedAt || o.createdAt;
    return Date.now() - new Date(start).getTime() > 12 * 60 * 1000;
  });

  const bumpToPreparing = (id: string) => updateOrderStatus(id, 'preparing');
  const markReady = (id: string) => updateOrderStatus(id, 'ready');

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Kitchen Display System"
        description="New · Preparing · Ready lanes with timers, item status, priority, and notes — Product Demo · Mock Data."
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <DemoStatCard label="New orders" value={String(lanes.new.length)} hint="Accepted, awaiting prep" />
        <DemoStatCard label="Preparing" value={String(lanes.preparing.length)} hint="Active tickets" />
        <DemoStatCard label="Ready" value={String(lanes.ready.length)} hint="Pickup / runner" />
        <DemoStatCard label="Delayed" value={String(delayed.length)} hint="> 12 min mock threshold" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {(
          [
            ['new', 'New orders', lanes.new],
            ['preparing', 'Preparing', lanes.preparing],
            ['ready', 'Ready for pickup', lanes.ready],
          ] as const
        ).map(([key, title, list]) => (
          <DemoCard key={key} title={title}>
            <div className="space-y-3">
              {list.length === 0 ? (
                <p className="text-sm text-uv-foreground-muted">No tickets.</p>
              ) : (
                list.map((o) => {
                  const timer = elapsedLabel(o.preparingAt || o.acceptedAt || o.createdAt);
                  const isDelayed = delayed.some((d) => d.id === o.id);
                  return (
                    <article
                      key={o.id}
                      className={cn(
                        'rounded-uv-xl border p-4',
                        o.priority ? 'border-uv-brand bg-uv-brand-muted/20' : 'border-uv-border',
                        isDelayed ? 'ring-1 ring-uv-warning' : '',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold">{o.reference}</p>
                          <p className="text-xs capitalize text-uv-foreground-muted">
                            {o.channel}
                            {o.tableId ? ` · ${o.tableId}` : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm font-bold">{timer}</p>
                          {o.priority ? (
                            <span className="text-[10px] font-semibold uppercase text-uv-brand">
                              Priority
                            </span>
                          ) : null}
                          {isDelayed ? <StatusBadge status="pending" /> : null}
                        </div>
                      </div>
                      {o.kitchenNotes ? (
                        <p className="mt-2 rounded-uv-lg bg-uv-background-subtle px-2 py-1 text-xs">
                          Note · {o.kitchenNotes}
                        </p>
                      ) : null}
                      <ul className="mt-3 space-y-2">
                        {o.items.map((item) => (
                          <li
                            key={item.key}
                            className="flex items-center justify-between gap-2 text-sm"
                          >
                            <span>
                              {item.qty}× {item.name}
                            </span>
                            <select
                              className="h-8 rounded-uv-lg border border-uv-border bg-uv-background px-2 text-xs"
                              value={item.prepStatus}
                              onChange={(e) =>
                                updateItemPrep(
                                  o.id,
                                  item.key,
                                  e.target.value as 'queued' | 'preparing' | 'ready',
                                )
                              }
                            >
                              <option value="queued">Queued</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                            </select>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {o.status === 'accepted' ? (
                          <Button type="button" size="sm" onClick={() => bumpToPreparing(o.id)}>
                            Start preparing
                          </Button>
                        ) : null}
                        {o.status === 'preparing' ? (
                          <Button type="button" size="sm" onClick={() => markReady(o.id)}>
                            Mark as ready
                          </Button>
                        ) : null}
                        <span className="text-xs text-uv-foreground-muted">{formatInr(o.total)}</span>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </DemoCard>
        ))}
      </div>
    </div>
  );
}
