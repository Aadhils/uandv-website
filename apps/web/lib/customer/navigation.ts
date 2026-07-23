import type { BreadcrumbItem, IconName, WorkspaceNavSection } from '@uandv/ui';

export type CustomerRouteMeta = {
  path: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
};

export const customerRoutes: CustomerRouteMeta[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    subtitle: 'Customer Business Workspace overview',
    breadcrumb: 'Overview',
  },
  {
    path: '/dashboard/projects',
    title: 'My Projects',
    subtitle: 'Progress, milestones, and timelines',
    breadcrumb: 'Projects',
  },
  {
    path: '/dashboard/quotations',
    title: 'Quotations',
    subtitle: 'Your quotations only',
    breadcrumb: 'Quotations',
  },
  {
    path: '/dashboard/payments',
    title: 'Payments',
    subtitle: 'Invoices and payment status — UI only',
    breadcrumb: 'Payments',
  },
  {
    path: '/dashboard/agreements',
    title: 'Agreements',
    subtitle: 'Contracts and digital trust placeholders',
    breadcrumb: 'Agreements',
  },
  {
    path: '/dashboard/documents',
    title: 'Documents',
    subtitle: 'Files, versions, and audit placeholders',
    breadcrumb: 'Documents',
  },
  {
    path: '/dashboard/timeline',
    title: 'Timeline',
    subtitle: 'Lifetime business timeline · role-filtered',
    breadcrumb: 'Timeline',
  },
  {
    path: '/dashboard/assets',
    title: 'My Assets',
    subtitle: 'Digital properties managed with U&V',
    breadcrumb: 'Assets',
  },
  {
    path: '/dashboard/support',
    title: 'Support',
    subtitle: 'Tickets and conversation placeholders',
    breadcrumb: 'Support',
  },
  {
    path: '/dashboard/notifications',
    title: 'Notifications',
    subtitle: 'Alerts and reminders',
    breadcrumb: 'Notifications',
  },
  {
    path: '/dashboard/profile',
    title: 'Profile',
    subtitle: 'Personal and business details',
    breadcrumb: 'Profile',
  },
  {
    path: '/dashboard/settings',
    title: 'Settings',
    subtitle: 'Preferences and security placeholders',
    breadcrumb: 'Settings',
  },
  // Secondary routes remain reachable; not shown in primary sidebar
  {
    path: '/dashboard/updates',
    title: 'Work Updates',
    subtitle: 'Delivery feed from U&V teams',
    breadcrumb: 'Updates',
  },
  {
    path: '/dashboard/requests',
    title: 'Service Requests',
    subtitle: 'Ask for new work or changes',
    breadcrumb: 'Requests',
  },
  {
    path: '/dashboard/admin-preview',
    title: 'Admin Preview',
    subtitle: 'Operations UI foundation · not production admin',
    breadcrumb: 'Admin Preview',
  },
];

/** Primary Customer Business Workspace sidebar (Sprint 3.0.5). */
const customerNavItems: Array<{
  label: string;
  href: string;
  icon: IconName;
}> = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'My Projects', href: '/dashboard/projects', icon: 'Briefcase' },
  { label: 'Quotations', href: '/dashboard/quotations', icon: 'FileText' },
  { label: 'Payments', href: '/dashboard/payments', icon: 'Wallet' },
  { label: 'Agreements', href: '/dashboard/agreements', icon: 'FileText' },
  { label: 'Documents', href: '/dashboard/documents', icon: 'Layers' },
  { label: 'Timeline', href: '/dashboard/timeline', icon: 'Workflow' },
  { label: 'My Assets', href: '/dashboard/assets', icon: 'Package' },
  { label: 'Support', href: '/dashboard/support', icon: 'MessageCircle' },
  { label: 'Notifications', href: '/dashboard/notifications', icon: 'Bell' },
  { label: 'Profile', href: '/dashboard/profile', icon: 'User' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === '/dashboard';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getCustomerNavSections(
  pathname: string,
): WorkspaceNavSection[] {
  return [
    {
      id: 'customer-workspace',
      title: 'Customer Workspace',
      items: customerNavItems.map((item) => ({
        ...item,
        active: isNavActive(pathname, item.href),
      })),
    },
  ];
}

export function getCustomerRouteMeta(pathname: string): CustomerRouteMeta {
  const exact = customerRoutes.find((route) => route.path === pathname);
  if (exact) return exact;

  const nested = [...customerRoutes]
    .filter((route) => route.path !== '/dashboard')
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (route) =>
        pathname === route.path || pathname.startsWith(`${route.path}/`),
    );

  return (
    nested ?? {
      path: pathname,
      title: 'Customer Workspace',
      subtitle: 'U&V Business Workspace',
      breadcrumb: 'Workspace',
    }
  );
}

export function getCustomerBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const meta = getCustomerRouteMeta(pathname);
  if (meta.path === '/dashboard') {
    return [
      { label: 'Customer', href: '/dashboard' },
      { label: 'Overview' },
    ];
  }
  return [
    { label: 'Customer', href: '/dashboard' },
    { label: meta.breadcrumb },
  ];
}
