/**
 * Business Operating System Foundation — Sprint 3.14 / Version 3.0.
 * Composes Discovery → Advisor → CRM → Assignment → Vendor → Quote →
 * Agreement → Payment → Project into one demo-safe customer journey.
 * No backend.
 */

import type { IconName } from '@uandv/ui';

export type BosJourneyStageId =
  | 'discovery'
  | 'advisor'
  | 'crm_lead'
  | 'employee_assignment'
  | 'vendor_recommendation'
  | 'quotation'
  | 'agreement'
  | 'payment'
  | 'project';

export type BosStageStatus = 'completed' | 'active' | 'upcoming';

export type BosJourneyStage = {
  id: BosJourneyStageId;
  label: string;
  description: string;
  status: BosStageStatus;
  completedAt: string | null;
  href: string;
  relatedId: string | null;
  relatedLabel: string | null;
  icon: IconName;
};

export type BosModuleLink = {
  id: string;
  label: string;
  href: string;
  relatedId: string | null;
  statusLabel: string;
};

export type BosSmartAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  priority: 'high' | 'medium' | 'low';
  badge?: string;
  module: BosJourneyStageId | 'support' | 'os';
};

export type BosVendorRecommendation = {
  partnerId: string;
  companyName: string;
  categoryLabel: string;
  reason: string;
  href: string;
  assignedToProject: boolean;
};

export type BosCustomerStatus = {
  customerId: string;
  customerName: string;
  businessName: string;
  currentStageId: BosJourneyStageId;
  currentStageLabel: string;
  statusHeadline: string;
  statusDetail: string;
  completionPercent: number;
  completedStages: number;
  totalStages: number;
  primaryProjectId: string;
  primaryProjectTitle: string;
  projectHealth: string;
  projectStageLabel: string;
  assignedEmployeeName: string;
  assignedEmployeeId: string;
  leadId: string;
  quotationId: string;
  agreementId: string;
  vendorPartnerId: string;
  vendorName: string;
  pendingPayments: number;
  pendingApprovals: number;
  openSupportTickets: number;
  happinessOverall: number;
  modules: BosModuleLink[];
};

export type BosOperatingSnapshot = {
  status: BosCustomerStatus;
  journey: BosJourneyStage[];
  smartActions: BosSmartAction[];
  vendors: BosVendorRecommendation[];
};
