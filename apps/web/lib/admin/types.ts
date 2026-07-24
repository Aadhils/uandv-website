/**
 * Admin Workspace typed models — demo/frontend foundation only.
 * Reusable shapes for future production Admin ops (no backend yet).
 */

export type AdminPriority = 'low' | 'medium' | 'high' | 'urgent';

export type AdminProjectStatus =
  | 'draft'
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'at_risk';

export type AdminPaymentStatus =
  | 'paid'
  | 'pending'
  | 'overdue'
  | 'upcoming'
  | 'reminded';

export type AdminTicketStatus =
  | 'open'
  | 'in_progress'
  | 'waiting'
  | 'resolved'
  | 'closed';

export type AdminDocumentKind =
  | 'agreement'
  | 'proposal'
  | 'invoice'
  | 'logo'
  | 'source_code'
  | 'credentials';

export type AdminNotificationKind =
  | 'signup'
  | 'payment_due'
  | 'project_delay'
  | 'renewal_due';

export type AdminDashboardMetrics = {
  totalCustomers: number;
  activeProjects: number;
  revenueInr: number;
  pendingPaymentsInr: number;
  openTickets: number;
};

export type AdminActivity = {
  id: string;
  title: string;
  detail: string;
  occurredAt: string;
};

export type AdminCustomer = {
  id: string;
  name: string;
  businessName: string;
  email: string;
  mobile: string;
  city: string;
  status: 'active' | 'onboarding' | 'inactive';
  projectsCount: number;
  joinedAt: string;
  history: Array<{ id: string; title: string; date: string }>;
};

export type AdminProject = {
  id: string;
  name: string;
  customerName: string;
  status: AdminProjectStatus;
  progress: number;
  assignedTeam: string;
  currentMilestone: string;
  targetCompletionDate: string;
};

export type AdminMilestone = {
  id: string;
  projectId: string;
  title: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'blocked';
  dueDate: string;
};

export type AdminInvoice = {
  id: string;
  number: string;
  customerName: string;
  amountInr: number;
  status: AdminPaymentStatus;
  dueDate: string;
  reminderStatus: 'none' | 'sent' | 'scheduled';
  paidDate: string | null;
};

export type AdminWorkUpdate = {
  id: string;
  projectName: string;
  customerName: string;
  title: string;
  body: string;
  author: string;
  pushedToCustomer: boolean;
  timelineEntry: boolean;
  notificationEntry: boolean;
  createdAt: string;
};

export type AdminTicket = {
  id: string;
  subject: string;
  customerName: string;
  priority: AdminPriority;
  status: AdminTicketStatus;
  assignedStaff: string;
  updatedAt: string;
  latestReply: string;
};

export type AdminDocument = {
  id: string;
  name: string;
  kind: AdminDocumentKind;
  customerName: string;
  vaultStatus: 'not_applicable' | 'secure_vault' | 'pending_setup';
  updatedAt: string;
};

export type AdminNotification = {
  id: string;
  kind: AdminNotificationKind;
  title: string;
  description: string;
  createdAt: string;
  unread: boolean;
};

export type AdminReportPoint = {
  id: string;
  label: string;
  value: string;
  hint: string;
};
