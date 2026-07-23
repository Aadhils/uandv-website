/**
 * Employee Workspace demo data — Sprint 3.0.8.
 * All rows are scoped to DEMO employee (emp-001 / Divya P.) unless noted.
 */

import {
  CRM_DEMO_TODAY,
  formatDisplayDate,
  getCommunicationsForEmployee,
  getCustomersForEmployee,
  getLeadsForEmployee,
  type LeadPipelineStage,
} from '@/lib/crm';

export { formatDisplayDate };

import { demoEmployeeUser } from './session';
import type {
  DailyWorkReport,
  EmployeeCommunicationItem,
  EmployeeCustomerRow,
  EmployeeDashboardSummary,
  EmployeeFollowUpRow,
  EmployeeLeadRow,
  EmployeeMeeting,
  EmployeeNotification,
  EmployeePerformance,
  EmployeePipelineCard,
  EmployeePipelineStage,
  EmployeeProfile,
  EmployeeRecentActivity,
  EmployeeTask,
  FollowUpNote,
} from './types';

export const EMPLOYEE_DEMO_TODAY = CRM_DEMO_TODAY;
export const EMPLOYEE_DEMO_ID = demoEmployeeUser.employeeId;

export const EMPLOYEE_PIPELINE_ORDER: EmployeePipelineStage[] = [
  'new',
  'contacted',
  'interested',
  'meeting_scheduled',
  'proposal_sent',
  'negotiation',
  'won',
  'lost',
  'follow_up_later',
];

export const EMPLOYEE_PIPELINE_LABELS: Record<EmployeePipelineStage, string> = {
  new: 'New',
  contacted: 'Contacted',
  interested: 'Interested',
  meeting_scheduled: 'Meeting Scheduled',
  proposal_sent: 'Proposal Sent',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
  follow_up_later: 'Follow-up Later',
};

function mapCrmStageToEmployee(
  stage: LeadPipelineStage,
): EmployeePipelineStage {
  switch (stage) {
    case 'meeting':
      return 'meeting_scheduled';
    case 'proposal':
      return 'proposal_sent';
    case 'customer':
      return 'won';
    case 'won':
      return 'won';
    case 'lost':
      return 'lost';
    case 'new':
    case 'contacted':
    case 'interested':
    case 'negotiation':
      return stage;
    default:
      return 'follow_up_later';
  }
}

export const demoEmployeeProfile: EmployeeProfile = {
  userId: demoEmployeeUser.userId,
  employeeId: demoEmployeeUser.employeeId,
  fullName: 'Divya P.',
  email: 'divya.sales@demo.uandv.local',
  phone: '+91 98765 00101',
  department: 'Sales',
  title: 'Sales Executive',
  timezone: 'Asia/Kolkata',
};

export const demoEmployeePerformance: EmployeePerformance = {
  dailyTarget: 12,
  weeklyTarget: 55,
  followUpCompletionRatePercent: 78,
  conversionCount: 4,
  overdueCount: 1,
  customerResponseRatePercent: 64,
};

export const demoDailyWorkReport: DailyWorkReport = {
  id: 'dwr-001',
  employeeId: EMPLOYEE_DEMO_ID,
  reportDate: EMPLOYEE_DEMO_TODAY,
  callsCompleted: 5,
  followUpsCompleted: 4,
  meetingsCompleted: 1,
  leadsProgressed: 3,
  proposalsRequested: 1,
  customersConverted: 0,
  notes:
    'Orbit Clinics quote revision pending. Vikram Seth meeting confirmed for afternoon.',
  status: 'draft',
};

export function getEmployeeLeadRows(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeeLeadRow[] {
  const communications = getCommunicationsForEmployee(employeeId);
  return getLeadsForEmployee(employeeId).map((lead) => {
    const lastCom = communications
      .filter((c) => c.leadId === lead.id)
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))[0];
    return {
      id: lead.id,
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
      email: lead.email,
      source: lead.source,
      interestedService: lead.interestedService,
      leadScore: lead.activityScore,
      status: mapCrmStageToEmployee(lead.status),
      nextFollowUp: lead.nextFollowUp,
      lastActivity: lastCom
        ? `${lastCom.channel} · ${formatDisplayDate(lastCom.occurredAt)}`
        : lead.lastContact
          ? `Contact · ${formatDisplayDate(lead.lastContact)}`
          : 'No activity yet',
      ownerEmployeeId: employeeId,
    };
  });
}

