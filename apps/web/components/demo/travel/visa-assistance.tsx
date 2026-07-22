'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@uandv/ui';

import { formatInr, visaCountries } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field, StatusBadge } from './ui';

const checklistByCountry: Record<string, string[]> = {
  default: [
    'Passport (6+ months validity)',
    'Passport-size photos',
    'Travel itinerary (mock)',
    'Bank statement (last 3 months)',
    'Cover letter / invitation (if required)',
  ],
};

export function VisaAssistanceModule() {
  const router = useRouter();
  const { startCheckout, bookings } = useTravelDemoStore();
  const [country, setCountry] = useState(visaCountries[0]);
  const [travelDate, setTravelDate] = useState('2026-10-01');
  const [travelers, setTravelers] = useState(1);
  const [status, setStatus] = useState('enquiry');
  const [notes, setNotes] = useState('');

  const checklist = checklistByCountry.default;

  const submit = () => {
    startCheckout({
      category: 'visa',
      title: `Visa assistance · ${country}`,
      subtitle: `${travelers} applicant(s) · service fee (demo)`,
      amount: 2499 * travelers,
      travelDate,
      travelers,
      details: { country, status, notes: notes || 'none' },
    });
    setStatus('submitted');
    router.push('/demo/travel/checkout');
  };

  const visaBookings = bookings.filter((b) => b.category === 'visa');

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Visa Assistance"
        description="Enquiry, document checklist, and application status tracking — Product Demo · Mock Data."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Visa enquiry">
          <div className="space-y-4">
            <Field label="Country">
              <select
                className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {visaCountries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Intended travel date">
              <Input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
            </Field>
            <Field label="Applicants">
              <Input
                type="number"
                min={1}
                max={6}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value) || 1)}
              />
            </Field>
            <Field label="Notes">
              <textarea
                className="min-h-24 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 py-2 text-sm"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Purpose of travel, previous visas…"
              />
            </Field>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-uv-foreground-muted">Status</span>
              <StatusBadge status={status} />
            </div>
            <p className="text-sm text-uv-foreground-muted">
              Estimated service fee · {formatInr(2499 * travelers)} (mock)
            </p>
            <Button type="button" onClick={submit}>
              Submit enquiry &amp; checkout
            </Button>
          </div>
        </DemoCard>

        <DemoCard title="Document checklist" description={`For ${country} (generic demo list)`}>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-uv-lg border border-uv-border p-3 text-sm"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-uv-brand-muted text-xs text-uv-brand">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2">
            <p className="text-sm font-semibold">Your visa bookings (session)</p>
            {visaBookings.length === 0 ? (
              <p className="text-sm text-uv-foreground-muted">No visa bookings yet in this demo session.</p>
            ) : (
              visaBookings.map((b) => (
                <div key={b.id} className="rounded-uv-lg border border-uv-border p-3 text-sm">
                  <p className="font-medium">{b.title}</p>
                  <p className="text-uv-foreground-muted">{b.reference}</p>
                </div>
              ))
            )}
          </div>
        </DemoCard>
      </div>
    </div>
  );
}
