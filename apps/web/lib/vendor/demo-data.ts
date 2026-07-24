/**
 * Vendor Workspace demo data — Sprint 3.0.9.
 * Scoped to DEMO vendor (ven-001). Masked compliance fields only.
 */

import { demoVendorUser } from './session';
import type {
  VendorAssignment,
  VendorDashboardSummary,
  VendorDeliverable,
  VendorDocument,
  VendorInvoice,
  VendorMeeting,
  VendorMessage,
  VendorNotification,
  VendorPaymentHistoryItem,
  VendorPaymentSummary,
  VendorPerformance,
  VendorProfile,
} from './types';

export const VENDOR_DEMO_TODAY = '2026-07-23';
export const VENDOR_DEMO_ID = demoVendorUser.vendorId;

export const demoVendorProfile: VendorProfile = {
  userId: demoVendorUser.userId,
  vendorId: demoVendorUser.vendorId,
  displayName: 'Karthik Design Studio',
  contactName: 'Karthik R.',
  email: 'karthik@demo.vendor.uandv.local',
  phone: '+91 98XXX XX210',
  category: 'UI / Brand Design',
  city: 'Coimbatore',
  timezone: 'Asia/Kolkata',
};

export const demoVendorAssignments: VendorAssignment[] = [
  {
    id: 'va-101',
    title: 'Website redesign — homepage UI kit',
    category: 'UI Design',
    assignedBy: 'Arun Kumar (Admin)',
    priority: 'high',
    startDate: '2026-07-10',
    deadline: '2026-07-28',
    status: 'in_progress',
    completionPercent: 62,
    requiredDeliverables: ['Figma UI kit', 'Mobile breakpoints', 'Style notes'],
    adminNotes: 'Match existing brand tokens; prefer desktop-first frames.',
    vendorId: VENDOR_DEMO_ID,
    ownerUserId: demoVendorUser.userId,
    customerContextPermitted: true,
    limitedContext: {
      projectCode: 'PRJ-SR-204',
      projectLabel: 'Retail website redesign',
      industryHint: 'Retail',
    },
  },
  {
    id: 'va-102',
    title: 'Brand logo refresh options',
    category: 'Branding',
    assignedBy: 'Meena R. (Admin)',
    priority: 'medium',
    startDate: '2026-07-15',
    deadline: '2026-07-24',
    status: 'awaiting_review',
    completionPercent: 100,
    requiredDeliverables: ['3 logo directions', 'Usage sheet'],
    adminNotes: 'Avoid literal medical icons.',
    vendorId: VENDOR_DEMO_ID,
    ownerUserId: demoVendorUser.userId,
    customerContextPermitted: true,
    limitedContext: {
      projectCode: 'PRJ-CD-088',
      projectLabel: 'Clinic brand refresh',
      industryHint: 'Healthcare',
    },
  },
  {
    id: 'va-103',
    title: 'Social campaign creatives (Q3)',
    category: 'Marketing Design',
    assignedBy: 'Arun Kumar (Admin)',
    priority: 'urgent',
    startDate: '2026-07-18',
    deadline: '2026-07-23',
    status: 'revision_requested',
    completionPercent: 80,
    requiredDeliverables: ['6 static creatives', 'Story variants'],
    adminNotes: 'Tighten CTA hierarchy on slides 2 and 5.',
    vendorId: VENDOR_DEMO_ID,
    ownerUserId: demoVendorUser.userId,
    customerContextPermitted: false,
    limitedContext: null,
  },
  {
    id: 'va-104',
    title: 'Pitch deck illustration pack',
    category: 'Illustration',
    assignedBy: 'Arun Kumar (Admin)',
    priority: 'low',
    startDate: '2026-07-01',
    deadline: '2026-07-12',
    status: 'completed',
    completionPercent: 100,
    requiredDeliverables: ['12 illustrations', 'SVG exports'],
    adminNotes: 'Approved and archived.',
    vendorId: VENDOR_DEMO_ID,
    ownerUserId: demoVendorUser.userId,
    customerContextPermitted: false,
    limitedContext: null,
  },
];

