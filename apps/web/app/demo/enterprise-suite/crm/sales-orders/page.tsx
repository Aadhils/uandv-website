'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoSalesOrders, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoSalesOrders;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Sales Orders" description="Orders moving through fulfillment." />
      <DemoCard title="Sales Orders" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Order','Customer','Items','Amount','Date','Status']} rows={data.map((c) => [c.id,c.customer,String(c.items),formatInr(c.amount),c.orderDate,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
