import {
  CAPABILITIES,
  DEFAULT_EMPLOYEE_CAPABILITIES,
  type Capability,
} from '@/lib/auth';

import type {
  AssignedCustomer,
  CrmConversionReportPoint,
  CrmEmployee,
  EmployeeFollowUpHistoryItem,
  EmployeeWorkUpdate,
  Lead,
  LeadAssignment,
  LeadCommunication,
  LeadDashboardMetrics,
  LeadFollowUp,
  LeadPipelineStage,
  NewsletterCampaign,
} from './types';

/** Fixed demo “today” for overdue calculations (UI foundation). */
export const CRM_DEMO_TODAY = '2026-07-23';

export const LEAD_PIPELINE_ORDER: LeadPipelineStage[] = [
  'new',
  'contacted',
  'interested',
  'meeting',
  'proposal',
  'negotiation',
  'won',
  'customer',
];

export const LEAD_PIPELINE_LABELS: Record<LeadPipelineStage, string> = {
  new: 'New',
  contacted: 'Contacted',
  interested: 'Interested',
  meeting: 'Meeting',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Won',
  customer: 'Customer',
  lost: 'Lost',
};

/** Stages employees may set when UPDATE_LEAD_STATUS is granted. */
export const EMPLOYEE_ALLOWED_STATUS_UPDATES: LeadPipelineStage[] = [
  'contacted',
  'interested',
  'meeting',
  'proposal',
  'negotiation',
];

export const demoLeadMetrics: LeadDashboardMetrics = {
  totalLeads: 126,
  newLeads: 18,
  hotLeads: 11,
  convertedCustomers: 34,
  lostLeads: 9,
  conversionRatePercent: 27,
};

export const demoCrmEmployees: CrmEmployee[] = [
  {
    id: 'emp-001',
    userId: 'user-emp-divya',
    name: 'Divya P.',
    email: 'divya.sales@demo.uandv.local',
    department: 'Sales',
    status: 'active',
    permissions: [...DEFAULT_EMPLOYEE_CAPABILITIES],
  },
  {
    id: 'emp-002',
    userId: 'user-emp-meena',
    name: 'Meena R.',
    email: 'meena.consult@demo.uandv.local',
    department: 'Consulting',
    status: 'active',
    permissions: [...DEFAULT_EMPLOYEE_CAPABILITIES],
  },
  {
    id: 'emp-003',
    userId: 'user-emp-arun',
    name: 'Arun Kumar',
    email: 'arun.sales@demo.uandv.local',
    department: 'Sales',
    status: 'active',
    permissions: [
      CAPABILITIES.VIEW_ASSIGNED_LEADS,
      CAPABILITIES.UPDATE_COMMUNICATIONS,
      CAPABILITIES.SET_FOLLOW_UP,
      CAPABILITIES.SUBMIT_WORK_UPDATES,
    ],
  },
  {
    id: 'emp-004',
    userId: 'user-emp-suresh',
    name: 'Suresh K.',
    email: 'suresh.delivery@demo.uandv.local',
    department: 'Delivery',
    status: 'invited',
    permissions: [
      CAPABILITIES.VIEW_ASSIGNED_LEADS,
      CAPABILITIES.VIEW_ASSIGNED_CUSTOMERS,
      CAPABILITIES.SUBMIT_WORK_UPDATES,
    ],
  },
];

/** Default signed-in employee for Employee Workspace demos. */
export const DEMO_EMPLOYEE_RECORD = demoCrmEmployees[0];

