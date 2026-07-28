import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvHeroIllustrationFrame } from '@/components/marketing/marketing-design-tokens';

/** U&V Design Constitution — Business Solutions hero grid (copy left, illustration right). */
export const marketingStandardHeroGridClass =
  'mt-8 grid items-center gap-8 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,440px)] lg:gap-12 xl:gap-16';

/** Tighter hero shell — keeps content in the first viewport below the header. */
export const marketingStandardHeroInnerClass =
  'marketing-page-hero-viewport pb-12 pt-6 sm:pb-14 sm:pt-8 lg:pb-16 lg:pt-8';

export function MarketingStandardHeroGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(marketingStandardHeroGridClass, className)}>{children}</div>;
}

export function MarketingStandardHeroCopy({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('max-w-3xl', className)}>{children}</div>;
}

export function MarketingHeroIllustrationFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(uvHeroIllustrationFrame, className)}
    >
      {children}
    </div>
  );
}

export function MarketingStandardHeroIllustration({
  children,
  className,
  delayMs = 120,
  framed = true,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Wrap in the standard hero illustration frame (Business Solutions reference). */
  framed?: boolean;
}) {
  return (
    <Reveal delayMs={delayMs} variant="scale" className={cn('relative min-w-0', className)}>
      {framed ? (
        <MarketingHeroIllustrationFrame>{children}</MarketingHeroIllustrationFrame>
      ) : (
        children
      )}
    </Reveal>
  );
}
