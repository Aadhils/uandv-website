import type {
  AdminActivity,
  AdminCustomer,
  AdminDashboardMetrics,
  AdminDocument,
  AdminInvoice,
  AdminMilestone,
  AdminNotification,
  AdminProject,
  AdminReportPoint,
  AdminTicket,
  AdminWorkUpdate,
} from './types';

export const demoAdminUser = {
  name: 'Arun Kumar',
  role: 'Admin · Demo',
};

export const demoAdminMetrics: AdminDashboardMetrics = {
  totalCustomers: 48,
  activeProjects: 24,
  revenueInr: 4280000,
  pendingPaymentsInr: 612000,
  openTickets: 11,
};

export const demoAdminActivities: AdminActivity[] = [
  {
    id: 'act-1',
    title: 'Payment reminder sent',
    detail: 'UV-INV-2026-0210 · Sunrise Retail',
    occurredAt: '2026-07-21',
  },
  {
    id: 'act-2',
    title: 'Work update pushed',
    detail: 'CMS training draft · Website redesign',
    occurredAt: '2026-07-21',
  },
  {
    id: 'act-3',
    title: 'Ticket assigned',
    detail: 'tkt-3301 → Meena R. · Support',
    occurredAt: '2026-07-20',
  },
  {
    id: 'act-4',
    title: 'New customer signup',
    detail: 'GreenLeaf Organics · onboarding',
    occurredAt: '2026-07-19',
  },
  {
    id: 'act-5',
    title: 'Milestone marked complete',
    detail: 'Homepage prototype · Sunrise Retail',
    occurredAt: '2026-07-18',
  },
];

export const demoAdminCustomers: AdminCustomer[] = [
  {
    id: 'cus-001',
    name: 'Priya Sharma',
    businessName: 'Sunrise Retail Pvt Ltd',
    email: 'priya.sharma@demo.uandv.local',
    mobile: '+91 98765 43210',
    city: 'Coimbatore',
    status: 'active',
    projectsCount: 4,
    joinedAt: '2025-10-12',
    history: [
      { id: 'h1', title: 'Enquiry received', date: '2025-12-18' },
      { id: 'h2', title: 'Agreement signed', date: '2026-02-14' },
      { id: 'h3', title: 'Website project started', date: '2026-03-12' },
      { id: 'h4', title: 'Support ticket opened', date: '2026-07-19' },
    ],
  },
  {
    id: 'cus-002',
    name: 'Karthik Nair',
    businessName: 'Coastal Travels',
    email: 'karthik@demo.uandv.local',
    mobile: '+91 98400 11223',
    city: 'Kochi',
    status: 'active',
    projectsCount: 2,
    joinedAt: '2026-01-08',
    history: [
      { id: 'h1', title: 'Proposal shared', date: '2026-01-20' },
      { id: 'h2', title: 'Booking portal kickoff', date: '2026-03-01' },
    ],
  },
  {
    id: 'cus-003',
    name: 'Anitha R',
    businessName: 'GreenLeaf Organics',
    email: 'anitha@demo.uandv.local',
    mobile: '+91 90000 55667',
    city: 'Madurai',
    status: 'onboarding',
    projectsCount: 1,
    joinedAt: '2026-07-19',
    history: [
      { id: 'h1', title: 'Signup completed', date: '2026-07-19' },
      { id: 'h2', title: 'Discovery call scheduled', date: '2026-07-22' },
    ],
  },
  {
    id: 'cus-004',
    name: 'Vikram S',
    businessName: 'Metro Auto Care',
    email: 'vikram@demo.uandv.local',
    mobile: '+91 98888 33445',
    city: 'Chennai',
    status: 'inactive',
    projectsCount: 0,
    joinedAt: '2025-06-02',
    history: [
      { id: 'h1', title: 'Pilot closed', date: '2025-11-30' },
    ],
  },
];

export const demoAdminProjects: AdminProject[] = [
  {
    id: 'aprj-1001',
    name: 'Corporate website redesign',
    customerName: 'Sunrise Retail Pvt Ltd',
    status: 'active',
    progress: 68,
    assignedTeam: 'U&V Web Delivery',
    currentMilestone: 'Inner pages & CMS training',
    targetCompletionDate: '2026-08-30',
  },
  {
    id: 'aprj-1002',
    name: 'Inventory sync automation',
    customerName: 'Sunrise Retail Pvt Ltd',
    status: 'active',
    progress: 42,
    assignedTeam: 'U&V Integrations',
    currentMilestone: 'POS connector QA',
    targetCompletionDate: '2026-09-15',
  },
  {
    id: 'aprj-1003',
    name: 'Booking portal',
    customerName: 'Coastal Travels',
    status: 'at_risk',
    progress: 55,
    assignedTeam: 'U&V Product',
    currentMilestone: 'Payment flow review',
    targetCompletionDate: '2026-08-10',
  },
  {
    id: 'aprj-1004',
    name: 'Brand kit onboarding',
    customerName: 'GreenLeaf Organics',
    status: 'draft',
    progress: 10,
    assignedTeam: 'U&V Creative',
    currentMilestone: 'Kickoff scheduled',
    targetCompletionDate: '2026-09-30',
  },
];

