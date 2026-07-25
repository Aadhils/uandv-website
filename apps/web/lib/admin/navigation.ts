import type { BreadcrumbItem, WorkspaceNavSection } from '@uandv/ui';

import {
  mapNavConfigToItems,
  type NavItemConfig,
} from '@/lib/workspace/nav-config';

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
    path: '/admin/timeline',
    title: 'Business Timeline',
    subtitle: 'Lifetime timeline, health, and activity',
    breadcrumb: 'Timeline',
  },
  {
    path: '/admin/business',
    title: 'Business Dashboard',
    subtitle: 'Finance operations rollup · admin only',
    breadcrumb: 'Business',
  },
  {
    path: '/admin/quotations',
    title: 'Quotation Management',
    subtitle: 'Quotes linked to customers and projects',
    breadcrumb: 'Quotations',
  },
  {
    path: '/admin/agreements',
    title: 'Agreement Management',
    subtitle: 'Contracts and renewals · demo',
    breadcrumb: 'Agreements',
  },
  {
    path: '/admin/payments',
    title: 'Payment Tracker',
    subtitle: 'Invoices and payment status · no gateway',
    breadcrumb: 'Payments',
  },
  {
    path: '/admin/expenses',
    title: 'Expense Management',
    subtitle: 'Admin-only expense ledger',
    breadcrumb: 'Expenses',
  },
  {
    path: '/admin/settlements',
    title: 'Vendor Settlement',
    subtitle: 'Vendor payout queue · demo',
    breadcrumb: 'Settlements',
  },
  {
    path: '/admin/profit',
    title: 'Profit Dashboard',
    subtitle: 'Margin view · admin only',
    breadcrumb: 'Profit',
  },
  {
    path: '/admin/partners',
    title: 'Partner Network',
    subtitle: 'Partner directory and verification',
    breadcrumb: 'Partners',
  },
  {
    path: '/admin/partners/approvals',
    title: 'Partner Approvals',
    subtitle: 'Pending marketplace registrations · demo',
    breadcrumb: 'Approvals',
  },
  {
    path: '/admin/marketplace',
    title: 'Service Marketplace',
    subtitle: 'Service catalog · demo',
    breadcrumb: 'Marketplace',
  },
  {
    path: '/admin/assignment',
    title: 'Smart Assignment',
    subtitle: 'Search, compare, and assign partners',
    breadcrumb: 'Assignment',
  },
  {
    path: '/admin/service-requests',
    title: 'Service Requests',
    subtitle: 'Smart Matching marketplace workflow',
    breadcrumb: 'Service Requests',
  },
  {
    path: '/admin/templates',
    title: 'Business Templates',
    subtitle: 'Industry service launch packs',
    breadcrumb: 'Templates',
  },
  {
    path: '/admin/business-advisor',
    title: 'AI Requirement Analysis',
    subtitle: 'Review customer goal analyses · demo',
    breadcrumb: 'AI Requirement Analysis',
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
    title: 'Lead Management',
    subtitle: 'Live enquiries from website submissions',
    breadcrumb: 'Lead Management',
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

/** Admin Workspace sidebar — centralized enable/disable. */
export const adminNavConfig: NavItemConfig[] = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard', enabled: true },
  { label: 'Business', href: '/admin/business', icon: 'Sparkles', enabled: false, status: 'coming_soon' },
  { label: 'Customers', href: '/admin/customers', icon: 'Users', enabled: false, status: 'coming_soon' },
  { label: 'Lead Management', href: '/admin/leads/list', icon: 'ClipboardList', enabled: true },
  { label: 'Projects', href: '/admin/projects', icon: 'Briefcase', enabled: false, status: 'coming_soon' },
  { label: 'Timeline', href: '/admin/timeline', icon: 'Workflow', enabled: false, status: 'coming_soon' },
  { label: 'Quotations', href: '/admin/quotations', icon: 'FileText', enabled: false, status: 'coming_soon' },
  { label: 'Agreements', href: '/admin/agreements', icon: 'Layers', enabled: false, status: 'coming_soon' },
  { label: 'Payments', href: '/admin/payments', icon: 'Wallet', enabled: false, status: 'coming_soon' },
  { label: 'Expenses', href: '/admin/expenses', icon: 'CircleAlert', enabled: false, status: 'coming_soon' },
  { label: 'Settlements', href: '/admin/settlements', icon: 'Package', enabled: false, status: 'coming_soon' },
  { label: 'Profit', href: '/admin/profit', icon: 'TrendingUp', enabled: false, status: 'coming_soon' },
  { label: 'Partners', href: '/admin/partners', icon: 'Users', enabled: false, status: 'coming_soon' },
  { label: 'Partner Approvals', href: '/admin/partners/approvals', icon: 'Clock', enabled: false, status: 'in_development' },
  { label: 'Marketplace', href: '/admin/marketplace', icon: 'Briefcase', enabled: false, status: 'coming_soon' },
  { label: 'Assignment', href: '/admin/assignment', icon: 'Check', enabled: false, status: 'coming_soon' },
  { label: 'Service Requests', href: '/admin/service-requests', icon: 'ClipboardList', enabled: false, status: 'in_development' },
  { label: 'Templates', href: '/admin/templates', icon: 'Layers', enabled: false, status: 'coming_soon' },
  { label: 'AI Requirement Analysis', href: '/admin/business-advisor', icon: 'Sparkles', enabled: false, status: 'in_development' },
  { label: 'Work Updates', href: '/admin/work-updates', icon: 'Sparkles', enabled: false, status: 'coming_soon' },
  { label: 'Support', href: '/admin/support', icon: 'MessageCircle', enabled: false, status: 'coming_soon' },
  { label: 'Documents', href: '/admin/documents', icon: 'Layers', enabled: false, status: 'coming_soon' },
  { label: 'Notifications', href: '/admin/notifications', icon: 'Bell', enabled: false, status: 'coming_soon' },
  { label: 'Reports', href: '/admin/reports', icon: 'TrendingUp', enabled: false, status: 'coming_soon' },
];

