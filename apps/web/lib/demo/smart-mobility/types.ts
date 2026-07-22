import type { IconName } from '@uandv/ui';

export type VehicleCategoryId =
  | 'bike'
  | 'auto'
  | 'mini'
  | 'sedan'
  | 'suv'
  | 'rental'
  | 'parcel';

export type BookingStage =
  | 'idle'
  | 'ready'
  | 'confirming'
  | 'searching'
  | 'assigned'
  | 'in_progress'
  | 'completed';

export type DriverStatus = 'offline' | 'online' | 'busy';

export type VehicleOption = {
  id: VehicleCategoryId;
  name: string;
  subtitle: string;
  icon: IconName;
  capacity: string;
  etaMins: number;
  baseFare: number;
  perKm: number;
  serviceTag: string;
};

export type Place = {
  id: string;
  label: string;
  address: string;
  kind: 'recent' | 'saved' | 'current';
};

export type DriverProfile = {
  id: string;
  name: string;
  rating: number;
  trips: number;
  vehicle: string;
  plate: string;
  phoneMasked: string;
  etaMins: number;
  photoInitials: string;
};

export type RideRecord = {
  id: string;
  date: string;
  from: string;
  to: string;
  vehicle: string;
  fare: number;
  status: 'completed' | 'cancelled';
  rating?: number;
};

export type PaymentMethod = {
  id: string;
  label: string;
  detail: string;
};

export type Offer = {
  id: string;
  title: string;
  detail: string;
  code: string;
};

export type AdminTicket = {
  id: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'pending' | 'resolved';
};

export type FareRule = {
  id: VehicleCategoryId;
  name: string;
  base: number;
  perKm: number;
  waiting: number;
};
