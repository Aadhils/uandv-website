'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input, cn } from '@uandv/ui';

import { cities, demoHotels, formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field } from './ui';

export function HotelModule() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [city, setCity] = useState('Goa');
  const [checkIn, setCheckIn] = useState('2026-08-12');
  const [checkOut, setCheckOut] = useState('2026-08-14');
  const [guests, setGuests] = useState(2);
  const [minRating, setMinRating] = useState(4);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [amenity, setAmenity] = useState('All');
  const [searched, setSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [roomName, setRoomName] = useState('');

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24),
    ) || 1,
  );

  const results = useMemo(() => {
    if (!searched) return [];
    return demoHotels.filter((h) => {
      const cityOk = h.city.toLowerCase() === city.toLowerCase() || true;
      const ratingOk = h.rating >= minRating;
      const priceOk = h.pricePerNight <= maxPrice;
      const amenityOk =
        amenity === 'All' || h.amenities.some((a) => a.toLowerCase() === amenity.toLowerCase());
      return cityOk && ratingOk && priceOk && amenityOk;
    });
  }, [searched, city, minRating, maxPrice, amenity]);

  const selected = demoHotels.find((h) => h.id === selectedId) ?? null;

  const book = () => {
    if (!selected) return;
    const room = selected.roomTypes.find((r) => r.name === roomName) ?? selected.roomTypes[0];
    startCheckout({
      category: 'hotel',
      title: selected.name,
      subtitle: `${selected.city} · ${nights} night${nights > 1 ? 's' : ''} · ${room.name}`,
      amount: room.price * nights,
      travelDate: checkIn,
      travelers: guests,
      details: {
        room: room.name,
        checkIn,
        checkOut,
        nights: String(nights),
      },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Hotel Module"
        description="Search, filters, room types, ratings, gallery, and amenities — Product Demo · Mock Data."
      />

      <DemoCard title="Search hotels">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="City">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.filter((c) => !['Dubai', 'Singapore', 'Bangkok', 'Bali'].includes(c) || true).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Check-in">
            <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </Field>
          <Field label="Check-out">
            <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </Field>
          <Field label="Guests">
            <Input
              type="number"
              min={1}
              max={8}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value) || 1)}
            />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Min rating">
            <Input
              type="number"
              min={1}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="Max price / night">
            <Input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="Amenity">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
            >
              <option>All</option>
              <option>Pool</option>
              <option>Breakfast</option>
              <option>Wi-Fi</option>
              <option>Spa</option>
              <option>Gym</option>
            </select>
          </Field>
        </div>
        <Button type="button" className="mt-5" onClick={() => setSearched(true)}>
          Search mock hotels
        </Button>
      </DemoCard>

      {searched ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <DemoCard title="Results" description={`${results.length} properties · mock catalog`}>
            <div className="space-y-3">
              {results.map((hotel) => (
                <button
                  key={hotel.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(hotel.id);
                    setRoomName(hotel.roomTypes[0].name);
                  }}
                  className={cn(
                    'w-full rounded-uv-xl border p-4 text-left transition',
                    selectedId === hotel.id
                      ? 'border-uv-brand bg-uv-brand-muted/30'
                      : 'border-uv-border hover:border-uv-brand/40',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-uv-foreground">{hotel.name}</p>
                      <p className="mt-1 text-sm text-uv-foreground-muted">
                        {hotel.city} · ★ {hotel.rating} ({hotel.reviews} reviews) · {hotel.distance}
                      </p>
                    </div>
                    <p className="font-bold text-uv-brand">{formatInr(hotel.pricePerNight)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hotel.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-uv-full bg-uv-background-subtle px-2.5 py-1 text-xs text-uv-foreground-muted"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </DemoCard>

          <DemoCard title="Hotel details" description="Room types, gallery, and book action">
            {selected ? (
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-uv-foreground">{selected.name}</p>
                  <p className="text-sm text-uv-foreground-muted">
                    ★ {selected.rating} · {selected.reviews} reviews
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Gallery (mock labels)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selected.gallery.map((shot) => (
                      <div
                        key={shot}
                        className="flex h-20 items-end rounded-uv-lg bg-gradient-to-br from-uv-brand/20 to-uv-navy/30 p-2 text-xs font-medium text-uv-foreground"
                      >
                        {shot}
                      </div>
                    ))}
                  </div>
                </div>
                <Field label="Room type">
                  <select
                    className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  >
                    {selected.roomTypes.map((r) => (
                      <option key={r.name} value={r.name}>
                        {r.name} · {formatInr(r.price)} / night · sleeps {r.capacity}
                      </option>
                    ))}
                  </select>
                </Field>
                <p className="text-sm text-uv-foreground-muted">
                  Stay · {nights} night{nights > 1 ? 's' : ''} · total estimated at selected room rate
                </p>
                <Button type="button" className="w-full" onClick={book}>
                  Continue to checkout
                </Button>
              </div>
            ) : (
              <p className="text-sm text-uv-foreground-muted">Select a hotel to inspect rooms and gallery.</p>
            )}
          </DemoCard>
        </div>
      ) : null}
    </div>
  );
}
