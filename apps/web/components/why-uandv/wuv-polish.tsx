'use client';

import { useRef, type ReactNode } from 'react';

import { cn } from '@uandv/ui';

import { useInView, useParallax, useReducedMotion } from './wuv-motion';

/** Subtle scroll parallax wrapper — transform only, no layout shift */
export function WuvParallaxWrap({
  children,
  className,
  amount = 10,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, amount);

  return (
    <div ref={ref} className={cn('wuv-parallax-wrap', className)}>
      {children}
    </div>
  );
}

/** Soft mask reveal for side visuals */
export function WuvMaskReveal({
  children,
  className,
  delayMs = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  immediate?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const reduced = useReducedMotion();
  const revealed = immediate || reduced || inView;

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-mask-reveal',
        revealed && 'is-revealed',
        className,
      )}
      style={{ transitionDelay: reduced ? undefined : `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/** Gentle ambient gradient for closing panel */
export function WuvClosingGlow({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-closing-glow relative overflow-hidden rounded-uv-2xl',
        inView && !reduced && 'is-closing-active',
        className,
      )}
    >
      <div className="wuv-closing-glow__ambient pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
