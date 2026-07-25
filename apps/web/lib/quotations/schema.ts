import { z } from 'zod';

export const quotationLineInputSchema = z.object({
  description: z.string().trim().min(1, 'Description is required').max(2000),
  quantity: z.union([z.number(), z.string()]),
  unit: z.string().trim().max(50).optional(),
  unitPrice: z.union([z.number(), z.string()]),
  discount: z.union([z.number(), z.string()]).optional(),
  taxRate: z.union([z.number(), z.string()]).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const quotationUpsertSchema = z.object({
  leadId: z.string().cuid().optional().nullable(),
  customerId: z.string().cuid().optional().nullable(),
  customerEmail: z.string().trim().email(),
  customerName: z.string().trim().min(1).max(200),
  customerPhone: z.string().trim().max(30).optional().nullable(),
  customerCompany: z.string().trim().max(200).optional().nullable(),
  serviceInterest: z.string().trim().max(200).optional().nullable(),
  leadReference: z.string().trim().max(50).optional().nullable(),
  title: z.string().trim().min(1).max(300),
  introduction: z.string().trim().max(5000).optional().nullable(),
  currency: z.string().trim().length(3).default('INR'),
  discountType: z.enum(['NONE', 'PERCENTAGE', 'FIXED']).default('NONE'),
  discountValue: z.union([z.number(), z.string()]).default(0),
  taxType: z.enum(['NONE', 'GST', 'CUSTOM']).default('GST'),
  taxRate: z.union([z.number(), z.string()]).optional(),
  validityDate: z.string().datetime({ offset: true }).or(z.string().date()),
  internalNotes: z.string().trim().max(5000).optional().nullable(),
  customerNotes: z.string().trim().max(5000).optional().nullable(),
  termsAndConditions: z.string().trim().max(10000).optional().nullable(),
  items: z.array(quotationLineInputSchema).min(1),
});

export const adminQuotationListQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  status: z
    .enum([
      'DRAFT',
      'SENT',
      'VIEWED',
      'ACCEPTED',
      'REJECTED',
      'EXPIRED',
      'CANCELLED',
    ])
    .optional(),
});

export const customerRejectSchema = z.object({
  reason: z.string().trim().min(3, 'Rejection reason is required').max(2000),
});

export type QuotationUpsertInput = z.infer<typeof quotationUpsertSchema>;
