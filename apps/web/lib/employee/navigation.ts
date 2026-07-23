/**
 * Employee Workspace navigation and route metadata — Sprint 3.0.8.
 * Assigned records only — no global admin controls.
 */

import type { BreadcrumbItem, IconName, WorkspaceNavSection } from '@uandv/ui';

import { demoEmployeeUser } from './session';

export type EmployeeRouteMeta = {
  path: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
};

export const employeeRoutes: EmployeeRouteMeta[] = [
  {
    path: '/employee',
    title: 'Employee Dashboard',
    subtitle: 'Today’s work · assigned only · demo UI',
    breadcrumb: 'Dashboard',
  },
  {
    path: '/employee/follow-ups',
    title: 'Today’s Follow-ups',
    subtitle: 'Queue, notes, and next actions',
    breadcrumb: 'Follow-ups',
  },
  {
    path: '/employee/leads',
    title: 'Assigned Leads',
    subtitle: 'Your owned leads only',
    breadcrumb: 'Leads',
  },
  {
    path: '/employee/customers',
    title: 'Assigned Customers',
    subtitle: 'Your owned customers only',
    breadcrumb: 'Customers',
  },
  {
    path: '/employee/pipeline',
    title: 'Lead Pipeline',
    subtitle: 'Kanban board · assigned leads',
    breadcrumb: 'Pipeline',
  },
  {
    path: '/employee/meetings',
    title: 'Meetings',
    subtitle: 'Today, upcoming, and history',
    breadcrumb: 'Meetings',
  },
  {
    path: '/employee/tasks',
    title: 'Tasks',
    subtitle: 'Assigned by Admin',
    breadcrumb: 'Tasks',
  },
  {
    path: '/employee/timeline',
    title: 'Delivery Timeline',
    subtitle: 'Assigned project timeline · role filtered',
    breadcrumb: 'Timeline',
  },
  {
    path: '/employee/communications',
    title: 'Communications',
    subtitle: 'Calls, WhatsApp, email, meetings, notes',
    breadcrumb: 'Communications',
  },
  {
    path: '/employee/reports',
    title: 'Daily Report',
    subtitle: 'Work report and performance',
    breadcrumb: 'Daily Report',
  },
  {
    path: '/employee/notifications',
    title: 'Notifications',
    subtitle: 'Assignments and reminders',
    breadcrumb: 'Notifications',
  },
  {
    path: '/employee/profile',
    title: 'Profile',
    subtitle: 'Employee profile · demo',
    breadcrumb: 'Profile',
  },
  {
    path: '/employee/settings',
    title: 'Settings',
    subtitle: 'Workspace preferences · demo',
    breadcrumb: 'Settings',
  },
];

const employeeNavItems: Array<{ label: string; href: string; icon: IconName }> = [
  { label: 'Dashboard', href: '/employee', icon: 'LayoutDashboard' },
  { label: 'Today’s Follow-ups', href: '/employee/follow-ups', icon: 'Calendar' },
  { label: 'Leads', href: '/employee/leads', icon: 'ClipboardList' },
  { label: 'Customers', href: '/employee/customers', icon: 'Users' },
  { label: 'Pipeline', href: '/employee/pipeline', icon: 'Workflow' },
  { label: 'Meetings', href: '/employee/meetings', icon: 'Phone' },
  { label: 'Tasks', href: '/employee/tasks', icon: 'Check' },
  { label: 'Timeline', href: '/employee/timeline', icon: 'Workflow' },
  { label: 'Communications', href: '/employee/communications', icon: 'MessageCircle' },
  { label: 'Daily Report', href: '/employee/reports', icon: 'FileText' },
  { label: 'Notifications', href: '/employee/notifications', icon: 'Bell' },
  { label: 'Profile', href: '/employee/profile', icon: 'User' },
  { label: 'Settings', href: '/employee/settings', icon: 'Settings' },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/employee') return pathname === '/employee';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getEmployeeNavSections(
  pathname: string,
): WorkspaceNavSection[] {
  return [
    {
      id: 'employee-workspace',
      title: 'Employee Workspace',
      items: employeeNavItems.map((item) => ({
        ...item,
        active: isNavActive(pathname, item.href),
      })),
    },
  ];
}

export function getEmployeeRouteMeta(pathname: string): EmployeeRouteMeta {
  const exact = employeeRoutes.find((route) => route.path === pathname);
  if (exact) return exact;

  const nested = [...employeeRoutes]
    .filter((route) => route.path !== '/employee')
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (route) =>
        pathname === route.path || pathname.startsWith(`${route.path}/`),
    );

  return (
    nested ?? {
      path: pathname,
      title: 'Employee Workspace',
      subtitle: 'Assigned work only · demo UI',
      breadcrumb: 'Employee',
    }
  );
}

export function getEmployeeBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const meta = getEmployeeRouteMeta(pathname);
  if (meta.path === '/employee') {
    return [{ label: 'Employee', href: '/employee' }, { label: 'Dashboard' }];
  }
  return [
    { label: 'Employee', href: '/employee' },
    { label: meta.breadcrumb },
  ];
}

export { demoEmployeeUser };
