'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input, cn } from '@uandv/ui';

import { carRentals, cities, formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field } from './ui';

export function CarRentalModule() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [city, setCity] = useState('Goa');
  const [pickup, setPickup] = useState('2026-08-12');
  const [drop, setDrop] = useState('2026-08-15');
  const [carId, setCarId] = useState(carRentals[0].id);
  const [chauffeur, setChauffeur] = useState(false);

  const days = Math.max(
    1,
    Math.ceil((new Date(drop).getTime() - new Date(pickup).getTime()) / (1000 * 60 * 60 * 24)) || 1,
  );
  const car = carRentals.find((c) => c.id === carId)!;
  const total = car.pricePerDay * days + (chauffeur ? 1500 * days : 0);

  const book = () => {
    startCheckout({
      category: 'car',
      title: `${car.name} · ${city}`,
      subtitle: `${days} day(s)${chauffeur ? ' · chauffeur' : ' · self-drive'}`,
      amount: total,
      travelDate: pickup,
      travelers: 1,
      details: { drop, chauffeur: String(chauffeur) },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Car Rental"
        description="Pick-up city, dates, vehicle class, and optional chauffeur — Product Demo · Mock Data."
      />
      <DemoCard title="Rental search">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="City">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.slice(0, 8).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Pick-up">
            <Input type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </Field>
          <Field label="Drop-off">
            <Input type="date" value={drop} onChange={(e) => setDrop(e.target.value)} />
          </Field>
          <Field label="Chauffeur">
            <button
              type="button"
              onClick={() => setChauffeur((v) => !v)}
              className={cn(
                'h-11 w-full rounded-uv-lg border text-sm font-medium',
                chauffeur
                  ? 'border-uv-brand bg-uv-brand-muted text-uv-brand'
                  : 'border-uv-border text-uv-foreground-muted',
              )}
            >
              {chauffeur ? 'Chauffeur on (+₹1,500/day)' : 'Self-drive'}
            </button>
          </Field>
        </div>
      </DemoCard>

      <div className="grid gap-4 lg:grid-cols-3">
        {carRentals.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCarId(item.id)}
            className={cn(
              'rounded-uv-2xl border p-5 text-left',
              carId === item.id ? 'border-uv-brand bg-uv-brand-muted/30' : 'border-uv-border',
            )}
          >
            <p className="font-semibold">{item.name}</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">{item.seats} seats</p>
            <ul className="mt-3 space-y-1 text-xs text-uv-foreground-muted">
              {item.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-uv-brand">{formatInr(item.pricePerDay)}/day</p>
          </button>
        ))}
      </div>

      <DemoCard title="Summary">
        <p className="text-sm text-uv-foreground-muted">
          {days} day(s) · estimated total {formatInr(total)}
        </p>
        <Button type="button" className="mt-4" onClick={book}>
          Continue to checkout
        </Button>
      </DemoCard>
    </div>
  );
}
