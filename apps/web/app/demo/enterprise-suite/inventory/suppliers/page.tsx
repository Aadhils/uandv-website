'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoSuppliers } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoSuppliers;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Suppliers" description="Vendor directory." />
      <DemoCard title="Suppliers" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Supplier','Contact','City','Rating','Open POs']} rows={data.map((c) => [c.name,c.contact,c.city,String(c.rating),String(c.openPos)])} />
      </DemoCard>
    </div>
  );
}
