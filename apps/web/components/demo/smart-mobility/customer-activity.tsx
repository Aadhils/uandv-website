'use client';

import { Button } from '@uandv/ui';

import { useSmartMobility } from '@/lib/demo/smart-mobility/booking-context';
import {
  formatInr,
  paymentMethods,
  places,
  rideHistory,
} from '@/lib/demo/smart-mobility/mock-data';

import { SmBadge, SmCard, TrackingPanel } from './ui';

export function CustomerActivityView() {
  const booking = useSmartMobility();
  const pickup = places.find((p) => p.id === booking.pickupId);
  const drop = places.find((p) => p.id === booking.dropId);
  const payment = paymentMethods.find((p) => p.id === booking.paymentMethodId);

  const progress =
    booking.stage === 'searching'
      ? 25
      : booking.stage === 'assigned'
        ? 48
        : booking.stage === 'in_progress'
          ? 74
          : booking.stage === 'completed'
            ? 100
            : 10;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
          Ride activity
        </h1>
        <p className="mt-2 text-uv-foreground-muted">
          Active ride status, wallet, history, and ratings for the customer experience.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SmCard
          title="Active ride status"
          description="Synced with the booking flow on the Customer Booking tab."
          action={<SmBadge tone="brand">{booking.stage.replace('_', ' ')}</SmBadge>}
        >
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-uv-foreground-muted">From</dt>
              <dd className="font-medium text-uv-foreground">{pickup?.label}</dd>
            </div>
            <div>
              <dt className="text-uv-foreground-muted">To</dt>
              <dd className="font-medium text-uv-foreground">{drop?.label}</dd>
            </div>
            <div>
              <dt className="text-uv-foreground-muted">Vehicle</dt>
              <dd className="font-medium text-uv-foreground">{booking.vehicleName}</dd>
            </div>
            <div>
              <dt className="text-uv-foreground-muted">Fare range</dt>
              <dd className="font-medium text-uv-foreground">
                {formatInr(booking.fareMin)} – {formatInr(booking.fareMax)}
              </dd>
            </div>
            <div>
              <dt className="text-uv-foreground-muted">Payment</dt>
              <dd className="font-medium text-uv-foreground">{payment?.label}</dd>
            </div>
            <div>
              <dt className="text-uv-foreground-muted">OTP</dt>
              <dd className="font-mono text-lg font-bold text-uv-brand">{booking.otp}</dd>
            </div>
          </dl>

          {booking.driver ? (
            <div className="mt-5 rounded-uv-xl border border-uv-border p-4">
              <p className="font-semibold text-uv-foreground">{booking.driver.name}</p>
              <p className="mt-1 text-sm text-uv-foreground-muted">
                {booking.driver.vehicle} · {booking.driver.plate}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  Call {booking.driver.phoneMasked}
                </Button>
                <Button size="sm" variant="outline">
                  Open chat
                </Button>
                <Button size="sm" variant="destructive">
                  Emergency SOS
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-uv-foreground-muted">
              No driver assigned yet. Book a ride from Customer Booking to continue the
              flow.
            </p>
          )}

          {booking.stage === 'completed' ? (
            <div className="mt-5">
              <p className="text-sm font-medium text-uv-foreground">Rate this trip</p>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => booking.setTripRating(star)}
                    className={`h-10 w-10 rounded-uv-lg border text-sm font-semibold ${
                      booking.tripRating >= star
                        ? 'border-uv-brand bg-uv-brand-muted text-uv-brand'
                        : 'border-uv-border text-uv-foreground-muted'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </SmCard>

        <TrackingPanel
          stageLabel={
            booking.stage === 'searching'
              ? 'Matching nearby partners…'
              : booking.stage === 'assigned'
                ? 'Partner en route to pickup'
                : booking.stage === 'in_progress'
                  ? 'On trip to destination'
                  : booking.stage === 'completed'
                    ? 'Arrived · trip closed'
                    : 'No active live trip'
          }
          progress={progress}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SmCard title="Wallet" description="Demo wallet balance and payment preference.">
          <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
            ₹1,240
          </p>
          <p className="mt-2 text-sm text-uv-foreground-muted">
            Preferred method: {payment?.label} · {payment?.detail}
          </p>
          <Button className="mt-4" variant="outline" size="sm">
            Add money (demo)
          </Button>
        </SmCard>

        <SmCard title="Ride history" description="Recent completed and cancelled trips.">
          <ul className="space-y-3">
            {rideHistory.map((ride) => (
              <li
                key={ride.id}
                className="flex items-start justify-between gap-3 rounded-uv-xl border border-uv-border px-3 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-uv-foreground">
                    {ride.from} → {ride.to}
                  </p>
                  <p className="mt-1 text-uv-foreground-muted">
                    {ride.date} · {ride.vehicle}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-uv-foreground">{formatInr(ride.fare)}</p>
                  <div className="mt-1">
                    <SmBadge tone={ride.status === 'completed' ? 'success' : 'danger'}>
                      {ride.status}
                    </SmBadge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SmCard>
      </div>
    </div>
  );
}
