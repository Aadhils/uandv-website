import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { ServiceIllustration } from '@/components/services/service-illustration';
import {
  MarketingBadge,
  MarketingCardTitle,
} from '@/components/marketing/marketing-primitives';
import {
  DEMO_PROJECT_LABEL,
  getPortfolioCardStory,
  getValidatedLiveDemoHref,
  type CaseStudy,
} from '@/lib/portfolio';
import { contactInquiryHref } from '@/lib/site';

function CardStoryLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

export function DemoProjectBadge({ className }: { className?: string }) {
  return (
    <MarketingBadge className={className}>{DEMO_PROJECT_LABEL}</MarketingBadge>
  );
}

/** Neutral image placeholder used across demo cards */
export function DemoImagePlaceholder({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border-b border-uv-border bg-uv-background-muted',
        className,
      )}
    >
      <ServiceIllustration
        name={study.illustration}
        className="rounded-none border-0 transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-uv-navy/55 to-transparent p-3">
        <p className="text-xs font-medium text-white/90">Concept preview</p>
      </div>
      <div className="absolute left-3 top-3">
        <DemoProjectBadge className="bg-uv-background/95 backdrop-blur-sm" />
      </div>
    </div>
  );
}

function PortfolioCardActions({ study }: { study: CaseStudy }) {
  const demoHref = getValidatedLiveDemoHref(study.liveDemoHref);

  return (
    <div className="mt-auto flex flex-col gap-2 border-t border-uv-border/80 pt-5">
      <div
        className={cn(
          'flex flex-col gap-2',
          demoHref ? 'sm:flex-row' : 'sm:flex-row sm:justify-start',
        )}
      >
        {demoHref ? (
          <Link
            href={demoHref}
            className={cn(
              buttonVariants({ size: 'sm' }),
              'justify-center sm:flex-1',
            )}
          >
            Explore live demo
          </Link>
        ) : null}
        <Link
          href={`/portfolio/${study.slug}`}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'justify-center',
            demoHref ? 'sm:flex-1' : 'w-full sm:w-auto',
          )}
        >
          View full story
          <Icon name="ArrowRight" size="sm" />
        </Link>
      </div>
      <Link
        href={contactInquiryHref}
        className="text-center text-sm font-medium text-uv-foreground-muted transition-colors hover:text-uv-brand uv-focus-ring sm:text-left"
      >
        Discuss a similar project with U&amp;V
      </Link>
    </div>
  );
}

export function PortfolioCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  const story = getPortfolioCardStory(study);

  return (
    <article
      className={cn(
        'group marketing-card-lift flex h-full min-h-[28rem] min-w-0 flex-col overflow-hidden rounded-uv-xl border border-uv-border bg-uv-background transition-colors hover:border-uv-brand/40',
        className,
      )}
    >
      <DemoImagePlaceholder study={study} />

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
          {study.industry}
        </p>
        <MarketingCardTitle className="mt-2">{study.title}</MarketingCardTitle>

        <div className="mt-4 flex flex-1 flex-col gap-3">
          <div>
            <CardStoryLabel>Business challenge</CardStoryLabel>
            <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              {story.challenge}
            </p>
          </div>
          <div>
            <CardStoryLabel>U&amp;V solution</CardStoryLabel>
            <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              {story.solution}
            </p>
          </div>
          <div>
            <CardStoryLabel>Expected business benefit</CardStoryLabel>
            <p className="mt-1.5 text-sm font-medium text-uv-foreground sm:text-base">
              {story.outcomeTitle}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              {story.outcomeDescription}
            </p>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {study.technologies.slice(0, 3).map((tech) => (
            <li
              key={tech}
              className="rounded-uv-full border border-uv-border bg-uv-background-subtle px-2.5 py-1 text-xs text-uv-foreground-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <PortfolioCardActions study={study} />
      </div>
    </article>
  );
}

export function FeaturedProjectCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  const demoHref = getValidatedLiveDemoHref(study.liveDemoHref);
  const story = getPortfolioCardStory(study);

  return (
    <article
      className={cn(
        'group marketing-card-lift min-w-0 overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background transition-colors hover:border-uv-brand/40',
        className,
      )}
    >
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <DemoImagePlaceholder
          study={study}
          className="min-h-[200px] border-b lg:border-b-0 lg:border-r"
        />
        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
          <DemoProjectBadge />
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
            {study.category} · {study.industry}
          </p>
          <MarketingCardTitle className="mt-3 text-2xl sm:text-3xl">
            {study.title}
          </MarketingCardTitle>

          <div className="mt-4 space-y-3">
            <div>
              <CardStoryLabel>Business challenge</CardStoryLabel>
              <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                {story.challenge}
              </p>
            </div>
            <div>
              <CardStoryLabel>U&amp;V solution</CardStoryLabel>
              <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                {story.solution}
              </p>
            </div>
            <div>
              <CardStoryLabel>Expected business benefit</CardStoryLabel>
              <p className="mt-1.5 text-sm font-medium text-uv-foreground">
                {story.outcomeTitle}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-uv-foreground-muted">
                {story.outcomeDescription}
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {study.technologies.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-uv-full border border-uv-border bg-uv-background-subtle px-3 py-1 text-xs text-uv-foreground-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div
            className={cn(
              'mt-8 flex flex-col gap-3',
              demoHref ? 'sm:flex-row' : 'sm:flex-row sm:justify-start',
            )}
          >
            {demoHref ? (
              <Link
                href={demoHref}
                className={cn(buttonVariants({ size: 'md' }), 'justify-center')}
              >
                Explore live demo
              </Link>
            ) : null}
            <Link
              href={`/portfolio/${study.slug}`}
              className={cn(
                buttonVariants({ size: 'md', variant: 'outline' }),
                'justify-center',
                demoHref ? undefined : 'w-full sm:w-auto',
              )}
            >
              View full story
            </Link>
            <Link
              href={contactInquiryHref}
              className={cn(
                buttonVariants({ size: 'md', variant: 'ghost' }),
                'justify-center text-uv-brand',
              )}
            >
              Discuss a similar project
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
