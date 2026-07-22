'use client';

import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { useTravelDemoStore } from '@/lib/demo/travel/store-context';
import { demoOffers, formatInr } from '@/lib/demo/travel/mock-data';

import { DemoCard, DemoPageHeader, DemoStatCard, StatusBadge } from './ui';

const quickLinks = [
  { href: '/demo/travel/flights', label: 'Flights', icon: 'Plane' as const, hint: 'One way · round trip · multi city' },
  { href: '/demo/travel/hotels', label: 'Hotels', icon: 'Hotel' as const, hint: 'Search · rooms · amenities' },
  { href: '/demo/travel/packages', label: 'Packages', icon: 'Package' as const, hint: 'Domestic to pilgrimage' },
  { href: '/demo/travel/trains', label: 'Trains', icon: 'Truck' as const, hint: 'Class fares · seats' },
  { href: '/demo/travel/buses', label: 'Buses', icon: 'Car' as const, hint: 'Operators · sleeper' },
  { href: '/demo/travel/visa', label: 'Visa', icon: 'FileText' as const, hint: 'Checklist · status' },
  { href: '/demo/travel/insurance', label: 'Insurance', icon: 'HeartPulse' as const, hint: 'Trip cover plans' },
  { href: '/demo/travel/car-rental', label: 'Car rental', icon: 'Car' as const, hint: 'Self-drive & chauffeur' },
  { href: '/demo/travel/sightseeing', label: 'Sightseeing', icon: 'MapPin' as const, hint: 'Local experiences' },
];

export function PortalHome() {
  const { bookings, wallet } = useTravelDemoStore();
  const upcoming = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').slice(0, 4);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Customer Portal"
        description="Book flights, stays, packages, and add-ons in one Product Demo workspace. All figures are mock data."
        actions={
          <Link href="/demo/travel/offers" className={cn(buttonVariants({ size: 'sm' }))}>
            View offers
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DemoStatCard label="Wallet balance" value={formatInr(wallet.balance)} hint="Mock wallet · local only" />
        <DemoStatCard
          label="Active bookings"
          value={String(bookings.filter((b) => b.status === 'confirmed').length)}
          hint="Confirmed mock reservations"
        />
        <DemoStatCard
          label="Pending"
          value={String(bookings.filter((b) => b.status === 'pending').length)}
          hint="Awaiting payment / follow-up"
        />
        <DemoStatCard label="Live offers" value={String(demoOffers.length)} hint="Demo promo codes" />
      </div>

      <DemoCard title="Book a service" description="Jump into any booking lane — search forms update frontend state only.">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-uv-xl border border-uv-border bg-uv-background-subtle p-4 transition hover:border-uv-brand/40 hover:bg-uv-brand-muted/40"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-background text-uv-brand">
                  <Icon name={item.icon} size="sm" />
                </span>
                <div>
                  <p className="font-semibold text-uv-foreground group-hover:text-uv-brand">{item.label}</p>
                  <p className="text-xs text-uv-foreground-muted">{item.hint}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </DemoCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard
          title="Upcoming bookings"
          description="From mock history + any bookings you create in this session."
          action={
            <Link href="/demo/travel/bookings" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>
              History
            </Link>
          }
        >
          <div className="space-y-3">
            {upcoming.map((b) => (
              <div
                key={b.id}
                className="flex flex-col gap-2 rounded-uv-xl border border-uv-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-uv-foreground">{b.title}</p>
                  <p className="text-sm text-uv-foreground-muted">
                    {b.subtitle} · {b.travelDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={b.status} />
                  <span className="text-sm font-semibold">{formatInr(b.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </DemoCard>

        <DemoCard title="Featured offers" description="Promo codes apply at mock checkout.">
          <div className="space-y-3">
            {demoOffers.slice(0, 3).map((offer) => (
              <div key={offer.id} className="rounded-uv-xl border border-uv-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-uv-foreground">{offer.title}</p>
                    <p className="mt-1 text-sm text-uv-foreground-muted">{offer.description}</p>
                  </div>
                  <span className="shrink-0 rounded-uv-full bg-uv-brand-muted px-2.5 py-1 text-xs font-semibold text-uv-brand">
                    {offer.discountLabel}
                  </span>
                </div>
                <p className="mt-3 font-mono text-xs text-uv-foreground-muted">Code · {offer.code}</p>
              </div>
            ))}
          </div>
        </DemoCard>
      </div>
    </div>
  );
}
