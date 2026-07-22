'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input, cn } from '@uandv/ui';

import { cities, demoFlights, formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field } from './ui';

type TripType = 'oneway' | 'round' | 'multi';

export function FlightBookingModule() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Goa');
  const [depart, setDepart] = useState('2026-08-12');
  const [returnDate, setReturnDate] = useState('2026-08-18');
  const [travelers, setTravelers] = useState(1);
  const [cabin, setCabin] = useState('Economy');
  const [searched, setSearched] = useState(false);
  const [multiLegs, setMultiLegs] = useState([
    { from: 'Delhi', to: 'Dubai', date: '2026-09-01' },
    { from: 'Dubai', to: 'Singapore', date: '2026-09-05' },
  ]);

  const results = useMemo(() => {
    if (!searched) return [];
    return demoFlights.filter((f) => {
      if (tripType === 'multi') return true;
      const fromCode = from.slice(0, 3).toUpperCase();
      const toCode = to.slice(0, 3).toUpperCase();
      // soft match against demo inventory
      return (
        f.from.includes(fromCode[0]) ||
        f.to.includes(toCode[0]) ||
        from.toLowerCase().includes('mumbai') ||
        to.toLowerCase().includes('goa') ||
        true
      );
    });
  }, [searched, tripType, from, to]);

  const book = (flightId: string) => {
    const flight = demoFlights.find((f) => f.id === flightId);
    if (!flight) return;
    startCheckout({
      category: 'flight',
      title: `${flight.from} → ${flight.to} · ${flight.airline} ${flight.flightNo}`,
      subtitle: `${travelers} traveler${travelers > 1 ? 's' : ''} · ${cabin} · ${tripType}`,
      amount: flight.fare * travelers * (tripType === 'round' ? 2 : tripType === 'multi' ? 2 : 1),
      travelDate: tripType === 'multi' ? multiLegs[0].date : depart,
      travelers,
      details: {
        tripType,
        cabin,
        flightNo: flight.flightNo,
        returnDate: tripType === 'round' ? returnDate : 'n/a',
      },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Flight Booking"
        description="One way, round trip, and multi-city search with fare cards. Product Demo — Mock Data."
      />

      <DemoCard title="Search flights">
        <div className="mb-5 grid grid-cols-3 gap-1 rounded-uv-xl bg-uv-background-subtle p-1">
          {(
            [
              ['oneway', 'One Way'],
              ['round', 'Round Trip'],
              ['multi', 'Multi City'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTripType(id)}
              className={cn(
                'rounded-uv-lg px-2 py-2.5 text-sm font-semibold',
                tripType === id ? 'uv-brand-gradient text-white' : 'text-uv-foreground-muted',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tripType !== 'multi' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="From">
              <select
                className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="To">
              <select
                className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Depart">
              <Input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} />
            </Field>
            {tripType === 'round' ? (
              <Field label="Return">
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </Field>
            ) : null}
            <Field label="Travelers">
              <Input
                type="number"
                min={1}
                max={9}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value) || 1)}
              />
            </Field>
            <Field label="Cabin">
              <select
                className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
              </select>
            </Field>
          </div>
        ) : (
          <div className="space-y-4">
            {multiLegs.map((leg, index) => (
              <div key={index} className="grid gap-4 rounded-uv-xl border border-uv-border p-4 sm:grid-cols-3">
                <Field label={`Leg ${index + 1} from`}>
                  <Input
                    value={leg.from}
                    onChange={(e) => {
                      const next = [...multiLegs];
                      next[index] = { ...leg, from: e.target.value };
                      setMultiLegs(next);
                    }}
                  />
                </Field>
                <Field label="To">
                  <Input
                    value={leg.to}
                    onChange={(e) => {
                      const next = [...multiLegs];
                      next[index] = { ...leg, to: e.target.value };
                      setMultiLegs(next);
                    }}
                  />
                </Field>
                <Field label="Date">
                  <Input
                    type="date"
                    value={leg.date}
                    onChange={(e) => {
                      const next = [...multiLegs];
                      next[index] = { ...leg, date: e.target.value };
                      setMultiLegs(next);
                    }}
                  />
                </Field>
              </div>
            ))}
            <Field label="Travelers">
              <Input
                type="number"
                min={1}
                max={9}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value) || 1)}
              />
            </Field>
          </div>
        )}

        <Button type="button" className="mt-5" onClick={() => setSearched(true)}>
          Search mock flights
        </Button>
      </DemoCard>

      {searched ? (
        <DemoCard title="Fare cards" description={`${results.length} demo options · not live inventory`}>
          <div className="space-y-3">
            {results.map((flight) => (
              <article
                key={flight.id}
                className="flex flex-col gap-4 rounded-uv-xl border border-uv-border p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-uv-foreground">
                    {flight.airline} · {flight.flightNo}
                  </p>
                  <p className="mt-1 text-sm text-uv-foreground-muted">
                    {flight.from} {flight.depart} → {flight.to} {flight.arrive} · {flight.duration} ·{' '}
                    {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                  </p>
                  <p className="mt-2 text-xs text-uv-foreground-muted">
                    {flight.cabin} · {flight.refundable ? 'Refundable (demo)' : 'Non-refundable (demo)'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-[family-name:var(--font-uv-display)] text-xl font-bold text-uv-brand">
                    {formatInr(flight.fare)}
                  </p>
                  <Button type="button" size="sm" onClick={() => book(flight.id)}>
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
