import type { EnquiryStatus } from '@uandv/database';

export const ENQUIRY_STATUS_VALUES = [
  'NEW',
  'CONTACTED',
  'PROPOSAL_SENT',
  'NEGOTIATION',
  'PAYMENT_RECEIVED',
  'PROJECT_STARTED',
  'COMPLETED',
  'LOST',
] as const satisfies readonly EnquiryStatus[];

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  PROPOSAL_SENT: 'Proposal Sent',
  NEGOTIATION: 'Negotiation',
  PAYMENT_RECEIVED: 'Payment Received',
  PROJECT_STARTED: 'Project Started',
  COMPLETED: 'Completed',
  LOST: 'Lost',
};

/** Maps enquiry status to StatusBadge token keys. */
export const ENQUIRY_STATUS_BADGE: Record<
  EnquiryStatus,
  | 'new'
  | 'contacted'
  | 'proposal_sent'
  | 'negotiation'
  | 'payment_received'
  | 'project_started'
  | 'completed'
  | 'lost'
> = {
  NEW: 'new',
  CONTACTED: 'contacted',
  PROPOSAL_SENT: 'proposal_sent',
  NEGOTIATION: 'negotiation',
  PAYMENT_RECEIVED: 'payment_received',
  PROJECT_STARTED: 'project_started',
  COMPLETED: 'completed',
  LOST: 'lost',
};

export function getEnquiryStatusLabel(status: EnquiryStatus | string): string {
  return (
    ENQUIRY_STATUS_LABELS[status as EnquiryStatus] ??
    status.replaceAll('_', ' ').toLowerCase()
  );
}
