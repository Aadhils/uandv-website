'use client';

import Link from 'next/link';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvSolutionChapters } from '@/lib/why-uandv-content';
import {
  wuvServiceGroups,
  type WuvServiceEntry,
  type WuvServiceGroup,
} from '@/lib/wuv-services-groups';

import { WuvCenteredSection } from './wuv-split-section';

function ChapterLabel({ children }: { children: string }) {
  return (
    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-xs">
      {children}
    </p>
  );
}

function LearnMoreLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-xs font-semibold text-uv-brand transition-colors hover:text-uv-brand/80 uv-focus-ring sm:text-sm"
    >
      Learn more
      <Icon name="ArrowRight" size="sm" />
    </Link>
  );
}

function ServiceChallengeSolution({
  service,
  layout = 'stack',
}: {
  service: WuvServiceEntry;
  layout?: 'stack' | 'inline';
}) {
  return (
    <article className={cn(layout === 'inline' && 'flex min-w-[240px] flex-col sm:min-w-[280px]')}>
      <div className="flex items-start gap-2.5">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
          <Icon name={service.icon} size="sm" />
        </div>
        <h4 className="pt-0.5 font-[family-name:var(--font-uv-display)] text-sm font-semibold leading-snug text-uv-foreground sm:text-base">
          {service.title}
        </h4>
      </div>
      <div className="mt-3 space-y-2.5">
        <div>
          <ChapterLabel>The challenge</ChapterLabel>
          <p className="mt-1 text-xs leading-relaxed text-uv-foreground-muted sm:text-sm">
            {service.problem}
          </p>
        </div>
        <div>
          <ChapterLabel>What U&V provides</ChapterLabel>
          <p className="mt-1 text-xs leading-relaxed text-uv-foreground sm:text-sm">
            {service.outcome}
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-uv-border/60 pt-3">
        <LearnMoreLink href={service.detailHref} />
      </div>
    </article>
  );
}

function BuildDigitalProductChapter({ group }: { group: WuvServiceGroup }) {
  const [featured, ...rest] = group.services;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
      {featured ? (
        <Reveal variant="up-blur">
          <div className="rounded-uv-2xl border border-uv-border/80 bg-gradient-to-br from-[#f8f6ff] to-white p-5 sm:p-6">
            <ChapterLabel>Group A</ChapterLabel>
            <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
              {group.title}
            </h3>
            <div className="mt-5">
              <ServiceChallengeSolution service={featured} />
            </div>
          </div>
        </Reveal>
      ) : null}
      <div className="flex flex-col gap-4">
        {rest.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 60} variant="up">
            <div className="rounded-uv-xl border border-uv-border/70 bg-white p-4 sm:p-5">
              <ServiceChallengeSolution service={service} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function RunBusinessBetterChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div>
      <Reveal variant="up-blur" className="mb-5">
        <ChapterLabel>Group B</ChapterLabel>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 70} variant="scale">
            <div className="rounded-uv-2xl border border-uv-border/80 bg-white p-4 shadow-uv-sm sm:p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-uv-brand/20 bg-uv-brand-muted px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-uv-brand">
                  Ops
                </span>
                <span className="rounded-full border border-[#1E3A8A]/15 bg-[#eef4ff] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[#1E3A8A]">
                  Dashboard
                </span>
              </div>
              <ServiceChallengeSolution service={service} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LaunchAndGrowChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div>
      <Reveal variant="up-blur" className="mb-5">
        <ChapterLabel>Group C</ChapterLabel>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
      </Reveal>
      <div className="relative ml-3 border-l-2 border-uv-brand/20 pl-6 sm:ml-4 sm:pl-8">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 70} variant="up">
            <div
              className={cn(
                'relative pb-8 last:pb-0',
              )}
            >
              <span
                className="absolute -left-[calc(1.5rem+5px)] top-1 flex h-3 w-3 rounded-full border-2 border-white bg-uv-brand sm:-left-[calc(2rem+5px)]"
                aria-hidden
              />
              <div className="rounded-uv-xl border border-uv-border/70 bg-white p-4 sm:p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-uv-foreground-muted">
                  Step {index + 1}
                </p>
                <div className="mt-2">
                  <ServiceChallengeSolution service={service} />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function IndustrySpecificChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div>
      <Reveal variant="up-blur" className="mb-5">
        <ChapterLabel>Group D</ChapterLabel>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
      </Reveal>
      <div className="-mx-1 flex gap-4 overflow-x-auto pb-2 px-1 snap-x snap-mandatory">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 50} variant="up" className="snap-start">
            <div className="w-[min(100%,280px)] shrink-0 rounded-uv-xl border border-uv-border/80 bg-white p-4 shadow-uv-sm sm:w-[300px] sm:p-5">
              <ServiceChallengeSolution service={service} layout="inline" />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LegalSupportChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div className="rounded-uv-2xl border border-uv-border/70 bg-gradient-to-b from-white to-[#faf9ff] p-5 sm:p-6">
      <Reveal variant="up-blur">
        <ChapterLabel>Group E</ChapterLabel>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
          The work does not end at launch. We help you register, protect, and maintain what you build.
        </p>
      </Reveal>
      <div className="mt-6 divide-y divide-uv-border/60">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 50} variant="fade">
            <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <ServiceChallengeSolution service={service} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const chapterRenderers = {
  'build-digital-product': BuildDigitalProductChapter,
  'run-business-better': RunBusinessBetterChapter,
  'launch-and-grow': LaunchAndGrowChapter,
  'industry-specific': IndustrySpecificChapter,
  'legal-support-partnership': LegalSupportChapter,
} as const;

export function WuvSolutionChapters() {
  return (
    <WuvCenteredSection
      id="services"
      ariaLabel="Business solutions"
      eyebrow={wuvSolutionChapters.eyebrow}
      title={wuvSolutionChapters.title}
      intro={wuvSolutionChapters.intro}
      tone="subtle"
      className="wuv-solution-chapters"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-12">
        {wuvServiceGroups.map((group) => {
          const Chapter = chapterRenderers[group.id];
          return (
            <section key={group.id} aria-label={group.title}>
              <Chapter group={group} />
            </section>
          );
        })}
      </div>
    </WuvCenteredSection>
  );
}
