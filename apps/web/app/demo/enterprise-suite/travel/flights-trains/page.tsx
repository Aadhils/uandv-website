'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoFlightTrain } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoFlightTrain;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Flight and Train Requests" description="Travel requests with status tracking." />
      <DemoCard title="Flight and Train Requests" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Mode','Route','Date','Pax','Reference','Status']} rows={data.map((c) => [c.id,c.mode,c.route,c.travelDate,String(c.passengers),c.reference,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
