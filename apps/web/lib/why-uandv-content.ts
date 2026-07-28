/** Why U&V — company story content (deduplicated) */

export const wuvHero = {
  eyebrow: 'Trust & Partnership',
  title: 'Why Partnership Matters More Than Software',
  /** Single hero paragraph — full story lives in #our-story */
  lead:
    'Choosing a software partner is not really a technology decision. It is a trust decision.',
} as const;

export const wuvOurStory = {
  eyebrow: 'Our story',
  title: 'Built on a premise your business deserves',
  paragraphs: [
    'Most business owners have been here before. A vendor promises the world, delivers something that almost works, and moves on. You are left managing the gap — fixing what should have been right the first time, explaining delays to your team, wondering whether anyone on the other side actually cares about your business.',
    'Before choosing the right partner, many businesses live through the same cycle — overpromising, delays, poor communication, incomplete delivery, and a vendor who disappears once the invoice is paid.',
    'U&V was built on a different premise: your business matters more than any single project. We do not measure success by what we ship. We measure it by whether your business is stronger because we were involved.',
    'Trust is not something we ask for on day one. It is something we earn — through how we listen, how we communicate, and how we behave long after the work is done.',
  ],
  pullQuote:
    'Your business matters more than any single project. We measure success by whether your business is stronger because we were involved.',
} as const;

export const wuvWhyChoose = {
  eyebrow: 'Why businesses choose U&V',
  title: 'A partner you can trust — in practice, not just on paper',
  intro:
    'After the frustration of vendors who disappear, what you need is not another pitch — it is a team that stays clear, accountable, and invested in your business long after launch.',
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
    'Principles are easy to print on a website. They are harder to live by when a project gets difficult, a deadline tightens, or a decision needs an honest answer.',
  principlesTitle: 'What we stand behind',
  principlesOutro: 'These are not aspirations. They are how we operate.',
} as const;

export const wuvAccountability = {
  eyebrow: 'Proof through accountability',
  title: 'How we stay accountable in practice',
  intro:
    'We do not ask you to trust slogans. We ask you to trust a delivery framework you can see — clear milestones, written scope, and support that continues after launch.',
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
    'The true test of a software partner is not the launch. It is year two. Year three. The moment something breaks at the worst possible time — and someone actually answers.',
  closing:
    'Clients stay because leaving would mean starting again with someone who does not know their business. That is not loyalty through convenience. That is trust earned over time.',
  yearMarkers: ['Year 1', 'Year 2', 'Year 3+'] as const,
} as const;

export const wuvSolutionsStory = {
  eyebrow: 'Solutions we build',
  title: 'What we help you build and run',
  intro:
    'Every engagement starts with a real business challenge — not a service catalogue. Find the area closest to yours, then explore how we deliver it.',
} as const;

export const wuvConsultationClose = {
  eyebrow: 'Start with clarity',
  title: 'Book a free consultation',
  lead:
    'Tell us where you are today and where you want to go. We will point you to the right starting point — no pressure, no jargon, just an honest conversation about your business.',
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
    'Every industry has its own pressures — compliance, seasonality, and operational complexity. We treat sector experience as responsibility: asking the right questions, respecting your constraints, and building for your world — not a learning curve on your time.',
  ],
} as const;
