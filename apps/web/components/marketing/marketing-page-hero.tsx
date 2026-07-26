import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

import { marketingContainerClass } from './marketing-primitives';

/** Cinematic light hero atmosphere for white content pages */
export function MarketingPageHeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="marketing-content-hero-glow absolute inset-0" />
      <div className="marketing-content-hero-beam absolute inset-0" />
      <div className="absolute -left-28 top-0 h-[22rem] w-[22rem] rounded-full bg-uv-brand/10 blur-3xl marketing-float" />
      <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-uv-navy-blue/8 blur-3xl marketing-float-delayed" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-uv-soft-violet/10 blur-3xl" />
      <div className="marketing-hero-grid absolute inset-0 opacity-[0.2]" />
    </div>
  );
}

export function MarketingContentPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'marketing-grain marketing-page-ambient flex-1 bg-uv-background',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MarketingPageHero({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'marketing-content-hero marketing-content-hero-cinematic relative overflow-hidden border-b border-uv-border bg-uv-background',
        className,
      )}
    >
      <MarketingPageHeroBackdrop />
      {children}
    </section>
  );
}

export function MarketingPageHeroInner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        marketingContainerClass,
        'relative z-[1] pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24',
        className,
      )}
    >
      {children}
    </div>
  );
}
