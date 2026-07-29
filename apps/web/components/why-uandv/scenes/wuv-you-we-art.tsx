'use client';

import { useId } from 'react';

import { cn } from '@uandv/ui';

import { useInView, useReducedMotion } from '../wuv-motion';

import { WuvPerson } from './wuv-business-art';

/** You + We = Growth composition */
export function WuvYouWeArt({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-you-we-art relative h-full min-h-[240px] w-full overflow-hidden rounded-uv-2xl border border-uv-brand/15 bg-gradient-to-br from-[#f8f6ff] via-white to-[#eef4ff] shadow-[0_16px_44px_rgb(30_58_138_/_0.11)] sm:min-h-[280px]',
        inView && !reduced && 'is-active',
        className,
      )}
      role="img"
      aria-label="You bring vision and customers, we bring strategy and technology, together creating growth"
    >
      <svg viewBox="0 0 520 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id={`wuv-yw-you-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id={`wuv-yw-we-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id={`wuv-yw-growth-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* You panel */}
        <rect x="24" y="40" width="140" height="180" rx="14" fill={`url(#wuv-yw-you-${uid})`} stroke="#1E3A8A" strokeWidth="1.2" strokeOpacity="0.2" />
        <text x="94" y="68" textAnchor="middle" fill="#1E3A8A" fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">You</text>
        <WuvPerson x={94} y={88} variant="owner" facing="right" scale={0.9} />
        {['Idea', 'Vision', 'Customers'].map((label, i) => (
          <g key={label}>
            <rect x="40" y={148 + i * 22} width="108" height="16" rx="8" fill="#fff" stroke="#1E3A8A" strokeWidth="1" strokeOpacity="0.15" />
            <text x="52" y={160 + i * 22} fill="#334155" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">{label}</text>
          </g>
        ))}

        {/* Plus sign */}
        <circle cx="200" cy="130" r="18" fill="#fff" stroke="#CBD5E1" strokeWidth="1.5" className="wuv-you-we-art__plus" />
        <text x="200" y="136" textAnchor="middle" fill="#64748B" fontSize="16" fontWeight="700" fontFamily="system-ui,sans-serif">+</text>

        {/* We panel */}
        <rect x="236" y="40" width="140" height="180" rx="14" fill={`url(#wuv-yw-we-${uid})`} stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.25" />
        <text x="306" y="68" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">We</text>
        <WuvPerson x={306} y={88} variant="consultant" facing="left" scale={0.9} />
        {['Strategy', 'Tech', 'Support'].map((label, i) => (
          <g key={label}>
            <rect x="252" y={148 + i * 22} width="108" height="16" rx="8" fill="#fff" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.2" />
            <text x="264" y={160 + i * 22} fill="#334155" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">{label}</text>
          </g>
        ))}

        {/* Equals sign */}
        <circle cx="412" cy="130" r="18" fill="#fff" stroke="#CBD5E1" strokeWidth="1.5" className="wuv-you-we-art__equals" />
        <text x="412" y="136" textAnchor="middle" fill="#64748B" fontSize="16" fontWeight="700" fontFamily="system-ui,sans-serif">=</text>

        {/* Growth result */}
        <rect x="448" y="56" width="56" height="148" rx="14" fill={`url(#wuv-yw-growth-${uid})`} stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.35" className="wuv-you-we-art__growth" />
        <text x="476" y="84" textAnchor="middle" fill="#16A34A" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Growth</text>
        <path d="M460 180 L472 148 L484 156 L496 120" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" className="wuv-you-we-art__graph" />
        <circle cx="496" cy="120" r="4" fill="#22C55E" className="wuv-you-we-art__dot" />

        {/* Connection lines */}
        <path d="M164 130 L182 130" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 3" className="wuv-you-we-art__line" />
        <path d="M376 130 L394 130" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 3" className="wuv-you-we-art__line" />
      </svg>
    </div>
  );
}