export const demoAdminMilestones: AdminMilestone[] = [
  {
    id: 'ams-1',
    projectId: 'aprj-1001',
    title: 'Design system & homepage',
    status: 'completed',
    dueDate: '2026-05-02',
  },
  {
    id: 'ams-2',
    projectId: 'aprj-1001',
    title: 'Inner pages & CMS training',
    status: 'in_progress',
    dueDate: '2026-07-31',
  },
  {
    id: 'ams-3',
    projectId: 'aprj-1001',
    title: 'Launch & handover',
    status: 'upcoming',
    dueDate: '2026-08-30',
  },
  {
    id: 'ams-4',
    projectId: 'aprj-1003',
    title: 'Payment flow review',
    status: 'blocked',
    dueDate: '2026-07-25',
  },
];

export const demoAdminInvoices: AdminInvoice[] = [
  {
    id: 'ainv-1',
    number: 'UV-INV-2026-0210',
    customerName: 'Sunrise Retail Pvt Ltd',
    amountInr: 95000,
    status: 'pending',
    dueDate: '2026-07-28',
    reminderStatus: 'sent',
    paidDate: null,
  },
  {
    id: 'ainv-2',
    number: 'UV-INV-2026-0225',
    customerName: 'Sunrise Retail Pvt Ltd',
    amountInr: 45000,
    status: 'upcoming',
    dueDate: '2026-08-05',
    reminderStatus: 'scheduled',
    paidDate: null,
  },
  {
    id: 'ainv-3',
    number: 'UV-INV-2026-0188',
    customerName: 'Sunrise Retail Pvt Ltd',
    amountInr: 75000,
    status: 'paid',
    dueDate: '2026-06-01',
    reminderStatus: 'none',
    paidDate: '2026-06-01',
  },
  {
    id: 'ainv-4',
    number: 'UV-INV-2026-0199',
    customerName: 'Coastal Travels',
    amountInr: 120000,
    status: 'overdue',
    dueDate: '2026-07-10',
    reminderStatus: 'sent',
    paidDate: null,
  },
];

export const demoAdminWorkUpdates: AdminWorkUpdate[] = [
  {
    id: 'awu-1',
    projectName: 'Corporate website redesign',
    customerName: 'Sunrise Retail Pvt Ltd',
    title: 'CMS training draft shared',
    body: 'Editor guide v0.9 ready for customer review.',
    author: 'U&V Web Delivery',
    pushedToCustomer: true,
    timelineEntry: true,
    notificationEntry: true,
    createdAt: '2026-07-21',
  },
  {
    id: 'awu-2',
    projectName: 'Inventory sync automation',
    customerName: 'Sunrise Retail Pvt Ltd',
    title: 'POS connector QA progress',
    body: 'Nightly sync matched 98% of demo SKUs.',
    author: 'U&V Integrations',
    pushedToCustomer: true,
    timelineEntry: true,
    notificationEntry: false,
    createdAt: '2026-07-20',
  },
  {
    id: 'awu-3',
    projectName: 'Booking portal',
    customerName: 'Coastal Travels',
    title: 'Payment flow review pending',
    body: 'Internal note — not pushed to customer yet.',
    author: 'U&V Product',
    pushedToCustomer: false,
    timelineEntry: false,
    notificationEntry: false,
    createdAt: '2026-07-19',
  },
];

export const demoAdminTickets: AdminTicket[] = [
  {
    id: 'atkt-3301',
    subject: 'Staging site returns 502 intermittently',
    customerName: 'Sunrise Retail Pvt Ltd',
    priority: 'high',
    status: 'in_progress',
    assignedStaff: 'Meena R.',
    updatedAt: '2026-07-20',
    latestReply: 'Checking hosting logs — demo reply only.',
  },
  {
    id: 'atkt-3302',
    subject: 'Need export of customer leads CSV',
    customerName: 'Sunrise Retail Pvt Ltd',
    priority: 'medium',
    status: 'waiting',
    assignedStaff: 'Suresh K.',
    updatedAt: '2026-07-17',
    latestReply: 'Awaiting date range confirmation from customer.',
  },
  {
    id: 'atkt-3401',
    subject: 'Booking calendar timezone issue',
    customerName: 'Coastal Travels',
    priority: 'urgent',
    status: 'open',
    assignedStaff: 'Unassigned',
    updatedAt: '2026-07-21',
    latestReply: 'Queued for triage — placeholder.',
  },
];

