'use client';

import {
  Component,
  useEffect,
  useId,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react';

import { cn } from '@uandv/ui';

import type { CaseStudy } from '@/lib/portfolio';

import {
  FALLBACK_PORTFOLIO_ACCENT,
  getPortfolioAccentForStudy,
  type PortfolioAccent,
} from './portfolio-concept-accents';

function useReducedMotionPref() {
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

/** Continuous in-view so story loops pause when the card leaves the viewport. */
function useStoryActive(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, threshold]);

  return { ref, active: reduced ? false : active };
}

type Tone = { a: string; b: string; glow: string };

function ProgressBar({
  x,
  y,
  w,
  accent,
  fill = 0.72,
}: {
  x: number;
  y: number;
  w: number;
  accent: string;
  fill?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="5" rx="2.5" fill="#E2E8F0" />
      <rect
        x={x}
        y={y}
        width={w * fill}
        height="5"
        rx="2.5"
        fill={accent}
        fillOpacity="0.85"
        className="wuv-banner-progress"
      />
    </g>
  );
}

function CheckMark({
  cx,
  cy,
  accent,
}: {
  cx: number;
  cy: number;
  accent: string;
}) {
  return (
    <g className="wuv-banner-check">
      <circle cx={cx} cy={cy} r="11" fill={accent} fillOpacity="0.18" />
      <circle cx={cx} cy={cy} r="7" fill={accent} fillOpacity="0.9" />
      <path
        d={`M${cx - 3.2} ${cy} l2.2 2.2 4.8-5`}
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function StatusChip({
  x,
  y,
  w = 36,
  accent,
  soft,
}: {
  x: number;
  y: number;
  w?: number;
  accent: string;
  soft?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height="12"
        rx="6"
        fill={soft ? accent : accent}
        fillOpacity={soft ? 0.12 : 0.88}
      />
      <rect
        x={x + 5}
        y={y + 4}
        width={w - 14}
        height="4"
        rx="2"
        fill={soft ? accent : '#fff'}
        fillOpacity={soft ? 0.55 : 0.92}
      />
    </g>
  );
}

function UiRow({
  x,
  y,
  w,
  accent,
  opacity = 0.12,
}: {
  x: number;
  y: number;
  w: number;
  accent: string;
  opacity?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={10} height="10" rx="3" fill={accent} fillOpacity={opacity + 0.2} />
      <rect x={x + 14} y={y + 1} width={w * 0.55} height="4" rx="2" fill="#CBD5E1" />
      <rect x={x + 14} y={y + 7} width={w * 0.38} height="3" rx="1.5" fill="#E2E8F0" />
    </g>
  );
}

/** Premium product-preview stage — full canvas for category-recognizable scenes. */
function SceneFrame({
  tone,
  children,
}: {
  tone: Tone;
  children: ReactNode;
}) {
  const uid = useId().replace(/:/g, '');
  const washId = `pc-wash-${uid}`;
  const glowId = `pc-glow-${uid}`;
  const glassId = `pc-glass-${uid}`;
  const shadowId = `pc-shadow-${uid}`;

  return (
    <svg viewBox="0 0 320 240" className="relative h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={washId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={tone.a} stopOpacity="0.2" />
          <stop offset="0.45" stopColor="#F8FAFC" stopOpacity="0.96" />
          <stop offset="1" stopColor={tone.b} stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id={glowId} cx="78%" cy="22%" r="55%">
          <stop stopColor={tone.a} stopOpacity="0.34" />
          <stop offset="1" stopColor={tone.a} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={glassId} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
        </linearGradient>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect width="320" height="240" fill={`url(#${washId})`} />
      <rect width="320" height="240" fill={`url(#${glowId})`} />
      <ellipse cx="168" cy="222" rx="118" ry="10" fill="#0F172A" fillOpacity="0.06" />
      <rect x="0" y="0" width="320" height="2.5" fill={tone.b} fillOpacity="0.5" />
      <g filter={`url(#${shadowId})`}>{children}</g>
      <rect
        x="0"
        y="0"
        width="320"
        height="52"
        fill={`url(#${glassId})`}
        opacity="0.42"
        pointerEvents="none"
      />
    </svg>
  );
}

/* ── Compact category silhouettes (industry-readable at a glance) ── */

function PersonFigure({
  x,
  y,
  accent,
  scale = 1,
  className,
}: {
  x: number;
  y: number;
  accent: string;
  scale?: number;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="10" cy="7" r="5.5" fill={accent} fillOpacity="0.85" />
      <path
        d="M1 28 C1 18, 19 18, 19 28"
        fill={accent}
        fillOpacity="0.75"
      />
    </g>
  );
}

function RiderFigure({
  x,
  y,
  accent,
  className,
}: {
  x: number;
  y: number;
  accent: string;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <circle cx="14" cy="8" r="5" fill={accent} fillOpacity="0.9" />
      <path d="M6 28 C6 18, 22 18, 22 28" fill={accent} fillOpacity="0.78" />
      <rect x="20" y="16" width="14" height="12" rx="3" fill={accent} fillOpacity="0.45" />
      <rect x="23" y="19" width="8" height="6" rx="1.5" fill="#fff" fillOpacity="0.55" />
      {/* scooter / bike cue */}
      <ellipse cx="10" cy="34" rx="7" ry="3" fill={accent} fillOpacity="0.35" />
      <circle cx="4" cy="34" r="3.5" fill="none" stroke={accent} strokeWidth="1.6" strokeOpacity="0.7" />
      <circle cx="18" cy="34" r="3.5" fill="none" stroke={accent} strokeWidth="1.6" strokeOpacity="0.7" />
    </g>
  );
}

function CarSilhouette({
  x,
  y,
  accent,
  className,
}: {
  x: number;
  y: number;
  accent: string;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <path
        d="M4 18 L10 8 H30 L38 18 H42 V26 H4 Z"
        fill={accent}
        fillOpacity="0.85"
      />
      <rect x="12" y="10" width="8" height="7" rx="1.5" fill="#fff" fillOpacity="0.45" />
      <rect x="22" y="10" width="7" height="7" rx="1.5" fill="#fff" fillOpacity="0.35" />
      <circle cx="12" cy="26" r="4" fill="#0F172A" fillOpacity="0.55" />
      <circle cx="34" cy="26" r="4" fill="#0F172A" fillOpacity="0.55" />
      <circle cx="12" cy="26" r="1.8" fill="#fff" fillOpacity="0.4" />
      <circle cx="34" cy="26" r="1.8" fill="#fff" fillOpacity="0.4" />
    </g>
  );
}

function HotelBuilding({
  x,
  y,
  accent,
  className,
}: {
  x: number;
  y: number;
  accent: string;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <rect width="36" height="48" rx="3" fill={accent} fillOpacity="0.75" />
      <rect x="12" y="36" width="12" height="12" rx="1" fill="#fff" fillOpacity="0.55" />
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`hw-${row}-${col}`}
            x={6 + col * 14}
            y={6 + row * 10}
            width="8"
            height="6"
            rx="1"
            fill="#fff"
            fillOpacity="0.4"
          />
        )),
      )}
      <rect x="-4" y="48" width="44" height="4" rx="1" fill={accent} fillOpacity="0.35" />
    </g>
  );
}

