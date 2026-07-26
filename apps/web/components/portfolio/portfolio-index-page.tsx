import { Icon } from '@uandv/ui';

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
  MarketingIconBox,
  MarketingLead,
  MarketingPageContainer,
  MarketingSection,
  MarketingSectionTitle,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  DEMO_PROJECT_LABEL,
  portfolioProcess,
  portfolioTechnologies,
} from '@/lib/portfolio';
import { contactInquiryHref, siteConfig } from '@/lib/site';

import { DemoProjectBadge } from './portfolio-card';
import { PortfolioFilterGrid } from './portfolio-filter-grid';

export function PortfolioIndexPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <DemoProjectBadge />
              <MarketingEyebrow className="mt-5">
                Product demos &amp; solution concepts
              </MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">
                See how U&amp;V solves real business problems
              </MarketingHeroTitle>
              <MarketingLead className="mt-6">
                Each concept shows a business challenge, how U&amp;V would
                approach it, and the outcomes you can expect — so you can judge
                whether we are the right partner for your project.
              </MarketingLead>
              <p className="mt-4 text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
                Every item is a clearly labelled {DEMO_PROJECT_LABEL.toLowerCase()}{' '}
                with mock data — not a claim about a named client or measured
                results.
              </p>
              <MarketingHeroActions>
                <MarketingButtonLink href="#demos" variant="primary">
                  Browse solution concepts
                </MarketingButtonLink>
                <MarketingButtonLink href={contactInquiryHref} variant="outline">
                  Discuss your project
                </MarketingButtonLink>
              </MarketingHeroActions>
            </div>

            <Reveal delayMs={80}>
              <MarketingCard premium className="sm:p-8">
                <p className="text-sm font-medium text-uv-brand">
                  What you can evaluate here
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Whether U&amp;V understands challenges in your industry.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      How we think about solutions — before you commit to a
                      build.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Interactive demos where available — honest placeholders
                      everywhere else.
                    </span>
                  </li>
                </ul>
              </MarketingCard>
            </Reveal>
          </div>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection id="demos" tone="default" aria-label="Portfolio concepts">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Solution concepts"
              title="Business problems. Thoughtful solutions. Clear expected benefits."
              description="Filter by category. Each card explains the challenge, U&V's approach, and the business value behind the concept — then links to the full story or live demo."
            />
          </Reveal>
          <div className="mt-12 sm:mt-16">
            <PortfolioFilterGrid />
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="technology" tone="subtle" aria-label="Technology foundations">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Behind the scenes"
              title="Reliable technology — so you can focus on the business."
              description="These are the kinds of proven tools we use to build demos and production systems that stay fast, secure, and maintainable."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 md:grid-cols-5">
            {portfolioTechnologies.map((tech, index) => (
              <Reveal key={tech.title} delayMs={Math.min(index * 25, 220)}>
                <MarketingCard
                  as="div"
                  className="group flex items-center gap-3 p-4 transition-colors hover:border-uv-brand/40"
                >
                  <MarketingIconBox>
                    <Icon name={tech.icon} />
                  </MarketingIconBox>
                  <p className="font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-foreground sm:text-base">
                    {tech.title}
                  </p>
                </MarketingCard>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="process" tone="default" aria-label="How we deliver projects">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we deliver"
              title="From your first conversation to long-term support."
              description="A clear path with honest checkpoints — so you always know where the project stands and what comes next."
            />
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:grid-cols-7">
            {portfolioProcess.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 30}>
                <li className="h-full">
                  <MarketingCard className="flex h-full flex-col">
                    <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                      {step.title}
                    </MarketingCardTitle>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                      {step.description}
                    </p>
                  </MarketingCard>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        id="consultation"
        tone="subtle"
        className="border-b-0"
        aria-label="Discuss your project"
      >
        <MarketingPageContainer>
          <MarketingCtaPanel className="sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <MarketingEyebrow>Your project</MarketingEyebrow>
                <MarketingSectionTitle className="mt-3">
                  Building something similar? Let&apos;s talk it through.
                </MarketingSectionTitle>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Describe your business challenge in a free consultation. We
                  will share an honest view of scope, approach, and next steps —
                  without invented case studies or pressure to sign.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <MarketingButtonLink href={contactInquiryHref}>
                  Discuss a Similar Project
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
