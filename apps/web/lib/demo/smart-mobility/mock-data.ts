import type {
  AdminTicket,
  DriverProfile,
  FareRule,
  Offer,
  PaymentMethod,
  Place,
  RideRecord,
  VehicleOption,
} from './types';

export const DEMO_LABEL = 'Product Demo';

export const vehicleOptions: VehicleOption[] = [
  {
    id: 'bike',
    name: 'Bike',
    subtitle: 'Fast solo trips',
    icon: 'Bike',
    capacity: '1 rider',
    etaMins: 3,
    baseFare: 25,
    perKm: 8,
    serviceTag: 'Bike Taxi',
  },
  {
    id: 'auto',
    name: 'Auto',
    subtitle: 'City short hops',
    icon: 'Car',
    capacity: '3 seats',
    etaMins: 5,
    baseFare: 40,
    perKm: 12,
    serviceTag: 'Auto Rickshaw',
  },
  {
    id: 'mini',
    name: 'Mini Cab',
    subtitle: 'Compact & affordable',
    icon: 'Car',
    capacity: '4 seats',
    etaMins: 6,
    baseFare: 60,
    perKm: 14,
    serviceTag: 'Cab Booking',
  },
  {
    id: 'sedan',
    name: 'Sedan',
    subtitle: 'Comfort rides',
    icon: 'Car',
    capacity: '4 seats',
    etaMins: 7,
    baseFare: 90,
    perKm: 18,
    serviceTag: 'Cab Booking',
  },
  {
    id: 'suv',
    name: 'SUV',
    subtitle: 'Group & luggage',
    icon: 'Truck',
    capacity: '6 seats',
    etaMins: 9,
    baseFare: 140,
    perKm: 24,
    serviceTag: 'Cab Booking',
  },
  {
    id: 'rental',
    name: 'Rental',
    subtitle: 'Hourly self-drive',
    icon: 'Wrench',
    capacity: '4–7 seats',
    etaMins: 15,
    baseFare: 499,
    perKm: 0,
    serviceTag: 'Rental Vehicles',
  },
  {
    id: 'parcel',
    name: 'Parcel',
    subtitle: 'Same-city delivery',
    icon: 'Package',
    capacity: 'Up to 10 kg',
    etaMins: 8,
    baseFare: 45,
    perKm: 10,
    serviceTag: 'Parcel Delivery',
  },
];

export const places: Place[] = [
  {
    id: 'current',
    label: 'Current location',
    address: 'Guindy Industrial Estate, Chennai',
    kind: 'current',
  },
  {
    id: 'r1',
    label: 'T Nagar Bus Stand',
    address: 'South Usman Road, T Nagar',
    kind: 'recent',
  },
  {
    id: 'r2',
    label: 'Chennai Central',
    address: 'Park Town, Chennai',
    kind: 'recent',
  },
  {
    id: 'r3',
    label: 'Phoenix Marketcity',
    address: 'Velachery Main Road',
    kind: 'recent',
  },
  {
    id: 's1',
    label: 'Home',
    address: 'Adyar, Chennai',
    kind: 'saved',
  },
  {
    id: 's2',
    label: 'Office',
    address: 'OMR, Thoraipakkam',
    kind: 'saved',
  },
  {
    id: 's3',
    label: 'Airport',
    address: 'Chennai International Airport',
    kind: 'saved',
  },
];

export const mockDriver: DriverProfile = {
  id: 'DRV-204',
  name: 'Suresh Kumar',
  rating: 4.86,
  trips: 1284,
  vehicle: 'Swift Dzire · White',
  plate: 'TN 09 · DEMO 204',
  phoneMasked: '+91 ••••• •••38',
  etaMins: 4,
  photoInitials: 'SK',
};

export const mockBikeDriver: DriverProfile = {
  id: 'DRV-118',
  name: 'Karthik M',
  rating: 4.91,
  trips: 842,
  vehicle: 'Activa · Grey',
  plate: 'TN 07 · DEMO 118',
  phoneMasked: '+91 ••••• •••62',
  etaMins: 3,
  photoInitials: 'KM',
};

