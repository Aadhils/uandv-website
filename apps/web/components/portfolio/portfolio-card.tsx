import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { ServiceIllustration } from '@/components/services/service-illustration';
import {
  DEMO_PROJECT_LABEL,
  type CaseStudy,
} from '@/lib/portfolio';

export function DemoProjectBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-uv-full border border-uv-border bg-uv-background-muted px-3 py-1 text-xs font-medium tracking-wide text-uv-foreground-muted',
        className,
      )}
    >
      {DEMO_PROJECT_LABEL}
    </span>
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
        <p className="text-xs font-medium text-white/90">Image placeholder</p>
      </div>
      <div className="absolute left-3 top-3">
        <DemoProjectBadge className="bg-uv-background/95 backdrop-blur-sm" />
      </div>
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
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-uv-xl border border-uv-border bg-uv-background transition-colors hover:border-uv-brand/40',
        className,
      )}
    >
      <DemoImagePlaceholder study={study} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
          {study.industry}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-uv-display)] text-lg font-semibold tracking-tight text-uv-foreground">
          {study.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-uv-foreground-muted">
          {study.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {study.technologies.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-uv-full border border-uv-border bg-uv-background-subtle px-2.5 py-1 text-xs text-uv-foreground-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={study.liveDemoHref ?? `/portfolio/${study.slug}#live-demo`}
            className={cn(
              buttonVariants({ size: 'sm' }),
              'justify-center sm:flex-1',
            )}
          >
            Live Demo
          </Link>
          <Link
            href={`/portfolio/${study.slug}`}
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outline' }),
              'justify-center sm:flex-1',
            )}
          >
            View Details
            <Icon name="ArrowRight" size="sm" />
          </Link>
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
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background transition-colors hover:border-uv-brand/40',
        className,
      )}
    >
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <DemoImagePlaceholder study={study} className="min-h-[220px] border-b lg:border-b-0 lg:border-r" />
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <DemoProjectBadge />
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
            {study.category} · {study.industry}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-foreground sm:text-3xl">
            {study.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted">
            {study.summary}
          </p>
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={study.liveDemoHref ?? `/portfolio/${study.slug}#live-demo`}
              className={cn(buttonVariants({ size: 'md' }), 'justify-center')}
            >
              Live Demo
            </Link>
            <Link
              href={`/portfolio/${study.slug}`}
              className={cn(
                buttonVariants({ size: 'md', variant: 'outline' }),
                'justify-center',
              )}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
