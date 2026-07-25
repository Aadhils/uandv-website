import type { QuotationStatus } from '@uandv/database';

const VALID_TRANSITIONS: Record<QuotationStatus, QuotationStatus[]> = {
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED'],
  VIEWED: ['ACCEPTED', 'REJECTED', 'EXPIRED'],
  ACCEPTED: [],
  REJECTED: [],
  EXPIRED: [],
  CANCELLED: [],
};

export function canTransitionQuotationStatus(
  from: QuotationStatus,
  to: QuotationStatus,
): boolean {
  if (from === to) return true;
  return VALID_TRANSITIONS[from].includes(to);
}

export function assertQuotationTransition(
  from: QuotationStatus,
  to: QuotationStatus,
): void {
  if (!canTransitionQuotationStatus(from, to)) {
    throw new Error(`Invalid quotation status transition: ${from} → ${to}`);
  }
}

export function isQuotationEditable(status: QuotationStatus): boolean {
  return status === 'DRAFT';
}

export function isQuotationCancellable(status: QuotationStatus): boolean {
  return status === 'DRAFT' || status === 'SENT';
}

export function isQuotationRespondable(status: QuotationStatus): boolean {
  return status === 'SENT' || status === 'VIEWED';
}

export function isQuotationExpiredByDate(
  validityDate: Date,
  now: Date = new Date(),
): boolean {
  const end = new Date(validityDate);
  end.setHours(23, 59, 59, 999);
  return now > end;
}

export const QUOTATION_TIMELINE_ACTIONS = {
  CREATED: 'created',
  UPDATED: 'updated',
  SENT: 'sent',
  VIEWED: 'viewed',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;
