'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoTax } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoTax;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Tax Settings" description="Tax profiles used in quotations and invoices." />
      <DemoCard title="Tax Settings" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Name','Rate','Applies to','Status']} rows={data.map((c) => [c.name,c.rate+'%',c.appliesTo,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
