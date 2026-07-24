import type { BusinessAnalysis, BusinessAdvisorInput } from './types';
import { analyzeBusinessRequirement } from './analyzer';

function mustAnalyze(
  input: BusinessAdvisorInput,
  meta: {
    id: string;
    customerId: string;
    customerName: string;
    createdAt: string;
  },
): BusinessAnalysis {
  const result = analyzeBusinessRequirement(input, meta);
  if (!result.ok) {
    throw new Error(`Demo seed failed for ${meta.id}: ${result.error}`);
  }
  return result.analysis;
}

export const DEMO_FORM_EXAMPLES: BusinessAdvisorInput[] = [
  {
    businessGoal: 'I want to start a restaurant in my city',
    businessType: 'Cloud kitchen / casual dining',
    currentStage: 'idea',
    city: 'Pune',
    state: 'Maharashtra',
    estimatedBudgetInr: 800_000,
    desiredLaunchTimeline: '3 months',
    existingRegistrations: 'None yet',
    existingDigitalAssets: 'Instagram page only',
    preferredLanguage: 'English',
    additionalNotes: 'Need FSSAI, branding, and online ordering.',
  },
  {
    businessGoal: 'I need funding for my startup',
    businessType: 'SaaS startup',
    currentStage: 'planning',
    city: 'Bengaluru',
    state: 'Karnataka',
    estimatedBudgetInr: 250_000,
    desiredLaunchTimeline: '2 months',
    existingRegistrations: 'Private Limited, GST',
    existingDigitalAssets: 'Landing page',
    preferredLanguage: 'English',
    additionalNotes: 'Looking for seed readiness and pitch deck.',
  },
  {
    businessGoal: 'My business is not growing',
    businessType: 'Retail boutique',
    currentStage: 'struggling',
    city: 'Jaipur',
    state: 'Rajasthan',
    estimatedBudgetInr: 200_000,
    desiredLaunchTimeline: '6 weeks',
    existingRegistrations: 'GST, Shop Act',
    existingDigitalAssets: 'Website, no ads',
    preferredLanguage: 'Hindi',
    additionalNotes: 'Need CRM, marketing audit, and automation.',
  },
];

