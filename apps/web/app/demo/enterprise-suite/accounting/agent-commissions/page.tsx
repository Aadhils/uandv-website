'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoAgentCommissions, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoAgentCommissions;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Agent Commission Payments" description="Commission settlements for travel agents." />
      <DemoCard title="Agent Commission Payments" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Agent','Booking','Amount','Period','Status']} rows={data.map((c) => [c.id,c.agent,c.bookingId,formatInr(c.amount),c.period,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
