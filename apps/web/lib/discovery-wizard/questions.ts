import type { WizardOption } from './types';

export const BUSINESS_CATEGORY_OPTIONS: WizardOption[] = [
  { id: 'retail', label: 'Retail', icon: 'Store', description: 'Shops, stores, and product commerce' },
  { id: 'restaurant', label: 'Restaurant', icon: 'UtensilsCrossed', description: 'Cafes, dining, and food service' },
  { id: 'travel', label: 'Travel', icon: 'Plane', description: 'Tours, bookings, and tourism' },
  { id: 'software', label: 'Software', icon: 'Code2', description: 'Products, SaaS, and digital tools' },
  { id: 'manufacturing', label: 'Manufacturing', icon: 'Factory', description: 'Production and industrial' },
  { id: 'professional-services', label: 'Professional Services', icon: 'Briefcase', description: 'Consulting and client services' },
  { id: 'other', label: 'Other', icon: 'Layers', description: 'Something unique — tell us more next' },
];

export const LOCATION_OPTIONS: WizardOption[] = [
  { id: 'tamil-nadu', label: 'Tamil Nadu', icon: 'MapPin' },
  { id: 'kerala', label: 'Kerala', icon: 'MapPin' },
  { id: 'karnataka', label: 'Karnataka', icon: 'MapPin' },
  { id: 'andhra-pradesh', label: 'Andhra Pradesh', icon: 'MapPin' },
  { id: 'telangana', label: 'Telangana', icon: 'MapPin' },
  { id: 'other-india', label: 'Other India', icon: 'Globe' },
  { id: 'outside-india', label: 'Outside India', icon: 'Globe' },
];

export const STAGE_OPTIONS: WizardOption[] = [
  { id: 'idea', label: 'Just an idea', icon: 'Sparkles' },
  { id: 'planning', label: 'Planning', icon: 'ClipboardList' },
  { id: 'pre-launch', label: 'Pre-launch', icon: 'Rocket' },
  { id: 'launching', label: 'About to launch', icon: 'TrendingUp' },
  { id: 'operating', label: 'Already operating', icon: 'Building2' },
];

export const NAME_STATUS_OPTIONS: WizardOption[] = [
  { id: 'decided', label: 'Name is decided', icon: 'Check' },
  { id: 'shortlist', label: 'Shortlist ready', icon: 'Layers' },
  { id: 'exploring', label: 'Still exploring', icon: 'Search' },
  { id: 'need-help', label: 'Need branding help', icon: 'Palette' },
];

export const REGISTRATION_OPTIONS: WizardOption[] = [
  { id: 'not-started', label: 'Not started', icon: 'CircleAlert' },
  { id: 'in-progress', label: 'In progress', icon: 'LoaderCircle' },
  { id: 'completed', label: 'Completed', icon: 'Check' },
  { id: 'unsure', label: 'Not sure what I need', icon: 'Info' },
];

export const FUNDING_OPTIONS: WizardOption[] = [
  { id: 'bootstrapped', label: 'Self-funded / bootstrapped', icon: 'Wallet' },
  { id: 'seeking', label: 'Looking for funding', icon: 'TrendingUp' },
  { id: 'partial', label: 'Partially funded', icon: 'CreditCard' },
  { id: 'secured', label: 'Funding already secured', icon: 'Check' },
];

export const TIMELINE_OPTIONS: WizardOption[] = [
  { id: 'asap', label: 'As soon as possible', icon: 'Rocket' },
  { id: '30-days', label: 'Within 30 days', icon: 'ClipboardList' },
  { id: '90-days', label: 'Within 90 days', icon: 'Layers' },
  { id: '6-months', label: 'Within 6 months', icon: 'TrendingUp' },
  { id: 'flexible', label: 'Flexible / exploring', icon: 'Sparkles' },
];

export const BUDGET_OPTIONS: WizardOption[] = [
  { id: 'under-50k', label: 'Under ₹50,000', icon: 'Wallet' },
  { id: '50k-1l', label: '₹50,000 – ₹1 Lakh', icon: 'Wallet' },
  { id: '1l-3l', label: '₹1 – ₹3 Lakh', icon: 'CreditCard' },
  { id: '3l-5l', label: '₹3 – ₹5 Lakh', icon: 'CreditCard' },
  { id: '5l-plus', label: '₹5 Lakh+', icon: 'TrendingUp' },
  { id: 'not-sure', label: 'Not sure yet', icon: 'Info' },
];