export const adminCrmNavConfig: NavItemConfig[] = [
  { label: 'Lead Dashboard', href: '/admin/leads', icon: 'LayoutDashboard', enabled: false, status: 'in_development' },
  { label: 'Lead List', href: '/admin/leads/list', icon: 'ClipboardList', enabled: true },
  { label: 'Follow-ups', href: '/admin/leads/follow-ups', icon: 'Calendar', enabled: false, status: 'in_development' },
  { label: 'Overdue', href: '/admin/leads/overdue', icon: 'Clock', enabled: false, status: 'in_development' },
  { label: 'Follow-up History', href: '/admin/leads/follow-up-history', icon: 'FileText', enabled: false, status: 'in_development' },
  { label: 'Communications', href: '/admin/leads/communications', icon: 'Phone', enabled: false, status: 'in_development' },
  { label: 'Pipeline', href: '/admin/leads/pipeline', icon: 'Workflow', enabled: false, status: 'in_development' },
  { label: 'Newsletter', href: '/admin/leads/newsletter', icon: 'Megaphone', enabled: false, status: 'in_development' },
  { label: 'Assignments', href: '/admin/leads/assignments', icon: 'Users', enabled: false, status: 'in_development' },
  { label: 'Lead Scores', href: '/admin/leads/scores', icon: 'TrendingUp', enabled: false, status: 'in_development' },
  { label: 'CRM Reports', href: '/admin/leads/crm-reports', icon: 'TrendingUp', enabled: false, status: 'in_development' },
  { label: 'Employees', href: '/admin/employees', icon: 'Users', enabled: false, status: 'coming_soon' },
  { label: 'Permissions', href: '/admin/employees/permissions', icon: 'Settings', enabled: false, status: 'coming_soon' },
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
      items: mapNavConfigToItems(adminNavConfig, pathname, isNavActive),
    },
    {
      id: 'crm-workspace',
      title: 'Lead Management & CRM',
      items: mapNavConfigToItems(adminCrmNavConfig, pathname, isNavActive),
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

  if (pathname.startsWith('/admin/projects/new')) {
    return {
      path: pathname,
      title: 'Create Project',
      subtitle: 'Service delivery project · demo',
      breadcrumb: 'New Project',
    };
  }

  if (pathname.match(/^\/admin\/projects\/[^/]+/)) {
    const segment = pathname.split('/')[4] ?? 'overview';
    const labels: Record<string, string> = {
      overview: 'Overview',
      timeline: 'Timeline',
      tasks: 'Tasks',
      team: 'Team',
      employees: 'Employees',
      vendors: 'Vendors',
      documents: 'Documents',
      payments: 'Payments',
      approvals: 'Approvals',
      updates: 'Updates',
      activity: 'Activity',
      risks: 'Risks',
      support: 'Support',
    };
    return {
      path: pathname,
      title: `Project ${labels[segment] ?? 'Detail'}`,
      subtitle: 'Service delivery control center',
      breadcrumb: labels[segment] ?? 'Project',
    };
  }

  if (pathname.match(/^\/admin\/partners\/[^/]+/)) {
    const segment = pathname.split('/')[4] ?? 'profile';
    const labels: Record<string, string> = {
      performance: 'Performance',
      projects: 'Assigned Projects',
      payments: 'Payment Summary',
      documents: 'Documents',
      communications: 'Communication',
    };
    return {
      path: pathname,
      title: `Partner ${labels[segment] ?? 'Profile'}`,
      subtitle: 'Partner network detail',
      breadcrumb: labels[segment] ?? 'Profile',
    };
  }

  if (pathname.match(/^\/admin\/business-advisor\/[^/]+\/project-preview$/)) {
    return {
      path: pathname,
      title: 'Project Conversion Preview',
      subtitle: 'Demo conversion from requirement analysis',
      breadcrumb: 'Project Preview',
    };
  }

  if (pathname.match(/^\/admin\/business-advisor\/[^/]+$/)) {
    return {
      path: pathname,
      title: 'Analysis Review',
      subtitle: 'Customer requirement analysis detail',
      breadcrumb: 'Analysis',
    };
  }

  if (pathname.match(/^\/admin\/leads\/[^/]+$/) && pathname !== '/admin/leads/list') {
    return {
      path: pathname,
      title: 'Lead Detail',
      subtitle: 'Customer enquiry and follow-up',
      breadcrumb: 'Lead',
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
  if (pathname.startsWith('/admin/projects/') && pathname !== '/admin/projects') {
    const parts = pathname.split('/');
    const projectId = parts[3];
    const section = parts[4];
    if (pathname === '/admin/projects/new') {
      return [
        { label: 'Admin', href: '/admin' },
        { label: 'Projects', href: '/admin/projects' },
        { label: 'New' },
      ];
    }
    return [
      { label: 'Admin', href: '/admin' },
      { label: 'Projects', href: '/admin/projects' },
      {
        label: projectId,
        href: `/admin/projects/${projectId}/overview`,
      },
      ...(section ? [{ label: meta.breadcrumb }] : []),
    ];
  }
  if (pathname === '/admin/partners/approvals') {
    return [
      { label: 'Admin', href: '/admin' },
      { label: 'Partners', href: '/admin/partners' },
      { label: 'Approvals' },
    ];
  }
  if (pathname.startsWith('/admin/partners/') && pathname !== '/admin/partners') {
    const parts = pathname.split('/');
    const partnerId = parts[3];
    const section = parts[4];
    return [
      { label: 'Admin', href: '/admin' },
      { label: 'Partners', href: '/admin/partners' },
      {
        label: partnerId,
        href: `/admin/partners/${partnerId}`,
      },
      ...(section ? [{ label: meta.breadcrumb }] : []),
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
    if (pathname.startsWith('/admin/leads/') && pathname !== '/admin/leads/list') {
      const enquiryId = pathname.split('/')[3];
      return [
        { label: 'Admin', href: '/admin' },
        { label: 'Lead Management', href: '/admin/leads/list' },
        { label: enquiryId ?? 'Lead' },
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
