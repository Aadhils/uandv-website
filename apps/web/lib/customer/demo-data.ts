import type {
  AdminPreviewMetric,
  AdminQueueItem,
  Agreement,
  BusinessHealthScore,
  BusinessPaymentSnapshot,
  CustomerAsset,
  CustomerDocument,
  CustomerNotification,
  CustomerProfile,
  CustomerProject,
  DashboardSummaryCounts,
  Invoice,
  PaymentSummary,
  ProjectMilestone,
  RenewalItem,
  ServiceRequest,
  SupportTicket,
  TimelineEvent,
  WorkUpdate,
} from './types';

/** Static demo customer — not a real account. */
export const demoCustomerProfile: CustomerProfile = {
  fullName: 'Priya Sharma',
  email: 'priya.sharma@demo.uandv.local',
  mobile: '+91 98765 43210',
  businessName: 'Sunrise Retail Pvt Ltd',
  businessType: 'Retail & eCommerce',
  gstinPlaceholder: 'Demo GSTIN · not verified',
  city: 'Coimbatore',
  state: 'Tamil Nadu',
  preferredLanguage: 'English',
  emailUpdates: true,
  smsUpdates: false,
  whatsappUpdates: true,
};

export const demoProjects: CustomerProject[] = [
  {
    id: 'prj-1001',
    name: 'Corporate website redesign',
    status: 'active',
    progress: 68,
    assignedTeam: 'U&V Web Delivery',
    startDate: '2026-03-12',
    targetCompletionDate: '2026-08-30',
    summary: 'Marketing site rebuild with multilingual pages and lead capture.',
    phase: 'Build & content',
    currentMilestone: 'Inner pages & CMS training',
    nextAction: 'Review CMS training draft and approve content structure',
  },
  {
    id: 'prj-1002',
    name: 'Inventory sync automation',
    status: 'active',
    progress: 42,
    assignedTeam: 'U&V Integrations',
    startDate: '2026-04-01',
    targetCompletionDate: '2026-09-15',
    summary: 'Connect store POS to cloud inventory and daily reconciliation.',
    phase: 'Integration',
    currentMilestone: 'POS connector QA',
    nextAction: 'Confirm demo store credentials are vaulted for QA',
  },
  {
    id: 'prj-1003',
    name: 'Brand identity kit',
    status: 'completed',
    progress: 100,
    assignedTeam: 'U&V Creative',
    startDate: '2025-11-02',
    targetCompletionDate: '2026-01-20',
    summary: 'Logo system, colour tokens, and social templates delivered.',
    phase: 'Closed',
    currentMilestone: 'Handover complete',
    nextAction: 'No action — project closed',
  },
  {
    id: 'prj-1004',
    name: 'Mobile ordering pilot',
    status: 'on_hold',
    progress: 25,
    assignedTeam: 'U&V Mobile',
    startDate: '2026-05-10',
    targetCompletionDate: '2026-11-01',
    summary: 'Paused pending stakeholder approval on payment flow scope.',
    phase: 'Discovery',
    currentMilestone: 'Payment scope decision',
    nextAction: 'Approve payment flow scope to resume delivery',
  },
];

export const demoProjectMilestones: ProjectMilestone[] = [
  {
    id: 'ms-1001-1',
    projectId: 'prj-1001',
    title: 'Discovery & sitemap',
    status: 'completed',
    dueDate: '2026-03-28',
    completedDate: '2026-03-26',
    description: 'IA workshop and approved sitemap.',
  },
  {
    id: 'ms-1001-2',
    projectId: 'prj-1001',
    title: 'Design system & homepage',
    status: 'completed',
    dueDate: '2026-05-02',
    completedDate: '2026-05-02',
    description: 'Visual system and homepage prototype signed off.',
  },
  {
    id: 'ms-1001-3',
    projectId: 'prj-1001',
    title: 'Inner pages & CMS training',
    status: 'in_progress',
    dueDate: '2026-07-31',
    completedDate: null,
    description: 'Building remaining templates and editor training.',
  },
  {
    id: 'ms-1001-4',
    projectId: 'prj-1001',
    title: 'Launch & handover',
    status: 'upcoming',
    dueDate: '2026-08-30',
    completedDate: null,
    description: 'Production cutover and knowledge transfer.',
  },
  {
    id: 'ms-1002-1',
    projectId: 'prj-1002',
    title: 'Connector architecture',
    status: 'completed',
    dueDate: '2026-04-20',
    completedDate: '2026-04-18',
    description: 'POS sync blueprint approved.',
  },
  {
    id: 'ms-1002-2',
    projectId: 'prj-1002',
    title: 'POS connector QA',
    status: 'in_progress',
    dueDate: '2026-07-25',
    completedDate: null,
    description: 'Validating stock deltas against demo store.',
  },
  {
    id: 'ms-1002-3',
    projectId: 'prj-1002',
    title: 'Go-live monitoring',
    status: 'upcoming',
    dueDate: '2026-09-15',
    completedDate: null,
    description: 'Production monitoring and runbook.',
  },
  {
    id: 'ms-1004-1',
    projectId: 'prj-1004',
    title: 'Product discovery',
    status: 'completed',
    dueDate: '2026-05-30',
    completedDate: '2026-05-28',
    description: 'Pilot user journeys mapped.',
  },
  {
    id: 'ms-1004-2',
    projectId: 'prj-1004',
    title: 'Payment scope decision',
    status: 'blocked',
    dueDate: '2026-07-15',
    completedDate: null,
    description: 'Waiting on customer approval — demo blocker only.',
  },
];

