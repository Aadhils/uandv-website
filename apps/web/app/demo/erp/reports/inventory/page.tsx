'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoProducts, formatInr } from '@/lib/demo/erp/mock-data';

export default function ErpInventoryReportsPage() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Inventory Reports" description="Stock valuation and reorder exceptions." />
      <DemoCard title="Stock valuation">
        <DemoTable
          headers={['SKU', 'Product', 'Stock', 'Unit cost', 'Value', 'Health']}
          rows={demoProducts.map((c) => [
            c.sku,
            c.name,
            String(c.stock),
            formatInr(c.cost),
            formatInr(c.stock * c.cost),
            <StatusBadge key={c.id} status={c.stock < c.reorderLevel ? 'overdue' : 'active'} />,
          ])}
        />
      </DemoCard>
    </div>
  );
}
