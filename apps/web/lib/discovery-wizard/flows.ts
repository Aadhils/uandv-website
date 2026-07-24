import {
  AVAILABILITY_OPTIONS,
  AI_OUTCOME_OPTIONS,
  BRANDING_FOCUS_OPTIONS,
  BUDGET_OPTIONS,
  BUSINESS_CATEGORY_OPTIONS,
  CLIENT_OPTIONS,
  COLLABORATION_OPTIONS,
  CRM_ERP_OPTIONS,
  DATA_AVAILABILITY_OPTIONS,
  DESIGN_SPEC_OPTIONS,
  DIGITAL_PRESENCE_OPTIONS,
  ENTITY_OPTIONS,
  ENTITY_TYPE_HELP_OPTIONS,
  EXISTING_TOOLS_OPTIONS,
  EXPERIENCE_OPTIONS,
  FEATURE_OPTIONS,
  FUNDING_OPTIONS,
  GROWTH_PROBLEM_OPTIONS,
  GROWTH_SUPPORT_OPTIONS,
  GROWTH_TARGET_OPTIONS,
  INTEGRATION_OPTIONS,
  LEAD_VOLUME_OPTIONS,
  LOCATION_OPTIONS,
  MANUAL_PROCESS_OPTIONS,
  MARKETING_CHANNEL_OPTIONS,
  MVP_SCOPE_OPTIONS,
  NAME_STATUS_OPTIONS,
  NEW_BUSINESS_SUPPORT_OPTIONS,
  PARTNER_CATEGORY_OPTIONS,
  PLATFORM_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  REGISTRATION_OPTIONS,
  REPETITIVE_TASK_OPTIONS,
  STAGE_OPTIONS,
  TARGET_USER_OPTIONS,
  TEAM_SIZE_OPTIONS,
  TIMELINE_OPTIONS,
  VERIFICATION_OPTIONS,
  YEARS_OPTIONS,
  YES_NO_OPTIONS,
} from './questions';
import type { WizardFlow, WizardGoalId } from './types';
import { WIZARD_GOALS } from './types';

const startNewBusinessFlow: WizardFlow = {
  goalId: 'start-new-business',
  title: 'Start a New Business',
  intro:
    'Starting something new takes courage. I’ll ask a few clear questions so we can map the safest next steps together.',
  questions: [
    {
      id: 'business_category',
      type: 'single_select',
      title: 'What kind of business are you planning?',
      required: true,
      options: BUSINESS_CATEGORY_OPTIONS,
    },
    {
      id: 'business_idea',
      type: 'long_text',
      title: 'In a few sentences, what is your business idea?',
      helper: 'No jargon needed — just what you want to build and who it helps.',
      required: true,
      placeholder: 'Example: A neighborhood cafe with online ordering…',
      maxLength: 600,
    },
    {
      id: 'business_location',
      type: 'location',
      title: 'Where will this business operate?',
      required: true,
      options: LOCATION_OPTIONS,
    },
    {
      id: 'current_stage',
      type: 'single_select',
      title: 'Where are you in the journey right now?',
      required: true,
      options: STAGE_OPTIONS,
    },
    {
      id: 'business_name_status',
      type: 'single_select',
      title: 'Do you already have a business name?',
      required: true,
      options: NAME_STATUS_OPTIONS,
    },
    {
      id: 'registration_status',
      type: 'single_select',
      title: 'What is your registration status?',
      required: true,
      options: REGISTRATION_OPTIONS,
      estimatedSeconds: 35,
    },
    {
      id: 'entity_type_help',
      type: 'single_select',
      title: 'Which business structure are you leaning toward?',
      helper: 'Shown because registration still needs clarity.',
      required: true,
      options: ENTITY_TYPE_HELP_OPTIONS,
      estimatedSeconds: 45,
      showWhen: [
        {
          questionId: 'registration_status',
          equals: ['not-started', 'unsure'],
        },
      ],
    },
    {
      id: 'branding_focus',
      type: 'single_select',
      title: 'How should we approach branding first?',
      required: true,
      options: BRANDING_FOCUS_OPTIONS,
      estimatedSeconds: 35,
      showWhen: [
        {
          questionId: 'business_name_status',
          equals: ['exploring', 'need-help'],
        },
      ],
    },
    {
      id: 'funding_requirement',
      type: 'single_select',
      title: 'How are you thinking about funding?',
      required: true,
      options: FUNDING_OPTIONS,
      estimatedSeconds: 35,
    },
    {
      id: 'launch_timeline',
      type: 'timeline',
      title: 'When do you hope to launch?',
      required: true,
      options: TIMELINE_OPTIONS,
    },
    {
      id: 'estimated_budget',
      type: 'budget_range',
      title: 'What budget range feels realistic for the first phase?',
      required: true,
      options: BUDGET_OPTIONS,
    },
    {
      id: 'support_areas',
      type: 'tag_select',
      title: 'Where do you want U&V support?',
      helper: 'Select all that matter — we can refine later.',
      required: true,
      options: NEW_BUSINESS_SUPPORT_OPTIONS,
      minSelections: 1,
    },
  ],
};

