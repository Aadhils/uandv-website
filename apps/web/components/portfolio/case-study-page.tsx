import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingButtonLink,
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingIconBox,
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
import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { ServiceIllustration } from '@/components/services/service-illustration';
import {
  DEMO_PROJECT_LABEL,
  getValidatedLiveDemoHref,
  type CaseStudy,
} from '@/lib/portfolio';
import { getServiceBySlug } from '@/lib/services';
import { contactInquiryHref, siteConfig } from '@/lib/site';

import { DemoProjectBadge } from './portfolio-card';

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const demoHref = getValidatedLiveDemoHref(study.liveDemoHref);
  const relatedServices = study.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: study.title },
            ]}
          />

          <MarketingStandardHeroGrid>
            <MarketingStandardHeroCopy>
              <DemoProjectBadge />
              <MarketingEyebrow className="mt-5">Case study</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">{study.title}</MarketingHeroTitle>
              <MarketingLead className="mt-4 text-base sm:text-lg">
                {study.businessType} · {study.industry}
              </MarketingLead>
              <MarketingLead className="mt-4">{study.summary}</MarketingLead>
              <MarketingHeroActions className="mt-6">
                {demoHref ? (
                  <MarketingButtonLink href={demoHref}>
                    Live Demo
                  </MarketingButtonLink>
                ) : (
                  <MarketingButtonLink href={contactInquiryHref}>
                    Start Your Project
                  </MarketingButtonLink>
                )}
                <MarketingButtonLink
                  href={demoHref ? contactInquiryHref : siteConfig.whatsapp}
                  variant="outline"
                  {...(demoHref ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {demoHref ? 'Start Your Project' : 'Chat on WhatsApp'}
                </MarketingButtonLink>
              </MarketingHeroActions>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration>
              <ServiceIllustration name={study.illustration} className="rounded-none border-0" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection tone="subtle" density="compact">
        <MarketingPageContainer>
          <p className="mx-auto max-w-3xl text-center text-sm text-uv-foreground-muted sm:text-base">
            This page is a {DEMO_PROJECT_LABEL.toLowerCase()}. It illustrates
            approach and expected business value — not a live client claim.
          </p>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="live-demo" tone="subtle">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Live demo"
              title={
                demoHref
                  ? 'Open the interactive product demo.'
                  : 'Interactive preview placeholder.'
              }
              description={
                demoHref
                  ? 'Launch the working frontend demo with mock data. No live backend or real customer claims.'
                  : 'This is a product demo placeholder — not a claim of a live client deployment. Request a guided walkthrough for a working preview.'
              }
            />
          </Reveal>
          <Reveal delayMs={80}>
            <div className="mt-10 overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background">
              <div className="flex items-center gap-2 border-b border-uv-border bg-uv-navy px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-uv-soft-violet/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-uv-soft-violet/45" />
                <span className="h-2.5 w-2.5 rounded-full bg-uv-soft-violet/25" />
                <p className="ml-3 text-xs font-medium text-uv-soft-violet/80">
                  {demoHref ?? `Product demo · ${study.slug}`}
                </p>
              </div>
              <div className="relative min-h-[280px] bg-gradient-to-br from-uv-navy via-[#3B1C78] to-uv-accent p-8 sm:min-h-[360px] sm:p-12">
                <div className="absolute inset-0 marketing-hero-grid opacity-40" aria-hidden />
                <div className="relative mx-auto flex max-w-xl flex-col items-center justify-center text-center text-white">
                  <DemoProjectBadge className="border-white/20 bg-white/10 text-white" />
                  <h3 className="mt-6 break-words font-[family-name:var(--font-uv-display)] text-2xl font-bold sm:text-3xl">
                    {study.title}
                  </h3>
                  <p className="mt-3 break-words text-sm leading-relaxed text-uv-soft-violet sm:text-base">
                    {demoHref
                      ? demoHref.includes('/demo/hotel-management')
                        ? 'Interactive hotel management demo ready — explore admin, front desk, housekeeping, and guest stay workflows with mock data.'
                        : demoHref.includes('/demo/restaurant-platform')
                        ? 'Interactive restaurant platform ready — explore customer ordering, dine-in QR, POS, kitchen display, delivery, inventory, and admin with mock data.'
                        : demoHref.includes('/demo/travel')
                        ? 'Interactive travel platform ready — explore traveler, agent, and admin workspaces with flights, hotels, packages, checkout, and mock data.'
                        : demoHref.includes('mlm')
                          ? 'Interactive product demo ready — explore admin and member login, genealogy, wallet, KYC, e-pin, and more with mock data.'
                          : demoHref.includes('smart-mobility')
                            ? 'Interactive product demo ready — explore booking, driver, and admin experiences with mock data.'
                            : demoHref.includes('enterprise-suite')
                              ? 'Interactive enterprise suite ready — explore ERP, CRM, HR, inventory, accounting, and travel operations with role-based login.'
                              : 'Interactive product demo ready — explore the working frontend with mock data.'
                      : 'UI placeholder for the live demo environment. Book a consultation to schedule a guided product walkthrough.'}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {demoHref ? (
                      <Link
                        href={demoHref}
                        className={cn(
                          buttonVariants({ size: 'md' }),
                          'justify-center',
                        )}
                      >
                        Open Live Demo
                      </Link>
                    ) : (
                      <a
                        href={contactInquiryHref}
                        className={cn(
                          buttonVariants({ size: 'md' }),
                          'justify-center',
                        )}
                      >
                        Request walkthrough
                      </a>
                    )}
                    <a
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: 'md', variant: 'outline' }),
                        'justify-center border-white/30 bg-transparent text-white hover:bg-white/10',
                      )}
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle">
        <MarketingPageContainer className="grid gap-10 lg:grid-cols-3">
          <Reveal>
            <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
              Client / business type
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              {study.businessType}
            </p>
          </Reveal>
          <Reveal delayMs={60}>
            <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
              Industry
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              {study.industry}
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
              Services delivered
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-uv-foreground-muted sm:text-base">
              {study.services.map((service) => (
                <li key={service} className="flex gap-2">
                  <Icon name="Check" size="sm" className="mt-1 text-uv-brand" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Objective"
              title="What this project concept set out to achieve."
              description={study.objective}
            />
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Challenge"
              title="Business challenge"
              description="The operational friction this concept is designed to address."
            />
          </Reveal>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {study.challenge.map((item, index) => (
              <Reveal key={item.slice(0, 24)} delayMs={index * 50}>
                <li className="border-t border-uv-border pt-5">
                  <p className="text-sm font-medium text-uv-brand">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {item}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Solution"
              title="How U&V would approach it."
              description="A practical delivery direction connecting product, operations, and adoption."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {study.solution.map((item, index) => (
              <Reveal key={item.slice(0, 24)} delayMs={index * 50}>
                <article className="rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6">
                  <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-brand/30">
                    {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {item}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Features"
              title="Capabilities included in this concept."
              description="Building blocks that make the solution usable in day-to-day operations."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {study.features.map((feature, index) => (
              <Reveal key={feature.title} delayMs={index * 40}>
                <article>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name="Check" size="md" />
                  </div>
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Technology stack"
              title="Tools selected for maintainable delivery."
              description="Modern platforms chosen for reliability and long-term ownership."
            />
          </Reveal>
          <Reveal delayMs={80}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {study.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-uv-full border border-uv-border bg-uv-background-subtle px-4 py-2 text-sm font-medium text-uv-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Process"
              title="Development process"
              description="A clear path from discovery to pilot — adapted to the business context."
            />
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {study.process.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 50}>
                <li>
                  <p className="font-[family-name:var(--font-uv-display)] text-4xl font-bold text-uv-brand/30">
                    {index + 1}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Visuals"
              title="Screenshots and visual placeholders"
              description="Illustrative placeholders for key product surfaces in this demo concept."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {study.visuals.map((visual, index) => (
              <Reveal key={visual.label} delayMs={index * 50}>
                <figure className="overflow-hidden rounded-uv-xl border border-uv-border bg-uv-background-subtle">
                  <div className="relative aspect-[4/3]">
                    <ServiceIllustration
                      name={study.illustration}
                      className="absolute inset-0 h-full w-full rounded-none border-0"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-zinc-950/55 to-transparent p-4">
                      <DemoProjectBadge className="bg-white/95 text-zinc-700" />
                    </div>
                  </div>
                  <figcaption className="p-4">
                    <p className="font-medium text-uv-foreground">{visual.label}</p>
                    <p className="mt-1 text-sm text-uv-foreground-muted">
                      {visual.caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Outcomes"
              title="Expected business value"
              description="Qualitative outcomes this concept is designed to unlock — not fabricated metrics."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {study.outcomes.map((outcome, index) => (
              <Reveal key={outcome.title} delayMs={index * 60}>
                <article className="border-t border-uv-border pt-6">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                    {outcome.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {outcome.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        tone="default"
        className={cn(relatedServices.length === 0 && 'border-b-0')}
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Timeline"
              title="Illustrative project timeline"
              description="A concept schedule for planning conversations — actual timelines depend on scope and readiness."
            />
          </Reveal>
          <div className="mt-12 space-y-4">
            {study.timeline.map((item, index) => (
              <Reveal key={item.phase} delayMs={index * 40}>
                <div className="grid gap-3 rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                  <div>
                    <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                      {item.phase}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                      {item.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-uv-brand sm:text-right">
                    {item.duration}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      {relatedServices.length > 0 ? (
        <MarketingSection tone="subtle" className="border-b-0">
          <MarketingPageContainer>
            <Reveal>
              <SectionHeading
                eyebrow="Related services"
                title="Services that support this kind of project."
                description="Explore the delivery capabilities behind this demo concept."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service, index) => (
                <Reveal key={service.slug} delayMs={index * 50}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block rounded-uv-xl border border-uv-border bg-uv-background p-6 transition-colors hover:border-uv-brand/40 uv-focus-ring"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                      <Icon name={service.icon} size="md" />
                    </div>
                    <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-uv-foreground-muted">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-uv-brand">
                      View service
                      <Icon name="ArrowRight" size="sm" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
        </MarketingPageContainer>
        </MarketingSection>
      ) : null}
    </MarketingContentPage>
  );
}
