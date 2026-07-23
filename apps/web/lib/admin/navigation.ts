import type { BreadcrumbItem, IconName, WorkspaceNavSection } from '@uandv/ui';

export type AdminRouteMeta = {
  path: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
};

export const adminRoutes: AdminRouteMeta[] = [
  {
    path: '/admin',
    title: 'Admin Dashboard',
    subtitle: 'Operations overview · demo UI',
    breadcrumb: 'Dashboard',
  },
  {
    path: '/admin/customers',
    title: 'Customer Management',
    subtitle: 'Customer list and profiles',
    breadcrumb: 'Customers',
  },
  {
    path: '/admin/projects',
    title: 'Project Management',
    subtitle: 'Create, assign, and track delivery',
    breadcrumb: 'Projects',
  },
  {
    path: '/admin/payments',
    title: 'Payment Center',
    subtitle: 'Invoices and reminders · no gateway',
    breadcrumb: 'Payments',
  },
  {
    path: '/admin/work-updates',
    title: 'Work Update Center',
    subtitle: 'Push updates to customer dashboards',
    breadcrumb: 'Work Updates',
  },
  {
    path: '/admin/support',
    title: 'Support Center',
    subtitle: 'Ticket queue and replies',
    breadcrumb: 'Support',
  },
  {
    path: '/admin/documents',
    title: 'Document Center',
    subtitle: 'Agreements, files, vault status',
    breadcrumb: 'Documents',
  },
  {
    path: '/admin/notifications',
    title: 'Admin Notifications',
    subtitle: 'Ops alerts · demo only',
    breadcrumb: 'Notifications',
  },
  {
    path: '/admin/reports',
    title: 'Reports Dashboard',
    subtitle: 'Revenue, growth, and project status',
    breadcrumb: 'Reports',
  },
  // CRM / Lead Management
  {
    path: '/admin/leads',
    title: 'Lead Dashboard',
    subtitle: 'CRM overview · demo UI',
    breadcrumb: 'Leads',
  },
  {
    path: '/admin/leads/list',
    title: 'Lead List',
    subtitle: 'All leads and enquiry details',
    breadcrumb: 'Lead List',
  },
  {
    path: '/admin/leads/follow-ups',
    title: 'Follow-up Center',
    subtitle: 'Next actions and reminders',
    breadcrumb: 'Follow-ups',
  },
  {
    path: '/admin/leads/communications',
    title: 'Communication Timeline',
    subtitle: 'Calls, WhatsApp, email, notes',
    breadcrumb: 'Communications',
  },
  {
    path: '/admin/leads/pipeline',
    title: 'Lead Pipeline',
    subtitle: 'Stage board from New to Customer',
    breadcrumb: 'Pipeline',
  },
  {
    path: '/admin/leads/newsletter',
    title: 'Newsletter Center',
    subtitle: 'Campaigns, drafts, sent history',
    breadcrumb: 'Newsletter',
  },
  {
    path: '/admin/leads/assignments',
    title: 'Employee Assignment',
    subtitle: 'Assign leads by department and priority',
    breadcrumb: 'Assignments',
  },
  {
    path: '/admin/leads/scores',
    title: 'Lead Score',
    subtitle: 'Activity score and conversion probability',
    breadcrumb: 'Lead Scores',
  },
  {
    path: '/admin/leads/overdue',
    title: 'Overdue Follow-ups',
    subtitle: 'Monitor missed follow-up dates',
    breadcrumb: 'Overdue',
  },
  {
    path: '/admin/leads/follow-up-history',
    title: 'Follow-up History',
    subtitle: 'Review employee follow-up activity',
    breadcrumb: 'Follow-up History',
  },
  {
    path: '/admin/leads/crm-reports',
    title: 'CRM Reports',
    subtitle: 'Conversion and pipeline health',
    breadcrumb: 'CRM Reports',
  },
  {
    path: '/admin/employees',
    title: 'Employees',
    subtitle: 'Create, invite, and manage employees',
    breadcrumb: 'Employees',
  },
  {
    path: '/admin/employees/permissions',
    title: 'Employee Permissions',
    subtitle: 'Control employee capability access',
    breadcrumb: 'Permissions',
  },
];

