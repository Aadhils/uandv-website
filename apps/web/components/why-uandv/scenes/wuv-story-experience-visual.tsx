'use client';

import { useId } from 'react';

import { cn } from '@uandv/ui';

import { useInView, useReducedMotion } from '../wuv-motion';

import {
  WuvChatBubble,
  WuvDesk,
  WuvDocument,
  WuvLaptop,
  WuvMeetingTable,
  WuvPerson,
  WuvPhone,
  WuvSceneBackdrop,
} from './wuv-business-art';

const LABEL =
  'Business owner overwhelmed by multiple vendors and delays, transitioning to clear partnership with U&V';

function VendorChip({
  x,
  y,
  label,
  tone = 'muted',
  delay = 0,
}: {
  x: number;
  y: number;
  label: string;
  tone?: 'muted' | 'warn';
  delay?: number;
}) {
  const fill = tone === 'warn' ? '#FEF2F2' : '#F8FAFC';
  const stroke = tone === 'warn' ? '#FECACA' : '#CBD5E1';
  const text = tone === 'warn' ? '#DC2626' : '#64748B';

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="wuv-story-experience__vendor-chip"
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      <rect x="0" y="0" width="72" height="28" rx="14" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <text x="36" y="18" textAnchor="middle" fill={text} fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
        {label}
      </text>
    </g>
  );
}

