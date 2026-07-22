import { cn } from '@uandv/ui';
import type { ReactNode } from 'react';

export function SmCard({
  children,
  className,
  title,
  description,
  action,
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-uv-2xl border border-uv-border bg-uv-background p-5 shadow-uv-sm sm:p-6',
        className,
      )}
    >
      {title || description || action ? (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? (
              <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-uv-foreground-muted">{description}</p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function SmBadge({
  children,
  tone = 'brand',
}: {
  children: ReactNode;
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'muted';
}) {
  const styles =
    tone === 'success'
      ? 'bg-uv-success-muted text-uv-success'
      : tone === 'warning'
        ? 'bg-uv-warning-muted text-uv-warning'
        : tone === 'danger'
          ? 'bg-uv-error-muted text-uv-error'
          : tone === 'muted'
            ? 'bg-uv-background-muted text-uv-foreground-muted'
            : 'bg-uv-brand-muted text-uv-brand';

  return (
    <span
      className={cn(
        'inline-flex rounded-uv-full px-2.5 py-1 text-xs font-medium',
        styles,
      )}
    >
      {children}
    </span>
  );
}

export function SmStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <article className="rounded-uv-xl border border-uv-border bg-uv-background p-4 shadow-uv-sm">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
        {label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-foreground">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-uv-foreground-muted">{hint}</p> : null}
    </article>
  );
}

export function TrackingPanel({
  stageLabel,
  progress,
}: {
  stageLabel: string;
  progress: number;
}) {
  return (
    <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-navy p-5 text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-uv-soft-violet">
            Live tracking panel
          </p>
          <p className="mt-2 font-[family-name:var(--font-uv-display)] text-xl font-semibold">
            {stageLabel}
          </p>
        </div>
        <SmBadge tone="brand">Mock GPS</SmBadge>
      </div>
      <div className="relative mt-6 h-40 overflow-hidden rounded-uv-xl bg-[#102A56]">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute left-6 top-8 h-2 w-2 rounded-full bg-uv-soft-violet" />
          <div className="absolute right-10 top-16 h-2 w-2 rounded-full bg-uv-accent" />
          <div className="absolute bottom-10 left-1/3 h-2 w-2 rounded-full bg-white/70" />
          <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-uv-soft-violet to-transparent" />
          <div className="absolute left-1/2 top-6 h-[70%] w-px bg-gradient-to-b from-transparent via-uv-accent/80 to-transparent" />
        </div>
        <div
          className="absolute left-4 top-4 rounded-uv-lg bg-white/10 px-3 py-2 text-xs backdrop-blur"
          style={{ transform: `translate(${progress * 1.8}px, ${progress * 0.6}px)` }}
        >
          Vehicle · moving
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3B1C78] to-[#7C3AED] transition-all duration-500"
          style={{ width: `${Math.min(Math.max(progress, 8), 100)}%` }}
        />
      </div>
    </div>
  );
}
