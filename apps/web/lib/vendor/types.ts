/**
 * Vendor Workspace typed models — Sprint 3.0.9.
 * Assigned records only via vendorId / ownerUserId. Demo UI foundation.
 */

export type VendorWorkPriority = 'low' | 'medium' | 'high' | 'urgent';

export type VendorWorkStatus =
  | 'assigned'
  | 'in_progress'
  | 'awaiting_review'
  | 'revision_requested'
  | 'completed'
  | 'on_hold';

export type VendorDeliverableStatus =
  | 'pending'
  | 'submitted'
  | 'awaiting_review'
  | 'revision_requested'
  | 'approved';

export type VendorInvoiceStatus =
  | 'draft'
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'revision_required'
  | 'paid';

export type VendorPaymentStatus = 'pending' | 'processing' | 'paid' | 'on_hold';

export type VendorDocumentKind =
  | 'nda'
  | 'vendor_agreement'
  | 'pan'
  | 'gst'
  | 'bank_verification'
  | 'kyc'
  | 'work_order';

export type VendorDocumentStatus =
  | 'missing'
  | 'submitted'
  | 'verified'
  | 'expired'
  | 'expiring_soon';

export type VendorMessageKind =
  | 'admin_message'
  | 'internal_note'
  | 'clarification'
  | 'revision_feedback'
  | 'meeting_summary';

export type VendorMeetingStatus = 'upcoming' | 'completed' | 'cancelled';

export type VendorMeetingType =
  | 'kickoff'
  | 'review'
  | 'clarification'
  | 'handover';

export type VendorNotificationKind =
  | 'new_assignment'
  | 'deadline_reminder'
  | 'deliverable_review_completed'
  | 'revision_requested'
  | 'invoice_approved'
  | 'payment_processed'
  | 'document_expiry_reminder'
  | 'meeting_reminder';

export type VendorProfile = {
  userId: string;
  vendorId: string;
  displayName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  timezone: string;
};

/** Limited project context — never full customer records. */
export type VendorLimitedProjectContext = {
  projectCode: string;
  projectLabel: string;
  industryHint: string;
};

export type VendorAssignment = {
  id: string;
  title: string;
  category: string;
  assignedBy: string;
  priority: VendorWorkPriority;
  startDate: string;
  deadline: string;
  status: VendorWorkStatus;
  completionPercent: number;
  requiredDeliverables: string[];
  adminNotes: string;
  vendorId: string;
  ownerUserId: string;
  /** When false, UI must not show customer/project context. */
  customerContextPermitted: boolean;
  limitedContext: VendorLimitedProjectContext | null;
};

export type VendorDeliverable = {
  id: string;
  title: string;
  assignmentId: string;
  assignmentTitle: string;
  version: string;
  dueDate: string;
  submittedDate: string | null;
  status: VendorDeliverableStatus;
  adminFeedback: string;
  vendorId: string;
};

export type VendorInvoice = {
  id: string;
  invoiceNumber: string;
  workOrderId: string;
  workOrderTitle: string;
  amountInr: number;
  gstPlaceholder: string;
  tdsPlaceholder: string;
  submittedDate: string | null;
  status: VendorInvoiceStatus;
  vendorId: string;
};

export type VendorPaymentSummary = {
  approvedAmountInr: number;
  paidAmountInr: number;
  pendingAmountInr: number;
  expectedPaymentDate: string;
  tdsDeductionPlaceholder: string;
};

export type VendorPaymentHistoryItem = {
  id: string;
  invoiceNumber: string;
  amountInr: number;
  status: VendorPaymentStatus;
  paidDate: string | null;
  expectedDate: string;
  referencePlaceholder: string;
  vendorId: string;
};

export type VendorDocument = {
  id: string;
  kind: VendorDocumentKind;
  title: string;
  status: VendorDocumentStatus;
  expiryDate: string | null;
  /** Masked display only — never real identity/bank numbers. */
  maskedReference: string;
  vendorId: string;
};

export type VendorMessage = {
  id: string;
  kind: VendorMessageKind;
  title: string;
  body: string;
  occurredAt: string;
  author: string;
  relatedLabel: string;
  vendorId: string;
};

export type VendorMeeting = {
  id: string;
  title: string;
  meetingType: VendorMeetingType;
  status: VendorMeetingStatus;
  date: string;
  time: string;
  agenda: string;
  adminAttendees: string[];
  outcome: string | null;
  vendorId: string;
};

export type VendorPerformance = {
  activeAssignments: number;
  completedAssignments: number;
  onTimeDeliveryRatePercent: number;
  qualityScore: number;
  revisionCount: number;
  acceptanceRatePercent: number;
  averageTurnaroundDays: number;
  adminRatingPlaceholder: string;
};

export type VendorNotification = {
  id: string;
  kind: VendorNotificationKind;
  title: string;
  detail: string;
  occurredAt: string;
  read: boolean;
  vendorId: string;
};

export type VendorDashboardSummary = {
  activeAssignments: number;
  pendingDeliverables: number;
  awaitingReview: number;
  approvedDeliverables: number;
  pendingInvoices: number;
  pendingPayments: number;
  upcomingDeadlines: number;
  unreadNotifications: number;
};
