import type {
  GuestProfile,
  HotelDemoData,
  MaintenanceRequest,
  Reservation,
  Room,
  RoomType,
  StaffTask,
} from './types';

export function formatInr(amount: number) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export const hotelName = 'Harbor View Demo Hotel';

export const roomTypes: RoomType[] = [
  {
    id: 'rt-std',
    name: 'Standard Twin',
    description: 'Comfortable twin room for leisure stays — mock inventory.',
    baseRate: 4200,
    capacity: 2,
    amenities: ['Wi-Fi', 'AC', 'TV', 'Tea kettle'],
  },
  {
    id: 'rt-dlx',
    name: 'Deluxe King',
    description: 'King bed with city view — demo room type.',
    baseRate: 6500,
    capacity: 2,
    amenities: ['Wi-Fi', 'AC', 'Mini fridge', 'Work desk'],
  },
  {
    id: 'rt-suite',
    name: 'Executive Suite',
    description: 'Living area + bedroom for longer demo stays.',
    baseRate: 9800,
    capacity: 3,
    amenities: ['Wi-Fi', 'Living area', 'Bath tub', 'Welcome tray'],
  },
  {
    id: 'rt-fam',
    name: 'Family Quad',
    description: 'Four-guest layout for family itineraries.',
    baseRate: 7800,
    capacity: 4,
    amenities: ['Wi-Fi', 'Two beds', 'Sofa bed', 'Kids kit'],
  },
];

export const seedRooms: Room[] = [
  { id: 'rm-101', number: '101', floor: 1, typeId: 'rt-std', status: 'available' },
  { id: 'rm-102', number: '102', floor: 1, typeId: 'rt-std', status: 'dirty' },
  { id: 'rm-103', number: '103', floor: 1, typeId: 'rt-dlx', status: 'occupied' },
  { id: 'rm-201', number: '201', floor: 2, typeId: 'rt-dlx', status: 'ready' },
  { id: 'rm-202', number: '202', floor: 2, typeId: 'rt-suite', status: 'available' },
  { id: 'rm-203', number: '203', floor: 2, typeId: 'rt-fam', status: 'cleaning' },
  { id: 'rm-301', number: '301', floor: 3, typeId: 'rt-suite', status: 'maintenance' },
  { id: 'rm-302', number: '302', floor: 3, typeId: 'rt-std', status: 'available' },
  { id: 'rm-303', number: '303', floor: 3, typeId: 'rt-dlx', status: 'occupied' },
  { id: 'rm-304', number: '304', floor: 3, typeId: 'rt-fam', status: 'available' },
];

export const seedGuests: GuestProfile[] = [
  {
    id: 'g-01',
    name: 'Demo Guest',
    email: 'guest@uandv.com',
    phone: '90000 20001',
    idProof: 'Passport · DEMO1234',
    notes: 'Prefers high floor · Product Demo profile',
  },
  {
    id: 'g-02',
    name: 'Sample Traveler A',
    email: 'traveler.a@demo.uandv',
    phone: '90000 20002',
    idProof: 'Aadhaar · XXXX-1111',
    notes: 'Early check-in request (mock)',
  },
  {
    id: 'g-03',
    name: 'Sample Traveler B',
    email: 'traveler.b@demo.uandv',
    phone: '90000 20003',
    idProof: 'DL · MH-DEMO-09',
    notes: 'Corporate stay · mock invoice needed',
  },
];

