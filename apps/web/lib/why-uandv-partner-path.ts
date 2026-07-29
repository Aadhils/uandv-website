/** Partner Path — 7-step journey content */

export const wuvPartnerPath = {
  eyebrow: 'How the relationship begins',
  title: 'From first conversation to long-term growth',
  intro:
    'We do not recommend solutions until we understand your business, customers, challenges, budget, priorities, and goals. Every step follows that discipline.',
  stages: [
    {
      id: 'listen',
      label: 'Listen',
      title: 'We listen first',
      description:
        'Your story, pressures, and what success should feel like for you and your team.',
    },
    {
      id: 'understand',
      label: 'Understand',
      title: 'We understand your world',
      description:
        'Your business model, customers, challenges, budget, priorities, and goals — before any recommendation.',
    },
    {
      id: 'plan',
      label: 'Plan',
      title: 'We plan with clarity',
      description:
        'The right solution, priorities, and roadmap shaped around what your business actually needs.',
    },
    {
      id: 'build',
      label: 'Build',
      title: 'We build with care',
      description:
        'Design and development with visible progress, documented decisions, and quality you can depend on.',
    },
    {
      id: 'launch',
      label: 'Launch',
      title: 'We launch together',
      description:
        'Testing, training, and go-live support so your team and customers are ready — not left guessing.',
    },
    {
      id: 'improve',
      label: 'Improve',
      title: 'We keep improving',
      description:
        'Feedback, fixes, and refinements based on how the product performs in real use.',
    },
    {
      id: 'grow',
      label: 'Grow',
      title: 'We grow with you',
      description:
        'Long-term support, new capabilities, and scaling as your business evolves.',
    },
  ],
  closing: "Our partnership doesn't end at launch. That's where it truly begins.",
} as const;

export type WuvPartnerPathStage = (typeof wuvPartnerPath.stages)[number];
