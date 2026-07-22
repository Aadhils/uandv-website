'use client';

import { useMemo, useState } from 'react';

import { Button, Input, cn } from '@uandv/ui';

import {
  demoTables,
  formatInr,
  getMenuForRestaurant,
} from '@/lib/demo/restaurant/mock-data';
import { useRestaurantDemoStore } from '@/lib/demo/restaurant/store-context';
import type { CartLine, PaymentMethod } from '@/lib/demo/restaurant/types';

import { DemoCard, DemoPageHeader, DietPill, Field, StatusBadge } from './ui';

export function DineInModule() {
  const { placePosOrder } = useRestaurantDemoStore();
  const [tableId, setTableId] = useState('T3');
  const [lines, setLines] = useState<CartLine[]>([]);
  const [waiterRequested, setWaiterRequested] = useState(false);
  const [split, setSplit] = useState(1);
  const [payment, setPayment] = useState<PaymentMethod>('upi');
  const [feedback, setFeedback] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [status, setStatus] = useState('browsing');

  const menu = getMenuForRestaurant('rst-01');
  const subtotal = lines.reduce((s, l) => {
    const add = l.addOnLabels.length * 20;
    return s + (l.unitPrice + add) * l.qty;
  }, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  const perGuest = split > 0 ? Math.round(total / split) : total;

  const addItem = (itemId: string) => {
    const item = menu.find((m) => m.id === itemId);
    if (!item) return;
    setLines((prev) => [
      ...prev,
      {
        key: `di-${Date.now()}`,
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
    ]);
    setStatus('ordering');
  };

  const sendToKitchen = () => {
    if (!lines.length) return;
    const order = placePosOrder({
      channel: 'dinein',
      tableId,
      customerName: `Table ${tableId} Guest`,
      paymentMethod: payment,
      discount: 0,
      lines,
    });
    setOrderId(order.id);
    setStatus('sent');
  };

  const payAtTable = () => {
    setStatus('paid');
  };

  const tables = useMemo(() => demoTables, []);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Dine-in & QR Ordering"
        description="Table selection, QR menu, waiter request, split bill, and pay-at-table — Product Demo · Mock Data."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Select table">
          <div className="grid grid-cols-3 gap-2">
            {tables.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTableId(t.id)}
                className={cn(
                  'rounded-uv-xl border p-3 text-left',
                  tableId === t.id
                    ? 'border-uv-brand bg-uv-brand-muted/40'
                    : 'border-uv-border',
                )}
              >
                <p className="font-semibold">{t.id}</p>
                <p className="text-xs text-uv-foreground-muted">{t.seats} seats</p>
                <div className="mt-2">
                  <StatusBadge status={t.status} />
                </div>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-uv-foreground-muted">
            Simulated QR scan for table <span className="font-semibold">{tableId}</span> · Harbor Spice
            Kitchen
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-3"
            onClick={() => setWaiterRequested(true)}
          >
            Request waiter
          </Button>
          {waiterRequested ? (
            <p className="mt-2 text-sm text-uv-success">Waiter request sent (mock).</p>
          ) : null}
        </DemoCard>

        <DemoCard title="QR menu" description="Add items to the table order">
          <div className="max-h-80 space-y-2 overflow-y-auto">
            {menu.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border p-3"
              >
                <div className="flex items-center gap-2">
                  <DietPill diet={item.diet} />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-uv-foreground-muted">{formatInr(item.price)}</p>
                  </div>
                </div>
                <Button type="button" size="sm" variant="outline" onClick={() => addItem(item.id)}>
                  Add
                </Button>
              </div>
            ))}
          </div>
        </DemoCard>
      </div>

      <DemoCard title="Table order" description={`Status · ${status}`}>
        {lines.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">No items yet.</p>
        ) : (
          <div className="space-y-2">
            {lines.map((l) => (
              <div key={l.key} className="flex justify-between text-sm">
                <span>
                  {l.qty}× {l.name}
                </span>
                <span>{formatInr(l.unitPrice * l.qty)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={sendToKitchen} disabled={!lines.length || !!orderId}>
            Send to kitchen
          </Button>
          {orderId ? <StatusBadge status="preparing" /> : null}
        </div>
      </DemoCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Split bill & pay at table">
          <Field label="Split between guests">
            <Input
              type="number"
              min={1}
              max={8}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value) || 1)}
            />
          </Field>
          <p className="mt-3 text-sm">
            Total {formatInr(total)} · per guest {formatInr(perGuest)}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(['upi', 'card', 'cash'] as PaymentMethod[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPayment(m)}
                className={cn(
                  'rounded-uv-lg border px-2 py-2 text-xs font-semibold uppercase',
                  payment === m ? 'border-uv-brand bg-uv-brand-muted text-uv-brand' : '',
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <Button type="button" className="mt-4" onClick={payAtTable} disabled={!lines.length}>
            Pay at table
          </Button>
          {status === 'paid' ? (
            <p className="mt-2 text-sm text-uv-success">Table payment recorded (mock).</p>
          ) : null}
        </DemoCard>

        <DemoCard title="Feedback">
          <textarea
            className="min-h-28 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 py-2 text-sm"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How was the demo dine-in experience?"
          />
          <Button
            type="button"
            className="mt-3"
            variant="outline"
            onClick={() => setFeedback((f) => (f ? `${f} ✓ submitted` : 'Thanks — demo feedback saved locally.'))}
          >
            Submit feedback
          </Button>
        </DemoCard>
      </div>
    </div>
  );
}
