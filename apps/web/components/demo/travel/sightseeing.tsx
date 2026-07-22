'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@uandv/ui';

import { formatInr, sightseeingTours } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field } from './ui';

export function SightseeingModule() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [city, setCity] = useState('All');
  const [date, setDate] = useState('2026-08-13');
  const [travelers, setTravelers] = useState(2);

  const list = useMemo(
    () => (city === 'All' ? sightseeingTours : sightseeingTours.filter((t) => t.city === city)),
    [city],
  );

  const cities = ['All', ...Array.from(new Set(sightseeingTours.map((t) => t.city)))];

  const book = (id: string) => {
    const tour = sightseeingTours.find((t) => t.id === id);
    if (!tour) return;
    startCheckout({
      category: 'sightseeing',
      title: tour.name,
      subtitle: `${tour.city} · ${tour.duration} · ${travelers} guest(s)`,
      amount: tour.price * travelers,
      travelDate: date,
      travelers,
      details: { city: tour.city },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Local Sightseeing"
        description="Curated day tours with ratings and mock booking — Product Demo · Mock Data."
      />
      <DemoCard title="Filters">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="City">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Date">
            <input
              type="date"
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>
          <Field label="Guests">
            <input
              type="number"
              min={1}
              max={10}
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value) || 1)}
            />
          </Field>
        </div>
      </DemoCard>

      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((tour) => (
          <article key={tour.id} className="rounded-uv-2xl border border-uv-border bg-uv-background p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-uv-brand">{tour.city}</p>
            <h3 className="mt-2 font-semibold text-uv-foreground">{tour.name}</h3>
            <p className="mt-1 text-sm text-uv-foreground-muted">
              {tour.duration} · ★ {tour.rating}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-bold text-uv-brand">{formatInr(tour.price)}</p>
              <Button type="button" size="sm" onClick={() => book(tour.id)}>
                Book
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
