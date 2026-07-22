'use client';

import { Button } from '@uandv/ui';

import { demoOffers } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader } from './ui';

export function OffersModule() {
  const { offerCode, setOfferCode } = useTravelDemoStore();

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Offers"
        description="Apply a promo code — it will be used on the next mock checkout. Product Demo · Mock Data."
      />
      <DemoCard title="Active promo" description={offerCode ? `Selected · ${offerCode}` : 'No code selected yet'}>
        <p className="text-sm text-uv-foreground-muted">
          Codes: UVFLY10, STAY15, PACK5K, VISA99 — applied only in this browser session.
        </p>
      </DemoCard>
      <div className="grid gap-4 sm:grid-cols-2">
        {demoOffers.map((offer) => (
          <article key={offer.id} className="rounded-uv-2xl border border-uv-border bg-uv-background p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-uv-brand">
                  {offer.category}
                </p>
                <h3 className="mt-2 font-semibold text-uv-foreground">{offer.title}</h3>
                <p className="mt-1 text-sm text-uv-foreground-muted">{offer.description}</p>
              </div>
              <span className="shrink-0 rounded-uv-full bg-uv-brand-muted px-2.5 py-1 text-xs font-semibold text-uv-brand">
                {offer.discountLabel}
              </span>
            </div>
            <p className="mt-4 font-mono text-sm text-uv-foreground">{offer.code}</p>
            <p className="mt-1 text-xs text-uv-foreground-muted">Valid till {offer.validTill}</p>
            <Button
              type="button"
              size="sm"
              className="mt-4"
              variant={offerCode === offer.code ? 'secondary' : 'primary'}
              onClick={() => setOfferCode(offer.code)}
            >
              {offerCode === offer.code ? 'Applied' : 'Apply code'}
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
