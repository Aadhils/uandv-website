import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { featuredIndustries } from '@/lib/homepage-featured';

import { MarketingPageContainer, MarketingSection } from './marketing-primitives';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function FeaturedIndustries() {
  return (
    <MarketingSection id="industries" tone="subtle" className="marketing-section-ambient">
      <MarketingPageContainer>
        <Reveal variant="up-blur">
          <SectionHeading
            eyebrow="Business solutions"
            title="Industry-focused support for real business challenges."
            description="Explore how U&V helps specific industries with software, workflows, and growth — then dive deeper on each solutions page."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {featuredIndustries.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 60} variant="scale" className="h-full">
              <Link
                href={item.href}
                className="group marketing-glass marketing-card-lift marketing-card-premium marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl p-5 uv-focus-ring"
              >
                <span className="marketing-icon-glow inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                  <Icon name={item.icon} size="md" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-uv-brand transition-colors group-hover:text-uv-brand-hover">
                  {item.href === '/fintech' ? 'Explore FinTech' : 'Explore solution'}
                  <Icon name="ArrowRight" size="sm" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={100}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/business-solutions"
              className={cn(buttonVariants({ size: 'md' }), 'marketing-btn-glow')}
            >
              View business solutions
            </Link>
            <Link
              href="/digital-marketing"
              className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}
            >
              Discover digital marketing
            </Link>
          </div>
        </Reveal>
      </MarketingPageContainer>
    </MarketingSection>
  );
}
