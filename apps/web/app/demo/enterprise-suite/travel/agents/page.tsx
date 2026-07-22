'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoAgents, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoAgents;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Agent Management" description="Agents, commissions, and performance." />
      <DemoCard title="Agent Management" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Agent','Contact','Bookings','Commission %','Performance','Settlement due']} rows={data.map((c) => [c.name,c.contact,String(c.bookings),c.commissionRate+'%',<StatusBadge key={c.id} status={c.performance} />,formatInr(c.settlementDue)])} />
      </DemoCard>
    </div>
  );
}
