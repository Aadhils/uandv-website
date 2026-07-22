'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoProducts, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Products" description="Sellable catalog with cost, price, and stock levels." />
      <DemoCard title="Products" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Product', 'SKU', 'Category', 'Price', 'Cost', 'Stock']}
          rows={demoProducts.map((c) => [c.name, c.sku, c.category, formatInr(c.price), formatInr(c.cost), String(c.stock)])}
        />
      </DemoCard>
    </div>
  );
}
