'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoOutstanding, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoOutstanding;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Outstanding Balances" description="Customer, agent, and supplier dues." />
      <DemoCard title="Outstanding Balances" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Party','Type','Amount','Due','Status']} rows={data.map((c) => [c.party,c.type,formatInr(c.amount),c.dueDate,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
