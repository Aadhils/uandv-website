/**
 * Lead Management & CRM typed models — demo UI foundation only.
 * Ownership and assignment use shared identity userId + employeeId (no separate auth DB).
 */

import type { Capability } from '@/lib/auth';

export type LeadPipelineStage =
  | 'new'
  | 'contacted'
  | 'interested'
  | 'meeting'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'customer'
  | 'lost';

export type LeadSource =
  | 'website'
  | 'whatsapp'
  | 'referral'
  | 'campaign'
  | 'walk_in'
  | 'other';

export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';

export type CommunicationChannel =
  | 'call'
  | 'whatsapp'
  | 'email'
  | 'note'
  | 'meeting';

export type NewsletterStatus = 'draft' | 'scheduled' | 'sent';

export type EmployeeInviteStatus = 'active' | 'invited' | 'suspended';

export type LeadDashboardMetrics = {
  totalLeads: number;
  newLeads: number;
  hotLeads: number;
  convertedCustomers: number;
  lostLeads: number;
  conversionRatePercent: number;
};

/** Internal employee record linked to a shared identity userId. */
export type CrmEmployee = {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  status: EmployeeInviteStatus;
  /** Demo permission toggles controlled by Admin UI. */
  permissions: Capability[];
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  interestedService: string;
  source: LeadSource;
  status: LeadPipelineStage;
  isHot: boolean;
  /** Display name — prefer ownerEmployeeId for ownership logic. */
  assignedEmployee: string;
  ownerEmployeeId: string | null;
  ownerUserId: string | null;
  department: string;
  priority: LeadPriority;
  nextFollowUp: string | null;
  lastContact: string | null;
  reminderLabel: string;
  activityScore: number;
  conversionProbability: number;
};

export type LeadFollowUp = {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  nextFollowUp: string;
  lastContact: string;
  assignedEmployee: string;
  ownerEmployeeId: string | null;
  reminder: string;
  status: LeadPipelineStage;
  isOverdue: boolean;
};

export type LeadCommunication = {
  id: string;
  leadId: string;
  leadName: string;
  channel: CommunicationChannel;
  summary: string;
  occurredAt: string;
  author: string;
  authorEmployeeId: string | null;
};

export type NewsletterCampaign = {
  id: string;
  name: string;
  status: NewsletterStatus;
  audienceLabel: string;
  updatedAt: string;
  sentAt: string | null;
};

export type LeadAssignment = {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  assignedEmployee: string;
  ownerEmployeeId: string | null;
  department: string;
  priority: LeadPriority;
  status: LeadPipelineStage;
};

/** Customer ownership scoped to an employee (Employee Workspace only sees assigned). */
export type AssignedCustomer = {
  id: string;
  customerId: string;
  name: string;
  businessName: string;
  ownerEmployeeId: string;
  ownerUserId: string;
  status: 'active' | 'onboarding' | 'inactive';
};

export type EmployeeFollowUpHistoryItem = {
  id: string;
  employeeId: string;
  employeeName: string;
  leadId: string;
  leadName: string;
  action: string;
  occurredAt: string;
  nextFollowUp: string | null;
};

export type EmployeeWorkUpdate = {
  id: string;
  employeeId: string;
  employeeName: string;
  summary: string;
  submittedAt: string;
  status: 'submitted' | 'draft';
};

export type CrmConversionReportPoint = {
  id: string;
  label: string;
  value: string;
  hint: string;
};
