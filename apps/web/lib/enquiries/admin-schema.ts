import { z } from 'zod';

import { ENQUIRY_STATUS_VALUES } from '@/lib/enquiries/status';

export const adminEnquiryListQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  status: z.enum(ENQUIRY_STATUS_VALUES).optional(),
  service: z.string().trim().max(120).optional(),
  sort: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const adminEnquiryUpdateSchema = z.object({
  status: z.enum(ENQUIRY_STATUS_VALUES).optional(),
  internalNotes: z.string().max(8000).optional().nullable(),
  followUpDate: z.union([z.string().datetime(), z.null()]).optional(),
});

export type AdminEnquiryListQuery = z.infer<typeof adminEnquiryListQuerySchema>;
export type AdminEnquiryUpdateInput = z.infer<typeof adminEnquiryUpdateSchema>;
