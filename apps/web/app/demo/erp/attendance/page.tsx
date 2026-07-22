'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoAttendance } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Attendance" description="Daily attendance register for the demo team." />
      <DemoCard title="Attendance" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Employee', 'Date', 'Check-in', 'Check-out', 'Status']}
          rows={demoAttendance.map((c) => [c.employee, c.date, c.checkIn, c.checkOut, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