function AirplaneIcon({
  x,
  y,
  accent,
  className,
}: {
  x: number;
  y: number;
  accent: string;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <path
        d="M2 14 L22 10 L38 12 L22 14 L18 22 L14 14 L2 16 Z"
        fill={accent}
        fillOpacity="0.85"
      />
      <path d="M22 10 L28 2 L30 10" fill={accent} fillOpacity="0.55" />
    </g>
  );
}

function MedicalCross({
  cx,
  cy,
  accent,
  size = 10,
}: {
  cx: number;
  cy: number;
  accent: string;
  size?: number;
}) {
  const arm = size * 0.35;
  const thick = size * 0.28;
  return (
    <g>
      <circle cx={cx} cy={cy} r={size} fill={accent} fillOpacity="0.18" />
      <rect
        x={cx - thick / 2}
        y={cy - arm * 1.4}
        width={thick}
        height={arm * 2.8}
        rx={1}
        fill={accent}
        fillOpacity="0.85"
      />
      <rect
        x={cx - arm * 1.4}
        y={cy - thick / 2}
        width={arm * 2.8}
        height={thick}
        rx={1}
        fill={accent}
        fillOpacity="0.85"
      />
    </g>
  );
}

function HeadsetAgent({
  x,
  y,
  accent,
  className,
}: {
  x: number;
  y: number;
  accent: string;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <circle cx="16" cy="14" r="9" fill={accent} fillOpacity="0.8" />
      <path
        d="M4 14 C4 6, 28 6, 28 14"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeOpacity="0.7"
      />
      <rect x="1" y="12" width="6" height="10" rx="3" fill={accent} fillOpacity="0.9" />
      <rect x="25" y="12" width="6" height="10" rx="3" fill={accent} fillOpacity="0.9" />
      <path d="M6 36 C6 24, 26 24, 26 36" fill={accent} fillOpacity="0.7" />
      <circle cx="28" cy="22" r="3" fill={accent} fillOpacity="0.5" className="wuv-micro-pulse" />
    </g>
  );
}

function MiniChart({
  x,
  y,
  accent,
  soft,
}: {
  x: number;
  y: number;
  accent: string;
  soft: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {[0.45, 0.7, 0.55, 0.9, 0.65].map((h, i) => (
        <rect
          key={`bar-${i}`}
          x={i * 10}
          y={28 - h * 28}
          width="7"
          height={h * 28}
          rx="2"
          fill={i === 3 ? accent : soft}
          fillOpacity={i === 3 ? 0.85 : 0.35}
          className={i === 3 ? 'wuv-micro-shimmer' : undefined}
        />
      ))}
    </g>
  );
}

function CartIcon({
  x,
  y,
  accent,
}: {
  x: number;
  y: number;
  accent: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M2 4 H8 L12 22 H28 L32 10 H10"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="28" r="2.5" fill={accent} fillOpacity="0.85" />
      <circle cx="26" cy="28" r="2.5" fill={accent} fillOpacity="0.85" />
    </g>
  );
}

function PackageBox({
  x,
  y,
  accent,
  className,
}: {
  x: number;
  y: number;
  accent: string;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <rect width="28" height="24" rx="3" fill={accent} fillOpacity="0.55" />
      <path d="M0 8 H28" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M14 0 V24" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
    </g>
  );
}

function MapPin({
  cx,
  cy,
  accent,
  pulse,
}: {
  cx: number;
  cy: number;
  accent: string;
  pulse?: boolean;
}) {
  return (
    <g className={pulse ? 'wuv-micro-pulse' : undefined}>
      <path
        d={`M${cx} ${cy + 10} C${cx - 8} ${cy + 2}, ${cx - 8} ${cy - 6}, ${cx} ${cy - 10} C${cx + 8} ${cy - 6}, ${cx + 8} ${cy + 2}, ${cx} ${cy + 10} Z`}
        fill={accent}
        fillOpacity="0.85"
      />
      <circle cx={cx} cy={cy - 2} r="3" fill="#fff" fillOpacity="0.9" />
    </g>
  );
}

/** Phone bezel with notch + screen inset. */
function PhoneDevice({
  x,
  y,
  w = 78,
  h = 148,
  accent,
  children,
  className,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  accent: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="16" fill="#0F172A" />
      <rect
        x="1.5"
        y="1.5"
        width={w - 3}
        height={h - 3}
        rx="14.5"
        fill="#fff"
        stroke={accent}
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <rect x={w / 2 - 12} y="6" width="24" height="5" rx="2.5" fill="#0F172A" fillOpacity="0.85" />
      <rect x="6" y="16" width={w - 12} height={h - 28} rx="8" fill="#F8FAFC" />
      <g transform="translate(6, 16)">{children}</g>
      <rect
        x={w / 2 - 10}
        y={h - 8}
        width="20"
        height="3"
        rx="1.5"
        fill="#0F172A"
        fillOpacity="0.2"
      />
    </g>
  );
}

/** Browser / desktop window with traffic-light chrome. */
function BrowserWindow({
  x,
  y,
  w,
  h,
  accent,
  children,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  accent: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="12" fill="#fff" stroke={accent} strokeOpacity="0.28" />
      <rect width={w} height="18" rx="12" fill="#F1F5F9" />
      <rect y="10" width={w} height="8" fill="#F1F5F9" />
      <circle cx="12" cy="9" r="2.5" fill="#F87171" fillOpacity="0.85" />
      <circle cx="22" cy="9" r="2.5" fill="#FBBF24" fillOpacity="0.85" />
      <circle cx="32" cy="9" r="2.5" fill="#34D399" fillOpacity="0.85" />
      <rect x="44" y="5" width={Math.max(40, w - 58)} height="8" rx="4" fill="#E2E8F0" />
      <g transform="translate(0, 18)">{children}</g>
    </g>
  );
}