export const NEW_BUSINESS_SUPPORT_OPTIONS: WizardOption[] = [
  { id: 'registration-legal', label: 'Registration and legal', icon: 'FileText' },
  { id: 'branding', label: 'Branding', icon: 'Palette' },
  { id: 'website', label: 'Website', icon: 'Globe' },
  { id: 'mobile-app', label: 'Mobile app', icon: 'Smartphone' },
  { id: 'business-software', label: 'Business software', icon: 'Code2' },
  { id: 'funding', label: 'Funding', icon: 'Wallet' },
  { id: 'marketing', label: 'Marketing', icon: 'Megaphone' },
  { id: 'recruitment', label: 'Recruitment', icon: 'Users' },
  { id: 'vendor-support', label: 'Vendor support', icon: 'Handshake' },
];

export const YEARS_OPTIONS: WizardOption[] = [
  { id: 'under-1', label: 'Less than 1 year' },
  { id: '1-3', label: '1 – 3 years' },
  { id: '3-5', label: '3 – 5 years' },
  { id: '5-plus', label: '5+ years' },
];

export const TEAM_SIZE_OPTIONS: WizardOption[] = [
  { id: 'solo', label: 'Just me' },
  { id: '2-5', label: '2 – 5 people' },
  { id: '6-20', label: '6 – 20 people' },
  { id: '21-50', label: '21 – 50 people' },
  { id: '50-plus', label: '50+ people' },
];

export const GROWTH_PROBLEM_OPTIONS: WizardOption[] = [
  { id: 'leads', label: 'Not enough quality leads' },
  { id: 'conversion', label: 'Leads not converting' },
  { id: 'operations', label: 'Operations are messy' },
  { id: 'visibility', label: 'Weak digital presence' },
  { id: 'retention', label: 'Customer retention' },
  { id: 'scaling', label: 'Hard to scale the team' },
];

export const LEAD_VOLUME_OPTIONS: WizardOption[] = [
  { id: 'under-20', label: 'Under 20 / month' },
  { id: '20-50', label: '20 – 50 / month' },
  { id: '50-200', label: '50 – 200 / month' },
  { id: '200-plus', label: '200+ / month' },
  { id: 'unknown', label: 'I don’t track this yet' },
];

export const DIGITAL_PRESENCE_OPTIONS: WizardOption[] = [
  { id: 'none', label: 'No website or app yet' },
  { id: 'website', label: 'Website only' },
  { id: 'app', label: 'App only' },
  { id: 'both', label: 'Website and app' },
  { id: 'outdated', label: 'Have one, but outdated' },
];

export const CRM_ERP_OPTIONS: WizardOption[] = [
  { id: 'none', label: 'No CRM / ERP' },
  { id: 'spreadsheets', label: 'Spreadsheets only' },
  { id: 'basic-crm', label: 'Basic CRM' },
  { id: 'erp', label: 'ERP in place' },
  { id: 'custom', label: 'Custom internal tools' },
];

export const MARKETING_CHANNEL_OPTIONS: WizardOption[] = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'instagram', label: 'Instagram / social' },
  { id: 'google', label: 'Google / SEO / Ads' },
  { id: 'referrals', label: 'Referrals' },
  { id: 'offline', label: 'Offline / walk-ins' },
  { id: 'none', label: 'Almost none yet' },
];

export const GROWTH_TARGET_OPTIONS: WizardOption[] = [
  { id: 'leads', label: 'More qualified leads' },
  { id: 'revenue', label: 'Higher revenue' },
  { id: 'efficiency', label: 'Operational efficiency' },
  { id: 'new-location', label: 'New locations / markets' },
  { id: 'brand', label: 'Stronger brand trust' },
];

export const GROWTH_SUPPORT_OPTIONS: WizardOption[] = [
  { id: 'marketing', label: 'Marketing' },
  { id: 'website', label: 'Website refresh' },
  { id: 'crm-erp', label: 'CRM / ERP' },
  { id: 'automation', label: 'Automation' },
  { id: 'branding', label: 'Branding' },
  { id: 'strategy', label: 'Growth strategy' },
];

