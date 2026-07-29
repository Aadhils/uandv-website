/** About U&V — story-driven page content */

export const wuvHero = {
  eyebrow: 'About U&V',
  title: 'Your business is not just another project to us.',
  lead:
    'We combine technology with real business understanding — and stay with you as a long-term partner, not a vendor who disappears after delivery.',
  secondaryLead:
    'Choosing a software partner is a trust decision. We earn it by listening first, recommending honestly, and showing up long after launch.',
} as const;

export const wuvOriginStory = {
  eyebrow: 'Why U&V exists',
  title: 'One accountable partner — not a patchwork of vendors',
  paragraphs: [
    'Most business owners know the cycle. A designer hands off to a developer. The developer blames the hosting team. Marketing starts before the product is ready. Legal gets involved too late. Nobody owns the whole picture — and you are left coordinating the gaps.',
    'U&V exists because your business deserves better than fragmented vendors. We bring strategy, design, technology, operations, and growth support under one roof — with one team accountable for the outcome.',
    'We measure success by whether your business is stronger because we were involved — not by how many deliverables we checked off.',
  ],
  pullQuote:
    'Your business deserves one accountable partner — not a patchwork of vendors.',
} as const;

export const wuvYouWe = {
  eyebrow: 'You & we',
  title: 'What we each bring to the partnership',
  intro:
    'Great partnerships are built on clarity about who brings what. You know your business. We bring the capabilities to turn that knowledge into lasting growth.',
  youTitle: 'You bring',
  youItems: ['Your idea', 'Your knowledge', 'Your vision', 'Your customers'],
  weTitle: 'We bring',
  weItems: ['Strategy', 'Design', 'Technology', 'Execution', 'Support', 'Growth'],
  equation: 'You + We = Growth',
} as const;

export const wuvEcosystem = {
  eyebrow: 'One partner, connected support',
  title: 'Everything your business needs — connected',
  intro:
    'Software, automation, branding, legal guidance, launch support, and long-term growth — coordinated by one team that already understands your business.',
  nodes: [
    { id: 'technology', label: 'Technology', description: 'Websites, apps, software, and systems built to run your operations.' },
    { id: 'operations', label: 'Business Operations', description: 'Workflows, automation, and tools that reduce manual work.' },
    { id: 'brand', label: 'Brand & Marketing', description: 'Identity, content, and campaigns that reach your customers.' },
    { id: 'legal', label: 'Legal & Compliance', description: 'Contracts, policies, and compliance handled at the right time.' },
    { id: 'launch', label: 'Launch Support', description: 'Go-live planning, training, and stabilisation when it matters most.' },
    { id: 'growth', label: 'Long-Term Growth', description: 'Improvements, scaling, and new capabilities as you evolve.' },
  ],
  ctaLabel: 'Explore Business Solutions',
  ctaHref: '/business-solutions',
} as const;

export const wuvWorkingWithUs = {
  eyebrow: 'What working with U&V feels like',
  title: 'Partnership in practice — not promises on a slide',
  intro:
    'These are not marketing slogans. They are how we show up in every conversation, every milestone, and every decision along the way.',
  principles: [
    {
      id: 'communication',
      title: 'Clear communication',
      description:
        'You always know what is happening, what changed, and what comes next — in plain language, not jargon.',
    },
    {
      id: 'honesty',
      title: 'Honest recommendations',
      description:
        'We tell you what you need, not what is easiest to sell. If something should wait, we say so.',
    },
    {
      id: 'progress',
      title: 'Visible progress',
      description:
        'Milestones you can track, demos you can review, and updates you do not have to chase.',
    },
    {
      id: 'documentation',
      title: 'Documented decisions',
      description:
        'Scope, approvals, and changes are written down — so nothing depends on memory or assumptions.',
    },
    {
      id: 'timelines',
      title: 'Realistic timelines',
      description:
        'We plan for how work actually gets done, with room for the unexpected — not fantasy deadlines.',
    },
    {
      id: 'support',
      title: 'Continued support',
      description:
        'Launch is a milestone, not an exit. We stay when adoption, fixes, and improvements matter most.',
    },
    {
      id: 'responsibility',
      title: 'Shared responsibility',
      description:
        'We treat your success as our success — and take ownership when something needs fixing.',
    },
  ],
} as const;

export const wuvAfterLaunch = {
  eyebrow: 'After launch',
  title: 'Launch is where the real partnership begins',
  intro:
    'Going live is not the finish line. It is the start of adoption, improvement, and growth — with a partner who already knows your business.',
  phases: [
    {
      id: 'launch',
      label: 'Launch',
      description: 'Go-live support, stabilisation, and making sure your team and customers can use what we built.',
    },
    {
      id: 'adoption',
      label: 'Adoption',
      description: 'Training, feedback loops, and fixing friction so the investment pays off in daily use.',
    },
    {
      id: 'improvement',
      label: 'Improvement',
      description: 'Maintenance, enhancements, automation, and marketing refinements based on real data.',
    },
    {
      id: 'growth',
      label: 'Growth',
      description: 'Future versions, scaling, and new capabilities as your business evolves.',
    },
  ],
  supports: [
    'Maintenance and bug fixes',
    'Feature improvements',
    'Customer feedback integration',
    'Process automation',
    'Marketing optimisation',
    'Future product versions',
    'Scaling as you grow',
  ],
} as const;

export const wuvConsultationClose = {
  eyebrow: 'Start with clarity',
  title: "Let's build more than software. Let's build what moves your business forward.",
  lead:
    'Tell us where you are today and where you want to go. We will listen, understand your priorities, and recommend an honest starting point — no pressure, just a real conversation.',
} as const;

/** Legacy exports — used by film/gallery components outside the story page */
export const wuvWhyChoose = {
  eyebrow: 'Why businesses choose U&V',
  principlesTitle: 'What we stand behind',
  principlesIntro:
    'Principles are easy to print. They are harder to live when deadlines tighten or decisions get difficult.',
  principlesOutro: 'These are how we operate — not aspirations.',
} as const;

export const wuvAccountability = {
  commitments: [
    { title: 'Clear project milestones', description: 'You always know what stage we are in and what comes next.' },
    { title: 'Written scope and records', description: 'Decisions and deliverables are documented — not left to memory.' },
    { title: 'Transparent progress updates', description: 'Regular, honest communication about progress, risks, and trade-offs.' },
    { title: 'Approval before major changes', description: 'Scope shifts are discussed and agreed — never sprung on you mid-project.' },
  ],
} as const;

export const wuvIndustryTaglines: Record<
  'healthcare' | 'education' | 'finance' | 'travel' | 'hospitality' | 'logistics',
  string
> = {
  healthcare: 'Reliability and privacy-sensitive workflows where mistakes are costly.',
  education: 'Admissions, learning platforms, and administration that scale with you.',
  finance: 'Clarity, records, and controlled processes your team can trust.',
  travel: 'Bookings, availability, and customer coordination under pressure.',
  hospitality: 'Reservations, orders, and daily operations that must run smoothly.',
  logistics: 'Tracking, dispatch, and visibility across a moving operation.',
};
