import type { Messages } from '../types';

/** Fully reviewed English copy for Sprint 1. */
export const enMessages: Messages = {
  locale: 'en',
  smartWelcome: {
    brandEyebrow: 'U&V Technologies',
    heading: 'Your Business Growth Partner',
    supportingText:
      'From idea and branding to software, AI, marketing, and growth — everything your business needs under one roof.',
    question: 'What would you like to achieve today?',
    panelTitle: 'Your journey with U&V',
    partnerPrompt: 'How would you like to partner with us?',
    stepsLabel: 'Recommended path',
    ctaContinue: 'Continue Your Journey',
    ctaConsultation: 'Get a Free Consultation',
    ctaPartner: 'Partner with U&V',
    scrollHint: 'Or scroll to explore our services and work',
    languageHint: 'Preferred language for follow-up',
    journeys: [
      {
        id: 'start-new-business',
        title: 'Start a New Business',
        description:
          'Turn an idea into a registered, branded, and market-ready business.',
        icon: 'Rocket',
        interestSlug: 'startup-business-consulting',
        visitorType: 'new-business',
        steps: [
          { id: 'idea', label: 'Idea' },
          { id: 'registration', label: 'Registration' },
          { id: 'branding', label: 'Branding' },
          { id: 'website-app', label: 'Website/App' },
          { id: 'marketing', label: 'Marketing' },
          { id: 'growth', label: 'Growth' },
        ],
      },
      {
        id: 'grow-existing-business',
        title: 'Grow My Existing Business',
        description:
          'Strengthen systems, digital presence, and growth engines for your company.',
        icon: 'TrendingUp',
        interestSlug: 'digital-marketing',
        visitorType: 'existing-business',
        steps: [
          { id: 'audit', label: 'Business Audit' },
          { id: 'digital-presence', label: 'Digital Presence' },
          { id: 'crm-erp', label: 'CRM/ERP' },
          { id: 'marketing', label: 'Marketing' },
          { id: 'automation', label: 'Automation' },
          { id: 'growth', label: 'Growth' },
        ],
      },
      {
        id: 'build-software-or-app',
        title: 'Build Software or an App',
        description:
          'Plan, design, and launch custom software or mobile apps with a clear delivery path.',
        icon: 'Code2',
        interestSlug: 'custom-software-development',
        visitorType: 'software-buyer',
        steps: [
          { id: 'requirement', label: 'Requirement' },
          { id: 'solution-plan', label: 'Solution Plan' },
          { id: 'ui-ux', label: 'UI/UX' },
          { id: 'development', label: 'Development' },
          { id: 'testing', label: 'Testing' },
          { id: 'launch', label: 'Launch' },
        ],
      },
      {
        id: 'automate-with-ai',
        title: 'Automate My Business with AI',
        description:
          'Identify high-impact workflows and deploy AI automation that teams can trust.',
        icon: 'Bot',
        interestSlug: 'ai-automation',
        visitorType: 'ai-automation',
        steps: [
          { id: 'process-analysis', label: 'Process Analysis' },
          { id: 'opportunities', label: 'Automation Opportunities' },
          { id: 'ai-solution', label: 'AI Solution' },
          { id: 'integration', label: 'Integration' },
          { id: 'monitoring', label: 'Monitoring' },
        ],
      },
      {
        id: 'partner-with-uandv',
        title: 'Partner with U&V',
        description:
          'Collaborate as a technology, marketing, referral, or strategic growth partner.',
        icon: 'Handshake',
        interestSlug: 'startup-business-consulting',
        visitorType: 'partner',
        partnerTypes: [
          {
            id: 'technology-partner',
            label: 'Technology Partner',
            description: 'Co-build and deliver software, AI, and digital products.',
          },
          {
            id: 'freelancer-developer',
            label: 'Freelancer / Developer',
            description: 'Join delivery teams on product and engineering work.',
          },
          {
            id: 'marketing-partner',
            label: 'Marketing Partner',
            description: 'Grow brands together through campaigns and content.',
          },
          {
            id: 'vendor-service-provider',
            label: 'Vendor / Service Provider',
            description: 'Supply complementary services to shared clients.',
          },
          {
            id: 'referral-partner',
            label: 'Referral Partner',
            description: 'Refer opportunities and grow together with trust.',
          },
          {
            id: 'investor-strategic-partner',
            label: 'Investor / Strategic Partner',
            description: 'Explore long-term strategic or investment collaboration.',
          },
        ],
      },
    ],
  },
};
