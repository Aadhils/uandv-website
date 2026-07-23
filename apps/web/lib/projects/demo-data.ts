/**
 * Shared project demo data — Sprint 3.1.0.
 * Canonical IDs used across Admin, Customer, Employee, and Vendor projections.
 */

import type {
  DocumentCategory,
  Project,
  ProjectActivity,
  ProjectApproval,
  ProjectAssignment,
  ProjectAuditEntry,
  ProjectDeliveryHealth,
  ProjectDependency,
  ProjectDocument,
  ProjectLifecycleStage,
  ProjectMilestone,
  ProjectPaymentSummary,
  ProjectRisk,
  ProjectService,
  ProjectStage,
  ProjectTask,
  ProjectUpdate,
  ServiceCategory,
  VisibilityScope,
} from './types';

export const PROJECT_DEMO_TODAY = '2026-07-23';

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  website_app_development: 'Website / App Development',
  gst_registration: 'GST Registration',
  company_formation: 'Company Formation',
  trademark: 'Trademark',
  accounting: 'Accounting',
  digital_marketing: 'Digital Marketing',
  branding: 'Branding',
  legal_support: 'Legal Support',
  hosting: 'Hosting',
  ai_automation: 'AI Automation',
};

export const LIFECYCLE_STAGE_LABELS: Record<ProjectLifecycleStage, string> = {
  enquiry: 'Enquiry',
  requirement_discovery: 'Requirement Discovery',
  proposal: 'Proposal',
  quotation: 'Quotation',
  agreement: 'Agreement',
  advance_payment: 'Advance Payment',
  planning: 'Planning',
  design: 'Design',
  development_execution: 'Development / Service Execution',
  internal_review: 'Internal Review',
  customer_review: 'Customer Review',
  revision: 'Revision',
  testing_verification: 'Testing / Verification',
  final_approval: 'Final Approval',
  deployment_submission: 'Deployment / Submission',
  handover: 'Handover',
  training: 'Training',
  completed: 'Completed',
  support: 'Support',
  renewal_amc: 'Renewal / AMC',
};

/** Full software-style path. */
export const SOFTWARE_STAGE_PATH: ProjectLifecycleStage[] = [
  'enquiry',
  'requirement_discovery',
  'proposal',
  'quotation',
  'agreement',
  'advance_payment',
  'planning',
  'design',
  'development_execution',
  'internal_review',
  'customer_review',
  'revision',
  'testing_verification',
  'final_approval',
  'deployment_submission',
  'handover',
  'training',
  'completed',
  'support',
  'renewal_amc',
];

/** Compliance / registration style path (not software). */
export const COMPLIANCE_STAGE_PATH: ProjectLifecycleStage[] = [
  'enquiry',
  'requirement_discovery',
  'quotation',
  'agreement',
  'advance_payment',
  'planning',
  'development_execution',
  'internal_review',
  'customer_review',
  'revision',
  'final_approval',
  'deployment_submission',
  'handover',
  'completed',
  'support',
];

/** Marketing / branding style path. */
export const CREATIVE_STAGE_PATH: ProjectLifecycleStage[] = [
  'enquiry',
  'requirement_discovery',
  'proposal',
  'quotation',
  'agreement',
  'advance_payment',
  'planning',
  'design',
  'customer_review',
  'revision',
  'final_approval',
  'deployment_submission',
  'handover',
  'completed',
  'support',
];

export const demoProjects: Project[] = [
  {
    id: 'prj-204',
    title: 'Sunrise Retail — Website Redesign',
    description:
      'Responsive website redesign with CMS training and brand-aligned UI kit.',
    customerId: 'cus-001',
    customerName: 'Priya Sharma',
    customerBusinessName: 'Sunrise Retail Pvt Ltd',
    serviceCategory: 'website_app_development',
    ownerEmployeeId: 'emp-001',
    ownerName: 'Divya P.',
    priority: 'high',
    health: 'on_track',
    currentStage: 'development_execution',
    completionPercent: 58,
    startDate: '2026-03-12',
    targetCompletionDate: '2026-08-15',
    projectValueInr: 420000,
    advanceAmountInr: 120000,
    stagePath: SOFTWARE_STAGE_PATH,
    requiredDocumentCategories: [
      'requirement',
      'proposal',
      'agreement',
      'design',
      'deliverable',
      'handover',
      'training',
    ],
    customerVisibilityNotes: 'Customer sees progress, approvals, and shared docs.',
    vendorContextPermitted: true,
  },
  {
    id: 'prj-311',
    title: 'GreenLeaf — GST Registration',
    description:
      'GST registration filing, document collection, and ARN tracking for GreenLeaf Organics.',
    customerId: 'cus-002',
    customerName: 'Karthik Nair',
    customerBusinessName: 'GreenLeaf Organics',
    serviceCategory: 'gst_registration',
    ownerEmployeeId: 'emp-002',
    ownerName: 'Meena R.',
    priority: 'medium',
    health: 'at_risk',
    currentStage: 'customer_review',
    completionPercent: 72,
    startDate: '2026-06-01',
    targetCompletionDate: '2026-07-31',
    projectValueInr: 18000,
    advanceAmountInr: 9000,
    stagePath: COMPLIANCE_STAGE_PATH,
    requiredDocumentCategories: [
      'requirement',
      'quotation',
      'agreement',
      'customer_input',
      'compliance',
      'handover',
    ],
    customerVisibilityNotes: 'Customer must upload KYC docs for review.',
    vendorContextPermitted: false,
  },
  {
    id: 'prj-088',
    title: 'Coastal Dental — Brand Refresh',
    description: 'Logo directions, usage sheet, and brand guidelines.',
    customerId: 'cus-003',
    customerName: 'Ananya Rao',
    customerBusinessName: 'Coastal Dental',
    serviceCategory: 'branding',
    ownerEmployeeId: 'emp-001',
    ownerName: 'Divya P.',
    priority: 'urgent',
    health: 'delayed',
    currentStage: 'customer_review',
    completionPercent: 80,
    startDate: '2026-07-01',
    targetCompletionDate: '2026-07-24',
    projectValueInr: 65000,
    advanceAmountInr: 25000,
    stagePath: CREATIVE_STAGE_PATH,
    requiredDocumentCategories: [
      'requirement',
      'proposal',
      'agreement',
      'design',
      'deliverable',
      'handover',
    ],
    customerVisibilityNotes: 'Customer approval required on logo direction.',
    vendorContextPermitted: true,
  },
];

