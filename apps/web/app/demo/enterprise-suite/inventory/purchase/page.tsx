'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoPurchases, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoPurchases;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Purchase Orders" description="Supplier purchase orders." />
      <DemoCard title="Purchase Orders" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['PO','Supplier','Amount','Ordered','Expected','Status']} rows={data.map((c) => [c.id,c.supplier,formatInr(c.amount),c.orderDate,c.expectedDate,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
