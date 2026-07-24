/**
 * Shared Project & Service Delivery models — Sprint 3.1.0.
 * One canonical model for Admin, Customer, Employee, and Vendor projections.
 * Demo / frontend only.
 */

export type ServiceCategory =
  | 'website_app_development'
  | 'gst_registration'
  | 'company_formation'
  | 'trademark'
  | 'accounting'
  | 'digital_marketing'
  | 'branding'
  | 'legal_support'
  | 'hosting'
  | 'ai_automation';

export type ProjectLifecycleStage =
  | 'enquiry'
  | 'requirement_discovery'
  | 'proposal'
  | 'quotation'
  | 'agreement'
  | 'advance_payment'
  | 'planning'
  | 'design'
  | 'development_execution'
  | 'internal_review'
  | 'customer_review'
  | 'revision'
  | 'testing_verification'
  | 'final_approval'
  | 'deployment_submission'
  | 'handover'
  | 'training'
  | 'completed'
  | 'support'
  | 'renewal_amc';

export type VisibilityScope =
  | 'admin_only'
  | 'internal_team'
  | 'customer_visible'
  | 'vendor_visible';

export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectHealthStatus =
  | 'on_track'
  | 'at_risk'
  | 'delayed'
  | 'blocked'
  | 'completed';

export type TaskStatus =
  | 'todo'
  | 'in_progress'
  | 'blocked'
  | 'awaiting_review'
  | 'completed';

export type ApprovalType =
  | 'requirement'
  | 'design'
  | 'scope'
  | 'content'
  | 'payment'
  | 'final_delivery'
  | 'change_request';

export type ApprovalStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'expired';

export type DocumentCategory =
  | 'requirement'
  | 'proposal'
  | 'quotation'
  | 'agreement'
  | 'invoice'
  | 'customer_input'
  | 'design'
  | 'deliverable'
  | 'legal'
  | 'compliance'
  | 'source_code_status'
  | 'handover'
  | 'training'
  | 'support';

export type AssignmentRole =
  | 'project_owner'
  | 'internal_employee'
  | 'team'
  | 'vendor'
  | 'reviewer'
  | 'approver';

export type ParticipantKind = 'customer' | 'employee' | 'vendor' | 'admin';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export type RiskStatus = 'open' | 'mitigating' | 'resolved' | 'accepted';

export type Project = {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  customerBusinessName: string;
  serviceCategory: ServiceCategory;
  ownerEmployeeId: string;
  ownerName: string;
  priority: ProjectPriority;
  health: ProjectHealthStatus;
  currentStage: ProjectLifecycleStage;
  completionPercent: number;
  startDate: string;
  targetCompletionDate: string;
  projectValueInr: number;
  advanceAmountInr: number;
  /** Stages enabled for this service type (ordered). */
  stagePath: ProjectLifecycleStage[];
  requiredDocumentCategories: DocumentCategory[];
  customerVisibilityNotes: string;
  vendorContextPermitted: boolean;
};

export type ProjectService = {
  id: string;
  projectId: string;
  category: ServiceCategory;
  label: string;
  scopeSummary: string;
};

export type ProjectStage = {
  id: string;
  projectId: string;
  stage: ProjectLifecycleStage;
  status: 'upcoming' | 'active' | 'completed' | 'skipped';
  startedAt: string | null;
  completedAt: string | null;
  order: number;
};

export type ProjectMilestone = {
  id: string;
  projectId: string;
  title: string;
  relatedStage: ProjectLifecycleStage;
  dueDate: string;
  completedAt: string | null;
  status: 'upcoming' | 'in_progress' | 'completed' | 'delayed';
  description: string;
  customerVisible: boolean;
};

export type ProjectTask = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  relatedStage: ProjectLifecycleStage;
  assigneeKind: 'employee' | 'vendor';
  assigneeId: string;
  assigneeName: string;
  priority: ProjectPriority;
  startDate: string;
  dueDate: string;
  status: TaskStatus;
  completionPercent: number;
  dependencyIds: string[];
  internalNotes: string;
  customerVisibleUpdate: boolean;
  vendorWorkOrderId: string | null;
};

