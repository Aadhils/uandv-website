import type { PartnerCategory } from '@/lib/partners';

import { PHASE_LABELS } from './types';
import type {
  ActionPlanTask,
  BusinessAnalysis,
  BusinessAdvisorInput,
  BusinessCategory,
  OpportunityRecommendation,
  PlanTaskPriority,
  ProjectConversionPreview,
} from './types';
import { getRule } from './rules';

function phaseTasks(
  category: BusinessCategory,
  partners: PartnerCategory[],
): ActionPlanTask[] {
  const rule = getRule(category);
  const partnerAt = (i: number): PartnerCategory | null => partners[i] ?? partners[0] ?? null;

  const mk = (
    phase: 1 | 2 | 3 | 4 | 5 | 6,
    id: string,
    taskName: string,
    description: string,
    priority: PlanTaskPriority,
    days: number,
    owner: ActionPlanTask['suggestedOwner'],
    partner: PartnerCategory | null,
    deps: string[],
  ): ActionPlanTask => ({
    id,
    phase,
    phaseLabel: PHASE_LABELS[phase],
    taskName,
    description,
    priority,
    estimatedDurationDays: days,
    suggestedOwner: owner,
    suggestedPartnerCategory: partner,
    dependencies: deps,
    status: deps.length ? 'blocked' : 'ready',
  });

  return [
    mk(
      1,
      'p1-discovery',
      'Discovery workshop',
      `Validate goal for ${rule.category.replace(/_/g, ' ')} and lock success metrics.`,
      'high',
      5,
      'shared',
      'business_consultant',
      [],
    ),
    mk(
      1,
      'p1-gap',
      'Gap & readiness checklist',
      'Confirm missing registrations, assets, and budget assumptions.',
      'high',
      3,
      'uandv_employee',
      null,
      ['p1-discovery'],
    ),
    mk(
      2,
      'p2-entity',
      'Entity & core registrations',
      `Pursue: ${rule.registrations.slice(0, 3).join(', ')}.`,
      'high',
      14,
      'partner',
      partnerAt(0) ?? 'company_registration',
      ['p1-gap'],
    ),
    mk(
      2,
      'p2-licenses',
      'License applications',
      `Target licenses: ${rule.licenses.slice(0, 2).join('; ') || 'As applicable'}.`,
      'medium',
      10,
      'partner',
      'lawyer',
      ['p2-entity'],
    ),
    mk(
      3,
      'p3-brand',
      'Brand identity pack',
      'Logo, colors, and basic brand guidelines for customer touchpoints.',
      'medium',
      7,
      'partner',
      'graphic_design',
      ['p1-gap'],
    ),
    mk(
      3,
      'p3-web',
      'Website / digital foundation',
      'Launch brochure site or storefront foundation with contact CTAs.',
      'high',
      14,
      'partner',
      'website_development',
      ['p3-brand'],
    ),
    mk(
      4,
      'p4-software',
      'Operations software setup',
      `Suggested stack: ${rule.software.slice(0, 2).join(', ')}.`,
      'medium',
      10,
      'partner',
      'ai_automation',
      ['p2-entity'],
    ),
    mk(
      4,
      'p4-sop',
      'SOP & handoff notes',
      'Document day-to-day operating checklist for the customer team.',
      'low',
      5,
      'uandv_employee',
      null,
      ['p4-software'],
    ),
    mk(
      5,
      'p5-marketing',
      'Launch marketing sprint',
      'Local + digital campaign to announce launch or growth push.',
      'high',
      14,
      'partner',
      'digital_marketing',
      ['p3-web'],
    ),
    mk(
      5,
      'p5-go-live',
      'Go-live checklist',
      'Final QA on registrations, digital assets, and support contacts.',
      'high',
      3,
      'shared',
      null,
      ['p5-marketing', 'p2-licenses'],
    ),
    mk(
      6,
      'p6-review',
      '30-day growth review',
      'Review KPIs, opportunities, and next retainer / partner assignments.',
      'medium',
      5,
      'uandv_employee',
      'business_consultant',
      ['p5-go-live'],
    ),
    mk(
      6,
      'p6-support',
      'Support & SLA setup',
      'Define ticket channels and escalation for ongoing support.',
      'low',
      3,
      'uandv_employee',
      null,
      ['p6-review'],
    ),
  ];
}

export function buildActionPlan(category: BusinessCategory, partners: PartnerCategory[]): ActionPlanTask[] {
  return phaseTasks(category, partners);
}

