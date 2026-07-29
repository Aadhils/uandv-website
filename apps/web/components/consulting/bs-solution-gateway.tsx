import Link from 'next/link';

import { Icon, cn } from '@uandv/ui';
import type { IconName } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvCardInteractive, uvEyebrow } from '@/components/marketing/marketing-design-tokens';
import {
  MarketingCardTitle,
  MarketingPageContainer,
  MarketingSection,
} from '@/components/marketing/marketing-primitives';
import { SectionHeading } from '@/components/marketing/section-heading';

type SolutionCard = {
  category: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

const solutionCards: SolutionCard[] = [
  {
    category: 'Marketing & Growth',
    title: 'Digital Marketing',
    description:
      'Turn attention into enquiries with strategy, channels, and follow-up systems that grow with your business.',
    href: '/digital-marketing',
    icon: 'TrendingUp',
  },
  {
    category: 'Industry Platforms',
    title: 'MLM Software',
    description:
      'Commission engines, member portals, e-wallets, and admin dashboards built for network marketing operations.',
    href: '/mlm',
    icon: 'Network',
  },
  {
    category: 'Financial Technology',
    title: 'FinTech',
    description:
      'Secure platforms for lending, payments, client portals, and compliance-ready financial workflows.',
    href: '/fintech',
    icon: 'Wallet',
  },
  {
    category: 'Startup & Launch',
    title: 'Startup Support',
    description:
      'From idea validation to launch — planning, registration, branding, product, and growth guidance.',
    href: '/startup',
    icon: 'Rocket',
  },
  {
    category: 'Startup & Launch',
    title: 'Business Discovery',
    description:
      'A guided wizard to clarify your goals, requirements, and the right next step with U&V.',
    href: '/business-discovery',
    icon: 'Search',
  },
];

function SolutionCardLink({ card, delayMs }: { card: SolutionCard; delayMs: number }) {
  return (
    <Reveal delayMs={delayMs} className="h-full">
      <Link
        href={card.href}
        className={cn(uvCardInteractive, 'group flex h-full flex-col uv-focus-ring')}
      >
        <p className={uvEyebrow}>{card.category}</p>
        <div className="mt-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
          <Icon name={card.icon} />
        </div>
        <MarketingCardTitle className="mt-4">{card.title}</MarketingCardTitle>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
          {card.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-uv-brand">
          Explore solution
          <Icon name="ArrowRight" size="sm" />
        </span>
      </Link>
    </Reveal>
  );
}

export function BsSolutionGateway() {
  return (
    <MarketingSection
      id="solutions"
      tone="subtle"
      aria-label="Solution categories"
      className="scroll-mt-20 py-10 sm:py-12"
    >
      <MarketingPageContainer>
        <Reveal>
          <SectionHeading
            eyebrow="Explore solutions"
            title="Find the right path for your business challenge."
            description="Specialised solution hubs for growth, platforms, finance, and launch — each with depth on how U&V helps."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {solutionCards.map((card, index) => (
            <SolutionCardLink key={card.href} card={card} delayMs={index * 40} />
          ))}
        </div>

        <Reveal delayMs={solutionCards.length * 40} className="mt-8 sm:mt-10">
          <p className="text-center text-sm text-uv-foreground-muted sm:text-base">
            Need custom software, ERP, CRM, or industry-specific platforms?{' '}
            <Link
              href="/about#solutions"
              className="font-semibold text-uv-brand underline-offset-4 hover:underline"
            >
              Browse the full service catalog on About U&V
            </Link>
            .
          </p>
        </Reveal>
      </MarketingPageContainer>
    </MarketingSection>
  );
}
