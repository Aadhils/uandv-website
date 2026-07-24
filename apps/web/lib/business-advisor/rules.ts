import type { PartnerCategory } from '@/lib/partners';

import type { BusinessCategory, BusinessStage } from './types';

export type CategoryRule = {
  category: BusinessCategory;
  keywords: string[];
  intent: string;
  primaryObjective: string;
  registrations: string[];
  licenses: string[];
  services: string[];
  software: string[];
  partners: PartnerCategory[];
  documents: string[];
  budgetMin: number;
  budgetMax: number;
  timelineWeeks: number;
  baseRisks: string[];
};

const sharedLaunchDocs = [
  'PAN card',
  'Aadhaar card',
  'Passport-size photos',
  'Address proof',
  'Business address proof',
];

export const CATEGORY_RULES: CategoryRule[] = [
  {
    category: 'restaurant',
    keywords: [
      'restaurant',
      'cafe',
      'café',
      'food truck',
      'cloud kitchen',
      'f&b',
      'dining',
      'hotel food',
      'tiffin',
    ],
    intent: 'Launch or expand a food & beverage business',
    primaryObjective: 'Establish a compliant F&B operation with brand and digital presence',
    registrations: ['FSSAI', 'GST', 'Shop & Establishment', 'Udyam (optional)'],
    licenses: ['FSSAI license', 'Fire NOC (if applicable)', 'Local municipal trade license'],
    services: [
      'Company / proprietorship setup',
      'FSSAI & GST filing support',
      'Brand identity & menu design',
      'Website + online ordering page',
      'Local digital marketing',
    ],
    software: ['POS / billing', 'Inventory tracker', 'CRM for regulars'],
    partners: [
      'company_registration',
      'gst_consultant',
      'graphic_design',
      'website_development',
      'digital_marketing',
    ],
    documents: [...sharedLaunchDocs, 'Kitchen layout sketch', 'Menu draft'],
    budgetMin: 250_000,
    budgetMax: 1_500_000,
    timelineWeeks: 12,
    baseRisks: ['Food safety compliance delay', 'Location / rent uncertainty'],
  },
  {
    category: 'travel_agency',
    keywords: ['travel', 'tour', 'tourism', 'holiday package', 'visa', 'ticketing'],
    intent: 'Start or grow a travel / tour agency',
    primaryObjective: 'Register agency, build packages catalog, and acquire travelers digitally',
    registrations: ['GST', 'Shop & Establishment', 'IATA (optional)', 'Tourism dept registration'],
    licenses: ['State tourism registration (where required)'],
    services: [
      'Business registration',
      'Website with packages',
      'Booking CRM',
      'SEO & social campaigns',
      'WhatsApp catalog setup',
    ],
    software: ['Booking CRM', 'Accounting software', 'WhatsApp Business'],
    partners: [
      'company_registration',
      'gst_consultant',
      'website_development',
      'digital_marketing',
      'seo',
    ],
    documents: [...sharedLaunchDocs, 'Package itinerary drafts'],
    budgetMin: 150_000,
    budgetMax: 800_000,
    timelineWeeks: 10,
    baseRisks: ['Seasonality of demand', 'Partner hotel / airline SLAs'],
  },
  {
    category: 'school',
    keywords: ['school', 'coaching', 'academy', 'education institute', 'tuition'],
    intent: 'Set up or expand an education institute',
    primaryObjective: 'Achieve regulatory readiness and parent-facing digital presence',
    registrations: ['Trust / Society / Section 8 (as applicable)', 'GST (if taxable)', 'Udyam'],
    licenses: ['Education board / affiliation pathway', 'Fire & building safety NOC'],
    services: [
      'Entity registration advisory',
      'School website & brochure',
      'Admission CRM',
      'Brand identity',
    ],
    software: ['Admission CRM', 'Fee management', 'Learning portal (optional)'],
    partners: [
      'lawyer',
      'company_registration',
      'website_development',
      'graphic_design',
      'business_consultant',
    ],
    documents: [...sharedLaunchDocs, 'Land / lease papers', 'Curriculum outline'],
    budgetMin: 500_000,
    budgetMax: 5_000_000,
    timelineWeeks: 24,
    baseRisks: ['Affiliation timeline', 'Capital intensity'],
  },
  {
    category: 'hospital',
    keywords: ['hospital', 'clinic', 'diagnostic', 'healthcare', 'medical centre', 'nursing home'],
    intent: 'Establish or digitize a healthcare facility',
    primaryObjective: 'Compliance-first setup with patient operations and digital channels',
    registrations: ['Clinical establishment registration', 'GST', 'Biomedical waste agreement'],
    licenses: ['Clinical Establishment Act registration', 'Fire NOC', 'Pharmacy license (if any)'],
    services: [
      'Compliance advisory',
      'Hospital website',
      'Appointment booking',
      'Brand & patient communications',
    ],
    software: ['HMS / clinic software', 'Appointment system', 'Accounting'],
    partners: [
      'lawyer',
      'company_registration',
      'website_development',
      'cloud_services',
      'insurance',
    ],
    documents: [...sharedLaunchDocs, 'Doctor credentials', 'Facility layout'],
    budgetMin: 800_000,
    budgetMax: 8_000_000,
    timelineWeeks: 28,
    baseRisks: ['Regulatory scrutiny', 'Specialist hiring delays'],
  },
  {
    category: 'retail_shop',
    keywords: ['retail', 'shop', 'store', 'boutique', 'kirana', 'showroom'],
    intent: 'Open or modernize a retail shop',
    primaryObjective: 'Register shop, brand storefront, and enable basic digital sales',
    registrations: ['GST', 'Shop & Establishment', 'Udyam'],
    licenses: ['Trade license', 'Signage permission (local)'],
    services: ['GST setup', 'POS + inventory', 'Store branding', 'Google Business + ads'],
    software: ['POS', 'Inventory', 'Accounting'],
    partners: [
      'gst_consultant',
      'graphic_design',
      'printing',
      'digital_marketing',
      'website_development',
    ],
    documents: [...sharedLaunchDocs, 'Lease agreement'],
    budgetMin: 100_000,
    budgetMax: 600_000,
    timelineWeeks: 8,
    baseRisks: ['Inventory cash lock', 'Footfall dependency'],
  },
  {
    category: 'manufacturing',
    keywords: ['manufacturing', 'factory', 'production unit', 'plant', 'industrial'],
    intent: 'Set up or expand a manufacturing unit',
    primaryObjective: 'Compliance, operations tooling, and B2B digital presence',
    registrations: ['Company / LLP', 'GST', 'Udyam', 'Factory license pathway'],
    licenses: ['Factory license', 'Pollution / consent (as applicable)', 'Fire NOC'],
    services: [
      'Entity & GST setup',
      'Process documentation',
      'B2B website',
      'ERP / inventory advisory',
    ],
    software: ['ERP / inventory', 'Accounting', 'Quality checklist tools'],
    partners: [
      'company_registration',
      'chartered_accountant',
      'lawyer',
      'website_development',
      'business_consultant',
    ],
    documents: [...sharedLaunchDocs, 'Machinery list', 'Factory address proof'],
    budgetMin: 1_000_000,
    budgetMax: 15_000_000,
    timelineWeeks: 32,
    baseRisks: ['Capex overrun', 'License sequencing delays'],
  },
  {
    category: 'construction',
    keywords: ['construction', 'contractor', 'builder', 'civil works', 'infrastructure'],
    intent: 'Launch or formalize a construction business',
    primaryObjective: 'Legal entity, tender readiness, and project delivery systems',
    registrations: ['Company / LLP', 'GST', 'Udyam', 'Labour registrations (as applicable)'],
    licenses: ['Contractor registration (state / PWD)', 'Safety compliance pack'],
    services: [
      'Company registration',
      'Tender document pack',
      'Project management setup',
      'Website portfolio',
    ],
    software: ['Project tracking', 'Estimation sheet tooling', 'Accounting'],
    partners: [
      'company_registration',
      'chartered_accountant',
      'lawyer',
      'website_development',
      'business_consultant',
    ],
    documents: [...sharedLaunchDocs, 'Past project photos', 'Equipment list'],
    budgetMin: 400_000,
    budgetMax: 3_000_000,
    timelineWeeks: 16,
    baseRisks: ['Working capital gaps', 'Payment cycle delays'],
  },
  {
    category: 'it_company',
    keywords: [
      'it company',
      'software company',
      'saas',
      'app development',
      'tech startup',
      'product company',
    ],
    intent: 'Build or scale an IT / software company',
    primaryObjective: 'Incorporate, brand, productize, and acquire clients digitally',
    registrations: ['Private Limited / LLP', 'GST', 'Startup India (optional)', 'MSME'],
    licenses: ['IEC (if export)', 'Data protection readiness checklist'],
    services: [
      'Company registration',
      'Brand & website',
      'Product MVP advisory',
      'Digital marketing / LinkedIn',
      'Cloud setup',
    ],
    software: ['Project management', 'CRM', 'Cloud hosting', 'Accounting'],
    partners: [
      'company_registration',
      'website_development',
      'mobile_app_development',
      'cloud_services',
      'digital_marketing',
      'ai_automation',
    ],
    documents: [...sharedLaunchDocs, 'Product brief', 'Founder KYC'],
    budgetMin: 200_000,
    budgetMax: 2_000_000,
    timelineWeeks: 14,
    baseRisks: ['Scope creep on MVP', 'Talent cost pressure'],
  },
  {
    category: 'mlm_company',
    keywords: ['mlm', 'network marketing', 'direct selling', 'distributor network'],
    intent: 'Structure an MLM / direct selling business',
    primaryObjective: 'Legal structure, compensation clarity, and compliant digital ops',
    registrations: ['Company', 'GST', 'Direct selling compliance checklist'],
    licenses: ['State direct selling guidelines adherence', 'Consumer protection readiness'],
    services: [
      'Legal structure advisory',
      'Compensation plan documentation',
      'Distributor portal',
      'Brand kit',
      'Training content',
    ],
    software: ['Distributor CRM / MLM software', 'Payment tracker (demo)', 'Training LMS'],
    partners: [
      'lawyer',
      'company_registration',
      'website_development',
      'graphic_design',
      'business_consultant',
    ],
    documents: [...sharedLaunchDocs, 'Product list', 'Compensation outline'],
    budgetMin: 500_000,
    budgetMax: 4_000_000,
    timelineWeeks: 18,
    baseRisks: ['Regulatory / consumer complaint risk', 'Plan complexity'],
  },
  {
    category: 'startup',
    keywords: ['startup', 'start up', 'new venture', 'founders', 'mvp'],
    intent: 'Validate and launch a startup',
    primaryObjective: 'Incorporate, validate offer, and prepare go-to-market',
    registrations: ['Private Limited / LLP', 'GST', 'Startup India DPIIT (optional)'],
    licenses: ['Sector-specific (as applicable)'],
    services: [
      'Incorporation',
      'Pitch / business plan',
      'Brand & website',
      'MVP / digital product',
      'Growth marketing',
    ],
    software: ['CRM', 'Analytics', 'Accounting', 'Project board'],
    partners: [
      'company_registration',
      'business_consultant',
      'website_development',
      'digital_marketing',
      'investor_network',
    ],
    documents: [...sharedLaunchDocs, 'One-pager', 'Cap table draft'],
    budgetMin: 150_000,
    budgetMax: 1_200_000,
    timelineWeeks: 12,
    baseRisks: ['Product-market fit uncertainty', 'Burn rate'],
  },
  {
    category: 'real_estate',
    keywords: ['real estate', 'property', 'broker', 'realty', 'housing project'],
    intent: 'Start or grow a real estate business',
    primaryObjective: 'Register brokerage / project ops and build lead channels',
    registrations: ['GST', 'RERA agent registration (where required)', 'Shop & Establishment'],
    licenses: ['RERA registration (as applicable)'],
    services: [
      'Compliance advisory',
      'Property listing website',
      'Lead CRM',
      'Local ads & SEO',
    ],
    software: ['Lead CRM', 'Listing CMS', 'Accounting'],
    partners: [
      'lawyer',
      'gst_consultant',
      'website_development',
      'digital_marketing',
      'seo',
    ],
    documents: [...sharedLaunchDocs, 'RERA readiness checklist'],
    budgetMin: 200_000,
    budgetMax: 1_500_000,
    timelineWeeks: 12,
    baseRisks: ['RERA compliance gaps', 'Lead quality'],
  },
  {
    category: 'ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'online store', 'shopify', 'd2c', 'marketplace seller'],
    intent: 'Launch or scale an e-commerce business',
    primaryObjective: 'Store setup, payments readiness, and acquisition funnel',
    registrations: ['GST', 'Company / proprietorship', 'IEC (if export)'],
    licenses: ['Marketplace seller compliance pack'],
    services: [
      'Store website / marketplace setup',
      'Brand identity',
      'Product photography advisory',
      'Performance marketing',
      'Logistics partner intro',
    ],
    software: ['E-commerce platform', 'Inventory', 'CRM', 'Analytics'],
    partners: [
      'website_development',
      'graphic_design',
      'digital_marketing',
      'seo',
      'logistics',
      'gst_consultant',
    ],
    documents: [...sharedLaunchDocs, 'Product catalog', 'Supplier list'],
    budgetMin: 180_000,
    budgetMax: 1_800_000,
    timelineWeeks: 10,
    baseRisks: ['CAC inflation', 'Return / logistics cost'],
  },
  {
    category: 'professional_services',
    keywords: [
      'consultant',
      'agency',
      'professional service',
      'ca firm',
      'law firm',
      'advisory',
      'gst and trademark',
      'trademark',
    ],
    intent: 'Formalize a professional services practice',
    primaryObjective: 'Entity setup, credentials, and client acquisition system',
    registrations: ['Firm registration', 'GST', 'Professional tax (state)'],
    licenses: ['Professional council registrations (as applicable)'],
    services: [
      'Firm registration',
      'Website & brochure',
      'Client CRM',
      'Content / LinkedIn marketing',
    ],
    software: ['CRM', 'Billing', 'Document vault'],
    partners: [
      'company_registration',
      'gst_consultant',
      'trademark_consultant',
      'website_development',
      'digital_marketing',
    ],
    documents: [...sharedLaunchDocs, 'Qualification certificates'],
    budgetMin: 80_000,
    budgetMax: 500_000,
    timelineWeeks: 8,
    baseRisks: ['Utilization planning', 'Client concentration'],
  },
  {
    category: 'existing_business_growth',
    keywords: [
      'not growing',
      'growth',
      'scale my business',
      'increase sales',
      'stagnant',
      'need more customers',
    ],
    intent: 'Diagnose and accelerate growth for an existing business',
    primaryObjective: 'Audit funnel, install CRM/automation, and run growth campaigns',
    registrations: ['Review GST / entity status'],
    licenses: ['Validate existing licenses are current'],
    services: [
      'Marketing audit',
      'CRM & automation',
      'Website refresh',
      'Performance campaigns',
      'Sales process redesign',
    ],
    software: ['CRM', 'Marketing automation', 'Analytics dashboard'],
    partners: [
      'digital_marketing',
      'seo',
      'ai_automation',
      'website_development',
      'business_consultant',
    ],
    documents: ['Current sales data', 'Existing website URL', 'Ad account access notes'],
    budgetMin: 120_000,
    budgetMax: 900_000,
    timelineWeeks: 10,
    baseRisks: ['Weak data hygiene', 'Channel dependency'],
  },
  {
    category: 'funding_requirement',
    keywords: [
      'funding',
      'investment',
      'investor',
      'loan',
      'raise capital',
      'seed',
      'series a',
      'working capital',
    ],
    intent: 'Prepare for funding or credit',
    primaryObjective: 'Investor readiness: plan, financials, and data room',
    registrations: ['Ensure company / GST are current'],
    licenses: ['Sector licenses for due diligence'],
    services: [
      'Business plan',
      'Financial documentation pack',
      'Investor readiness coaching',
      'Pitch deck',
      'Loan consultant intro',
    ],
    software: ['Financial model sheet', 'Data room folder structure', 'CRM for investors'],
    partners: [
      'business_consultant',
      'chartered_accountant',
      'loan_consultant',
      'investor_network',
      'lawyer',
    ],
    documents: [
      'Financial statements',
      'Cap table',
      'Bank statements',
      'Pitch narrative',
      'KYC pack',
    ],
    budgetMin: 100_000,
    budgetMax: 700_000,
    timelineWeeks: 8,
    baseRisks: ['Incomplete financials', 'Unclear use of funds'],
  },
  {
    category: 'generic_business_request',
    keywords: ['business', 'company', 'register a company', 'website', 'digital marketing'],
    intent: 'General business enablement request',
    primaryObjective: 'Clarify goal, register basics, and establish digital foundation',
    registrations: ['GST (if applicable)', 'Entity registration (if needed)'],
    licenses: ['As per clarified category'],
    services: [
      'Discovery workshop',
      'Registration support',
      'Brand & website',
      'Basic marketing setup',
    ],
    software: ['CRM starter', 'Accounting starter'],
    partners: [
      'business_consultant',
      'company_registration',
      'website_development',
      'digital_marketing',
    ],
    documents: sharedLaunchDocs,
    budgetMin: 75_000,
    budgetMax: 500_000,
    timelineWeeks: 8,
    baseRisks: ['Ambiguous scope', 'Missing category clarity'],
  },
];

