'use client';

import { forwardRef, type ReactNode } from 'react';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';

type SectionTone = 'default' | 'subtle' | 'lavender';

const toneClass: Record<SectionTone, string> = {
  default: 'bg-white',
  subtle: 'bg-uv-background-subtle',
  lavender: 'bg-gradient-to-b from-[#faf9ff] to-white',
};

export const WuvSplitSection = forwardRef<
  HTMLElement,
  {
    id?: string;
    ariaLabel: string;
    eyebrow?: string;
    title: string;
    children?: ReactNode;
    visual: ReactNode;
    visualPosition?: 'left' | 'right';
    tone?: SectionTone;
    actions?: ReactNode;
    className?: string;
    border?: boolean;
  }
>(function WuvSplitSection(
  {
    id,
    ariaLabel,
    eyebrow,
    title,
    children,
    visual,
    visualPosition = 'right',
    tone = 'default',
    actions,
    className,
    border = true,
  },
  ref,
) {
  const copy = (
    <div className="wuv-split-section__copy flex min-w-0 flex-col justify-center">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">{eyebrow}</p> : null}
      <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-3 space-y-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">{children}</div>
      ) : null}
      {actions ? <div className="mt-4 sm:mt-5">{actions}</div> : null}
    </div>
  );

  const visualBlock = (
    <Reveal variant="scale" delayMs={80} className="wuv-split-section__visual flex h-full min-w-0 flex-col">
      <div className="wuv-visual-frame h-full min-h-[inherit] flex-1">{visual}</div>
    </Reveal>
  );

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'wuv-split-section scroll-mt-20',
        border && 'border-b border-uv-border/60',
        toneClass[tone],
        className,
      )}
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          {visualPosition === 'left' ? (
            <>
              {visualBlock}
              <Reveal variant="up-blur">{copy}</Reveal>
            </>
          ) : (
            <>
              <Reveal variant="up-blur" className="order-2 lg:order-1">
                {copy}
              </Reveal>
              <div className="order-1 lg:order-2">{visualBlock}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
});

export function WuvCenteredSection({
  id,
  ariaLabel,
  eyebrow,
  title,
  intro,
  children,
  tone = 'default',
  className,
}: {
  id?: string;
  ariaLabel: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('wuv-centered-section scroll-mt-20 border-b border-uv-border/60', toneClass[tone], className)}
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-3xl text-center">
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">{eyebrow}</p> : null}
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {title}
          </h2>
          {intro ? <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">{intro}</p> : null}
        </Reveal>
        <div className="mt-6 sm:mt-8">{children}</div>
      </div>
    </section>
  );
}
