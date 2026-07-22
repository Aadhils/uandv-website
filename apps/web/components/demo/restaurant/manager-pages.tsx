'use client';

import { useMemo, useState } from 'react';

import { Button, Input, cn } from '@uandv/ui';

import {
  demoCoupons,
  demoMenu,
  demoRestaurants,
  demoReviews,
  demoStaff,
  demoTables,
  formatInr,
  revenueTrend,
} from '@/lib/demo/restaurant/mock-data';
import { useRestaurantDemoStore } from '@/lib/demo/restaurant/store-context';

import {
  BarChart,
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  DemoTable,
  StatusBadge,
} from './ui';

export function ManagerDashboard() {
  const { orders } = useRestaurantDemoStore();
  const today = orders;
  const revenue = today
    .filter((o) => o.paymentStatus === 'paid' || o.status === 'delivered' || o.status === 'completed')
    .reduce((s, o) => s + o.total, 0);
  const aov = today.length ? Math.round(revenue / today.length) : 0;
  const pending = today.filter((o) =>
    ['placed', 'accepted', 'preparing'].includes(o.status),
  ).length;
  const completed = today.filter((o) =>
    ['delivered', 'completed', 'ready'].includes(o.status),
  ).length;
  const cancelled = today.filter((o) => o.status === 'cancelled').length;
  const activeTables = demoTables.filter((t) => t.status !== 'free').length;

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Restaurant Manager Dashboard"
        description="Today’s mock operations across orders, tables, menu, and outlets."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DemoStatCard label="Today’s orders" value={String(today.length)} hint="All channels" />
        <DemoStatCard label="Revenue overview" value={formatInr(revenue)} hint="Paid / delivered mock totals" />
        <DemoStatCard label="Avg order value" value={formatInr(aov)} hint="Session calculation" />
        <DemoStatCard label="Active tables" value={String(activeTables)} hint="Dine-in floor snapshot" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <DemoStatCard label="Pending" value={String(pending)} hint="Need kitchen/manager action" />
        <DemoStatCard label="Completed / ready" value={String(completed)} hint="Fulfilled lanes" />
        <DemoStatCard label="Cancelled" value={String(cancelled)} hint="Mock cancellations" />
      </div>
      <DemoCard title="Sales trend (mock ₹k)">
        <BarChart data={revenueTrend} />
      </DemoCard>
    </div>
  );
}

