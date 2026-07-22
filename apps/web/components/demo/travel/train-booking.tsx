'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@uandv/ui';

import { demoTrains, formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field } from './ui';

export function TrainBookingModule() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Goa');
  const [date, setDate] = useState('2026-08-12');
  const [travelers, setTravelers] = useState(1);
  const [searched, setSearched] = useState(false);

  const book = (trainId: string, className: string, fare: number) => {
    const train = demoTrains.find((t) => t.id === trainId);
    if (!train) return;
    startCheckout({
      category: 'train',
      title: `${train.name} · ${train.number}`,
      subtitle: `${train.from} → ${train.to} · ${className} · ${travelers} traveler(s)`,
      amount: fare * travelers,
      travelDate: date,
      travelers,
      details: { className, from, to },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Train Booking"
        description="Search demo trains, pick a class, and continue to mock checkout."
      />
      <DemoCard title="Search trains">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="From">
            <Input value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="To">
            <Input value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
          <Field label="Travel date">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Travelers">
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
          Search mock trains
        </Button>
      </DemoCard>

      {searched ? (
        <DemoCard title="Available trains" description="Mock inventory — not live IRCTC data">
          <div className="space-y-4">
            {demoTrains.map((train) => (
              <article key={train.id} className="rounded-uv-xl border border-uv-border p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-uv-foreground">
                      {train.name} · {train.number}
                    </p>
                    <p className="text-sm text-uv-foreground-muted">
                      {train.from} {train.depart} → {train.to} {train.arrive} · {train.duration}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {train.classes.map((cls) => (
                    <div
                      key={cls.name}
                      className="flex items-center justify-between rounded-uv-lg border border-uv-border bg-uv-background-subtle p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{cls.name}</p>
                        <p className="text-xs text-uv-foreground-muted">{cls.seats} seats · mock</p>
                        <p className="mt-1 font-medium text-uv-brand">{formatInr(cls.fare)}</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => book(train.id, cls.name, cls.fare)}
                      >
                        Book
                      </Button>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </DemoCard>
      ) : null}
    </div>
  );
}
