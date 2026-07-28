'use client';

import type { ReactNode, MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';

import { cn } from '@uandv/ui';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function subscribeLgUp(onStoreChange: () => void) {
  const media = window.matchMedia('(min-width: 1024px)');
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
}

function getLgUpSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

export function useIsLgUp() {
  return useSyncExternalStore(subscribeLgUp, getLgUpSnapshot, () => false);
}

export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
) {
  const reduced = useReducedMotion();
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const threshold = options.threshold ?? 0.2;
  const rootMargin = options.rootMargin ?? '0px 0px -8% 0px';

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, threshold, rootMargin]);

  return { ref, inView: reduced || inView };
}

export function useScrollActiveIndex(itemCount: number, threshold = 0.45) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('[data-wuv-active-index]');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.wuvActiveIndex);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { threshold, rootMargin: '-15% 0px -40% 0px' },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [itemCount, threshold]);

  return { containerRef, activeIndex };
}

export function useTilt(intensity = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.setProperty('--wuv-tilt-x', `${-y * intensity}deg`);
      ref.current.style.setProperty('--wuv-tilt-y', `${x * intensity}deg`);
    },
    [intensity, reduced],
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--wuv-tilt-x', '0deg');
    ref.current.style.setProperty('--wuv-tilt-y', '0deg');
  }, []);

  return { ref, onMove, onLeave, reduced };
}

export function WuvTiltPanel({
  children,
  className,
  intensity = 5,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const { ref, onMove, onLeave, reduced } = useTilt(intensity);

  return (
    <div
      ref={ref}
      className={cn('wuv-tilt-panel', className)}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={reduced ? undefined : onLeave}
    >
      {children}
    </div>
  );
}

export function WuvFloatLayer({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn('wuv-float-layer', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function WuvDrawLine({
  inView,
  className,
  direction = 'horizontal',
}: {
  inView: boolean;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}) {
  return (
    <span
      className={cn(
        'wuv-draw-line',
        direction === 'vertical' ? 'wuv-draw-line--vertical' : 'wuv-draw-line--horizontal',
        inView && 'is-drawn',
        className,
      )}
      aria-hidden
    />
  );
}

export function useParallax(ref: RefObject<HTMLElement | null>, amount = 12) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewport = window.innerHeight / 2;
        const offset = ((center - viewport) / viewport) * amount;
        node.style.setProperty('--wuv-parallax-y', `${offset}px`);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref, amount, reduced]);
}
