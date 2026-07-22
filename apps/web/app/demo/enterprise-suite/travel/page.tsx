'use client';
import Link from 'next/link';
import { buttonVariants, cn } from '@uandv/ui';
import { BarChart, DemoCard, DemoPageHeader, DemoStatCard, HorizontalBars, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import {
  demoAgentPerformance, demoBookings, demoDashboardStats, demoPopularDestinations,
  demoTravelEnquiries, demoTravelRevenueChart, formatInr,
} from '@/lib/demo/enterprise-suite/mock-data';

export default function Page() {
  const stats = demoDashboardStats.travel;
  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Travel Dashboard"
        description="Product Demo travel operations overview with mock enquiries, bookings, and revenue."
        actions={
          <>
            <Link href="/demo/enterprise-suite/travel/bookings/new" className={cn(buttonVariants({ size: 'sm' }))}>New booking</Link>
            <Link href="/demo/enterprise-suite/travel/packages" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>Packages</Link>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => <DemoStatCard key={s.id} {...s} />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <DemoCard title="Revenue overview" description="Mock travel revenue in lakhs."><BarChart data={demoTravelRevenueChart} /></DemoCard>
        <DemoCard title="Popular destinations"><HorizontalBars data={demoPopularDestinations} /></DemoCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Agent performance" description="Bookings closed in demo data.">
          <HorizontalBars data={demoAgentPerformance} />
        </DemoCard>
        <DemoCard title="Booking queue">
          <ul className="space-y-3">
            {demoBookings.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-3">
                <div>
                  <p className="font-medium">{b.id} · {b.packageName}</p>
                  <p className="text-xs text-uv-foreground-muted">{b.customer} · {formatInr(b.amount)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={b.bookingStatus} />
                  <StatusBadge status={b.paymentStatus} />
                </div>
              </li>
            ))}
          </ul>
        </DemoCard>
      </div>
      <DemoCard title="Enquiry pipeline">
        <ul className="space-y-3">
          {demoTravelEnquiries.map((e) => (
            <li key={e.id} className="flex items-center justify-between rounded-uv-lg border border-uv-border px-3 py-3">
              <div>
                <p className="font-medium">{e.customer}</p>
                <p className="text-xs text-uv-foreground-muted">{e.packageName} · budget {formatInr(e.budget)}</p>
              </div>
              <StatusBadge status={e.status} />
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
