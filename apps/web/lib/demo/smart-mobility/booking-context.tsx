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
  estimateFare,
  getVehicle,
  mockBikeDriver,
  mockDriver,
} from './mock-data';
import type {
  BookingStage,
  DriverProfile,
  DriverStatus,
  VehicleCategoryId,
} from './types';

type BookingState = {
  pickupId: string;
  dropId: string;
  vehicleId: VehicleCategoryId;
  stage: BookingStage;
  scheduled: boolean;
  scheduleAt: string;
  paymentMethodId: string;
  otp: string;
  driver: DriverProfile | null;
  fareMin: number;
  fareMax: number;
  distanceKm: number;
  driverOnline: boolean;
  driverStatus: DriverStatus;
  incomingRequest: boolean;
  tripRating: number;
};

type BookingContextValue = BookingState & {
  setPickup: (id: string) => void;
  setDrop: (id: string) => void;
  setVehicle: (id: VehicleCategoryId) => void;
  setScheduled: (value: boolean) => void;
  setScheduleAt: (value: string) => void;
  setPaymentMethodId: (id: string) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
  startTrip: () => void;
  completeTrip: () => void;
  setTripRating: (value: number) => void;
  toggleDriverOnline: () => void;
  acceptRide: () => void;
  rejectRide: () => void;
  vehicleName: string;
};

const BookingContext = createContext<BookingContextValue | null>(null);

const initial: BookingState = {
  pickupId: 'current',
  dropId: 's2',
  vehicleId: 'sedan',
  stage: 'ready',
  scheduled: false,
  scheduleAt: '',
  paymentMethodId: 'upi',
  otp: '4821',
  driver: null,
  fareMin: 0,
  fareMax: 0,
  distanceKm: 8.4,
  driverOnline: true,
  driverStatus: 'online',
  incomingRequest: false,
  tripRating: 0,
};

export function SmartMobilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(() => {
    const fare = estimateFare(initial.vehicleId);
    return {
      ...initial,
      fareMin: fare.min,
      fareMax: fare.max,
      distanceKm: fare.distanceKm,
    };
  });

  const recomputeFare = useCallback((vehicleId: VehicleCategoryId) => {
    const fare = estimateFare(vehicleId);
    setState((prev) => ({
      ...prev,
      vehicleId,
      fareMin: fare.min,
      fareMax: fare.max,
      distanceKm: fare.distanceKm,
      stage: prev.stage === 'idle' ? 'ready' : prev.stage,
    }));
  }, []);

  useEffect(() => {
    if (state.stage !== 'searching') return;
    const timer = window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        stage: 'assigned',
        driver:
          prev.vehicleId === 'bike' || prev.vehicleId === 'parcel'
            ? mockBikeDriver
            : mockDriver,
        driverStatus: 'busy',
        incomingRequest: false,
      }));
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [state.stage]);

  const value = useMemo<BookingContextValue>(() => {
    const vehicle = getVehicle(state.vehicleId);
    return {
      ...state,
      vehicleName: vehicle?.name ?? 'Vehicle',
      setPickup: (id) => setState((prev) => ({ ...prev, pickupId: id })),
      setDrop: (id) => setState((prev) => ({ ...prev, dropId: id })),
      setVehicle: recomputeFare,
      setScheduled: (value) => setState((prev) => ({ ...prev, scheduled: value })),
      setScheduleAt: (value) => setState((prev) => ({ ...prev, scheduleAt: value })),
      setPaymentMethodId: (id) =>
        setState((prev) => ({ ...prev, paymentMethodId: id })),
      confirmBooking: () => {
        setState((prev) => ({
          ...prev,
          stage: 'searching',
          incomingRequest: true,
          driver: null,
          otp: String(Math.floor(1000 + Math.random() * 9000)),
        }));
      },
      resetBooking: () => {
        const fare = estimateFare('sedan');
        setState({
          ...initial,
          fareMin: fare.min,
          fareMax: fare.max,
          distanceKm: fare.distanceKm,
          driverOnline: state.driverOnline,
          driverStatus: state.driverOnline ? 'online' : 'offline',
        });
      },
      startTrip: () =>
        setState((prev) => ({ ...prev, stage: 'in_progress', driverStatus: 'busy' })),
      completeTrip: () =>
        setState((prev) => ({
          ...prev,
          stage: 'completed',
          driverStatus: prev.driverOnline ? 'online' : 'offline',
          incomingRequest: false,
        })),
      setTripRating: (value) => setState((prev) => ({ ...prev, tripRating: value })),
      toggleDriverOnline: () =>
        setState((prev) => {
          const online = !prev.driverOnline;
          return {
            ...prev,
            driverOnline: online,
            driverStatus: online
              ? prev.stage === 'assigned' || prev.stage === 'in_progress'
                ? 'busy'
                : 'online'
              : 'offline',
            incomingRequest:
              online && prev.stage === 'searching' ? true : prev.incomingRequest,
          };
        }),
      acceptRide: () =>
        setState((prev) => ({
          ...prev,
          stage: 'assigned',
          incomingRequest: false,
          driverStatus: 'busy',
          driver:
            prev.vehicleId === 'bike' || prev.vehicleId === 'parcel'
              ? mockBikeDriver
              : mockDriver,
        })),
      rejectRide: () =>
        setState((prev) => ({
          ...prev,
          incomingRequest: false,
          stage: 'ready',
          driver: null,
          driverStatus: prev.driverOnline ? 'online' : 'offline',
        })),
    };
  }, [state, recomputeFare]);

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useSmartMobility() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useSmartMobility must be used within SmartMobilityProvider');
  }
  return ctx;
}