export const demoProjectServices: ProjectService[] = demoProjects.map((p) => ({
  id: `svc-${p.id}`,
  projectId: p.id,
  category: p.serviceCategory,
  label: SERVICE_CATEGORY_LABELS[p.serviceCategory],
  scopeSummary: p.description,
}));

function buildStages(project: Project): ProjectStage[] {
  const currentIdx = project.stagePath.indexOf(project.currentStage);
  return project.stagePath.map((stage, order) => {
    let status: ProjectStage['status'] = 'upcoming';
    if (order < currentIdx) status = 'completed';
    else if (order === currentIdx) status = 'active';
    return {
      id: `stage-${project.id}-${order}`,
      projectId: project.id,
      stage,
      status,
      startedAt: order <= currentIdx ? project.startDate : null,
      completedAt: order < currentIdx ? project.startDate : null,
      order,
    };
  });
}

export const demoProjectStages: ProjectStage[] = demoProjects.flatMap(buildStages);

export const demoProjectMilestones: ProjectMilestone[] = [
  {
    id: 'ms-204-1',
    projectId: 'prj-204',
    title: 'Homepage prototype approved',
    relatedStage: 'design',
    dueDate: '2026-05-20',
    completedAt: '2026-05-18',
    status: 'completed',
    description: 'Desktop homepage frames signed off',
    customerVisible: true,
  },
  {
    id: 'ms-204-2',
    projectId: 'prj-204',
    title: 'CMS content model complete',
    relatedStage: 'development_execution',
    dueDate: '2026-07-30',
    completedAt: null,
    status: 'in_progress',
    description: 'Collections and preview workflow',
    customerVisible: true,
  },
  {
    id: 'ms-204-3',
    projectId: 'prj-204',
    title: 'CMS training workshop',
    relatedStage: 'training',
    dueDate: '2026-08-12',
    completedAt: null,
    status: 'upcoming',
    description: 'On-site / remote training session',
    customerVisible: true,
  },
  {
    id: 'ms-311-1',
    projectId: 'prj-311',
    title: 'Document checklist received',
    relatedStage: 'requirement_discovery',
    dueDate: '2026-06-10',
    completedAt: '2026-06-09',
    status: 'completed',
    description: 'PAN, address, and bank proofs',
    customerVisible: true,
  },
  {
    id: 'ms-311-2',
    projectId: 'prj-311',
    title: 'Customer KYC clarification',
    relatedStage: 'customer_review',
    dueDate: '2026-07-25',
    completedAt: null,
    status: 'delayed',
    description: 'Awaiting clarified address proof',
    customerVisible: true,
  },
  {
    id: 'ms-088-1',
    projectId: 'prj-088',
    title: 'Logo direction selection',
    relatedStage: 'customer_review',
    dueDate: '2026-07-22',
    completedAt: null,
    status: 'delayed',
    description: 'Customer to pick direction B or C',
    customerVisible: true,
  },
];

