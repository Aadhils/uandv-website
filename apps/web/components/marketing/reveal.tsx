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
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
  /** Show immediately — for above-the-fold content that must not wait for scroll */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion || immediate) {
      node.classList.add('is-visible');
      return;
    }

    let observer: IntersectionObserver | null = null;

    const markVisible = () => {
      node.classList.add('is-visible');
      observer?.disconnect();
      observer = null;
    };

    const isInViewport = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      return rect.top < viewportHeight * 0.95 && rect.bottom > 0;
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          markVisible();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 10% 0px' },
    );

    observer.observe(node);

    // IntersectionObserver can miss elements during hydration/layout — verify immediately.
    if (isInViewport()) {
      markVisible();
    } else {
      requestAnimationFrame(() => {
        if (isInViewport()) {
          markVisible();
        }
      });
    }

    return () => {
      observer?.disconnect();
    };
  }, [immediate]);

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
