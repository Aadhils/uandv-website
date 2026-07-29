'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon, buttonVariants, cn } from '@uandv/ui';

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

import {
  getPortfolioAccentForStudy,
  portfolioAccentStyle,
} from './portfolio-concept-accents';
import { PortfolioConceptStory } from './portfolio-concept-story';

function CardStoryLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

export function DemoProjectBadge({ className }: { className?: string }) {
  return (
    <MarketingBadge className={cn('portfolio-concept-demo-badge', className)}>
      {DEMO_PROJECT_LABEL}
    </MarketingBadge>
  );
}

/** Concept banner — story micro-scene within existing card image area */
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
        'portfolio-concept-banner relative z-[3] aspect-[4/3] w-full shrink-0 overflow-hidden border-b border-uv-border/70 bg-uv-background-muted',
        className,
      )}
    >
      <div className="portfolio-concept-banner-visual absolute inset-0 z-0 overflow-hidden">
        <PortfolioConceptStory
          study={study}
          className="!aspect-auto h-full min-h-0"
        />
        <span className="portfolio-concept-banner-sweep" aria-hidden />
      </div>
    </div>
  );
}

function PortfolioCardActions({ study }: { study: CaseStudy }) {
  const demoHref = getValidatedLiveDemoHref(study.liveDemoHref);

  return (
    <div className="mt-auto flex shrink-0 flex-col gap-2 border-t border-uv-border/70 pt-5">
      {/* min-h-11 keeps 1-button and 2-button rows the same height on desktop */}
      <div className="flex min-h-11 flex-col gap-2 sm:flex-row sm:items-stretch">
        {demoHref ? (
          <Link
            href={demoHref}
            className={cn(
              buttonVariants({ size: 'sm' }),
              'min-h-11 w-full justify-center sm:flex-1',
            )}
          >
            Explore live demo
          </Link>
        ) : null}
        <Link
          href={`/portfolio/${study.slug}`}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'portfolio-concept-cta min-h-11 w-full justify-center',
            demoHref ? 'sm:flex-1' : 'sm:min-h-11',
          )}
        >
          View full story
          <Icon
            name="ArrowRight"
            size="sm"
            className="portfolio-concept-card-arrow"
          />
        </Link>
      </div>
      <Link
        href={contactInquiryHref}
        className="inline-flex min-h-11 items-center justify-center text-center text-sm font-medium text-uv-foreground-muted transition-colors hover:text-uv-brand uv-focus-ring sm:justify-start sm:text-left"
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
  const accent = getPortfolioAccentForStudy(study);
  const techKeys = study.technologies ?? [];

  return (
    <article
      className={cn(
        'portfolio-concept-card-shell group min-w-0 md:h-full',
        className,
      )}
      style={portfolioAccentStyle(accent)}
      data-concept-slug={study.slug}
    >
      <span className="portfolio-concept-card-depth" aria-hidden />
      <div className="portfolio-concept-card relative z-[1] flex min-w-0 flex-col overflow-hidden rounded-uv-xl md:h-full">
        <span className="portfolio-concept-card-edge" aria-hidden />
        <span className="portfolio-concept-card-sheen" aria-hidden />
        <span className="portfolio-concept-card-radial" aria-hidden />

        <DemoImagePlaceholder study={study} />

        <div className="relative z-[1] flex min-h-0 min-w-0 flex-1 flex-col p-5 pb-6 sm:p-6 sm:pb-7">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
            {study.industry}
          </p>
          <MarketingCardTitle className="mt-2">{study.title}</MarketingCardTitle>

          <div className="mt-4 flex flex-col gap-3">
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
            {techKeys.slice(0, 3).map((tech, index) => (
              <li
                key={`${study.slug}-tech-${tech}-${index}`}
                className="rounded-uv-full border border-uv-border bg-uv-background-subtle/90 px-2.5 py-1 text-xs text-uv-foreground-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <PortfolioCardActions study={study} />
        </div>
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
  const accent = getPortfolioAccentForStudy(study);

  return (
    <article
      className={cn('portfolio-concept-card-shell group min-w-0', className)}
      style={portfolioAccentStyle(accent)}
    >
      <span className="portfolio-concept-card-depth" aria-hidden />
      <div className="portfolio-concept-card relative z-[1] min-w-0 overflow-hidden rounded-uv-2xl">
        <span className="portfolio-concept-card-edge" aria-hidden />
        <span className="portfolio-concept-card-sheen" aria-hidden />
        <span className="portfolio-concept-card-radial" aria-hidden />

        <div className="relative z-[1] grid lg:grid-cols-[1.05fr_0.95fr]">
          <DemoImagePlaceholder
            study={study}
            className="min-h-[200px] border-b lg:border-b-0 lg:border-r"
          />
          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
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
              {(study.technologies ?? []).slice(0, 5).map((tech, index) => (
                <li
                  key={`${study.slug}-feat-tech-${tech}-${index}`}
                  className="rounded-uv-full border border-uv-border bg-uv-background-subtle/90 px-3 py-1 text-xs text-uv-foreground-muted"
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
                  className={cn(
                    buttonVariants({ size: 'md' }),
                    'min-h-11 justify-center',
                  )}
                >
                  Explore live demo
                </Link>
              ) : null}
              <Link
                href={`/portfolio/${study.slug}`}
                className={cn(
                  buttonVariants({ size: 'md', variant: 'outline' }),
                  'portfolio-concept-cta min-h-11 justify-center',
                  demoHref ? undefined : 'w-full sm:w-auto',
                )}
              >
                View full story
              </Link>
              <Link
                href={contactInquiryHref}
                className={cn(
                  buttonVariants({ size: 'md', variant: 'ghost' }),
                  'min-h-11 justify-center text-uv-brand',
                )}
              >
                Discuss a similar project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
