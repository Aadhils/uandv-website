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
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingIconBox,
  MarketingLead,
  MarketingPageContainer,
  MarketingSection,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  MarketingStandardHeroCopy,
  MarketingStandardHeroGrid,
  MarketingStandardHeroIllustration,
  marketingStandardHeroInnerClass,
} from '@/components/marketing/marketing-standard-hero';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { ServiceIllustration } from '@/components/services/service-illustration';
import {
  DEMO_PROJECT_LABEL,
  portfolioProcess,
  portfolioTechnologies,
} from '@/lib/portfolio';
import { contactInquiryHref } from '@/lib/site';

import { DemoProjectBadge } from './portfolio-card';
import { PortfolioFilterGrid } from './portfolio-filter-grid';

export function PortfolioIndexPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio' },
            ]}
          />

          <MarketingStandardHeroGrid>
            <MarketingStandardHeroCopy>
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
              <MarketingLead className="mt-4 text-base sm:text-lg">
                Every item is a clearly labelled {DEMO_PROJECT_LABEL.toLowerCase()}{' '}
                with mock data — not a claim about a named client or measured
                results.
              </MarketingLead>
              <MarketingHeroActions>
                <MarketingButtonLink href="#demos" variant="primary">
                  Browse solution concepts
                </MarketingButtonLink>
                <MarketingButtonLink href={contactInquiryHref} variant="outline">
                  Discuss your project
                </MarketingButtonLink>
              </MarketingHeroActions>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration>
              <ServiceIllustration name="web" className="rounded-none border-0" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
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

      <MarketingSection id="process" tone="default" className="border-b-0" aria-label="How we deliver projects">
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
    </MarketingContentPage>
  );
}
