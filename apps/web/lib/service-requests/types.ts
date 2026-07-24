/**
 * Smart Partner Matching & Marketplace Workflow — Version 3.1 Sprint 3.2.
 * Extends Partner Marketplace + Business OS. Demo / frontend only.
 */

import type { PartnerCategory } from '@/lib/partners';

export type ServiceRequestPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ServiceRequestStatus =
  | 'new'
  | 'recommended'
  | 'assigned'
  | 'partner_accepted'
  | 'in_progress'
  | 'awaiting_customer'
  | 'delivered'
  | 'completed'
  | 'declined'
  | 'on_hold'
  | 'cancelled'
  | 'reassigned';

export type ServiceRequestSource =
  | 'discovery'
  | 'advisor'
  | 'marketplace'
  | 'dashboard'
  | 'admin';

export type MatchBreakdown = {
  service: number;
  location: number;
  availability: number;
  performance: number;
  budget: number;
  overall: number;
};

export type PartnerMatchResult = {
  partnerId: string;
  companyName: string;
  category: PartnerCategory;
  city: string;
  rating: number;
  performanceScore: number;
  experienceYears: number;
  availability: string;
  verificationStatus: string;
  estimatedPriceInr: number | null;
  estimatedDurationDays: number | null;
  breakdown: MatchBreakdown;
  reasons: string[];
};

export type ServiceRequestEvent = {
  id: string;
  requestId: string;
  occurredAt: string;
  title: string;
  description: string;
  actorRole: 'customer' | 'admin' | 'partner' | 'system';
  actorName: string;
  /** Customer-safe when true */
  customerVisible: boolean;
  partnerVisible: boolean;
};

export type ServiceRequest = {
  id: string;
  customerId: string;
  customerName: string;
  customerBusinessName: string;
  businessCategory: string;
  partnerCategory: PartnerCategory;
  requestedService: string;
  city: string;
  state: string;
  budgetMinInr: number;
  budgetMaxInr: number;
  timelineDays: number;
  requiredDocuments: string[];
  priority: ServiceRequestPriority;
  status: ServiceRequestStatus;
  source: ServiceRequestSource;
  createdAt: string;
  marketplaceServiceId: string | null;
  projectId: string | null;
  recommendedPartnerIds: string[];
  matchResults: PartnerMatchResult[];
  assignedPartnerId: string | null;
  assignedPartnerName: string | null;
  vendorId: string | null;
  internalNotes: string;
  slaHours: number | null;
  expectedCompletionDate: string | null;
  partnerResponseNote: string | null;
  customerRating: number | null;
  customerRatingNote: string | null;
  estimatedPriceInr: number | null;
  estimatedDurationDays: number | null;
};

export type CreateServiceRequestInput = {
  customerId?: string;
  customerName?: string;
  customerBusinessName?: string;
  businessCategory: string;
  partnerCategory: PartnerCategory;
  requestedService: string;
  city: string;
  state: string;
  budgetMinInr: number;
  budgetMaxInr: number;
  timelineDays: number;
  requiredDocuments: string[];
  priority?: ServiceRequestPriority;
  source: ServiceRequestSource;
  marketplaceServiceId?: string | null;
  projectId?: string | null;
  estimatedPriceInr?: number | null;
  estimatedDurationDays?: number | null;
};

export const SERVICE_REQUEST_STATUS_LABELS: Record<ServiceRequestStatus, string> = {
  new: 'New Request',
  recommended: 'Recommended',
  assigned: 'Assigned',
  partner_accepted: 'Partner Accepted',
  in_progress: 'In Progress',
  awaiting_customer: 'Awaiting Customer',
  delivered: 'Delivered',
  completed: 'Completed',
  declined: 'Declined',
  on_hold: 'On Hold',
  cancelled: 'Cancelled',
  reassigned: 'Reassigned',
};

export const SERVICE_REQUESTS_RUNTIME_KEY = 'uandv-service-requests-runtime';
