import type {
  Coupon,
  InventoryItem,
  MenuItem,
  PlatformOrder,
  PurchaseOrder,
  RestaurantListing,
  Review,
  StaffMember,
  Supplier,
  SupportTicket,
  Address,
} from './types';

export function formatInr(amount: number) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export const cuisineCategories = [
  'All',
  'North Indian',
  'South Indian',
  'Chinese',
  'Biryani',
  'Pizza',
  'Burgers',
  'Healthy',
  'Desserts',
];

export const demoRestaurants: RestaurantListing[] = [
  {
    id: 'rst-01',
    name: 'Harbor Spice Kitchen',
    cuisine: ['North Indian', 'Biryani'],
    rating: 4.5,
    reviews: 128,
    etaMins: 28,
    costForTwo: 700,
    area: 'Marina Demo Zone',
    outlet: 'Outlet A',
    vegOnly: false,
    imageTone: 'from-orange-500/25 to-rose-600/20',
    offers: ['FLAT50', 'FREEDEL'],
  },
  {
    id: 'rst-02',
    name: 'Green Bowl Studio',
    cuisine: ['Healthy', 'South Indian'],
    rating: 4.7,
    reviews: 86,
    etaMins: 22,
    costForTwo: 550,
    area: 'Lakeview Demo Zone',
    outlet: 'Outlet B',
    vegOnly: true,
    imageTone: 'from-emerald-500/25 to-teal-600/20',
    offers: ['VEG20'],
  },
  {
    id: 'rst-03',
    name: 'Oven Lane Pizza Lab',
    cuisine: ['Pizza', 'Burgers'],
    rating: 4.3,
    reviews: 210,
    etaMins: 35,
    costForTwo: 800,
    area: 'Tech Park Demo Zone',
    outlet: 'Outlet C',
    vegOnly: false,
    imageTone: 'from-amber-500/25 to-red-600/20',
    offers: ['BOGO'],
  },
  {
    id: 'rst-04',
    name: 'Cloud Wok Express',
    cuisine: ['Chinese'],
    rating: 4.4,
    reviews: 97,
    etaMins: 26,
    costForTwo: 600,
    area: 'Central Demo Zone',
    outlet: 'Outlet A',
    vegOnly: false,
    imageTone: 'from-sky-500/25 to-indigo-600/20',
    offers: ['WOK15'],
  },
];