export const demoProjectTasks: ProjectTask[] = [
  {
    id: 'pt-204-1',
    projectId: 'prj-204',
    title: 'Build product listing templates',
    description: 'CMS templates for category and PDP pages',
    relatedStage: 'development_execution',
    assigneeKind: 'employee',
    assigneeId: 'emp-001',
    assigneeName: 'Divya P.',
    priority: 'high',
    startDate: '2026-07-15',
    dueDate: '2026-07-28',
    status: 'in_progress',
    completionPercent: 55,
    dependencyIds: [],
    internalNotes: 'Align with brand tokens from vendor UI kit',
    customerVisibleUpdate: true,
    vendorWorkOrderId: null,
  },
  {
    id: 'pt-204-2',
    projectId: 'prj-204',
    title: 'Homepage UI kit delivery',
    description: 'Figma UI kit, mobile breakpoints, style notes',
    relatedStage: 'design',
    assigneeKind: 'vendor',
    assigneeId: 'ven-001',
    assigneeName: 'Karthik Design Studio',
    priority: 'high',
    startDate: '2026-07-10',
    dueDate: '2026-07-28',
    status: 'in_progress',
    completionPercent: 62,
    dependencyIds: [],
    internalNotes: 'Vendor WO linked — do not share internal budget',
    customerVisibleUpdate: false,
    vendorWorkOrderId: 'va-101',
  },
  {
    id: 'pt-204-3',
    projectId: 'prj-204',
    title: 'Schedule CMS training',
    description: 'Confirm training slot with customer',
    relatedStage: 'training',
    assigneeKind: 'employee',
    assigneeId: 'emp-001',
    assigneeName: 'Divya P.',
    priority: 'medium',
    startDate: '2026-07-20',
    dueDate: '2026-07-23',
    status: 'todo',
    completionPercent: 0,
    dependencyIds: ['pt-204-1'],
    internalNotes: 'Follow up today',
    customerVisibleUpdate: true,
    vendorWorkOrderId: null,
  },
  {
    id: 'pt-311-1',
    projectId: 'prj-311',
    title: 'Chase address proof clarification',
    description: 'Customer follow-up for GST docs',
    relatedStage: 'customer_review',
    assigneeKind: 'employee',
    assigneeId: 'emp-002',
    assigneeName: 'Meena R.',
    priority: 'urgent',
    startDate: '2026-07-18',
    dueDate: '2026-07-23',
    status: 'in_progress',
    completionPercent: 40,
    dependencyIds: [],
    internalNotes: 'Call before noon',
    customerVisibleUpdate: true,
    vendorWorkOrderId: null,
  },
  {
    id: 'pt-088-1',
    projectId: 'prj-088',
    title: 'Logo directions pack review',
    description: 'Prepare review notes for Admin brand lead',
    relatedStage: 'customer_review',
    assigneeKind: 'vendor',
    assigneeId: 'ven-001',
    assigneeName: 'Karthik Design Studio',
    priority: 'urgent',
    startDate: '2026-07-15',
    dueDate: '2026-07-24',
    status: 'awaiting_review',
    completionPercent: 100,
    dependencyIds: [],
    internalNotes: 'Awaiting customer pick',
    customerVisibleUpdate: false,
    vendorWorkOrderId: 'va-102',
  },
  {
    id: 'pt-088-2',
    projectId: 'prj-088',
    title: 'Collect customer logo preference',
    description: 'Confirm direction B vs C',
    relatedStage: 'customer_review',
    assigneeKind: 'employee',
    assigneeId: 'emp-001',
    assigneeName: 'Divya P.',
    priority: 'high',
    startDate: '2026-07-20',
    dueDate: '2026-07-23',
    status: 'todo',
    completionPercent: 0,
    dependencyIds: ['pt-088-1'],
    internalNotes: 'Customer-facing follow-up',
    customerVisibleUpdate: true,
    vendorWorkOrderId: null,
  },
];

export const demoProjectAssignments: ProjectAssignment[] = [
  {
    id: 'asg-204-o',
    projectId: 'prj-204',
    role: 'project_owner',
    participantId: 'emp-001',
    participantName: 'Divya P.',
    responsibility: 'Delivery ownership and customer updates',
    assignedAt: '2026-03-12',
    dueDate: '2026-08-15',
    workloadPlaceholder: '3 active projects',
    status: 'active',
  },
  {
    id: 'asg-204-e',
    projectId: 'prj-204',
    role: 'internal_employee',
    participantId: 'emp-003',
    participantName: 'Arun Kumar',
    responsibility: 'Integrations support',
    assignedAt: '2026-04-01',
    dueDate: null,
    workloadPlaceholder: '2 active projects',
    status: 'active',
  },
  {
    id: 'asg-204-v',
    projectId: 'prj-204',
    role: 'vendor',
    participantId: 'ven-001',
    participantName: 'Karthik Design Studio',
    responsibility: 'UI kit and brand frames',
    assignedAt: '2026-07-10',
    dueDate: '2026-07-28',
    workloadPlaceholder: '4 vendor WOs',
    status: 'active',
  },
  {
    id: 'asg-204-r',
    projectId: 'prj-204',
    role: 'reviewer',
    participantId: 'emp-002',
    participantName: 'Meena R.',
    responsibility: 'Internal design QA',
    assignedAt: '2026-05-01',
    dueDate: null,
    workloadPlaceholder: 'Review queue: 5',
    status: 'active',
  },
  {
    id: 'asg-311-o',
    projectId: 'prj-311',
    role: 'project_owner',
    participantId: 'emp-002',
    participantName: 'Meena R.',
    responsibility: 'GST filing ownership',
    assignedAt: '2026-06-01',
    dueDate: '2026-07-31',
    workloadPlaceholder: '2 compliance projects',
    status: 'active',
  },
  {
    id: 'asg-088-v',
    projectId: 'prj-088',
    role: 'vendor',
    participantId: 'ven-001',
    participantName: 'Karthik Design Studio',
    responsibility: 'Logo directions',
    assignedAt: '2026-07-01',
    dueDate: '2026-07-24',
    workloadPlaceholder: '4 vendor WOs',
    status: 'active',
  },
  {
    id: 'asg-088-a',
    projectId: 'prj-088',
    role: 'approver',
    participantId: 'cus-003',
    participantName: 'Ananya Rao',
    responsibility: 'Customer logo approval',
    assignedAt: '2026-07-18',
    dueDate: '2026-07-22',
    workloadPlaceholder: 'Customer action',
    status: 'active',
  },
];

