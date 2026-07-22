'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoLeave } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoLeave;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Leave Management" description="Leave requests and approvals." />
      <DemoCard title="Leave Management" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Employee','Type','From','To','Days','Status']} rows={data.map((c) => [c.id,c.employee,c.type,c.from,c.to,String(c.days),<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