export type ProjectAssignment = {
  id: string;
  projectId: string;
  role: AssignmentRole;
  participantId: string;
  participantName: string;
  responsibility: string;
  assignedAt: string;
  dueDate: string | null;
  workloadPlaceholder: string;
  status: 'active' | 'completed' | 'reassigned';
};

export type ProjectParticipant = {
  id: string;
  projectId: string;
  kind: ParticipantKind;
  refId: string;
  displayName: string;
  label: string;
};

export type ProjectUpdate = {
  id: string;
  projectId: string;
  stage: ProjectLifecycleStage;
  milestoneId: string | null;
  title: string;
  description: string;
  completionImpactPercent: number;
  customerVisible: boolean;
  vendorVisible: boolean;
  approvalRequired: boolean;
  nextAction: string;
  dueDate: string | null;
  authorId: string;
  authorName: string;
  authorRole: ParticipantKind;
  createdAt: string;
  relatedTaskId: string | null;
};

export type ProjectApproval = {
  id: string;
  projectId: string;
  type: ApprovalType;
  title: string;
  requestedBy: string;
  requestedFrom: string;
  requestedAt: string;
  dueDate: string;
  status: ApprovalStatus;
  comments: string;
  decidedAt: string | null;
  relatedStage: ProjectLifecycleStage;
  relatedDocumentId: string | null;
  relatedDeliverableLabel: string | null;
  customerActionable: boolean;
};

export type ProjectDocument = {
  id: string;
  projectId: string;
  name: string;
  version: string;
  category: DocumentCategory;
  ownerName: string;
  visibility: VisibilityScope;
  uploadedAt: string;
  reviewStatus: 'pending' | 'in_review' | 'approved' | 'rejected';
  approvalStatus: 'not_required' | 'pending' | 'approved' | 'rejected';
  auditPlaceholder: string;
};

export type PaymentMilestoneItem = {
  id: string;
  label: string;
  amountInr: number;
  dueDate: string;
  status: 'upcoming' | 'due' | 'paid' | 'overdue';
  invoiceStatus: 'not_raised' | 'draft' | 'sent' | 'paid';
};

export type ProjectPaymentSummary = {
  projectId: string;
  projectValueInr: number;
  advanceInr: number;
  paidAmountInr: number;
  pendingAmountInr: number;
  milestones: PaymentMilestoneItem[];
  customerVisible: boolean;
};

export type ProjectActivity = {
  id: string;
  projectId: string;
  occurredAt: string;
  eventType: string;
  title: string;
  description: string;
  actorName: string;
  actorRole: ParticipantKind | 'system';
  visibility: VisibilityScope;
  relatedStage: ProjectLifecycleStage | null;
  relatedMilestoneId: string | null;
  relatedDocumentId: string | null;
  relatedPaymentId: string | null;
  relatedApprovalId: string | null;
  auditMetadata: string;
};

export type ProjectRisk = {
  id: string;
  projectId: string;
  title: string;
  type: string;
  severity: RiskSeverity;
  ownerName: string;
  impact: string;
  mitigation: string;
  status: RiskStatus;
  relatedTaskId: string | null;
  relatedMilestoneId: string | null;
  customerVisible: boolean;
  vendorDependency: boolean;
  delayDays: number;
};

export type ProjectDependency = {
  id: string;
  projectId: string;
  fromTaskId: string;
  toTaskId: string;
  note: string;
};

export type ProjectAuditEntry = {
  id: string;
  projectId: string;
  occurredAt: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId: string;
  visibility: VisibilityScope;
  detail: string;
};

export type ProjectDeliveryHealth = {
  activeProjects: number;
  delayedProjects: number;
  pendingCustomerApprovals: number;
  pendingPayments: number;
  vendorDelays: number;
  employeeDelays: number;
  highRiskProjects: number;
};
