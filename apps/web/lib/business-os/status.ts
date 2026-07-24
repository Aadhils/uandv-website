import { getCustomerHappiness } from '@/lib/lifecycle';
import {
  LIFECYCLE_STAGE_LABELS,
  getCustomerDeliverySummary,
  getProjectById,
} from '@/lib/projects';
import { demoTickets } from '@/lib/customer';

import { buildCustomerJourney } from './journey';
import { getSmartActions } from './smart-actions';
import { BOS_SPINE } from './spine';
import type {
  BosCustomerStatus,
  BosJourneyStageId,
  BosModuleLink,
  BosOperatingSnapshot,
} from './types';
import { getVendorRecommendations } from './vendors';

function buildModuleLinks(status: {
  leadId: string;
  quotationId: string;
  agreementId: string;
  projectId: string;
  vendorPartnerId: string;
  employeeId: string;
}): BosModuleLink[] {
  return [
    {
      id: 'discovery',
      label: 'Discovery',
      href: '/business-discovery',
      relatedId: null,
      statusLabel: 'Connected',
    },
    {
      id: 'advisor',
      label: 'AI Advisor',
      href: '/dashboard/business-advisor/summary',
      relatedId: null,
      statusLabel: 'Connected',
    },
    {
      id: 'crm',
      label: 'CRM Lead',
      href: '/admin/leads/list',
      relatedId: status.leadId,
      statusLabel: status.leadId,
    },
    {
      id: 'employee',
      label: 'Employee',
      href: '/employee/leads',
      relatedId: status.employeeId,
      statusLabel: status.employeeId,
    },
    {
      id: 'vendor',
      label: 'Vendor',
      href: '/admin/assignment',
      relatedId: status.vendorPartnerId,
      statusLabel: status.vendorPartnerId,
    },
    {
      id: 'quotation',
      label: 'Quotation',
      href: '/dashboard/quotations',
      relatedId: status.quotationId,
      statusLabel: status.quotationId,
    },
    {
      id: 'agreement',
      label: 'Agreement',
      href: '/dashboard/agreements',
      relatedId: status.agreementId,
      statusLabel: status.agreementId,
    },
    {
      id: 'payment',
      label: 'Payments',
      href: '/dashboard/payments',
      relatedId: BOS_SPINE.paymentIds[0],
      statusLabel: 'Shared ledger',
    },
    {
      id: 'project',
      label: 'Project',
      href: `/dashboard/projects/${status.projectId}/overview`,
      relatedId: status.projectId,
      statusLabel: status.projectId,
    },
  ];
}

export function getCustomerOperatingStatus(
  customerId: string = BOS_SPINE.customerId,
): BosCustomerStatus {
  const journey = buildCustomerJourney(customerId);
  const completed = journey.filter((s) => s.status === 'completed');
  const active = journey.find((s) => s.status === 'active');
  const current: BosJourneyStageId = active?.id ?? 'project';

  const project = getProjectById(BOS_SPINE.projectId);
  const delivery = getCustomerDeliverySummary(customerId);
  const happiness = getCustomerHappiness(customerId);
  const openTickets = demoTickets.filter(
    (t) => t.status === 'open' || t.status === 'in_progress',
  ).length;

  const completionPercent = Math.round(
    (completed.length / journey.length) * 100,
  );

  return {
    customerId: BOS_SPINE.customerId,
    customerName: BOS_SPINE.customerName,
    businessName: BOS_SPINE.businessName,
    currentStageId: current,
    currentStageLabel: active?.label ?? 'Project Delivery',
    statusHeadline: active
      ? `Currently in ${active.label}`
      : 'Journey stages complete',
    statusDetail: project
      ? `${project.title} is at ${LIFECYCLE_STAGE_LABELS[project.currentStage]} (${project.completionPercent}% delivery).`
      : 'Shared demo customer operating on the Version 3.0 spine.',
    completionPercent,
    completedStages: completed.length,
    totalStages: journey.length,
    primaryProjectId: BOS_SPINE.projectId,
    primaryProjectTitle: project?.title ?? BOS_SPINE.projectTitle,
    projectHealth: project?.health ?? 'on_track',
    projectStageLabel: project
      ? LIFECYCLE_STAGE_LABELS[project.currentStage]
      : 'Delivery',
    assignedEmployeeName: BOS_SPINE.employeeName,
    assignedEmployeeId: BOS_SPINE.employeeId,
    leadId: BOS_SPINE.leadId,
    quotationId: BOS_SPINE.quotationId,
    agreementId: BOS_SPINE.agreementId,
    vendorPartnerId: BOS_SPINE.vendorPartnerId,
    vendorName: BOS_SPINE.vendorName,
    pendingPayments: delivery.paymentActions,
    pendingApprovals: delivery.pendingApprovals,
    openSupportTickets: openTickets,
    happinessOverall: happiness.overall,
    modules: buildModuleLinks({
      leadId: BOS_SPINE.leadId,
      quotationId: BOS_SPINE.quotationId,
      agreementId: BOS_SPINE.agreementId,
      projectId: BOS_SPINE.projectId,
      vendorPartnerId: BOS_SPINE.vendorPartnerId,
      employeeId: BOS_SPINE.employeeId,
    }),
  };
}

export function getOperatingSnapshot(
  customerId: string = BOS_SPINE.customerId,
): BosOperatingSnapshot {
  return {
    status: getCustomerOperatingStatus(customerId),
    journey: buildCustomerJourney(customerId),
    smartActions: getSmartActions(customerId),
    vendors: getVendorRecommendations(),
  };
}
