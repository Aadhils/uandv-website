'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoTravelSuppliers, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoTravelSuppliers;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Supplier Management" description="Hotels, transport, guides, and activities." />
      <DemoCard title="Supplier Management" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Supplier','Type','City','Payment due','Contract note']} rows={data.map((c) => [c.name,c.type,c.city,formatInr(c.paymentDue),c.contractNote])} />
      </DemoCard>
    </div>
  );
}