export const demoProjectUpdates: ProjectUpdate[] = [
  {
    id: 'upd-204-1',
    projectId: 'prj-204',
    stage: 'development_execution',
    milestoneId: 'ms-204-2',
    title: 'CMS content model draft ready',
    description: 'Collections configured; preview links shared internally.',
    completionImpactPercent: 5,
    customerVisible: true,
    vendorVisible: false,
    approvalRequired: false,
    nextAction: 'Customer to review sample content',
    dueDate: '2026-07-26',
    authorId: 'emp-001',
    authorName: 'Divya P.',
    authorRole: 'employee',
    createdAt: '2026-07-21T11:00:00+05:30',
    relatedTaskId: 'pt-204-1',
  },
  {
    id: 'upd-088-1',
    projectId: 'prj-088',
    stage: 'customer_review',
    milestoneId: 'ms-088-1',
    title: 'Logo directions submitted for review',
    description: 'Three concepts shared; awaiting customer selection.',
    completionImpactPercent: 10,
    customerVisible: true,
    vendorVisible: true,
    approvalRequired: true,
    nextAction: 'Customer to approve direction',
    dueDate: '2026-07-23',
    authorId: 'ven-001',
    authorName: 'Karthik Design Studio',
    authorRole: 'vendor',
    createdAt: '2026-07-20T15:30:00+05:30',
    relatedTaskId: 'pt-088-1',
  },
  {
    id: 'upd-311-1',
    projectId: 'prj-311',
    stage: 'customer_review',
    milestoneId: 'ms-311-2',
    title: 'KYC clarification requested',
    description: 'Address proof mismatch noted by consultant.',
    completionImpactPercent: 0,
    customerVisible: true,
    vendorVisible: false,
    approvalRequired: true,
    nextAction: 'Upload clarified address proof',
    dueDate: '2026-07-25',
    authorId: 'emp-002',
    authorName: 'Meena R.',
    authorRole: 'employee',
    createdAt: '2026-07-19T10:15:00+05:30',
    relatedTaskId: 'pt-311-1',
  },
];

export const demoProjectApprovals: ProjectApproval[] = [
  {
    id: 'apr-088-1',
    projectId: 'prj-088',
    type: 'design',
    title: 'Approve logo direction',
    requestedBy: 'Divya P.',
    requestedFrom: 'Ananya Rao (Customer)',
    requestedAt: '2026-07-20',
    dueDate: '2026-07-23',
    status: 'pending',
    comments: 'Please choose direction B or C',
    decidedAt: null,
    relatedStage: 'customer_review',
    relatedDocumentId: 'doc-088-1',
    relatedDeliverableLabel: 'Logo directions pack v1.1',
    customerActionable: true,
  },
  {
    id: 'apr-204-1',
    projectId: 'prj-204',
    type: 'content',
    title: 'Approve sample PDP content',
    requestedBy: 'Divya P.',
    requestedFrom: 'Priya Sharma (Customer)',
    requestedAt: '2026-07-21',
    dueDate: '2026-07-28',
    status: 'pending',
    comments: 'Review tone and product attributes',
    decidedAt: null,
    relatedStage: 'development_execution',
    relatedDocumentId: 'doc-204-3',
    relatedDeliverableLabel: null,
    customerActionable: true,
  },
  {
    id: 'apr-311-1',
    projectId: 'prj-311',
    type: 'requirement',
    title: 'Confirm clarified KYC pack',
    requestedBy: 'Meena R.',
    requestedFrom: 'Karthik Nair (Customer)',
    requestedAt: '2026-07-19',
    dueDate: '2026-07-25',
    status: 'pending',
    comments: 'Address proof must match application',
    decidedAt: null,
    relatedStage: 'customer_review',
    relatedDocumentId: null,
    relatedDeliverableLabel: null,
    customerActionable: true,
  },
  {
    id: 'apr-204-2',
    projectId: 'prj-204',
    type: 'payment',
    title: 'Milestone 2 invoice acknowledgement',
    requestedBy: 'Arun Kumar',
    requestedFrom: 'Priya Sharma (Customer)',
    requestedAt: '2026-07-10',
    dueDate: '2026-07-20',
    status: 'approved',
    comments: 'Acknowledged demo invoice',
    decidedAt: '2026-07-12',
    relatedStage: 'development_execution',
    relatedDocumentId: 'doc-204-4',
    relatedDeliverableLabel: null,
    customerActionable: false,
  },
];