export const demoLeads: Lead[] = [
  {
    id: 'lead-101',
    name: 'Suresh Menon',
    company: 'BluePeak Logistics',
    phone: '+91 98111 22334',
    email: 'suresh@demo.uandv.local',
    interestedService: 'Custom ERP',
    source: 'website',
    status: 'proposal',
    isHot: true,
    assignedEmployee: 'Divya P.',
    ownerEmployeeId: 'emp-001',
    ownerUserId: 'user-emp-divya',
    department: 'Sales',
    priority: 'high',
    nextFollowUp: '2026-07-24',
    lastContact: '2026-07-20',
    reminderLabel: 'Call before noon',
    activityScore: 86,
    conversionProbability: 72,
  },
  {
    id: 'lead-102',
    name: 'Lakshmi Iyer',
    company: 'Nila Boutique',
    phone: '+91 90000 77889',
    email: 'lakshmi@demo.uandv.local',
    interestedService: 'Website + Branding',
    source: 'whatsapp',
    status: 'interested',
    isHot: true,
    assignedEmployee: 'Arun Kumar',
    ownerEmployeeId: 'emp-003',
    ownerUserId: 'user-emp-arun',
    department: 'Sales',
    priority: 'urgent',
    nextFollowUp: '2026-07-23',
    lastContact: '2026-07-21',
    reminderLabel: 'Send brochure',
    activityScore: 91,
    conversionProbability: 78,
  },
  {
    id: 'lead-103',
    name: 'Mohammed Farooq',
    company: 'Farooq Auto Spares',
    phone: '+91 94444 55667',
    email: 'farooq@demo.uandv.local',
    interestedService: 'Inventory automation',
    source: 'referral',
    status: 'meeting',
    isHot: false,
    assignedEmployee: 'Meena R.',
    ownerEmployeeId: 'emp-002',
    ownerUserId: 'user-emp-meena',
    department: 'Consulting',
    priority: 'medium',
    nextFollowUp: '2026-07-25',
    lastContact: '2026-07-18',
    reminderLabel: 'Confirm meeting venue',
    activityScore: 64,
    conversionProbability: 55,
  },
  {
    id: 'lead-104',
    name: 'Anita Joseph',
    company: 'Harbor Cafe',
    phone: '+91 97777 11223',
    email: 'anita@demo.uandv.local',
    interestedService: 'Digital marketing',
    source: 'campaign',
    status: 'new',
    isHot: false,
    assignedEmployee: 'Unassigned',
    ownerEmployeeId: null,
    ownerUserId: null,
    department: 'Marketing',
    priority: 'low',
    nextFollowUp: '2026-07-26',
    lastContact: null,
    reminderLabel: 'First outreach',
    activityScore: 22,
    conversionProbability: 18,
  },
  {
    id: 'lead-105',
    name: 'Ravi Chandran',
    company: 'Orbit Clinics',
    phone: '+91 96666 33445',
    email: 'ravi@demo.uandv.local',
    interestedService: 'Patient portal',
    source: 'website',
    status: 'negotiation',
    isHot: true,
    assignedEmployee: 'Divya P.',
    ownerEmployeeId: 'emp-001',
    ownerUserId: 'user-emp-divya',
    department: 'Sales',
    priority: 'high',
    nextFollowUp: '2026-07-22',
    lastContact: '2026-07-21',
    reminderLabel: 'Share revised quote',
    activityScore: 88,
    conversionProbability: 81,
  },
  {
    id: 'lead-106',
    name: 'Geetha N',
    company: 'SoftNest Tutors',
    phone: '+91 95555 88990',
    email: 'geetha@demo.uandv.local',
    interestedService: 'LMS platform',
    source: 'walk_in',
    status: 'customer',
    isHot: false,
    assignedEmployee: 'Suresh K.',
    ownerEmployeeId: 'emp-004',
    ownerUserId: 'user-emp-suresh',
    department: 'Delivery',
    priority: 'medium',
    nextFollowUp: null,
    lastContact: '2026-06-30',
    reminderLabel: 'Converted',
    activityScore: 95,
    conversionProbability: 100,
  },
  {
    id: 'lead-107',
    name: 'Imran Ali',
    company: 'City Print Hub',
    phone: '+91 93333 44556',
    email: 'imran@demo.uandv.local',
    interestedService: 'POS system',
    source: 'other',
    status: 'lost',
    isHot: false,
    assignedEmployee: 'Arun Kumar',
    ownerEmployeeId: 'emp-003',
    ownerUserId: 'user-emp-arun',
    department: 'Sales',
    priority: 'low',
    nextFollowUp: null,
    lastContact: '2026-05-12',
    reminderLabel: 'Closed lost',
    activityScore: 31,
    conversionProbability: 5,
  },
  {
    id: 'lead-108',
    name: 'Priya Das',
    company: 'Leaf & Loom',
    phone: '+91 92222 66778',
    email: 'priya.das@demo.uandv.local',
    interestedService: 'E-commerce store',
    source: 'campaign',
    status: 'contacted',
    isHot: false,
    assignedEmployee: 'Meena R.',
    ownerEmployeeId: 'emp-002',
    ownerUserId: 'user-emp-meena',
    department: 'Sales',
    priority: 'medium',
    nextFollowUp: '2026-07-27',
    lastContact: '2026-07-19',
    reminderLabel: 'WhatsApp check-in',
    activityScore: 48,
    conversionProbability: 36,
  },
  {
    id: 'lead-109',
    name: 'Vikram Seth',
    company: 'Northwind Traders',
    phone: '+91 91111 22330',
    email: 'vikram@demo.uandv.local',
    interestedService: 'B2B portal',
    source: 'referral',
    status: 'meeting',
    isHot: true,
    assignedEmployee: 'Divya P.',
    ownerEmployeeId: 'emp-001',
    ownerUserId: 'user-emp-divya',
    department: 'Sales',
    priority: 'high',
    nextFollowUp: '2026-07-23',
    lastContact: '2026-07-22',
    reminderLabel: 'Today — confirm agenda',
    activityScore: 74,
    conversionProbability: 61,
  },
];

