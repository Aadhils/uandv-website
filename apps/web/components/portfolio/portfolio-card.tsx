import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { ServiceIllustration } from '@/components/services/service-illustration';
import {
  DEMO_PROJECT_LABEL,
  getValidatedLiveDemoHref,
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

function PortfolioCardActions({ study }: { study: CaseStudy }) {
  const demoHref = getValidatedLiveDemoHref(study.liveDemoHref);

  return (
    <div
      className={cn(
        'mt-5 flex flex-col gap-2',
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
          Live Demo
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
        View Details
        <Icon name="ArrowRight" size="sm" />
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
  return (
    <article
      className={cn(
        'group flex h-full min-w-0 flex-col overflow-hidden rounded-uv-xl border border-uv-border bg-uv-background transition-colors hover:border-uv-brand/40',
        className,
      )}
    >
      <DemoImagePlaceholder study={study} />

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
          {study.industry}
        </p>
        <h3 className="mt-2 break-words font-[family-name:var(--font-uv-display)] text-lg font-semibold tracking-tight text-uv-foreground">
          {study.title}
        </h3>
        <p className="mt-3 flex-1 break-words text-sm leading-relaxed text-uv-foreground-muted">
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

  return (
    <article
      className={cn(
        'group min-w-0 overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background transition-colors hover:border-uv-brand/40',
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
          <h3 className="mt-3 break-words font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-foreground sm:text-3xl">
            {study.title}
          </h3>
          <p className="mt-4 break-words text-base leading-relaxed text-uv-foreground-muted">
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
                Live Demo
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
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