export const demoProjectDocuments: ProjectDocument[] = [
  {
    id: 'doc-204-1',
    projectId: 'prj-204',
    name: 'Requirement brief',
    version: 'v1.2',
    category: 'requirement',
    ownerName: 'Divya P.',
    visibility: 'customer_visible',
    uploadedAt: '2026-03-15',
    reviewStatus: 'approved',
    approvalStatus: 'approved',
    auditPlaceholder: 'Shared with customer · demo',
  },
  {
    id: 'doc-204-2',
    projectId: 'prj-204',
    name: 'Service agreement',
    version: 'v1.0',
    category: 'agreement',
    ownerName: 'Arun Kumar',
    visibility: 'customer_visible',
    uploadedAt: '2026-03-20',
    reviewStatus: 'approved',
    approvalStatus: 'approved',
    auditPlaceholder: 'Signed (demo placeholder)',
  },
  {
    id: 'doc-204-3',
    projectId: 'prj-204',
    name: 'Sample PDP content',
    version: 'v0.9',
    category: 'customer_input',
    ownerName: 'Divya P.',
    visibility: 'customer_visible',
    uploadedAt: '2026-07-21',
    reviewStatus: 'in_review',
    approvalStatus: 'pending',
    auditPlaceholder: 'Awaiting customer approval',
  },
  {
    id: 'doc-204-4',
    projectId: 'prj-204',
    name: 'Milestone 2 invoice',
    version: 'v1.0',
    category: 'invoice',
    ownerName: 'Arun Kumar',
    visibility: 'customer_visible',
    uploadedAt: '2026-07-10',
    reviewStatus: 'approved',
    approvalStatus: 'approved',
    auditPlaceholder: 'No gateway · demo',
  },
  {
    id: 'doc-204-5',
    projectId: 'prj-204',
    name: 'Internal budget sheet',
    version: 'v1.0',
    category: 'compliance',
    ownerName: 'Arun Kumar',
    visibility: 'admin_only',
    uploadedAt: '2026-03-12',
    reviewStatus: 'approved',
    approvalStatus: 'not_required',
    auditPlaceholder: 'Admin only — hidden from customer/vendor',
  },
  {
    id: 'doc-088-1',
    projectId: 'prj-088',
    name: 'Logo directions pack',
    version: 'v1.1',
    category: 'design',
    ownerName: 'Karthik Design Studio',
    visibility: 'customer_visible',
    uploadedAt: '2026-07-20',
    reviewStatus: 'in_review',
    approvalStatus: 'pending',
    auditPlaceholder: 'Vendor deliverable shared',
  },
  {
    id: 'doc-311-1',
    projectId: 'prj-311',
    name: 'GST document checklist',
    version: 'v1.0',
    category: 'compliance',
    ownerName: 'Meena R.',
    visibility: 'customer_visible',
    uploadedAt: '2026-06-05',
    reviewStatus: 'approved',
    approvalStatus: 'approved',
    auditPlaceholder: 'Customer checklist',
  },
];

export const demoProjectPayments: ProjectPaymentSummary[] = [
  {
    projectId: 'prj-204',
    projectValueInr: 420000,
    advanceInr: 120000,
    paidAmountInr: 240000,
    pendingAmountInr: 180000,
    customerVisible: true,
    milestones: [
      {
        id: 'pay-204-1',
        label: 'Advance',
        amountInr: 120000,
        dueDate: '2026-03-15',
        status: 'paid',
        invoiceStatus: 'paid',
      },
      {
        id: 'pay-204-2',
        label: 'Milestone 2 — Design complete',
        amountInr: 120000,
        dueDate: '2026-05-25',
        status: 'paid',
        invoiceStatus: 'paid',
      },
      {
        id: 'pay-204-3',
        label: 'Milestone 3 — Pre-launch',
        amountInr: 120000,
        dueDate: '2026-08-01',
        status: 'upcoming',
        invoiceStatus: 'not_raised',
      },
      {
        id: 'pay-204-4',
        label: 'Final — Handover',
        amountInr: 60000,
        dueDate: '2026-08-15',
        status: 'upcoming',
        invoiceStatus: 'not_raised',
      },
    ],
  },
  {
    projectId: 'prj-311',
    projectValueInr: 18000,
    advanceInr: 9000,
    paidAmountInr: 9000,
    pendingAmountInr: 9000,
    customerVisible: true,
    milestones: [
      {
        id: 'pay-311-1',
        label: 'Advance',
        amountInr: 9000,
        dueDate: '2026-06-02',
        status: 'paid',
        invoiceStatus: 'paid',
      },
      {
        id: 'pay-311-2',
        label: 'On ARN success',
        amountInr: 9000,
        dueDate: '2026-07-31',
        status: 'due',
        invoiceStatus: 'draft',
      },
    ],
  },
  {
    projectId: 'prj-088',
    projectValueInr: 65000,
    advanceInr: 25000,
    paidAmountInr: 25000,
    pendingAmountInr: 40000,
    customerVisible: true,
    milestones: [
      {
        id: 'pay-088-1',
        label: 'Advance',
        amountInr: 25000,
        dueDate: '2026-07-02',
        status: 'paid',
        invoiceStatus: 'paid',
      },
      {
        id: 'pay-088-2',
        label: 'On final brand pack',
        amountInr: 40000,
        dueDate: '2026-07-28',
        status: 'upcoming',
        invoiceStatus: 'not_raised',
      },
    ],
  },
];

