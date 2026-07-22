'use client';
import { useState, type FormEvent } from 'react';
import { Button, Input } from '@uandv/ui';
import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoBookings, formatInr } from '@/lib/demo/enterprise-suite/mock-data';

type Booking = (typeof demoBookings)[number];

export default function Page() {
  const [bookings, setBookings] = useState<Booking[]>(demoBookings);
  const [customer, setCustomer] = useState('Harbor Family Demo');
  const [packageName, setPackageName] = useState('Kerala Backwaters Escape');
  const [passengers, setPassengers] = useState('2');
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const pax = Number(passengers) || 1;
    const next: Booking = {
      id: `BK-${4500 + bookings.length}`,
      customer,
      packageId: 'PKG-DOM-01',
      packageName,
      departure: '2026-10-12',
      passengers: pax,
      amount: pax * 42999,
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      voucher: '—',
      cancelStatus: '—',
      refundStatus: '—',
    };
    setBookings((prev) => [next, ...prev]);
    setMessage(`Created ${next.id} for ${next.customer} · ${formatInr(next.amount)}`);
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader title="New Booking" description="Capture customer booking details and passenger count in local demo state." />
      {message ? <p className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted px-4 py-3 text-sm text-uv-brand">{message}</p> : null}
      <DemoCard title="Booking form">
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Customer<Input className="mt-2" value={customer} onChange={(e) => setCustomer(e.target.value)} required /></label>
          <label className="text-sm font-medium">Package<Input className="mt-2" value={packageName} onChange={(e) => setPackageName(e.target.value)} required /></label>
          <label className="text-sm font-medium">Passengers<Input className="mt-2" value={passengers} onChange={(e) => setPassengers(e.target.value)} required /></label>
          <div className="flex items-end"><Button type="submit">Create booking</Button></div>
        </form>
      </DemoCard>
      <DemoCard title="Session bookings">
        <ul className="space-y-2">
          {bookings.slice(0, 6).map((b) => (
            <li key={b.id} className="flex items-center justify-between rounded-uv-lg border border-uv-border px-3 py-3 text-sm">
              <span>{b.id} · {b.customer}</span>
              <StatusBadge status={b.bookingStatus} />
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
