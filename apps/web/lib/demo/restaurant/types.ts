export type RestaurantRole =
  | 'customer'
  | 'restaurant'
  | 'kitchen'
  | 'delivery'
  | 'admin';

export const RESTAURANT_DEMO_STORAGE_KEY = 'uandv-restaurant-platform-session-v1';
export const RESTAURANT_DEMO_ORDERS_KEY = 'uandv-restaurant-platform-orders-v1';
export const RESTAURANT_DEMO_CART_KEY = 'uandv-restaurant-platform-cart-v1';
export const RESTAURANT_DEMO_INVENTORY_KEY = 'uandv-restaurant-platform-inventory-v1';
export const RESTAURANT_DEMO_DELIVERY_KEY = 'uandv-restaurant-platform-delivery-v1';
export const RESTAURANT_DEMO_POS_HOLD_KEY = 'uandv-restaurant-platform-pos-hold-v1';

export const RESTAURANT_CREDENTIALS: Record<
  RestaurantRole,
  { email: string; password: string; name: string }
> = {
  customer: {
    email: 'customer@uandv.com',
    password: 'customer123',
    name: 'Demo Customer',
  },
  restaurant: {
    email: 'restaurant@uandv.com',
    password: 'restaurant123',
    name: 'Demo Restaurant Manager',
  },
  kitchen: {
    email: 'kitchen@uandv.com',
    password: 'kitchen123',
    name: 'Demo Kitchen Staff',
  },
  delivery: {
    email: 'delivery@uandv.com',
    password: 'delivery123',
    name: 'Demo Delivery Partner',
  },
  admin: {
    email: 'admin@uandv.com',
    password: 'admin123',
    name: 'Demo Platform Admin',
  },
};

export type RestaurantSession = {
  role: RestaurantRole;
  name: string;
  email: string;
  loggedInAt: string;
};

export type DietType = 'veg' | 'nonveg' | 'egg';

export type OrderChannel = 'delivery' | 'takeaway' | 'dinein' | 'pos';

export type OrderStatus =
  | 'placed'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'assigned'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'held';

export type ItemPrepStatus = 'queued' | 'preparing' | 'ready';

export type PaymentMethod = 'upi' | 'card' | 'wallet' | 'cod' | 'cash' | 'split';

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  diet: DietType;
  popular?: boolean;
  available: boolean;
  addOns: { id: string; name: string; price: number }[];
  customizations: { id: string; name: string; options: string[] }[];
};

export type RestaurantListing = {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviews: number;
  etaMins: number;
  costForTwo: number;
  area: string;
  outlet: string;
  vegOnly: boolean;
  imageTone: string;
  offers: string[];
};

export type CartLine = {
  key: string;
  itemId: string;
  restaurantId: string;
  name: string;
  unitPrice: number;
  qty: number;
  diet: DietType;
  addOnIds: string[];
  addOnLabels: string[];
  customization: Record<string, string>;
  notes?: string;
};

export type OrderLine = CartLine & {
  prepStatus: ItemPrepStatus;
};

export type PlatformOrder = {
  id: string;
  reference: string;
  channel: OrderChannel;
  restaurantId: string;
  restaurantName: string;
  customerName: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cod';
  createdAt: string;
  updatedAt: string;
  items: OrderLine[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  address?: string;
  tableId?: string;
  couponCode?: string;
  kitchenNotes?: string;
  priority?: boolean;
  deliveryPartnerId?: string | null;
  otp?: string;
  rating?: number;
  review?: string;
  acceptedAt?: string;
  preparingAt?: string;
  readyAt?: string;
  assignedAt?: string;
  outAt?: string;
  deliveredAt?: string;
};

export type Address = {
  id: string;
  label: string;
  line: string;
};

export type Coupon = {
  code: string;
  title: string;
  description: string;
  discountType: 'percent' | 'flat';
  value: number;
  minOrder: number;
};

export type InventoryItem = {
  id: string;
  name: string;
  unit: string;
  stock: number;
  reorderLevel: number;
  supplierId: string;
};

export type Supplier = {
  id: string;
  name: string;
  category: string;
  phone: string;
};

export type PurchaseOrder = {
  id: string;
  supplierId: string;
  items: string;
  amount: number;
  status: 'draft' | 'ordered' | 'received';
  createdAt: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  outlet: string;
  status: 'active' | 'off';
};

export type Review = {
  id: string;
  restaurantId: string;
  customer: string;
  rating: number;
  comment: string;
  at: string;
  demoLabel: true;
};

export type SupportTicket = {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  customer: string;
};

export type PosHold = {
  id: string;
  label: string;
  channel: OrderChannel;
  tableId?: string;
  items: CartLine[];
  discount: number;
  createdAt: string;
};

export type DeliveryPartnerState = {
  online: boolean;
  wallet: number;
  earningsToday: number;
  rating: number;
  incentives: number;
};

export function homeForRole(role: RestaurantRole): string {
  switch (role) {
    case 'customer':
      return '/demo/restaurant-platform/customer';
    case 'restaurant':
      return '/demo/restaurant-platform/manager';
    case 'kitchen':
      return '/demo/restaurant-platform/kitchen';
    case 'delivery':
      return '/demo/restaurant-platform/delivery';
    case 'admin':
      return '/demo/restaurant-platform/admin';
  }
}
