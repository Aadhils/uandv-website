import type { IconName } from '@uandv/ui';

import type { DemoRole } from './types';

export type ErpNavItem = {
  label: string;
  href: string;
  icon: IconName;
  roles: DemoRole[];
};

export type ErpNavGroup = {
  label: string;
  items: ErpNavItem[];
};

export const erpDemoNav: ErpNavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Dashboard',
        href: '/demo/erp/dashboard',
        icon: 'Layers',
        roles: ['admin', 'sales', 'hr'],
      },
    ],
  },
  {
    label: 'Customer',
    items: [
      {
        label: 'Customer List',
        href: '/demo/erp/customers',
        icon: 'Users',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Leads',
        href: '/demo/erp/leads',
        icon: 'Megaphone',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Follow-up',
        href: '/demo/erp/follow-ups',
        icon: 'MessageCircle',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Quotations',
        href: '/demo/erp/quotations',
        icon: 'FileText',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Sales Orders',
        href: '/demo/erp/sales-orders',
        icon: 'ShoppingCart',
        roles: ['admin', 'sales'],
      },
    ],
  },
  {
    label: 'CRM',
    items: [
      {
        label: 'Pipeline',
        href: '/demo/erp/pipeline',
        icon: 'Workflow',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Deals',
        href: '/demo/erp/deals',
        icon: 'Briefcase',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Tasks',
        href: '/demo/erp/tasks',
        icon: 'Check',
        roles: ['admin', 'sales', 'hr'],
      },
      {
        label: 'Calendar',
        href: '/demo/erp/calendar',
        icon: 'Calendar',
        roles: ['admin', 'sales', 'hr'],
      },
      {
        label: 'Notes',
        href: '/demo/erp/notes',
        icon: 'ClipboardList',
        roles: ['admin', 'sales', 'hr'],
      },
      {
        label: 'Email Timeline',
        href: '/demo/erp/email-timeline',
        icon: 'Mail',
        roles: ['admin', 'sales'],
      },
    ],
  },
  {
    label: 'HR',
    items: [
      {
        label: 'Employees',
        href: '/demo/erp/employees',
        icon: 'User',
        roles: ['admin', 'hr'],
      },
      {
        label: 'Attendance',
        href: '/demo/erp/attendance',
        icon: 'ClipboardList',
        roles: ['admin', 'hr'],
      },
      {
        label: 'Leave Management',
        href: '/demo/erp/leave',
        icon: 'Calendar',
        roles: ['admin', 'hr'],
      },
      {
        label: 'Payroll Overview',
        href: '/demo/erp/payroll',
        icon: 'Wallet',
        roles: ['admin', 'hr'],
      },
    ],
  },
  {
    label: 'Inventory',
    items: [
      {
        label: 'Products',
        href: '/demo/erp/products',
        icon: 'Package',
        roles: ['admin'],
      },
      {
        label: 'Categories',
        href: '/demo/erp/categories',
        icon: 'Layers',
        roles: ['admin'],
      },
      {
        label: 'Stock',
        href: '/demo/erp/stock',
        icon: 'Database',
        roles: ['admin'],
      },
      {
        label: 'Purchase',
        href: '/demo/erp/purchase',
        icon: 'Truck',
        roles: ['admin'],
      },
      {
        label: 'Suppliers',
        href: '/demo/erp/suppliers',
        icon: 'Store',
        roles: ['admin'],
      },
    ],
  },
  {
    label: 'Accounting',
    items: [
      {
        label: 'Income',
        href: '/demo/erp/income',
        icon: 'Wallet',
        roles: ['admin'],
      },
      {
        label: 'Expense',
        href: '/demo/erp/expense',
        icon: 'CreditCard',
        roles: ['admin'],
      },
      {
        label: 'Invoice',
        href: '/demo/erp/invoices',
        icon: 'FileText',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Payment',
        href: '/demo/erp/payments',
        icon: 'CreditCard',
        roles: ['admin'],
      },
      {
        label: 'Profit & Loss',
        href: '/demo/erp/profit-loss',
        icon: 'Workflow',
        roles: ['admin'],
      },
    ],
  },
  {
    label: 'Reports',
    items: [
      {
        label: 'Sales Reports',
        href: '/demo/erp/reports/sales',
        icon: 'FileText',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Customer Reports',
        href: '/demo/erp/reports/customers',
        icon: 'Users',
        roles: ['admin', 'sales'],
      },
      {
        label: 'Inventory Reports',
        href: '/demo/erp/reports/inventory',
        icon: 'Package',
        roles: ['admin'],
      },
    ],
  },
  {
    label: 'Admin',
    items: [
      {
        label: 'Users',
        href: '/demo/erp/users',
        icon: 'Users',
        roles: ['admin'],
      },
      {
        label: 'Roles',
        href: '/demo/erp/roles',
        icon: 'HardHat',
        roles: ['admin'],
      },
      {
        label: 'Permissions',
        href: '/demo/erp/permissions',
        icon: 'Eye',
        roles: ['admin'],
      },
      {
        label: 'Settings',
        href: '/demo/erp/settings',
        icon: 'Settings',
        roles: ['admin', 'sales', 'hr'],
      },
    ],
  },
];

export function getNavForRole(role: DemoRole) {
  return erpDemoNav
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0);
}
