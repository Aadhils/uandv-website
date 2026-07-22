'use client';
import Link from 'next/link';
import { buttonVariants, cn } from '@uandv/ui';
import { BarChart, DemoCard, DemoPageHeader, DemoStatCard, HorizontalBars, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { useSuiteDemoAuth } from '@/lib/demo/enterprise-suite/auth-context';
import {
  demoBookings, demoDashboardStats, demoPipelineChart, demoRecentActivities,
  demoSalesChart, demoTravelEnquiries, formatInr,
} from '@/lib/demo/enterprise-suite/mock-data';

export default function Page() {
  const { session } = useSuiteDemoAuth();
  const role = session?.role === 'travel' ? 'admin' : (session?.role ?? 'admin');
  const stats = demoDashboardStats[role === 'hr' ? 'hr' : role === 'sales' ? 'sales' : 'admin'];
  const upcoming = demoBookings.filter((b) => b.bookingStatus !== 'cancelled').slice(0, 3);
  const pendingEnquiries = demoTravelEnquiries.filter((e) => e.status === 'enquiry' || e.status === 'pending' || e.status === 'quoted');

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Main Dashboard"
        description={`Welcome, ${session?.name}. Product Demo overview with mock charts — not live business statistics.`}
        actions={
          <>
            <Link href="/demo/enterprise-suite/crm/pipeline" className={cn(buttonVariants({ size: 'sm' }))}>Pipeline</Link>
            <Link href="/demo/enterprise-suite/travel" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>Travel</Link>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => <DemoStatCard key={s.id} {...s} />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <DemoCard title="Monthly revenue trend" description="Mock booked revenue in lakhs."><BarChart data={demoSalesChart} /></DemoCard>
        <DemoCard title="Sales pipeline" description="Open stage totals (demo)."><HorizontalBars data={demoPipelineChart} /></DemoCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <DemoCard title="Upcoming departures" description="Travel bookings in the demo set.">
          <ul className="space-y-3">
            {upcoming.map((b) => (
              <li key={b.id} className="rounded-uv-lg border border-uv-border px-3 py-3">
                <p className="font-medium">{b.packageName}</p>
                <p className="text-xs text-uv-foreground-muted">{b.departure} · {b.customer}</p>
              </li>
            ))}
          </ul>
        </DemoCard>
        <DemoCard title="Pending travel enquiries">
          <ul className="space-y-3">
            {pendingEnquiries.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-3">
                <div>
                  <p className="font-medium">{e.customer}</p>
                  <p className="text-xs text-uv-foreground-muted">{e.packageName}</p>
                </div>
                <StatusBadge status={e.status} />
              </li>
            ))}
          </ul>
        </DemoCard>
        <DemoCard title="Recent activities">
          <ul className="space-y-3">
            {demoRecentActivities.map((a) => (
              <li key={a.id} className="rounded-uv-lg border border-uv-border px-3 py-3">
                <p className="text-sm font-medium">{a.text}</p>
                <p className="text-xs text-uv-foreground-muted">{a.time} · {a.type}</p>
              </li>
            ))}
          </ul>
        </DemoCard>
      </div>
      <DemoCard title="Payment status snapshot">
        <p className="text-sm text-uv-foreground-muted">Sample travel + invoice balances in this Product Demo: paid {formatInr(171996)}, partial {formatInr(100000)}, outstanding customer invoices tracked under Accounting.</p>
      </DemoCard>
    </div>
  );
}
