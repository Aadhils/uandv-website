import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingButtonLink,
  MarketingCard,
  MarketingCardTitle,
  MarketingCtaPanel,
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingLead,
  MarketingPageContainer,
  MarketingSection,
  MarketingSectionTitle,
} from '@/components/marketing/marketing-primitives';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  compensationPlans,
  mlmConsulting,
  mlmFaqs,
  mlmGrowthServices,
  mlmPartnershipTimeline,
  mlmSuccessRoadmap,
  mlmWhyUandv,
  softwareModules,
} from '@/lib/mlm-solutions';
import { contactInquiryHref, siteConfig } from '@/lib/site';

function StoryLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

export function MlmSolutionsPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'MLM', href: '/mlm' },
              { label: 'MLM Software' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <MarketingEyebrow>MLM Business Technology Partner</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">
                Build a reliable, scalable MLM platform — not just buy software
              </MarketingHeroTitle>
              <MarketingLead className="mt-6">
                U&amp;V helps network marketing companies choose sustainable
                compensation plans, design secure architecture, automate
                operations, and grow with a long-term partner who understands
                MLM beyond templates.
              </MarketingLead>
              <p className="mt-4 text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
                Honest consultation. No income guarantees. No fast-money
                promises. Compliance-minded guidance — not legal representation.
              </p>
              <MarketingHeroActions>
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free MLM Platform Consultation
                </MarketingButtonLink>
                <MarketingButtonLink href="/demo/mlm" variant="outline">
                  Explore live demo
                </MarketingButtonLink>
              </MarketingHeroActions>
            </div>

            <Reveal delayMs={80}>
              <MarketingCard premium className="sm:p-8">
                <p className="text-sm font-medium text-uv-brand">
                  What we help you get right
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Compensation plan selection and validation before code is
                      locked in.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Scalable architecture, security, automation, and
                      transparent payouts.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Long-term partnership through launch, optimization, and
                      growth.
                    </span>
                  </li>
                </ul>
                <Link
                  href="/business-solutions"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-uv-brand uv-focus-ring"
                >
                  See full business solutions
                  <Icon name="ArrowRight" size="sm" />
                </Link>
              </MarketingCard>
            </Reveal>
          </div>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection tone="subtle" aria-label="Why U and V for MLM">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Beyond software vendors"
              title="MLM businesses need stability, transparency, and a partner who stays."
              description="We work with founders who want a legally structured, operationally sound platform — not hype, shortcuts, or disposable templates."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2">
            {mlmWhyUandv.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 50}>
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

      <MarketingSection id="consulting" tone="default" aria-label="MLM consulting">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Consult before you build"
              title="Validate the business and compensation plan before you scale software."
              description="Strong platforms start with clear economics, explainable rules, and operational discipline — then technology encodes what already makes sense."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {mlmConsulting.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 30} className="h-full">
                <article className="marketing-card-lift flex h-full min-h-[15rem] flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5 sm:p-6">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={item.icon} size="md" />
                  </div>
                  <MarketingCardTitle className="mt-4 text-base sm:text-lg">
                    {item.title}
                  </MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>How U&amp;V helps</StoryLabel>
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

      <MarketingSection id="compensation-plans" tone="subtle" aria-label="Compensation plans">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Compensation plans"
              title="Choose and implement the plan your economics can sustain."
              description="We help you compare models, document rules clearly, and engineer calculations members and admins can trust — including hybrid and custom designs."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {compensationPlans.map((plan, index) => (
              <Reveal key={plan.title} delayMs={index * 25} className="h-full">
                <article className="marketing-card-lift flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background p-5 transition-colors hover:border-uv-brand/35">
                  <MarketingCardTitle className="text-base sm:text-lg">
                    {plan.title}
                  </MarketingCardTitle>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    <span className="font-medium text-uv-foreground">
                      Often suited when:{' '}
                    </span>
                    {plan.bestFor}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="Custom compensation design">
        <MarketingPageContainer>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <MarketingEyebrow>Custom compensation design</MarketingEyebrow>
              <MarketingSectionTitle className="mt-4">
                Plans engineered for clarity, auditability, and scale
              </MarketingSectionTitle>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="space-y-5 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                <p>
                  When your products, ranks, or payout policies do not fit a
                  standard template, U&amp;V designs bespoke systems — documented,
                  tested, and operable.
                </p>
                <p>
                  We validate sample genealogies, model edge cases, and build
                  admin controls so your plan stays explainable as the network
                  grows.
                </p>
                <p>
                  Custom means precise and maintainable — not chaotic, opaque, or
                  impossible to support.
                </p>
              </div>
            </Reveal>
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="modules" tone="subtle" aria-label="Software modules">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Platform modules"
              title="Secure, scalable building blocks for network operations."
              description="Compose member experience, payout integrity, compliance workflows, and leadership visibility — with architecture that can grow with your organisation."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {softwareModules.map((module, index) => (
              <Reveal key={module.title} delayMs={index * 20} className="h-full">
                <article className="marketing-card-lift flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background p-5 sm:p-6">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={module.icon} size="md" />
                  </div>
                  <MarketingCardTitle className="mt-4 text-base sm:text-lg">
                    {module.title}
                  </MarketingCardTitle>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {module.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="Growth services">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Connected growth services"
              title="Technology and business growth under one accountable partner."
              description="Pair the MLM platform with branding, apps, marketing, and operations systems — coordinated instead of fragmented."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-3">
            {mlmGrowthServices.map((service, index) => (
              <Reveal key={service.title} delayMs={index * 25} className="h-full">
                <Link
                  href={service.href}
                  className="marketing-card-lift group flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5 sm:p-6 transition-colors hover:border-uv-brand/40 uv-focus-ring"
                >
                  <Icon
                    name={service.icon}
                    className="text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <MarketingCardTitle className="mt-4 text-base sm:text-lg">
                    {service.title}
                  </MarketingCardTitle>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-uv-brand">
                    Learn more
                    <Icon name="ArrowRight" size="sm" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="Partnership timeline">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Long-term partnership"
              title="A clear path from consultation to sustainable scale."
              description="Launch is a milestone — not a handoff. We stay with you through stabilization, optimization, and expansion when the business is ready."
            />
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:grid-cols-7">
            {mlmPartnershipTimeline.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 30} className="h-full">
                <li className="flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background p-4 sm:p-5">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                    {step.title}
                  </MarketingCardTitle>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="faq" tone="default" className="marketing-faq" aria-label="FAQ">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Straight answers for founders evaluating MLM platforms."
              description="Compensation design, compliance readiness, security, migrations, and what happens after launch."
            />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-uv-border border-y border-uv-border sm:mt-16">
            {mlmFaqs.map((faq, index) => (
              <Reveal key={faq.question} delayMs={Math.min(index * 20, 200)}>
                <details className="group py-5">
                  <summary className="flex items-start justify-between gap-4 text-left">
                    <span className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                      {faq.question}
                    </span>
                    <Icon
                      name="ChevronDown"
                      size="md"
                      className="faq-chevron mt-1 shrink-0 text-uv-foreground-muted transition-transform duration-200"
                    />
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="success-roadmap" tone="subtle" aria-label="Partnership journey">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Partnership journey"
              title="From plan decisions to a platform you can operate and scale."
              description="Ten stages we commonly guide — adapted to your model, markets, and readiness. No guaranteed outcomes; disciplined execution."
            />
          </Reveal>

          <ol className="relative mt-12 space-y-0 sm:mt-16 lg:hidden">
            <div
              className="absolute bottom-2 left-[15px] top-2 w-px bg-uv-border"
              aria-hidden
            />
            {mlmSuccessRoadmap.map((stage, index) => (
              <li key={stage.step} className="relative flex gap-5 pb-10 last:pb-0">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-uv-brand/40 bg-uv-background text-xs font-semibold text-uv-brand">
                  {stage.step}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <MarketingCardTitle className="text-lg">
                    {stage.title}
                  </MarketingCardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {stage.description}
                  </p>
                  {index < mlmSuccessRoadmap.length - 1 ? (
                    <p className="mt-4 text-uv-brand/50" aria-hidden>
                      ↓
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 hidden sm:mt-16 lg:block">
            <ol className="grid grid-cols-5 gap-x-4 gap-y-10">
              {mlmSuccessRoadmap.map((stage, index) => {
                const isRowEnd = (index + 1) % 5 === 0;
                const isLast = index === mlmSuccessRoadmap.length - 1;
                return (
                  <li key={stage.step} className="relative">
                    {!isRowEnd && !isLast ? (
                      <div
                        className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-5 z-0 h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-uv-brand/35 to-uv-brand/10"
                        aria-hidden
                      />
                    ) : null}
                    <article className="relative z-10 h-full rounded-uv-xl border border-uv-border bg-uv-background p-5">
                      <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-brand/35">
                        {stage.step}
                      </p>
                      <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                        {stage.title}
                      </MarketingCardTitle>
                      <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {stage.description}
                      </p>
                    </article>
                    {index === 4 ? (
                      <p
                        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-uv-brand/45"
                        aria-hidden
                      >
                        ↓
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>

          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center font-[family-name:var(--font-uv-display)] text-xl font-semibold leading-snug tracking-tight text-uv-foreground sm:mt-16 sm:text-2xl">
              We do not disappear after deployment.
              <br className="hidden sm:block" /> We grow with your business —
              responsibly.
            </p>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="consultation" tone="default" className="border-b-0" aria-label="Free consultation">
        <MarketingPageContainer>
          <MarketingCtaPanel className="sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <MarketingEyebrow>Free consultation</MarketingEyebrow>
                <MarketingSectionTitle className="mt-3">
                  Let&apos;s discuss the right MLM platform for your business.
                </MarketingSectionTitle>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share your compensation draft, markets, and operational goals.
                  We will recommend a practical path across consulting,
                  architecture, and build — with honest scope, no income
                  promises, and no fabricated case studies.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free MLM Platform Consultation
                </MarketingButtonLink>
                <MarketingButtonLink href="/demo/mlm" variant="outline">
                  Explore live demo
                </MarketingButtonLink>
                <MarketingButtonLink
                  href={siteConfig.whatsapp}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </MarketingButtonLink>
              </div>
            </div>
          </MarketingCtaPanel>
        </MarketingPageContainer>
      </MarketingSection>
    </MarketingContentPage>
  );
}
