'use client';

import { BarChart, DemoCard, DemoPageHeader, DemoTable } from '@/components/demo/erp/ui';
import { demoSalesChart, demoSalesOrders, formatInr } from '@/lib/demo/erp/mock-data';

export default function ErpSalesReportsPage() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Sales Reports" description="Revenue trend and order mix for leadership reviews." />
      <DemoCard title="Revenue by month"><BarChart data={demoSalesChart} /></DemoCard>
      <DemoCard title="Order snapshot">
        <DemoTable
          headers={['Order', 'Customer', 'Amount', 'Status']}
          rows={demoSalesOrders.map((c) => [c.id, c.customer, formatInr(c.amount), c.status])}
        />
      </DemoCard>
    </div>
  );
}
