import type { IconName } from '@uandv/ui';

import type { TravelRole } from './types';

export type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  roles: TravelRole[];
};

export const travelNav: NavItem[] = [
  {
    href: '/demo/travel/portal',
    label: 'Customer Portal',
    icon: 'Home',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/flights',
    label: 'Flight Booking',
    icon: 'Plane',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/trains',
    label: 'Train Booking',
    icon: 'Truck',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/buses',
    label: 'Bus Booking',
    icon: 'Car',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/hotels',
    label: 'Hotel Booking',
    icon: 'Hotel',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/packages',
    label: 'Holiday Packages',
    icon: 'Package',
    roles: ['traveler', 'agent'],
  },
  {
    href: '/demo/travel/visa',
    label: 'Visa Assistance',
    icon: 'FileText',
    roles: ['traveler', 'agent'],
  },
  {
    href: '/demo/travel/insurance',
    label: 'Travel Insurance',
    icon: 'HeartPulse',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/car-rental',
    label: 'Car Rental',
    icon: 'Car',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/sightseeing',
    label: 'Local Sightseeing',
    icon: 'MapPin',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/bookings',
    label: 'Booking History',
    icon: 'ClipboardList',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/wallet',
    label: 'Wallet',
    icon: 'Wallet',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/offers',
    label: 'Offers',
    icon: 'Sparkles',
    roles: ['traveler'],
  },
  {
    href: '/demo/travel/admin',
    label: 'Revenue Dashboard',
    icon: 'Layers',
    roles: ['admin'],
  },
  {
    href: '/demo/travel/admin/customers',
    label: 'Customers',
    icon: 'Users',
    roles: ['admin'],
  },
  {
    href: '/demo/travel/admin/bookings',
    label: 'Bookings',
    icon: 'ClipboardList',
    roles: ['admin'],
  },
  {
    href: '/demo/travel/admin/packages',
    label: 'Packages',
    icon: 'Package',
    roles: ['admin'],
  },
  {
    href: '/demo/travel/admin/hotels',
    label: 'Hotels',
    icon: 'Hotel',
    roles: ['admin'],
  },
  {
    href: '/demo/travel/admin/flights',
    label: 'Flights',
    icon: 'Plane',
    roles: ['admin'],
  },
  {
    href: '/demo/travel/admin/reports',
    label: 'Reports',
    icon: 'FileText',
    roles: ['admin'],
  },
  {
    href: '/demo/travel/agent',
    label: 'Agent Dashboard',
    icon: 'Briefcase',
    roles: ['agent'],
  },
  {
    href: '/demo/travel/agent/requests',
    label: 'Booking Requests',
    icon: 'Bell',
    roles: ['agent'],
  },
  {
    href: '/demo/travel/agent/customers',
    label: 'Customer Management',
    icon: 'Users',
    roles: ['agent'],
  },
  {
    href: '/demo/travel/agent/commission',
    label: 'Commission',
    icon: 'Wallet',
    roles: ['agent'],
  },
  {
    href: '/demo/travel/agent/payments',
    label: 'Payment Status',
    icon: 'CreditCard',
    roles: ['agent'],
  },
];

export function getNavForRole(role: TravelRole) {
  return travelNav.filter((item) => item.roles.includes(role));
}
