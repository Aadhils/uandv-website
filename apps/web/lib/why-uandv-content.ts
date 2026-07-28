/** About U&V — company story content (deduplicated) */

export const wuvHero = {
  eyebrow: 'About U&V',
  title: 'A partner built on trust — not transactions',
  /** Single hero paragraph — full story lives in #our-story */
  lead:
    'Choosing a software partner is a trust decision. We earn it through how we listen, deliver, and stay long after launch.',
} as const;

export const wuvOurStory = {
  eyebrow: 'Our story',
  title: 'Built on a premise your business deserves',
  paragraphs: [
    'Most business owners know the cycle — a vendor overpromises, under-delivers, and moves on. You manage the gap while wondering if anyone on the other side actually cares.',
    'U&V was built on a different premise: your business matters more than any single project. We measure success by whether you are stronger because we were involved.',
    'Trust is not something we ask for on day one. It is something we earn — through clarity, accountability, and partnership that continues long after launch.',
  ],
  pullQuote:
    'We measure success by whether your business is stronger because we were involved.',
} as const;

export const wuvWhyChoose = {
  eyebrow: 'Why businesses choose U&V',
  title: 'A partner you can trust — in practice',
  intro:
    'After vendors who disappear, you need a team that stays clear, accountable, and invested long after launch.',
  pillars: [
    {
      id: 'clarity',
      title: 'Clarity from day one',
      description:
        'You always know what we are building, why it matters, and what comes next — no jargon, no surprises mid-project.',
    },
    {
      id: 'accountability',
      title: 'Accountability you can see',
      description:
        'Written scope, documented decisions, and milestones you can track — not promises left to memory.',
    },
    {
      id: 'partnership',
      title: 'Partnership, not handoffs',
      description:
        'We listen before we recommend, involve you in real decisions, and treat your success as the measure of ours.',
    },
    {
      id: 'long-term',
      title: 'Support that continues',
      description:
        'Launch is a milestone, not an exit. We stay for maintenance, growth, and the moments when something breaks.',
    },
  ],
  principlesIntro:
    'Principles are easy to print. They are harder to live when deadlines tighten or decisions get difficult.',
  principlesTitle: 'What we stand behind',
  principlesOutro: 'These are how we operate — not aspirations.',
} as const;

export const wuvAccountability = {
  eyebrow: 'Proof through accountability',
  title: 'How we stay accountable in practice',
  intro:
    'A delivery framework you can see — clear milestones, written scope, and support that continues.',
  commitments: [
    {
      title: 'Clear project milestones',
      description: 'You always know what stage we are in and what comes next.',
    },
    {
      title: 'Written scope and records',
      description: 'Decisions and deliverables are documented — not left to memory.',
    },
    {
      title: 'Transparent progress updates',
      description: 'Regular, honest communication about progress, risks, and trade-offs.',
    },
    {
      title: 'Approval before major changes',
      description: 'Scope shifts are discussed and agreed — never sprung on you mid-project.',
    },
    {
      title: 'Support after launch',
      description: 'Go-live is a milestone, not an exit. We stay when adoption matters most.',
    },
    {
      title: 'Aligned business and technical decisions',
      description: 'Technology serves your operations and growth — not the other way around.',
    },
  ],
} as const;

export const wuvClientsStay = {
  eyebrow: 'Why clients stay',
  title: 'Why our clients don\u2019t leave',
  intro:
    'The real test is year two and three — when something breaks at the worst time and someone actually answers.',
  closing:
    'Clients stay because leaving would mean starting again with someone who does not know their business.',
  yearMarkers: ['Year 1', 'Year 2', 'Year 3+'] as const,
} as const;

export const wuvSolutionsStory = {
  eyebrow: 'Solutions we build',
  title: 'What we help you build and run',
  intro:
    'Every engagement starts with a real business challenge. Find the area closest to yours, then explore how we deliver it.',
} as const;

export const wuvConsultationClose = {
  eyebrow: 'Start with clarity',
  title: 'Book a free consultation',
  lead:
    'Tell us where you are today and where you want to go. We will point you to the right starting point — no pressure, just an honest conversation.',
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

export const wuvIndustries = {
  eyebrow: 'Industries We Understand',
  title: 'Businesses We\u2019ve Partnered With',
  paragraphs: [
    'Every industry has its own pressures — compliance, seasonality, and operational complexity. We build for your world, not a learning curve on your time.',
  ],
} as const;
