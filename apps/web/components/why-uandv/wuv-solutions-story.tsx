'use client';

import Link from 'next/link';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvSolutionsStory } from '@/lib/why-uandv-content';
import {
  wuvServiceGroups,
  type WuvServiceEntry,
  type WuvServiceGroup,
} from '@/lib/wuv-services-groups';

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

function StoryLead({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn('text-base font-medium leading-relaxed text-uv-foreground sm:text-lg', className)}>
      {children}
    </p>
  );
}

function ServiceNarrative({
  service,
  compact = false,
}: {
  service: WuvServiceEntry;
  compact?: boolean;
}) {
  return (
    <article className={cn(compact && 'flex min-w-0 flex-col')}>
      <div className="flex items-start gap-2.5">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
          <Icon name={service.icon} size="sm" />
        </div>
        <h4 className="pt-0.5 font-[family-name:var(--font-uv-display)] text-sm font-semibold leading-snug text-uv-foreground sm:text-base">
          {service.title}
        </h4>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
        {service.problem}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-uv-foreground sm:text-base">
        {service.outcome}
      </p>
      <div className="mt-3">
        <LearnMoreLink href={service.detailHref} />
      </div>
    </article>
  );
}

function DigitalProductChapter({ group }: { group: WuvServiceGroup }) {
  const [lead, ...supporting] = group.services;

  return (
    <div className="wuv-solutions-chapter wuv-solutions-chapter--product">
      <Reveal variant="up-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
          Chapter 1
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
        <StoryLead className="mt-3 max-w-2xl">
          When your product is the face of your business, half-finished software costs you credibility
          every day it stays live.
        </StoryLead>
      </Reveal>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
        {lead ? (
          <Reveal variant="scale">
            <div className="h-full rounded-uv-2xl border border-uv-brand/15 bg-gradient-to-br from-[#f8f6ff] to-white p-5 sm:p-6">
              <ServiceNarrative service={lead} />
            </div>
          </Reveal>
        ) : null}
        <div className="flex flex-col gap-4">
          {supporting.map((service, index) => (
            <Reveal key={service.id} delayMs={index * 60} variant="up">
              <div className="rounded-uv-xl border border-uv-border/70 bg-white p-4 sm:p-5">
                <ServiceNarrative service={service} compact />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function OperationsChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div className="wuv-solutions-chapter wuv-solutions-chapter--ops">
      <Reveal variant="up-blur" className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
          Chapter 2
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
        <StoryLead className="mt-3 max-w-2xl">
          Growth breaks down when sales, operations, and finance run on separate spreadsheets
          nobody fully trusts.
        </StoryLead>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 70} variant="up">
            <div className="h-full rounded-uv-2xl border border-uv-border/80 bg-white p-4 shadow-uv-sm sm:p-5">
              <ServiceNarrative service={service} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function GrowthChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div className="wuv-solutions-chapter wuv-solutions-chapter--growth">
      <Reveal variant="up-blur" className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
          Chapter 3
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
        <StoryLead className="mt-3 max-w-2xl">
          Launching is only the beginning — momentum comes from marketing, brand clarity, and a
          plan that survives the first busy quarter.
        </StoryLead>
      </Reveal>
      <div className="relative ml-3 border-l-2 border-uv-brand/20 pl-6 sm:ml-4 sm:pl-8">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 70} variant="up">
            <div className={cn('relative pb-7 last:pb-0')}>
              <span
                className="absolute -left-[calc(1.5rem+5px)] top-1 flex h-3 w-3 rounded-full border-2 border-white bg-uv-brand sm:-left-[calc(2rem+5px)]"
                aria-hidden
              />
              <div className="rounded-uv-xl border border-uv-border/70 bg-white p-4 sm:p-5">
                <ServiceNarrative service={service} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function IndustryChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div className="wuv-solutions-chapter wuv-solutions-chapter--industry">
      <Reveal variant="up-blur" className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
          Chapter 4
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
        <StoryLead className="mt-3 max-w-2xl">
          Generic software rarely survives real industry pressure — compliance, seasonality, and
          workflows that differ from sector to sector.
        </StoryLead>
      </Reveal>
      <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 50} variant="up" className="snap-start">
            <div className="w-[min(100%,280px)] shrink-0 rounded-uv-xl border border-uv-border/80 bg-white p-4 shadow-uv-sm sm:w-[300px] sm:p-5">
              <ServiceNarrative service={service} compact />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function PartnershipChapter({ group }: { group: WuvServiceGroup }) {
  return (
    <div className="wuv-solutions-chapter wuv-solutions-chapter--partnership rounded-uv-2xl border border-uv-border/70 bg-gradient-to-b from-white to-[#faf9ff] p-5 sm:p-6">
      <Reveal variant="up-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
          Chapter 5
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
        <StoryLead className="mt-3 max-w-2xl">
          The work does not end at launch. Registration, protection, and ongoing care keep what you
          build working for years.
        </StoryLead>
      </Reveal>
      <div className="mt-6 divide-y divide-uv-border/60">
        {group.services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 50} variant="fade">
            <div className="py-4 first:pt-0 last:pb-0">
              <ServiceNarrative service={service} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const chapterRenderers = {
  'build-digital-product': DigitalProductChapter,
  'run-business-better': OperationsChapter,
  'launch-and-grow': GrowthChapter,
  'industry-specific': IndustryChapter,
  'legal-support-partnership': PartnershipChapter,
} as const;

export function WuvSolutionsStory() {
  return (
    <section
      id="solutions"
      aria-label="Solutions we build"
      className="wuv-solutions-story scroll-mt-20 border-b border-uv-border/60 bg-uv-background-subtle"
    >
      {/* Legacy #services hash — same scroll target as #solutions */}
      <span id="services" className="block scroll-mt-20" aria-hidden />
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvSolutionsStory.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvSolutionsStory.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvSolutionsStory.intro}
          </p>
        </Reveal>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-10 sm:mt-10 sm:gap-12">
          {wuvServiceGroups.map((group) => {
            const Chapter = chapterRenderers[group.id];
            return (
              <section key={group.id} aria-label={group.title}>
                <Chapter group={group} />
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
