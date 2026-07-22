'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { buttonVariants, cn } from '@uandv/ui';

import { formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, EmptyHint, StatusBadge } from './ui';

export function ConfirmationModule() {
  const params = useParams<{ id: string }>();
  const { bookings } = useTravelDemoStore();
  const booking = bookings.find((b) => b.id === params.id);

  if (!booking) {
    return (
      <div className="space-y-6">
        <DemoPageHeader title="Booking confirmation" />
        <EmptyHint>
          Booking not found in this demo session.{' '}
          <Link href="/demo/travel/bookings" className="text-uv-brand underline">
            View history
          </Link>
        </EmptyHint>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Booking confirmed"
        description="Product Demo · Mock Data — this confirmation is stored only in your browser."
      />
      <DemoCard>
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-uv-success-muted text-2xl text-uv-success">
            ✓
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-foreground">
            {booking.reference}
          </h2>
          <p className="mt-2 text-uv-foreground-muted">{booking.title}</p>
          <div className="mt-4 flex justify-center gap-2">
            <StatusBadge status={booking.status} />
            <StatusBadge status={booking.paymentStatus} />
          </div>
        </div>
        <dl className="mx-auto mt-8 max-w-lg space-y-3 text-sm">
          <div className="flex justify-between border-b border-uv-border pb-2">
            <dt className="text-uv-foreground-muted">Subtitle</dt>
            <dd>{booking.subtitle}</dd>
          </div>
          <div className="flex justify-between border-b border-uv-border pb-2">
            <dt className="text-uv-foreground-muted">Travel date</dt>
            <dd>{booking.travelDate}</dd>
          </div>
          <div className="flex justify-between border-b border-uv-border pb-2">
            <dt className="text-uv-foreground-muted">Amount paid</dt>
            <dd className="font-semibold text-uv-brand">{formatInr(booking.amount)}</dd>
          </div>
          <div className="flex justify-between border-b border-uv-border pb-2">
            <dt className="text-uv-foreground-muted">Payment</dt>
            <dd className="capitalize">{booking.details.paymentMethod ?? '—'}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link href="/demo/travel/bookings" className={cn(buttonVariants())}>
            Booking history
          </Link>
          <Link
            href="/demo/travel/portal"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Back to portal
          </Link>
        </div>
      </DemoCard>
    </div>
  );
}
