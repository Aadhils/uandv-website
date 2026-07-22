'use client';
import { BarChart, DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import {
  demoAgents, demoBookings, demoPackages, demoPopularDestinations, demoTravelRevenueChart, formatInr,
} from '@/lib/demo/enterprise-suite/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Travel Reports" description="Booking, destination, package, agent, revenue, outstanding, and cancellation reports (mock)." />
      <DemoCard title="Revenue report"><BarChart data={demoTravelRevenueChart} /></DemoCard>
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Destination report"><BarChart data={demoPopularDestinations} unit="" /></DemoCard>
        <DemoCard title="Package performance">
          <DemoTable headers={['Package','Category','Price','Seats']} rows={demoPackages.map((p) => [p.name, p.category, formatInr(p.price), String(p.seats)])} />
        </DemoCard>
      </div>
      <DemoCard title="Booking report">
        <DemoTable headers={['Booking','Customer','Amount','Status','Payment']} rows={demoBookings.map((b) => [b.id, b.customer, formatInr(b.amount), <StatusBadge key={b.id} status={b.bookingStatus} />, <StatusBadge key={b.id+'-p'} status={b.paymentStatus} />])} />
      </DemoCard>
      <DemoCard title="Agent report">
        <DemoTable headers={['Agent','Bookings','Commission %','Settlement due']} rows={demoAgents.map((a) => [a.name, String(a.bookings), a.commissionRate+'%', formatInr(a.settlementDue)])} />
      </DemoCard>
      <DemoCard title="Cancellation / outstanding snapshot">
        <p className="text-sm text-uv-foreground-muted">Cancelled demo booking BK-4390 refund settled. Outstanding agent + supplier dues appear under Accounting → Outstanding / Agent Commissions.</p>
      </DemoCard>
    </div>
  );
}
