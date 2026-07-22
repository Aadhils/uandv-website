'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoHotels, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoHotels;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Hotel Management" description="Hotel list, room rates, and booking status." />
      <DemoCard title="Hotel Management" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Hotel','City','Rooms','Rate','Availability','Status']} rows={data.map((c) => [c.name,c.city,c.rooms,formatInr(c.rate),<StatusBadge key={c.id+'-a'} status={c.availability} />,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
