'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoProducts } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoProducts;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Stock" description="On-hand quantities and reorder alerts." />
      <DemoCard title="Stock" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['SKU','Product','On hand','Reorder','Health']} rows={data.map((c) => [c.sku,c.name,String(c.stock),String(c.reorderLevel),<StatusBadge key={c.id} status={c.stock < c.reorderLevel ? 'low' : 'available'} />])} />
      </DemoCard>
    </div>
  );
}
