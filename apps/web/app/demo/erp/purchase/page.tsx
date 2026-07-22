'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoPurchases, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Purchase" description="Purchase orders to suppliers with expected receipts." />
      <DemoCard title="Purchase" description="Interactive mock records for this module.">
        <DemoTable
          headers={['PO', 'Supplier', 'Amount', 'Ordered', 'Expected', 'Status']}
          rows={demoPurchases.map((c) => [c.id, c.supplier, formatInr(c.amount), c.orderDate, c.expectedDate, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