function isOverdueDate(isoDate: string): boolean {
  return isoDate < CRM_DEMO_TODAY;
}

export const demoLeadFollowUps: LeadFollowUp[] = demoLeads
  .filter((lead) => lead.nextFollowUp)
  .map((lead) => ({
    id: `fu-${lead.id}`,
    leadId: lead.id,
    leadName: lead.name,
    company: lead.company,
    nextFollowUp: lead.nextFollowUp as string,
    lastContact: lead.lastContact ?? '—',
    assignedEmployee: lead.assignedEmployee,
    ownerEmployeeId: lead.ownerEmployeeId,
    reminder: lead.reminderLabel,
    status: lead.status,
    isOverdue: isOverdueDate(lead.nextFollowUp as string),
  }));

export const demoLeadCommunications: LeadCommunication[] = [
  {
    id: 'com-1',
    leadId: 'lead-101',
    leadName: 'Suresh Menon',
    channel: 'call',
    summary: 'Discussed ERP modules and go-live window.',
    occurredAt: '2026-07-20',
    author: 'Divya P.',
    authorEmployeeId: 'emp-001',
  },
  {
    id: 'com-2',
    leadId: 'lead-102',
    leadName: 'Lakshmi Iyer',
    channel: 'whatsapp',
    summary: 'Shared branding moodboard link (demo placeholder).',
    occurredAt: '2026-07-21',
    author: 'Arun Kumar',
    authorEmployeeId: 'emp-003',
  },
  {
    id: 'com-3',
    leadId: 'lead-105',
    leadName: 'Ravi Chandran',
    channel: 'email',
    summary: 'Sent revised proposal PDF placeholder.',
    occurredAt: '2026-07-21',
    author: 'Divya P.',
    authorEmployeeId: 'emp-001',
  },
  {
    id: 'com-4',
    leadId: 'lead-103',
    leadName: 'Mohammed Farooq',
    channel: 'note',
    summary: 'Prefers Tamil follow-ups; meeting on site.',
    occurredAt: '2026-07-18',
    author: 'Meena R.',
    authorEmployeeId: 'emp-002',
  },
  {
    id: 'com-5',
    leadId: 'lead-108',
    leadName: 'Priya Das',
    channel: 'whatsapp',
    summary: 'Acknowledged catalogue request.',
    occurredAt: '2026-07-19',
    author: 'Meena R.',
    authorEmployeeId: 'emp-002',
  },
  {
    id: 'com-6',
    leadId: 'lead-104',
    leadName: 'Anita Joseph',
    channel: 'note',
    summary: 'New lead from summer campaign — awaiting first call.',
    occurredAt: '2026-07-21',
    author: 'System',
    authorEmployeeId: null,
  },
  {
    id: 'com-7',
    leadId: 'lead-109',
    leadName: 'Vikram Seth',
    channel: 'meeting',
    summary: 'Discovery call — mapped B2B portal requirements.',
    occurredAt: '2026-07-22',
    author: 'Divya P.',
    authorEmployeeId: 'emp-001',
  },
];