export const demoAdminDocuments: AdminDocument[] = [
  {
    id: 'adoc-1',
    name: 'Master Service Agreement.pdf',
    kind: 'agreement',
    customerName: 'Sunrise Retail Pvt Ltd',
    vaultStatus: 'not_applicable',
    updatedAt: '2026-02-14',
  },
  {
    id: 'adoc-2',
    name: 'Website redesign proposal.pdf',
    kind: 'proposal',
    customerName: 'Sunrise Retail Pvt Ltd',
    vaultStatus: 'not_applicable',
    updatedAt: '2026-01-28',
  },
  {
    id: 'adoc-3',
    name: 'UV-INV-2026-0210.pdf',
    kind: 'invoice',
    customerName: 'Sunrise Retail Pvt Ltd',
    vaultStatus: 'not_applicable',
    updatedAt: '2026-07-10',
  },
  {
    id: 'adoc-4',
    name: 'Primary logo pack.zip',
    kind: 'logo',
    customerName: 'Sunrise Retail Pvt Ltd',
    vaultStatus: 'not_applicable',
    updatedAt: '2026-01-20',
  },
  {
    id: 'adoc-5',
    name: 'Website repository access',
    kind: 'source_code',
    customerName: 'Sunrise Retail Pvt Ltd',
    vaultStatus: 'secure_vault',
    updatedAt: '2026-03-12',
  },
  {
    id: 'adoc-6',
    name: 'Hosting panel credentials',
    kind: 'credentials',
    customerName: 'Sunrise Retail Pvt Ltd',
    vaultStatus: 'secure_vault',
    updatedAt: '2026-03-15',
  },
];

export const demoAdminNotifications: AdminNotification[] = [
  {
    id: 'anf-1',
    kind: 'signup',
    title: 'New signup',
    description: 'GreenLeaf Organics created an account.',
    createdAt: '2026-07-19',
    unread: true,
  },
  {
    id: 'anf-2',
    kind: 'payment_due',
    title: 'Payment due',
    description: 'UV-INV-2026-0210 is due on 28 Jul 2026.',
    createdAt: '2026-07-21',
    unread: true,
  },
  {
    id: 'anf-3',
    kind: 'project_delay',
    title: 'Project delay risk',
    description: 'Coastal Travels booking portal marked at risk.',
    createdAt: '2026-07-18',
    unread: true,
  },
  {
    id: 'anf-4',
    kind: 'renewal_due',
    title: 'Renewal due',
    description: 'Sunrise hosting care plan renews in 10 days.',
    createdAt: '2026-07-12',
    unread: false,
  },
];

export const demoAdminRevenueReport: AdminReportPoint[] = [
  { id: 'r1', label: 'Q1 revenue', value: '₹9.2L', hint: 'Demo aggregate' },
  { id: 'r2', label: 'Q2 revenue', value: '₹14.8L', hint: 'Demo aggregate' },
  { id: 'r3', label: 'MTD revenue', value: '₹6.1L', hint: 'July demo' },
  { id: 'r4', label: 'Outstanding', value: '₹6.12L', hint: 'Pending invoices' },
];

export const demoAdminGrowthReport: AdminReportPoint[] = [
  { id: 'g1', label: 'New customers (30d)', value: '6', hint: 'Demo' },
  { id: 'g2', label: 'Active customers', value: '41', hint: 'Demo' },
  { id: 'g3', label: 'Onboarding', value: '7', hint: 'Demo' },
  { id: 'g4', label: 'Churn risk', value: '2', hint: 'Placeholder' },
];

export const demoAdminProjectReport: AdminReportPoint[] = [
  { id: 'p1', label: 'Active', value: '24', hint: 'In delivery' },
  { id: 'p2', label: 'At risk', value: '3', hint: 'Needs attention' },
  { id: 'p3', label: 'Completed (YTD)', value: '18', hint: 'Demo' },
  { id: 'p4', label: 'On hold', value: '5', hint: 'Demo' },
];

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getAdminCustomerById(id: string): AdminCustomer | undefined {
  return demoAdminCustomers.find((customer) => customer.id === id);
}

export function getMilestonesForAdminProject(
  projectId: string,
): AdminMilestone[] {
  return demoAdminMilestones.filter((item) => item.projectId === projectId);
}
