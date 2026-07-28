'use client';

import { useId, type ReactNode } from 'react';

type IndustryKey =
  | 'healthcare'
  | 'education'
  | 'finance'
  | 'travel'
  | 'hospitality'
  | 'logistics';

const themes: Record<IndustryKey, { accent: string; secondary: string }> = {
  healthcare: { accent: '#0EA5E9', secondary: '#38BDF8' },
  education: { accent: '#6366F1', secondary: '#818CF8' },
  finance: { accent: '#1E3A8A', secondary: '#3B82F6' },
  travel: { accent: '#7C3AED', secondary: '#A78BFA' },
  hospitality: { accent: '#8B5CF6', secondary: '#C4B5FD' },
  logistics: { accent: '#3B82F6', secondary: '#60A5FA' },
};

function IsoCard({
  x,
  y,
  w,
  h,
  accent,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  accent: string;
  children?: ReactNode;
}) {
  const depth = 8;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={`M0 ${depth} L${depth} 0 L${w + depth} 0 L${w} ${depth} L${w} ${h + depth} L${depth} ${h + depth * 2} L0 ${h + depth} Z`}
        fill={accent}
        fillOpacity="0.12"
      />
      <rect x="0" y={depth} width={w} height={h} rx="6" fill="#fff" stroke="#E2E8F0" strokeWidth="1.2" />
      {children}
    </g>
  );
}

