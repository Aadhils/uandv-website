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
  whyClientsStay,
  whyCorePrinciples,
  whyIndustries,
  whyTechnologies,
  whyWorkflow,
} from '@/lib/why-uandv';
import { contactInquiryHref, siteConfig } from '@/lib/site';

export function WhyUandvPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Why U&V' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <MarketingEyebrow>Your Business Growth Partner</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">
                Why business owners trust U&amp;V with their growth
              </MarketingHeroTitle>
              <MarketingLead className="mt-6">
                Choosing a partner is a business decision — not a software
                shopping exercise. U&amp;V combines honest advice, coordinated
                delivery, and long-term support so you can grow with confidence,
                not confusion.
              </MarketingLead>
              <p className="mt-4 text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
                No pressure tactics. No inflated promises.
                Response within 24 business hours.
              </p>
              <MarketingHeroActions>
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Consultation
                </MarketingButtonLink>
                <MarketingButtonLink
                  href={siteConfig.whatsapp}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </MarketingButtonLink>
              </MarketingHeroActions>
            </div>

            <Reveal delayMs={80}>
              <MarketingCard premium className="sm:p-8">
                <p className="text-sm font-medium text-uv-brand">
                  What sets U&amp;V apart
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      We advise on what your business needs — not what is easiest
                      to sell.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      One accountable partner from planning through launch and
                      beyond.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      We stay when the hard part begins — adoption, improvement,
                      and growth.
                    </span>
                  </li>
                </ul>
              </MarketingCard>
            </Reveal>
          </div>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection
        id="principles"
        tone="subtle"
        aria-label="Core principles"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we earn your trust"
              title="Principles we hold ourselves to — on every engagement."
              description="These are not slogans on a wall. They are how we show up when your revenue, reputation, and team are on the line."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {whyCorePrinciples.map((principle, index) => (
              <Reveal key={principle.title} delayMs={index * 40}>
                <article className="group h-full rounded-uv-2xl border border-uv-border bg-uv-background p-6 transition-colors hover:border-uv-brand/40">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={principle.icon} />
                  </div>
                  <MarketingCardTitle className="mt-5">
                    {principle.title}
                  </MarketingCardTitle>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        id="industries"
        tone="default"
        aria-label="Industries we serve"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Businesses we understand"
              title="Experience across industries where operations matter."
              description="Whether you run a clinic, a network, a store, or a growing team — we learn how your business works before we recommend anything."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {whyIndustries.map((industry, index) => (
              <Reveal key={industry.title} delayMs={Math.min(index * 25, 250)}>
                <div className="group flex h-full flex-col items-center rounded-uv-xl border border-uv-border bg-uv-background-subtle px-4 py-6 text-center transition-colors hover:border-uv-brand/40 hover:bg-uv-background">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={industry.icon} size="lg" />
                  </div>
                  <p className="mt-4 font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-foreground sm:text-base">
                    {industry.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        id="technology"
        tone="subtle"
        aria-label="Technology foundations"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Behind the scenes"
              title="Reliable foundations you do not have to worry about."
              description="You should not need to choose between tools — that is our job. We use proven, maintainable technology so your systems stay fast, secure, and ready to grow."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {whyTechnologies.map((tech, index) => (
              <Reveal key={tech.title} delayMs={Math.min(index * 25, 250)}>
                <div className="group flex h-full items-center gap-3 rounded-uv-xl border border-uv-border bg-uv-background px-4 py-4 transition-colors hover:border-uv-brand/40">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={tech.icon} />
                  </div>
                  <p className="font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-foreground sm:text-base">
                    {tech.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        id="workflow"
        tone="default"
        aria-label="How we work with you"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we work with you"
              title="A clear path — with room for honest conversation."
              description="You always know what stage we are in, what happens next, and where your input matters. No black boxes. No disappearing acts."
            />
          </Reveal>

          <ol className="relative mt-12 space-y-0 sm:mt-16 md:hidden">
            <div
              className="absolute bottom-2 left-[15px] top-2 w-px bg-uv-border"
              aria-hidden
            />
            {whyWorkflow.map((step, index) => (
              <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-uv-brand/40 bg-uv-background text-xs font-semibold text-uv-brand">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <MarketingCardTitle className="text-lg">
                    {step.title}
                  </MarketingCardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <ol className="mt-12 hidden gap-4 sm:mt-16 md:grid md:grid-cols-4">
            {whyWorkflow.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 35}>
                <li className="relative h-full">
                  {index % 4 !== 3 && index !== whyWorkflow.length - 1 ? (
                    <div
                      className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-6 z-0 hidden h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-uv-brand/35 to-uv-brand/10 lg:block"
                      aria-hidden
                    />
                  ) : null}
                  <article className="relative z-10 h-full rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5">
                    <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-brand/35">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                      {step.title}
                    </MarketingCardTitle>
                    <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                      {step.description}
                    </p>
                  </article>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        id="stay"
        tone="subtle"
        aria-label="Why clients stay with U and V"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Why clients stay"
              title="The relationship does not end at launch."
              description="The businesses that thrive are the ones with a partner who keeps showing up — to fix friction, improve results, and plan the next chapter."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-2">
            {whyClientsStay.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 50}>
                <article className="h-full rounded-uv-2xl border border-uv-border bg-uv-background p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                      <Icon name="Check" />
                    </div>
                    <div>
                      <MarketingCardTitle>
                        {item.title}
                      </MarketingCardTitle>
                      <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center font-[family-name:var(--font-uv-display)] text-xl font-semibold leading-snug tracking-tight text-uv-foreground sm:mt-16 sm:text-2xl">
              Anyone can promise a project.
              <br className="hidden sm:block" /> We show up for the business behind it.
            </p>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="start" tone="default" className="border-b-0">
        <MarketingPageContainer>
          <MarketingCtaPanel className="sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <MarketingEyebrow>Start a conversation</MarketingEyebrow>
                <MarketingSectionTitle className="mt-3">
                  Ready to see if U&amp;V is the right partner for you?
                </MarketingSectionTitle>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Tell us where you are today and what you are trying to achieve.
                  We will give you an honest view of the next step — even if that
                  means waiting, starting smaller, or pointing you elsewhere.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Consultation
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
