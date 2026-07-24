/**
 * Shared demo spine for Version 3.0 Business OS.
 * All modules should resolve through these IDs for cus-001 / Sunrise Retail.
 */

export const BOS_DEMO_TODAY = '2026-07-23';

export const BOS_SPINE = {
  customerId: 'cus-001',
  customerName: 'Priya Sharma',
  businessName: 'Sunrise Retail Pvt Ltd',
  leadId: 'lead-204',
  employeeId: 'emp-001',
  employeeName: 'Divya P.',
  employeeUserId: 'user-emp-divya',
  projectId: 'prj-204',
  projectTitle: 'Sunrise Retail — Website Redesign',
  quotationId: 'quo-101',
  openQuotationId: 'quo-102',
  agreementId: 'agr-fin-501',
  vendorId: 'ven-001',
  vendorPartnerId: 'ptn-008',
  vendorName: 'Karthik Design Studio',
  secondaryPartnerId: 'ptn-009',
  paymentIds: ['pay-tr-1', 'pay-tr-2'] as const,
  invoiceIds: ['fin-inv-901', 'fin-inv-902', 'fin-inv-905'] as const,
} as const;

export type BosSpine = typeof BOS_SPINE;