export const demoMenu: MenuItem[] = [
  {
    id: 'mi-01',
    restaurantId: 'rst-01',
    name: 'Butter Paneer Bowl',
    category: 'Mains',
    description: 'Creamy tomato gravy with soft paneer — demo dish.',
    price: 279,
    diet: 'veg',
    popular: true,
    available: true,
    addOns: [
      { id: 'ao-butter', name: 'Extra butter', price: 30 },
      { id: 'ao-naan', name: 'Butter naan', price: 45 },
    ],
    customizations: [
      { id: 'spice', name: 'Spice level', options: ['Mild', 'Medium', 'Hot'] },
    ],
  },
  {
    id: 'mi-02',
    restaurantId: 'rst-01',
    name: 'Chicken Dum Biryani',
    category: 'Biryani',
    description: 'Slow-cooked demo biryani with raita suggestion.',
    price: 349,
    diet: 'nonveg',
    popular: true,
    available: true,
    addOns: [
      { id: 'ao-raita', name: 'Raita', price: 40 },
      { id: 'ao-egg', name: 'Boiled egg', price: 35 },
    ],
    customizations: [
      { id: 'portion', name: 'Portion', options: ['Regular', 'Family'] },
    ],
  },
  {
    id: 'mi-03',
    restaurantId: 'rst-01',
    name: 'Tandoori Platter',
    category: 'Starters',
    description: 'Assorted tandoor samples for demo browsing.',
    price: 399,
    diet: 'nonveg',
    available: true,
    addOns: [{ id: 'ao-dip', name: 'Mint dip', price: 20 }],
    customizations: [],
  },
  {
    id: 'mi-04',
    restaurantId: 'rst-02',
    name: 'Millet Bowl',
    category: 'Bowls',
    description: 'Demo healthy bowl with seasonal veggies.',
    price: 249,
    diet: 'veg',
    popular: true,
    available: true,
    addOns: [
      { id: 'ao-protein', name: 'Extra protein', price: 60 },
      { id: 'ao-dressing', name: 'Dressing on side', price: 0 },
    ],
    customizations: [
      { id: 'base', name: 'Base', options: ['Millet', 'Quinoa', 'Brown rice'] },
    ],
  },
  {
    id: 'mi-05',
    restaurantId: 'rst-02',
    name: 'Masala Dosa Duo',
    category: 'South Indian',
    description: 'Crisp dosa pair with chutney set — mock item.',
    price: 189,
    diet: 'veg',
    available: true,
    addOns: [{ id: 'ao-filter', name: 'Filter coffee', price: 70 }],
    customizations: [],
  },
  {
    id: 'mi-06',
    restaurantId: 'rst-03',
    name: 'Woodfire Margherita',
    category: 'Pizza',
    description: 'Classic tomato-basil demo pizza.',
    price: 299,
    diet: 'veg',
    popular: true,
    available: true,
    addOns: [
      { id: 'ao-cheese', name: 'Extra cheese', price: 50 },
      { id: 'ao-jal', name: 'Jalapeño', price: 30 },
    ],
    customizations: [
      { id: 'size', name: 'Size', options: ['Regular', 'Large'] },
      { id: 'crust', name: 'Crust', options: ['Thin', 'Pan'] },
    ],
  },
  {
    id: 'mi-07',
    restaurantId: 'rst-03',
    name: 'Smoky Chicken Burger',
    category: 'Burgers',
    description: 'Demo burger with mock smoked mayo.',
    price: 259,
    diet: 'nonveg',
    available: true,
    addOns: [{ id: 'ao-fries', name: 'Fries', price: 80 }],
    customizations: [
      { id: 'cook', name: 'Doneness', options: ['Regular', 'Well done'] },
    ],
  },
  {
    id: 'mi-08',
    restaurantId: 'rst-04',
    name: 'Chilli Paneer Dry',
    category: 'Starters',
    description: 'Indo-Chinese demo classic.',
    price: 229,
    diet: 'veg',
    available: true,
    addOns: [{ id: 'ao-friedrice', name: 'Half fried rice', price: 90 }],
    customizations: [
      { id: 'spice', name: 'Spice', options: ['Mild', 'Hot'] },
    ],
  },
  {
    id: 'mi-09',
    restaurantId: 'rst-04',
    name: 'Hakka Noodles',
    category: 'Mains',
    description: 'Wok-tossed noodles for demo carts.',
    price: 199,
    diet: 'veg',
    available: true,
    addOns: [{ id: 'ao-chicken', name: 'Add chicken', price: 70 }],
    customizations: [],
  },
  {
    id: 'mi-10',
    restaurantId: 'rst-01',
    name: 'Gulab Jamun Duo',
    category: 'Desserts',
    description: 'Warm demo dessert cup.',
    price: 99,
    diet: 'veg',
    available: true,
    addOns: [],
    customizations: [],
  },
];

export const demoAddresses: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    line: '12 Demo Residency, Marina Demo Zone',
  },
  {
    id: 'addr-2',
    label: 'Work',
    line: 'Floor 4, Sample Tech Park, Central Demo Zone',
  },
];

export const demoCoupons: Coupon[] = [
  {
    code: 'FLAT50',
    title: 'Flat ₹50 off',
    description: 'Mock coupon on orders above ₹299.',
    discountType: 'flat',
    value: 50,
    minOrder: 299,
  },
  {
    code: 'VEG20',
    title: '20% veg special',
    description: 'Percent off veg carts (demo).',
    discountType: 'percent',
    value: 20,
    minOrder: 199,
  },
  {
    code: 'FREEDEL',
    title: 'Free delivery',
    description: 'Waives mock delivery fee above ₹399.',
    discountType: 'flat',
    value: 40,
    minOrder: 399,
  },
];

