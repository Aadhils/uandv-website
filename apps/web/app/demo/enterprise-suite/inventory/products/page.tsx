'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoProducts, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoProducts;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Products" description="Catalog with price and stock." />
      <DemoCard title="Products" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Product','SKU','Category','Price','Stock']} rows={data.map((c) => [c.name,c.sku,c.category,formatInr(c.price),String(c.stock)])} />
      </DemoCard>
    </div>
  );
}