export const seedReservations: Reservation[] = [
  {
    id: 'res-1001',
    reference: 'UV-HT-1001',
    guestId: 'g-01',
    guestName: 'Demo Guest',
    roomTypeId: 'rt-dlx',
    roomId: 'rm-103',
    checkIn: '2026-07-21',
    checkOut: '2026-07-24',
    adults: 2,
    children: 0,
    status: 'checked_in',
    paymentStatus: 'partial',
    ratePerNight: 6500,
    nights: 3,
    extras: 450,
    tax: 1170,
    total: 21120,
    paid: 10000,
    createdAt: '2026-07-10T09:00:00.000Z',
    notes: 'In-house stay for demo dashboard',
  },
  {
    id: 'res-1002',
    reference: 'UV-HT-1002',
    guestId: 'g-02',
    guestName: 'Sample Traveler A',
    roomTypeId: 'rt-std',
    roomId: null,
    checkIn: '2026-07-23',
    checkOut: '2026-07-25',
    adults: 1,
    children: 0,
    status: 'confirmed',
    paymentStatus: 'paid',
    ratePerNight: 4200,
    nights: 2,
    extras: 0,
    tax: 420,
    total: 8820,
    paid: 8820,
    createdAt: '2026-07-18T14:20:00.000Z',
  },
  {
    id: 'res-1003',
    reference: 'UV-HT-1003',
    guestId: 'g-03',
    guestName: 'Sample Traveler B',
    roomTypeId: 'rt-suite',
    roomId: 'rm-303',
    checkIn: '2026-07-20',
    checkOut: '2026-07-22',
    adults: 2,
    children: 1,
    status: 'checked_in',
    paymentStatus: 'paid',
    ratePerNight: 9800,
    nights: 2,
    extras: 800,
    tax: 1020,
    total: 21420,
    paid: 21420,
    createdAt: '2026-07-12T11:00:00.000Z',
  },
  {
    id: 'res-1004',
    reference: 'UV-HT-1004',
    guestId: 'g-01',
    guestName: 'Demo Guest',
    roomTypeId: 'rt-fam',
    roomId: null,
    checkIn: '2026-08-05',
    checkOut: '2026-08-08',
    adults: 2,
    children: 2,
    status: 'confirmed',
    paymentStatus: 'unpaid',
    ratePerNight: 7800,
    nights: 3,
    extras: 0,
    tax: 1170,
    total: 24570,
    paid: 0,
    createdAt: '2026-07-19T16:40:00.000Z',
    notes: 'Upcoming family booking for guest portal',
  },
];

export const seedMaintenance: MaintenanceRequest[] = [
  {
    id: 'mnt-01',
    roomId: 'rm-301',
    title: 'AC not cooling',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Demo Engineer',
    createdAt: '2026-07-21T08:00:00.000Z',
  },
  {
    id: 'mnt-02',
    roomId: 'rm-102',
    title: 'Leaky faucet',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Demo Engineer',
    createdAt: '2026-07-22T07:30:00.000Z',
  },
];

export const seedTasks: StaffTask[] = [
  {
    id: 'task-01',
    title: 'Prepare arrival amenities for UV-HT-1002',
    role: 'Front Desk',
    status: 'todo',
    due: '2026-07-23',
  },
  {
    id: 'task-02',
    title: 'Deep clean room 203',
    role: 'Housekeeping',
    status: 'doing',
    due: '2026-07-22',
  },
  {
    id: 'task-03',
    title: 'Close night audit (mock)',
    role: 'Admin',
    status: 'todo',
    due: '2026-07-22',
  },
];

export const revenueTrend = [
  { label: 'Mon', value: 48 },
  { label: 'Tue', value: 52 },
  { label: 'Wed', value: 44 },
  { label: 'Thu', value: 61 },
  { label: 'Fri', value: 78 },
  { label: 'Sat', value: 92 },
  { label: 'Sun', value: 70 },
];

export function getRoomType(id: string) {
  return roomTypes.find((t) => t.id === id);
}

export function nightsBetween(checkIn: string, checkOut: string) {
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  return Math.max(1, Math.ceil((b - a) / (1000 * 60 * 60 * 24)));
}

export function calcStayTotal(ratePerNight: number, nights: number, extras = 0) {
  const subtotal = ratePerNight * nights + extras;
  const tax = Math.round(subtotal * 0.12);
  return { subtotal, tax, total: subtotal + tax };
}

export const seedHotelData: HotelDemoData = {
  rooms: seedRooms,
  reservations: seedReservations,
  guests: seedGuests,
  maintenance: seedMaintenance,
  tasks: seedTasks,
};