export const demoVendorDeliverables: VendorDeliverable[] = [
  {
    id: 'vd-1',
    title: 'Homepage UI kit v2',
    assignmentId: 'va-101',
    assignmentTitle: 'Website redesign — homepage UI kit',
    version: 'v2.0',
    dueDate: '2026-07-25',
    submittedDate: null,
    status: 'pending',
    adminFeedback: '—',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vd-2',
    title: 'Logo directions pack',
    assignmentId: 'va-102',
    assignmentTitle: 'Brand logo refresh options',
    version: 'v1.1',
    dueDate: '2026-07-22',
    submittedDate: '2026-07-22',
    status: 'awaiting_review',
    adminFeedback: 'In review with brand lead.',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vd-3',
    title: 'Q3 social creatives',
    assignmentId: 'va-103',
    assignmentTitle: 'Social campaign creatives (Q3)',
    version: 'v1.0',
    dueDate: '2026-07-23',
    submittedDate: '2026-07-21',
    status: 'revision_requested',
    adminFeedback: 'Increase contrast on CTA buttons; resubmit by EOD.',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vd-4',
    title: 'Pitch illustrations',
    assignmentId: 'va-104',
    assignmentTitle: 'Pitch deck illustration pack',
    version: 'v1.2',
    dueDate: '2026-07-12',
    submittedDate: '2026-07-11',
    status: 'approved',
    adminFeedback: 'Approved — excellent turnaround.',
    vendorId: VENDOR_DEMO_ID,
  },
];

export const demoVendorInvoices: VendorInvoice[] = [
  {
    id: 'vi-1',
    invoiceNumber: 'VEN-INV-2026-014',
    workOrderId: 'va-104',
    workOrderTitle: 'Pitch deck illustration pack',
    amountInr: 45000,
    gstPlaceholder: 'GST 18% (demo placeholder)',
    tdsPlaceholder: 'TDS 10% (demo placeholder)',
    submittedDate: '2026-07-13',
    status: 'approved',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vi-2',
    invoiceNumber: 'VEN-INV-2026-018',
    workOrderId: 'va-102',
    workOrderTitle: 'Brand logo refresh options',
    amountInr: 28000,
    gstPlaceholder: 'GST 18% (demo placeholder)',
    tdsPlaceholder: 'TDS 10% (demo placeholder)',
    submittedDate: '2026-07-22',
    status: 'submitted',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vi-3',
    invoiceNumber: 'VEN-INV-2026-019',
    workOrderId: 'va-101',
    workOrderTitle: 'Website redesign — homepage UI kit',
    amountInr: 62000,
    gstPlaceholder: 'GST 18% (demo placeholder)',
    tdsPlaceholder: 'TDS 10% (demo placeholder)',
    submittedDate: null,
    status: 'draft',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vi-4',
    invoiceNumber: 'VEN-INV-2026-011',
    workOrderId: 'va-103',
    workOrderTitle: 'Social campaign creatives (Q3)',
    amountInr: 18000,
    gstPlaceholder: 'GST 18% (demo placeholder)',
    tdsPlaceholder: 'TDS 10% (demo placeholder)',
    submittedDate: '2026-07-19',
    status: 'revision_required',
    vendorId: VENDOR_DEMO_ID,
  },
];

export const demoVendorPaymentSummary: VendorPaymentSummary = {
  approvedAmountInr: 45000,
  paidAmountInr: 30000,
  pendingAmountInr: 15000,
  expectedPaymentDate: '2026-07-30',
  tdsDeductionPlaceholder: 'TDS withheld shown as demo placeholder only',
};

export const demoVendorPaymentHistory: VendorPaymentHistoryItem[] = [
  {
    id: 'vp-1',
    invoiceNumber: 'VEN-INV-2026-014',
    amountInr: 30000,
    status: 'paid',
    paidDate: '2026-07-20',
    expectedDate: '2026-07-20',
    referencePlaceholder: 'REF-DEMO-****4210',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vp-2',
    invoiceNumber: 'VEN-INV-2026-014',
    amountInr: 15000,
    status: 'pending',
    paidDate: null,
    expectedDate: '2026-07-30',
    referencePlaceholder: 'Pending release (demo)',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vp-3',
    invoiceNumber: 'VEN-INV-2026-018',
    amountInr: 28000,
    status: 'on_hold',
    paidDate: null,
    expectedDate: '2026-08-05',
    referencePlaceholder: 'Awaiting invoice approval (demo)',
    vendorId: VENDOR_DEMO_ID,
  },
];

