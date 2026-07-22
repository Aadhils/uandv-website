'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoIncome, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoIncome;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Income" description="Income ledger entries." />
      <DemoCard title="Income" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Date','Category','Description','Method','Amount']} rows={data.map((c) => [c.date,c.category,c.description,c.method,formatInr(c.amount)])} />
      </DemoCard>
    </div>
  );
}