export const demoProjectRisks: ProjectRisk[] = [
  {
    id: 'risk-311-1',
    projectId: 'prj-311',
    title: 'KYC document mismatch',
    type: 'Customer dependency',
    severity: 'high',
    ownerName: 'Meena R.',
    impact: 'Filing delayed; target date at risk',
    mitigation: 'Daily follow-up until clarified proof received',
    status: 'mitigating',
    relatedTaskId: 'pt-311-1',
    relatedMilestoneId: 'ms-311-2',
    customerVisible: true,
    vendorDependency: false,
    delayDays: 3,
  },
  {
    id: 'risk-088-1',
    projectId: 'prj-088',
    title: 'Logo approval overdue',
    type: 'Customer approval',
    severity: 'critical',
    ownerName: 'Divya P.',
    impact: 'Vendor idle; brand pack blocked',
    mitigation: 'Escalate to customer primary contact today',
    status: 'open',
    relatedTaskId: 'pt-088-2',
    relatedMilestoneId: 'ms-088-1',
    customerVisible: true,
    vendorDependency: true,
    delayDays: 1,
  },
  {
    id: 'risk-204-1',
    projectId: 'prj-204',
    title: 'Vendor UI kit slip risk',
    type: 'Vendor dependency',
    severity: 'medium',
    ownerName: 'Arun Kumar',
    impact: 'Template build may slip 2 days',
    mitigation: 'Mid-review on 25 Jul',
    status: 'mitigating',
    relatedTaskId: 'pt-204-2',
    relatedMilestoneId: 'ms-204-2',
    customerVisible: false,
    vendorDependency: true,
    delayDays: 0,
  },
];

export const demoProjectDependencies: ProjectDependency[] = [
  {
    id: 'dep-1',
    projectId: 'prj-204',
    fromTaskId: 'pt-204-1',
    toTaskId: 'pt-204-3',
    note: 'Training scheduling after templates progress',
  },
  {
    id: 'dep-2',
    projectId: 'prj-088',
    fromTaskId: 'pt-088-1',
    toTaskId: 'pt-088-2',
    note: 'Customer preference after vendor pack',
  },
];

export const demoProjectActivities: ProjectActivity[] = [
  {
    id: 'act-204-1',
    projectId: 'prj-204',
    occurredAt: '2026-03-12T10:00:00+05:30',
    eventType: 'project_created',
    title: 'Project created',
    description: 'Website redesign project opened',
    actorName: 'Arun Kumar',
    actorRole: 'admin',
    visibility: 'internal_team',
    relatedStage: 'enquiry',
    relatedMilestoneId: null,
    relatedDocumentId: null,
    relatedPaymentId: null,
    relatedApprovalId: null,
    auditMetadata: 'entity=project; action=create',
  },
  {
    id: 'act-204-2',
    projectId: 'prj-204',
    occurredAt: '2026-07-10T12:00:00+05:30',
    eventType: 'vendor_assigned',
    title: 'Vendor assigned',
    description: 'Karthik Design Studio assigned UI kit WO',
    actorName: 'Arun Kumar',
    actorRole: 'admin',
    visibility: 'internal_team',
    relatedStage: 'design',
    relatedMilestoneId: null,
    relatedDocumentId: null,
    relatedPaymentId: null,
    relatedApprovalId: null,
    auditMetadata: 'entity=assignment; vendor=ven-001',
  },
  {
    id: 'act-204-3',
    projectId: 'prj-204',
    occurredAt: '2026-07-21T11:05:00+05:30',
    eventType: 'update_published',
    title: 'Work update published',
    description: 'CMS content model draft ready',
    actorName: 'Divya P.',
    actorRole: 'employee',
    visibility: 'customer_visible',
    relatedStage: 'development_execution',
    relatedMilestoneId: 'ms-204-2',
    relatedDocumentId: 'doc-204-3',
    relatedPaymentId: null,
    relatedApprovalId: null,
    auditMetadata: 'entity=update; id=upd-204-1',
  },
  {
    id: 'act-088-1',
    projectId: 'prj-088',
    occurredAt: '2026-07-20T15:35:00+05:30',
    eventType: 'approval_requested',
    title: 'Design approval requested',
    description: 'Logo direction approval sent to customer',
    actorName: 'Divya P.',
    actorRole: 'employee',
    visibility: 'customer_visible',
    relatedStage: 'customer_review',
    relatedMilestoneId: 'ms-088-1',
    relatedDocumentId: 'doc-088-1',
    relatedPaymentId: null,
    relatedApprovalId: 'apr-088-1',
    auditMetadata: 'entity=approval; id=apr-088-1',
  },
  {
    id: 'act-311-1',
    projectId: 'prj-311',
    occurredAt: '2026-07-19T10:20:00+05:30',
    eventType: 'stage_changed',
    title: 'Stage moved to Customer Review',
    description: 'Awaiting KYC clarification',
    actorName: 'Meena R.',
    actorRole: 'employee',
    visibility: 'customer_visible',
    relatedStage: 'customer_review',
    relatedMilestoneId: 'ms-311-2',
    relatedDocumentId: null,
    relatedPaymentId: null,
    relatedApprovalId: 'apr-311-1',
    auditMetadata: 'entity=stage; to=customer_review',
  },
];

