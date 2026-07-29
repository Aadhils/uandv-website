'use client';

import { cn } from '@uandv/ui';

import {
  WuvMicroCard,
  WuvMicroFloatG,
  WuvMicroPath,
  WuvMicroPulse,
  WuvMicroSceneShell,
  useWuvGradId,
} from '../wuv-micro-scene';

import { WuvPerson } from './wuv-business-art';

/** Compact hero micro-scene — owner meets U&V, connection lines, growth path */
export function WuvHeroStoryVisual({ className }: { className?: string }) {
  const bgGrad = useWuvGradId('wuv-hsv-bg');
  const lineGrad = useWuvGradId('wuv-hsv-line');
  const growthGrad = useWuvGradId('wuv-hsv-growth');

  return (
    <WuvMicroSceneShell
      label="You and U&V partner together — strategy, technology, branding, and support connected toward business growth"
      className={cn(
        'wuv-hero-story-visual group rounded-uv-2xl border border-uv-brand/15 bg-white shadow-[0_16px_44px_rgb(30_58_138_/_0.11)]',
        className,
      )}
      activeClassName="is-active"
      threshold={0.12}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-uv-brand/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#1E3A8A]/8 blur-3xl"
        aria-hidden
      />

      <svg
        viewBox="0 0 480 220"
        className="wuv-hero-story-visual__svg h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={bgGrad} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8f6ff" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eef4ff" />
          </linearGradient>
          <linearGradient id={growthGrad} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id={lineGrad} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <rect x="8" y="8" width="464" height="204" rx="14" fill={`url(#${bgGrad})`} />

        {/* Growth path — animated arc */}
        <WuvMicroPath
          d="M72 118 C140 118, 180 98, 240 88 C300 78, 340 72, 408 62"
          className="wuv-hero-story-visual__progress"
          stroke={`url(#${lineGrad})`}
          strokeWidth={2}
          dashArray={200}
        />

        {/* You — owner scene */}
        <WuvMicroFloatG delay={0} duration="6s">
          <g>
            <rect x="28" y="44" width="88" height="112" rx="12" fill="#fff" stroke="#1E3A8A" strokeWidth="1.2" strokeOpacity="0.18" />
            <WuvPerson x={72} y={72} variant="owner" facing="right" scale={0.78} />
          </g>
        </WuvMicroFloatG>

        {/* U&V — consultant scene */}
        <WuvMicroFloatG delay={300} duration="5.5s">
          <g>
            <rect x="364" y="44" width="88" height="112" rx="12" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.22" />
            <WuvPerson x={408} y={72} variant="consultant" facing="left" scale={0.78} />
          </g>
        </WuvMicroFloatG>

        {/* Connection hub */}
        <circle cx="240" cy="88" r="26" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.3" className="wuv-hero-story-visual__goal" />
        <WuvMicroPulse cx={240} cy={88} r={5} className="wuv-hero-story-visual__dot" />

        {/* Connector lines */}
        <path d="M116 88 L214 88" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3" className="wuv-hero-story-visual__connector wuv-micro-connector" />
        <path d="M266 88 L364 88" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3" className="wuv-hero-story-visual__connector wuv-micro-connector" style={{ animationDelay: '0.4s' }} />

        {/* Floating capability micro-cards */}
        <WuvMicroCard x={108} y={148} w={56} h={28} delay={0}>
          <rect x="8" y="10" width="28" height="4" rx="2" fill="#7C3AED" fillOpacity="0.35" />
          <rect x="8" y="18" width="40" height="3" rx="1.5" fill="#E2E8F0" />
        </WuvMicroCard>
        <WuvMicroCard x={188} y={156} w={52} h={26} delay={200}>
          <rect x="8" y="9" width="20" height="10" rx="2" fill="#3B82F6" fillOpacity="0.2" />
          <rect x="32" y="11" width="12" height="6" rx="2" fill="#E2E8F0" />
        </WuvMicroCard>
        <WuvMicroCard x={268} y={150} w={54} h={28} delay={400}>
          <circle cx="16" cy="14" r="6" fill="#7C3AED" fillOpacity="0.15" />
          <rect x="26" y="10" width="22" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="26" y="17" width="16" height="3" rx="1.5" fill="#E2E8F0" />
        </WuvMicroCard>

        {/* Growth mini-chart */}
        <WuvMicroFloatG delay={500} duration="7s">
          <g className="wuv-hero-story-visual__growth">
            <rect x="348" y="148" width="72" height="52" rx="12" fill={`url(#${growthGrad})`} stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.35" />
            <path
              d="M360 188 L374 168 L386 174 L404 152"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="wuv-hero-story-visual__graph"
            />
            <circle cx="404" cy="152" r="3.5" fill="#7C3AED" className="wuv-hero-story-visual__dot" style={{ animationDelay: '0.8s' }} />
          </g>
        </WuvMicroFloatG>
      </svg>

      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/50"
        aria-hidden
      />
    </WuvMicroSceneShell>
  );
}
