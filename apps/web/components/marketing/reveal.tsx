'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@uandv/ui';

export type RevealVariant = 'fade' | 'up' | 'scale' | 'blur' | 'up-blur';

const variantClass: Record<RevealVariant, string> = {
  fade: 'marketing-reveal-fade',
  up: 'marketing-reveal-up',
  scale: 'marketing-reveal-scale',
  blur: 'marketing-reveal-blur',
  'up-blur': 'marketing-reveal-up-blur',
};

export function Reveal({
  children,
  className,
  delayMs = 0,
  variant = 'up',
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px 8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('marketing-reveal-base min-w-0', variantClass[variant], className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