export const demoProjectAudit: ProjectAuditEntry[] = demoProjectActivities.map(
  (a) => ({
    id: `audit-${a.id}`,
    projectId: a.projectId,
    occurredAt: a.occurredAt,
    actorName: a.actorName,
    action: a.eventType,
    entityType: a.eventType.split('_')[0] ?? 'project',
    entityId: a.projectId,
    visibility: a.visibility,
    detail: a.description,
  }),
);

export function formatProjectDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatProjectDateTime(iso: string): string {
  if (iso.includes('T')) {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso));
  }
  return formatProjectDate(iso);
}

export function formatProjectInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProjectById(id: string): Project | undefined {
  return demoProjects.find((p) => p.id === id);
}

export function getStagesForProject(projectId: string): ProjectStage[] {
  return demoProjectStages
    .filter((s) => s.projectId === projectId)
    .sort((a, b) => a.order - b.order);
}

export function getMilestonesForProject(projectId: string): ProjectMilestone[] {
  return demoProjectMilestones.filter((m) => m.projectId === projectId);
}

export function getTasksForProject(projectId: string): ProjectTask[] {
  return demoProjectTasks.filter((t) => t.projectId === projectId);
}

export function getAssignmentsForProject(
  projectId: string,
): ProjectAssignment[] {
  return demoProjectAssignments.filter((a) => a.projectId === projectId);
}

