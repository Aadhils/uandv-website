'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoSupplierPayments, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoSupplierPayments;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Supplier Payments" description="Hotel, transport, and activity settlements." />
      <DemoCard title="Supplier Payments" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Supplier','Amount','Due','Status']} rows={data.map((c) => [c.id,c.supplier,formatInr(c.amount),c.dueDate,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