export const demoVendorDocuments: VendorDocument[] = [
  {
    id: 'vdoc-1',
    kind: 'nda',
    title: 'Non-disclosure agreement',
    status: 'verified',
    expiryDate: '2027-01-15',
    maskedReference: 'NDA-****-2026',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vdoc-2',
    kind: 'vendor_agreement',
    title: 'Vendor service agreement',
    status: 'verified',
    expiryDate: '2026-12-31',
    maskedReference: 'AGR-****-884',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vdoc-3',
    kind: 'pan',
    title: 'PAN verification',
    status: 'verified',
    expiryDate: null,
    maskedReference: 'PAN ••••X1234 (masked)',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vdoc-4',
    kind: 'gst',
    title: 'GST certificate',
    status: 'expiring_soon',
    expiryDate: '2026-08-10',
    maskedReference: 'GSTIN ••••••••••1Z5 (masked)',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vdoc-5',
    kind: 'bank_verification',
    title: 'Bank verification',
    status: 'submitted',
    expiryDate: null,
    maskedReference: 'A/C ••••7821 · IFSC ••••00012 (masked)',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vdoc-6',
    kind: 'kyc',
    title: 'KYC pack',
    status: 'verified',
    expiryDate: '2027-03-01',
    maskedReference: 'KYC-****-OK',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vdoc-7',
    kind: 'work_order',
    title: 'Work order — homepage UI kit',
    status: 'verified',
    expiryDate: '2026-07-28',
    maskedReference: 'WO-va-101',
    vendorId: VENDOR_DEMO_ID,
  },
];

export const demoVendorMessages: VendorMessage[] = [
  {
    id: 'vm-1',
    kind: 'revision_feedback',
    title: 'Revision requested — social creatives',
    body: 'Please increase CTA contrast on slides 2 and 5, then resubmit.',
    occurredAt: '2026-07-22T16:10:00+05:30',
    author: 'Arun Kumar',
    relatedLabel: 'va-103',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vm-2',
    kind: 'admin_message',
    title: 'Kickoff note — homepage UI kit',
    body: 'Share first desktop frames by Friday for internal review.',
    occurredAt: '2026-07-21T11:00:00+05:30',
    author: 'Arun Kumar',
    relatedLabel: 'va-101',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vm-3',
    kind: 'clarification',
    title: 'Clarification — logo directions',
    body: 'Can we avoid literal medical icons in all three concepts?',
    occurredAt: '2026-07-20T09:30:00+05:30',
    author: 'Meena R.',
    relatedLabel: 'va-102',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vm-4',
    kind: 'meeting_summary',
    title: 'Review call summary',
    body: 'Agreed on warm palette; next review Tuesday.',
    occurredAt: '2026-07-19T15:00:00+05:30',
    author: 'Arun Kumar',
    relatedLabel: 'Meeting · 19 Jul',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vm-5',
    kind: 'internal_note',
    title: 'Internal note (vendor)',
    body: 'Waiting on brand lead approval before final invoice.',
    occurredAt: '2026-07-18T18:20:00+05:30',
    author: 'Karthik R.',
    relatedLabel: 'va-102',
    vendorId: VENDOR_DEMO_ID,
  },
];

export const demoVendorMeetings: VendorMeeting[] = [
  {
    id: 'vmt-1',
    title: 'Homepage UI mid-review',
    meetingType: 'review',
    status: 'upcoming',
    date: '2026-07-25',
    time: '11:30 AM',
    agenda: 'Review desktop frames and interaction notes',
    adminAttendees: ['Arun Kumar', 'Meena R.'],
    outcome: null,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vmt-2',
    title: 'Logo options walkthrough',
    meetingType: 'clarification',
    status: 'completed',
    date: '2026-07-19',
    time: '03:00 PM',
    agenda: 'Align on direction B vs C',
    adminAttendees: ['Meena R.'],
    outcome: 'Proceed with direction B; submit usage sheet',
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vmt-3',
    title: 'Campaign creative kickoff',
    meetingType: 'kickoff',
    status: 'cancelled',
    date: '2026-07-21',
    time: '10:00 AM',
    agenda: 'Brief walkthrough',
    adminAttendees: ['Arun Kumar'],
    outcome: 'Cancelled — brief shared async',
    vendorId: VENDOR_DEMO_ID,
  },
];

export const demoVendorPerformance: VendorPerformance = {
  activeAssignments: 3,
  completedAssignments: 11,
  onTimeDeliveryRatePercent: 91,
  qualityScore: 4.6,
  revisionCount: 7,
  acceptanceRatePercent: 88,
  averageTurnaroundDays: 4.2,
  adminRatingPlaceholder: '4.7 / 5 (demo)',
};