export function getEmployeeFollowUpRows(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeeFollowUpRow[] {
  const timeByLead: Record<string, string> = {
    'lead-101': '11:00 AM',
    'lead-105': '10:30 AM',
    'lead-109': '03:00 PM',
  };

  return getLeadsForEmployee(employeeId)
    .filter((lead) => lead.nextFollowUp)
    .map((lead) => {
      const date = lead.nextFollowUp as string;
      return {
        id: `efu-${lead.id}`,
        leadId: lead.id,
        name: lead.name,
        company: lead.company,
        interestedService: lead.interestedService,
        phone: lead.phone,
        lastContact: lead.lastContact,
        nextFollowUpDate: date,
        nextFollowUpTime: timeByLead[lead.id] ?? '10:00 AM',
        priority: lead.priority,
        stage: mapCrmStageToEmployee(lead.status),
        ownerEmployeeId: employeeId,
        isOverdue: date < EMPLOYEE_DEMO_TODAY,
        isToday: date === EMPLOYEE_DEMO_TODAY,
      };
    })
    .sort((a, b) => a.nextFollowUpDate.localeCompare(b.nextFollowUpDate));
}

export function getTodaysEmployeeFollowUps(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeeFollowUpRow[] {
  return getEmployeeFollowUpRows(employeeId).filter((row) => row.isToday);
}

export function getOverdueEmployeeFollowUps(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeeFollowUpRow[] {
  return getEmployeeFollowUpRows(employeeId).filter((row) => row.isOverdue);
}

export function getEmployeeCustomerRows(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeeCustomerRow[] {
  const enrichment: Record<
    string,
    Omit<
      EmployeeCustomerRow,
      'id' | 'customerId' | 'name' | 'company' | 'ownerEmployeeId'
    >
  > = {
    'cus-001': {
      activeProjects: 4,
      latestCommunication: 'Call · Homepage feedback · 21 Jul 2026',
      pendingApproval: 'Milestone 3 sign-off',
      supportStatus: 'open',
      nextAction: 'Confirm CMS training slot',
    },
    'cus-003': {
      activeProjects: 1,
      latestCommunication: 'Email · Brand kit draft · 19 Jul 2026',
      pendingApproval: 'None',
      supportStatus: 'waiting',
      nextAction: 'Share revised logo options',
    },
  };

  return getCustomersForEmployee(employeeId).map((customer) => {
    const extra = enrichment[customer.customerId] ?? {
      activeProjects: 1,
      latestCommunication: 'No recent communication',
      pendingApproval: 'None',
      supportStatus: 'none' as const,
      nextAction: 'Schedule check-in',
    };
    return {
      id: customer.id,
      customerId: customer.customerId,
      name: customer.name,
      company: customer.businessName,
      ownerEmployeeId: employeeId,
      ...extra,
    };
  });
}

export function getEmployeePipelineCards(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeePipelineCard[] {
  const lostReasons: Record<string, string> = {
    'lead-107': 'Budget deferred to next FY',
  };

  return getLeadsForEmployee(employeeId).map((lead) => {
    const stage = mapCrmStageToEmployee(lead.status);
    return {
      leadId: lead.id,
      name: lead.name,
      company: lead.company,
      interestedService: lead.interestedService,
      priority: lead.priority,
      stage,
      lostReason: stage === 'lost' ? (lostReasons[lead.id] ?? 'Not specified') : null,
      stageHistory: [
        {
          id: `hist-${lead.id}-1`,
          fromStage: null,
          toStage: 'new',
          changedAt: '2026-07-10',
          changedBy: 'System',
          note: 'Lead created',
        },
        {
          id: `hist-${lead.id}-2`,
          fromStage: 'new',
          toStage: stage,
          changedAt: lead.lastContact ?? '2026-07-18',
          changedBy: demoEmployeeUser.name,
          note: 'Current stage (demo)',
        },
      ],
      ownerEmployeeId: employeeId,
    };
  });
}

export const demoFollowUpNotes: FollowUpNote[] = [
  {
    id: 'note-1',
    leadId: 'lead-105',
    leadName: 'Ravi Chandran',
    callOutcome: 'Discussed revised patient portal scope',
    whatsappOutcome: 'Shared quote PDF link (placeholder)',
    emailOutcome: 'Awaiting finance reply',
    meetingNotes: 'Prefers phased go-live',
    customerInterest: 'High — needs compliance module',
    objections: 'Timeline tight for August',
    nextAction: 'Send revised quote',
    nextFollowUpDate: '2026-07-22',
    author: 'Divya P.',
    authoredAt: '2026-07-21T16:40:00+05:30',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'note-2',
    leadId: 'lead-109',
    leadName: 'Vikram Seth',
    callOutcome: 'Discovery call completed',
    whatsappOutcome: '—',
    emailOutcome: 'Agenda shared',
    meetingNotes: 'Mapped B2B portal requirements',
    customerInterest: 'Medium-high',
    objections: 'Needs partner sign-off',
    nextAction: 'Confirm afternoon agenda',
    nextFollowUpDate: '2026-07-23',
    author: 'Divya P.',
    authoredAt: '2026-07-22T11:15:00+05:30',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'note-3',
    leadId: 'lead-101',
    leadName: 'Suresh Menon',
    callOutcome: 'ERP module walkthrough',
    whatsappOutcome: '—',
    emailOutcome: 'Proposal summary sent',
    meetingNotes: 'Go-live window discussed',
    customerInterest: 'High',
    objections: 'Integration cost concern',
    nextAction: 'Call before noon',
    nextFollowUpDate: '2026-07-24',
    author: 'Divya P.',
    authoredAt: '2026-07-20T14:05:00+05:30',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
];

export const demoEmployeeMeetings: EmployeeMeeting[] = [
  {
    id: 'mtg-1',
    relatedName: 'Vikram Seth · Northwind Traders',
    relatedKind: 'lead',
    relatedId: 'lead-109',
    meetingType: 'discovery',
    status: 'today',
    date: EMPLOYEE_DEMO_TODAY,
    time: '03:00 PM',
    agenda: 'Confirm B2B portal requirements and next steps',
    outcome: null,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'mtg-2',
    relatedName: 'Priya Sharma · Sunrise Retail',
    relatedKind: 'customer',
    relatedId: 'cus-001',
    meetingType: 'onboarding',
    status: 'upcoming',
    date: '2026-07-25',
    time: '11:00 AM',
    agenda: 'CMS training kickoff',
    outcome: null,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'mtg-3',
    relatedName: 'Suresh Menon · BluePeak Logistics',
    relatedKind: 'lead',
    relatedId: 'lead-101',
    meetingType: 'proposal_review',
    status: 'completed',
    date: '2026-07-20',
    time: '02:00 PM',
    agenda: 'ERP proposal walkthrough',
    outcome: 'Requested module pricing options',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'mtg-4',
    relatedName: 'Orbit Clinics · Ravi Chandran',
    relatedKind: 'lead',
    relatedId: 'lead-105',
    meetingType: 'negotiation',
    status: 'cancelled',
    date: '2026-07-21',
    time: '04:30 PM',
    agenda: 'Quote negotiation',
    outcome: 'Reschedule requested by client',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
];

export const demoEmployeeTasks: EmployeeTask[] = [
  {
    id: 'task-1',
    title: 'Send revised Orbit Clinics quote',
    relatedLabel: 'Ravi Chandran · Patient portal',
    relatedKind: 'lead',
    priority: 'high',
    dueDate: EMPLOYEE_DEMO_TODAY,
    status: 'pending',
    assignedBy: 'Arun Kumar (Admin)',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'task-2',
    title: 'Prepare CMS training checklist',
    relatedLabel: 'Sunrise Retail · Website redesign',
    relatedKind: 'project',
    priority: 'medium',
    dueDate: '2026-07-24',
    status: 'in_progress',
    assignedBy: 'Arun Kumar (Admin)',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'task-3',
    title: 'Collect brand assets from Coastal Dental',
    relatedLabel: 'Ananya Rao · Coastal Dental',
    relatedKind: 'customer',
    priority: 'low',
    dueDate: '2026-07-26',
    status: 'pending',
    assignedBy: 'Meena R. (Admin)',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'task-4',
    title: 'Log BluePeak ERP call notes',
    relatedLabel: 'Suresh Menon · Custom ERP',
    relatedKind: 'lead',
    priority: 'medium',
    dueDate: '2026-07-20',
    status: 'completed',
    assignedBy: 'Arun Kumar (Admin)',
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
];

export function getEmployeeCommunications(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeeCommunicationItem[] {
  const fromCrm = getCommunicationsForEmployee(employeeId).map((item) => ({
    id: item.id,
    channel: item.channel as EmployeeCommunicationItem['channel'],
    relatedName: item.leadName,
    summary: item.summary,
    occurredAt: item.occurredAt,
    author: item.author,
    ownerEmployeeId: employeeId,
  }));

  const extras: EmployeeCommunicationItem[] = [
    {
      id: 'ecom-1',
      channel: 'meeting',
      relatedName: 'Vikram Seth',
      summary: 'Discovery meeting booked for today 3 PM',
      occurredAt: '2026-07-22',
      author: 'Divya P.',
      ownerEmployeeId: employeeId,
    },
    {
      id: 'ecom-2',
      channel: 'note',
      relatedName: 'Priya Sharma',
      summary: 'Internal note: prefer WhatsApp for quick confirmations',
      occurredAt: '2026-07-21',
      author: 'Divya P.',
      ownerEmployeeId: employeeId,
    },
  ];

  return [...fromCrm, ...extras].sort((a, b) =>
    b.occurredAt.localeCompare(a.occurredAt),
  );
}

export const demoEmployeeNotifications: EmployeeNotification[] = [
  {
    id: 'en-1',
    kind: 'follow_up_due',
    title: 'Follow-up due today',
    detail: 'Vikram Seth · confirm afternoon agenda',
    occurredAt: '2026-07-23T08:00:00+05:30',
    read: false,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'en-2',
    kind: 'follow_up_overdue',
    title: 'Follow-up overdue',
    detail: 'Ravi Chandran · share revised quote',
    occurredAt: '2026-07-23T08:05:00+05:30',
    read: false,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'en-3',
    kind: 'meeting_reminder',
    title: 'Meeting reminder',
    detail: 'Northwind Traders discovery · 3:00 PM',
    occurredAt: '2026-07-23T09:00:00+05:30',
    read: false,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'en-4',
    kind: 'new_assignment',
    title: 'New assignment',
    detail: 'Task: Send revised Orbit Clinics quote',
    occurredAt: '2026-07-22T17:20:00+05:30',
    read: true,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'en-5',
    kind: 'admin_comment',
    title: 'Admin comment',
    detail: 'Arun: Please prioritize Orbit Clinics today',
    occurredAt: '2026-07-22T18:05:00+05:30',
    read: true,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
  {
    id: 'en-6',
    kind: 'lead_reassigned',
    title: 'Lead reassigned',
    detail: 'Leaf & Loom remains with Meena R. (FYI)',
    occurredAt: '2026-07-21T12:00:00+05:30',
    read: true,
    ownerEmployeeId: EMPLOYEE_DEMO_ID,
  },
];

export const demoEmployeeRecentActivities: EmployeeRecentActivity[] = [
  {
    id: 'act-1',
    kind: 'call',
    title: 'Call logged',
    detail: 'Ravi Chandran · patient portal scope',
    occurredAt: '2026-07-21',
  },
  {
    id: 'act-2',
    kind: 'meeting',
    title: 'Meeting completed',
    detail: 'BluePeak Logistics proposal review',
    occurredAt: '2026-07-20',
  },
  {
    id: 'act-3',
    kind: 'stage_change',
    title: 'Stage updated',
    detail: 'Suresh Menon → Proposal Sent',
    occurredAt: '2026-07-20',
  },
  {
    id: 'act-4',
    kind: 'task',
    title: 'Task completed',
    detail: 'Log BluePeak ERP call notes',
    occurredAt: '2026-07-20',
  },
  {
    id: 'act-5',
    kind: 'follow_up',
    title: 'Follow-up scheduled',
    detail: 'Vikram Seth · today 3:00 PM',
    occurredAt: '2026-07-22',
  },
];

export function getEmployeeDashboardSummary(
  employeeId: string = EMPLOYEE_DEMO_ID,
): EmployeeDashboardSummary {
  const leads = getEmployeeLeadRows(employeeId);
  const customers = getEmployeeCustomerRows(employeeId);
  const followUps = getEmployeeFollowUpRows(employeeId);
  const meetingsToday = demoEmployeeMeetings.filter(
    (m) => m.ownerEmployeeId === employeeId && m.status === 'today',
  ).length;
  const pendingTasks = demoEmployeeTasks.filter(
    (t) =>
      t.ownerEmployeeId === employeeId &&
      (t.status === 'pending' || t.status === 'in_progress'),
  ).length;

  return {
    todaysFollowUps: followUps.filter((f) => f.isToday).length,
    overdueFollowUps: followUps.filter((f) => f.isOverdue).length,
    assignedLeads: leads.length,
    assignedCustomers: customers.length,
    meetingsToday,
    pendingTasks,
    conversionCount: demoEmployeePerformance.conversionCount,
    conversionRatePercent: 27,
  };
}

export function formatEmployeeDateTime(iso: string): string {
  if (iso.includes('T')) {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso));
  }
  return formatDisplayDate(iso);
}
