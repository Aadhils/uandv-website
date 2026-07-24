/**
 * Financial & Business Operations Engine — Sprint 3.3.
 * Shared across Admin / Customer / Vendor with role visibility.
 * Reuses customer + project IDs. Demo / frontend only.
 */

export type FinanceVisibility = 'admin' | 'customer' | 'vendor';

export type QuotationStatus =
  | 'draft'
  | 'sent'
  | 'accepted'
  | 'rejected'
  | 'expired'
  | 'converted';

export type AgreementStatus =
  | 'draft'
  | 'pending_signature'
  | 'signed'
  | 'expired'
  | 'renewal_due';

export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'paid'
  | 'pending'
  | 'overdue'
  | 'upcoming'
  | 'cancelled';

export type PaymentTrackerStatus =
  | 'paid'
  | 'pending'
  | 'overdue'
  | 'upcoming'
  | 'partial';

export type ExpenseCategory =
  | 'vendor_cost'
  | 'software'
  | 'travel'
  | 'marketing'
  | 'operations'
  | 'salary_allocation'
  | 'other';

export type ExpenseStatus = 'draft' | 'submitted' | 'approved' | 'paid' | 'rejected';

export type SettlementStatus =
  | 'eligible'
  | 'pending_approval'
  | 'approved'
  | 'paid'
  | 'on_hold'
  | 'disputed';

export type FinanceQuotation = {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  customerBusinessName: string;
  projectId: string | null;
  projectTitle: string | null;
  title: string;
  amountInr: number;
  status: QuotationStatus;
  issuedAt: string;
  validUntil: string;
  ownerName: string;
  notes: string;
};

export type FinanceAgreement = {
  id: string;
  customerId: string;
  customerName: string;
  customerBusinessName: string;
  projectId: string | null;
  projectTitle: string | null;
  title: string;
  status: AgreementStatus;
  valueInr: number;
  signedAt: string | null;
  expiryOrRenewalAt: string;
  auditLabel: string;
};

export type FinanceInvoice = {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  customerBusinessName: string;
  projectId: string | null;
  projectTitle: string | null;
  amountInr: number;
  paidAmountInr: number;
  status: InvoiceStatus;
  dueDate: string;
  issuedAt: string;
  reminderStatus: 'none' | 'queued' | 'sent';
};

export type FinancePaymentEntry = {
  id: string;
  invoiceId: string | null;
  customerId: string;
  customerBusinessName: string;
  projectId: string | null;
  projectTitle: string | null;
  label: string;
  amountInr: number;
  status: PaymentTrackerStatus;
  dueDate: string;
  paidAt: string | null;
};

export type FinanceExpense = {
  id: string;
  title: string;
  category: ExpenseCategory;
  amountInr: number;
  status: ExpenseStatus;
  incurredAt: string;
  projectId: string | null;
  projectTitle: string | null;
  vendorId: string | null;
  vendorName: string | null;
  ownerName: string;
  notes: string;
  /** Admin-only; never shown to customers/vendors/employees */
  adminOnly: true;
};

export type VendorSettlement = {
  id: string;
  vendorId: string;
  vendorName: string;
  projectId: string | null;
  projectTitle: string | null;
  workOrderLabel: string;
  amountInr: number;
  status: SettlementStatus;
  eligibleAt: string;
  paidAt: string | null;
  invoiceRef: string | null;
  adminNotes: string;
  /** Limited context vendors may see */
  vendorVisibleNote: string;
};

export type ProfitSnapshot = {
  periodLabel: string;
  revenueInr: number;
  expensesInr: number;
  vendorSettlementsInr: number;
  grossProfitInr: number;
  marginPercent: number;
  outstandingReceivablesInr: number;
  outstandingPayablesInr: number;
  disclaimer: string;
};

export type BusinessOpsSnapshot = {
  activeQuotations: number;
  pendingAgreements: number;
  openInvoices: number;
  overduePayments: number;
  pendingExpenses: number;
  pendingSettlements: number;
  revenueMtdInr: number;
  profitMtdInr: number;
  topCustomers: Array<{ customerId: string; name: string; revenueInr: number }>;
  alerts: string[];
};
