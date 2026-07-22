'use client';

import { useMemo, useState } from 'react';

import { Button, Input, cn } from '@uandv/ui';

import { formatInr } from '@/lib/demo/restaurant/mock-data';
import { useRestaurantDemoStore } from '@/lib/demo/restaurant/store-context';

import {
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  EmptyHint,
  Field,
  StatusBadge,
} from './ui';

export function DeliveryHome() {
  const {
    orders,
    deliveryState,
    setDeliveryOnline,
    acceptDelivery,
    rejectDelivery,
    updateOrderStatus,
    completeDelivery,
  } = useRestaurantDemoStore();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [navStep, setNavStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const available = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.channel === 'delivery' &&
          (o.status === 'ready' || (o.status === 'assigned' && !o.deliveryPartnerId)),
      ),
    [orders],
  );

  const mine = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.deliveryPartnerId === 'delivery-demo' &&
          ['assigned', 'out_for_delivery'].includes(o.status),
      ),
    [orders],
  );

  const active = orders.find((o) => o.id === activeId) ?? mine[0] ?? null;

  const accept = (id: string) => {
    if (!deliveryState.online) {
      setError('Go online to accept delivery requests.');
      return;
    }
    acceptDelivery(id);
    updateOrderStatus(id, 'assigned', { deliveryPartnerId: 'delivery-demo' });
    setActiveId(id);
    setNavStep(0);
    setError(null);
  };

  const startTrip = () => {
    if (!active) return;
    updateOrderStatus(active.id, 'out_for_delivery');
    setNavStep(1);
  };

  const complete = () => {
    if (!active) return;
    const result = completeDelivery(active.id, otp || active.otp || '');
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setOtp('');
    setActiveId(null);
    setNavStep(0);
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Delivery Partner App"
        description="Online toggle, accept/reject, mock navigation, OTP, and earnings — Product Demo · Mock Data."
        actions={
          <button
            type="button"
            onClick={() => setDeliveryOnline(!deliveryState.online)}
            className={cn(
              'rounded-uv-full px-4 py-2 text-sm font-semibold',
              deliveryState.online
                ? 'bg-uv-success-muted text-uv-success'
                : 'bg-uv-error-muted text-uv-error',
            )}
          >
            {deliveryState.online ? 'Online' : 'Offline'}
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DemoStatCard
          label="Daily earnings"
          value={formatInr(deliveryState.earningsToday)}
          hint="Mock payouts this session"
        />
        <DemoStatCard label="Wallet" value={formatInr(deliveryState.wallet)} hint="Partner wallet balance" />
        <DemoStatCard label="Rating" value={String(deliveryState.rating)} hint="Demo score" />
        <DemoStatCard
          label="Incentives"
          value={formatInr(deliveryState.incentives)}
          hint="Peak-hour mock bonus"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="New delivery requests">
          {available.length === 0 ? (
            <EmptyHint>No ready delivery orders right now. Complete kitchen prep first.</EmptyHint>
          ) : (
            <div className="space-y-3">
              {available.map((o) => (
                <article key={o.id} className="rounded-uv-xl border border-uv-border p-4">
                  <p className="font-semibold">{o.reference}</p>
                  <p className="mt-1 text-sm text-uv-foreground-muted">
                    Pickup · {o.restaurantName}
                  </p>
                  <p className="text-sm text-uv-foreground-muted">Drop · {o.address}</p>
                  <p className="mt-2 text-sm font-semibold text-uv-brand">{formatInr(o.total)}</p>
                  <div className="mt-3 flex gap-2">
                    <Button type="button" size="sm" onClick={() => accept(o.id)}>
                      Accept
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => rejectDelivery(o.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </DemoCard>

        <DemoCard title="Active delivery">
          {!active ? (
            <EmptyHint>Accept a request to start mock navigation.</EmptyHint>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={active.status} />
                <span className="text-sm font-medium">{active.reference}</span>
              </div>
              <div className="rounded-uv-xl border border-uv-border bg-uv-background-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-uv-brand">
                  Mock navigation
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Pickup:</span> {active.restaurantName}
                  </p>
                  <p>
                    <span className="font-medium">Customer:</span> {active.address}
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-uv-background-muted">
                    <div
                      className="h-full rounded-full uv-brand-gradient transition-all"
                      style={{ width: `${navStep === 0 ? 35 : navStep === 1 ? 75 : 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-uv-foreground-muted">
                    {navStep === 0
                      ? 'Route to restaurant (demo map)'
                      : navStep === 1
                        ? 'En route to customer'
                        : 'Arrived'}
                  </p>
                </div>
              </div>

              {active.status === 'assigned' ? (
                <Button type="button" onClick={startTrip}>
                  Start delivery
                </Button>
              ) : null}

              {active.status === 'out_for_delivery' ? (
                <div className="space-y-3">
                  <Field label="OTP verification">
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder={active.otp ? `Demo OTP ${active.otp}` : 'Enter OTP'}
                    />
                  </Field>
                  <Button type="button" onClick={complete}>
                    Complete delivery
                  </Button>
                </div>
              ) : null}
              {error ? (
                <p className="rounded-uv-lg bg-uv-error-muted px-3 py-2 text-sm text-uv-error">
                  {error}
                </p>
              ) : null}
            </div>
          )}
        </DemoCard>
      </div>
    </div>
  );
}

export function DeliveryHistoryPage() {
  const { orders } = useRestaurantDemoStore();
  const history = orders.filter(
    (o) => o.channel === 'delivery' && (o.status === 'delivered' || o.deliveryPartnerId),
  );

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Delivery history" />
      <div className="space-y-3">
        {history.map((o) => (
          <article key={o.id} className="rounded-uv-xl border border-uv-border bg-uv-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{o.reference}</p>
                <p className="text-sm text-uv-foreground-muted">
                  {o.restaurantName} → {o.address}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={o.status} />
                <p className="mt-1 text-sm font-semibold text-uv-brand">{formatInr(o.total)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function DeliveryWalletPage() {
  const { deliveryState } = useRestaurantDemoStore();
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Wallet & incentives" description="Mock partner balances only." />
      <div className="grid gap-4 sm:grid-cols-3">
        <DemoStatCard label="Wallet" value={formatInr(deliveryState.wallet)} hint="Settled demo credits" />
        <DemoStatCard
          label="Today’s earnings"
          value={formatInr(deliveryState.earningsToday)}
          hint="Per completed delivery +60"
        />
        <DemoStatCard
          label="Incentives"
          value={formatInr(deliveryState.incentives)}
          hint="Peak bonus placeholder amount"
        />
      </div>
      <DemoCard title="Ratings">
        <p className="text-3xl font-bold text-uv-brand">★ {deliveryState.rating}</p>
        <p className="mt-2 text-sm text-uv-foreground-muted">
          Demo partner rating — not a live marketplace score.
        </p>
      </DemoCard>
    </div>
  );
}