export function WuvStoryExperienceVisual({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const reduced = useReducedMotion();
  const active = inView && !reduced;

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-story-experience__visual wuv-premium-banner group relative h-full w-full overflow-hidden rounded-uv-2xl border border-uv-brand/15 shadow-[0_20px_50px_rgb(30_58_138_/_0.14)]',
        active && 'is-premium-active',
        className,
      )}
      role="img"
      aria-label={LABEL}
    >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3B82F6]/15 via-transparent to-[#7C3AED]/10 opacity-80 transition-opacity duration-700 ease-out group-[.is-premium-active]:opacity-100"
          aria-hidden
        />
        <WuvSceneBackdrop tone="lavender" className="relative h-full min-h-[180px] rounded-[inherit] sm:min-h-[220px] lg:min-h-[220px]">
          <svg viewBox="0 0 560 300" className={cn('h-full w-full', active && 'wuv-scene-enter')} preserveAspectRatio="xMidYMid meet" aria-hidden>
            <defs>
              <linearGradient id={`wuv-se-transition-${uid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FECACA" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id={`wuv-se-clarity-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5F3FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Left panel — chaotic vendor cycle */}
            <rect x="12" y="16" width="248" height="268" rx="14" fill="#FEF2F2" fillOpacity="0.45" stroke="#FECACA" strokeWidth="1.2" />
            <text x="136" y="40" textAnchor="middle" fill="#DC2626" fontSize="8" fontWeight="700" letterSpacing="0.1em" fontFamily="system-ui,sans-serif">
              TOO COMMON
            </text>

            <g className={active ? 'wuv-story-experience__chaos' : undefined}>
              <WuvDesk x={48} y={196} w={120} />
              <WuvPerson x={104} y={108} variant="owner" facing="right" scale={0.92} />
              <WuvLaptop x={72} y={152} w={56} />
              <WuvPhone x={148} y={138} />

              <VendorChip x={28} y={56} label="Designer" />
              <VendorChip x={108} y={72} label="Developer" tone="warn" delay={0.6} />
              <VendorChip x={168} y={56} label="Agency" delay={1.2} />

              <path d="M64 84 C88 96, 120 88, 144 100" fill="none" stroke="#F87171" strokeWidth="1" strokeDasharray="3 4" className="wuv-story-experience__broken-line" />
              <path d="M180 84 C156 100, 128 92, 112 108" fill="none" stroke="#F87171" strokeWidth="1" strokeDasharray="3 4" className="wuv-story-experience__broken-line" />
              <path d="M136 100 C120 120, 108 132, 104 148" fill="none" stroke="#F87171" strokeWidth="1" strokeDasharray="3 4" className="wuv-story-experience__broken-line" />

              <WuvChatBubble x={24} y={118} text="We'll get back…" />
              <rect x="28" y="224" width="96" height="40" rx="8" fill="#fff" stroke="#FECACA" strokeWidth="1.2" className="wuv-story-experience__deadline">
                <title>Deadline moved</title>
              </rect>
              <text x="40" y="242" fill="#DC2626" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
                Deadline moved
              </text>
              <text x="40" y="254" fill="#94A3B8" fontSize="7" fontFamily="system-ui,sans-serif">
                Again · no update
              </text>

              <rect x="156" y="168" width="72" height="48" rx="8" fill="#fff" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3" />
              <text x="168" y="188" fill="#94A3B8" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
                Incomplete
              </text>
              <text x="168" y="202" fill="#CBD5E1" fontSize="7" fontFamily="system-ui,sans-serif">
                handoff
              </text>

              <circle cx="196" cy="128" r="12" fill="#FEF2F2" stroke="#F87171" strokeWidth="1.2" className="wuv-story-experience__confusion" />
              <text x="196" y="132" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
                ?
              </text>
            </g>

            {/* Transition spine */}
            <line x1="280" y1="44" x2="280" y2="256" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
            <path
              d="M268 150 L280 138 L292 150 L280 162 Z"
              fill={`url(#wuv-se-transition-${uid})`}
              stroke="#7C3AED"
              strokeWidth="1"
              strokeOpacity="0.4"
              className="wuv-story-experience__arrow"
            />

            {/* Right panel — clarity with U&V */}
            <rect x="300" y="16" width="248" height="268" rx="14" fill={`url(#wuv-se-clarity-${uid})`} stroke="#C4B5FD" strokeWidth="1.2" />
            <text x="424" y="40" textAnchor="middle" fill="#7C3AED" fontSize="8" fontWeight="700" letterSpacing="0.1em" fontFamily="system-ui,sans-serif">
              WITH U&amp;V
            </text>

            <g className={active ? 'wuv-story-experience__clarity' : undefined}>
              <WuvMeetingTable x={332} y={188} w={184} />
              <WuvPerson x={364} y={100} variant="owner" facing="right" scale={0.9} />
              <WuvPerson x={472} y={100} variant="consultant" facing="left" scale={0.9} />
              <path
                d="M428 148 c10-6 24-6 34 0"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="2"
                strokeLinecap="round"
                className="wuv-scene-handshake"
              />
              <WuvDocument x={408} y={136} signed />
              <WuvChatBubble x={312} y={52} text="Reply within 2 hrs" />

              <rect x="320" y="224" width="208" height="44" rx="10" fill="#fff" stroke="#C4B5FD" strokeWidth="1.2" />
              <text x="336" y="240" fill="#64748B" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
                Delivery timeline
              </text>
              <rect x="336" y="248" width="176" height="6" rx="3" fill="#E2E8F0" />
              <rect x="336" y="248" width="128" height="6" rx="3" fill="#7C3AED" fillOpacity="0.55" className="wuv-story-experience__progress" />
              {['Scope', 'Build', 'Launch'].map((step, i) => (
                <g key={step}>
                  <circle cx={356 + i * 56} cy="251" r="4" fill={i < 2 ? '#7C3AED' : '#CBD5E1'} />
                  <text x={356 + i * 56} y="266" textAnchor="middle" fill="#64748B" fontSize="6.5" fontFamily="system-ui,sans-serif">
                    {step}
                  </text>
                </g>
              ))}

              <rect x="468" y="168" width="64" height="24" rx="12" fill="#7C3AED" fillOpacity="0.1" stroke="#7C3AED" strokeWidth="1.2" className="wuv-story-experience__support">
                <title>Support continues after launch</title>
              </rect>
              <circle cx="478" cy="180" r="3" fill="#22C55E" className="wuv-story-experience__live-dot" />
              <text x="488" y="183" fill="#1E3A8A" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
                Support on
              </text>
            </g>
          </svg>
        </WuvSceneBackdrop>
        <div className="wuv-premium-frame-ring pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40" aria-hidden />
    </div>
  );
}
