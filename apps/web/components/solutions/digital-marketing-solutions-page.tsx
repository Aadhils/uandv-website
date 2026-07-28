import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvCardInteractive, uvCardInteractiveSolid } from '@/components/marketing/marketing-design-tokens';
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
import {
  MarketingStandardHeroCopy,
  MarketingStandardHeroGrid,
  MarketingStandardHeroIllustration,
  marketingStandardHeroInnerClass,
} from '@/components/marketing/marketing-standard-hero';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { ServiceIllustration } from '@/components/services/service-illustration';
import {
  digitalMarketingAudiences,
  digitalMarketingIntegrations,
  digitalMarketingProcess,
  digitalMarketingReporting,
  digitalMarketingServices,
  digitalMarketingWhy,
} from '@/lib/digital-marketing';
import { contactInquiryHref } from '@/lib/site';

function StoryLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

export function DigitalMarketingSolutionsPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Digital Marketing', href: '/digital-marketing' },
              { label: 'Digital Marketing' },
            ]}
          />

          <MarketingStandardHeroGrid>
            <MarketingStandardHeroCopy>
              <MarketingEyebrow>Business growth through digital marketing</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">
                Turn attention into customers — not just ad impressions
              </MarketingHeroTitle>
              <MarketingLead className="mt-6">
                If you need more enquiries, repeat customers, and steady growth,
                U&amp;V helps you build marketing that supports your whole
                business — strategy, channels, follow-up, and improvement over
                time.
              </MarketingLead>
              <MarketingLead className="mt-4 text-base sm:text-lg">
                Honest consultation. Sustainable systems. No guaranteed-results
                promises or inflated statistics.
              </MarketingLead>
              <MarketingHeroActions>
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Growth Consultation
                </MarketingButtonLink>
                <MarketingButtonLink
                  href="/services/digital-marketing"
                  variant="outline"
                >
                  View service details
                </MarketingButtonLink>
              </MarketingHeroActions>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration>
              <ServiceIllustration name="marketing" className="rounded-none border-0" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection tone="subtle" aria-label="Why digital marketing for growth">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="The real problem"
              title="More visibility does not always mean more customers."
              description="Most owners do not need another agency selling ads. They need clarity on who to reach, how to earn trust, and how to turn interest into enquiries — sustainably."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2">
            {digitalMarketingWhy.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 45}>
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

      <MarketingSection id="services-included" tone="default" aria-label="Growth services">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we help you grow"
              title="Every service starts with a business problem — and ends with an outcome."
              description="Choose the areas closest to your challenge. We coordinate delivery so channels, content, and follow-up work together — not in silos."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {digitalMarketingServices.map((service, index) => (
              <Reveal
                key={service.title}
                delayMs={Math.min(index * 30, 240)}
                className="h-full"
              >
                <article className={cn(uvCardInteractive, 'flex h-full min-h-[17rem] flex-col')}>
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={service.icon} />
                  </div>
                  <MarketingCardTitle className="mt-4">
                    {service.title}
                  </MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {service.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>Expected outcome</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {service.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="Growth process">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="A clear path from first conversation to sustainable growth."
              description="You always know what stage we are in, what happens next, and how each step helps attract and convert the right customers."
            />
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
            {digitalMarketingProcess.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 35} className="h-full">
                <li className="flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border bg-uv-background p-5 sm:p-6">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                    {step.title}
                  </MarketingCardTitle>
                  <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="Who this is for">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Who this is for"
              title="Built for owners who want customers — not marketing busywork."
              description="Whether you are launching demand for the first time or fixing a funnel that leaks enquiries, we match the plan to your stage and capacity."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
            {digitalMarketingAudiences.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40} className="h-full">
                <article className={cn(uvCardInteractive, 'flex h-full flex-col')}>
                  <MarketingCardTitle>{item.title}</MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>How we help</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="Reporting and improvement">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Honest measurement"
              title="See what is working — without hype or false promises."
              description="We focus on clear setup, understandable reporting, and steady improvement. Results depend on your market, offer, and consistency — we will tell you that upfront."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-3">
            {digitalMarketingReporting.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40} className="h-full">
                <article className={cn(uvCardInteractiveSolid, 'flex h-full flex-col')}>
                  <MarketingCardTitle>{item.title}</MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>Expected outcome</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" className="border-b-0" aria-label="Connected growth systems">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="One growth partner"
              title="Marketing works harder when it connects to your business systems."
              description="U&amp;V can link demand generation to your website, CRM, automation, and consulting — so growth is operational, not cosmetic."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
            {digitalMarketingIntegrations.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40} className="h-full">
                <Link
                  href={item.href}
                  className={cn(uvCardInteractive, 'group flex h-full flex-col uv-focus-ring')}
                >
                  <MarketingCardTitle>{item.title}</MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>Expected outcome</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-uv-brand">
                    Learn more
                    <Icon name="ArrowRight" size="sm" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>
    </MarketingContentPage>
  );
}
