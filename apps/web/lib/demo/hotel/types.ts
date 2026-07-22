export type HotelRole = 'admin' | 'reception' | 'housekeeping' | 'guest';

export const HOTEL_DEMO_STORAGE_KEY = 'uandv-hotel-management-session-v1';
export const HOTEL_DEMO_DATA_KEY = 'uandv-hotel-management-data-v1';

export const HOTEL_CREDENTIALS: Record<
  HotelRole,
  { email: string; password: string; name: string }
> = {
  admin: {
    email: 'admin@uandv.com',
    password: 'admin123',
    name: 'Demo Hotel Admin',
  },
  reception: {
    email: 'reception@uandv.com',
    password: 'reception123',
    name: 'Demo Front Desk',
  },
  housekeeping: {
    email: 'housekeeping@uandv.com',
    password: 'house123',
    name: 'Demo Housekeeping',
  },
  guest: {
    email: 'guest@uandv.com',
    password: 'guest123',
    name: 'Demo Guest',
  },
};

export type HotelSession = {
  role: HotelRole;
  name: string;
  email: string;
  loggedInAt: string;
};

export type RoomStatus =
  | 'available'
  | 'occupied'
  | 'dirty'
  | 'cleaning'
  | 'ready'
  | 'maintenance'
  | 'out_of_order';

export type ReservationStatus =
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'
  | 'no_show';

export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';

export type RoomType = {
  id: string;
  name: string;
  description: string;
  baseRate: number;
  capacity: number;
  amenities: string[];
};

export type Room = {
  id: string;
  number: string;
  floor: number;
  typeId: string;
  status: RoomStatus;
};

export type GuestProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  idProof: string;
  notes: string;
};

export type Reservation = {
  id: string;
  reference: string;
  guestId: string;
  guestName: string;
  roomTypeId: string;
  roomId: string | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  status: ReservationStatus;
  paymentStatus: PaymentStatus;
  ratePerNight: number;
  nights: number;
  extras: number;
  tax: number;
  total: number;
  paid: number;
  createdAt: string;
  notes?: string;
};

export type MaintenanceRequest = {
  id: string;
  roomId: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  assignedTo: string;
  createdAt: string;
};

export type StaffTask = {
  id: string;
  title: string;
  role: string;
  status: 'todo' | 'doing' | 'done';
  due: string;
};

export type HotelDemoData = {
  rooms: Room[];
  reservations: Reservation[];
  guests: GuestProfile[];
  maintenance: MaintenanceRequest[];
  tasks: StaffTask[];
};

export function homeForRole(role: HotelRole): string {
  if (role === 'guest') return '/demo/hotel-management/guest';
  if (role === 'housekeeping') return '/demo/hotel-management/housekeeping';
  return '/demo/hotel-management/dashboard';
}
