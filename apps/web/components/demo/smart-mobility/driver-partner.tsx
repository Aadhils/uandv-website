'use client';

import { Button } from '@uandv/ui';

import { useSmartMobility } from '@/lib/demo/smart-mobility/booking-context';
import {
  driverDocuments,
  driverEarnings,
  formatInr,
  places,
  rideHistory,
} from '@/lib/demo/smart-mobility/mock-data';

import { SmBadge, SmCard, SmStat } from './ui';

export function DriverPartnerView() {
  const booking = useSmartMobility();
  const pickup = places.find((p) => p.id === booking.pickupId);
  const drop = places.find((p) => p.id === booking.dropId);
  const showIncoming =
    booking.incomingRequest ||
    (booking.stage === 'searching' && booking.driverOnline);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
            Driver Partner App
          </h1>
          <p className="mt-2 text-uv-foreground-muted">
            Online status, ride requests, trip controls, earnings, and compliance.
          </p>
        </div>
        <button
          type="button"
          onClick={booking.toggleDriverOnline}
          className={`inline-flex items-center gap-3 rounded-uv-full border px-4 py-2 text-sm font-semibold ${
            booking.driverOnline
              ? 'border-uv-success/40 bg-uv-success-muted text-uv-success'
              : 'border-uv-border bg-uv-background text-uv-foreground-muted'
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              booking.driverOnline ? 'bg-uv-success' : 'bg-uv-foreground-subtle'
            }`}
          />
          {booking.driverOnline ? 'Online' : 'Offline'} · {booking.driverStatus}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SmStat label="Daily earnings" value={formatInr(driverEarnings.today)} hint="Mock today" />
        <SmStat label="Weekly earnings" value={formatInr(driverEarnings.week)} hint="Mock week" />
        <SmStat
          label="Incentives"
          value={formatInr(driverEarnings.incentives)}
          hint="Demo bonuses"
        />
        <SmStat
          label="Ratings"
          value={String(driverEarnings.rating)}
          hint={`Accept ${driverEarnings.acceptance} · Complete ${driverEarnings.completion}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SmCard
          title="Incoming ride request"
          description="Appears when a customer books and this partner is online."
        >
          {showIncoming ? (
            <div className="space-y-4">
              <div className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted p-4">
                <p className="font-semibold text-uv-foreground">
                  New {booking.vehicleName} request
                </p>
                <p className="mt-2 text-sm text-uv-foreground-muted">
                  {pickup?.label} → {drop?.label}
                </p>
                <p className="mt-2 text-sm font-medium text-uv-brand">
                  Est. {formatInr(booking.fareMin)} – {formatInr(booking.fareMax)}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="flex-1" onClick={booking.acceptRide}>
                  Accept ride
                </Button>
                <Button className="flex-1" variant="outline" onClick={booking.rejectRide}>
                  Reject ride
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-uv-foreground-muted">
              No incoming request. Go online and book a trip from Customer Booking to
              trigger a mock offer.
            </p>
          )}
        </SmCard>

        <SmCard title="Trip controls" description="Pickup navigation and trip lifecycle.">
          <div className="space-y-3 text-sm">
            <div className="rounded-uv-xl border border-dashed border-uv-border p-4 text-uv-foreground-muted">
              Pickup navigation placeholder — maps SDK not connected in this demo.
            </div>
            <p>
              Current stage:{' '}
              <SmBadge>{booking.stage.replace('_', ' ')}</SmBadge>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                className="flex-1"
                disabled={booking.stage !== 'assigned'}
                onClick={booking.startTrip}
              >
                Start trip
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                disabled={booking.stage !== 'in_progress'}
                onClick={booking.completeTrip}
              >
                Complete trip
              </Button>
            </div>
          </div>
        </SmCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SmCard title="Wallet" description="Partner settlement wallet (mock).">
          <p className="text-3xl font-bold text-uv-foreground">{formatInr(6420)}</p>
          <p className="mt-2 text-sm text-uv-foreground-muted">
            Next payout window: Friday 18:00 IST (demo schedule)
          </p>
        </SmCard>

        <SmCard title="Vehicle documents status">
          <ul className="space-y-3">
            {driverDocuments.map((doc) => (
              <li
                key={doc.name}
                className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-2 text-sm"
              >
                <span className="text-uv-foreground">{doc.name}</span>
                <SmBadge tone={doc.status === 'verified' ? 'success' : 'warning'}>
                  {doc.status}
                </SmBadge>
              </li>
            ))}
          </ul>
        </SmCard>
      </div>

      <SmCard title="Ride history" description="Recent partner trips from mock history.">
        <ul className="space-y-3">
          {rideHistory
            .filter((ride) => ride.status === 'completed')
            .map((ride) => (
              <li
                key={ride.id}
                className="flex items-center justify-between gap-3 rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-uv-foreground">
                    {ride.from} → {ride.to}
                  </p>
                  <p className="text-uv-foreground-muted">
                    {ride.date} · {ride.vehicle}
                  </p>
                </div>
                <p className="font-semibold text-uv-brand">{formatInr(ride.fare)}</p>
              </li>
            ))}
        </ul>
      </SmCard>
    </div>
  );
}
