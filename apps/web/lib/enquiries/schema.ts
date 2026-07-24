import { z } from 'zod';

export const enquiryPayloadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  interest: z.string().trim().min(1).max(120).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(8000),
  visitorType: z.string().trim().max(80).optional().or(z.literal('')),
  journey: z.string().trim().max(160).optional().or(z.literal('')),
  partnerType: z.string().trim().max(120).optional().or(z.literal('')),
  preferredLanguage: z.string().trim().max(80).optional().or(z.literal('')),
  sourcePage: z.string().trim().max(200).optional().or(z.literal('')),
  source: z.string().trim().max(80).optional().or(z.literal('')),
  /** Honeypot — must stay empty */
  website: z.string().max(200).optional().or(z.literal('')),
});

export type EnquiryPayloadInput = z.infer<typeof enquiryPayloadSchema>;

export const profileUpdateSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  mobile: z.string().trim().max(40).optional().or(z.literal('')),
  companyName: z.string().trim().max(160).optional().or(z.literal('')),
  city: z.string().trim().max(80).optional().or(z.literal('')),
  state: z.string().trim().max(80).optional().or(z.literal('')),
  businessType: z.string().trim().max(120).optional().or(z.literal('')),
});
