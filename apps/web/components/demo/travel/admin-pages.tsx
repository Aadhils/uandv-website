'use client';

import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import {
  adminCustomers,
  categoryMix,
  demoFlights,
  demoHotels,
  demoPackages,
  formatInr,
  revenueTrend,
} from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import {
  BarChart,
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  DemoTable,
  StatusBadge,
} from './ui';

export function AdminDashboard() {
  const { bookings } = useTravelDemoStore();
  const revenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.amount : 0), 0);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Admin · Revenue Dashboard"
        description="Product Demo · Mock Data — platform KPIs for bookings, packages, hotels, and flights."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DemoStatCard label="Demo revenue" value={formatInr(revenue)} hint="Paid bookings in session + seed" />
        <DemoStatCard label="Bookings" value={String(bookings.length)} hint="All categories" />
        <DemoStatCard label="Customers" value={String(adminCustomers.length)} hint="Sample demo profiles" />
        <DemoStatCard label="Packages live" value={String(demoPackages.length)} hint="Mock catalog size" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Revenue trend (mock ₹L)">
          <BarChart data={revenueTrend} />
        </DemoCard>
        <DemoCard title="Category mix (mock %)">
          <BarChart data={categoryMix} />
        </DemoCard>
      </div>

      <DemoCard
        title="Quick admin links"
        action={
          <Link href="/demo/travel/admin/reports" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>
            Reports
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Customers', '/demo/travel/admin/customers'],
            ['Bookings', '/demo/travel/admin/bookings'],
            ['Packages', '/demo/travel/admin/packages'],
            ['Hotels', '/demo/travel/admin/hotels'],
            ['Flights', '/demo/travel/admin/flights'],
            ['Reports', '/demo/travel/admin/reports'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-uv-xl border border-uv-border p-4 text-sm font-semibold hover:border-uv-brand/40 hover:bg-uv-brand-muted/30"
            >
              {label}
            </Link>
          ))}
        </div>
      </DemoCard>

      <DemoCard title="Inventory snapshot">
        <DemoTable
          headers={['Catalog', 'Count', 'Notes']}
          rows={[
            ['Hotels', String(demoHotels.length), 'Searchable mock properties'],
            ['Flights', String(demoFlights.length), 'Fare cards for demo routes'],
            ['Packages', String(demoPackages.length), 'Domestic → pilgrimage'],
            ['Customers', String(adminCustomers.length), 'No real customer PII'],
          ]}
        />
      </DemoCard>
    </div>
  );
}

export function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Admin · Customers" description="Sample demo profiles only — Product Demo · Mock Data." />
      <DemoCard>
        <DemoTable
          headers={['Name', 'Email', 'Bookings', 'Spend']}
          rows={adminCustomers.map((c) => [
            c.name,
            c.email,
            String(c.bookings),
            formatInr(c.spend),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminBookingsPage() {
  const { bookings } = useTravelDemoStore();
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Admin · Bookings" description="All session + seed bookings." />
      <DemoCard>
        <DemoTable
          headers={['Reference', 'Title', 'Status', 'Payment', 'Amount']}
          rows={bookings.map((b) => [
            b.reference,
            b.title,
            <StatusBadge key={`${b.id}-s`} status={b.status} />,
            <StatusBadge key={`${b.id}-p`} status={b.paymentStatus} />,
            formatInr(b.amount),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminPackagesPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Admin · Packages" />
      <DemoCard>
        <DemoTable
          headers={['Name', 'Category', 'Destination', 'From']}
          rows={demoPackages.map((p) => [
            p.name,
            <span key={p.id} className="capitalize">{p.category}</span>,
            p.destination,
            formatInr(p.priceFrom),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminHotelsPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Admin · Hotels" />
      <DemoCard>
        <DemoTable
          headers={['Hotel', 'City', 'Rating', 'From / night']}
          rows={demoHotels.map((h) => [
            h.name,
            h.city,
            String(h.rating),
            formatInr(h.pricePerNight),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminFlightsPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Admin · Flights" />
      <DemoCard>
        <DemoTable
          headers={['Flight', 'Route', 'Depart', 'Fare']}
          rows={demoFlights.map((f) => [
            `${f.airline} ${f.flightNo}`,
            `${f.from} → ${f.to}`,
            f.depart,
            formatInr(f.fare),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AdminReportsPage() {
  const { bookings } = useTravelDemoStore();
  const byCategory = ['flight', 'hotel', 'package', 'train', 'bus', 'visa', 'other'] as const;
  const counts = byCategory.map((cat) => ({
    label: cat,
    value: bookings.filter((b) => (cat === 'other' ? !['flight', 'hotel', 'package', 'train', 'bus', 'visa'].includes(b.category) : b.category === cat)).length,
  }));

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Admin · Reports"
        description="Booking volume by category from demo session data."
      />
      <DemoCard title="Bookings by category">
        <BarChart data={counts.map((c) => ({ label: c.label.slice(0, 3), value: c.value || 0.5 }))} />
      </DemoCard>
      <DemoCard title="Revenue trend">
        <BarChart data={revenueTrend} />
      </DemoCard>
    </div>
  );
}