export const PRODUCT_TYPE_OPTIONS: WizardOption[] = [
  { id: 'customer-app', label: 'Customer-facing app' },
  { id: 'internal-tool', label: 'Internal business tool' },
  { id: 'marketplace', label: 'Marketplace / platform' },
  { id: 'website', label: 'Marketing / business website' },
  { id: 'saas', label: 'SaaS product' },
];

export const PLATFORM_OPTIONS: WizardOption[] = [
  { id: 'web', label: 'Web' },
  { id: 'android', label: 'Android' },
  { id: 'ios', label: 'iOS' },
  { id: 'cross-platform', label: 'Cross-platform (Android + iOS)' },
  { id: 'web-mobile', label: 'Web + mobile' },
];

export const TARGET_USER_OPTIONS: WizardOption[] = [
  { id: 'customers', label: 'End customers' },
  { id: 'employees', label: 'Employees / internal teams' },
  { id: 'partners', label: 'Partners / agents' },
  { id: 'admins', label: 'Admins / operators' },
  { id: 'multi-sided', label: 'Multiple user types' },
];

export const FEATURE_OPTIONS: WizardOption[] = [
  { id: 'auth', label: 'Login / accounts' },
  { id: 'payments', label: 'Payments' },
  { id: 'bookings', label: 'Bookings / orders' },
  { id: 'chat', label: 'Chat / messaging' },
  { id: 'dashboard', label: 'Dashboards / reports' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'inventory', label: 'Inventory / catalog' },
  { id: 'ai', label: 'AI features' },
];

export const DESIGN_SPEC_OPTIONS: WizardOption[] = [
  { id: 'none', label: 'No design yet' },
  { id: 'wireframes', label: 'Wireframes / rough notes' },
  { id: 'figma', label: 'Figma / UI designs ready' },
  { id: 'spec', label: 'Written specification ready' },
  { id: 'rebuild', label: 'Rebuilding an existing product' },
];

export const YES_NO_OPTIONS: WizardOption[] = [
  { id: 'yes', label: 'Yes', icon: 'Check' },
  { id: 'no', label: 'No', icon: 'X' },
  { id: 'unsure', label: 'Not sure yet', icon: 'Info' },
];

export const ENTITY_TYPE_HELP_OPTIONS: WizardOption[] = [
  {
    id: 'sole-prop',
    label: 'Sole proprietorship',
    icon: 'User',
    description: 'Simple start for a single founder',
  },
  {
    id: 'partnership',
    label: 'Partnership',
    icon: 'Users',
    description: 'Two or more founders sharing ownership',
  },
  {
    id: 'private-limited',
    label: 'Private Limited',
    icon: 'Building2',
    description: 'Common for growth-ready companies',
  },
  {
    id: 'llp',
    label: 'LLP',
    icon: 'Briefcase',
    description: 'Flexible structure for professional firms',
  },
  {
    id: 'need-advice',
    label: 'I need advice',
    icon: 'Info',
    description: 'We’ll recommend the right path with you',
  },
];

export const BRANDING_FOCUS_OPTIONS: WizardOption[] = [
  { id: 'name-logo', label: 'Name and logo', icon: 'Palette' },
  { id: 'full-identity', label: 'Full brand identity', icon: 'Sparkles' },
  { id: 'website-first', label: 'Website-first branding', icon: 'Globe' },
  { id: 'later', label: 'Decide later', icon: 'Layers' },
];

export const MVP_SCOPE_OPTIONS: WizardOption[] = [
  { id: 'core-only', label: 'Core MVP only', icon: 'Rocket' },
  { id: 'mvp-plus', label: 'MVP + one advanced module', icon: 'Layers' },
  { id: 'full-v1', label: 'Full first release', icon: 'Code2' },
  { id: 'unsure', label: 'Need scoping help', icon: 'Info' },
];

export const INTEGRATION_OPTIONS: WizardOption[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
  { id: 'payments', label: 'Payment gateways', icon: 'CreditCard' },
  { id: 'maps', label: 'Maps / location', icon: 'MapPin' },
  { id: 'crm', label: 'CRM', icon: 'Users' },
  { id: 'accounting', label: 'Accounting / ERP', icon: 'Database' },
  { id: 'none', label: 'None for now', icon: 'Check' },
];

