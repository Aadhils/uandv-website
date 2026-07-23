import {
  getAgreementsForCustomer,
  getInvoicesForCustomer,
  getQuotationsForCustomer,
} from '@/lib/finance';
import { getCustomerDeliverySummary, getProjectById } from '@/lib/projects';

import { BOS_SPINE } from './spine';
import type { BosSmartAction } from './types';

/**
 * Status-driven Smart Action Center actions for the demo customer.
 * Deterministic (no localStorage) so SSR and client match.
 */
export function getSmartActions(
  customerId: string = BOS_SPINE.customerId,
): BosSmartAction[] {
  const actions: BosSmartAction[] = [];
  const delivery = getCustomerDeliverySummary(customerId);
  const project = getProjectById(BOS_SPINE.projectId);
  const quotations = getQuotationsForCustomer(customerId);
  const invoices = getInvoicesForCustomer(customerId);
  const agreements = getAgreementsForCustomer(customerId);

  const openQuote = quotations.find(
    (q) => q.id === BOS_SPINE.openQuotationId || q.status === 'sent',
  );
  const pendingInvoice = invoices.find(
    (i) =>
      i.status === 'pending' ||
      i.status === 'overdue' ||
      i.status === 'sent' ||
      (i.amountInr > i.paidAmountInr &&
        i.status !== 'paid' &&
        i.status !== 'cancelled'),
  );
  const signedAgreement = agreements.find((a) => a.id === BOS_SPINE.agreementId);

  actions.push({
    id: 'open-advisor',
    title: 'Review AI Business Advisor',
    description: 'Readiness, roadmap, budget, and recommended services.',
    href: '/dashboard/business-advisor/summary',
    icon: 'Sparkles',
    priority: 'medium',
    module: 'advisor',
  });

  if (openQuote) {
    actions.push({
      id: 'review-quote',
      title: 'Review open quotation',
      description: `${openQuote.number} · ${openQuote.title}`,
      href: '/dashboard/quotations',
      icon: 'FileText',
      priority: 'high',
      module: 'quotation',
      badge: 'Decision',
    });
  }

  if (delivery.pendingApprovals > 0) {
    actions.push({
      id: 'approve-items',
      title: 'Approve pending items',
      description: `${delivery.pendingApprovals} approval(s) need your decision.`,
      href: `/dashboard/projects/${BOS_SPINE.projectId}/approvals`,
      icon: 'CircleAlert',
      priority: 'high',
      module: 'project',
      badge: String(delivery.pendingApprovals),
    });
  }

  if (pendingInvoice || delivery.paymentActions > 0) {
    actions.push({
      id: 'pay-balance',
      title: 'Review pending payments',
      description: pendingInvoice
        ? `Invoice ${pendingInvoice.number} needs attention.`
        : 'Outstanding invoices on the shared ledger.',
      href: '/dashboard/payments',
      icon: 'Wallet',
      priority: 'high',
      module: 'payment',
      badge: 'Due',
    });
  }

  if (signedAgreement) {
    actions.push({
      id: 'view-agreement',
      title: 'Open signed agreement',
      description: signedAgreement.title,
      href: '/dashboard/agreements',
      icon: 'ClipboardList',
      priority: 'medium',
      module: 'agreement',
    });
  }

  if (project) {
    actions.push({
      id: 'view-project',
      title: 'Continue project delivery',
      description: `${project.title} · ${project.completionPercent}% complete`,
      href: `/dashboard/projects/${project.id}/overview`,
      icon: 'Briefcase',
      priority: 'medium',
      module: 'project',
    });
  }

  actions.push({
    id: 'vendor-partners',
    title: 'View recommended vendors',
    description: `${BOS_SPINE.vendorName} and category matches for this engagement.`,
    href: `/dashboard/projects/${BOS_SPINE.projectId}/overview`,
    icon: 'Handshake',
    priority: 'low',
    module: 'vendor_recommendation',
  });

  actions.push({
    id: 'support',
    title: 'Raise support ticket',
    description: 'Get help from the U&V delivery team.',
    href: '/dashboard/support',
    icon: 'MessageCircle',
    priority: 'low',
    module: 'support',
  });

  const priorityRank = { high: 0, medium: 1, low: 2 } as const;
  return actions
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
    .slice(0, 8);
}
