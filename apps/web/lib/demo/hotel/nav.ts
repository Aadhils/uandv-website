import type { IconName } from '@uandv/ui';

import type { HotelRole } from './types';

export type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  roles: HotelRole[];
};

export const hotelNav: NavItem[] = [
  {
    href: '/demo/hotel-management/dashboard',
    label: 'Dashboard',
    icon: 'Home',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/rooms',
    label: 'Room inventory',
    icon: 'Hotel',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/room-types',
    label: 'Room types',
    icon: 'Layers',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/availability',
    label: 'Availability',
    icon: 'Calendar',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/guests',
    label: 'Guest profiles',
    icon: 'Users',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/reservations',
    label: 'Reservations',
    icon: 'ClipboardList',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/reservations/new',
    label: 'New reservation',
    icon: 'Plus',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/check-in',
    label: 'Check-in',
    icon: 'Check',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/check-out',
    label: 'Check-out',
    icon: 'ArrowRight',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/billing',
    label: 'Billing',
    icon: 'CreditCard',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/housekeeping',
    label: 'Housekeeping',
    icon: 'Sparkles',
    roles: ['admin', 'reception', 'housekeeping'],
  },
  {
    href: '/demo/hotel-management/maintenance',
    label: 'Maintenance',
    icon: 'Wrench',
    roles: ['admin', 'reception', 'housekeeping'],
  },
  {
    href: '/demo/hotel-management/staff',
    label: 'Staff tasks',
    icon: 'Briefcase',
    roles: ['admin', 'reception'],
  },
  {
    href: '/demo/hotel-management/reports',
    label: 'Reports',
    icon: 'FileText',
    roles: ['admin'],
  },
  {
    href: '/demo/hotel-management/guest',
    label: 'My stay',
    icon: 'User',
    roles: ['guest'],
  },
  {
    href: '/demo/hotel-management/guest/bookings',
    label: 'Booking history',
    icon: 'ClipboardList',
    roles: ['guest'],
  },
];

export function getNavForRole(role: HotelRole) {
  return hotelNav.filter((item) => item.roles.includes(role));
}