export function getUpdatesForProject(projectId: string): ProjectUpdate[] {
  return demoProjectUpdates
    .filter((u) => u.projectId === projectId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getApprovalsForProject(projectId: string): ProjectApproval[] {
  return demoProjectApprovals.filter((a) => a.projectId === projectId);
}

export function getDocumentsForProject(projectId: string): ProjectDocument[] {
  return demoProjectDocuments.filter((d) => d.projectId === projectId);
}

export function getPaymentsForProject(
  projectId: string,
): ProjectPaymentSummary | undefined {
  return demoProjectPayments.find((p) => p.projectId === projectId);
}

export function getRisksForProject(projectId: string): ProjectRisk[] {
  return demoProjectRisks.filter((r) => r.projectId === projectId);
}

export function getActivitiesForProject(projectId: string): ProjectActivity[] {
  return demoProjectActivities
    .filter((a) => a.projectId === projectId)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
}

export function getAuditForProject(projectId: string): ProjectAuditEntry[] {
  return demoProjectAudit
    .filter((a) => a.projectId === projectId)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
}

export function filterByVisibility<T extends { visibility: VisibilityScope }>(
  items: T[],
  scopes: VisibilityScope[],
): T[] {
  return items.filter((item) => scopes.includes(item.visibility));
}

export function getCustomerVisibleDocuments(
  projectId: string,
): ProjectDocument[] {
  return getDocumentsForProject(projectId).filter(
    (d) =>
      d.visibility === 'customer_visible' || d.visibility === 'vendor_visible',
  );
}

export function getCustomerVisibleActivities(
  projectId: string,
): ProjectActivity[] {
  return getActivitiesForProject(projectId).filter(
    (a) => a.visibility === 'customer_visible',
  );
}

export function getCustomerVisibleUpdates(projectId: string): ProjectUpdate[] {
  return getUpdatesForProject(projectId).filter((u) => u.customerVisible);
}

export function getTasksForEmployee(employeeId: string): ProjectTask[] {
  return demoProjectTasks.filter(
    (t) => t.assigneeKind === 'employee' && t.assigneeId === employeeId,
  );
}

export function getTasksForVendor(vendorId: string): ProjectTask[] {
  return demoProjectTasks.filter(
    (t) => t.assigneeKind === 'vendor' && t.assigneeId === vendorId,
  );
}

export function getNextMilestone(
  projectId: string,
): ProjectMilestone | undefined {
  return getMilestonesForProject(projectId).find(
    (m) => m.status === 'in_progress' || m.status === 'upcoming' || m.status === 'delayed',
  );
}

export function getDeliveryHealth(): ProjectDeliveryHealth {
  const pendingApprovals = demoProjectApprovals.filter(
    (a) => a.status === 'pending',
  ).length;
  const delayedProjects = demoProjects.filter(
    (p) => p.health === 'delayed' || p.health === 'at_risk',
  ).length;
  const employeeDelays = demoProjectTasks.filter(
    (t) =>
      t.assigneeKind === 'employee' &&
      t.status !== 'completed' &&
      t.dueDate < PROJECT_DEMO_TODAY,
  ).length;
  const vendorDelays = demoProjectTasks.filter(
    (t) =>
      t.assigneeKind === 'vendor' &&
      t.status !== 'completed' &&
      t.dueDate < PROJECT_DEMO_TODAY,
  ).length;
  const pendingPayments = demoProjectPayments.reduce(
    (sum, p) => sum + (p.pendingAmountInr > 0 ? 1 : 0),
    0,
  );
  const highRiskProjectIds = new Set(
    demoProjectRisks
      .filter(
        (r) =>
          (r.severity === 'high' || r.severity === 'critical') &&
          r.status !== 'resolved',
      )
      .map((r) => r.projectId),
  );

  return {
    activeProjects: demoProjects.filter((p) => p.health !== 'completed').length,
    delayedProjects,
    pendingCustomerApprovals: pendingApprovals,
    pendingPayments,
    vendorDelays,
    employeeDelays,
    highRiskProjects: highRiskProjectIds.size,
  };
}

export const DEMO_CUSTOMER_ID = 'cus-001';

export function getProjectsForCustomer(customerId: string): Project[] {
  return demoProjects.filter((p) => p.customerId === customerId);
}

export type CustomerDeliverySummary = {
  activeProjects: number;
  pendingApprovals: number;
  paymentActions: number;
  latestUpdates: number;
  upcomingMilestones: number;
};

export function getCustomerDeliverySummary(
  customerId: string = DEMO_CUSTOMER_ID,
): CustomerDeliverySummary {
  const projects = getProjectsForCustomer(customerId);
  const projectIds = new Set(projects.map((p) => p.id));
  const pendingApprovals = demoProjectApprovals.filter(
    (a) =>
      projectIds.has(a.projectId) &&
      a.status === 'pending' &&
      a.customerActionable,
  ).length;
  const paymentActions = demoProjectPayments.filter(
    (p) =>
      projectIds.has(p.projectId) &&
      p.customerVisible &&
      p.pendingAmountInr > 0,
  ).length;
  const latestUpdates = demoProjectUpdates.filter(
    (u) => projectIds.has(u.projectId) && u.customerVisible,
  ).length;
  const upcomingMilestones = demoProjectMilestones.filter(
    (m) =>
      projectIds.has(m.projectId) &&
      m.customerVisible &&
      m.status !== 'completed',
  ).length;

  return {
    activeProjects: projects.filter((p) => p.health !== 'completed').length,
    pendingApprovals,
    paymentActions,
    latestUpdates,
    upcomingMilestones,
  };
}

/** Vendor-safe projection of shared project tasks (no full customer/financials). */
export type VendorWorkOrderView = {
  id: string;
  projectId: string;
  title: string;
  assignedScope: string;
  requiredDeliverables: string[];
  deadline: string;
  priority: ProjectTask['priority'];
  status: ProjectTask['status'];
  completionPercent: number;
  adminNotes: string;
  permittedContext: string | null;
  revisionFeedback: string | null;
  invoiceEligibility: 'eligible' | 'pending_review' | 'not_eligible';
  startDate: string;
};

export function getVendorWorkOrders(vendorId: string): VendorWorkOrderView[] {
  return getTasksForVendor(vendorId).map((task) => {
    const project = getProjectById(task.projectId);
    const revisionUpdate = demoProjectUpdates.find(
      (u) =>
        u.relatedTaskId === task.id &&
        u.vendorVisible &&
        u.stage === 'revision',
    );
    let invoiceEligibility: VendorWorkOrderView['invoiceEligibility'] =
      'not_eligible';
    if (task.status === 'completed') invoiceEligibility = 'eligible';
    else if (task.status === 'awaiting_review')
      invoiceEligibility = 'pending_review';

    return {
      id: task.vendorWorkOrderId ?? task.id,
      projectId: task.projectId,
      title: task.title,
      assignedScope: task.description,
      requiredDeliverables: [task.description],
      deadline: task.dueDate,
      priority: task.priority,
      status: task.status,
      completionPercent: task.completionPercent,
      adminNotes: task.internalNotes,
      permittedContext:
        project?.vendorContextPermitted
          ? `${project.id} · ${SERVICE_CATEGORY_LABELS[project.serviceCategory]} · limited context only`
          : null,
      revisionFeedback: revisionUpdate?.description ?? null,
      invoiceEligibility,
      startDate: task.startDate,
    };
  });
}

/** Employee-safe projection — assigned tasks only, no global payments/vendor settlements. */
export type EmployeeProjectTaskView = {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  description: string;
  deadline: string;
  priority: ProjectTask['priority'];
  status: ProjectTask['status'];
  completionPercent: number;
  customerApprovedContext: string | null;
  internalNotes: string;
  requiredFollowUp: string | null;
  dailyReportLinkage: string;
  relatedStage: ProjectLifecycleStage;
};

export function getEmployeeProjectTaskViews(
  employeeId: string,
): EmployeeProjectTaskView[] {
  return getTasksForEmployee(employeeId).map((task) => {
    const project = getProjectById(task.projectId);
    const customerUpdate = demoProjectUpdates.find(
      (u) => u.relatedTaskId === task.id && u.customerVisible,
    );
    return {
      id: task.id,
      projectId: task.projectId,
      projectTitle: project?.title ?? task.projectId,
      title: task.title,
      description: task.description,
      deadline: task.dueDate,
      priority: task.priority,
      status: task.status,
      completionPercent: task.completionPercent,
      customerApprovedContext: customerUpdate
        ? customerUpdate.title
        : task.customerVisibleUpdate
          ? 'Customer-visible progress allowed'
          : null,
      internalNotes: task.internalNotes,
      requiredFollowUp:
        task.dueDate <= PROJECT_DEMO_TODAY && task.status !== 'completed'
          ? 'Follow up today'
          : null,
      dailyReportLinkage: `Link in daily report · ${task.id}`,
      relatedStage: task.relatedStage,
    };
  });
}

export function documentCategoryLabel(category: DocumentCategory): string {
  return category
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
