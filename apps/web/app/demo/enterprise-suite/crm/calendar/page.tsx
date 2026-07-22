'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoCalendar } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoCalendar;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Calendar" description="Meetings, demos, and briefings." />
      <DemoCard title="Calendar" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Event','Date','Time','Type','Attendees']} rows={data.map((c) => [c.title,c.date,c.time,<StatusBadge key={c.id} status={c.type} />,c.attendees])} />
      </DemoCard>
    </div>
  );
}
