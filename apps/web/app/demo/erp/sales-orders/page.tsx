'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoSalesOrders, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Sales Orders" description="Confirmed orders moving through fulfillment." />
      <DemoCard title="Sales Orders" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Order', 'Customer', 'Items', 'Amount', 'Date', 'Status']}
          rows={demoSalesOrders.map((c) => [c.id, c.customer, String(c.items), formatInr(c.amount), c.orderDate, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