const adminNavItems: Array<{ label: string; href: string; icon: IconName }> = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Customers', href: '/admin/customers', icon: 'Users' },
  { label: 'Projects', href: '/admin/projects', icon: 'Briefcase' },
  { label: 'Payments', href: '/admin/payments', icon: 'Wallet' },
  { label: 'Work Updates', href: '/admin/work-updates', icon: 'Sparkles' },
  { label: 'Support', href: '/admin/support', icon: 'MessageCircle' },
  { label: 'Documents', href: '/admin/documents', icon: 'Layers' },
  { label: 'Notifications', href: '/admin/notifications', icon: 'Bell' },
  { label: 'Reports', href: '/admin/reports', icon: 'TrendingUp' },
];

const crmNavItems: Array<{ label: string; href: string; icon: IconName }> = [
  { label: 'Lead Dashboard', href: '/admin/leads', icon: 'LayoutDashboard' },
  { label: 'Lead List', href: '/admin/leads/list', icon: 'ClipboardList' },
  { label: 'Follow-ups', href: '/admin/leads/follow-ups', icon: 'Calendar' },
  { label: 'Overdue', href: '/admin/leads/overdue', icon: 'Clock' },
  { label: 'Follow-up History', href: '/admin/leads/follow-up-history', icon: 'FileText' },
  { label: 'Communications', href: '/admin/leads/communications', icon: 'Phone' },
  { label: 'Pipeline', href: '/admin/leads/pipeline', icon: 'Workflow' },
  { label: 'Newsletter', href: '/admin/leads/newsletter', icon: 'Megaphone' },
  { label: 'Assignments', href: '/admin/leads/assignments', icon: 'Users' },
  { label: 'Lead Scores', href: '/admin/leads/scores', icon: 'TrendingUp' },
  { label: 'CRM Reports', href: '/admin/leads/crm-reports', icon: 'TrendingUp' },
  { label: 'Employees', href: '/admin/employees', icon: 'Users' },
  { label: 'Permissions', href: '/admin/employees/permissions', icon: 'Settings' },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/admin') return pathname === '/admin';
  if (href === '/admin/leads') return pathname === '/admin/leads';
  if (href === '/admin/employees') return pathname === '/admin/employees';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getAdminNavSections(pathname: string): WorkspaceNavSection[] {
  return [
    {
      id: 'admin-workspace',
      title: 'Admin Workspace',
      items: adminNavItems.map((item) => ({
        ...item,
        active: isNavActive(pathname, item.href),
      })),
    },
    {
      id: 'crm-workspace',
      title: 'Lead Management & CRM',
      items: crmNavItems.map((item) => ({
        ...item,
        active: isNavActive(pathname, item.href),
      })),
    },
  ];
}

export function getAdminRouteMeta(pathname: string): AdminRouteMeta {
  const exact = adminRoutes.find((route) => route.path === pathname);
  if (exact) return exact;

  if (pathname.startsWith('/admin/customers/')) {
    return {
      path: pathname,
      title: 'Customer Profile',
      subtitle: 'View profile and history',
      breadcrumb: 'Customer',
    };
  }

  const nested = [...adminRoutes]
    .filter((route) => route.path !== '/admin')
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (route) =>
        pathname === route.path || pathname.startsWith(`${route.path}/`),
    );

  return (
    nested ?? {
      path: pathname,
      title: 'Admin Workspace',
      subtitle: 'U&V operations foundation',
      breadcrumb: 'Admin',
    }
  );
}

export function getAdminBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const meta = getAdminRouteMeta(pathname);
  if (meta.path === '/admin') {
    return [{ label: 'Admin', href: '/admin' }, { label: 'Dashboard' }];
  }
  if (pathname.startsWith('/admin/customers/')) {
    return [
      { label: 'Admin', href: '/admin' },
      { label: 'Customers', href: '/admin/customers' },
      { label: 'Profile' },
    ];
  }
  if (pathname.startsWith('/admin/leads')) {
    if (pathname === '/admin/leads') {
      return [
        { label: 'Admin', href: '/admin' },
        { label: 'CRM' },
        { label: 'Lead Dashboard' },
      ];
    }
    return [
      { label: 'Admin', href: '/admin' },
      { label: 'CRM', href: '/admin/leads' },
      { label: meta.breadcrumb },
    ];
  }
  if (pathname.startsWith('/admin/employees')) {
    if (pathname === '/admin/employees') {
      return [
        { label: 'Admin', href: '/admin' },
        { label: 'CRM', href: '/admin/leads' },
        { label: 'Employees' },
      ];
    }
    return [
      { label: 'Admin', href: '/admin' },
      { label: 'Employees', href: '/admin/employees' },
      { label: meta.breadcrumb },
    ];
  }
  return [
    { label: 'Admin', href: '/admin' },
    { label: meta.breadcrumb },
  ];
}
