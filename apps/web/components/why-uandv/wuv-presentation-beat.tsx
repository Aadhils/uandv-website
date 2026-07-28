'use client';

import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';

type BeatTone = 'white' | 'lavender' | 'sky' | 'mist' | 'warm' | 'mint';
type BeatLayout = 'cinematic' | 'split-left' | 'split-right' | 'spotlight';

const toneClass: Record<BeatTone, string> = {
  white: 'bg-white',
  lavender: 'bg-gradient-to-b from-[#faf9ff] via-white to-white',
  sky: 'bg-gradient-to-b from-[#f4f8ff] via-white to-white',
  mist: 'bg-gradient-to-br from-[#faf9ff] via-white to-[#eef4ff]',
  warm: 'bg-gradient-to-b from-[#fff8f3] via-white to-white',
  mint: 'bg-gradient-to-b from-[#f2fbf6] via-white to-white',
};

export function WuvPresentationBeat({
  id,
  ariaLabel,
  tone = 'white',
  layout = 'cinematic',
  visual,
  eyebrow,
  title,
  children,
  footer,
  className,
  visualClassName,
}: {
  id?: string;
  ariaLabel: string;
  tone?: BeatTone;
  layout?: BeatLayout;
  visual: ReactNode;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  visualClassName?: string;
}) {
  const copy = (
    <div className="wuv-presentation-beat__copy max-w-xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-semibold leading-[1.12] text-uv-foreground sm:mt-3 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-base">{children}</div>
      ) : null}
      {footer ? <div className="mt-4 sm:mt-5">{footer}</div> : null}
    </div>
  );

  const visualBlock = (
    <Reveal variant="scale" className={cn('wuv-presentation-beat__visual min-w-0', visualClassName)}>
      {visual}
    </Reveal>
  );

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('wuv-presentation-beat relative scroll-mt-20 overflow-hidden', toneClass[tone], className)}
    >
      <div className={cn(uvContainer, 'relative py-12 sm:py-14 lg:py-20')}>
        {layout === 'cinematic' ? (
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {visualBlock}
            <Reveal variant="up-blur">{copy}</Reveal>
          </div>
        ) : layout === 'split-left' ? (
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            {visualBlock}
            <Reveal variant="up-blur">{copy}</Reveal>
          </div>
        ) : layout === 'split-right' ? (
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <Reveal variant="up-blur" className="order-2 lg:order-1">
              {copy}
            </Reveal>
            <div className="order-1 lg:order-2">{visualBlock}</div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            {visualBlock}
            <Reveal variant="up-blur" className="mt-6 text-center sm:mt-8">
              <div className="mx-auto max-w-2xl">
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">{eyebrow}</p>
                ) : null}
                <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-semibold leading-snug text-uv-foreground sm:text-3xl">
                  {title}
                </h2>
                {children ? (
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">{children}</div>
                ) : null}
                {footer}
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

export function WuvPresentationStage({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div
      className={cn(
        'wuv-presentation-stage relative overflow-hidden rounded-2xl border border-uv-brand/10 bg-gradient-to-br from-white via-[#f8f7ff] to-[#eef4ff] shadow-[0_20px_60px_rgb(30_58_138_/_0.08)] sm:rounded-3xl',
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(124_58_237_/_0.07),transparent_70%)]" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}
