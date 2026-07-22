'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoProducts } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Stock" description="On-hand quantities with reorder thresholds." />
      <DemoCard title="Stock" description="Interactive mock records for this module.">
        <DemoTable
          headers={['SKU', 'Product', 'On hand', 'Reorder level', 'Status']}
          rows={demoProducts.map((c) => [c.sku, c.name, String(c.stock), String(c.reorderLevel), <StatusBadge key={c.id} status={c.stock < c.reorderLevel ? 'overdue' : 'active'} />])}
        />
      </DemoCard>
    </div>
  );
}