export const demoTables = [
  { id: 'T1', seats: 2, status: 'free' as const },
  { id: 'T2', seats: 4, status: 'occupied' as const },
  { id: 'T3', seats: 4, status: 'free' as const },
  { id: 'T4', seats: 6, status: 'billing' as const },
  { id: 'T5', seats: 2, status: 'free' as const },
  { id: 'T6', seats: 8, status: 'occupied' as const },
];

export const demoStaff: StaffMember[] = [
  { id: 'st-1', name: 'Demo Manager', role: 'Manager', outlet: 'Outlet A', status: 'active' },
  { id: 'st-2', name: 'Demo Chef', role: 'Kitchen', outlet: 'Outlet A', status: 'active' },
  { id: 'st-3', name: 'Demo Waiter', role: 'Floor', outlet: 'Outlet A', status: 'active' },
  { id: 'st-4', name: 'Demo Cashier', role: 'POS', outlet: 'Outlet B', status: 'off' },
];

export const demoSuppliers: Supplier[] = [
  { id: 'sup-1', name: 'Demo Fresh Farms', category: 'Produce', phone: '90000 10001' },
  { id: 'sup-2', name: 'Demo Dairy Co', category: 'Dairy', phone: '90000 10002' },
  { id: 'sup-3', name: 'Demo Spice Hub', category: 'Dry goods', phone: '90000 10003' },
];

export const seedInventory: InventoryItem[] = [
  { id: 'inv-1', name: 'Paneer', unit: 'kg', stock: 8, reorderLevel: 5, supplierId: 'sup-2' },
  { id: 'inv-2', name: 'Basmati rice', unit: 'kg', stock: 22, reorderLevel: 10, supplierId: 'sup-3' },
  { id: 'inv-3', name: 'Chicken', unit: 'kg', stock: 4, reorderLevel: 6, supplierId: 'sup-1' },
  { id: 'inv-4', name: 'Pizza base', unit: 'pcs', stock: 40, reorderLevel: 20, supplierId: 'sup-3' },
  { id: 'inv-5', name: 'Cooking oil', unit: 'L', stock: 12, reorderLevel: 8, supplierId: 'sup-3' },
  { id: 'inv-6', name: 'Tomatoes', unit: 'kg', stock: 3, reorderLevel: 5, supplierId: 'sup-1' },
];

export const seedPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-01',
    supplierId: 'sup-1',
    items: 'Chicken 10kg, Tomatoes 15kg',
    amount: 6200,
    status: 'ordered',
    createdAt: '2026-07-20T09:00:00.000Z',
  },
  {
    id: 'po-02',
    supplierId: 'sup-2',
    items: 'Paneer 8kg',
    amount: 2800,
    status: 'received',
    createdAt: '2026-07-18T11:00:00.000Z',
  },
];

export const demoReviews: Review[] = [
  {
    id: 'rv-1',
    restaurantId: 'rst-01',
    customer: 'Demo Guest A',
    rating: 5,
    comment: 'Mock review — packaging and spice level felt right in this product demo.',
    at: '2026-07-15T18:00:00.000Z',
    demoLabel: true,
  },
  {
    id: 'rv-2',
    restaurantId: 'rst-02',
    customer: 'Demo Guest B',
    rating: 4,
    comment: 'Sample feedback for healthy bowls — not a real customer review.',
    at: '2026-07-16T12:30:00.000Z',
    demoLabel: true,
  },
  {
    id: 'rv-3',
    restaurantId: 'rst-03',
    customer: 'Demo Guest C',
    rating: 4,
    comment: 'Illustrative pizza review used only inside this Product Demo.',
    at: '2026-07-17T20:10:00.000Z',
    demoLabel: true,
  },
];