const seeds: Array<{
  id: string;
  customerId: string;
  customerName: string;
  createdAt: string;
  input: BusinessAdvisorInput;
  reviewStatus?: BusinessAnalysis['reviewStatus'];
  assignedEmployeeName?: string | null;
  assignedPartnerName?: string | null;
  internalNotes?: string;
}> = [
  {
    id: 'ba-001',
    customerId: 'cus-001',
    customerName: 'Priya Sharma',
    createdAt: '2026-06-02T10:00:00.000Z',
    input: DEMO_FORM_EXAMPLES[0]!,
    reviewStatus: 'reviewed',
    assignedEmployeeName: 'Asha Menon',
    assignedPartnerName: 'Nova Legal Partners',
    internalNotes: 'Strong F&B lead — sequence FSSAI before marketing spend.',
  },
  {
    id: 'ba-002',
    customerId: 'cus-002',
    customerName: 'Rahul Verma',
    createdAt: '2026-06-05T11:30:00.000Z',
    input: DEMO_FORM_EXAMPLES[1]!,
    reviewStatus: 'in_review',
    assignedEmployeeName: 'Vikram Shah',
  },
  {
    id: 'ba-003',
    customerId: 'cus-003',
    customerName: 'Neha Kapoor',
    createdAt: '2026-06-08T09:15:00.000Z',
    input: DEMO_FORM_EXAMPLES[2]!,
    reviewStatus: 'new',
  },
  {
    id: 'ba-004',
    customerId: 'cus-004',
    customerName: 'Arjun Mehta',
    createdAt: '2026-06-10T14:00:00.000Z',
    input: {
      businessGoal: 'I need a website and digital marketing',
      businessType: 'Professional services firm',
      currentStage: 'operating',
      city: 'Mumbai',
      state: 'Maharashtra',
      estimatedBudgetInr: 350_000,
      desiredLaunchTimeline: '8 weeks',
      existingRegistrations: 'GST',
      existingDigitalAssets: 'None',
      preferredLanguage: 'English',
      additionalNotes: 'No trademark yet.',
    },
    reviewStatus: 'new',
  },
  {
    id: 'ba-005',
    customerId: 'cus-005',
    customerName: 'Sana Qureshi',
    createdAt: '2026-06-12T08:45:00.000Z',
    input: {
      businessGoal: 'I want to register a company',
      businessType: 'Consulting',
      currentStage: 'idea',
      city: 'Hyderabad',
      state: 'Telangana',
      estimatedBudgetInr: 90_000,
      desiredLaunchTimeline: '1 month',
      existingRegistrations: '',
      existingDigitalAssets: '',
      preferredLanguage: 'English',
      additionalNotes: 'Also need basic branding.',
    },
    reviewStatus: 'converted',
    assignedEmployeeName: 'Asha Menon',
  },
  {
    id: 'ba-006',
    customerId: 'cus-006',
    customerName: 'Karan Patel',
    createdAt: '2026-06-14T16:20:00.000Z',
    input: {
      businessGoal: 'I want to launch an MLM business',
      businessType: 'Direct selling',
      currentStage: 'planning',
      city: 'Ahmedabad',
      state: 'Gujarat',
      estimatedBudgetInr: 1_200_000,
      desiredLaunchTimeline: '4 months',
      existingRegistrations: 'None',
      existingDigitalAssets: 'Logo draft',
      preferredLanguage: 'Gujarati',
      additionalNotes: 'Need legal structure and distributor portal.',
    },
    reviewStatus: 'in_review',
    assignedPartnerName: 'Shield Compliance Desk',
  },
  {
    id: 'ba-007',
    customerId: 'cus-007',
    customerName: 'Meera Iyer',
    createdAt: '2026-06-16T12:00:00.000Z',
    input: {
      businessGoal: 'I need GST and trademark support',
      businessType: 'D2C brand',
      currentStage: 'pre_launch',
      city: 'Chennai',
      state: 'Tamil Nadu',
      estimatedBudgetInr: 150_000,
      desiredLaunchTimeline: '6 weeks',
      existingRegistrations: 'Proprietorship',
      existingDigitalAssets: 'Shopify draft',
      preferredLanguage: 'Tamil',
      additionalNotes: 'Launching ecommerce soon.',
    },
    reviewStatus: 'reviewed',
  },
  {
    id: 'ba-008',
    customerId: 'cus-008',
    customerName: 'Devansh Rao',
    createdAt: '2026-06-18T10:10:00.000Z',
    input: {
      businessGoal: 'I want to start a travel agency',
      businessType: 'Tour packages',
      currentStage: 'idea',
      city: 'Kochi',
      state: 'Kerala',
      estimatedBudgetInr: 400_000,
      desiredLaunchTimeline: '3 months',
      existingRegistrations: 'None',
      existingDigitalAssets: 'None',
      preferredLanguage: 'Malayalam',
      additionalNotes: 'Domestic + Gulf packages.',
    },
    reviewStatus: 'new',
  },
  {
    id: 'ba-009',
    customerId: 'cus-009',
    customerName: 'Ananya Bose',
    createdAt: '2026-06-20T09:00:00.000Z',
    input: {
      businessGoal: 'Open a diagnostic clinic near residential area',
      businessType: 'Healthcare clinic',
      currentStage: 'planning',
      city: 'Kolkata',
      state: 'West Bengal',
      estimatedBudgetInr: 2_500_000,
      desiredLaunchTimeline: '6 months',
      existingRegistrations: 'None',
      existingDigitalAssets: 'None',
      preferredLanguage: 'Bengali',
      additionalNotes: 'Need clinical establishment pathway.',
    },
    reviewStatus: 'new',
  },
  {
    id: 'ba-010',
    customerId: 'cus-010',
    customerName: 'Imran Sheikh',
    createdAt: '2026-06-21T15:40:00.000Z',
    input: {
      businessGoal: 'Start a CBSE school franchise discussion',
      businessType: 'School',
      currentStage: 'idea',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      estimatedBudgetInr: 8_000_000,
      desiredLaunchTimeline: '18 months',
      existingRegistrations: 'Land identified',
      existingDigitalAssets: 'None',
      preferredLanguage: 'Hindi',
      additionalNotes: 'Need trust setup advisory.',
    },
    reviewStatus: 'in_review',
  },
  {
    id: 'ba-011',
    customerId: 'cus-011',
    customerName: 'Pooja Nair',
    createdAt: '2026-06-22T11:05:00.000Z',
    input: {
      businessGoal: 'Set up a small manufacturing unit for packaging',
      businessType: 'Manufacturing',
      currentStage: 'pre_launch',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      estimatedBudgetInr: 3_500_000,
      desiredLaunchTimeline: '9 months',
      existingRegistrations: 'Udyam draft',
      existingDigitalAssets: 'None',
      preferredLanguage: 'English',
      additionalNotes: 'Need factory license sequencing.',
    },
    reviewStatus: 'reviewed',
    assignedEmployeeName: 'Vikram Shah',
  },
  {
    id: 'ba-012',
    customerId: 'cus-012',
    customerName: 'Harsh Gupta',
    createdAt: '2026-06-23T13:25:00.000Z',
    input: {
      businessGoal: 'Launch an ecommerce fashion brand',
      businessType: 'E-commerce D2C',
      currentStage: 'launching',
      city: 'Delhi',
      state: 'Delhi',
      estimatedBudgetInr: 600_000,
      desiredLaunchTimeline: '10 weeks',
      existingRegistrations: 'GST',
      existingDigitalAssets: 'Website requested, no marketing yet',
      preferredLanguage: 'English',
      additionalNotes: 'Need store + ads.',
    },
    reviewStatus: 'new',
  },
  {
    id: 'ba-013',
    customerId: 'cus-001',
    customerName: 'Priya Sharma',
    createdAt: '2026-06-24T08:00:00.000Z',
    input: {
      businessGoal: 'Expand construction contracting into municipal tenders',
      businessType: 'Construction contractor',
      currentStage: 'operating',
      city: 'Nagpur',
      state: 'Maharashtra',
      estimatedBudgetInr: 900_000,
      desiredLaunchTimeline: '4 months',
      existingRegistrations: 'GST, Company',
      existingDigitalAssets: 'Old brochure PDF',
      preferredLanguage: 'English',
      additionalNotes: 'Need tender pack and website portfolio.',
    },
    reviewStatus: 'new',
  },
];

export const DEMO_ANALYSES: BusinessAnalysis[] = seeds.map((seed) => {
  const base = mustAnalyze(seed.input, {
    id: seed.id,
    customerId: seed.customerId,
    customerName: seed.customerName,
    createdAt: seed.createdAt,
  });
  return {
    ...base,
    reviewStatus: seed.reviewStatus ?? 'new',
    assignedEmployeeName: seed.assignedEmployeeName ?? null,
    assignedPartnerName: seed.assignedPartnerName ?? null,
    internalNotes: seed.internalNotes ?? '',
  };
});

export function getDemoAnalysisById(id: string): BusinessAnalysis | undefined {
  return DEMO_ANALYSES.find((a) => a.id === id);
}

export function listDemoAnalyses(): BusinessAnalysis[] {
  return [...DEMO_ANALYSES].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
