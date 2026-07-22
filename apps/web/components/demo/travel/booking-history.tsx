'use client';

import { useMemo, useState } from 'react';

import { Button, cn } from '@uandv/ui';

import { formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';
import type { BookingCategory, BookingStatus } from '@/lib/demo/travel/types';

import { DemoCard, DemoPageHeader, EmptyHint, StatusBadge } from './ui';

const categories: Array<BookingCategory | 'all'> = [
  'all',
  'flight',
  'hotel',
  'package',
  'train',
  'bus',
  'visa',
  'insurance',
  'car',
  'sightseeing',
];

export function BookingHistoryModule() {
  const { bookings, cancelBooking } = useTravelDemoStore();
  const [category, setCategory] = useState<(typeof categories)[number]>('all');
  const [status, setStatus] = useState<BookingStatus | 'all'>('all');

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const catOk = category === 'all' || b.category === category;
      const statusOk = status === 'all' || b.status === status;
      return catOk && statusOk;
    });
  }, [bookings, category, status]);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Booking History"
        description="Filter mock bookings by category and status. Cancellations update local session state only."
      />

      <DemoCard title="Filters">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-uv-full px-3 py-1.5 text-xs font-semibold capitalize',
                category === c
                  ? 'uv-brand-gradient text-white'
                  : 'border border-uv-border text-uv-foreground-muted',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(['all', 'confirmed', 'pending', 'cancelled', 'completed'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                'rounded-uv-full px-3 py-1.5 text-xs font-semibold capitalize',
                status === s
                  ? 'bg-uv-navy text-white'
                  : 'border border-uv-border text-uv-foreground-muted',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </DemoCard>

      <DemoCard title={`${filtered.length} booking(s)`}>
        {filtered.length === 0 ? (
          <EmptyHint>No bookings match these filters in the demo session.</EmptyHint>
        ) : (
          <div className="space-y-3">
            {filtered.map((b) => (
              <article
                key={b.id}
                className="flex flex-col gap-3 rounded-uv-xl border border-uv-border p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="font-semibold text-uv-foreground">{b.title}</p>
                  <p className="text-sm text-uv-foreground-muted">
                    {b.subtitle} · {b.travelDate} · {b.reference}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge status={b.status} />
                    <StatusBadge status={b.paymentStatus} />
                    <span className="rounded-uv-full bg-uv-background-subtle px-2.5 py-1 text-xs capitalize text-uv-foreground-muted">
                      {b.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-uv-brand">{formatInr(b.amount)}</p>
                  {b.status === 'confirmed' || b.status === 'pending' ? (
                    <Button type="button" size="sm" variant="outline" onClick={() => cancelBooking(b.id)}>
                      Cancel
                    </Button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </DemoCard>
    </div>
  );
}