const growExistingFlow: WizardFlow = {
  goalId: 'grow-existing-business',
  title: 'Grow My Business',
  intro:
    'Growth isn’t about doing everything. Let’s find the few moves that unlock your next stage.',
  questions: [
    {
      id: 'business_category',
      type: 'single_select',
      title: 'What category best describes your business?',
      required: true,
      options: BUSINESS_CATEGORY_OPTIONS,
    },
    {
      id: 'years_in_operation',
      type: 'single_select',
      title: 'How long have you been operating?',
      required: true,
      options: YEARS_OPTIONS,
    },
    {
      id: 'team_size',
      type: 'single_select',
      title: 'What is your current team size?',
      required: true,
      options: TEAM_SIZE_OPTIONS,
    },
    {
      id: 'growth_problem',
      type: 'single_select',
      title: 'What is your main growth problem right now?',
      required: true,
      options: GROWTH_PROBLEM_OPTIONS,
    },
    {
      id: 'lead_volume',
      type: 'single_select',
      title: 'About how many leads do you get each month?',
      required: true,
      options: LEAD_VOLUME_OPTIONS,
    },
    {
      id: 'digital_presence',
      type: 'single_select',
      title: 'Do you already have a website or app?',
      required: true,
      options: DIGITAL_PRESENCE_OPTIONS,
    },
    {
      id: 'website_priority',
      type: 'yes_no',
      title: 'Should we prioritize a website refresh in phase one?',
      required: true,
      options: YES_NO_OPTIONS,
      estimatedSeconds: 30,
      showWhen: [
        {
          questionId: 'digital_presence',
          equals: ['none', 'outdated'],
        },
      ],
    },
    {
      id: 'crm_erp_usage',
      type: 'single_select',
      title: 'How do you manage customers and operations today?',
      required: true,
      options: CRM_ERP_OPTIONS,
    },
    {
      id: 'marketing_channels',
      type: 'multi_select',
      title: 'Which marketing channels are you using?',
      required: true,
      options: MARKETING_CHANNEL_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'growth_target',
      type: 'single_select',
      title: 'What growth target matters most next?',
      required: true,
      options: GROWTH_TARGET_OPTIONS,
    },
    {
      id: 'support_areas',
      type: 'tag_select',
      title: 'Where should we focus support first?',
      required: true,
      options: GROWTH_SUPPORT_OPTIONS,
      minSelections: 1,
    },
  ],
};

const buildSoftwareFlow: WizardFlow = {
  goalId: 'build-software-or-app',
  title: 'Build Software & Digital Solutions',
  intro:
    'Great products start with clarity. I’ll help us define what to build, for whom, and in what order.',
  questions: [
    {
      id: 'product_type',
      type: 'single_select',
      title: 'What type of product do you want to build?',
      required: true,
      options: PRODUCT_TYPE_OPTIONS,
    },
    {
      id: 'platforms',
      type: 'multi_select',
      title: 'Which platforms do you need?',
      required: true,
      options: PLATFORM_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'target_users',
      type: 'multi_select',
      title: 'Who are the main users?',
      required: true,
      options: TARGET_USER_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'main_features',
      type: 'tag_select',
      title: 'Which features matter most in version one?',
      required: true,
      options: FEATURE_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'design_spec',
      type: 'single_select',
      title: 'Do you already have designs or a specification?',
      required: true,
      options: DESIGN_SPEC_OPTIONS,
    },
    {
      id: 'mvp_scope',
      type: 'single_select',
      title: 'How ambitious should version one be?',
      helper: 'Shown because designs or specs are still early.',
      required: true,
      options: MVP_SCOPE_OPTIONS,
      estimatedSeconds: 40,
      showWhen: [
        {
          questionId: 'design_spec',
          equals: ['none', 'wireframes'],
        },
      ],
    },
    {
      id: 'login_roles',
      type: 'yes_no',
      title: 'Will you need login and different user roles?',
      required: true,
      options: YES_NO_OPTIONS,
    },
    {
      id: 'payments_needed',
      type: 'yes_no',
      title: 'Will the product need payments?',
      required: true,
      options: YES_NO_OPTIONS,
    },
    {
      id: 'integrations',
      type: 'multi_select',
      title: 'Any integrations you already know you need?',
      required: true,
      options: INTEGRATION_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'launch_timeline',
      type: 'timeline',
      title: 'What is your target launch window?',
      required: true,
      options: TIMELINE_OPTIONS,
    },
    {
      id: 'estimated_budget',
      type: 'budget_range',
      title: 'What budget range are you planning for?',
      required: true,
      options: BUDGET_OPTIONS,
    },
  ],
};

