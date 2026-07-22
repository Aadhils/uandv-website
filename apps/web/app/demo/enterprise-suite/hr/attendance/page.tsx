'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoAttendance } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoAttendance;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Attendance" description="Daily attendance register." />
      <DemoCard title="Attendance" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Employee','Date','In','Out','Status']} rows={data.map((c) => [c.employee,c.date,c.checkIn,c.checkOut,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