export const demoTickets: SupportTicket[] = [
  { id: 'tk-01', subject: 'Mock refund query', status: 'open', customer: 'Demo Customer' },
  { id: 'tk-02', subject: 'Delivery ETA clarification', status: 'pending', customer: 'Demo Guest A' },
  { id: 'tk-03', subject: 'Coupon not applying (demo)', status: 'resolved', customer: 'Demo Guest B' },
];

export const revenueTrend = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 38 },
  { label: 'Wed', value: 51 },
  { label: 'Thu', value: 47 },
  { label: 'Fri', value: 63 },
  { label: 'Sat', value: 78 },
  { label: 'Sun', value: 71 },
];

export const seedOrders: PlatformOrder[] = [
  {
    id: 'ord-1001',
    reference: 'UV-FD-1001',
    channel: 'delivery',
    restaurantId: 'rst-01',
    restaurantName: 'Harbor Spice Kitchen',
    customerName: 'Demo Customer',
    status: 'delivered',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    createdAt: '2026-07-21T12:10:00.000Z',
    updatedAt: '2026-07-21T13:05:00.000Z',
    items: [
      {
        key: 'seed-1',
        itemId: 'mi-02',
        restaurantId: 'rst-01',
        name: 'Chicken Dum Biryani',
        unitPrice: 349,
        qty: 1,
        diet: 'nonveg',
        addOnIds: ['ao-raita'],
        addOnLabels: ['Raita'],
        customization: { portion: 'Regular' },
        prepStatus: 'ready',
      },
    ],
    subtotal: 389,
    discount: 50,
    tax: 27,
    deliveryFee: 0,
    total: 366,
    address: '12 Demo Residency, Marina Demo Zone',
    couponCode: 'FLAT50',
    rating: 5,
    review: 'Mock delivered order used for history.',
    deliveredAt: '2026-07-21T13:05:00.000Z',
  },
  {
    id: 'ord-1002',
    reference: 'UV-FD-1002',
    channel: 'dinein',
    restaurantId: 'rst-01',
    restaurantName: 'Harbor Spice Kitchen',
    customerName: 'Table T2 Guest',
    status: 'preparing',
    paymentMethod: 'split',
    paymentStatus: 'pending',
    createdAt: '2026-07-22T10:40:00.000Z',
    updatedAt: '2026-07-22T10:45:00.000Z',
    items: [
      {
        key: 'seed-2',
        itemId: 'mi-01',
        restaurantId: 'rst-01',
        name: 'Butter Paneer Bowl',
        unitPrice: 279,
        qty: 2,
        diet: 'veg',
        addOnIds: ['ao-naan'],
        addOnLabels: ['Butter naan'],
        customization: { spice: 'Medium' },
        prepStatus: 'preparing',
      },
    ],
    subtotal: 603,
    discount: 0,
    tax: 54,
    deliveryFee: 0,
    total: 657,
    tableId: 'T2',
    kitchenNotes: 'Serve naan hot',
    acceptedAt: '2026-07-22T10:42:00.000Z',
    preparingAt: '2026-07-22T10:45:00.000Z',
  },
];

export function getRestaurant(id: string) {
  return demoRestaurants.find((r) => r.id === id);
}

export function getMenuForRestaurant(restaurantId: string) {
  return demoMenu.filter((m) => m.restaurantId === restaurantId);
}

export function calcLineTotal(line: {
  unitPrice: number;
  qty: number;
  addOnIds: string[];
  itemId: string;
}) {
  const item = demoMenu.find((m) => m.id === line.itemId);
  const addOnTotal =
    item?.addOns
      .filter((a) => line.addOnIds.includes(a.id))
      .reduce((s, a) => s + a.price, 0) ?? 0;
  return (line.unitPrice + addOnTotal) * line.qty;
}
