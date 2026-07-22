'use client';

import { Icon, Button, Input, cn } from '@uandv/ui';

import { useSmartMobility } from '@/lib/demo/smart-mobility/booking-context';
import {
  formatInr,
  offers,
  paymentMethods,
  places,
  platformServices,
  vehicleOptions,
} from '@/lib/demo/smart-mobility/mock-data';
import type { VehicleCategoryId } from '@/lib/demo/smart-mobility/types';

import { SmBadge, SmCard, TrackingPanel } from './ui';

export function CustomerBookingView() {
  const booking = useSmartMobility();
  const pickup = places.find((p) => p.id === booking.pickupId);
  const drop = places.find((p) => p.id === booking.dropId);
  const recent = places.filter((p) => p.kind === 'recent');
  const saved = places.filter((p) => p.kind === 'saved');
  const activeRide =
    booking.stage === 'searching' ||
    booking.stage === 'assigned' ||
    booking.stage === 'in_progress' ||
    booking.stage === 'completed';

  const progress =
    booking.stage === 'searching'
      ? 20
      : booking.stage === 'assigned'
        ? 45
        : booking.stage === 'in_progress'
          ? 72
          : booking.stage === 'completed'
            ? 100
            : 8;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
            Book any ride. One platform.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-uv-foreground-muted sm:text-lg">
            Bike taxi, auto, cab, rental, and parcel delivery in a unified booking
            experience — interactive demo with mock data.
          </p>
        </div>
        <SmCard className="bg-uv-background-subtle">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
            Multi-service support
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {platformServices.map((service) => (
              <SmBadge key={service.title}>{service.title}</SmBadge>
            ))}
          </div>
        </SmCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SmCard title="Trip details" description="Pickup, drop, and schedule controls.">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-uv-foreground">
                Pickup location
                <select
                  className="mt-2 w-full rounded-uv-lg border border-uv-input-border bg-uv-input px-3 py-2.5 text-sm"
                  value={booking.pickupId}
                  onChange={(event) => booking.setPickup(event.target.value)}
                  disabled={activeRide && booking.stage !== 'completed'}
                >
                  {places.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.label} — {place.address}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-uv-foreground">
                Drop location
                <select
                  className="mt-2 w-full rounded-uv-lg border border-uv-input-border bg-uv-input px-3 py-2.5 text-sm"
                  value={booking.dropId}
                  onChange={(event) => booking.setDrop(event.target.value)}
                  disabled={activeRide && booking.stage !== 'completed'}
                >
                  {places
                    .filter((place) => place.id !== booking.pickupId)
                    .map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.label} — {place.address}
                      </option>
                    ))}
                </select>
              </label>
              <div className="rounded-uv-xl border border-dashed border-uv-border bg-uv-background-subtle p-3 text-sm text-uv-foreground-muted">
                <span className="font-medium text-uv-foreground">Current location:</span>{' '}
                Guindy Industrial Estate, Chennai (placeholder)
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-uv-foreground">
                  <input
                    type="checkbox"
                    checked={booking.scheduled}
                    onChange={(event) => booking.setScheduled(event.target.checked)}
                    disabled={activeRide && booking.stage !== 'completed'}
                  />
                  Schedule ride
                </label>
                {booking.scheduled ? (
                  <Input
                    type="datetime-local"
                    value={booking.scheduleAt}
                    onChange={(event) => booking.setScheduleAt(event.target.value)}
                    className="sm:max-w-xs"
                  />
                ) : null}
              </div>
            </div>
          </SmCard>

          <SmCard title="Vehicle selection" description="Choose a service category.">
            <div className="grid gap-3 sm:grid-cols-2">
              {vehicleOptions.map((vehicle) => {
                const active = booking.vehicleId === vehicle.id;
                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => booking.setVehicle(vehicle.id as VehicleCategoryId)}
                    disabled={activeRide && booking.stage !== 'completed'}
                    className={cn(
                      'rounded-uv-xl border p-4 text-left transition-colors',
                      active
                        ? 'border-uv-brand bg-uv-brand-muted'
                        : 'border-uv-border bg-uv-background hover:border-uv-brand/40',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-background text-uv-brand">
                        <Icon name={vehicle.icon} />
                      </div>
                      <SmBadge>{vehicle.serviceTag}</SmBadge>
                    </div>
                    <p className="mt-3 font-semibold text-uv-foreground">{vehicle.name}</p>
                    <p className="mt-1 text-sm text-uv-foreground-muted">
                      {vehicle.subtitle} · {vehicle.capacity}
                    </p>
                    <p className="mt-3 text-sm font-medium text-uv-brand">
                      ETA {vehicle.etaMins} min · from {formatInr(vehicle.baseFare)}
                    </p>
                  </button>
                );
              })}
            </div>
          </SmCard>

          <div className="grid gap-4 sm:grid-cols-2">
            <SmCard title="Recent locations">
              <ul className="space-y-2">
                {recent.map((place) => (
                  <li key={place.id}>
                    <button
                      type="button"
                      className="w-full rounded-uv-lg border border-uv-border px-3 py-2 text-left text-sm hover:border-uv-brand/40"
                      onClick={() => booking.setDrop(place.id)}
                    >
                      <span className="font-medium text-uv-foreground">{place.label}</span>
                      <span className="mt-0.5 block text-xs text-uv-foreground-muted">
                        {place.address}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </SmCard>
            <SmCard title="Saved locations">
              <ul className="space-y-2">
                {saved.map((place) => (
                  <li key={place.id}>
                    <button
                      type="button"
                      className="w-full rounded-uv-lg border border-uv-border px-3 py-2 text-left text-sm hover:border-uv-brand/40"
                      onClick={() => booking.setDrop(place.id)}
                    >
                      <span className="font-medium text-uv-foreground">{place.label}</span>
                      <span className="mt-0.5 block text-xs text-uv-foreground-muted">
                        {place.address}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </SmCard>
          </div>
        </div>

        <div className="space-y-6">
          <SmCard title="Fare estimate" description="Mock pricing for the selected category.">
            <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
              {formatInr(booking.fareMin)} – {formatInr(booking.fareMax)}
            </p>
            <p className="mt-2 text-sm text-uv-foreground-muted">
              ~{booking.distanceKm} km · ETA{' '}
              {vehicleOptions.find((v) => v.id === booking.vehicleId)?.etaMins ?? '—'} min ·{' '}
              {booking.vehicleName}
            </p>
            <p className="mt-1 text-sm text-uv-foreground-muted">
              {pickup?.label} → {drop?.label}
            </p>

            <label className="mt-5 block text-sm font-medium text-uv-foreground">
              Payment method
              <select
                className="mt-2 w-full rounded-uv-lg border border-uv-input-border bg-uv-input px-3 py-2.5 text-sm"
                value={booking.paymentMethodId}
                onChange={(event) => booking.setPaymentMethodId(event.target.value)}
              >
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.label} — {method.detail}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-5 flex flex-col gap-2">
              {booking.stage === 'ready' || booking.stage === 'idle' || booking.stage === 'completed' ? (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={booking.confirmBooking}
                  disabled={!booking.pickupId || !booking.dropId}
                >
                  {booking.scheduled ? 'Schedule booking' : 'Book now'}
                </Button>
              ) : null}
              {booking.stage === 'assigned' ? (
                <Button size="lg" className="w-full" onClick={booking.startTrip}>
                  Start trip (demo)
                </Button>
              ) : null}
              {booking.stage === 'in_progress' ? (
                <Button size="lg" className="w-full" onClick={booking.completeTrip}>
                  Complete trip
                </Button>
              ) : null}
              {booking.stage !== 'ready' && booking.stage !== 'idle' ? (
                <Button size="lg" variant="outline" className="w-full" onClick={booking.resetBooking}>
                  Reset booking
                </Button>
              ) : null}
            </div>
          </SmCard>

          <TrackingPanel
            stageLabel={
              booking.stage === 'searching'
                ? 'Searching for driver…'
                : booking.stage === 'assigned'
                  ? 'Driver assigned'
                  : booking.stage === 'in_progress'
                    ? 'Trip in progress'
                    : booking.stage === 'completed'
                      ? 'Trip completed'
                      : 'Ready to book'
            }
            progress={progress}
          />

          {booking.driver ? (
            <SmCard title="Driver & vehicle" description="Assigned partner for this demo trip.">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-uv-brand-muted font-semibold text-uv-brand">
                  {booking.driver.photoInitials}
                </div>
                <div>
                  <p className="font-semibold text-uv-foreground">{booking.driver.name}</p>
                  <p className="text-sm text-uv-foreground-muted">
                    ★ {booking.driver.rating} · {booking.driver.trips} trips
                  </p>
                </div>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-uv-foreground-muted">Vehicle</dt>
                  <dd className="font-medium text-uv-foreground">{booking.driver.vehicle}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-muted">Plate</dt>
                  <dd className="font-medium text-uv-foreground">{booking.driver.plate}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-muted">OTP</dt>
                  <dd className="font-mono text-lg font-bold text-uv-brand">{booking.otp}</dd>
                </div>
                <div>
                  <dt className="text-uv-foreground-muted">ETA</dt>
                  <dd className="font-medium text-uv-foreground">
                    {booking.driver.etaMins} min
                  </dd>
                </div>
              </dl>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <Button variant="outline" size="sm">
                  Call driver
                </Button>
                <Button variant="outline" size="sm">
                  Chat
                </Button>
                <Button variant="destructive" size="sm">
                  SOS
                </Button>
              </div>
            </SmCard>
          ) : null}

          <SmCard title="Offers" description="Promo codes for this demo account.">
            <ul className="space-y-3">
              {offers.map((offer) => (
                <li
                  key={offer.id}
                  className="rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
                >
                  <p className="font-medium text-uv-foreground">{offer.title}</p>
                  <p className="mt-1 text-uv-foreground-muted">{offer.detail}</p>
                  <p className="mt-2 font-mono text-xs text-uv-brand">{offer.code}</p>
                </li>
              ))}
            </ul>
          </SmCard>
        </div>
      </div>
    </div>
  );
}
