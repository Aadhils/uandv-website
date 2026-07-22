'use client';

import { useState } from 'react';

import { Button, Input, cn } from '@uandv/ui';

import {
  demoCoupons,
  demoRestaurants,
  demoTickets,
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
  Field,
  StatusBadge,
} from './ui';

export function AdminDashboard() {
  const { orders } = useRestaurantDemoStore();
  const revenue = orders
    .filter((o) => o.paymentStatus === 'paid' || o.status === 'delivered')
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Admin Dashboard"
        description="Multi-outlet platform controls — restaurants, orders, partners, commissions, and analytics."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DemoStatCard label="Restaurants" value={String(demoRestaurants.length)} hint="Demo outlets on platform" />
        <DemoStatCard label="Orders" value={String(orders.length)} hint="Session + seed" />
        <DemoStatCard label="Revenue overview" value={formatInr(revenue)} hint="Mock GMV" />
        <DemoStatCard label="Open tickets" value={String(demoTickets.filter((t) => t.status !== 'resolved').length)} hint="Support queue" />
      </div>
      <DemoCard title="Platform analytics (mock ₹k)">
        <BarChart data={revenueTrend} />
      </DemoCard>
    </div>
  );
}

export function AdminRestaurantsPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Restaurants & outlets" />
      <DemoCard>
        <DemoTable
          headers={['Restaurant', 'Outlet', 'Cuisines', 'Area', 'Rating']}
          rows={demoRestaurants.map((r) => [
            r.name,
            r.outlet,
            r.cuisine.join(', '),
            r.area,
            String(r.rating),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminCustomersPage() {
  const customers = [
    { name: 'Demo Customer', orders: 3, spend: 1200 },
    { name: 'Demo Guest A', orders: 1, spend: 366 },
    { name: 'Table T2 Guest', orders: 1, spend: 657 },
  ];
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Customers" description="Sample demo profiles only." />
      <DemoCard>
        <DemoTable
          headers={['Name', 'Orders', 'Spend']}
          rows={customers.map((c) => [c.name, String(c.orders), formatInr(c.spend)])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminOrdersPage() {
  const { orders } = useRestaurantDemoStore();
  return (
    <div className="space-y-6">
      <DemoPageHeader title="All orders" />
      <DemoCard>
        <DemoTable
          headers={['Reference', 'Restaurant', 'Channel', 'Status', 'Total']}
          rows={orders.map((o) => [
            o.reference,
            o.restaurantName,
            o.channel,
            <StatusBadge key={o.id} status={o.status} />,
            formatInr(o.total),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminPartnersPage() {
  const partners = [
    { name: 'Demo Delivery Partner', zone: 'Marina Demo Zone', status: 'active', rating: 4.8 },
    { name: 'Sample Rider B', zone: 'Central Demo Zone', status: 'off', rating: 4.5 },
  ];
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Delivery partners" />
      <DemoCard>
        <DemoTable
          headers={['Partner', 'Zone', 'Status', 'Rating']}
          rows={partners.map((p) => [
            p.name,
            p.zone,
            <StatusBadge key={p.name} status={p.status} />,
            String(p.rating),
          ])}
        />
      </DemoCard>
      <DemoCard title="Service zones">
        <div className="flex flex-wrap gap-2">
          {['Marina Demo Zone', 'Lakeview Demo Zone', 'Tech Park Demo Zone', 'Central Demo Zone'].map(
            (z) => (
              <span
                key={z}
                className="rounded-uv-full border border-uv-border px-3 py-1 text-xs font-medium"
              >
                {z}
              </span>
            ),
          )}
        </div>
      </DemoCard>
    </div>
  );
}

export function AdminSettingsPage() {
  const [commission, setCommission] = useState(18);
  const [deliveryBase, setDeliveryBase] = useState(40);
  const [tax, setTax] = useState(5);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Platform settings"
        description="Commission, delivery charges, tax, and promo codes — local demo state only."
      />
      <DemoCard title="Commercial settings">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Commission %">
            <Input
              type="number"
              value={commission}
              onChange={(e) => setCommission(Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="Delivery charge (₹)">
            <Input
              type="number"
              value={deliveryBase}
              onChange={(e) => setDeliveryBase(Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="Tax %">
            <Input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value) || 0)} />
          </Field>
        </div>
        <Button type="button" className="mt-4" onClick={() => setSaved(true)}>
          Save settings
        </Button>
        {saved ? (
          <p className="mt-2 text-sm text-uv-success">
            Saved in browser session (Product Demo · Mock Data).
          </p>
        ) : null}
      </DemoCard>
      <DemoCard title="Promo codes">
        <div className="flex flex-wrap gap-2">
          {demoCoupons.map((c) => (
            <span
              key={c.code}
              className={cn(
                'rounded-uv-full bg-uv-brand-muted px-3 py-1 text-xs font-semibold text-uv-brand',
              )}
            >
              {c.code}
            </span>
          ))}
        </div>
      </DemoCard>
    </div>
  );
}

export function AdminSupportPage() {
  const [tickets, setTickets] = useState(demoTickets);
  const [refunds, setRefunds] = useState([
    { id: 'rf-01', order: 'UV-FD-1001', amount: 366, status: 'pending' },
  ]);

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Support & refunds" />
      <DemoCard title="Support tickets">
        <div className="space-y-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-2 rounded-uv-xl border border-uv-border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{t.subject}</p>
                <p className="text-xs text-uv-foreground-muted">{t.customer}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={t.status} />
                {t.status !== 'resolved' ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      setTickets((prev) =>
                        prev.map((row) =>
                          row.id === t.id ? { ...row, status: 'resolved' } : row,
                        ),
                      )
                    }
                  >
                    Resolve
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </DemoCard>
      <DemoCard title="Refunds">
        <div className="space-y-3">
          {refunds.map((r) => (
            <div
              key={r.id}
              className="flex flex-col gap-2 rounded-uv-xl border border-uv-border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">
                  {r.order} · {formatInr(r.amount)}
                </p>
                <StatusBadge status={r.status} />
              </div>
              {r.status === 'pending' ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    setRefunds((prev) =>
                      prev.map((row) =>
                        row.id === r.id ? { ...row, status: 'paid' } : row,
                      ),
                    )
                  }
                >
                  Mark refunded
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </DemoCard>
    </div>
  );
}
