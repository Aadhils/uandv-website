/**
 * Employee Workspace operational models — Sprint 3.0.8.
 * Scoped to assigned records via ownerEmployeeId / ownerUserId.
 * Demo / frontend only.
 */

import type { LeadPriority, LeadSource } from '@/lib/crm';

/** Employee follow-up board stages (distinct labels from Admin CRM pipeline). */
export type EmployeePipelineStage =
  | 'new'
  | 'contacted'
  | 'interested'
  | 'meeting_scheduled'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost'
  | 'follow_up_later';

export type MeetingStatus = 'today' | 'upcoming' | 'completed' | 'cancelled';

export type MeetingType =
  | 'discovery'
  | 'demo'
  | 'proposal_review'
  | 'negotiation'
  | 'onboarding';

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';

export type EmployeeNotificationKind =
  | 'new_assignment'
  | 'follow_up_due'
  | 'follow_up_overdue'
  | 'meeting_reminder'
  | 'admin_comment'
  | 'lead_reassigned';

export type EmployeeActivityKind =
  | 'follow_up'
  | 'call'
  | 'meeting'
  | 'task'
  | 'note'
  | 'stage_change';

export type EmployeeFollowUpRow = {
  id: string;
  leadId: string;
  name: string;
  company: string;
  interestedService: string;
  phone: string;
  lastContact: string | null;
  nextFollowUpDate: string;
  nextFollowUpTime: string;
  priority: LeadPriority;
  stage: EmployeePipelineStage;
  ownerEmployeeId: string;
  isOverdue: boolean;
  isToday: boolean;
};

export type EmployeeLeadRow = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  source: LeadSource;
  interestedService: string;
  leadScore: number;
  status: EmployeePipelineStage;
  nextFollowUp: string | null;
  lastActivity: string;
  ownerEmployeeId: string;
};

export type EmployeeCustomerRow = {
  id: string;
  customerId: string;
  name: string;
  company: string;
  activeProjects: number;
  latestCommunication: string;
  pendingApproval: string;
  supportStatus: 'open' | 'waiting' | 'resolved' | 'none';
  nextAction: string;
  ownerEmployeeId: string;
};

export type PipelineStageHistoryItem = {
  id: string;
  fromStage: EmployeePipelineStage | null;
  toStage: EmployeePipelineStage;
  changedAt: string;
  changedBy: string;
  note?: string;
};

export type EmployeePipelineCard = {
  leadId: string;
  name: string;
  company: string;
  interestedService: string;
  priority: LeadPriority;
  stage: EmployeePipelineStage;
  lostReason: string | null;
  stageHistory: PipelineStageHistoryItem[];
  ownerEmployeeId: string;
};

export type FollowUpNote = {
  id: string;
  leadId: string;
  leadName: string;
  callOutcome: string;
  whatsappOutcome: string;
  emailOutcome: string;
  meetingNotes: string;
  customerInterest: string;
  objections: string;
  nextAction: string;
  nextFollowUpDate: string;
  author: string;
  authoredAt: string;
  ownerEmployeeId: string;
};

export type EmployeeMeeting = {
  id: string;
  relatedName: string;
  relatedKind: 'lead' | 'customer';
  relatedId: string;
  meetingType: MeetingType;
  status: MeetingStatus;
  date: string;
  time: string;
  agenda: string;
  outcome: string | null;
  ownerEmployeeId: string;
};

export type EmployeeTask = {
  id: string;
  title: string;
  relatedLabel: string;
  relatedKind: 'lead' | 'customer' | 'project';
  priority: LeadPriority;
  dueDate: string;
  status: TaskStatus;
  assignedBy: string;
  ownerEmployeeId: string;
};

export type EmployeeCommunicationItem = {
  id: string;
  channel: 'call' | 'whatsapp' | 'email' | 'meeting' | 'note';
  relatedName: string;
  summary: string;
  occurredAt: string;
  author: string;
  ownerEmployeeId: string;
};

export type DailyWorkReport = {
  id: string;
  employeeId: string;
  reportDate: string;
  callsCompleted: number;
  followUpsCompleted: number;
  meetingsCompleted: number;
  leadsProgressed: number;
  proposalsRequested: number;
  customersConverted: number;
  notes: string;
  status: 'draft' | 'submitted';
};

export type EmployeePerformance = {
  dailyTarget: number;
  weeklyTarget: number;
  followUpCompletionRatePercent: number;
  conversionCount: number;
  overdueCount: number;
  customerResponseRatePercent: number;
};

export type EmployeeNotification = {
  id: string;
  kind: EmployeeNotificationKind;
  title: string;
  detail: string;
  occurredAt: string;
  read: boolean;
  ownerEmployeeId: string;
};

export type EmployeeRecentActivity = {
  id: string;
  kind: EmployeeActivityKind;
  title: string;
  detail: string;
  occurredAt: string;
};

export type EmployeeProfile = {
  userId: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  title: string;
  timezone: string;
};

export type EmployeeDashboardSummary = {
  todaysFollowUps: number;
  overdueFollowUps: number;
  assignedLeads: number;
  assignedCustomers: number;
  meetingsToday: number;
  pendingTasks: number;
  conversionCount: number;
  conversionRatePercent: number;
};