export const paymentMethods: PaymentMethod[] = [
  { id: 'upi', label: 'UPI', detail: 'demo@upi' },
  { id: 'card', label: 'Card', detail: '•••• 4242' },
  { id: 'cash', label: 'Cash', detail: 'Pay on completion' },
  { id: 'wallet', label: 'Wallet', detail: '₹1,240.00 available' },
];

export const offers: Offer[] = [
  {
    id: 'o1',
    title: 'First cab ride',
    detail: 'Save up to ₹75 on Mini Cab',
    code: 'UVRIDE75',
  },
  {
    id: 'o2',
    title: 'Parcel noon special',
    detail: 'Flat ₹20 off before 2 PM',
    code: 'PARCEL20',
  },
  {
    id: 'o3',
    title: 'Rental weekend',
    detail: '10% off 4+ hour rentals',
    code: 'RENT10',
  },
];

export const rideHistory: RideRecord[] = [
  {
    id: 'RID-901',
    date: '2026-07-18',
    from: 'Adyar',
    to: 'OMR Office',
    vehicle: 'Sedan',
    fare: 286,
    status: 'completed',
    rating: 5,
  },
  {
    id: 'RID-894',
    date: '2026-07-16',
    from: 'T Nagar',
    to: 'Airport',
    vehicle: 'SUV',
    fare: 620,
    status: 'completed',
    rating: 4,
  },
  {
    id: 'RID-880',
    date: '2026-07-12',
    from: 'Guindy',
    to: 'Velachery',
    vehicle: 'Bike',
    fare: 78,
    status: 'completed',
    rating: 5,
  },
  {
    id: 'RID-871',
    date: '2026-07-09',
    from: 'Home',
    to: 'Phoenix',
    vehicle: 'Auto',
    fare: 145,
    status: 'cancelled',
  },
];

export const platformServices = [
  { title: 'Bike rides', detail: 'Point-to-point bike taxi for solo travel' },
  { title: 'Auto rides', detail: 'Auto rickshaw booking for short city hops' },
  { title: 'Cab rides', detail: 'Mini, Sedan, and SUV categories' },
  { title: 'Vehicle rentals', detail: 'Hourly and daily self-drive packages' },
  { title: 'Parcel delivery', detail: 'Same-city package movement' },
  { title: 'Corporate travel', detail: 'Company accounts and trip policies' },
  { title: 'Fleet operations', detail: 'Partner fleets, shifts, and compliance' },
];

export const driverEarnings = {
  today: 1840,
  week: 11250,
  incentives: 650,
  rating: 4.86,
  acceptance: '92%',
  completion: '97%',
};

export const driverDocuments = [
  { name: 'Driving license', status: 'verified' as const },
  { name: 'Vehicle RC', status: 'verified' as const },
  { name: 'Insurance', status: 'expiring' as const },
  { name: 'Background check', status: 'verified' as const },
];

export const adminStats = [
  { label: 'Total rides', value: '18,420', hint: 'Demo dataset total' },
  { label: 'Active rides', value: '126', hint: 'In progress now' },
  { label: 'Available drivers', value: '348', hint: 'Online & idle' },
  { label: 'Registered customers', value: '52,910', hint: 'Demo accounts' },
  { label: 'Revenue overview', value: '₹48.2L', hint: 'Mock period total' },
  { label: 'Commission overview', value: '₹6.4L', hint: 'Platform share' },
];

export const adminDrivers = [
  { id: 'DRV-204', name: 'Suresh Kumar', vehicle: 'Sedan', status: 'online', rating: 4.86 },
  { id: 'DRV-118', name: 'Karthik M', vehicle: 'Bike', status: 'busy', rating: 4.91 },
  { id: 'DRV-331', name: 'Anitha R', vehicle: 'Auto', status: 'online', rating: 4.72 },
  { id: 'DRV-402', name: 'Imran S', vehicle: 'SUV', status: 'offline', rating: 4.55 },
];

