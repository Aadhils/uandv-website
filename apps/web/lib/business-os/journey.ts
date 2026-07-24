import { getLeadById } from '@/lib/crm';
import {
  getAgreementsForCustomer,
  getPaymentsForCustomer,
  getQuotationsForCustomer,
} from '@/lib/finance';
import { LIFECYCLE_STAGE_LABELS } from '@/lib/projects';
import { getProjectById } from '@/lib/projects';

import { BOS_SPINE } from './spine';
import type { BosJourneyStage, BosJourneyStageId, BosStageStatus } from './types';

const STAGE_ORDER: BosJourneyStageId[] = [
  'discovery',
  'advisor',
  'crm_lead',
  'employee_assignment',
  'vendor_recommendation',
  'quotation',
  'agreement',
  'payment',
  'project',
];

function markActiveUpcoming(
  stages: BosJourneyStage[],
): BosJourneyStage[] {
  const firstIncomplete = stages.findIndex((s) => s.status !== 'completed');
  return stages.map((stage, index) => {
    if (stage.status === 'completed') return stage;
    if (index === firstIncomplete) {
      return { ...stage, status: 'active' as BosStageStatus };
    }
    return { ...stage, status: 'upcoming' as BosStageStatus };
  });
}

/**
 * Builds the Version 3.0 customer journey from shared module data.
 * Deterministic seed spine for cus-001 / prj-204 (SSR-safe).
 */
export function buildCustomerJourney(
  customerId: string = BOS_SPINE.customerId,
): BosJourneyStage[] {
  const project = getProjectById(BOS_SPINE.projectId);
  const lead = getLeadById(BOS_SPINE.leadId);
  const quotations = getQuotationsForCustomer(customerId);
  const agreements = getAgreementsForCustomer(customerId);
  const payments = getPaymentsForCustomer(customerId);

  const convertedQuote =
    quotations.find((q) => q.id === BOS_SPINE.quotationId) ??
    quotations.find((q) => q.status === 'converted');
  const signedAgreement =
    agreements.find((a) => a.id === BOS_SPINE.agreementId) ??
    agreements.find((a) => a.status === 'signed');
  const paidCount = payments.filter((p) => p.status === 'paid').length;

  const stages: BosJourneyStage[] = [
    {
      id: 'discovery',
      label: 'Business Discovery',
      description: 'Goals, budget, timeline, and requirements captured.',
      status: 'completed',
      completedAt: '2025-11-08',
      href: '/business-discovery',
      relatedId: null,
      relatedLabel: 'Discovery wizard',
      icon: 'Search',
    },
    {
      id: 'advisor',
      label: 'AI Business Advisor',
      description: 'Readiness score, roadmap, budget, and recommendations.',
      status: 'completed',
      completedAt: '2025-11-12',
      href: '/dashboard/business-advisor/summary',
      relatedId: null,
      relatedLabel: 'Advisor report',
      icon: 'Sparkles',
    },
    {
      id: 'crm_lead',
      label: 'CRM Lead',
      description: lead
        ? `Lead ${lead.id} · ${lead.status} · owned by ${lead.assignedEmployee}`
        : 'Demo CRM lead linked to this customer.',
      status: lead ? 'completed' : 'upcoming',
      completedAt: lead ? '2025-11-15' : null,
      href: '/dashboard',
      relatedId: lead?.id ?? BOS_SPINE.leadId,
      relatedLabel: lead?.company ?? BOS_SPINE.businessName,
      icon: 'Users',
    },
    {
      id: 'employee_assignment',
      label: 'Employee Assignment',
      description: `Assigned to ${BOS_SPINE.employeeName} for sales & delivery coordination.`,
      status: 'completed',
      completedAt: '2025-11-18',
      href: '/dashboard/projects',
      relatedId: BOS_SPINE.employeeId,
      relatedLabel: BOS_SPINE.employeeName,
      icon: 'User',
    },
    {
      id: 'vendor_recommendation',
      label: 'Vendor Recommendation',
      description: `${BOS_SPINE.vendorName} recommended and assigned for creative delivery.`,
      status: 'completed',
      completedAt: '2025-12-05',
      href: '/dashboard/projects',
      relatedId: BOS_SPINE.vendorPartnerId,
      relatedLabel: BOS_SPINE.vendorName,
      icon: 'Handshake',
    },
    {
      id: 'quotation',
      label: 'Quotation',
      description: convertedQuote
        ? `${convertedQuote.number} · ₹${convertedQuote.amountInr.toLocaleString('en-IN')} · ${convertedQuote.status}`
        : 'Quotation prepared for the engagement.',
      status: convertedQuote ? 'completed' : 'upcoming',
      completedAt: convertedQuote?.issuedAt ?? null,
      href: '/dashboard/quotations',
      relatedId: convertedQuote?.id ?? null,
      relatedLabel: convertedQuote?.number ?? null,
      icon: 'FileText',
    },
    {
      id: 'agreement',
      label: 'Agreement',
      description: signedAgreement
        ? `${signedAgreement.title} · ${signedAgreement.status}`
        : 'Master service agreement.',
      status: signedAgreement ? 'completed' : 'upcoming',
      completedAt: signedAgreement?.signedAt ?? null,
      href: '/dashboard/agreements',
      relatedId: signedAgreement?.id ?? null,
      relatedLabel: signedAgreement?.id ?? null,
      icon: 'ClipboardList',
    },
    {
      id: 'payment',
      label: 'Payment',
      description:
        paidCount > 0
          ? `${paidCount} payment(s) recorded on the shared finance ledger.`
          : 'Advance and milestone payments.',
      status: paidCount > 0 ? 'completed' : 'upcoming',
      completedAt: paidCount > 0 ? '2026-01-15' : null,
      href: '/dashboard/payments',
      relatedId: BOS_SPINE.paymentIds[0],
      relatedLabel: 'Finance ledger',
      icon: 'Wallet',
    },
    {
      id: 'project',
      label: 'Project Delivery',
      description: project
        ? `${project.title} · ${LIFECYCLE_STAGE_LABELS[project.currentStage]} · ${project.completionPercent}%`
        : BOS_SPINE.projectTitle,
      status: project ? 'completed' : 'upcoming',
      completedAt: project ? project.startDate : null,
      href: `/dashboard/projects/${BOS_SPINE.projectId}/overview`,
      relatedId: project?.id ?? BOS_SPINE.projectId,
      relatedLabel: project?.title ?? BOS_SPINE.projectTitle,
      icon: 'Briefcase',
    },
  ];

  if (project && project.health !== 'completed' && project.completionPercent < 100) {
    const projectStage = stages.find((s) => s.id === 'project');
    if (projectStage) {
      projectStage.status = 'active';
      projectStage.completedAt = project.startDate;
    }
  }

  return markActiveUpcoming(stages);
}

export function getJourneyStageOrder(): BosJourneyStageId[] {
  return [...STAGE_ORDER];
}
