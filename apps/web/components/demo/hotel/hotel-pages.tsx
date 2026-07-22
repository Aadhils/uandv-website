'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button, Input, buttonVariants, cn } from '@uandv/ui';

import {
  formatInr,
  getRoomType,
  hotelName,
  revenueTrend,
  roomTypes,
} from '@/lib/demo/hotel/mock-data';
import { useHotelDemoStore } from '@/lib/demo/hotel/store-context';
import type { RoomStatus } from '@/lib/demo/hotel/types';

import {
  BarChart,
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  DemoTable,
  EmptyHint,
  Field,
  StatusBadge,
} from './ui';

export function HotelDashboard() {
  const { data } = useHotelDemoStore();
  const occupied = data.rooms.filter((r) => r.status === 'occupied').length;
  const available = data.rooms.filter((r) =>
    ['available', 'ready'].includes(r.status),
  ).length;
  const arrivals = data.reservations.filter(
    (r) => r.status === 'confirmed' && r.checkIn <= '2026-07-23',
  ).length;
  const inHouse = data.reservations.filter((r) => r.status === 'checked_in');
  const revenue = data.reservations
    .filter((r) => r.paymentStatus === 'paid' || r.paymentStatus === 'partial')
    .reduce((s, r) => s + r.paid, 0);
  const occupancy = Math.round((occupied / Math.max(data.rooms.length, 1)) * 100);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Hotel dashboard"
        description={`${hotelName} operations overview — Product Demo — Mock Data.`}
        actions={
          <Link
            href="/demo/hotel-management/reservations/new"
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            New reservation
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DemoStatCard label="Occupancy" value={`${occupancy}%`} hint={`${occupied} occupied rooms`} />
        <DemoStatCard label="Available / ready" value={String(available)} hint="Sellable inventory" />
        <DemoStatCard label="Arrivals soon" value={String(arrivals)} hint="Confirmed upcoming" />
        <DemoStatCard label="Revenue collected" value={formatInr(revenue)} hint="Paid amounts in session" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="In-house guests">
          {inHouse.length === 0 ? (
            <EmptyHint>No checked-in stays.</EmptyHint>
          ) : (
            <div className="space-y-3">
              {inHouse.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-uv-xl border border-uv-border p-3"
                >
                  <div>
                    <p className="font-medium">{r.guestName}</p>
                    <p className="text-xs text-uv-foreground-muted">
                      {r.reference} · Room{' '}
                      {data.rooms.find((rm) => rm.id === r.roomId)?.number ?? '—'}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </DemoCard>
        <DemoCard title="Revenue summary (mock ₹k)">
          <BarChart data={revenueTrend} />
        </DemoCard>
      </div>
    </div>
  );
}

export function RoomsPage() {
  const { data, setRoomStatus } = useHotelDemoStore();
  const [filter, setFilter] = useState('all');

  const list = useMemo(() => {
    if (filter === 'all') return data.rooms;
    return data.rooms.filter((r) => r.status === filter);
  }, [data.rooms, filter]);

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Room inventory" description="Status board for sellable and blocked rooms." />
      <div className="flex flex-wrap gap-2">
        {['all', 'available', 'occupied', 'dirty', 'cleaning', 'ready', 'maintenance'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-uv-full px-3 py-1.5 text-xs font-semibold capitalize',
              filter === f ? 'uv-brand-gradient text-white' : 'border border-uv-border',
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((room) => {
          const type = getRoomType(room.typeId);
          return (
            <article key={room.id} className="rounded-uv-xl border border-uv-border bg-uv-background p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-lg font-bold text-uv-foreground">Room {room.number}</p>
                  <p className="text-sm text-uv-foreground-muted">
                    Floor {room.floor} · {type?.name}
                  </p>
                </div>
                <StatusBadge status={room.status} />
              </div>
              <select
                className="mt-4 h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                value={room.status}
                onChange={(e) => setRoomStatus(room.id, e.target.value as RoomStatus)}
              >
                {[
                  'available',
                  'occupied',
                  'dirty',
                  'cleaning',
                  'ready',
                  'maintenance',
                  'out_of_order',
                ].map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function RoomTypesPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Room types" description="Mock rate cards and capacity." />
      <div className="grid gap-4 lg:grid-cols-2">
        {roomTypes.map((t) => (
          <DemoCard key={t.id} title={t.name} description={t.description}>
            <p className="text-2xl font-bold text-uv-brand">{formatInr(t.baseRate)}/night</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">Sleeps {t.capacity}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-uv-full bg-uv-background-subtle px-2.5 py-1 text-xs text-uv-foreground-muted"
                >
                  {a}
                </span>
              ))}
            </div>
          </DemoCard>
        ))}
      </div>
    </div>
  );
}

export function AvailabilityPage() {
  const { data } = useHotelDemoStore();
  const days = ['22', '23', '24', '25', '26', '27', '28'];

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Room availability calendar"
        description="July 2026 mock grid — blocked when a reservation overlaps."
      />
      <DemoCard>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-uv-background-subtle text-uv-foreground-muted">
              <tr>
                <th className="px-3 py-3">Room</th>
                {days.map((d) => (
                  <th key={d} className="px-3 py-3">
                    Jul {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rooms.map((room) => (
                <tr key={room.id} className="border-t border-uv-border">
                  <td className="px-3 py-3 font-medium">{room.number}</td>
                  {days.map((d) => {
                    const date = `2026-07-${d}`;
                    const blocked = data.reservations.some(
                      (r) =>
                        r.roomId === room.id &&
                        r.status !== 'cancelled' &&
                        r.checkIn <= date &&
                        r.checkOut > date,
                    );
                    const sellable = ['available', 'ready'].includes(room.status) && !blocked;
                    return (
                      <td key={d} className="px-3 py-3">
                        <span
                          className={cn(
                            'inline-flex rounded-uv-md px-2 py-1 text-xs font-semibold',
                            sellable
                              ? 'bg-uv-success-muted text-uv-success'
                              : 'bg-uv-error-muted text-uv-error',
                          )}
                        >
                          {sellable ? 'Open' : 'Busy'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoCard>
    </div>
  );
}

export function GuestsPage() {
  const { data } = useHotelDemoStore();
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Guest profiles" description="Demo guest records only — not real customers." />
      <DemoCard>
        <DemoTable
          headers={['Name', 'Email', 'Phone', 'ID proof', 'Notes']}
          rows={data.guests.map((g) => [g.name, g.email, g.phone, g.idProof, g.notes])}
        />
      </DemoCard>
    </div>
  );
}

export function ReservationsPage() {
  const { data, cancelReservation } = useHotelDemoStore();
  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Booking history"
        description="All mock reservations in this browser session."
        actions={
          <Link
            href="/demo/hotel-management/reservations/new"
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            New reservation
          </Link>
        }
      />
      <div className="space-y-3">
        {data.reservations.map((r) => (
          <article
            key={r.id}
            className="flex flex-col gap-3 rounded-uv-xl border border-uv-border bg-uv-background p-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p className="font-semibold">
                {r.reference} · {r.guestName}
              </p>
              <p className="text-sm text-uv-foreground-muted">
                {getRoomType(r.roomTypeId)?.name} · {r.checkIn} → {r.checkOut} ·{' '}
                {r.nights}N
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <StatusBadge status={r.status} />
                <StatusBadge status={r.paymentStatus} />
                <span className="text-sm font-semibold text-uv-brand">{formatInr(r.total)}</span>
              </div>
            </div>
            {r.status === 'confirmed' ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => cancelReservation(r.id)}
              >
                Cancel
              </Button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export function NewReservationPage() {
  const { data, createReservation } = useHotelDemoStore();
  const [guestId, setGuestId] = useState(data.guests[0]?.id ?? '');
  const [roomTypeId, setRoomTypeId] = useState(roomTypes[0].id);
  const [checkIn, setCheckIn] = useState('2026-07-26');
  const [checkOut, setCheckOut] = useState('2026-07-28');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState('');
  const [created, setCreated] = useState<string | null>(null);

  const guest = data.guests.find((g) => g.id === guestId);
  const type = getRoomType(roomTypeId);

  const submit = () => {
    if (!guest || !type) return;
    const reservation = createReservation({
      guestId: guest.id,
      guestName: guest.name,
      roomTypeId,
      checkIn,
      checkOut,
      adults,
      children,
      notes,
    });
    setCreated(reservation.reference);
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader title="New reservation" description="Create a mock booking and store it locally." />
      <DemoCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Guest">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={guestId}
              onChange={(e) => setGuestId(e.target.value)}
            >
              {data.guests.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Room type">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={roomTypeId}
              onChange={(e) => setRoomTypeId(e.target.value)}
            >
              {roomTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} · {formatInr(t.baseRate)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Check-in">
            <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </Field>
          <Field label="Check-out">
            <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </Field>
          <Field label="Adults">
            <Input
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value) || 1)}
            />
          </Field>
          <Field label="Children">
            <Input
              type="number"
              min={0}
              value={children}
              onChange={(e) => setChildren(Number(e.target.value) || 0)}
            />
          </Field>
        </div>
        <Field label="Notes">
          <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" />
        </Field>
        <Button type="button" className="mt-5" onClick={submit}>
          Create reservation
        </Button>
        {created ? (
          <p className="mt-3 text-sm text-uv-success">
            Created {created}. Continue to room assignment / check-in when ready.
          </p>
        ) : null}
      </DemoCard>
    </div>
  );
}

export function CheckInPage() {
  const { data, assignRoom, checkIn } = useHotelDemoStore();
  const [message, setMessage] = useState<string | null>(null);
  const confirmed = data.reservations.filter((r) => r.status === 'confirmed');

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Check-in" description="Assign a ready room and mark the stay in-house." />
      {confirmed.length === 0 ? (
        <EmptyHint>No confirmed arrivals waiting for check-in.</EmptyHint>
      ) : (
        <div className="space-y-3">
          {confirmed.map((r) => {
            const candidates = data.rooms.filter(
              (rm) =>
                rm.typeId === r.roomTypeId && ['available', 'ready'].includes(rm.status),
            );
            return (
              <article key={r.id} className="rounded-uv-xl border border-uv-border bg-uv-background p-4">
                <p className="font-semibold">
                  {r.reference} · {r.guestName}
                </p>
                <p className="text-sm text-uv-foreground-muted">
                  {getRoomType(r.roomTypeId)?.name} · {r.checkIn}
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <select
                    className="h-10 rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                    value={r.roomId ?? ''}
                    onChange={(e) => assignRoom(r.id, e.target.value)}
                  >
                    <option value="">Assign room…</option>
                    {candidates.map((rm) => (
                      <option key={rm.id} value={rm.id}>
                        {rm.number} · {rm.status}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const result = checkIn(r.id);
                      setMessage(result.ok ? `Checked in ${r.reference}` : result.error);
                    }}
                  >
                    Check in
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {message ? <p className="text-sm text-uv-foreground-muted">{message}</p> : null}
    </div>
  );
}

export function CheckOutPage() {
  const { data, checkOut, recordPayment } = useHotelDemoStore();
  const [message, setMessage] = useState<string | null>(null);
  const inHouse = data.reservations.filter((r) => r.status === 'checked_in');

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Check-out" description="Settle balance and release the room to dirty." />
      {inHouse.length === 0 ? (
        <EmptyHint>No in-house stays.</EmptyHint>
      ) : (
        <div className="space-y-3">
          {inHouse.map((r) => {
            const due = Math.max(0, r.total - r.paid);
            return (
              <article key={r.id} className="rounded-uv-xl border border-uv-border bg-uv-background p-4">
                <p className="font-semibold">
                  {r.reference} · {r.guestName} · Room{' '}
                  {data.rooms.find((rm) => rm.id === r.roomId)?.number}
                </p>
                <p className="text-sm text-uv-foreground-muted">
                  Total {formatInr(r.total)} · Paid {formatInr(r.paid)} · Due {formatInr(due)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {due > 0 ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        recordPayment(r.id, due);
                        setMessage(`Collected ${formatInr(due)} for ${r.reference}`);
                      }}
                    >
                      Collect due
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const result = checkOut(r.id);
                      setMessage(result.ok ? `Checked out ${r.reference}` : result.error);
                    }}
                  >
                    Check out
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {message ? <p className="text-sm text-uv-foreground-muted">{message}</p> : null}
    </div>
  );
}

export function HousekeepingPage() {
  const { data, setRoomStatus } = useHotelDemoStore();
  const queue = data.rooms.filter((r) =>
    ['dirty', 'cleaning', 'ready', 'maintenance'].includes(r.status),
  );

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Housekeeping room status"
        description="Move rooms through dirty → cleaning → ready."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {queue.map((room) => (
          <article key={room.id} className="rounded-uv-xl border border-uv-border bg-uv-background p-4">
            <p className="font-bold">Room {room.number}</p>
            <div className="mt-2">
              <StatusBadge status={room.status} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => setRoomStatus(room.id, 'cleaning')}>
                Start clean
              </Button>
              <Button type="button" size="sm" onClick={() => setRoomStatus(room.id, 'ready')}>
                Mark ready
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setRoomStatus(room.id, 'available')}
              >
                Release
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BillingPage() {
  const { data, recordPayment } = useHotelDemoStore();
  const [selectedId, setSelectedId] = useState(data.reservations[0]?.id ?? '');
  const selected = data.reservations.find((r) => r.id === selectedId);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Billing & invoice preview"
        description="Mock invoice totals and payment status — no real payments."
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <DemoCard title="Select booking">
          <div className="space-y-2">
            {data.reservations.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedId(r.id)}
                className={cn(
                  'w-full rounded-uv-xl border p-3 text-left',
                  selectedId === r.id
                    ? 'border-uv-brand bg-uv-brand-muted/30'
                    : 'border-uv-border',
                )}
              >
                <p className="font-medium">{r.reference}</p>
                <p className="text-xs text-uv-foreground-muted">{r.guestName}</p>
              </button>
            ))}
          </div>
        </DemoCard>
        {selected ? (
          <DemoCard title={`Invoice · ${selected.reference}`}>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Guest</dt>
                <dd>{selected.guestName}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Room nights</dt>
                <dd>
                  {selected.nights} × {formatInr(selected.ratePerNight)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Extras</dt>
                <dd>{formatInr(selected.extras)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax</dt>
                <dd>{formatInr(selected.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-uv-border pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd className="text-uv-brand">{formatInr(selected.total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Paid</dt>
                <dd>{formatInr(selected.paid)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Payment status</dt>
                <dd>
                  <StatusBadge status={selected.paymentStatus} />
                </dd>
              </div>
            </dl>
            <Button
              type="button"
              className="mt-5"
              onClick={() =>
                recordPayment(selected.id, Math.max(0, selected.total - selected.paid) || 1000)
              }
            >
              Record mock payment
            </Button>
          </DemoCard>
        ) : null}
      </div>
    </div>
  );
}

export function MaintenancePage() {
  const { data, addMaintenance, updateMaintenance } = useHotelDemoStore();
  const [roomId, setRoomId] = useState(data.rooms[0]?.id ?? '');
  const [title, setTitle] = useState('Fixture repair');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Maintenance requests" />
      <DemoCard title="Log request">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Room">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              {data.rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.number}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Title">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="Priority">
            <select
              className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </Field>
        </div>
        <Button
          type="button"
          className="mt-4"
          onClick={() =>
            addMaintenance({
              roomId,
              title,
              priority,
              assignedTo: 'Demo Engineer',
            })
          }
        >
          Create request
        </Button>
      </DemoCard>
      <div className="space-y-3">
        {data.maintenance.map((m) => (
          <article
            key={m.id}
            className="flex flex-col gap-3 rounded-uv-xl border border-uv-border bg-uv-background p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">{m.title}</p>
              <p className="text-sm text-uv-foreground-muted">
                Room {data.rooms.find((r) => r.id === m.roomId)?.number} · {m.assignedTo}
              </p>
              <div className="mt-2 flex gap-2">
                <StatusBadge status={m.priority} />
                <StatusBadge status={m.status} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => updateMaintenance(m.id, 'in_progress')}
              >
                Start
              </Button>
              <Button type="button" size="sm" onClick={() => updateMaintenance(m.id, 'resolved')}>
                Resolve
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function StaffTasksPage() {
  const { data, updateTask } = useHotelDemoStore();
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Staff task overview" />
      <div className="space-y-3">
        {data.tasks.map((t) => (
          <article
            key={t.id}
            className="flex flex-col gap-3 rounded-uv-xl border border-uv-border bg-uv-background p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-sm text-uv-foreground-muted">
                {t.role} · due {t.due}
              </p>
              <div className="mt-2">
                <StatusBadge status={t.status} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => updateTask(t.id, 'doing')}>
                Start
              </Button>
              <Button type="button" size="sm" onClick={() => updateTask(t.id, 'done')}>
                Done
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ReportsPage() {
  const { data } = useHotelDemoStore();
  const occupied = data.rooms.filter((r) => r.status === 'occupied').length;
  const revenue = data.reservations.reduce((s, r) => s + r.paid, 0);
  const byStatus = ['confirmed', 'checked_in', 'checked_out', 'cancelled'].map((s) => ({
    label: s.slice(0, 4),
    value: Math.max(
      1,
      data.reservations.filter((r) => r.status === s).length * 12,
    ),
  }));

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Reports" description="Occupancy and revenue snapshots from mock data." />
      <div className="grid gap-4 sm:grid-cols-3">
        <DemoStatCard
          label="Occupancy summary"
          value={`${Math.round((occupied / data.rooms.length) * 100)}%`}
          hint="Current room board"
        />
        <DemoStatCard label="Revenue summary" value={formatInr(revenue)} hint="Collected payments" />
        <DemoStatCard
          label="Active reservations"
          value={String(data.reservations.filter((r) => r.status !== 'cancelled').length)}
          hint="Excludes cancelled"
        />
      </div>
      <DemoCard title="Booking mix">
        <BarChart data={byStatus} />
      </DemoCard>
      <DemoCard title="Weekly revenue trend">
        <BarChart data={revenueTrend} />
      </DemoCard>
    </div>
  );
}

export function GuestPortalPage() {
  const { data } = useHotelDemoStore();
  const mine = data.reservations.filter((r) => r.guestId === 'g-01');
  const active = mine.find((r) => r.status === 'checked_in' || r.status === 'confirmed');

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="My stay"
        description="Guest portal for Demo Guest — Product Demo — Mock Data."
      />
      {active ? (
        <DemoCard title={active.reference}>
          <p className="text-sm text-uv-foreground-muted">
            {getRoomType(active.roomTypeId)?.name} · {active.checkIn} → {active.checkOut}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status={active.status} />
            <StatusBadge status={active.paymentStatus} />
          </div>
          <p className="mt-4 text-lg font-bold text-uv-brand">{formatInr(active.total)}</p>
          {active.roomId ? (
            <p className="mt-2 text-sm">
              Assigned room {data.rooms.find((r) => r.id === active.roomId)?.number}
            </p>
          ) : (
            <p className="mt-2 text-sm text-uv-foreground-muted">Room will be assigned at check-in.</p>
          )}
        </DemoCard>
      ) : (
        <EmptyHint>No active stay found for this demo guest.</EmptyHint>
      )}
    </div>
  );
}

export function GuestBookingsPage() {
  const { data } = useHotelDemoStore();
  const mine = data.reservations.filter((r) => r.guestId === 'g-01');

  return (
    <div className="space-y-6">
      <DemoPageHeader title="Booking history" description="Past and upcoming stays for Demo Guest." />
      <div className="space-y-3">
        {mine.map((r) => (
          <article key={r.id} className="rounded-uv-xl border border-uv-border bg-uv-background p-4">
            <p className="font-semibold">{r.reference}</p>
            <p className="text-sm text-uv-foreground-muted">
              {getRoomType(r.roomTypeId)?.name} · {r.checkIn} → {r.checkOut}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge status={r.status} />
              <StatusBadge status={r.paymentStatus} />
              <span className="text-sm font-semibold text-uv-brand">{formatInr(r.total)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
