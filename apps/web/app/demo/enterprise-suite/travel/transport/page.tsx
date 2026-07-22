'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoTransport } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoTransport;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Transport Management" description="Cab, bus, and airport transfer allocations." />
      <DemoCard title="Transport Management" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Type','Route','Vehicle','Driver','Schedule','Status']} rows={data.map((c) => [c.id,c.type,c.route,c.vehicle,c.driver,c.schedule,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