export const demoNewsletterCampaigns: NewsletterCampaign[] = [
  {
    id: 'nl-1',
    name: 'July Growth Tips',
    status: 'sent',
    audienceLabel: 'All active leads',
    updatedAt: '2026-07-10',
    sentAt: '2026-07-10',
  },
  {
    id: 'nl-2',
    name: 'ERP Launch Invite',
    status: 'scheduled',
    audienceLabel: 'Hot + Proposal stage',
    updatedAt: '2026-07-18',
    sentAt: null,
  },
  {
    id: 'nl-3',
    name: 'Monsoon Offers Draft',
    status: 'draft',
    audienceLabel: 'Website leads',
    updatedAt: '2026-07-20',
    sentAt: null,
  },
  {
    id: 'nl-4',
    name: 'June Product Digest',
    status: 'sent',
    audienceLabel: 'Customers + won leads',
    updatedAt: '2026-06-15',
    sentAt: '2026-06-15',
  },
];

export const demoLeadAssignments: LeadAssignment[] = demoLeads.map((lead) => ({
  id: `asg-${lead.id}`,
  leadId: lead.id,
  leadName: lead.name,
  company: lead.company,
  assignedEmployee: lead.assignedEmployee,
  ownerEmployeeId: lead.ownerEmployeeId,
  department: lead.department,
  priority: lead.priority,
  status: lead.status,
}));

export const demoAssignedCustomers: AssignedCustomer[] = [
  {
    id: 'ac-1',
    customerId: 'cus-001',
    name: 'Priya Sharma',
    businessName: 'Sunrise Retail Pvt Ltd',
    ownerEmployeeId: 'emp-001',
    ownerUserId: 'user-emp-divya',
    status: 'active',
  },
  {
    id: 'ac-2',
    customerId: 'cus-002',
    name: 'Karthik Nair',
    businessName: 'GreenLeaf Organics',
    ownerEmployeeId: 'emp-002',
    ownerUserId: 'user-emp-meena',
    status: 'onboarding',
  },
  {
    id: 'ac-3',
    customerId: 'cus-003',
    name: 'Ananya Rao',
    businessName: 'Coastal Dental',
    ownerEmployeeId: 'emp-001',
    ownerUserId: 'user-emp-divya',
    status: 'active',
  },
];

export const demoFollowUpHistory: EmployeeFollowUpHistoryItem[] = [
  {
    id: 'fh-1',
    employeeId: 'emp-001',
    employeeName: 'Divya P.',
    leadId: 'lead-105',
    leadName: 'Ravi Chandran',
    action: 'Logged call · set next follow-up to 22 Jul',
    occurredAt: '2026-07-21',
    nextFollowUp: '2026-07-22',
  },
  {
    id: 'fh-2',
    employeeId: 'emp-001',
    employeeName: 'Divya P.',
    leadId: 'lead-101',
    leadName: 'Suresh Menon',
    action: 'Sent proposal notes · follow-up 24 Jul',
    occurredAt: '2026-07-20',
    nextFollowUp: '2026-07-24',
  },
  {
    id: 'fh-3',
    employeeId: 'emp-002',
    employeeName: 'Meena R.',
    leadId: 'lead-103',
    leadName: 'Mohammed Farooq',
    action: 'Scheduled site meeting',
    occurredAt: '2026-07-18',
    nextFollowUp: '2026-07-25',
  },
  {
    id: 'fh-4',
    employeeId: 'emp-003',
    employeeName: 'Arun Kumar',
    leadId: 'lead-102',
    leadName: 'Lakshmi Iyer',
    action: 'WhatsApp brochure reminder',
    occurredAt: '2026-07-21',
    nextFollowUp: '2026-07-23',
  },
];