export const PARTNER_CATEGORY_OPTIONS: WizardOption[] = [
  { id: 'technology', label: 'Technology partner', icon: 'Code2' },
  { id: 'freelancer', label: 'Freelancer / developer', icon: 'User' },
  { id: 'marketing', label: 'Marketing partner', icon: 'Megaphone' },
  { id: 'vendor', label: 'Vendor / service provider', icon: 'Store' },
  { id: 'referral', label: 'Referral partner', icon: 'Handshake' },
  { id: 'investor', label: 'Investor / strategic partner', icon: 'TrendingUp' },
];

export const ENTITY_OPTIONS: WizardOption[] = [
  { id: 'individual', label: 'Individual', icon: 'User' },
  { id: 'company', label: 'Company / agency', icon: 'Building2' },
];

export const MANUAL_PROCESS_OPTIONS: WizardOption[] = [
  { id: 'lead-followup', label: 'Lead follow-up', icon: 'Users' },
  { id: 'customer-support', label: 'Customer support replies', icon: 'MessageCircle' },
  { id: 'invoicing', label: 'Invoicing / billing', icon: 'CreditCard' },
  { id: 'scheduling', label: 'Scheduling / bookings', icon: 'ClipboardList' },
  { id: 'reporting', label: 'Manual reporting', icon: 'FileText' },
  { id: 'document-handling', label: 'Document handling', icon: 'FileText' },
];

export const REPETITIVE_TASK_OPTIONS: WizardOption[] = [
  { id: 'data-entry', label: 'Data entry' },
  { id: 'status-updates', label: 'Status updates' },
  { id: 'reminders', label: 'Reminders / nudges' },
  { id: 'quote-prep', label: 'Quote preparation' },
  { id: 'faq-answers', label: 'FAQ answers' },
];

export const EXISTING_TOOLS_OPTIONS: WizardOption[] = [
  { id: 'whatsapp', label: 'WhatsApp Business' },
  { id: 'excel', label: 'Excel / Google Sheets' },
  { id: 'crm', label: 'CRM' },
  { id: 'helpdesk', label: 'Helpdesk / ticketing' },
  { id: 'none', label: 'Mostly manual' },
];

export const DATA_AVAILABILITY_OPTIONS: WizardOption[] = [
  { id: 'structured', label: 'Clean structured data' },
  { id: 'partial', label: 'Some data, messy' },
  { id: 'documents', label: 'Mostly documents / PDFs' },
  { id: 'starting', label: 'Just getting started' },
];

export const AI_OUTCOME_OPTIONS: WizardOption[] = [
  { id: 'save-time', label: 'Save team time' },
  { id: 'faster-response', label: 'Faster customer response' },
  { id: 'more-leads', label: 'More converted leads' },
  { id: 'fewer-errors', label: 'Fewer manual errors' },
  { id: 'scale', label: 'Scale without more headcount' },
];

export const EXPERIENCE_OPTIONS: WizardOption[] = [
  { id: 'under-1', label: 'Less than 1 year' },
  { id: '1-3', label: '1 – 3 years' },
  { id: '3-5', label: '3 – 5 years' },
  { id: '5-plus', label: '5+ years' },
];

export const CLIENT_OPTIONS: WizardOption[] = [
  { id: 'none', label: 'No clients yet' },
  { id: 'few', label: 'A few clients' },
  { id: 'steady', label: 'Steady client base' },
  { id: 'enterprise', label: 'Enterprise clients' },
];

export const VERIFICATION_OPTIONS: WizardOption[] = [
  { id: 'ready', label: 'Documents ready' },
  { id: 'partial', label: 'Some documents ready' },
  { id: 'need-help', label: 'Need guidance' },
  { id: 'later', label: 'Can share later' },
];

export const AVAILABILITY_OPTIONS: WizardOption[] = [
  { id: 'immediate', label: 'Available immediately' },
  { id: 'part-time', label: 'Part-time / project-based' },
  { id: '2-weeks', label: 'Within 2 weeks' },
  { id: 'exploring', label: 'Just exploring' },
];

export const COLLABORATION_OPTIONS: WizardOption[] = [
  { id: 'project', label: 'Project-based delivery' },
  { id: 'retainer', label: 'Monthly retainer' },
  { id: 'referral', label: 'Referral partnership' },
  { id: 'white-label', label: 'White-label collaboration' },
  { id: 'equity', label: 'Strategic / equity discussion' },
];
