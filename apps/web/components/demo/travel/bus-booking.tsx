'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@uandv/ui';

import { demoBuses, formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field } from './ui';

export function BusBookingModule() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Goa');
  const [date, setDate] = useState('2026-08-12');
  const [travelers, setTravelers] = useState(1);
  const [searched, setSearched] = useState(false);

  const book = (busId: string) => {
    const bus = demoBuses.find((b) => b.id === busId);
    if (!bus) return;
    startCheckout({
      category: 'bus',
      title: `${bus.operator} · ${bus.type}`,
      subtitle: `${bus.from} → ${bus.to} · ${travelers} seat(s)`,
      amount: bus.fare * travelers,
      travelDate: date,
      travelers,
      details: { depart: bus.depart, arrive: bus.arrive },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Bus Booking"
        description="Operator cards with seat counts and mock checkout — Product Demo · Mock Data."
      />
      <DemoCard title="Search buses">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="From">
            <Input value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="To">
            <Input value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
          <Field label="Date">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Seats">
            <Input
              type="number"
              min={1}
              max={6}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value) || 1)}
            />
          </Field>
        </div>
        <Button type="button" className="mt-5" onClick={() => setSearched(true)}>
          Search mock buses
        </Button>
      </DemoCard>

      {searched ? (
        <DemoCard title="Bus options">
          <div className="space-y-3">
            {demoBuses.map((bus) => (
              <article
                key={bus.id}
                className="flex flex-col gap-4 rounded-uv-xl border border-uv-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-uv-foreground">{bus.operator}</p>
                  <p className="text-sm text-uv-foreground-muted">
                    {bus.from} {bus.depart} → {bus.to} {bus.arrive} · {bus.duration}
                  </p>
                  <p className="mt-1 text-xs text-uv-foreground-muted">
                    {bus.type} · {bus.seats} seats left (mock)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-uv-brand">{formatInr(bus.fare)}</p>
                  <Button type="button" size="sm" onClick={() => book(bus.id)}>
                    Select
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </DemoCard>
      ) : null}
    </div>
  );
}
