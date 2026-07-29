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

/** Partnership micro-scene — you + we converge toward growth */
export function WuvYouWeArt({ className }: { className?: string }) {
  const youGrad = useWuvGradId('wuv-yw-you');
  const weGrad = useWuvGradId('wuv-yw-we');
  const growthGrad = useWuvGradId('wuv-yw-growth');

  return (
    <WuvMicroSceneShell
      label="You bring vision and customers, we bring strategy and technology, together creating growth"
      className={cn(
        'wuv-you-we-art h-full min-h-[240px] w-full rounded-uv-2xl border border-uv-brand/15 bg-gradient-to-br from-[#f8f6ff] via-white to-[#eef4ff] shadow-[0_16px_44px_rgb(30_58_138_/_0.11)] sm:min-h-[280px]',
        className,
      )}
      activeClassName="is-active"
      threshold={0.15}
    >
      <svg viewBox="0 0 520 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id={youGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id={weGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id={growthGrad} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* You panel */}
        <WuvMicroFloatG delay={0} duration="6s">
          <g>
            <rect x="32" y="56" width="128" height="168" rx="14" fill={`url(#${youGrad})`} stroke="#1E3A8A" strokeWidth="1.2" strokeOpacity="0.18" />
            <WuvPerson x={96} y={88} variant="owner" facing="right" scale={0.88} />
            <WuvMicroCard x={48} y={168} w={96} h={22} delay={0}>
              <rect x="8" y="8" width="48" height="4" rx="2" fill="#1E3A8A" fillOpacity="0.25" />
              <rect x="8" y="15" width="32" height="3" rx="1.5" fill="#E2E8F0" />
            </WuvMicroCard>
            <WuvMicroCard x={48} y={196} w={96} h={22} delay={300}>
              <rect x="8" y="8" width="40" height="4" rx="2" fill="#1E3A8A" fillOpacity="0.2" />
              <rect x="8" y="15" width="56" height="3" rx="1.5" fill="#E2E8F0" />
            </WuvMicroCard>
          </g>
        </WuvMicroFloatG>

        {/* We panel */}
        <WuvMicroFloatG delay={400} duration="5.5s">
          <g>
            <rect x="196" y="56" width="128" height="168" rx="14" fill={`url(#${weGrad})`} stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.22" />
            <WuvPerson x={260} y={88} variant="consultant" facing="left" scale={0.88} />
            <WuvMicroCard x={212} y={168} w={96} h={22} delay={200}>
              <rect x="8" y="8" width="36" height="4" rx="2" fill="#7C3AED" fillOpacity="0.3" />
              <rect x="8" y="15" width="52" height="3" rx="1.5" fill="#E2E8F0" />
            </WuvMicroCard>
            <WuvMicroCard x={212} y={196} w={96} h={22} delay={500}>
              <rect x="8" y="8" width="44" height="4" rx="2" fill="#7C3AED" fillOpacity="0.25" />
              <rect x="8" y="15" width="28" height="3" rx="1.5" fill="#E2E8F0" />
            </WuvMicroCard>
          </g>
        </WuvMicroFloatG>

        {/* Convergence lines */}
        <WuvMicroPath
          d="M160 140 C200 130, 220 120, 260 110"
          className="wuv-you-we-art__line"
          stroke="#7C3AED"
          strokeWidth={1.5}
          dashArray={80}
        />
        <WuvMicroPath
          d="M324 110 C364 120, 384 130, 424 140"
          className="wuv-you-we-art__line"
          stroke="#22C55E"
          strokeWidth={1.5}
          dashArray={80}
        />

        {/* Merge hub */}
        <circle cx="260" cy="108" r="20" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.3" className="wuv-you-we-art__plus" />
        <WuvMicroPulse cx={260} cy={108} r={4} delay={200} />

        {/* Growth result */}
        <WuvMicroFloatG delay={600} duration="7s">
          <g>
            <rect x="400" y="72" width="88" height="136" rx="14" fill={`url(#${growthGrad})`} stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.3" className="wuv-you-we-art__growth" />
            <path
              d="M420 180 L436 148 L452 158 L468 118"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="wuv-you-we-art__graph"
            />
            <circle cx="468" cy="118" r="4" fill="#22C55E" className="wuv-you-we-art__dot" />
            <rect x="416" y="188" width="56" height="6" rx="3" fill="#22C55E" fillOpacity="0.2" className="wuv-micro-shimmer" />
          </g>
        </WuvMicroFloatG>
      </svg>
    </WuvMicroSceneShell>
  );
}
