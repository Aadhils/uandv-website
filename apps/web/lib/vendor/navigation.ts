/**
 * Vendor Workspace navigation and route metadata — Sprint 3.0.9.
 * Assigned vendor records only — no global customer/CRM/admin access.
 */

import type { BreadcrumbItem, IconName, WorkspaceNavSection } from '@uandv/ui';

import { demoVendorUser } from './session';

export type VendorRouteMeta = {
  path: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
};

export const vendorRoutes: VendorRouteMeta[] = [
  {
    path: '/vendor',
    title: 'Vendor Dashboard',
    subtitle: 'Assigned work · deliverables · payments · demo UI',
    breadcrumb: 'Dashboard',
  },
  {
    path: '/vendor/work',
    title: 'My Work',
    subtitle: 'Assigned work orders only',
    breadcrumb: 'My Work',
  },
  {
    path: '/vendor/opportunities',
    title: 'Partner Opportunities',
    subtitle: 'Marketplace requests · accept / decline',
    breadcrumb: 'Opportunities',
  },
  {
    path: '/vendor/timeline',
    title: 'Work Timeline',
    subtitle: 'Vendor-visible delivery events',
    breadcrumb: 'Timeline',
  },
  {
    path: '/vendor/deliverables',
    title: 'Deliverables',
    subtitle: 'Submit and track reviews',
    breadcrumb: 'Deliverables',
  },
  {
    path: '/vendor/invoices',
    title: 'Invoice Center',
    subtitle: 'Raise and track invoices · demo',
    breadcrumb: 'Invoices',
  },
  {
    path: '/vendor/settlements',
    title: 'Settlements',
    subtitle: 'Your settlement status only',
    breadcrumb: 'Settlements',
  },
  {
    path: '/vendor/payments',
    title: 'Payment Status',
    subtitle: 'Approved, paid, and pending · demo',
    breadcrumb: 'Payments',
  },
  {
    path: '/vendor/documents',
    title: 'Documents',
    subtitle: 'Agreements and compliance · masked',
    breadcrumb: 'Documents',
  },
  {
    path: '/vendor/messages',
    title: 'Messages',
    subtitle: 'Admin communication timeline',
    breadcrumb: 'Messages',
  },
  {
    path: '/vendor/meetings',
    title: 'Meetings',
    subtitle: 'Upcoming and history',
    breadcrumb: 'Meetings',
  },
  {
    path: '/vendor/performance',
    title: 'Performance',
    subtitle: 'Delivery and quality · demo',
    breadcrumb: 'Performance',
  },
  {
    path: '/vendor/notifications',
    title: 'Notifications',
    subtitle: 'Assignments and reminders',
    breadcrumb: 'Notifications',
  },
  {
    path: '/vendor/profile',
    title: 'Profile',
    subtitle: 'Vendor profile · demo',
    breadcrumb: 'Profile',
  },
  {
    path: '/vendor/settings',
    title: 'Settings',
    subtitle: 'Workspace preferences · demo',
    breadcrumb: 'Settings',
  },
];

const vendorNavItems: Array<{ label: string; href: string; icon: IconName }> = [
  { label: 'Dashboard', href: '/vendor', icon: 'LayoutDashboard' },
  { label: 'My Work', href: '/vendor/work', icon: 'Briefcase' },
  { label: 'Opportunities', href: '/vendor/opportunities', icon: 'Sparkles' },
  { label: 'Timeline', href: '/vendor/timeline', icon: 'Workflow' },
  { label: 'Deliverables', href: '/vendor/deliverables', icon: 'Package' },
  { label: 'Invoices', href: '/vendor/invoices', icon: 'FileText' },
  { label: 'Settlements', href: '/vendor/settlements', icon: 'Wallet' },
  { label: 'Payments', href: '/vendor/payments', icon: 'Wallet' },
  { label: 'Documents', href: '/vendor/documents', icon: 'Layers' },
  { label: 'Messages', href: '/vendor/messages', icon: 'MessageCircle' },
  { label: 'Meetings', href: '/vendor/meetings', icon: 'Calendar' },
  { label: 'Performance', href: '/vendor/performance', icon: 'TrendingUp' },
  { label: 'Notifications', href: '/vendor/notifications', icon: 'Bell' },
  { label: 'Profile', href: '/vendor/profile', icon: 'User' },
  { label: 'Settings', href: '/vendor/settings', icon: 'Settings' },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/vendor') return pathname === '/vendor';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getVendorNavSections(pathname: string): WorkspaceNavSection[] {
  return [
    {
      id: 'vendor-workspace',
      title: 'Vendor Workspace',
      items: vendorNavItems.map((item) => ({
        ...item,
        active: isNavActive(pathname, item.href),
      })),
    },
  ];
}

export function getVendorRouteMeta(pathname: string): VendorRouteMeta {
  const exact = vendorRoutes.find((route) => route.path === pathname);
  if (exact) return exact;

  const nested = [...vendorRoutes]
    .filter((route) => route.path !== '/vendor')
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (route) =>
        pathname === route.path || pathname.startsWith(`${route.path}/`),
    );

  return (
    nested ?? {
      path: pathname,
      title: 'Vendor Workspace',
      subtitle: 'Assigned work only · demo UI',
      breadcrumb: 'Vendor',
    }
  );
}

export function getVendorBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const meta = getVendorRouteMeta(pathname);
  if (meta.path === '/vendor') {
    return [{ label: 'Vendor', href: '/vendor' }, { label: 'Dashboard' }];
  }
  return [
    { label: 'Vendor', href: '/vendor' },
    { label: meta.breadcrumb },
  ];
}

export { demoVendorUser };