export function detectOpportunities(
  input: BusinessAdvisorInput,
  category: BusinessCategory,
  recommendedServices: string[],
): OpportunityRecommendation[] {
  const text = `${input.businessGoal} ${input.additionalNotes} ${input.existingDigitalAssets} ${input.existingRegistrations}`.toLowerCase();
  const servicesJoined = recommendedServices.join(' ').toLowerCase();
  const out: OpportunityRecommendation[] = [];

  const hasWebsite =
    /website|web site|portal|storefront/.test(text) || /website/.test(servicesJoined);
  const hasMarketing =
    /marketing|seo|ads|campaign/.test(text) || /marketing|seo/.test(servicesJoined);
  const hasGst = /gst/.test(text);
  const hasTrademark = /trademark|brand protect|ipr/.test(text);
  const hasBranding = /brand|logo|identity/.test(text) || /brand/.test(servicesJoined);
  const wantsLaunch = /start|launch|open|register a company|new/.test(text);
  const notGrowing = /not growing|stagnant|no growth|struggling/.test(text);
  const wantsFunding = /funding|investor|loan|capital/.test(text);

  if (hasWebsite && !hasMarketing) {
    out.push({
      id: 'opp-dm',
      title: 'Website without marketing',
      reason: 'A site alone rarely drives demand — add acquisition.',
      recommendedService: 'Digital Marketing',
      opportunityScore: 86,
    });
  }
  if (hasGst && !hasTrademark) {
    out.push({
      id: 'opp-tm',
      title: 'GST without trademark',
      reason: 'Protect brand identity while formalizing tax registration.',
      recommendedService: 'Trademark Consultation',
      opportunityScore: 78,
    });
  }
  if (wantsLaunch && !hasBranding) {
    out.push({
      id: 'opp-brand',
      title: 'Launch without branding',
      reason: 'Brand kit improves trust before go-live.',
      recommendedService: 'Logo and Brand Identity',
      opportunityScore: 82,
    });
  }
  if (notGrowing || category === 'existing_business_growth') {
    out.push({
      id: 'opp-growth',
      title: 'Growth stall pattern',
      reason: 'Existing business needs CRM + audit + automation.',
      recommendedService: 'CRM, Marketing Audit and Automation',
      opportunityScore: 90,
    });
  }
  if (wantsFunding || category === 'funding_requirement') {
    out.push({
      id: 'opp-fund',
      title: 'Funding readiness gap',
      reason: 'Investors expect plan, financials, and data room.',
      recommendedService: 'Investor Readiness, Business Plan and Financial Documentation',
      opportunityScore: 92,
    });
  }
  if (category === 'restaurant' && !/fssai/.test(text)) {
    out.push({
      id: 'opp-fssai',
      title: 'F&B compliance upsell',
      reason: 'Restaurant goals typically need FSSAI sequencing.',
      recommendedService: 'FSSAI Registration Support',
      opportunityScore: 88,
    });
  }
  if (out.length === 0) {
    out.push({
      id: 'opp-discovery',
      title: 'Discovery retainer',
      reason: 'Scope is broad — lock a paid discovery before full delivery.',
      recommendedService: 'Business Discovery Workshop',
      opportunityScore: 55,
    });
  }

  return out.sort((a, b) => b.opportunityScore - a.opportunityScore);
}

export function buildProjectPreview(analysis: BusinessAnalysis): ProjectConversionPreview {
  const milestones = [
    'Discovery complete',
    'Registrations submitted',
    'Brand & website live',
    'Operations software configured',
    'Marketing launch',
    '30-day review',
  ];
  const tasks = analysis.actionPlan.slice(0, 8).map((t) => t.taskName);
  return {
    projectTitle: `${BUSINESS_CATEGORY_SHORT(analysis.businessCategory)} — ${analysis.customerName}`,
    customerName: analysis.customerName,
    projectCategory: analysis.businessCategory,
    suggestedServices: analysis.recommendedServices.slice(0, 6),
    milestones,
    tasks,
    suggestedEmployees: analysis.assignedEmployeeName
      ? [analysis.assignedEmployeeName, 'Delivery Lead (demo)']
      : ['Asha Menon (demo)', 'Delivery Lead (demo)'],
    suggestedPartners: analysis.suggestedPartnerCategories
      .slice(0, 4)
      .map((c) => c.replace(/_/g, ' ')),
    estimatedBudgetInr: analysis.estimatedBudgetInr,
    estimatedTimelineWeeks: analysis.estimatedTimelineWeeks,
    initialProjectHealth: analysis.riskLevel === 'high' ? 'at_risk' : 'on_track',
  };
}

function BUSINESS_CATEGORY_SHORT(category: BusinessCategory): string {
  return category
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