export function WuvIndustryScene({
  industry,
  active = false,
}: {
  industry: IndustryKey;
  active?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const theme = themes[industry];

  const scenes: Record<IndustryKey, ReactNode> = {
    healthcare: (
      <>
        <IsoCard x={20} y={30} w={100} h={64} accent={theme.accent}>
          <rect x="12" y="22" width="48" height="6" rx="3" fill={theme.accent} fillOpacity="0.5" />
          <rect x="12" y="34" width="76" height="4" rx="2" fill="#CBD5E1" />
          <rect x="12" y="44" width="60" height="4" rx="2" fill="#CBD5E1" />
          <path d="M12 58 h76" stroke={theme.accent} strokeWidth="2" strokeOpacity="0.4" />
        </IsoCard>
        <g className={active ? 'wuv-industry-pulse' : undefined}>
          <circle cx="168" cy="72" r="28" fill={theme.accent} fillOpacity="0.15" stroke={theme.accent} strokeWidth="1.5" />
          <path d="M168 62 v20 M158 72 h20" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <path
          d="M80 90 Q120 70 150 78"
          fill="none"
          stroke={theme.secondary}
          strokeWidth="2"
          strokeDasharray="4 4"
          className={active ? 'wuv-industry-heartbeat' : undefined}
        />
        <rect x="130" y="100" width="56" height="28" rx="6" fill="#fff" stroke="#E2E8F0" />
        <circle cx="142" cy="114" r="4" fill="#22C55E" />
        <text x="152" y="117" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">Live</text>
      </>
    ),
    education: (
      <>
        <IsoCard x={24} y={28} w={108} h={70} accent={theme.accent}>
          <rect x="14" y="20" width="80" height="5" rx="2.5" fill={theme.accent} fillOpacity="0.45" />
          <rect x="14" y="32" width="60" height="4" rx="2" fill="#CBD5E1" />
          <rect x="14" y="42" width="72" height="4" rx="2" fill="#CBD5E1" />
          <rect x="14" y="54" width="48" height="6" rx="3" fill={theme.secondary} fillOpacity="0.35" />
        </IsoCard>
        <g transform="translate(150, 48)" className={active ? 'wuv-industry-float' : undefined}>
          <path d="M0 24 L20 12 L40 24 L40 44 L20 56 L0 44 Z" fill={theme.accent} fillOpacity="0.2" stroke={theme.accent} strokeWidth="1.5" />
          <rect x="16" y="8" width="8" height="10" rx="1" fill={theme.accent} fillOpacity="0.5" />
        </g>
        <rect x="36" y="108" width="120" height="6" rx="3" fill="#E2E8F0" />
        <rect x="36" y="108" width="72" height="6" rx="3" fill={theme.accent} fillOpacity="0.5" className={active ? 'wuv-industry-progress' : undefined} />
      </>
    ),
    finance: (
      <>
        <IsoCard x={18} y={32} w={96} h={60} accent={theme.accent}>
          <rect x="12" y="18" width="72" height="28" rx="4" fill="#F8FAFC" stroke="#E2E8F0" />
          <path d="M20 38 L36 28 L52 34 L72 22" fill="none" stroke={theme.accent} strokeWidth="2" className={active ? 'wuv-industry-chart' : undefined} />
        </IsoCard>
        <g transform="translate(130, 40)">
          <rect x="0" y="8" width="64" height="48" rx="8" fill="#fff" stroke={theme.accent} strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="32" cy="28" r="12" fill={theme.accent} fillOpacity="0.15" />
          <path d="M26 28 h12 M32 22 v12" stroke={theme.accent} strokeWidth="1.5" />
          <path d="M12 44 h40" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
        </g>
        <rect x="48" y="104" width="16" height="20" rx="3" fill={theme.accent} fillOpacity="0.25" stroke={theme.accent} strokeWidth="1" />
        <text x="72" y="118" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">Secured</text>
      </>
    ),
    travel: (
      <>
        <IsoCard x={22} y={34} w={104} h={58} accent={theme.accent}>
          <rect x="14" y="16" width="76" height="10" rx="2" fill={theme.accent} fillOpacity="0.3" stroke={theme.accent} strokeWidth="1" strokeDasharray="3 2" />
          <rect x="14" y="32" width="52" height="5" rx="2.5" fill="#CBD5E1" />
          <rect x="14" y="42" width="68" height="4" rx="2" fill="#CBD5E1" />
        </IsoCard>
        <g className={active ? 'wuv-industry-float' : undefined} style={{ animationDelay: '0.3s' }}>
          <path d="M148 56 L172 48 L196 56 L188 64 L156 64 Z" fill={theme.accent} fillOpacity="0.25" stroke={theme.accent} strokeWidth="1.2" />
          <path d="M172 48 L180 40" stroke={theme.secondary} strokeWidth="1.5" />
        </g>
        <path d="M60 100 Q110 80 160 96" fill="none" stroke={theme.secondary} strokeWidth="2" strokeDasharray="5 4" className={active ? 'wuv-industry-route' : undefined} />
        <circle cx="160" cy="96" r="5" fill={theme.accent} />
      </>
    ),
    hospitality: (
      <>
        <IsoCard x={20} y={30} w={88} h={68} accent={theme.accent}>
          <rect x="12" y="18" width="20" height="36" rx="2" fill={theme.accent} fillOpacity="0.15" stroke={theme.accent} strokeWidth="1" />
          <rect x="36" y="18" width="20" height="36" rx="2" fill={theme.accent} fillOpacity="0.1" stroke="#E2E8F0" />
          <rect x="60" y="18" width="16" height="36" rx="2" fill="#22C55E" fillOpacity="0.2" stroke="#22C55E" strokeWidth="1" />
        </IsoCard>
        <g transform="translate(128, 44)" className={active ? 'wuv-industry-pulse' : undefined}>
          <path d="M0 32 L16 16 L32 32 Z" fill={theme.accent} fillOpacity="0.2" stroke={theme.accent} strokeWidth="1.5" />
          <rect x="10" y="32" width="12" height="8" rx="2" fill={theme.accent} fillOpacity="0.35" />
        </g>
        <circle cx="168" cy="108" r="14" fill="#fff" stroke={theme.accent} strokeWidth="1.5" />
        <path d="M162 108 h12 M168 102 v12" stroke={theme.accent} strokeWidth="1.5" />
      </>
    ),
    logistics: (
      <>
        <IsoCard x={16} y={36} w={92} h={56} accent={theme.accent}>
          <path d="M12 36 h56 l8-12 h20 v12" fill="none" stroke={theme.accent} strokeWidth="1.8" />
          <circle cx="28" cy="38" r="6" fill="#fff" stroke={theme.accent} strokeWidth="1.5" />
          <circle cx="68" cy="38" r="6" fill="#fff" stroke={theme.accent} strokeWidth="1.5" />
        </IsoCard>
        <rect x="120" y="48" width="72" height="48" rx="6" fill="#fff" stroke="#E2E8F0" />
        <path d="M132 72 h48 M132 82 h32" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <circle cx="156" cy="60" r="4" fill="#22C55E" className={active ? 'wuv-industry-pulse' : undefined} />
        <path d="M48 104 Q100 88 152 100" fill="none" stroke={theme.secondary} strokeWidth="2" strokeDasharray="4 4" className={active ? 'wuv-industry-route' : undefined} />
        <rect x="140" y="96" width="24" height="16" rx="3" fill={theme.accent} fillOpacity="0.2" stroke={theme.accent} strokeWidth="1" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 220 140"
      className="h-full w-full"
      aria-hidden
      role="presentation"
    >
      <defs>
        <linearGradient id={`wuv-ind-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor={theme.secondary} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="220" height="140" fill={`url(#wuv-ind-${uid})`} />
      {scenes[industry]}
    </svg>
  );
}