export const demoVendorNotifications: VendorNotification[] = [
  {
    id: 'vn-1',
    kind: 'deadline_reminder',
    title: 'Deadline reminder',
    detail: 'Social campaign creatives due today',
    occurredAt: '2026-07-23T08:00:00+05:30',
    read: false,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vn-2',
    kind: 'revision_requested',
    title: 'Revision requested',
    detail: 'Q3 social creatives — CTA contrast',
    occurredAt: '2026-07-22T16:15:00+05:30',
    read: false,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vn-3',
    kind: 'deliverable_review_completed',
    title: 'Deliverable review completed',
    detail: 'Pitch illustrations approved',
    occurredAt: '2026-07-12T14:00:00+05:30',
    read: true,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vn-4',
    kind: 'invoice_approved',
    title: 'Invoice approved',
    detail: 'VEN-INV-2026-014 approved',
    occurredAt: '2026-07-14T10:20:00+05:30',
    read: true,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vn-5',
    kind: 'payment_processed',
    title: 'Payment processed',
    detail: 'Partial payment REF-DEMO-****4210',
    occurredAt: '2026-07-20T17:40:00+05:30',
    read: true,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vn-6',
    kind: 'document_expiry_reminder',
    title: 'Document expiry reminder',
    detail: 'GST certificate expiring 10 Aug 2026',
    occurredAt: '2026-07-22T09:00:00+05:30',
    read: false,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vn-7',
    kind: 'meeting_reminder',
    title: 'Meeting reminder',
    detail: 'Homepage UI mid-review · 25 Jul 11:30 AM',
    occurredAt: '2026-07-23T09:30:00+05:30',
    read: false,
    vendorId: VENDOR_DEMO_ID,
  },
  {
    id: 'vn-8',
    kind: 'new_assignment',
    title: 'New assignment',
    detail: 'Website redesign — homepage UI kit',
    occurredAt: '2026-07-10T12:00:00+05:30',
    read: true,
    vendorId: VENDOR_DEMO_ID,
  },
];

export function formatVendorDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatVendorDateTime(iso: string): string {
  if (iso.includes('T')) {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso));
  }
  return formatVendorDate(iso);
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getVendorAssignments(
  vendorId: string = VENDOR_DEMO_ID,
): VendorAssignment[] {
  return demoVendorAssignments.filter((item) => item.vendorId === vendorId);
}

export function getVendorDeliverables(
  vendorId: string = VENDOR_DEMO_ID,
): VendorDeliverable[] {
  return demoVendorDeliverables.filter((item) => item.vendorId === vendorId);
}

export function getVendorInvoices(
  vendorId: string = VENDOR_DEMO_ID,
): VendorInvoice[] {
  return demoVendorInvoices.filter((item) => item.vendorId === vendorId);
}

export function getVendorMessages(
  vendorId: string = VENDOR_DEMO_ID,
): VendorMessage[] {
  return [...demoVendorMessages]
    .filter((item) => item.vendorId === vendorId)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
}

export function getVendorDashboardSummary(
  vendorId: string = VENDOR_DEMO_ID,
): VendorDashboardSummary {
  const assignments = getVendorAssignments(vendorId);
  const deliverables = getVendorDeliverables(vendorId);
  const invoices = getVendorInvoices(vendorId);
  const unread = demoVendorNotifications.filter(
    (n) => n.vendorId === vendorId && !n.read,
  ).length;

  return {
    activeAssignments: assignments.filter(
      (a) => a.status !== 'completed' && a.status !== 'on_hold',
    ).length,
    pendingDeliverables: deliverables.filter((d) => d.status === 'pending')
      .length,
    awaitingReview: deliverables.filter((d) => d.status === 'awaiting_review')
      .length,
    approvedDeliverables: deliverables.filter((d) => d.status === 'approved')
      .length,
    pendingInvoices: invoices.filter(
      (i) =>
        i.status === 'submitted' ||
        i.status === 'draft' ||
        i.status === 'revision_required',
    ).length,
    pendingPayments: demoVendorPaymentHistory.filter(
      (p) =>
        p.vendorId === vendorId &&
        (p.status === 'pending' || p.status === 'on_hold'),
    ).length,
    upcomingDeadlines: assignments.filter(
      (a) =>
        a.status !== 'completed' &&
        a.deadline >= VENDOR_DEMO_TODAY &&
        a.deadline <= '2026-07-28',
    ).length,
    unreadNotifications: unread,
  };
}
