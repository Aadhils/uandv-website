import type { IconName } from '@uandv/ui';

export const startupPositioning = {
  eyebrow: 'Startup Growth Partner',
  headline: 'From first idea to launch — and beyond',
  subheadline:
    'U&V helps founders who have an idea but need clarity, structure, and long-term support. We guide you through validation, planning, registration, branding, product, marketing, and growth — based on what your business actually needs at each stage.',
  heroSummary:
    'You do not have to figure everything out alone. Whether you are still shaping the idea or ready to build, U&V is a practical partner for planning, technology, branding, and sustainable growth.',
  trustLine:
    'Honest guidance for your stage. No guaranteed funding, instant success, or unrealistic growth promises.',
} as const;

export const startupSupportAreas: ReadonlyArray<{
  title: string;
  problem: string;
  outcome: string;
  icon: IconName;
}> = [
  {
    title: 'Idea validation',
    problem: 'You are excited about the idea but unsure if customers will pay or if the model holds up.',
    outcome:
      'Clear thinking on your offer, audience, and revenue logic before you invest heavily in the wrong direction.',
    icon: 'Search',
  },
  {
    title: 'Business planning',
    problem: 'Tasks feel scattered and you are not sure what to do first, second, or third.',
    outcome:
      'A practical roadmap with priorities and milestones you can follow week by week.',
    icon: 'ClipboardList',
  },
  {
    title: 'Company registration support',
    problem: 'Legal structure and registration steps feel confusing and easy to postpone.',
    outcome:
      'Guidance on structure, documentation, and launch readiness so your business is set up properly.',
    icon: 'Briefcase',
  },
  {
    title: 'Branding',
    problem: 'You look early-stage or inconsistent, which makes it harder to earn trust.',
    outcome:
      'A credible identity — logo, messaging, and visuals — that customers recognise and remember.',
    icon: 'Palette',
  },
  {
    title: 'Website and mobile app development',
    problem: 'You need a professional way to explain your offer and capture interest online.',
    outcome:
      'A conversion-focused website or app built for how you sell — not a generic template that sits unused.',
    icon: 'Smartphone',
  },
  {
    title: 'AI and automation',
    problem: 'Repetitive admin and follow-up eat the time you need for customers and growth.',
    outcome:
      'Practical automation that removes busywork without adding complexity you are not ready to manage.',
    icon: 'Bot',
  },
  {
    title: 'Digital marketing',
    problem: 'Visibility is low or ad spend does not turn into real conversations.',
    outcome:
      'Channels, content, and follow-up paths sized to your stage — focused on enquiries, not vanity metrics.',
    icon: 'Megaphone',
  },
  {
    title: 'Launch support',
    problem: 'Go-live feels overwhelming — too many moving parts and no clear sequence.',
    outcome:
      'Organised launch coordination across platform, messaging, and first-customer workflows.',
    icon: 'Rocket',
  },
  {
    title: 'Long-term business growth',
    problem: 'Early traction arrived but systems, marketing, and product have not caught up.',
    outcome:
      'Continued partnership to improve operations, expand reach, and evolve what you offer as the business matures.',
    icon: 'TrendingUp',
  },
];

export const startupWhyUandv = [
  {
    title: 'A growth partner — not just a dev shop',
    description:
      'U&V supports founders across planning, branding, product, marketing, and operations — not only writing code and disappearing after delivery.',
  },
  {
    title: 'Clarity before complexity',
    description:
      'We help you decide what matters now versus later, so budget and energy go to the moves that actually move the business forward.',
  },
  {
    title: 'Honest about what success looks like',
    description:
      'We do not promise guaranteed funding, overnight traction, or unrealistic growth. We focus on practical steps matched to your reality.',
  },
  {
    title: 'Support that continues after launch',
    description:
      'Many founders need a partner beyond day one. U&V stays involved for stabilisation, improvement, and growth as requirements evolve.',
  },
] as const;

export const startupProcess = [
  {
    title: 'Listen and understand',
    description:
      'We start with your idea, constraints, market, and where you are stuck — so advice fits your stage, not a generic startup playbook.',
  },
  {
    title: 'Plan with clear priorities',
    description:
      'Together we shape a practical sequence: what to validate, register, brand, build, and market — and in what order.',
  },
  {
    title: 'Execute with accountable delivery',
    description:
      'When you are ready, U&V delivers branding, websites, apps, automation, and marketing with the same team that helped plan it.',
  },
  {
    title: 'Grow with ongoing partnership',
    description:
      'After launch, we help you improve, expand, and adapt — so the business keeps moving forward instead of stalling at version one.',
  },
] as const;

export const startupHonestPositioning = {
  statement:
    'U&V provides planning, technology, branding, and growth support tailored to each founder’s stage and goals. We are not investors, do not guarantee funding outcomes, and do not promise instant success or unrealistic growth.',
  points: [
    'We do not guarantee investment or funding results',
    'We do not promise overnight traction or viral growth',
    'We do not sell get-rich-quick or passive-income narratives',
    'We focus on practical support based on your real needs and capacity',
  ],
} as const;

export const startupFaqs = [
  {
    question: 'Is this only for tech startups?',
    answer:
      'No. We work with product, service, and hybrid businesses — anyone who needs clearer planning and hands-on support to launch and grow.',
  },
  {
    question: 'Can you help if I only have an idea?',
    answer:
      'Yes. Many founders start at idea stage. We help you validate direction first, then move into registration, branding, and build when it makes sense.',
  },
  {
    question: 'Do you also implement the plan?',
    answer:
      'Yes. Consulting can stand alone, or continue into U&V delivery across branding, websites, apps, automation, and marketing.',
  },
  {
    question: 'Will you guarantee funding or fast growth?',
    answer:
      'No. We provide honest planning and execution support. Outcomes depend on your market, offer, and effort — we help you make better decisions, not false promises.',
  },
] as const;

export const startupRelatedSlugs = [
  'business-registration-support',
  'branding-logo-design',
  'website-development',
] as const;
