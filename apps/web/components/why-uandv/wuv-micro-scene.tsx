'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useId } from 'react';

import { cn } from '@uandv/ui';

import { useInView, useReducedMotion } from './wuv-motion';

/** Standard loop durations for subtle living animations (4–8s) */
export const WUV_LOOP = {
  xs: '4s',
  sm: '5s',
  md: '6s',
  lg: '7s',
  xl: '8s',
} as const;

export function WuvMicroSceneShell({
  children,
  label,
  className,
  activeClassName = 'is-active',
  threshold = 0.12,
  style,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  activeClassName?: string;
  threshold?: number;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-micro-scene relative overflow-hidden',
        inView && !reduced && activeClassName,
        className,
      )}
      role="img"
      aria-label={label}
      style={style}
    >
      {children}
    </div>
  );
}

/** Floating layer — low-amplitude vertical drift (HTML) */
export function WuvMicroFloat({
  children,
  className,
  delay = 0,
  duration = WUV_LOOP.md,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: string;
}) {
  return (
    <div
      className={cn('wuv-micro-float', className)}
      style={{ animationDelay: `${delay}ms`, ['--wuv-loop-dur' as string]: duration }}
      aria-hidden
    >
      {children}
    </div>
  );
}

/** Floating layer for SVG groups */
export function WuvMicroFloatG({
  children,
  className,
  delay = 0,
  duration = WUV_LOOP.md,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: string;
}) {
  return (
    <g
      className={cn('wuv-micro-float', className)}
      style={{ animationDelay: `${delay}ms`, ['--wuv-loop-dur' as string]: duration }}
    >
      {children}
    </g>
  );
}

/** SVG path that draws on activation, then loops a subtle shimmer */
export function WuvMicroPath({
  d,
  className,
  stroke = 'currentColor',
  strokeWidth = 1.5,
  dashArray = 120,
}: {
  d: string;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  dashArray?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashArray}
      className={cn('wuv-micro-path', className)}
      style={{ ['--wuv-path-len' as string]: dashArray }}
    />
  );
}

/** Pulsing dot / hub indicator */
export function WuvMicroPulse({
  cx,
  cy,
  r = 4,
  className,
  delay = 0,
}: {
  cx: number;
  cy: number;
  r?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      className={cn('wuv-micro-pulse', className)}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

/** Mini floating UI card for ecosystem / hero scenes */
export function WuvMicroCard({
  x,
  y,
  w,
  h,
  rx = 8,
  className,
  children,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  className?: string;
  children?: ReactNode;
  delay?: number;
}) {
  return (
    <g
      className={cn('wuv-micro-card', className)}
      style={{ animationDelay: `${delay}ms` }}
      transform={`translate(${x}, ${y})`}
    >
      <rect width={w} height={h} rx={rx} fill="#fff" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.22" />
      {children}
    </g>
  );
}

/** Unique gradient id helper */
export function useWuvGradId(prefix: string) {
  const uid = useId().replace(/:/g, '');
  return `${prefix}-${uid}`;
}
