'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoCalendar } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Calendar" description="Meetings, demos, and internal events for the week." />
      <DemoCard title="Calendar" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Event', 'Date', 'Time', 'Type', 'Attendees']}
          rows={demoCalendar.map((c) => [c.title, c.date, c.time, <StatusBadge key={c.id} status={c.type} />, c.attendees])}
        />
      </DemoCard>
    </div>
  );
}