/** Floating glass card for secondary UI layers. */
function GlassCard({
  x,
  y,
  w,
  h,
  accent,
  children,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  accent: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <g className={className} transform={`translate(${x}, ${y})`}>
      <rect
        width={w}
        height={h}
        rx="12"
        fill="#fff"
        fillOpacity="0.92"
        stroke={accent}
        strokeOpacity="0.32"
      />
      <rect width={w} height="10" rx="12" fill={accent} fillOpacity="0.08" />
      {children}
    </g>
  );
}

/* ───────────────────── 15 category-recognizable product scenes ───────────────────── */

/** 1. Food delivery: rider + restaurant KDS + order app + tracking */
function RestaurantStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <PhoneDevice x={18} y={48} accent={b} className="wuv-micro-float" w={70} h={148}>
        <rect width="58" height="9" rx="3" fill={b} fillOpacity="0.55" />
        {/* Food item tiles */}
        <rect x="4" y="14" width="24" height="22" rx="6" fill={a} fillOpacity="0.28" />
        <circle cx="16" cy="24" r="6" fill={b} fillOpacity="0.4" />
        <rect x="32" y="14" width="24" height="22" rx="6" fill={a} fillOpacity="0.18" />
        <UiRow x={4} y={44} w={50} accent={b} />
        <UiRow x={4} y={60} w={50} accent={b} opacity={0.08} />
        <rect x="4" y="82" width="50" height="16" rx="8" fill={b} fillOpacity="0.85" />
        <rect x="14" y="87" width="30" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" />
        {/* Mini tracking path */}
        <path
          d="M8 112 C20 104, 36 118, 50 108"
          fill="none"
          stroke={b}
          strokeWidth="1.6"
          strokeDasharray="40"
          className="wuv-micro-path"
          style={{ ['--wuv-path-len' as string]: 40 }}
        />
        <MapPin cx={50} cy={106} accent={b} pulse />
      </PhoneDevice>

      {/* Restaurant storefront + KDS */}
      <g transform="translate(100, 52)">
        <rect width="108" height="36" rx="6" fill={b} fillOpacity="0.7" />
        <rect x="8" y="8" width="40" height="6" rx="2" fill="#fff" fillOpacity="0.55" />
        <rect x="56" y="6" width="44" height="24" rx="4" fill="#0F172A" fillOpacity="0.35" />
        <rect x="62" y="12" width="14" height="10" rx="2" fill={a} fillOpacity="0.7" />
        <rect x="80" y="12" width="14" height="10" rx="2" fill="#fff" fillOpacity="0.25" />
        <rect y="36" width="108" height="80" rx="10" fill="#0F172A" fillOpacity="0.92" />
        <rect x="10" y="48" width="36" height="5" rx="2.5" fill={a} fillOpacity="0.75" />
        {[0, 1].map((i) => (
          <g key={`kds-${i}`} transform={`translate(10, ${62 + i * 24})`}>
            <rect
              width="88"
              height="20"
              rx="5"
              fill="#fff"
              fillOpacity={i === 0 ? 0.14 : 0.08}
              className={i === 0 ? 'wuv-micro-shimmer' : undefined}
            />
            <rect x="6" y="5" width="30" height="4" rx="2" fill={a} fillOpacity="0.7" />
            <StatusChip x={58} y={4} w={24} accent={i === 0 ? b : '#64748B'} />
          </g>
        ))}
      </g>

      <RiderFigure x={228} y={78} accent={b} className="wuv-micro-float" />
      <GlassCard x={224} y={148} w={78} h={40} accent={b}>
        <CheckMark cx={40} cy={20} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 2. Travel booking: hotel + flight + itinerary + map + booking UI */
function TravelBookingStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={18} y={44} w={176} h={152} accent={b} className="wuv-micro-float">
        {/* Map + route */}
        <rect x="8" y="8" width="78" height="56" rx="8" fill={a} fillOpacity="0.2" />
        <path
          d="M18 48 C32 28, 48 50, 72 22"
          fill="none"
          stroke={b}
          strokeWidth="1.8"
          className="wuv-micro-path"
          style={{ ['--wuv-path-len' as string]: 70 }}
          strokeDasharray="70"
        />
        <MapPin cx={18} cy={46} accent={b} />
        <MapPin cx={72} cy={20} accent={b} pulse />
        {/* Booking form */}
        <rect x="94" y="10" width="70" height="6" rx="3" fill={b} fillOpacity="0.5" />
        <rect x="94" y="22" width="54" height="10" rx="4" fill="#E2E8F0" />
        <rect x="94" y="36" width="54" height="10" rx="4" fill="#E2E8F0" />
        <StatusChip x={94} y={50} w={40} accent={b} />
        {/* Itinerary: flight + hotel stops */}
        <rect x="8" y="74" width="160" height="54" rx="8" fill="#F8FAFC" stroke={b} strokeOpacity="0.15" />
        <AirplaneIcon x={14} y={86} accent={b} />
        <line x1="56" y1="100" x2="88" y2="100" stroke={b} strokeWidth="1.4" strokeOpacity="0.35" strokeDasharray="3 2" className="wuv-micro-connector" />
        <HotelBuilding x={94} y={80} accent={a} />
        <PersonFigure x={140} y={88} accent={b} scale={0.85} />
      </BrowserWindow>

      <GlassCard x={208} y={72} w={94} h={96} accent={b}>
        <AirplaneIcon x={12} y={18} accent={b} className="wuv-micro-float" />
        <rect x="12" y={48} width="70" height="5" rx="2.5" fill={b} fillOpacity="0.4" />
        <ProgressBar x={12} y={62} w={70} accent={b} fill={0.9} />
        <CheckMark cx={48} cy={82} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 3. MLM: people network + commission wallet + admin approve */
function MlmStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={18} y={44} w={160} h={156} accent={b}>
        {/* People genealogy — figures, not abstract dots */}
        <PersonFigure x={66} y={8} accent={b} scale={1.05} className="wuv-micro-pulse" />
        {[
          [18, 52],
          [66, 60],
          [114, 52],
        ].map(([px, py], i) => (
          <g key={`mlm-p-${i}`}>
            <line
              x1="76"
              y1="38"
              x2={px + 10}
              y2={py + 4}
              stroke={b}
              strokeWidth="1.3"
              strokeOpacity="0.4"
              strokeDasharray="4 3"
              className="wuv-micro-connector"
            />
            <PersonFigure x={px} y={py} accent={i === 1 ? a : b} scale={0.9} />
          </g>
        ))}
        <rect x="14" y={108} width="132" height="24" rx="8" fill={a} fillOpacity="0.12" />
        <rect x="24" y={116} width="56" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        <StatusChip x={96} y={114} w={36} accent={b} />
      </BrowserWindow>

      {/* Commission wallet */}
      <GlassCard x={190} y={52} w={112} h={64} accent={b} className="wuv-micro-float">
        <rect x="12" y="14" width="40" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        <rect x="12" y="28" width="88" height="24" rx="8" fill={a} fillOpacity="0.16" />
        <rect x="20" y="34" width="18" height="12" rx="3" fill={b} fillOpacity="0.7" />
        <rect x="44" y="36" width="44" height="6" rx="3" fill={b} fillOpacity="0.7" className="wuv-micro-shimmer" />
      </GlassCard>

      <GlassCard x={190} y={128} w={112} h={56} accent={b}>
        <PersonFigure x={12} y={10} accent={b} scale={0.75} />
        <rect x={40} y={16} width="52" height="5" rx="2.5" fill="#CBD5E1" />
        <rect x="12" y={36} width="88" height="12" rx="6" fill={b} fillOpacity="0.85" />
        <CheckMark cx={96} cy={18} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 4. Taxi: car + driver + booking map */
function MobilityStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <g transform="translate(16, 48)">
        <rect width="176" height="148" rx="14" fill="#ECFDF5" stroke={b} strokeOpacity="0.28" />
        <rect width="176" height="22" rx="14" fill={b} fillOpacity="0.12" />
        <rect y="14" width="176" height="8" fill={b} fillOpacity="0.12" />
        <rect x="12" y="8" width="52" height="6" rx="3" fill={b} fillOpacity="0.45" />
        <path d="M20 52 H156 M20 92 H156 M20 132 H110" stroke={b} strokeWidth="1" strokeOpacity="0.12" />
        <path d="M50 40 V156 M100 40 V156 M148 40 V120" stroke={b} strokeWidth="1" strokeOpacity="0.1" />
        <path
          d="M32 132 C70 78, 104 140, 152 68"
          fill="none"
          stroke={b}
          strokeWidth="2.2"
          strokeDasharray="130"
          className="wuv-micro-path wuv-banner-route"
          style={{ ['--wuv-path-len' as string]: 130 }}
        />
        <MapPin cx={32} cy={128} accent={b} />
        <CarSilhouette x={96} y={72} accent={b} className="wuv-micro-float" />
        {/* Bike / auto cue */}
        <g transform="translate(48, 88)">
          <circle cx="4" cy="10" r="4" fill="none" stroke={a} strokeWidth="1.6" strokeOpacity="0.7" />
          <circle cx="20" cy="10" r="4" fill="none" stroke={a} strokeWidth="1.6" strokeOpacity="0.7" />
          <path d="M4 10 L12 2 L20 10" fill="none" stroke={a} strokeWidth="1.5" strokeOpacity="0.7" />
        </g>
        <MapPin cx={152} cy={64} accent={b} pulse />
      </g>

      <PhoneDevice x={206} y={56} w={94} h={140} accent={b}>
        <PersonFigure x={28} y={8} accent={b} scale={0.9} />
        <rect x="8" y={42} width="62" height="5" rx="2.5" fill={b} fillOpacity="0.5" />
        <CarSilhouette x={18} y={54} accent={a} />
        <rect x="8" y={92} width="62" height="18" rx="8" fill={b} fillOpacity="0.85" />
        <rect x="20" y={98} width="38" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" />
        <CheckMark cx={39} cy={122} accent={b} />
      </PhoneDevice>
    </SceneFrame>
  );
}

/** 5. Enterprise ERP/CRM: pipeline + contacts + charts + ops */
function EnterpriseErpStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={14} y={42} w={192} h={160} accent={b}>
        <rect x="8" y="6" width="56" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        {[0, 1, 2].map((col) => (
          <g key={`pipe-${col}`} transform={`translate(${8 + col * 50}, 18)`}>
            <rect width="46" height="78" rx="7" fill="#F8FAFC" stroke={b} strokeOpacity="0.15" />
            <rect x="6" y="6" width="34" height="4" rx="2" fill={b} fillOpacity={0.3 + col * 0.15} />
            {[0, 1].map((card) => (
              <g key={`ec-${col}-${card}`} transform={`translate(5, ${16 + card * 28})`}>
                <rect
                  width="36"
                  height="24"
                  rx="5"
                  fill={a}
                  fillOpacity={col === 2 && card === 0 ? 0.3 : 0.12}
                  className={col === 2 && card === 0 ? 'wuv-micro-shimmer' : undefined}
                />
                <circle cx="10" cy="10" r="4" fill={b} fillOpacity="0.55" />
                <rect x="16" y="7" width="16" height="3" rx="1.5" fill="#CBD5E1" />
                <rect x="16" y="13" width="12" height="3" rx="1.5" fill="#E2E8F0" />
              </g>
            ))}
          </g>
        ))}
        <rect x="8" y="104" width="176" height="32" rx="8" fill={b} fillOpacity="0.08" />
        <MiniChart x={20} y={108} accent={b} soft={a} />
        <MiniChart x={90} y={108} accent={a} soft={b} />
        <rect x="150" y="112" width="26" height="20" rx="4" fill={b} fillOpacity="0.35" />
      </BrowserWindow>

      <GlassCard x={218} y={64} w={84} h={108} accent={b} className="wuv-micro-float">
        <PersonFigure x={28} y={12} accent={b} scale={0.85} />
        <MiniChart x={14} y={48} accent={b} soft={a} />
        <ProgressBar x={10} y={86} w={64} accent={b} fill={0.88} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 6. Travel tourism suite: flight + hotel + traveler booking */
function TravelOpsStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={16} y={44} w={168} h={152} accent={b}>
        <rect x="8" y="8" width="152" height="48" rx="8" fill={a} fillOpacity="0.14" />
        <AirplaneIcon x={16} y={18} accent={b} className="wuv-micro-float" />
        <path d="M58 32 H120" stroke={b} strokeWidth="1.4" strokeOpacity="0.35" strokeDasharray="3 2" className="wuv-micro-connector" />
        <circle cx="58" cy="32" r="3.5" fill={b} fillOpacity="0.6" />
        <circle cx="120" cy="32" r="3.5" fill={b} fillOpacity="0.85" className="wuv-micro-pulse" />
        <rect x="16" y="42" width="50" height="4" rx="2" fill="#CBD5E1" />
        <rect x="8" y="64" width="152" height="52" rx="8" fill="#F8FAFC" stroke={b} strokeOpacity="0.18" />
        <HotelBuilding x={18} y={70} accent={b} />
        <rect x={64} y={76} width="56" height="5" rx="2.5" fill={b} fillOpacity="0.4" />
        <rect x={64} y={86} width="40" height="4" rx="2" fill="#E2E8F0" />
        <PersonFigure x={128} y={78} accent={a} scale={0.9} />
        <StatusChip x={64} y={98} w={36} accent={b} soft />
      </BrowserWindow>

      <GlassCard x={196} y={56} w={106} h={56} accent={b} className="wuv-micro-float">
        <AirplaneIcon x={10} y={16} accent={b} />
        <rect x={52} y={22} width="42" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        <rect x="12" y={40} width="82" height="8" rx="4" fill={a} fillOpacity="0.18" className="wuv-micro-shimmer" />
      </GlassCard>

      <GlassCard x={196} y={124} w={106} h={60} accent={b}>
        <PersonFigure x={12} y={10} accent={b} scale={0.75} />
        <ProgressBar x={40} y={20} w={52} accent={b} fill={0.92} />
        <CheckMark cx={54} cy={44} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 7. Business ERP: warehouse/inventory + sales + reports */
function BusinessErpStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={16} y={44} w={152} h={152} accent={b}>
        <rect x="8" y="6" width="52" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        {/* Warehouse shelves + boxes */}
        <rect x="8" y="18" width="136" height="70" rx="8" fill="#F8FAFC" stroke={b} strokeOpacity="0.15" />
        {[0, 1, 2].map((shelf) => (
          <g key={`shelf-${shelf}`}>
            <line
              x1="16"
              y1={34 + shelf * 18}
              x2="136"
              y2={34 + shelf * 18}
              stroke={b}
              strokeWidth="1.5"
              strokeOpacity="0.2"
            />
            {[0, 1, 2, 3].map((box) => (
              <rect
                key={`box-${shelf}-${box}`}
                x={20 + box * 28}
                y={20 + shelf * 18}
                width="18"
                height="12"
                rx="2"
                fill={shelf === 1 && box === 2 ? b : a}
                fillOpacity={shelf === 1 && box === 2 ? 0.7 : 0.28}
                className={shelf === 1 && box === 2 ? 'wuv-micro-shimmer' : undefined}
              />
            ))}
          </g>
        ))}
        <rect x="8" y="98" width="136" height="30" rx="8" fill={b} fillOpacity="0.08" />
        <MiniChart x={20} y={100} accent={b} soft={a} />
        <rect x="90" y="106" width="44" height="14" rx="4" fill={b} fillOpacity="0.35" />
      </BrowserWindow>

      <GlassCard x={180} y={52} w={122} h={68} accent={b} className="wuv-micro-float">
        <PackageBox x={12} y={16} accent={b} />
        <UiRow x={48} y={20} w={62} accent={b} />
        <UiRow x={48} y={40} w={62} accent={b} opacity={0.08} />
      </GlassCard>

      <GlassCard x={180} y={132} w={122} h={52} accent={b}>
        <MiniChart x={12} y={10} accent={b} soft={a} />
        <CheckMark cx={100} cy={26} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 8. Ecommerce: products + cart + checkout + delivery box */
function EcommerceStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={14} y={46} w={140} h={150} accent={b}>
        {/* Product grid */}
        {[0, 1].map((row) =>
          [0, 1].map((col) => (
            <g key={`prod-${row}-${col}`} transform={`translate(${10 + col * 62}, ${10 + row * 52})`}>
              <rect
                width="54"
                height="46"
                rx="8"
                fill={a}
                fillOpacity={row === 0 && col === 0 ? 0.28 : 0.14}
                className={row === 0 && col === 0 ? 'wuv-micro-shimmer' : undefined}
              />
              <rect x="10" y="8" width="34" height="22" rx="5" fill={b} fillOpacity="0.3" />
              <rect x="12" y="34" width="24" height="4" rx="2" fill="#CBD5E1" />
            </g>
          )),
        )}
        <rect x="10" y="118" width="120" height="14" rx="7" fill={b} fillOpacity="0.85" />
        <rect x="40" y="122" width="60" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" />
      </BrowserWindow>

      <PhoneDevice x={164} y={48} w={74} h={136} accent={b} className="wuv-micro-float">
        <CartIcon x={16} y={8} accent={b} />
        <UiRow x={4} y={46} w={54} accent={b} />
        <UiRow x={4} y={62} w={54} accent={b} opacity={0.08} />
        <ProgressBar x={4} y={82} w={54} accent={b} fill={0.78} />
        <rect x="4" y="96" width="54" height="14" rx="7" fill={b} fillOpacity="0.85" />
      </PhoneDevice>

      <GlassCard x={248} y={78} w={56} h={80} accent={b}>
        <PackageBox x={14} y={14} accent={b} className="wuv-micro-float" />
        <CheckMark cx={28} cy={58} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 9. Hotel: building + rooms + reception desk UI */
function HotelStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <HotelBuilding x={22} y={56} accent={b} className="wuv-micro-float" />
      <BrowserWindow x={68} y={44} w={148} h={152} accent={b}>
        <rect x="8" y="6" width="56" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        {/* Reception desk UI */}
        <rect x="8" y="18" width="132" height="36" rx="8" fill={a} fillOpacity="0.14" />
        <PersonFigure x={18} y={22} accent={b} scale={0.8} />
        <rect x={48} y={26} width="48" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        <rect x={48} y={36} width="36" height="4" rx="2" fill="#E2E8F0" />
        <StatusChip x={100} y={28} w={28} accent={b} />
        {/* Room keys / status */}
        {[0, 1, 2].map((i) => (
          <g key={`room-${i}`} transform={`translate(8, ${64 + i * 22})`}>
            <rect width="132" height="18" rx="5" fill="#F8FAFC" stroke={b} strokeOpacity="0.12" />
            <rect x="6" y="4" width="14" height="10" rx="2" fill={a} fillOpacity={0.25 + i * 0.15} />
            <rect x="26" y="5" width="40" height="4" rx="2" fill="#CBD5E1" />
            <StatusChip x={96} y={3} w={28} accent={i === 1 ? b : '#94A3B8'} soft={i !== 1} />
          </g>
        ))}
      </BrowserWindow>

      <GlassCard x={228} y={64} w={74} h={100} accent={b} className="wuv-micro-float">
        <g transform="translate(10, 22)">
          {[0, 1, 2].map((row) =>
            [0, 1].map((col) => (
              <rect
                key={`cal-${row}-${col}`}
                x={col * 26}
                y={row * 20}
                width="20"
                height="14"
                rx="3"
                fill={row === 1 && col === 0 ? b : a}
                fillOpacity={row === 1 && col === 0 ? 0.75 : 0.15}
                className={row === 1 && col === 0 ? 'wuv-micro-pulse' : undefined}
              />
            )),
          )}
        </g>
      </GlassCard>
    </SceneFrame>
  );
}

