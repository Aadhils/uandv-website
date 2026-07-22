export type TravelRole = 'traveler' | 'admin' | 'agent';

export const TRAVEL_DEMO_STORAGE_KEY = 'uandv-travel-platform-session-v1';
export const TRAVEL_DEMO_BOOKINGS_KEY = 'uandv-travel-platform-bookings-v1';
export const TRAVEL_DEMO_WALLET_KEY = 'uandv-travel-platform-wallet-v1';

export const TRAVEL_CREDENTIALS: Record<
  TravelRole,
  { email: string; password: string; name: string }
> = {
  traveler: {
    email: 'traveler@uandv.com',
    password: 'travel123',
    name: 'Demo Traveler',
  },
  admin: {
    email: 'admin@uandv.com',
    password: 'admin123',
    name: 'Demo Admin',
  },
  agent: {
    email: 'agent@uandv.com',
    password: 'agent123',
    name: 'Demo Travel Agent',
  },
};

export type TravelSession = {
  role: TravelRole;
  name: string;
  email: string;
  loggedInAt: string;
};

export type BookingCategory =
  | 'flight'
  | 'train'
  | 'bus'
  | 'hotel'
  | 'package'
  | 'visa'
  | 'insurance'
  | 'car'
  | 'sightseeing';

export type BookingStatus =
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'refunded';

export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';

export type TravelBooking = {
  id: string;
  category: BookingCategory;
  title: string;
  subtitle: string;
  amount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  travelDate: string;
  travelers: number;
  reference: string;
  details: Record<string, string>;
};

export type PackageCategory =
  | 'domestic'
  | 'international'
  | 'honeymoon'
  | 'family'
  | 'adventure'
  | 'pilgrimage';

export type TourPackage = {
  id: string;
  name: string;
  destination: string;
  category: PackageCategory;
  nights: number;
  days: number;
  priceFrom: number;
  rating: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; summary: string }[];
  imageTone: string;
};

export type HotelListing = {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  amenities: string[];
  roomTypes: { name: string; price: number; capacity: number }[];
  gallery: string[];
  distance: string;
};

export type FlightOption = {
  id: string;
  airline: string;
  flightNo: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: number;
  fare: number;
  cabin: string;
  refundable: boolean;
};

export type TrainOption = {
  id: string;
  name: string;
  number: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  classes: { name: string; fare: number; seats: number }[];
};

export type BusOption = {
  id: string;
  operator: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  type: string;
  fare: number;
  seats: number;
};

export type OfferItem = {
  id: string;
  code: string;
  title: string;
  description: string;
  discountLabel: string;
  validTill: string;
  category: string;
};

export type WalletTxn = {
  id: string;
  label: string;
  amount: number;
  type: 'credit' | 'debit';
  at: string;
};

export type CheckoutDraft = {
  category: BookingCategory;
  title: string;
  subtitle: string;
  amount: number;
  travelDate: string;
  travelers: number;
  details: Record<string, string>;
} | null;

export function homeForRole(role: TravelRole): string {
  if (role === 'admin') return '/demo/travel/admin';
  if (role === 'agent') return '/demo/travel/agent';
  return '/demo/travel/portal';
}
