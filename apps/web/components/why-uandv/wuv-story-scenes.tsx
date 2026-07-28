'use client';

import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

import { uvContainer } from '@/components/marketing/marketing-design-tokens';

import type { WuvAnimationId } from '@/lib/why-uandv-animations';

import {
  WuvAccountabilityWorkflowIllustration,
  WuvBrokenJourneyIllustration,
  WuvHeroPartnershipIllustration,
  WuvJourneyStageIllustration,
  WuvPrincipleIcon,
} from './wuv-illustrations';
import { WuvIndustryScene } from './wuv-industry-visuals';

const journeyIndex: Record<string, 0 | 1 | 2 | 3 | 4> = {
  listen: 0,
  plan: 1,
  build: 2,
  launch: 3,
  grow: 4,
};

const principleIndex: Record<string, number> = {
  'principle-business-first': 0,
  'principle-built-to-last': 1,
  'principle-less-busywork': 2,
  'principle-honest-communication': 3,
  'principle-stay-after-launch': 4,
  'principle-evolve': 5,
};

export function WuvStorySceneFallback({
  scene,
  className,
  active = true,
}: {
  scene: WuvAnimationId;
  className?: string;
  active?: boolean;
}) {
  if (scene === 'partnership') {
    return <WuvHeroPartnershipIllustration className={cn('h-full min-h-[200px]', className)} />;
  }
  if (scene === 'broken-vendor') {
    return <WuvBrokenJourneyIllustration className={cn('h-full min-h-[200px]', className)} />;
  }
  if (scene === 'accountability') {
    return <WuvAccountabilityWorkflowIllustration className={cn('h-full min-h-[180px]', className)} />;
  }
  if (scene in journeyIndex) {
    return (
      <WuvJourneyStageIllustration
        stage={journeyIndex[scene]}
        active={active}
        className={cn('h-full min-h-[140px]', className)}
      />
    );
  }
  if (scene in principleIndex) {
    return (
      <div className={cn('flex h-full min-h-[140px] items-center justify-center', className)}>
        <WuvPrincipleIcon index={principleIndex[scene]} active={active} className="h-16 w-16" />
      </div>
    );
  }
  const industryKeys = ['healthcare', 'education', 'finance', 'travel', 'hospitality', 'logistics'] as const;
  if ((industryKeys as readonly string[]).includes(scene)) {
    return (
      <div className={cn('h-full min-h-[180px]', className)}>
        <WuvIndustryScene industry={scene as (typeof industryKeys)[number]} active={active} />
      </div>
    );
  }
  return null;
}

export function WuvStorySection({
  id,
  className,
  children,
  variant = 'default',
  'aria-label': ariaLabel,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  variant?: 'default' | 'lavender' | 'sky' | 'fullbleed';
  'aria-label'?: string;
}) {
  const bg =
    variant === 'lavender'
      ? 'bg-gradient-to-b from-[#faf9ff] to-white'
      : variant === 'sky'
        ? 'bg-gradient-to-b from-white to-[#f0f7ff]'
        : variant === 'fullbleed'
          ? 'bg-gradient-to-br from-[#faf9ff] via-white to-[#eef4ff]'
          : 'bg-white';

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('wuv-story-section relative scroll-mt-20 overflow-hidden', bg, className)}
    >
      <div className={cn(uvContainer, 'relative')}>{children}</div>
    </section>
  );
}

export function WuvStorySplit({
  reverse = false,
  visual,
  copy,
  className,
}: {
  reverse?: boolean;
  visual: ReactNode;
  copy: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'wuv-story-split grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12',
        reverse && 'lg:[&>div:first-child]:order-2',
        className,
      )}
    >
      <div className="wuv-story-split__copy min-w-0">{copy}</div>
      <div className="wuv-story-split__visual min-w-0">{visual}</div>
    </div>
  );
}

export function WuvStoryVisual({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        'wuv-story-visual relative overflow-hidden rounded-2xl',
        glow && 'wuv-story-visual--glow',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function WuvStoryCopy({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('max-w-xl', className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-uv-brand">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-semibold leading-snug text-uv-foreground sm:mt-3 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {children && <div className="mt-3 space-y-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4">{children}</div>}
    </div>
  );
}
