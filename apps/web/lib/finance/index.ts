export * from './types';
export * from './demo-data';

/**
 * Role-based finance selectors — Sprint 3.3.
 * Employees have no financial report access (no selectors for employee role).
 */

import {
  demoBusinessOpsSnapshot,
  demoExpenses,
  demoFinanceAgreements,
  demoFinanceInvoices,
  demoPaymentTracker,
  demoProfitSnapshot,
  demoQuotations,
  demoVendorSettlements,
} from './demo-data';
import type {
  BusinessOpsSnapshot,
  FinanceAgreement,
  FinanceExpense,
  FinanceInvoice,
  FinancePaymentEntry,
  FinanceQuotation,
  ProfitSnapshot,
  VendorSettlement,
} from './types';

const CUSTOMER_QUOTATION_STATUSES = new Set([
  'sent',
  'accepted',
  'rejected',
  'expired',
  'converted',
]);

export function getQuotationsForAdmin(): FinanceQuotation[] {
  return [...demoQuotations].sort((a, b) =>
    b.issuedAt.localeCompare(a.issuedAt),
  );
}

export function getQuotationsForCustomer(
  customerId: string,
): FinanceQuotation[] {
  return demoQuotations
    .filter(
      (q) =>
        q.customerId === customerId &&
        CUSTOMER_QUOTATION_STATUSES.has(q.status),
    )
    .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}

export function getAgreementsForAdmin(): FinanceAgreement[] {
  return [...demoFinanceAgreements];
}

export function getAgreementsForCustomer(
  customerId: string,
): FinanceAgreement[] {
  return demoFinanceAgreements.filter((a) => a.customerId === customerId);
}

export function getInvoicesForAdmin(): FinanceInvoice[] {
  return [...demoFinanceInvoices];
}

export function getInvoicesForCustomer(customerId: string): FinanceInvoice[] {
  return demoFinanceInvoices.filter((i) => i.customerId === customerId);
}

export function getPaymentsForAdmin(): FinancePaymentEntry[] {
  return [...demoPaymentTracker];
}

export function getPaymentsForCustomer(
  customerId: string,
): FinancePaymentEntry[] {
  return demoPaymentTracker.filter((p) => p.customerId === customerId);
}

export function getExpensesForAdmin(): FinanceExpense[] {
  return demoExpenses.filter((e) => e.adminOnly);
}

export function getSettlementsForAdmin(): VendorSettlement[] {
  return [...demoVendorSettlements];
}

export function getSettlementsForVendor(vendorId: string): VendorSettlement[] {
  return demoVendorSettlements
    .filter((s) => s.vendorId === vendorId)
    .map((s) => ({
      ...s,
      adminNotes: '',
    }));
}

export function getProfitSnapshot(): ProfitSnapshot {
  return demoProfitSnapshot;
}

export function getBusinessOpsSnapshot(): BusinessOpsSnapshot {
  return demoBusinessOpsSnapshot;
}

export function formatFinanceInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatFinanceDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00`));
}

export function expenseCategoryLabel(category: string): string {
  return category
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
