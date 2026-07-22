'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  calcStayTotal,
  getRoomType,
  nightsBetween,
  seedHotelData,
} from './mock-data';
import {
  HOTEL_DEMO_DATA_KEY,
  type HotelDemoData,
  type MaintenanceRequest,
  type Reservation,
  type ReservationStatus,
  type RoomStatus,
  type StaffTask,
} from './types';

type StoreContextValue = {
  ready: boolean;
  data: HotelDemoData;
  createReservation: (input: {
    guestId: string;
    guestName: string;
    roomTypeId: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    notes?: string;
  }) => Reservation;
  assignRoom: (reservationId: string, roomId: string) => void;
  checkIn: (reservationId: string, roomId?: string) => { ok: true } | { ok: false; error: string };
  checkOut: (reservationId: string) => { ok: true } | { ok: false; error: string };
  setRoomStatus: (roomId: string, status: RoomStatus) => void;
  recordPayment: (reservationId: string, amount: number) => void;
  addMaintenance: (input: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateMaintenance: (id: string, status: MaintenanceRequest['status']) => void;
  updateTask: (id: string, status: StaffTask['status']) => void;
  cancelReservation: (id: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readData(): HotelDemoData {
  if (typeof window === 'undefined') return seedHotelData;
  try {
    const raw = window.localStorage.getItem(HOTEL_DEMO_DATA_KEY);
    if (!raw) return seedHotelData;
    return JSON.parse(raw) as HotelDemoData;
  } catch {
    return seedHotelData;
  }
}

function makeReference() {
  return `UV-HT-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function HotelDemoStoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<HotelDemoData>(seedHotelData);

  useEffect(() => {
    setData(readData());
    setReady(true);
  }, []);

  const persist = useCallback((next: HotelDemoData) => {
    setData(next);
    window.localStorage.setItem(HOTEL_DEMO_DATA_KEY, JSON.stringify(next));
  }, []);

  const createReservation = useCallback(
    (input: {
      guestId: string;
      guestName: string;
      roomTypeId: string;
      checkIn: string;
      checkOut: string;
      adults: number;
      children: number;
      notes?: string;
    }) => {
      const type = getRoomType(input.roomTypeId)!;
      const nights = nightsBetween(input.checkIn, input.checkOut);
      const { tax, total } = calcStayTotal(type.baseRate, nights);
      const reservation: Reservation = {
        id: `res-${Date.now()}`,
        reference: makeReference(),
        guestId: input.guestId,
        guestName: input.guestName,
        roomTypeId: input.roomTypeId,
        roomId: null,
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        adults: input.adults,
        children: input.children,
        status: 'confirmed',
        paymentStatus: 'unpaid',
        ratePerNight: type.baseRate,
        nights,
        extras: 0,
        tax,
        total,
        paid: 0,
        createdAt: new Date().toISOString(),
        notes: input.notes,
      };
      persist({ ...data, reservations: [reservation, ...data.reservations] });
      return reservation;
    },
    [data, persist],
  );

  const assignRoom = useCallback(
    (reservationId: string, roomId: string) => {
      persist({
        ...data,
        reservations: data.reservations.map((r) =>
          r.id === reservationId ? { ...r, roomId } : r,
        ),
      });
    },
    [data, persist],
  );

  const checkIn = useCallback(
    (reservationId: string, roomId?: string) => {
      const reservation = data.reservations.find((r) => r.id === reservationId);
      if (!reservation) return { ok: false as const, error: 'Reservation not found.' };
      if (reservation.status !== 'confirmed') {
        return { ok: false as const, error: 'Only confirmed reservations can check in.' };
      }
      const assigned = roomId || reservation.roomId;
      if (!assigned) return { ok: false as const, error: 'Assign a room before check-in.' };
      const room = data.rooms.find((rm) => rm.id === assigned);
      if (!room) return { ok: false as const, error: 'Room not found.' };
      if (!['available', 'ready'].includes(room.status)) {
        return { ok: false as const, error: 'Room is not ready for check-in.' };
      }
      persist({
        ...data,
        rooms: data.rooms.map((rm) =>
          rm.id === assigned ? { ...rm, status: 'occupied' as const } : rm,
        ),
        reservations: data.reservations.map((r) =>
          r.id === reservationId
            ? { ...r, roomId: assigned, status: 'checked_in' as ReservationStatus }
            : r,
        ),
      });
      return { ok: true as const };
    },
    [data, persist],
  );

  const checkOut = useCallback(
    (reservationId: string) => {
      const reservation = data.reservations.find((r) => r.id === reservationId);
      if (!reservation || reservation.status !== 'checked_in') {
        return { ok: false as const, error: 'Only in-house stays can check out.' };
      }
      persist({
        ...data,
        rooms: data.rooms.map((rm) =>
          rm.id === reservation.roomId ? { ...rm, status: 'dirty' as const } : rm,
        ),
        reservations: data.reservations.map((r) =>
          r.id === reservationId
            ? {
                ...r,
                status: 'checked_out' as const,
                paymentStatus: r.paid >= r.total ? ('paid' as const) : r.paymentStatus,
              }
            : r,
        ),
      });
      return { ok: true as const };
    },
    [data, persist],
  );

  const setRoomStatus = useCallback(
    (roomId: string, status: RoomStatus) => {
      persist({
        ...data,
        rooms: data.rooms.map((rm) => (rm.id === roomId ? { ...rm, status } : rm)),
      });
    },
    [data, persist],
  );

  const recordPayment = useCallback(
    (reservationId: string, amount: number) => {
      persist({
        ...data,
        reservations: data.reservations.map((r) => {
          if (r.id !== reservationId) return r;
          const paid = Math.min(r.total, r.paid + amount);
          return {
            ...r,
            paid,
            paymentStatus:
              paid <= 0 ? 'unpaid' : paid >= r.total ? 'paid' : 'partial',
          };
        }),
      });
    },
    [data, persist],
  );

  const addMaintenance = useCallback(
    (input: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'status'>) => {
      const next: MaintenanceRequest = {
        ...input,
        id: `mnt-${Date.now()}`,
        status: 'open',
        createdAt: new Date().toISOString(),
      };
      persist({
        ...data,
        maintenance: [next, ...data.maintenance],
        rooms: data.rooms.map((rm) =>
          rm.id === input.roomId && rm.status === 'available'
            ? { ...rm, status: 'maintenance' as const }
            : rm,
        ),
      });
    },
    [data, persist],
  );

  const updateMaintenance = useCallback(
    (id: string, status: MaintenanceRequest['status']) => {
      persist({
        ...data,
        maintenance: data.maintenance.map((m) => (m.id === id ? { ...m, status } : m)),
      });
    },
    [data, persist],
  );

  const updateTask = useCallback(
    (id: string, status: StaffTask['status']) => {
      persist({
        ...data,
        tasks: data.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
      });
    },
    [data, persist],
  );

  const cancelReservation = useCallback(
    (id: string) => {
      persist({
        ...data,
        reservations: data.reservations.map((r) =>
          r.id === id ? { ...r, status: 'cancelled' as const } : r,
        ),
      });
    },
    [data, persist],
  );

  const value = useMemo(
    () => ({
      ready,
      data,
      createReservation,
      assignRoom,
      checkIn,
      checkOut,
      setRoomStatus,
      recordPayment,
      addMaintenance,
      updateMaintenance,
      updateTask,
      cancelReservation,
    }),
    [
      ready,
      data,
      createReservation,
      assignRoom,
      checkIn,
      checkOut,
      setRoomStatus,
      recordPayment,
      addMaintenance,
      updateMaintenance,
      updateTask,
      cancelReservation,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useHotelDemoStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useHotelDemoStore must be used within HotelDemoStoreProvider');
  return ctx;
}
