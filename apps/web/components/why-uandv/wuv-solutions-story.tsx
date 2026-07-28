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

function ServiceCard({
  service,
  delayMs = 0,
}: {
  service: WuvServiceEntry;
  delayMs?: number;
}) {
  return (
    <Reveal delayMs={delayMs} variant="up">
      <article className="flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border/70 bg-white p-4 shadow-uv-sm transition-[border-color,box-shadow] hover:border-uv-brand/20 hover:shadow-md sm:p-5">
        <div className="flex items-start gap-2.5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
            <Icon name={service.icon} size="sm" />
          </div>
          <h4 className="min-w-0 pt-0.5 font-[family-name:var(--font-uv-display)] text-sm font-semibold leading-snug text-uv-foreground sm:text-base">
            {service.title}
          </h4>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted">
          {service.problem}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground">
          {service.outcome}
        </p>
        <Link
          href={service.detailHref}
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-uv-brand transition-colors hover:text-uv-brand/80 uv-focus-ring sm:text-sm"
        >
          Learn more
          <Icon name="ArrowRight" size="sm" />
        </Link>
      </article>
    </Reveal>
  );
}

function ServiceCategory({ group, categoryIndex }: { group: WuvServiceGroup; categoryIndex: number }) {
  return (
    <section aria-label={group.title} className="wuv-solutions-category min-w-0">
      <Reveal variant="up-blur">
        <h3 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {group.title}
        </h3>
      </Reveal>
      <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            delayMs={categoryIndex * 40 + index * 50}
          />
        ))}
      </div>
    </section>
  );
}

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

        <div className="mx-auto mt-8 flex max-w-6xl min-w-0 flex-col gap-10 sm:mt-10 sm:gap-12">
          {wuvServiceGroups.map((group, index) => (
            <ServiceCategory key={group.id} group={group} categoryIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