/** 10. AI support: headset agent + chat + AI assist */
function AiStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <HeadsetAgent x={22} y={56} accent={b} className="wuv-micro-float" />

      <BrowserWindow x={70} y={44} w={140} h={152} accent={b}>
        <rect x="8" y="6" width="44" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        {/* Chat bubbles */}
        <rect x="8" y="20" width="80" height="22" rx="10" fill="#F1F5F9" />
        <rect x="16" y="26" width="48" height="4" rx="2" fill="#CBD5E1" />
        <rect x="16" y="34" width="36" height="3" rx="1.5" fill="#E2E8F0" />
        <rect
          x="40"
          y="50"
          width="92"
          height="28"
          rx="10"
          fill={a}
          fillOpacity="0.22"
          className="wuv-micro-shimmer"
        />
        <rect x="50" y="58" width="56" height="4" rx="2" fill={b} fillOpacity="0.55" />
        <rect x="50" y="66" width="40" height="3" rx="1.5" fill={b} fillOpacity="0.35" />
        {/* AI spark badge */}
        <g transform="translate(8, 90)">
          <circle cx="14" cy="14" r="12" fill={b} fillOpacity="0.18" className="wuv-micro-pulse" />
          <path
            d="M14 6 L16 12 L22 14 L16 16 L14 22 L12 16 L6 14 L12 12 Z"
            fill={b}
            fillOpacity="0.85"
          />
          <rect x="32" y="8" width="70" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
          <rect x="32" y="18" width="54" height="4" rx="2" fill="#E2E8F0" />
        </g>
        <rect x="8" y="122" width="124" height="14" rx="7" fill={b} fillOpacity="0.85" />
        <rect x="36" y="126" width="68" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" />
      </BrowserWindow>

      <GlassCard x={222} y={70} w={80} h={96} accent={b} className="wuv-micro-float">
        <rect x="10" y="16" width="60" height="18" rx="8" fill="#F1F5F9" />
        <rect x="10" y="42" width="60" height="22" rx="8" fill={a} fillOpacity="0.2" />
        <CheckMark cx={40} cy={78} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 11. Corporate website: polished site on laptop + brand/services */
function WebsiteStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <g transform="translate(28, 48)">
        <rect width="200" height="122" rx="10" fill="#0F172A" />
        <rect x="6" y="6" width="188" height="104" rx="6" fill="#fff" />
        <rect x="6" y="6" width="188" height="14" rx="6" fill="#F1F5F9" />
        <rect x="6" y="14" width="188" height="6" fill="#F1F5F9" />
        <circle cx="16" cy="13" r="2" fill="#F87171" />
        <circle cx="24" cy="13" r="2" fill="#FBBF24" />
        <circle cx="32" cy="13" r="2" fill="#34D399" />
        {/* Brand mark */}
        <circle cx="28" cy="40" r="10" fill={b} fillOpacity="0.85" className="wuv-micro-pulse" />
        <rect x="44" y="34" width="60" height="7" rx="3" fill={b} fillOpacity="0.55" />
        <rect x="44" y="46" width="44" height="4" rx="2" fill="#CBD5E1" />
        <rect x="18" y="60" width="52" height="14" rx="7" fill={b} fillOpacity="0.85" />
        {/* Hero visual + services */}
        <rect x="120" y="28" width="64" height="52" rx="8" fill={a} fillOpacity="0.22" className="wuv-micro-shimmer" />
        <PersonFigure x={138} y={36} accent={b} scale={0.9} />
        {[0, 1, 2].map((i) => (
          <g key={`svc-${i}`}>
            <rect
              x={14 + i * 58}
              y="88"
              width="50"
              height="16"
              rx="5"
              fill={b}
              fillOpacity={0.12 + i * 0.1}
            />
            <circle cx={24 + i * 58} cy="96" r="3.5" fill={b} fillOpacity="0.45" />
          </g>
        ))}
        <rect x="24" y="122" width="152" height="8" rx="2" fill="#1E293B" />
        <rect x="0" y="130" width="200" height="6" rx="3" fill="#334155" />
      </g>

      <GlassCard x={242} y={72} w={60} h={88} accent={b} className="wuv-micro-float">
        <circle cx="30" cy="28" r="12" fill={b} fillOpacity="0.8" />
        <rect x="10" y="48" width="40" height="12" rx="6" fill={b} fillOpacity="0.85" />
        <rect x="16" y="52" width="28" height="4" rx="2" fill="#fff" fillOpacity="0.9" />
        <CheckMark cx={30} cy={72} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 12. Field ops: field worker + phone job + checklist */
function MobileAppStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      {/* Field worker silhouette */}
      <g transform="translate(18, 58)" className="wuv-micro-float">
        <circle cx="22" cy="14" r="10" fill={b} fillOpacity="0.85" />
        {/* hard-hat cue */}
        <path d="M10 12 C10 4, 34 4, 34 12" fill={b} fillOpacity="0.55" />
        <path d="M6 48 C6 28, 38 28, 38 48" fill={b} fillOpacity="0.75" />
        <rect x="28" y="30" width="16" height="22" rx="3" fill={a} fillOpacity="0.55" />
        <rect x="31" y="34" width="10" height="14" rx="2" fill="#fff" fillOpacity="0.45" />
      </g>

      <PhoneDevice x={78} y={42} w={92} h={160} accent={b} className="wuv-micro-float">
        <rect width="80" height="8" rx="3" fill={b} fillOpacity="0.5" />
        {[0, 1, 2].map((i) => (
          <g key={`job-${i}`} transform={`translate(4, ${18 + i * 36})`}>
            <rect
              width="72"
              height="30"
              rx="7"
              fill={i === 0 ? a : '#fff'}
              fillOpacity={i === 0 ? 0.2 : 1}
              stroke={b}
              strokeOpacity={i === 0 ? 0.4 : 0.15}
              className={i === 0 ? 'wuv-micro-shimmer' : undefined}
            />
            <circle cx="14" cy="14" r="6" fill={b} fillOpacity={i === 0 ? 0.7 : 0.3} />
            <rect x="26" y="8" width={36 - i * 4} height="4" rx="2" fill={b} fillOpacity="0.45" />
            <StatusChip x={26} y={16} w={28} accent={i === 0 ? b : '#94A3B8'} soft={i !== 0} />
          </g>
        ))}
      </PhoneDevice>

      <GlassCard x={188} y={52} w={110} h={112} accent={b}>
        <rect x="10" y="12" width="48" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        {[0, 1, 2].map((i) => (
          <g key={`chk-${i}`} transform={`translate(10, ${28 + i * 24})`}>
            <rect
              width="14"
              height="14"
              rx="3"
              fill={i < 2 ? b : '#E2E8F0'}
              fillOpacity={i < 2 ? 0.85 : 1}
              className={i === 1 ? 'wuv-banner-check' : undefined}
            />
            {i < 2 ? (
              <path
                d="M3.5 7 l3 3 5-5.5"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : null}
            <rect x="22" y="3" width={60 - i * 10} height="4" rx="2" fill="#CBD5E1" />
            <rect x="22" y="10" width="36" height="3" rx="1.5" fill="#E2E8F0" />
          </g>
        ))}
      </GlassCard>
    </SceneFrame>
  );
}

/** 13. Sales CRM: pipeline + contacts + charts */
function CrmStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={14} y={42} w={186} h={156} accent={b}>
        <rect x="8" y="6" width="56" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        {[0, 1, 2, 3].map((col) => (
          <g key={`crm-col-${col}`} transform={`translate(${8 + col * 44}, 18)`}>
            <rect width="40" height="88" rx="7" fill="#F8FAFC" stroke={b} strokeOpacity="0.12" />
            <rect x="4" y="6" width="32" height="4" rx="2" fill={b} fillOpacity={0.25 + col * 0.12} />
            {[0, 1].map((card) => (
              <g key={`crm-c-${col}-${card}`} transform={`translate(4, ${16 + card * 30})`}>
                <rect
                  width="32"
                  height="26"
                  rx="5"
                  fill={a}
                  fillOpacity={col === 2 && card === 0 ? 0.35 : 0.12}
                  className={col === 2 && card === 0 ? 'wuv-micro-shimmer' : undefined}
                />
                <circle cx="10" cy="10" r="4.5" fill={b} fillOpacity="0.6" />
                <rect x="16" y="7" width="12" height="3" rx="1.5" fill="#CBD5E1" />
                <rect x="16" y="13" width="10" height="3" rx="1.5" fill="#E2E8F0" />
              </g>
            ))}
            {col === 3 ? (
              <rect
                x="4"
                y="76"
                width="32"
                height="8"
                rx="3"
                fill={b}
                fillOpacity="0.55"
                className="wuv-micro-float"
              />
            ) : null}
          </g>
        ))}
        <rect x="8" y="116" width="170" height="22" rx="6" fill={b} fillOpacity="0.08" />
        <MiniChart x={24} y={116} accent={b} soft={a} />
      </BrowserWindow>

      <GlassCard x={212} y={56} w={90} h={80} accent={b} className="wuv-micro-float">
        <PersonFigure x={30} y={10} accent={b} scale={0.85} />
        <rect x="10" y="46" width="70" height="5" rx="2.5" fill={b} fillOpacity="0.4" />
        <StatusChip x={10} y={58} w={40} accent={b} />
      </GlassCard>

      <GlassCard x={212} y={148} w={90} h={36} accent={b}>
        <CheckMark cx={46} cy={18} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 14. Hospital: doctor/patient + appointment + medical dashboard */
function HospitalStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      {/* Doctor + patient figures */}
      <g transform="translate(16, 70)">
        <PersonFigure x={0} y={0} accent={b} scale={1.1} />
        <MedicalCross cx={12} cy={-6} accent={b} size={8} />
        <PersonFigure x={28} y={8} accent={a} scale={0.95} />
      </g>

      <BrowserWindow x={78} y={42} w={148} h={156} accent={b}>
        <rect x="8" y="6" width="56" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        <MedicalCross cx={132} cy={16} accent={b} size={9} />
        {[0, 1, 2].map((i) => (
          <g key={`appt-${i}`} transform={`translate(8, ${24 + i * 34})`}>
            <rect
              width="132"
              height="28"
              rx="7"
              fill={i === 0 ? a : '#F8FAFC'}
              fillOpacity={i === 0 ? 0.2 : 1}
              stroke={b}
              strokeOpacity="0.15"
              className={i === 0 ? 'wuv-micro-shimmer' : undefined}
            />
            <circle cx="14" cy="14" r="7" fill={b} fillOpacity={i === 0 ? 0.55 : 0.25} />
            <rect x="28" y="6" width={48 - i * 6} height="4" rx="2" fill="#CBD5E1" />
            <rect x="28" y="14" width="32" height="3" rx="1.5" fill="#E2E8F0" />
            <StatusChip x={96} y={8} w={28} accent={i === 0 ? b : '#94A3B8'} soft={i !== 0} />
          </g>
        ))}
      </BrowserWindow>

      <GlassCard x={236} y={56} w={68} h={100} accent={b} className="wuv-micro-float">
        <MedicalCross cx={34} cy={28} accent={b} size={14} />
        <ProgressBar x={8} y={56} w={52} accent={b} fill={0.9} />
        <CheckMark cx={34} cy={80} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

