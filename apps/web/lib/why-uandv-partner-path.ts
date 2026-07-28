/** Partner Path v3.2 — journey stage content (production lock) */

export const wuvPartnerPath = {
  eyebrow: 'How U&V works with you',
  title: 'From your first conversation to long-term growth',
  intro:
    'A real partnership follows a rhythm — listen first, plan with clarity, build with care, launch together, and keep growing.',
  stages: [
    {
      id: 'listen',
      label: 'Listen',
      title: 'We listen first',
      description:
        'We understand your business, challenges, customers and goals before recommending technology.',
    },
    {
      id: 'plan',
      label: 'Plan',
      title: 'Build the right plan',
      description:
        'We shape the right solution, priorities and roadmap around your business needs.',
    },
    {
      id: 'build',
      label: 'Build',
      title: 'Turn ideas into products',
      description:
        'We design and develop websites, apps, software, CRM and automation with clarity.',
    },
    {
      id: 'launch',
      label: 'Launch',
      title: 'Go live with confidence',
      description:
        'We test, refine and support the product through a reliable launch.',
    },
    {
      id: 'grow',
      label: 'Grow',
      title: 'Long-term business partner',
      description:
        'After launch, we continue with support, updates, improvements and future growth.',
    },
  ],
  closing: "Our partnership doesn't end at launch. That's where it truly begins.",
} as const;

export type WuvPartnerPathStage = (typeof wuvPartnerPath.stages)[number];
