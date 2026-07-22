import type { IconName } from '@uandv/ui';

import type { RestaurantRole } from './types';

export type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  roles: RestaurantRole[];
};

export const restaurantNav: NavItem[] = [
  // Customer
  { href: '/demo/restaurant-platform/customer', label: 'Restaurants', icon: 'Home', roles: ['customer'] },
  { href: '/demo/restaurant-platform/customer/cart', label: 'Cart', icon: 'ShoppingCart', roles: ['customer'] },
  { href: '/demo/restaurant-platform/customer/orders', label: 'Order History', icon: 'ClipboardList', roles: ['customer'] },
  { href: '/demo/restaurant-platform/customer/offers', label: 'Offers', icon: 'Sparkles', roles: ['customer'] },
  { href: '/demo/restaurant-platform/dine-in', label: 'Dine-in / QR', icon: 'UtensilsCrossed', roles: ['customer', 'restaurant'] },
  // Manager
  { href: '/demo/restaurant-platform/manager', label: 'Manager Dashboard', icon: 'Layers', roles: ['restaurant'] },
  { href: '/demo/restaurant-platform/manager/orders', label: 'Orders', icon: 'ClipboardList', roles: ['restaurant'] },
  { href: '/demo/restaurant-platform/manager/menu', label: 'Menu', icon: 'Package', roles: ['restaurant'] },
  { href: '/demo/restaurant-platform/manager/staff', label: 'Staff', icon: 'Users', roles: ['restaurant'] },
  { href: '/demo/restaurant-platform/manager/offers', label: 'Offers', icon: 'Sparkles', roles: ['restaurant'] },
  { href: '/demo/restaurant-platform/manager/reviews', label: 'Reviews', icon: 'MessageCircle', roles: ['restaurant'] },
  { href: '/demo/restaurant-platform/manager/reports', label: 'Sales Reports', icon: 'FileText', roles: ['restaurant'] },
  { href: '/demo/restaurant-platform/pos', label: 'POS', icon: 'CreditCard', roles: ['restaurant', 'admin'] },
  { href: '/demo/restaurant-platform/inventory', label: 'Inventory', icon: 'Database', roles: ['restaurant', 'admin'] },
  // Kitchen
  { href: '/demo/restaurant-platform/kitchen', label: 'Kitchen Display', icon: 'UtensilsCrossed', roles: ['kitchen'] },
  // Delivery
  { href: '/demo/restaurant-platform/delivery', label: 'Delivery Home', icon: 'Bike', roles: ['delivery'] },
  { href: '/demo/restaurant-platform/delivery/history', label: 'Delivery History', icon: 'ClipboardList', roles: ['delivery'] },
  { href: '/demo/restaurant-platform/delivery/wallet', label: 'Wallet & Incentives', icon: 'Wallet', roles: ['delivery'] },
  // Admin
  { href: '/demo/restaurant-platform/admin', label: 'Admin Dashboard', icon: 'Layers', roles: ['admin'] },
  { href: '/demo/restaurant-platform/admin/restaurants', label: 'Restaurants', icon: 'Store', roles: ['admin'] },
  { href: '/demo/restaurant-platform/admin/customers', label: 'Customers', icon: 'Users', roles: ['admin'] },
  { href: '/demo/restaurant-platform/admin/orders', label: 'All Orders', icon: 'ClipboardList', roles: ['admin'] },
  { href: '/demo/restaurant-platform/admin/partners', label: 'Delivery Partners', icon: 'Bike', roles: ['admin'] },
  { href: '/demo/restaurant-platform/admin/settings', label: 'Platform Settings', icon: 'Settings', roles: ['admin'] },
  { href: '/demo/restaurant-platform/admin/support', label: 'Support & Refunds', icon: 'MessageCircle', roles: ['admin'] },
];

export function getNavForRole(role: RestaurantRole) {
  return restaurantNav.filter((item) => item.roles.includes(role));
}
