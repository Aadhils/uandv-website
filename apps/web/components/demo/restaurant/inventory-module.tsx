'use client';

import { useState } from 'react';

import { Button, Input } from '@uandv/ui';

import {
  demoSuppliers,
  formatInr,
} from '@/lib/demo/restaurant/mock-data';
import { useRestaurantDemoStore } from '@/lib/demo/restaurant/store-context';

import {
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  DemoTable,
  Field,
  StatusBadge,
} from './ui';

export function InventoryModule() {
  const {
    inventory,
    purchaseOrders,
    adjustStock,
    logWastage,
    addPurchaseOrder,
  } = useRestaurantDemoStore();

  const [adjustId, setAdjustId] = useState(inventory[0]?.id ?? '');
  const [adjustQty, setAdjustQty] = useState(1);
  const [wasteId, setWasteId] = useState(inventory[0]?.id ?? '');
  const [wasteQty, setWasteQty] = useState(1);
  const [poSupplier, setPoSupplier] = useState(demoSuppliers[0].id);
  const [poItems, setPoItems] = useState('Paneer 5kg');
  const [poAmount, setPoAmount] = useState(1800);

  const lowStock = inventory.filter((i) => i.stock <= i.reorderLevel);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Inventory Management"
        description="Ingredients, low-stock alerts, purchase orders, wastage, and adjustments — Product Demo · Mock Data."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <DemoStatCard label="SKUs" value={String(inventory.length)} hint="Ingredient catalog" />
        <DemoStatCard label="Low-stock alerts" value={String(lowStock.length)} hint="At or below reorder" />
        <DemoStatCard
          label="Open POs"
          value={String(purchaseOrders.filter((p) => p.status !== 'received').length)}
          hint="Purchase pipeline"
        />
      </div>

      {lowStock.length ? (
        <DemoCard title="Low-stock alerts">
          <div className="flex flex-wrap gap-2">
            {lowStock.map((i) => (
              <span
                key={i.id}
                className="rounded-uv-full bg-uv-warning-muted px-3 py-1 text-xs font-semibold text-uv-warning"
              >
                {i.name} · {i.stock}
                {i.unit}
              </span>
            ))}
          </div>
        </DemoCard>
      ) : null}

      <DemoCard title="Ingredients & stock">
        <DemoTable
          headers={['Ingredient', 'Stock', 'Reorder', 'Supplier', 'Status']}
          rows={inventory.map((i) => {
            const supplier = demoSuppliers.find((s) => s.id === i.supplierId);
            return [
              i.name,
              `${i.stock} ${i.unit}`,
              `${i.reorderLevel} ${i.unit}`,
              supplier?.name ?? i.supplierId,
              <StatusBadge
                key={i.id}
                status={i.stock <= i.reorderLevel ? 'pending' : 'available'}
              />,
            ];
          })}
        />
      </DemoCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Stock adjustment">
          <Field label="Ingredient">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={adjustId}
              onChange={(e) => setAdjustId(e.target.value)}
            >
              {inventory.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Adjust by (+/−)">
            <Input
              type="number"
              value={adjustQty}
              onChange={(e) => setAdjustQty(Number(e.target.value) || 0)}
            />
          </Field>
          <Button type="button" className="mt-3" onClick={() => adjustStock(adjustId, adjustQty)}>
            Apply adjustment
          </Button>
        </DemoCard>

        <DemoCard title="Wastage tracking">
          <Field label="Ingredient">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={wasteId}
              onChange={(e) => setWasteId(e.target.value)}
            >
              {inventory.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Wastage qty">
            <Input
              type="number"
              min={1}
              value={wasteQty}
              onChange={(e) => setWasteQty(Number(e.target.value) || 1)}
            />
          </Field>
          <Button
            type="button"
            className="mt-3"
            variant="outline"
            onClick={() => logWastage(wasteId, wasteQty)}
          >
            Log wastage
          </Button>
        </DemoCard>
      </div>

      <DemoCard title="Recipe-level consumption (illustrative)">
        <p className="text-sm text-uv-foreground-muted">
          Demo mapping: Chicken Dum Biryani ≈ 0.25kg chicken + 0.15kg rice per plate. Real
          consumption engines would deduct on kitchen mark-ready in a production build.
        </p>
      </DemoCard>

      <DemoCard title="Suppliers">
        <DemoTable
          headers={['Supplier', 'Category', 'Phone']}
          rows={demoSuppliers.map((s) => [s.name, s.category, s.phone])}
        />
      </DemoCard>

      <DemoCard title="Purchase orders">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Field label="Supplier">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={poSupplier}
              onChange={(e) => setPoSupplier(e.target.value)}
            >
              {demoSuppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Items">
            <Input value={poItems} onChange={(e) => setPoItems(e.target.value)} />
          </Field>
          <Field label="Amount">
            <Input
              type="number"
              value={poAmount}
              onChange={(e) => setPoAmount(Number(e.target.value) || 0)}
            />
          </Field>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() =>
            addPurchaseOrder({
              supplierId: poSupplier,
              items: poItems,
              amount: poAmount,
              status: 'ordered',
            })
          }
        >
          Create PO
        </Button>
        <div className="mt-4">
          <DemoTable
            headers={['PO', 'Supplier', 'Items', 'Amount', 'Status']}
            rows={purchaseOrders.map((p) => [
              p.id,
              demoSuppliers.find((s) => s.id === p.supplierId)?.name ?? p.supplierId,
              p.items,
              formatInr(p.amount),
              <StatusBadge key={p.id} status={p.status} />,
            ])}
          />
        </div>
      </DemoCard>
    </div>
  );
}
