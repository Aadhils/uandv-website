'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoCurrency } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoCurrency;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Currency Settings" description="Supported currencies for the demo." />
      <DemoCard title="Currency Settings" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Code','Name','Rate','Base']} rows={data.map((c) => [c.code,c.name,String(c.rate),c.base?'Yes':'No'])} />
      </DemoCard>
    </div>
  );
}