/** 15. School ERP: student + teacher + attendance + fees */
function SchoolStory({ tone }: { tone: Tone }) {
  const { a, b } = tone;
  return (
    <SceneFrame tone={tone}>
      <BrowserWindow x={16} y={42} w={168} h={156} accent={b}>
        <rect x="8" y="6" width="52" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        {/* Teacher + students */}
        <rect x="8" y="18" width="152" height="56" rx="8" fill={a} fillOpacity="0.14" />
        <PersonFigure x={20} y={24} accent={b} scale={1} />
        <rect x="48" y="28" width="36" height="4" rx="2" fill={b} fillOpacity="0.45" />
        <rect x="48" y="36" width="28" height="3" rx="1.5" fill="#E2E8F0" />
        {[0, 1, 2].map((i) => (
          <PersonFigure
            key={`stu-${i}`}
            x={100 + i * 18}
            y={34}
            accent={i === 1 ? b : a}
            scale={0.7}
          />
        ))}
        {/* Attendance grid */}
        <rect x="8" y="82" width="152" height="32" rx="8" fill={b} fillOpacity="0.08" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={`att-${i}`}
            x={16 + i * 20}
            y="90"
            width="14"
            height="16"
            rx="3"
            fill={i < 6 ? b : a}
            fillOpacity={i < 6 ? 0.55 : 0.25}
            className={i === 5 ? 'wuv-micro-pulse' : undefined}
          />
        ))}
        {/* Fees row */}
        <rect x="8" y="122" width="152" height="16" rx="6" fill="#F8FAFC" stroke={b} strokeOpacity="0.15" />
        <rect x="16" y="126" width="40" height="5" rx="2.5" fill={b} fillOpacity="0.45" />
        <StatusChip x={112} y={124} w={36} accent={b} />
      </BrowserWindow>

      <GlassCard x={196} y={52} w={106} h={72} accent={b} className="wuv-micro-float">
        <PersonFigure x={12} y={14} accent={b} scale={0.85} />
        <rect x={40} y={20} width="50" height="5" rx="2.5" fill={b} fillOpacity="0.4" />
        <ProgressBar x={12} y={48} w={82} accent={b} fill={0.72} />
      </GlassCard>

      <GlassCard x={196} y={136} w={106} h={48} accent={b}>
        <rect x="12" y="12" width="48" height="5" rx="2.5" fill="#CBD5E1" />
        <StatusChip x={12} y={26} w={44} accent={b} />
        <CheckMark cx={84} cy={24} accent={b} />
      </GlassCard>
    </SceneFrame>
  );
}

const storyBySlug: Record<
  string,
  { label: string; Scene: (props: { tone: Tone }) => ReactNode }
> = {
  'restaurant-ordering-platform': {
    label: 'Food delivery app with rider, restaurant kitchen, and order tracking',
    Scene: RestaurantStory,
  },
  'travel-booking-website': {
    label: 'Travel booking with hotel, flight, itinerary, and map',
    Scene: TravelBookingStory,
  },
  'mlm-management-software': {
    label: 'MLM people network, commission wallet, and payout approval',
    Scene: MlmStory,
  },
  'taxi-booking-application': {
    label: 'Taxi booking map with car, driver, and trip accept',
    Scene: MobilityStory,
  },
  'enterprise-erp-crm-software': {
    label: 'Enterprise CRM pipeline, contacts, charts, and ops dashboard',
    Scene: EnterpriseErpStory,
  },
  'travel-tourism-management-suite': {
    label: 'Travel ops with flight, hotel, and traveler booking',
    Scene: TravelOpsStory,
  },
  'business-erp-system': {
    label: 'Business ERP warehouse inventory, sales, and reports',
    Scene: BusinessErpStory,
  },
  'ecommerce-store': {
    label: 'Ecommerce products, cart checkout, and delivery box',
    Scene: EcommerceStory,
  },
  'hotel-management-software': {
    label: 'Hotel building, room status, and reception desk UI',
    Scene: HotelStory,
  },
  'ai-customer-support-automation': {
    label: 'Support agent with headset, chat, and AI assist',
    Scene: AiStory,
  },
  'corporate-website-platform': {
    label: 'Corporate website on laptop with brand and services',
    Scene: WebsiteStory,
  },
  'field-operations-mobile-app': {
    label: 'Field worker with phone job queue and checklist',
    Scene: MobileAppStory,
  },
  'sales-crm-platform': {
    label: 'Sales CRM pipeline with contacts and charts',
    Scene: CrmStory,
  },
  'hospital-management-system': {
    label: 'Hospital doctor, patient, appointments, and medical dashboard',
    Scene: HospitalStory,
  },
  'school-erp-platform': {
    label: 'School ERP with student, teacher, attendance, and fees',
    Scene: SchoolStory,
  },
};

type StoryEntry = {
  label: string;
  Scene: (props: { tone: Tone }) => ReactNode;
};

const FALLBACK_STORY: StoryEntry = {
  label: 'Solution product preview',
  Scene: WebsiteStory,
};

function toneFromAccent(accent: PortfolioAccent): Tone {
  return {
    a: accent.a || FALLBACK_PORTFOLIO_ACCENT.a,
    b: accent.b || FALLBACK_PORTFOLIO_ACCENT.b,
    glow: accent.glow || FALLBACK_PORTFOLIO_ACCENT.glow,
  };
}

function resolveStoryEntry(
  study: Pick<CaseStudy, 'slug' | 'title'> | null | undefined,
): StoryEntry {
  const slug = study?.slug;
  const mapped = slug ? storyBySlug[slug] : undefined;
  if (mapped?.Scene) {
    return {
      label: mapped.label || `${study?.title ?? 'Concept'} product preview`,
      Scene: mapped.Scene,
    };
  }
  return {
    label: study?.title
      ? `${study.title} product preview`
      : FALLBACK_STORY.label,
    Scene: FALLBACK_STORY.Scene,
  };
}

/** Isolates one broken banner so the rest of the portfolio page still renders. */
class PortfolioStoryErrorBoundary extends Component<
  { children: ReactNode; fallbackTone: Tone },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[PortfolioConceptStory]', error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return <WebsiteStory tone={this.props.fallbackTone} />;
    }
    return this.props.children;
  }
}

export function PortfolioConceptStory({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  const { ref, active } = useStoryActive();
  const accent = getPortfolioAccentForStudy(study) || FALLBACK_PORTFOLIO_ACCENT;
  const tone = toneFromAccent(accent);
  const entry = resolveStoryEntry(study);
  const Scene = entry.Scene || FALLBACK_STORY.Scene;
  const label = entry.label || FALLBACK_STORY.label;

  return (
    <div
      ref={ref}
      className={cn(
        'portfolio-concept-story wuv-micro-scene relative aspect-[4/3] w-full overflow-hidden bg-uv-background-muted',
        active && 'is-active',
        className,
      )}
      role="img"
      aria-label={label}
      style={{ ['--pc-story-accent' as string]: tone.b }}
    >
      <div className="absolute inset-0 marketing-grain opacity-50" aria-hidden />
      <PortfolioStoryErrorBoundary fallbackTone={tone}>
        <Scene tone={tone} />
      </PortfolioStoryErrorBoundary>
    </div>
  );
}