export const adminCustomers = [
  { id: 'CUS-1001', name: 'Meera Iyer', trips: 42, wallet: 1240 },
  { id: 'CUS-1008', name: 'Rahul Das', trips: 18, wallet: 320 },
  { id: 'CUS-1022', name: 'Priya Nair', trips: 67, wallet: 2100 },
];

export const adminRides = [
  { id: 'RID-10021', service: 'Sedan', status: 'in_progress', fare: 286 },
  { id: 'RID-10018', service: 'Bike', status: 'searching', fare: 72 },
  { id: 'RID-10011', service: 'Parcel', status: 'assigned', fare: 118 },
  { id: 'RID-10005', service: 'Rental', status: 'completed', fare: 1499 },
];

export const fareRules: FareRule[] = [
  { id: 'bike', name: 'Bike', base: 25, perKm: 8, waiting: 1 },
  { id: 'auto', name: 'Auto', base: 40, perKm: 12, waiting: 1.5 },
  { id: 'mini', name: 'Mini Cab', base: 60, perKm: 14, waiting: 2 },
  { id: 'sedan', name: 'Sedan', base: 90, perKm: 18, waiting: 2 },
  { id: 'suv', name: 'SUV', base: 140, perKm: 24, waiting: 3 },
  { id: 'rental', name: 'Rental', base: 499, perKm: 0, waiting: 0 },
  { id: 'parcel', name: 'Parcel', base: 45, perKm: 10, waiting: 1 },
];

export const promoCodes = [
  { code: 'UVRIDE75', type: 'Cab', status: 'active' },
  { code: 'PARCEL20', type: 'Parcel', status: 'active' },
  { code: 'RENT10', type: 'Rental', status: 'scheduled' },
  { code: 'CORP15', type: 'Corporate', status: 'paused' },
];

export const serviceZones = [
  { name: 'Chennai Central', vehicles: 'All', status: 'live' },
  { name: 'OMR Corridor', vehicles: 'Cab + Bike', status: 'live' },
  { name: 'Airport Zone', vehicles: 'Cab + SUV', status: 'live' },
  { name: 'Pilot Suburb', vehicles: 'Auto only', status: 'testing' },
];

export const fleetAssets = [
  { id: 'FLT-01', name: 'Partner Fleet Alpha', vehicles: 42, utilization: '78%' },
  { id: 'FLT-02', name: 'Corporate Pool', vehicles: 18, utilization: '64%' },
  { id: 'FLT-03', name: 'Parcel Couriers', vehicles: 27, utilization: '81%' },
];

export const supportTickets: AdminTicket[] = [
  { id: 'TCK-441', subject: 'Fare dispute — RID-901', priority: 'medium', status: 'open' },
  { id: 'TCK-438', subject: 'Driver document expiry', priority: 'high', status: 'pending' },
  { id: 'TCK-430', subject: 'Promo code not applying', priority: 'low', status: 'resolved' },
];

export const analyticsSeries = [
  { label: 'Mon', rides: 210 },
  { label: 'Tue', rides: 248 },
  { label: 'Wed', rides: 266 },
  { label: 'Thu', rides: 239 },
  { label: 'Fri', rides: 312 },
  { label: 'Sat', rides: 355 },
  { label: 'Sun', rides: 298 },
];

export function estimateFare(vehicleId: string, distanceKm = 8.4) {
  const vehicle = vehicleOptions.find((item) => item.id === vehicleId);
  if (!vehicle) return { min: 0, max: 0, distanceKm };
  if (vehicle.id === 'rental') {
    return { min: vehicle.baseFare, max: vehicle.baseFare + 200, distanceKm };
  }
  const mid = Math.round(vehicle.baseFare + vehicle.perKm * distanceKm);
  return {
    min: Math.round(mid * 0.92),
    max: Math.round(mid * 1.12),
    distanceKm,
  };
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getVehicle(id: string) {
  return vehicleOptions.find((item) => item.id === id);
}
