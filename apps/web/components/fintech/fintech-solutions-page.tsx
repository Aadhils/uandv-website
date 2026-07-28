import type { ReactNode } from 'react';

import { Icon, cn } from '@uandv/ui';

import { uvCardInteractive } from '@/components/marketing/marketing-design-tokens';

import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingButtonLink,
  MarketingCardTitle,
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingLead,
  MarketingPageContainer,
  MarketingSection,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import {
  MarketingStandardHeroCopy,
  MarketingStandardHeroGrid,
  MarketingStandardHeroIllustration,
  marketingStandardHeroInnerClass,
} from '@/components/marketing/marketing-standard-hero';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  fintechAudiences,
  fintechCapabilities,
  fintechCompliance,
  fintechPositioning,
  fintechProcess,
  fintechSolutions,
  fintechWhyUandv,
} from '@/lib/fintech';
import { contactInquiryHref } from '@/lib/site';

function StoryLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

function FintechDashboardMockup() {
  return (
    <div
      className="marketing-glass marketing-gradient-border relative overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background-subtle p-5 sm:p-6"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgb(124_58_237_/_0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(124_58_237_/_0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="h-2.5 w-24 rounded-full bg-uv-brand/30" />
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-uv-brand/40" />
            <span className="h-2 w-2 rounded-full bg-uv-brand/25" />
            <span className="h-2 w-2 rounded-full bg-uv-brand/15" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Activity', 'Clients', 'Risk'].map((label) => (
            <div
              key={label}
              className="rounded-uv-lg border border-uv-border/80 bg-uv-background/80 p-3"
            >
              <p className="text-[10px] font-medium uppercase tracking-wide text-uv-brand">
                {label}
              </p>
              <div className="mt-2 h-8 rounded bg-gradient-to-t from-uv-brand/10 to-transparent" />
            </div>
          ))}
        </div>
        <div className="rounded-uv-lg border border-uv-border/80 bg-uv-background/80 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-uv-foreground-muted">
            Platform modules
          </p>
          <div className="mt-3 space-y-2">
            {['CRM', 'Portal', 'API layer'].map((row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-uv-brand/60" />
                <span className="h-2 flex-1 max-w-[70%] rounded-full bg-uv-brand/15" />
                <span className="text-[10px] text-uv-foreground-muted">{row}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-[10px] text-uv-foreground-muted">
          Abstract interface preview — not live market data
        </p>
      </div>
    </div>
  );
}

export function FintechSolutionsPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'FinTech' },
            ]}
          />

          <MarketingStandardHeroGrid>
            <MarketingStandardHeroCopy>
              <MarketingEyebrow>{fintechPositioning.eyebrow}</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">
                {fintechPositioning.headline}
              </MarketingHeroTitle>
              <MarketingLead className="mt-6">
                {fintechPositioning.subheadline}
              </MarketingLead>
              <MarketingLead className="mt-4 text-base sm:text-lg">
                {fintechPositioning.heroSummary}
              </MarketingLead>
              <MarketingHeroActions>
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free FinTech Platform Consultation
                </MarketingButtonLink>
                <MarketingButtonLink href="#solutions" variant="outline">
                  Explore what we build
                </MarketingButtonLink>
              </MarketingHeroActions>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration>
              <FintechDashboardMockup />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection tone="subtle" density="compact">
        <MarketingPageContainer>
          <p className="mx-auto max-w-3xl text-center text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
            {fintechPositioning.trustLine}
          </p>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="What we build">
        <MarketingPageContainer>
          <Reveal variant="up-blur">
            <SectionHeading
              eyebrow="What we build"
              title="Software, platforms, and automation for financial businesses."
              description="U&V engineers the technology behind professional financial operations — custom applications, CRM, client portals, dashboards, mobile apps, and API integrations."
            />
          </Reveal>
          <ul className="mt-12 flex flex-wrap gap-3 sm:mt-16">
            {fintechCapabilities.map((item, index) => (
              <Reveal key={item} delayMs={index * 40} variant="scale">
                <li className="marketing-glass rounded-uv-lg border border-uv-border/80 px-4 py-2.5 text-sm font-medium text-uv-foreground">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="Who we build for">
        <MarketingPageContainer>
          <Reveal variant="up-blur">
            <SectionHeading
              eyebrow="Who we build for"
              title="Financial businesses that need reliable technology — not trading advice."
              description="We partner with owners and teams who need professional software to run client operations, internal workflows, and digital products."
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {fintechAudiences.map((audience, index) => (
              <Reveal key={audience} delayMs={index * 35} variant="up">
                <li className="marketing-glass marketing-card-premium flex gap-3 rounded-uv-xl border border-uv-border p-5">
                  <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" size="sm" />
                  <span className="text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {audience}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="solutions" tone="subtle" aria-label="FinTech solutions">
        <MarketingPageContainer>
          <Reveal variant="up-blur">
            <SectionHeading
              eyebrow="Platform capabilities"
              title="Every build starts with your business problem — and ends with dependable software."
              description="Choose the modules you need, or engage U&V for end-to-end product development across web, mobile, CRM, and data layers."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {fintechSolutions.map((solution, index) => (
              <Reveal
                key={solution.title}
                delayMs={Math.min(index * 30, 240)}
                className="h-full"
              >
                <article className={cn(uvCardInteractive, 'flex h-full min-h-[17rem] flex-col')}>
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={solution.icon} />
                  </div>
                  <MarketingCardTitle className="mt-4 text-base sm:text-lg">
                    {solution.title}
                  </MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {solution.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>How U&V helps</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {solution.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="Delivery process">
        <MarketingPageContainer>
          <Reveal variant="up-blur">
            <SectionHeading
              eyebrow="How we work"
              title="From requirements to production-ready FinTech software."
              description="A clear engineering path for CRM, portals, dashboards, automation, mobile apps, and integrations."
            />
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {fintechProcess.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 50} variant="up" className="h-full">
                <li className="marketing-glass flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border p-5 sm:p-6">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                    {step.title}
                  </MarketingCardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="compliance" tone="subtle" aria-label="What U&V does and does not do">
        <MarketingPageContainer>
          <Reveal variant="up-blur">
            <div className="overflow-hidden rounded-uv-2xl border border-uv-brand/25 bg-gradient-to-br from-uv-brand/10 via-uv-background to-uv-background-subtle p-6 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-uv-brand">
                Clear boundaries
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-2xl font-semibold text-uv-foreground sm:text-3xl">
                U&V is a financial technology development company.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                {fintechCompliance.statement}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {fintechCompliance.exclusions.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-uv-foreground-muted sm:text-base">
                    <Icon name="CircleAlert" className="mt-0.5 shrink-0 text-uv-brand" size="sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" className="border-b-0" aria-label="Why U&V">
        <MarketingPageContainer>
          <Reveal variant="up-blur">
            <SectionHeading
              eyebrow="Why U&V"
              title="Engineering partners who understand financial software."
              description="Secure, maintainable technology with clear boundaries — software delivery without trading or investment services from U&V."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2">
            {fintechWhyUandv.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 45} variant="up">
                <article className="border-t border-uv-border pt-6">
                  <p className="text-sm font-medium text-uv-brand">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MarketingCardTitle className="mt-3">
                    {item.title}
                  </MarketingCardTitle>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>
    </MarketingContentPage>
  );
}
