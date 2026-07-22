'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoTravelPayments, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoTravelPayments;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Travel Booking Payments" description="Payments linked to travel bookings." />
      <DemoCard title="Travel Booking Payments" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Booking','Customer','Amount','Status','Date']} rows={data.map((c) => [c.id,c.bookingId,c.customer,formatInr(c.amount),<StatusBadge key={c.id} status={c.status} />,c.date])} />
      </DemoCard>
    </div>
  );
}