export const demoWorkUpdates: WorkUpdate[] = [
  {
    id: 'wu-01',
    projectId: 'prj-1001',
    projectName: 'Corporate website redesign',
    kind: 'progress',
    title: 'CMS training draft shared',
    body: 'Editor guide v0.9 shared for review. Demo update — no real file storage.',
    author: 'U&V Web Delivery',
    occurredAt: '2026-07-21',
  },
  {
    id: 'wu-02',
    projectId: 'prj-1002',
    projectName: 'Inventory sync automation',
    kind: 'milestone',
    title: 'POS connector QA in progress',
    body: 'Nightly sync matched 98% of SKUs in the demo environment.',
    author: 'U&V Integrations',
    occurredAt: '2026-07-20',
  },
  {
    id: 'wu-03',
    projectId: 'prj-1004',
    projectName: 'Mobile ordering pilot',
    kind: 'blocker',
    title: 'Payment scope still pending',
    body: 'Pilot remains on hold until payment flow scope is confirmed.',
    author: 'U&V Mobile',
    occurredAt: '2026-07-18',
  },
  {
    id: 'wu-04',
    projectId: 'prj-1001',
    projectName: 'Corporate website redesign',
    kind: 'delivery',
    title: 'Staging pages published',
    body: 'Services and About templates available on staging for feedback.',
    author: 'U&V Web Delivery',
    occurredAt: '2026-07-16',
  },
  {
    id: 'wu-05',
    projectId: 'prj-1003',
    projectName: 'Brand identity kit',
    kind: 'note',
    title: 'Brand kit archived',
    body: 'Final assets remain available under My Assets.',
    author: 'U&V Creative',
    occurredAt: '2026-01-22',
  },
];

export const demoAdminMetrics: AdminPreviewMetric[] = [
  {
    id: 'adm-m1',
    label: 'Active customer projects',
    value: '24',
    hint: 'Across all workspaces · demo',
  },
  {
    id: 'adm-m2',
    label: 'Open support tickets',
    value: '11',
    hint: 'Needs triage · demo',
  },
  {
    id: 'adm-m3',
    label: 'Pending invoices',
    value: '₹4.2L',
    hint: 'No gateway connected',
  },
  {
    id: 'adm-m4',
    label: 'Blocked milestones',
    value: '3',
    hint: 'Awaiting customer decisions',
  },
];

export const demoAdminQueue: AdminQueueItem[] = [
  {
    id: 'aq-1',
    title: 'Approve payment scope — Mobile ordering pilot',
    workspace: 'customer',
    priority: 'high',
    statusLabel: 'Waiting on customer',
    updatedAt: '2026-07-18',
  },
  {
    id: 'aq-2',
    title: 'Escalated staging 502 — Sunrise Retail',
    workspace: 'customer',
    priority: 'urgent',
    statusLabel: 'In progress',
    updatedAt: '2026-07-20',
  },
  {
    id: 'aq-3',
    title: 'Vendor onboarding checklist incomplete',
    workspace: 'vendor',
    priority: 'medium',
    statusLabel: 'Queued',
    updatedAt: '2026-07-19',
  },
  {
    id: 'aq-4',
    title: 'Partner referral payout review',
    workspace: 'partner',
    priority: 'low',
    statusLabel: 'Scheduled',
    updatedAt: '2026-07-17',
  },
];

