'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoDeals, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoDeals;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Deals" description="Opportunity list with stage and value." />
      <DemoCard title="Deals" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Deal','Customer','Stage','Value','Close','Owner']} rows={data.map((c) => [c.name,c.customer,<StatusBadge key={c.id} status={c.stage} />,formatInr(c.value),c.closeDate,c.owner])} />
      </DemoCard>
    </div>
  );
}
