'use client';

import {
  adminCustomers,
  adminDrivers,
  adminRides,
  adminStats,
  analyticsSeries,
  fareRules,
  fleetAssets,
  formatInr,
  platformServices,
  promoCodes,
  serviceZones,
  supportTickets,
} from '@/lib/demo/smart-mobility/mock-data';

import { SmBadge, SmCard, SmStat } from './ui';

export function AdminDashboardView() {
  const maxRides = Math.max(...analyticsSeries.map((d) => d.rides));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
          Admin & Fleet Management
        </h1>
        <p className="mt-2 text-uv-foreground-muted">
          Operations console for rides, partners, fares, promos, zones, and support —
          mock analytics only.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminStats.map((stat) => (
          <SmStat key={stat.label} label={stat.label} value={stat.value} hint={stat.hint} />
        ))}
      </div>

      <SmCard
        title="Multi-service coverage"
        description="Same platform spans bike, auto, cab, rental, parcel, corporate, and fleet lanes."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {platformServices.map((service) => (
            <div
              key={service.title}
              className="rounded-uv-xl border border-uv-border bg-uv-background-subtle p-4"
            >
              <p className="font-semibold text-uv-foreground">{service.title}</p>
              <p className="mt-1 text-sm text-uv-foreground-muted">{service.detail}</p>
            </div>
          ))}
        </div>
      </SmCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SmCard title="Analytics" description="Mock weekly ride volume.">
          <div className="flex h-48 items-end gap-2">
            {analyticsSeries.map((point) => (
              <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-uv-md uv-brand-gradient"
                  style={{ height: `${Math.round((point.rides / maxRides) * 100)}%` }}
                  title={`${point.rides} rides`}
                />
                <span className="text-xs text-uv-foreground-muted">{point.label}</span>
              </div>
            ))}
          </div>
        </SmCard>

        <SmCard title="Ride management">
          <ul className="space-y-3">
            {adminRides.map((ride) => (
              <li
                key={ride.id}
                className="flex items-center justify-between gap-3 rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-uv-foreground">{ride.id}</p>
                  <p className="text-uv-foreground-muted">{ride.service}</p>
                </div>
                <div className="text-right">
                  <SmBadge>{ride.status}</SmBadge>
                  <p className="mt-1 font-semibold text-uv-foreground">
                    {formatInr(ride.fare)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SmCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SmCard title="Driver management">
          <ul className="space-y-3">
            {adminDrivers.map((driver) => (
              <li
                key={driver.id}
                className="flex items-center justify-between gap-3 rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-uv-foreground">{driver.name}</p>
                  <p className="text-uv-foreground-muted">
                    {driver.id} · {driver.vehicle} · ★ {driver.rating}
                  </p>
                </div>
                <SmBadge
                  tone={
                    driver.status === 'online'
                      ? 'success'
                      : driver.status === 'busy'
                        ? 'warning'
                        : 'muted'
                  }
                >
                  {driver.status}
                </SmBadge>
              </li>
            ))}
          </ul>
        </SmCard>

        <SmCard title="Customer management">
          <ul className="space-y-3">
            {adminCustomers.map((customer) => (
              <li
                key={customer.id}
                className="flex items-center justify-between gap-3 rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-uv-foreground">{customer.name}</p>
                  <p className="text-uv-foreground-muted">
                    {customer.id} · {customer.trips} trips
                  </p>
                </div>
                <p className="font-semibold text-uv-brand">
                  {formatInr(customer.wallet)}
                </p>
              </li>
            ))}
          </ul>
        </SmCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <SmCard title="Vehicle category & fare configuration">
          <ul className="space-y-2 text-sm">
            {fareRules.map((rule) => (
              <li
                key={rule.id}
                className="rounded-uv-lg border border-uv-border px-3 py-2"
              >
                <p className="font-medium text-uv-foreground">{rule.name}</p>
                <p className="text-uv-foreground-muted">
                  Base {formatInr(rule.base)} · /km {formatInr(rule.perKm)} · wait{' '}
                  {formatInr(rule.waiting)}
                </p>
              </li>
            ))}
          </ul>
        </SmCard>

        <SmCard title="Promo code management">
          <ul className="space-y-2 text-sm">
            {promoCodes.map((promo) => (
              <li
                key={promo.code}
                className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-2"
              >
                <div>
                  <p className="font-mono font-medium text-uv-foreground">{promo.code}</p>
                  <p className="text-uv-foreground-muted">{promo.type}</p>
                </div>
                <SmBadge
                  tone={
                    promo.status === 'active'
                      ? 'success'
                      : promo.status === 'paused'
                        ? 'danger'
                        : 'warning'
                  }
                >
                  {promo.status}
                </SmBadge>
              </li>
            ))}
          </ul>
        </SmCard>

        <SmCard title="Service zone management">
          <ul className="space-y-2 text-sm">
            {serviceZones.map((zone) => (
              <li
                key={zone.name}
                className="rounded-uv-lg border border-uv-border px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-uv-foreground">{zone.name}</p>
                  <SmBadge tone={zone.status === 'live' ? 'success' : 'warning'}>
                    {zone.status}
                  </SmBadge>
                </div>
                <p className="mt-1 text-uv-foreground-muted">{zone.vehicles}</p>
              </li>
            ))}
          </ul>
        </SmCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SmCard title="Fleet management">
          <ul className="space-y-3">
            {fleetAssets.map((fleet) => (
              <li
                key={fleet.id}
                className="rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
              >
                <p className="font-medium text-uv-foreground">{fleet.name}</p>
                <p className="mt-1 text-uv-foreground-muted">
                  {fleet.id} · {fleet.vehicles} vehicles · utilization {fleet.utilization}
                </p>
              </li>
            ))}
          </ul>
        </SmCard>

        <SmCard title="Support tickets">
          <ul className="space-y-3">
            {supportTickets.map((ticket) => (
              <li
                key={ticket.id}
                className="rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-uv-foreground">{ticket.subject}</p>
                  <SmBadge
                    tone={
                      ticket.priority === 'high'
                        ? 'danger'
                        : ticket.priority === 'medium'
                          ? 'warning'
                          : 'muted'
                    }
                  >
                    {ticket.priority}
                  </SmBadge>
                </div>
                <p className="mt-1 text-uv-foreground-muted">
                  {ticket.id} · {ticket.status}
                </p>
              </li>
            ))}
          </ul>
        </SmCard>
      </div>
    </div>
  );
}