export const demoServiceRequests: ServiceRequest[] = [
  {
    id: 'req-2401',
    title: 'Add Tamil language pages',
    category: 'Website',
    status: 'in_review',
    priority: 'high',
    createdAt: '2026-07-10',
    assignedTeam: 'U&V Content & Web',
  },
  {
    id: 'req-2402',
    title: 'WhatsApp order notifications',
    category: 'Automation',
    status: 'quoted',
    priority: 'medium',
    createdAt: '2026-07-02',
    assignedTeam: 'U&V Integrations',
  },
  {
    id: 'req-2403',
    title: 'GST invoice template update',
    category: 'Billing',
    status: 'approved',
    priority: 'low',
    createdAt: '2026-06-18',
    assignedTeam: 'U&V Finance Ops',
  },
  {
    id: 'req-2404',
    title: 'Security review for admin panel',
    category: 'Security',
    status: 'submitted',
    priority: 'urgent',
    createdAt: '2026-07-18',
    assignedTeam: 'Unassigned · pending triage',
  },
];

export const demoAgreements: Agreement[] = [
  {
    id: 'agr-501',
    title: 'Master Service Agreement — Sunrise Retail',
    status: 'signed',
    signedDate: '2026-02-14',
    expiryOrRenewalDate: '2027-02-14',
    auditLabel: 'Digital trust vault · hash placeholder',
  },
  {
    id: 'agr-502',
    title: 'Website redesign SOW',
    status: 'signed',
    signedDate: '2026-03-08',
    expiryOrRenewalDate: '2026-09-08',
    auditLabel: 'Signature certificate · demo ID UV-SIG-9921',
  },
  {
    id: 'agr-503',
    title: 'Support retainer addendum',
    status: 'pending_signature',
    signedDate: null,
    expiryOrRenewalDate: '2026-08-01',
    auditLabel: 'Awaiting customer signature · not legally binding in demo',
  },
  {
    id: 'agr-504',
    title: 'Hosting & domain care plan',
    status: 'renewal_due',
    signedDate: '2025-08-01',
    expiryOrRenewalDate: '2026-08-01',
    auditLabel: 'Renewal reminder scheduled · demo only',
  },
];

export const demoPaymentSummary: PaymentSummary = {
  totalPaidInr: 485000,
  pendingInr: 95000,
  upcomingInr: 45000,
  upcomingLabel: 'Milestone 3 · Website redesign · due 05 Aug 2026',
};

/** Dashboard payment summary — aligns with Payment Center demo ledger. */
export const demoBusinessPaymentSnapshot: BusinessPaymentSnapshot = {
  totalProjectValueInr: 720000,
  amountPaidInr: 485000,
  balanceInr: 235000,
  nextPaymentDueDate: '2026-07-28',
  status: 'pending',
  statusLabel: 'Milestone invoice pending',
};

export const demoBusinessHealth: BusinessHealthScore = {
  overall: 78,
  project: 72,
  payment: 64,
  documentation: 81,
  support: 88,
  renewal: 70,
  disclaimer: 'Demo data only — not a live business health calculation.',
};

export const demoRenewals: RenewalItem[] = [
  {
    id: 'ren-1',
    kind: 'domain',
    name: 'sunrise-retail.in domain',
    renewalDate: '2027-03-12',
    daysRemaining: 233,
    status: 'healthy',
  },
  {
    id: 'ren-2',
    kind: 'hosting',
    name: 'Managed hosting plan',
    renewalDate: '2026-08-01',
    daysRemaining: 10,
    status: 'due_soon',
  },
  {
    id: 'ren-3',
    kind: 'ssl',
    name: 'SSL certificate',
    renewalDate: '2026-09-15',
    daysRemaining: 55,
    status: 'active',
  },
  {
    id: 'ren-4',
    kind: 'software_maintenance',
    name: 'Software maintenance retainer',
    renewalDate: '2026-08-05',
    daysRemaining: 14,
    status: 'due_soon',
  },
  {
    id: 'ren-5',
    kind: 'digital_business_card',
    name: 'Digital business card subscription',
    renewalDate: '2026-10-01',
    daysRemaining: 71,
    status: 'healthy',
  },
];

export const demoDashboardSummary: DashboardSummaryCounts = {
  activeProjects: 2,
  pendingApprovals: 1,
  pendingPayments: 1,
  openSupportTickets: 2,
  documentsAwaitingAction: 2,
  upcomingRenewals: 2,
};