const automateAiFlow: WizardFlow = {
  goalId: 'automate-with-ai',
  title: 'Automate with AI',
  intro:
    'AI works best when we target real bottlenecks. Let’s find the practical wins first.',
  questions: [
    {
      id: 'business_category',
      type: 'single_select',
      title: 'What kind of business are we automating?',
      required: true,
      options: BUSINESS_CATEGORY_OPTIONS,
    },
    {
      id: 'manual_processes',
      type: 'multi_select',
      title: 'Which processes still feel too manual?',
      required: true,
      options: MANUAL_PROCESS_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'repetitive_tasks',
      type: 'multi_select',
      title: 'Which repetitive tasks eat the most time?',
      required: true,
      options: REPETITIVE_TASK_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'customer_support_needs',
      type: 'yes_no',
      title: 'Do you need help automating customer support?',
      required: true,
      options: YES_NO_OPTIONS,
    },
    {
      id: 'sales_automation',
      type: 'yes_no',
      title: 'Do you want sales or lead automation?',
      required: true,
      options: YES_NO_OPTIONS,
    },
    {
      id: 'document_automation',
      type: 'yes_no',
      title: 'Do you need document automation?',
      required: true,
      options: YES_NO_OPTIONS,
    },
    {
      id: 'existing_tools',
      type: 'multi_select',
      title: 'What tools do you already use?',
      required: true,
      options: EXISTING_TOOLS_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'integrations',
      type: 'multi_select',
      title: 'Which integrations should automation connect to?',
      required: true,
      options: INTEGRATION_OPTIONS,
      minSelections: 1,
    },
    {
      id: 'data_availability',
      type: 'single_select',
      title: 'How ready is your data for automation?',
      required: true,
      options: DATA_AVAILABILITY_OPTIONS,
    },
    {
      id: 'expected_outcome',
      type: 'single_select',
      title: 'What outcome matters most?',
      required: true,
      options: AI_OUTCOME_OPTIONS,
    },
  ],
};

const partnerFlow: WizardFlow = {
  goalId: 'partner-with-uandv',
  title: 'Partner with U&V',
  intro:
    'Partnerships work when expectations are clear. Tell me how you collaborate best.',
  questions: [
    {
      id: 'partner_category',
      type: 'single_select',
      title: 'Which partner category fits you best?',
      required: true,
      options: PARTNER_CATEGORY_OPTIONS,
    },
    {
      id: 'entity_type',
      type: 'single_select',
      title: 'Are you an individual or a company?',
      required: true,
      options: ENTITY_OPTIONS,
    },
    {
      id: 'services_offered',
      type: 'long_text',
      title: 'What services do you offer?',
      required: true,
      placeholder: 'Example: Mobile app development, UI design, digital marketing…',
      maxLength: 500,
    },
    {
      id: 'service_area',
      type: 'location',
      title: 'Which city or service area do you cover?',
      required: true,
      options: LOCATION_OPTIONS,
    },
    {
      id: 'experience',
      type: 'single_select',
      title: 'How much relevant experience do you have?',
      required: true,
      options: EXPERIENCE_OPTIONS,
    },
    {
      id: 'team_size',
      type: 'single_select',
      title: 'What is your team size?',
      required: true,
      options: TEAM_SIZE_OPTIONS,
    },
    {
      id: 'existing_clients',
      type: 'single_select',
      title: 'Do you already have clients?',
      required: true,
      options: CLIENT_OPTIONS,
    },
    {
      id: 'verification_docs',
      type: 'single_select',
      title: 'Are verification documents available?',
      required: true,
      options: VERIFICATION_OPTIONS,
    },
    {
      id: 'availability',
      type: 'single_select',
      title: 'How soon can you collaborate?',
      required: true,
      options: AVAILABILITY_OPTIONS,
    },
    {
      id: 'collaboration_model',
      type: 'single_select',
      title: 'What collaboration model do you prefer?',
      required: true,
      options: COLLABORATION_OPTIONS,
    },
  ],
};

const FLOWS: Record<WizardGoalId, WizardFlow> = {
  'start-new-business': startNewBusinessFlow,
  'grow-existing-business': growExistingFlow,
  'build-software-or-app': buildSoftwareFlow,
  'automate-with-ai': automateAiFlow,
  'partner-with-uandv': partnerFlow,
};

export function getWizardFlow(goalId: WizardGoalId): WizardFlow {
  return FLOWS[goalId];
}

export function getWizardGoalTitle(goalId: WizardGoalId): string {
  return (
    WIZARD_GOALS.find((goal) => goal.id === goalId)?.title ??
    getWizardFlow(goalId).title
  );
}

export function listWizardFlows(): WizardFlow[] {
  return Object.values(FLOWS);
}
