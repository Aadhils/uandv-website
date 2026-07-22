import type { BusinessGuideCopy } from '../types';

export const enGuide: BusinessGuideCopy = {
  language: 'en',
  badge: 'Personal business guide',
  languagePrompt: 'Which language should I guide you in?',
  languageHelper:
    'I’ll stay with you in this language for the whole journey. The rest of the website stays in English.',
  greeting:
    'I’m here with you — like a trusted growth partner sitting across the table. Tell me what you want to achieve, and I’ll show you a clear path. No pressure, no jargon.',
  question: 'What would you like to achieve today?',
  scrollHint:
    'Not ready to choose? That’s fine — scroll down and explore our work anytime.',
  panelEyebrow: 'Here’s how we’ll walk this together',
  stepsLabel: 'Your recommended path',
  partnerPrompt: 'Which kind of partnership feels right for you?',
  nextStepPrompt:
    'When you’re ready, pick a next step. We’ll already know your journey so the conversation starts warm, not cold.',
  clearSelection: 'Choose a different goal',
  changeLanguage: 'Change guide language',
  ctaContinue: "Let's Get Started",
  ctaConsultation: 'Book a free strategy conversation',
  ctaPartner: 'Partner with U&V',
  journeys: [
    {
      id: 'start-new-business',
      title: 'Start a New Business',
      description:
        'You have an idea. Let’s turn it into something real — step by step, without overwhelm.',
      icon: 'Rocket',
      interestSlug: 'startup-business-consulting',
      visitorType: 'new-business',
      consultantIntro:
        'Starting something new takes courage. I’ll help you move from idea to a registered, branded, market-ready business — at a pace that feels safe.',
      reassurance:
        'You don’t need everything figured out. We’ll start with clarity, then build momentum.',
      steps: [
        {
          id: 'idea',
          label: 'Idea',
          coachNote: 'We sharpen what you’re building and who it’s for.',
        },
        {
          id: 'registration',
          label: 'Registration',
          coachNote: 'We guide the legal and setup basics so you start clean.',
        },
        {
          id: 'branding',
          label: 'Branding',
          coachNote: 'We shape a name and look people can trust.',
        },
        {
          id: 'website-app',
          label: 'Website/App',
          coachNote: 'We give customers a place to find and choose you.',
        },
        {
          id: 'marketing',
          label: 'Marketing',
          coachNote: 'We help the right people discover your offer.',
        },
        {
          id: 'growth',
          label: 'Growth',
          coachNote: 'We stay with you as traction becomes a system.',
        },
      ],
    },
    {
      id: 'grow-existing-business',
      title: 'Grow My Existing Business',
      description:
        'You’re already running. Let’s strengthen what’s working and remove what’s slowing you down.',
      icon: 'TrendingUp',
      interestSlug: 'digital-marketing',
      visitorType: 'existing-business',
      consultantIntro:
        'Growth isn’t about doing more of everything. We’ll look at your business honestly, then focus on the few moves that unlock the next stage.',
      reassurance:
        'You already have momentum. Our job is to protect it — and multiply it.',
      steps: [
        {
          id: 'audit',
          label: 'Business Audit',
          coachNote: 'We see what’s strong, stuck, and missing.',
        },
        {
          id: 'digital-presence',
          label: 'Digital Presence',
          coachNote: 'We make sure customers can find and trust you online.',
        },
        {
          id: 'crm-erp',
          label: 'CRM/ERP',
          coachNote: 'We organize sales, ops, and data so nothing falls through.',
        },
        {
          id: 'marketing',
          label: 'Marketing',
          coachNote: 'We build a steady engine for leads and retention.',
        },
        {
          id: 'automation',
          label: 'Automation',
          coachNote: 'We remove repetitive work so your team can scale.',
        },
        {
          id: 'growth',
          label: 'Growth',
          coachNote: 'We keep improving with you — not a one-time project.',
        },
      ],
    },
    {
      id: 'build-software-or-app',
      title: 'Build Software or an App',
      description:
        'You need a product built properly — clear plan, clean design, reliable delivery.',
      icon: 'Code2',
      interestSlug: 'custom-software-development',
      visitorType: 'software-buyer',
      consultantIntro:
        'Building software should feel controlled, not chaotic. I’ll walk you from requirements to launch with plain language and clear milestones.',
      reassurance:
        'You’ll always know what we’re building, why it matters, and what’s next.',
      steps: [
        {
          id: 'requirement',
          label: 'Requirement',
          coachNote: 'We listen first — goals, users, constraints.',
        },
        {
          id: 'solution-plan',
          label: 'Solution Plan',
          coachNote: 'We map the right architecture and delivery plan.',
        },
        {
          id: 'ui-ux',
          label: 'UI/UX',
          coachNote: 'We design an experience people actually enjoy using.',
        },
        {
          id: 'development',
          label: 'Development',
          coachNote: 'We build in stages you can see and approve.',
        },
        {
          id: 'testing',
          label: 'Testing',
          coachNote: 'We pressure-test quality before customers do.',
        },
        {
          id: 'launch',
          label: 'Launch',
          coachNote: 'We go live carefully — then support what comes next.',
        },
      ],
    },
    {
      id: 'automate-with-ai',
      title: 'Automate My Business with AI',
      description:
        'Too much manual work? Let’s find where AI can save time — safely and practically.',
      icon: 'Bot',
      interestSlug: 'ai-automation',
      visitorType: 'ai-automation',
      consultantIntro:
        'AI should reduce load, not create confusion. We’ll start with your real processes, then automate only what creates clear value.',
      reassurance:
        'No hype. Just practical automation your team can understand and trust.',
      steps: [
        {
          id: 'process-analysis',
          label: 'Process Analysis',
          coachNote: 'We map how work actually gets done today.',
        },
        {
          id: 'opportunities',
          label: 'Automation Opportunities',
          coachNote: 'We pick high-impact tasks worth automating first.',
        },
        {
          id: 'ai-solution',
          label: 'AI Solution',
          coachNote: 'We design an AI approach that fits your business.',
        },
        {
          id: 'integration',
          label: 'Integration',
          coachNote: 'We connect it into the tools your team already uses.',
        },
        {
          id: 'monitoring',
          label: 'Monitoring',
          coachNote: 'We keep an eye on results and improve over time.',
        },
      ],
    },
    {
      id: 'partner-with-uandv',
      title: 'Partner with U&V',
      description:
        'You want to grow together — as a collaborator, not just a client.',
      icon: 'Handshake',
      interestSlug: 'startup-business-consulting',
      visitorType: 'partner',
      consultantIntro:
        'Great partnerships start with clarity. Tell me how you’d like to work with us, and I’ll show you a respectful, practical next step.',
      reassurance:
        'Whether you build, market, refer, or invest — we’ll treat the relationship with care.',
      partnerTypes: [
        {
          id: 'technology-partner',
          label: 'Technology Partner',
          description:
            'Let’s co-build software, AI, and digital products for shared clients.',
        },
        {
          id: 'freelancer-developer',
          label: 'Freelancer / Developer',
          description:
            'Join delivery with us when projects need trusted hands.',
        },
        {
          id: 'marketing-partner',
          label: 'Marketing Partner',
          description:
            'Grow brands together through campaigns, content, and performance.',
        },
        {
          id: 'vendor-service-provider',
          label: 'Vendor / Service Provider',
          description:
            'Bring complementary services into a joined-up client experience.',
        },
        {
          id: 'referral-partner',
          label: 'Referral Partner',
          description:
            'Introduce the right opportunities — and grow on mutual trust.',
        },
        {
          id: 'investor-strategic-partner',
          label: 'Investor / Strategic Partner',
          description:
            'Explore long-term strategic or investment conversations carefully.',
        },
      ],
    },
  ],
};