export const demoInvoices: Invoice[] = [
  {
    id: 'inv-901',
    number: 'UV-INV-2026-0142',
    description: 'Website redesign — Milestone 2',
    amountInr: 120000,
    status: 'paid',
    dueDate: '2026-05-15',
    paidDate: '2026-05-12',
  },
  {
    id: 'inv-902',
    number: 'UV-INV-2026-0188',
    description: 'Inventory sync — Discovery & setup',
    amountInr: 75000,
    status: 'paid',
    dueDate: '2026-06-01',
    paidDate: '2026-06-01',
  },
  {
    id: 'inv-903',
    number: 'UV-INV-2026-0210',
    description: 'Website redesign — Milestone 3',
    amountInr: 95000,
    status: 'pending',
    dueDate: '2026-07-28',
    paidDate: null,
  },
  {
    id: 'inv-904',
    number: 'UV-INV-2026-0225',
    description: 'Support retainer — Q3 2026',
    amountInr: 45000,
    status: 'upcoming',
    dueDate: '2026-08-05',
    paidDate: null,
  },
];

export const demoDocuments: CustomerDocument[] = [
  {
    id: 'doc-1',
    name: 'Master Service Agreement.pdf',
    category: 'agreements',
    version: 'v1.2',
    updatedAt: '2026-02-14',
    auditLabel: 'Checksum placeholder · not a real vault entry',
  },
  {
    id: 'doc-2',
    name: 'UV-INV-2026-0210.pdf',
    category: 'invoices',
    version: 'v1.0',
    updatedAt: '2026-07-10',
    auditLabel: 'Generated demo invoice · no payment gateway',
  },
  {
    id: 'doc-3',
    name: 'NDA — Sunrise Retail.pdf',
    category: 'legal',
    version: 'v1.0',
    updatedAt: '2026-01-20',
    auditLabel: 'Legal archive placeholder',
  },
  {
    id: 'doc-4',
    name: 'Website sitemap draft.xlsx',
    category: 'project_files',
    version: 'v3.1',
    updatedAt: '2026-07-08',
    auditLabel: 'Shared workspace file · demo storage',
  },
  {
    id: 'doc-5',
    name: 'SSL certificate summary.pdf',
    category: 'certificates',
    version: 'v1.0',
    updatedAt: '2026-06-22',
    auditLabel: 'Certificate metadata only · no private keys',
  },
];

export const demoTickets: SupportTicket[] = [
  {
    id: 'tkt-3301',
    subject: 'Staging site returns 502 intermittently',
    priority: 'high',
    status: 'in_progress',
    updatedAt: '2026-07-20',
    conversationPreview:
      'U&V Support: Investigating hosting logs. Demo thread — no live chat.',
  },
  {
    id: 'tkt-3302',
    subject: 'Need export of customer leads CSV',
    priority: 'medium',
    status: 'waiting',
    updatedAt: '2026-07-17',
    conversationPreview:
      'Awaiting customer confirmation on date range. Placeholder conversation.',
  },
  {
    id: 'tkt-3303',
    subject: 'Update billing address on invoices',
    priority: 'low',
    status: 'resolved',
    updatedAt: '2026-07-05',
    conversationPreview: 'Address updated in demo records. Ticket closed.',
  },
];

export const demoTimeline: TimelineEvent[] = [
  {
    id: 'tl-01',
    type: 'enquiry_received',
    title: 'Enquiry received',
    description: 'Sunrise Retail reached out for website and growth support.',
    occurredAt: '2025-12-18',
  },
  {
    id: 'tl-02',
    type: 'proposal_shared',
    title: 'Proposal shared',
    description: 'Scope, timeline, and investment proposal shared with customer.',
    occurredAt: '2026-01-28',
  },
  {
    id: 'tl-03',
    type: 'agreement_signed',
    title: 'Agreement signed',
    description: 'Master Service Agreement digitally signed (demo audit).',
    occurredAt: '2026-02-14',
  },
  {
    id: 'tl-04',
    type: 'advance_received',
    title: 'Advance received',
    description: 'Kickoff advance marked paid in the demo ledger.',
    occurredAt: '2026-02-20',
  },
  {
    id: 'tl-05',
    type: 'project_started',
    title: 'Project started',
    description: 'Corporate website redesign kicked off with U&V Web Delivery.',
    occurredAt: '2026-03-12',
  },
  {
    id: 'tl-06',
    type: 'milestone_completed',
    title: 'Milestone completed',
    description: 'Design system and homepage prototype approved.',
    occurredAt: '2026-05-02',
  },
  {
    id: 'tl-07',
    type: 'approval_requested',
    title: 'Approval requested',
    description: 'Payment flow scope approval requested for mobile pilot.',
    occurredAt: '2026-07-15',
  },
  {
    id: 'tl-08',
    type: 'deployment_planned',
    title: 'Deployment planned',
    description: 'Website launch window pencilled for late August 2026.',
    occurredAt: '2026-07-20',
  },
];

