'use client';

import { useMemo, useState } from 'react';

import { Button, Input, cn } from '@uandv/ui';

import {
  demoMenu,
  demoTables,
  formatInr,
  getMenuForRestaurant,
} from '@/lib/demo/restaurant/mock-data';
import { useRestaurantDemoStore } from '@/lib/demo/restaurant/store-context';
import type { CartLine, OrderChannel, PaymentMethod } from '@/lib/demo/restaurant/types';

import { DemoCard, DemoPageHeader, DemoStatCard, DietPill, Field, StatusBadge } from './ui';

export function PosModule() {
  const {
    placePosOrder,
    holdPosOrder,
    resumePosHold,
    clearPosHold,
    posHolds,
    orders,
  } = useRestaurantDemoStore();

  const [channel, setChannel] = useState<OrderChannel>('dinein');
  const [tableId, setTableId] = useState('T1');
  const [customerName, setCustomerName] = useState('Walk-in Guest');
  const [query, setQuery] = useState('');
  const [lines, setLines] = useState<CartLine[]>([]);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState<PaymentMethod>('upi');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const menu = useMemo(() => {
    const all = getMenuForRestaurant('rst-01');
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (m) => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q),
    );
  }, [query]);

  const subtotal = lines.reduce((s, l) => {
    const item = demoMenu.find((m) => m.id === l.itemId);
    const addOns =
      item?.addOns
        .filter((a) => l.addOnIds.includes(a.id))
        .reduce((x, a) => x + a.price, 0) ?? 0;
    return s + (l.unitPrice + addOns) * l.qty;
  }, 0);
  const tax = Math.round(Math.max(0, subtotal - discount) * 0.05);
  const deliveryFee = channel === 'delivery' ? 40 : 0;
  const total = Math.max(0, subtotal - discount) + tax + deliveryFee;

  const addItem = (itemId: string) => {
    const item = demoMenu.find((m) => m.id === itemId);
    if (!item) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.itemId === itemId && !l.addOnIds.length);
      if (existing) {
        return prev.map((l) =>
          l.key === existing.key ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [
        ...prev,
        {
          key: `pos-${Date.now()}`,
          itemId: item.id,
          restaurantId: item.restaurantId,
          name: item.name,
          unitPrice: item.price,
          qty: 1,
          diet: item.diet,
          addOnIds: [],
          addOnLabels: [],
          customization: {},
        },
      ];
    });
    setMessage(null);
    setReceipt(null);
  };

  const charge = () => {
    if (!lines.length) {
      setMessage('Add products before charging.');
      return;
    }
    const order = placePosOrder({
      channel,
      tableId: channel === 'dinein' ? tableId : undefined,
      customerName,
      paymentMethod: payment,
      discount,
      lines,
    });
    setReceipt(order.reference);
    setLines([]);
    setDiscount(0);
    setMessage(`Order ${order.reference} created and sent to kitchen lane.`);
  };

  const hold = () => {
    if (!lines.length) return;
    holdPosOrder({
      label: `${channel} · ${customerName}`,
      channel,
      tableId: channel === 'dinein' ? tableId : undefined,
      items: lines,
      discount,
    });
    setLines([]);
    setMessage('Order held. Resume anytime from the hold list.');
  };

  const resume = (id: string) => {
    const holdOrder = resumePosHold(id);
    if (!holdOrder) return;
    setChannel(holdOrder.channel);
    setTableId(holdOrder.tableId ?? 'T1');
    setLines(holdOrder.items);
    setDiscount(holdOrder.discount);
    clearPosHold(id);
    setMessage('Hold resumed into active cart.');
  };

  const todayOrders = orders.filter((o) => o.channel === 'pos' || o.channel === 'takeaway' || o.channel === 'dinein');
  const closing = todayOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="POS Module"
        description="New orders across dine-in, takeaway, and delivery with hold/resume and bill preview."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <DemoStatCard label="Active cart lines" value={String(lines.length)} hint="Current ticket" />
        <DemoStatCard label="Held tickets" value={String(posHolds.length)} hint="Resume when ready" />
        <DemoStatCard label="Daily closing (mock)" value={formatInr(closing)} hint="Session POS/dine/takeaway" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <DemoCard title="Product search">
          <div className="mb-4 flex flex-wrap gap-2">
            {(['dinein', 'takeaway', 'delivery'] as OrderChannel[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChannel(c)}
                className={cn(
                  'rounded-uv-full px-3 py-1.5 text-xs font-semibold capitalize',
                  channel === c ? 'uv-brand-gradient text-white' : 'border border-uv-border',
                )}
              >
                {c === 'dinein' ? 'Dine-in' : c}
              </button>
            ))}
          </div>
          <Input
            placeholder="Search menu…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-4 max-h-96 space-y-2 overflow-y-auto">
            {menu.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => addItem(item.id)}
                className="flex w-full items-center justify-between rounded-uv-lg border border-uv-border p-3 text-left hover:border-uv-brand/40"
              >
                <span className="flex items-center gap-2">
                  <DietPill diet={item.diet} />
                  <span>
                    <span className="block text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-uv-foreground-muted">{item.category}</span>
                  </span>
                </span>
                <span className="text-sm font-semibold text-uv-brand">{formatInr(item.price)}</span>
              </button>
            ))}
          </div>
        </DemoCard>

        <DemoCard title="Ticket / cart">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Customer">
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </Field>
            {channel === 'dinein' ? (
              <Field label="Table">
                <select
                  className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                  value={tableId}
                  onChange={(e) => setTableId(e.target.value)}
                >
                  {demoTables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id} · {t.seats} seats
                    </option>
                  ))}
                </select>
              </Field>
            ) : (
              <Field label="Channel">
                <Input value={channel} readOnly />
              </Field>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {lines.length === 0 ? (
              <p className="text-sm text-uv-foreground-muted">Scan/search products to build a ticket.</p>
            ) : (
              lines.map((l) => (
                <div key={l.key} className="flex items-center justify-between text-sm">
                  <span>
                    {l.qty}× {l.name}
                  </span>
                  <span>{formatInr(l.unitPrice * l.qty)}</span>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Discount (₹)">
              <Input
                type="number"
                min={0}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="Payment">
              <select
                className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                value={payment}
                onChange={(e) => setPayment(e.target.value as PaymentMethod)}
              >
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="wallet">Wallet</option>
              </select>
            </Field>
          </div>

          <div className="mt-4 rounded-uv-xl bg-uv-background-subtle p-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatInr(subtotal)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Discount</span>
              <span>-{formatInr(discount)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Tax</span>
              <span>{formatInr(tax)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Delivery</span>
              <span>{formatInr(deliveryFee)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-uv-border pt-2 text-base font-bold">
              <span>Bill preview</span>
              <span className="text-uv-brand">{formatInr(total)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" onClick={charge}>
              Charge &amp; send
            </Button>
            <Button type="button" variant="outline" onClick={hold}>
              Hold order
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setMessage(
                  receipt
                    ? `Print receipt placeholder for ${receipt} (no printer connected in Product Demo).`
                    : 'Create an order first to preview print receipt placeholder.',
                )
              }
            >
              Print receipt
            </Button>
          </div>
          {message ? <p className="mt-3 text-sm text-uv-foreground-muted">{message}</p> : null}
          {receipt ? (
            <p className="mt-2 text-sm">
              Last bill <span className="font-mono font-semibold">{receipt}</span>{' '}
              <StatusBadge status="paid" />
            </p>
          ) : null}
        </DemoCard>
      </div>

      <DemoCard title="Held orders">
        {posHolds.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">No held tickets.</p>
        ) : (
          <div className="space-y-2">
            {posHolds.map((h) => (
              <div
                key={h.id}
                className="flex flex-col gap-2 rounded-uv-xl border border-uv-border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{h.label}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {h.items.length} items · discount {formatInr(h.discount)}
                  </p>
                </div>
                <Button type="button" size="sm" onClick={() => resume(h.id)}>
                  Resume
                </Button>
              </div>
            ))}
          </div>
        )}
      </DemoCard>
    </div>
  );
}