export const demoEmployeeWorkUpdates: EmployeeWorkUpdate[] = [
  {
    id: 'wu-1',
    employeeId: 'emp-001',
    employeeName: 'Divya P.',
    summary: '3 lead calls, 1 meeting booked, proposal revision for Orbit Clinics.',
    submittedAt: '2026-07-22',
    status: 'submitted',
  },
  {
    id: 'wu-2',
    employeeId: 'emp-002',
    employeeName: 'Meena R.',
    summary: 'Followed up Leaf & Loom; inventory discovery notes filed.',
    submittedAt: '2026-07-22',
    status: 'submitted',
  },
];

export const demoCrmConversionReport: CrmConversionReportPoint[] = [
  {
    id: 'cr-1',
    label: 'Leads this month',
    value: '42',
    hint: 'All sources',
  },
  {
    id: 'cr-2',
    label: 'Won / customer',
    value: '11',
    hint: 'Closed won',
  },
  {
    id: 'cr-3',
    label: 'Conversion rate',
    value: '26%',
    hint: 'Demo calculation',
  },
  {
    id: 'cr-4',
    label: 'Avg. days to close',
    value: '18',
    hint: 'Won deals',
  },
  {
    id: 'cr-5',
    label: 'Overdue follow-ups',
    value: '1',
    hint: 'Needs attention',
  },
  {
    id: 'cr-6',
    label: 'Unassigned leads',
    value: '1',
    hint: 'Awaiting ownership',
  },
];

export const EMPLOYEE_PERMISSION_LABELS: Record<string, string> = {
  [CAPABILITIES.VIEW_ASSIGNED_LEADS]: 'View assigned leads',
  [CAPABILITIES.VIEW_ASSIGNED_CUSTOMERS]: 'View assigned customers',
  [CAPABILITIES.UPDATE_COMMUNICATIONS]: 'Update communications',
  [CAPABILITIES.SET_FOLLOW_UP]: 'Set follow-up dates',
  [CAPABILITIES.UPDATE_LEAD_STATUS]: 'Update lead status',
  [CAPABILITIES.SUBMIT_WORK_UPDATES]: 'Submit daily work updates',
};

export const EMPLOYEE_PERMISSION_OPTIONS: Capability[] = [
  ...DEFAULT_EMPLOYEE_CAPABILITIES,
];

export function formatDisplayDate(isoDate: string): string {
  if (isoDate === '—') return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getLeadsByStage(stage: LeadPipelineStage): Lead[] {
  return demoLeads.filter((lead) => lead.status === stage);
}

export function getLeadById(id: string): Lead | undefined {
  return demoLeads.find((lead) => lead.id === id);
}

export function getEmployeeById(id: string): CrmEmployee | undefined {
  return demoCrmEmployees.find((employee) => employee.id === id);
}

export function getLeadsForEmployee(employeeId: string): Lead[] {
  return demoLeads.filter((lead) => lead.ownerEmployeeId === employeeId);
}

export function getCustomersForEmployee(employeeId: string): AssignedCustomer[] {
  return demoAssignedCustomers.filter(
    (customer) => customer.ownerEmployeeId === employeeId,
  );
}

export function getFollowUpsForEmployee(employeeId: string): LeadFollowUp[] {
  return demoLeadFollowUps.filter(
    (item) => item.ownerEmployeeId === employeeId,
  );
}

export function getTodaysFollowUpsForEmployee(
  employeeId: string,
): LeadFollowUp[] {
  return getFollowUpsForEmployee(employeeId).filter(
    (item) => item.nextFollowUp === CRM_DEMO_TODAY,
  );
}

export function getOverdueFollowUps(): LeadFollowUp[] {
  return demoLeadFollowUps.filter((item) => item.isOverdue);
}

export function getCommunicationsForEmployee(
  employeeId: string,
): LeadCommunication[] {
  const leadIds = new Set(
    getLeadsForEmployee(employeeId).map((lead) => lead.id),
  );
  return demoLeadCommunications.filter((item) => leadIds.has(item.leadId));
}

export function employeeHasPermission(
  employee: CrmEmployee,
  capability: Capability,
): boolean {
  return employee.permissions.includes(capability);
}
