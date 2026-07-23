/**
 * Customer Workspace typed models — demo/frontend foundation only.
 * Reusable shapes for future Vendor / Partner / Employee / Admin workspaces.
 */

export type ProjectStatus =
  | 'draft'
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'cancelled';

export type RequestStatus =
  | 'submitted'
  | 'in_review'
  | 'quoted'
  | 'approved'
  | 'closed';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type AgreementStatus =
  | 'draft'
  | 'pending_signature'
  | 'signed'
  | 'expired'
  | 'renewal_due';

export type PaymentStatus =
  | 'paid'
  | 'pending'
  | 'overdue'
  | 'upcoming'
  | 'failed';

export type DocumentCategory =
  | 'agreements'
  | 'invoices'
  | 'legal'
  | 'project_files'
  | 'certificates';

export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';

export type TimelineEventType =
  | 'account_created'
  | 'service_requested'
  | 'enquiry_received'
  | 'proposal_shared'
  | 'agreement_signed'
  | 'advance_received'
  | 'payment_received'
  | 'project_started'
  | 'milestone_completed'
  | 'approval_requested'
  | 'deployment_planned'
  | 'deployment_completed'
  | 'support_event';

export type NotificationCategory =
  | 'project'
  | 'payment'
  | 'document'
  | 'support'
  | 'legal';

export type AssetType =
  | 'website'
  | 'mobile_app'
  | 'logo'
  | 'brand'
  | 'domain'
  | 'hosting'
  | 'source_code'
  | 'credentials';

export type CredentialStatus = 'not_applicable' | 'secure_vault' | 'pending_setup';

export type CustomerProject = {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  assignedTeam: string;
  startDate: string;
  targetCompletionDate: string;
  summary: string;
  phase?: string;
  currentMilestone?: string;
  /** Demo next action for dashboard progress cards */
  nextAction?: string;
};

export type MilestoneStatus = 'upcoming' | 'in_progress' | 'completed' | 'blocked';

/** 0–100 business health scores — demo values only. */
export type BusinessHealthScore = {
  overall: number;
  project: number;
  payment: number;
  documentation: number;
  support: number;
  renewal: number;
  /** Always clarify demo nature in UI */
  disclaimer: string;
};

export type RenewalKind =
  | 'domain'
  | 'hosting'
  | 'ssl'
  | 'software_maintenance'
  | 'digital_business_card';

export type RenewalStatus = 'healthy' | 'due_soon' | 'overdue' | 'active';

export type RenewalItem = {
  id: string;
  kind: RenewalKind;
  name: string;
  renewalDate: string;
  daysRemaining: number;
  status: RenewalStatus;
};

/** Aggregated payment snapshot for Customer Business Workspace dashboard. */
export type BusinessPaymentSnapshot = {
  totalProjectValueInr: number;
  amountPaidInr: number;
  balanceInr: number;
  nextPaymentDueDate: string;
  status: PaymentStatus;
  statusLabel: string;
};

export type DashboardSummaryCounts = {
  activeProjects: number;
  pendingApprovals: number;
  pendingPayments: number;
  openSupportTickets: number;
  documentsAwaitingAction: number;
  upcomingRenewals: number;
};

/** Project delivery milestone for lifecycle timelines. */
export type ProjectMilestone = {
  id: string;
  projectId: string;
  title: string;
  status: MilestoneStatus;
  dueDate: string;
  completedDate: string | null;
  description: string;
};

export type WorkUpdateKind =
  | 'progress'
  | 'milestone'
  | 'blocker'
  | 'delivery'
  | 'note';

/** Chronological work update posted against a project (demo feed). */
export type WorkUpdate = {
  id: string;
  projectId: string;
  projectName: string;
  kind: WorkUpdateKind;
  title: string;
  body: string;
  author: string;
  occurredAt: string;
};

export type AdminPreviewMetric = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

export type AdminQueueItem = {
  id: string;
  title: string;
  workspace: 'customer' | 'vendor' | 'partner' | 'internal';
  priority: Priority;
  statusLabel: string;
  updatedAt: string;
};

export type ServiceRequest = {
  id: string;
  title: string;
  category: string;
  status: RequestStatus;
  priority: Priority;
  createdAt: string;
  assignedTeam: string;
};

export type Agreement = {
  id: string;
  title: string;
  status: AgreementStatus;
  signedDate: string | null;
  expiryOrRenewalDate: string;
  auditLabel: string;
};

export type Invoice = {
  id: string;
  number: string;
  description: string;
  amountInr: number;
  status: PaymentStatus;
  dueDate: string;
  paidDate: string | null;
};

export type PaymentSummary = {
  totalPaidInr: number;
  pendingInr: number;
  upcomingInr: number;
  upcomingLabel: string;
};

export type CustomerDocument = {
  id: string;
  name: string;
  category: DocumentCategory;
  version: string;
  updatedAt: string;
  auditLabel: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  priority: Priority;
  status: TicketStatus;
  updatedAt: string;
  conversationPreview: string;
};

export type TimelineEvent = {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  occurredAt: string;
};

export type CustomerNotification = {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  createdAt: string;
  unread: boolean;
};

export type CustomerAsset = {
  id: string;
  name: string;
  type: AssetType;
  statusLabel: string;
  credentialStatus: CredentialStatus;
  notes: string;
};

export type CustomerProfile = {
  fullName: string;
  email: string;
  mobile: string;
  businessName: string;
  businessType: string;
  gstinPlaceholder: string;
  city: string;
  state: string;
  preferredLanguage: string;
  emailUpdates: boolean;
  smsUpdates: boolean;
  whatsappUpdates: boolean;
};