export const demoNotifications: CustomerNotification[] = [
  {
    id: 'ntf-1',
    title: 'Project update',
    description: 'CMS training draft shared for website redesign.',
    category: 'project',
    createdAt: '2026-07-21',
    unread: true,
  },
  {
    id: 'ntf-2',
    title: 'Payment reminder',
    description: 'Milestone 3 invoice UV-INV-2026-0210 is pending.',
    category: 'payment',
    createdAt: '2026-07-19',
    unread: true,
  },
  {
    id: 'ntf-3',
    title: 'Approval required',
    description: 'Mobile ordering pilot needs payment scope approval.',
    category: 'project',
    createdAt: '2026-07-18',
    unread: true,
  },
  {
    id: 'ntf-4',
    title: 'Document shared',
    description: 'Website sitemap draft v3.1 is available in Documents.',
    category: 'document',
    createdAt: '2026-07-08',
    unread: false,
  },
  {
    id: 'ntf-5',
    title: 'Support response',
    description: 'Staging 502 investigation is in progress.',
    category: 'support',
    createdAt: '2026-07-20',
    unread: true,
  },
  {
    id: 'ntf-6',
    title: 'Renewal reminder',
    description: 'Hosting & maintenance renewals are due within 14 days.',
    category: 'legal',
    createdAt: '2026-07-12',
    unread: false,
  },
];

export const demoAssets: CustomerAsset[] = [
  {
    id: 'ast-1',
    name: 'sunrise-retail.in',
    type: 'website',
    statusLabel: 'Live · staging also available',
    credentialStatus: 'not_applicable',
    notes: 'Primary marketing website.',
  },
  {
    id: 'ast-2',
    name: 'Sunrise Retail ordering (pilot)',
    type: 'mobile_app',
    statusLabel: 'On hold',
    credentialStatus: 'pending_setup',
    notes: 'App store accounts not connected in demo.',
  },
  {
    id: 'ast-3',
    name: 'Primary logo pack',
    type: 'logo',
    statusLabel: 'Delivered',
    credentialStatus: 'not_applicable',
    notes: 'SVG / PNG variants in brand kit.',
  },
  {
    id: 'ast-4',
    name: 'Brand colour & type tokens',
    type: 'brand',
    statusLabel: 'Delivered',
    credentialStatus: 'not_applicable',
    notes: 'Aligned to U&V design handoff format.',
  },
  {
    id: 'ast-5',
    name: 'sunrise-retail.in domain',
    type: 'domain',
    statusLabel: 'Active · renews 2027',
    credentialStatus: 'secure_vault',
    notes: 'Registrar access held in secure vault placeholder — never shown.',
  },
  {
    id: 'ast-6',
    name: 'Managed hosting',
    type: 'hosting',
    statusLabel: 'Healthy',
    credentialStatus: 'secure_vault',
    notes: 'Panel credentials are vaulted. Demo UI never displays secrets.',
  },
  {
    id: 'ast-7',
    name: 'Website repository',
    type: 'source_code',
    statusLabel: 'Private · U&V managed',
    credentialStatus: 'secure_vault',
    notes: 'Source access via controlled invite — placeholder only.',
  },
  {
    id: 'ast-8',
    name: 'Environment credentials',
    type: 'credentials',
    statusLabel: 'Vaulted · not displayed',
    credentialStatus: 'secure_vault',
    notes: 'No passwords, API keys, or secrets are rendered in this UI.',
  },
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

export function getMilestonesForProject(projectId: string): ProjectMilestone[] {
  return demoProjectMilestones.filter((item) => item.projectId === projectId);
}

export function getWorkUpdatesForProject(projectId?: string): WorkUpdate[] {
  const items = [...demoWorkUpdates].sort((a, b) =>
    b.occurredAt.localeCompare(a.occurredAt),
  );
  if (!projectId) return items;
  return items.filter((item) => item.projectId === projectId);
}
