import type { User } from '@uandv/database';

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function customerOwnsQuotation(
  user: Pick<User, 'id' | 'email'>,
  quotation: { customerId: string | null; customerEmail: string },
): boolean {
  if (quotation.customerId && quotation.customerId === user.id) {
    return true;
  }
  return normalizeEmail(quotation.customerEmail) === normalizeEmail(user.email);
}

export function customerCanViewQuotationStatus(status: string): boolean {
  return status !== 'DRAFT' && status !== 'CANCELLED';
}
