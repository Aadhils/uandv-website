import type { IconName } from '@uandv/ui';

import type { DemoRole } from './types';

export type SuiteNavItem = {
  label: string;
  href: string;
  icon: IconName;
  roles: DemoRole[];
};

export type SuiteNavGroup = {
  label: string;
  items: SuiteNavItem[];
};

const A: DemoRole[] = ['admin'];
const AS: DemoRole[] = ['admin', 'sales'];
const AH: DemoRole[] = ['admin', 'hr'];
const AT: DemoRole[] = ['admin', 'travel'];
const ASH: DemoRole[] = ['admin', 'sales', 'hr'];
const ALL: DemoRole[] = ['admin', 'sales', 'hr', 'travel'];
const AST: DemoRole[] = ['admin', 'sales', 'travel'];

export const suiteDemoNav: SuiteNavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Main Dashboard', href: '/demo/enterprise-suite/dashboard', icon: 'Layers', roles: ASH },
      { label: 'Travel Dashboard', href: '/demo/enterprise-suite/travel', icon: 'Plane', roles: AT },
    ],
  },
  {
    label: 'CRM',
    items: [
      { label: 'Leads', href: '/demo/enterprise-suite/crm/leads', icon: 'Megaphone', roles: AS },
      { label: 'Customers', href: '/demo/enterprise-suite/crm/customers', icon: 'Users', roles: AS },
      { label: 'Pipeline', href: '/demo/enterprise-suite/crm/pipeline', icon: 'Workflow', roles: AS },
      { label: 'Deals', href: '/demo/enterprise-suite/crm/deals', icon: 'Briefcase', roles: AS },
      { label: 'Follow-ups', href: '/demo/enterprise-suite/crm/follow-ups', icon: 'MessageCircle', roles: AS },
      { label: 'Quotations', href: '/demo/enterprise-suite/crm/quotations', icon: 'FileText', roles: AS },
      { label: 'Sales Orders', href: '/demo/enterprise-suite/crm/sales-orders', icon: 'ShoppingCart', roles: AS },
      { label: 'Tasks', href: '/demo/enterprise-suite/crm/tasks', icon: 'Check', roles: ASH },
      { label: 'Calendar', href: '/demo/enterprise-suite/crm/calendar', icon: 'Calendar', roles: ASH },
      { label: 'Notes', href: '/demo/enterprise-suite/crm/notes', icon: 'ClipboardList', roles: ASH },
      { label: 'Communications', href: '/demo/enterprise-suite/crm/communications', icon: 'Mail', roles: AS },
      { label: 'Lead Sources', href: '/demo/enterprise-suite/crm/lead-sources', icon: 'Network', roles: AS },
    ],
  },
  {
    label: 'Travel',
    items: [
      { label: 'Packages', href: '/demo/enterprise-suite/travel/packages', icon: 'Globe', roles: AT },
      { label: 'New Package', href: '/demo/enterprise-suite/travel/packages/new', icon: 'Plus', roles: AT },
      { label: 'Bookings', href: '/demo/enterprise-suite/travel/bookings', icon: 'Calendar', roles: AT },
      { label: 'New Booking', href: '/demo/enterprise-suite/travel/bookings/new', icon: 'Plus', roles: AT },
      { label: 'Itinerary Builder', href: '/demo/enterprise-suite/travel/itinerary', icon: 'MapPin', roles: AT },
      { label: 'Hotels', href: '/demo/enterprise-suite/travel/hotels', icon: 'Hotel', roles: AT },
      { label: 'Transport', href: '/demo/enterprise-suite/travel/transport', icon: 'Car', roles: AT },
      { label: 'Flights & Trains', href: '/demo/enterprise-suite/travel/flights-trains', icon: 'Plane', roles: AT },
      { label: 'Visa', href: '/demo/enterprise-suite/travel/visa', icon: 'FileText', roles: AT },
      { label: 'Agents', href: '/demo/enterprise-suite/travel/agents', icon: 'Users', roles: AT },
      { label: 'Suppliers', href: '/demo/enterprise-suite/travel/suppliers', icon: 'Store', roles: AT },
      { label: 'Travel Comms', href: '/demo/enterprise-suite/travel/communications', icon: 'MessageCircle', roles: AT },
      { label: 'Travel Reports', href: '/demo/enterprise-suite/travel/reports', icon: 'FileText', roles: AT },
    ],
  },
  {
    label: 'HR',
    items: [
      { label: 'Employees', href: '/demo/enterprise-suite/hr/employees', icon: 'User', roles: AH },
      { label: 'Departments', href: '/demo/enterprise-suite/hr/departments', icon: 'Building2', roles: AH },
      { label: 'Attendance', href: '/demo/enterprise-suite/hr/attendance', icon: 'ClipboardList', roles: AH },
      { label: 'Leave', href: '/demo/enterprise-suite/hr/leave', icon: 'Calendar', roles: AH },
      { label: 'Payroll', href: '/demo/enterprise-suite/hr/payroll', icon: 'Wallet', roles: AH },
      { label: 'Employee Profile', href: '/demo/enterprise-suite/hr/profile', icon: 'User', roles: AH },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { label: 'Products', href: '/demo/enterprise-suite/inventory/products', icon: 'Package', roles: A },
      { label: 'Categories', href: '/demo/enterprise-suite/inventory/categories', icon: 'Layers', roles: A },
      { label: 'Stock', href: '/demo/enterprise-suite/inventory/stock', icon: 'Database', roles: A },
      { label: 'Purchase Orders', href: '/demo/enterprise-suite/inventory/purchase', icon: 'Truck', roles: A },
      { label: 'Suppliers', href: '/demo/enterprise-suite/inventory/suppliers', icon: 'Store', roles: A },
    ],
  },
  {
    label: 'Accounting',
    items: [
      { label: 'Income', href: '/demo/enterprise-suite/accounting/income', icon: 'Wallet', roles: A },
      { label: 'Expenses', href: '/demo/enterprise-suite/accounting/expenses', icon: 'CreditCard', roles: A },
      { label: 'Invoices', href: '/demo/enterprise-suite/accounting/invoices', icon: 'FileText', roles: AS },
      { label: 'Payments', href: '/demo/enterprise-suite/accounting/payments', icon: 'CreditCard', roles: A },
      { label: 'Receipts', href: '/demo/enterprise-suite/accounting/receipts', icon: 'FileText', roles: A },
      { label: 'Outstanding', href: '/demo/enterprise-suite/accounting/outstanding', icon: 'CircleAlert', roles: AST },
      { label: 'Profit & Loss', href: '/demo/enterprise-suite/accounting/profit-loss', icon: 'Workflow', roles: A },
      { label: 'Travel Payments', href: '/demo/enterprise-suite/accounting/travel-payments', icon: 'Plane', roles: AT },
      { label: 'Supplier Payments', href: '/demo/enterprise-suite/accounting/supplier-payments', icon: 'Truck', roles: AT },
      { label: 'Agent Commissions', href: '/demo/enterprise-suite/accounting/agent-commissions', icon: 'Wallet', roles: AT },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Users', href: '/demo/enterprise-suite/admin/users', icon: 'Users', roles: A },
      { label: 'Roles', href: '/demo/enterprise-suite/admin/roles', icon: 'HardHat', roles: A },
      { label: 'Permissions', href: '/demo/enterprise-suite/admin/permissions', icon: 'Eye', roles: A },
      { label: 'Company Settings', href: '/demo/enterprise-suite/admin/settings', icon: 'Settings', roles: ALL },
      { label: 'Branches', href: '/demo/enterprise-suite/admin/branches', icon: 'Building2', roles: A },
      { label: 'Currency', href: '/demo/enterprise-suite/admin/currency', icon: 'Wallet', roles: A },
      { label: 'Tax', href: '/demo/enterprise-suite/admin/tax', icon: 'FileText', roles: A },
      { label: 'Notifications', href: '/demo/enterprise-suite/admin/notifications', icon: 'Bell', roles: A },
      { label: 'Audit Log', href: '/demo/enterprise-suite/admin/audit', icon: 'ClipboardList', roles: A },
    ],
  },
];

export function getNavForRole(role: DemoRole) {
  return suiteDemoNav
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0);
}

export function roleCanAccess(role: DemoRole, pathname: string) {
  if (pathname === '/demo/enterprise-suite/dashboard' && role !== 'travel') return true;
  if (pathname.startsWith('/demo/enterprise-suite/crm/customers/')) return role === 'admin' || role === 'sales';
  return getNavForRole(role).some((group) =>
    group.items.some(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    ),
  );
}