export function ManagerOrdersPage() {
  const { orders, updateOrderStatus } = useRestaurantDemoStore();
  const [filter, setFilter] = useState('all');

  const list = useMemo(() => {
    if (filter === 'all') return orders;
    if (filter === 'pending') {
      return orders.filter((o) => ['placed', 'accepted', 'preparing'].includes(o.status));
    }
    if (filter === 'completed') {
      return orders.filter((o) =>
        ['delivered', 'completed', 'ready'].includes(o.status),
      );
    }
    return orders.filter((o) => o.status === 'cancelled');
  }, [orders, filter]);

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Orders" description="Accept, cancel, or advance mock restaurant orders." />
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'completed', 'cancelled'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-uv-full px-3 py-1.5 text-xs font-semibold capitalize',
              filter === f ? 'uv-brand-gradient text-white' : 'border border-uv-border',
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {list.map((o) => (
          <article
            key={o.id}
            className="flex flex-col gap-3 rounded-uv-xl border border-uv-border bg-uv-background p-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p className="font-semibold">
                {o.reference} · {o.channel}
              </p>
              <p className="text-sm text-uv-foreground-muted">
                {o.customerName} · {o.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <StatusBadge status={o.status} />
                <span className="text-sm font-semibold text-uv-brand">{formatInr(o.total)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {o.status === 'placed' ? (
                <Button type="button" size="sm" onClick={() => updateOrderStatus(o.id, 'accepted')}>
                  Accept
                </Button>
              ) : null}
              {o.status === 'accepted' ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => updateOrderStatus(o.id, 'preparing')}
                >
                  Send to kitchen
                </Button>
              ) : null}
              {o.status === 'ready' && o.channel === 'delivery' ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => updateOrderStatus(o.id, 'assigned', { deliveryPartnerId: null })}
                >
                  Ready for rider
                </Button>
              ) : null}
              {!['cancelled', 'delivered', 'completed'].includes(o.status) ? (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => updateOrderStatus(o.id, 'cancelled')}
                >
                  Cancel
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ManagerMenuPage() {
  const { menuAvailability, toggleMenuAvailability } = useRestaurantDemoStore();
  const [priceEdits, setPriceEdits] = useState<Record<string, number>>({});

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Menu management"
        description="Categories, pricing, add-ons, and availability toggles — mock local state."
      />
      <DemoCard>
        <DemoTable
          headers={['Item', 'Category', 'Price', 'Add-ons', 'Available']}
          rows={demoMenu.map((m) => [
            m.name,
            m.category,
            <Input
              key={`${m.id}-price`}
              className="h-9 w-24"
              type="number"
              value={priceEdits[m.id] ?? m.price}
              onChange={(e) =>
                setPriceEdits((prev) => ({ ...prev, [m.id]: Number(e.target.value) || 0 }))
              }
            />,
            String(m.addOns.length),
            <button
              key={`${m.id}-av`}
              type="button"
              onClick={() => toggleMenuAvailability(m.id)}
              className={cn(
                'rounded-uv-full px-3 py-1 text-xs font-semibold',
                menuAvailability[m.id] !== false
                  ? 'bg-uv-success-muted text-uv-success'
                  : 'bg-uv-error-muted text-uv-error',
              )}
            >
              {menuAvailability[m.id] !== false ? 'On' : 'Off'}
            </button>,
          ])}
        />
      </DemoCard>
      <DemoCard title="Outlets">
        <DemoTable
          headers={['Outlet', 'Restaurant', 'Area']}
          rows={demoRestaurants.map((r) => [r.outlet, r.name, r.area])}
        />
      </DemoCard>
    </div>
  );
}

export function ManagerStaffPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Staff management" />
      <DemoCard>
        <DemoTable
          headers={['Name', 'Role', 'Outlet', 'Status']}
          rows={demoStaff.map((s) => [
            s.name,
            s.role,
            s.outlet,
            <StatusBadge key={s.id} status={s.status} />,
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function ManagerOffersPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Offers & coupons" />
      <div className="grid gap-4 sm:grid-cols-2">
        {demoCoupons.map((c) => (
          <DemoCard key={c.code} title={c.title} description={c.description}>
            <p className="font-mono text-sm font-bold text-uv-brand">{c.code}</p>
            <p className="mt-2 text-xs text-uv-foreground-muted">
              Min order {formatInr(c.minOrder)}
            </p>
          </DemoCard>
        ))}
      </div>
    </div>
  );
}

export function ManagerReviewsPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Customer reviews"
        description="All reviews are labeled Product Demo — not real customer feedback."
      />
      <div className="space-y-3">
        {demoReviews.map((r) => (
          <article key={r.id} className="rounded-uv-xl border border-uv-border bg-uv-background p-4">
            <p className="font-medium">
              {r.customer} · ★ {r.rating}{' '}
              <span className="text-xs text-uv-brand">(Product Demo)</span>
            </p>
            <p className="mt-1 text-sm text-uv-foreground-muted">{r.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ManagerReportsPage() {
  const { orders } = useRestaurantDemoStore();
  const byChannel = ['delivery', 'dinein', 'takeaway', 'pos'].map((ch) => ({
    label: ch.slice(0, 3),
    value: Math.max(
      1,
      orders.filter((o) => o.channel === ch).reduce((s, o) => s + o.total, 0) / 100,
    ),
  }));

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Sales reports" description="Mock channel mix from session orders." />
      <DemoCard title="Revenue by channel (scaled)">
        <BarChart data={byChannel} />
      </DemoCard>
      <DemoCard title="Weekly trend">
        <BarChart data={revenueTrend} />
      </DemoCard>
    </div>
  );
}