export function scoreCategory(text: string, rule: CategoryRule): number {
  const hay = text.toLowerCase();
  let score = 0;
  for (const kw of rule.keywords) {
    if (hay.includes(kw.toLowerCase())) {
      score += kw.split(' ').length > 1 ? 3 : 2;
    }
  }
  return score;
}

export function detectCategory(text: string): { category: BusinessCategory; score: number } {
  let best: CategoryRule = CATEGORY_RULES[CATEGORY_RULES.length - 1]!;
  let bestScore = 0;
  for (const rule of CATEGORY_RULES) {
    if (rule.category === 'generic_business_request') continue;
    const s = scoreCategory(text, rule);
    if (s > bestScore) {
      bestScore = s;
      best = rule;
    }
  }
  if (bestScore === 0) {
    return { category: 'generic_business_request', score: 1 };
  }
  return { category: best.category, score: bestScore };
}

export function getRule(category: BusinessCategory): CategoryRule {
  return (
    CATEGORY_RULES.find((r) => r.category === category) ??
    CATEGORY_RULES[CATEGORY_RULES.length - 1]!
  );
}

export function inferStageFromText(
  text: string,
  provided: BusinessStage | '',
): BusinessStage {
  if (provided && provided !== 'unknown') return provided;
  const t = text.toLowerCase();
  if (/(not growing|stagnant|struggling|declining)/.test(t)) return 'struggling';
  if (/(scale|scaling|expand)/.test(t)) return 'scaling';
  if (/(operating|already running|existing business)/.test(t)) return 'operating';
  if (/(launch|launching|go live)/.test(t)) return 'launching';
  if (/(planning|plan to)/.test(t)) return 'planning';
  if (/(start|idea|want to)/.test(t)) return 'idea';
  return provided || 'unknown';
}
