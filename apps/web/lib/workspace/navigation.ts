import type { WorkspaceNavSection } from '@uandv/ui';

/**
 * Placeholder navigation for the Universal Dashboard Foundation.
 * Future Customer / Vendor / Partner / Employee / Admin workspaces
 * will swap or extend these sections — no business logic yet.
 */
export const workspaceNavSections: WorkspaceNavSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        active: true,
      },
      {
        label: 'Activity',
        href: '/dashboard/activity',
        icon: 'ClipboardList',
        disabled: true,
      },
      {
        label: 'Messages',
        href: '/dashboard/messages',
        icon: 'MessageCircle',
        disabled: true,
      },
    ],
  },
  {
    id: 'workspaces',
    title: 'Workspaces',
    items: [
      {
        label: 'Customer',
        href: '/dashboard/customer',
        icon: 'Users',
        disabled: true,
      },
      {
        label: 'Vendor',
        href: '/dashboard/vendor',
        icon: 'Store',
        disabled: true,
      },
      {
        label: 'Partner',
        href: '/dashboard/partner',
        icon: 'Handshake',
        disabled: true,
      },
      {
        label: 'Employee',
        href: '/dashboard/employee',
        icon: 'Briefcase',
        disabled: true,
      },
      {
        label: 'Admin',
        href: '/dashboard/admin',
        icon: 'Settings',
        disabled: true,
      },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    items: [
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: 'Settings',
        disabled: true,
      },
    ],
  },
];

export function getWorkspaceNavSections(
  pathname: string,
): WorkspaceNavSection[] {
  return workspaceNavSections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      active: !item.disabled && pathname === item.href,
    })),
  }));
}
