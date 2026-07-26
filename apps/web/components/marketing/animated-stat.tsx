'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@uandv/ui';

export function AnimatedStat({
  value,
  prefix = '',
  suffix = '',
  label,
  staticDisplay,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** When set, skips count-up animation and shows this text instead. */
  staticDisplay?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (staticDisplay) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;

        if (reduceMotion) {
          setDisplay(value);
        } else {
          setStarted(true);
        }

        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, staticDisplay]);

  useEffect(() => {
    if (staticDisplay || !started) return;

    const duration = 1400;
    const start = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, staticDisplay]);

  const rendered = staticDisplay ?? `${prefix}${display}${suffix}`;

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
        <span className="marketing-gradient-text">{rendered}</span>
      </p>
      <p className="mt-2 text-sm font-medium text-uv-foreground-muted">{label}</p>
    </div>
  );
}
