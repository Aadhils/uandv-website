'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, Input, buttonVariants, cn } from '@uandv/ui';

import { formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, EmptyHint, Field } from './ui';

export function CheckoutModule() {
  const router = useRouter();
  const { checkout, offerCode, setOfferCode, confirmCheckout, wallet, clearCheckout } =
    useTravelDemoStore();
  const [method, setMethod] = useState<'card' | 'upi' | 'wallet'>('upi');
  const [name, setName] = useState('Demo Traveler');
  const [phone, setPhone] = useState('9000000001');
  const [error, setError] = useState<string | null>(null);

  if (!checkout) {
    return (
      <div className="space-y-6">
        <DemoPageHeader title="Mock Checkout" description="No active booking draft." />
        <EmptyHint>
          Select a flight, hotel, package, or other service first.{' '}
          <Link href="/demo/travel/portal" className="text-uv-brand underline">
            Back to portal
          </Link>
        </EmptyHint>
      </div>
    );
  }

  const pay = () => {
    setError(null);
    if (method === 'wallet' && wallet.balance < checkout.amount) {
      setError('Insufficient mock wallet balance. Top up in Wallet or choose another method.');
      return;
    }
    const booking = confirmCheckout(method);
    if (!booking) {
      setError('Could not confirm booking. Check wallet balance or try again.');
      return;
    }
    // Prefer full navigation so confirmation is reliable after state clear
    window.location.assign(`/demo/travel/confirmation/${booking.id}`);
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Mock Checkout"
        description="Product Demo · Mock Data — no real payments are processed."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <DemoCard title="Traveler details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Phone">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
            <Field label="Promo code">
              <Input
                value={offerCode}
                onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                placeholder="UVFLY10"
              />
            </Field>
          </div>

          <p className="mt-5 mb-2 text-sm font-semibold">Payment method</p>
          <div className="grid grid-cols-3 gap-2">
            {(['upi', 'card', 'wallet'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={cn(
                  'rounded-uv-lg border px-3 py-3 text-sm font-semibold capitalize',
                  method === m
                    ? 'border-uv-brand bg-uv-brand-muted text-uv-brand'
                    : 'border-uv-border text-uv-foreground-muted',
                )}
              >
                {m}
              </button>
            ))}
          </div>
          {method === 'wallet' ? (
            <p className="mt-3 text-sm text-uv-foreground-muted">
              Wallet balance · {formatInr(wallet.balance)}
            </p>
          ) : null}
          {error ? (
            <p className="mt-4 rounded-uv-lg bg-uv-error-muted px-3 py-2 text-sm text-uv-error">
              {error}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button type="button" onClick={pay}>
              Confirm mock payment
            </Button>
            <button
              type="button"
              onClick={() => {
                clearCheckout();
                router.push('/demo/travel/portal');
              }}
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              Cancel
            </button>
          </div>
        </DemoCard>

        <DemoCard title="Order summary">
          <p className="font-semibold text-uv-foreground">{checkout.title}</p>
          <p className="mt-1 text-sm text-uv-foreground-muted">{checkout.subtitle}</p>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-uv-foreground-muted">Travel date</dt>
              <dd>{checkout.travelDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-uv-foreground-muted">Travelers</dt>
              <dd>{checkout.travelers}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-uv-foreground-muted">Category</dt>
              <dd className="capitalize">{checkout.category}</dd>
            </div>
            <div className="flex justify-between border-t border-uv-border pt-3 text-base font-bold">
              <dt>Amount (before promo)</dt>
              <dd className="text-uv-brand">{formatInr(checkout.amount)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-uv-foreground-muted">
            Applicable promo codes adjust the final amount when you confirm.
          </p>
        </DemoCard>
      </div>
    </div>
  );
}
