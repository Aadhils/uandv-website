'use client';

import { useId, type ReactNode } from 'react';

import { cn } from '@uandv/ui';

import { useInView } from './wuv-motion';

type IllustrationProps = {
  className?: string;
  title?: string;
};

function Frame({
  children,
  className,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        'wuv-illus-frame relative overflow-hidden rounded-2xl border border-uv-brand/10 bg-gradient-to-br from-white via-[#f8f7ff] to-[#eef4ff] shadow-[0_12px_40px_rgb(30_58_138_/_0.07)]',
        glow && 'wuv-illus-frame--glow',
        className,
      )}
    >
      {children}
    </div>
  );
}

const heroStages = [
  { label: 'Discovery', color: '#7C3AED', x: 130 },
  { label: 'Planning', color: '#6366F1', x: 210 },
  { label: 'Build', color: '#3B82F6', x: 290 },
  { label: 'Launch', color: '#0EA5E9', x: 370 },
  { label: 'Support', color: '#8B5CF6', x: 450 },
  { label: 'Growth', color: '#1E3A8A', x: 530 },
] as const;

export function WuvHeroPartnershipIllustration({ className }: IllustrationProps) {
  const uid = useId().replace(/:/g, '');
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Frame className={cn('wuv-hero-3d', inView && 'is-animated', className)} glow>
      <div ref={ref} className="relative h-full w-full">
        <svg
          viewBox="0 0 640 400"
          className="h-full w-full"
          role="img"
          aria-label="U&V partnership journey from discovery through growth"
        >
          <defs>
            <linearGradient id={`wuv-hg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.06" />
            </linearGradient>
            <filter id={`wuv-shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E3A8A" floodOpacity="0.12" />
            </filter>
          </defs>
          <rect width="640" height="400" fill={`url(#wuv-hg-${uid})`} />

          {/* Isometric base platform */}
          <path
            d="M56 300 L320 340 L584 300 L320 260 Z"
            fill="#fff"
            stroke="#E2E8F0"
            strokeWidth="1"
            opacity="0.9"
          />

          {/* Business owner card */}
          <g filter={`url(#wuv-shadow-${uid})`} className={inView ? 'wuv-hero-node' : undefined} style={{ animationDelay: '0ms' }}>
            <rect x="48" y="168" width="72" height="52" rx="8" fill="#fff" stroke="#1E3A8A" strokeWidth="1.5" strokeOpacity="0.25" />
            <circle cx="68" cy="188" r="10" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1.2" />
            <rect x="84" y="182" width="28" height="4" rx="2" fill="#CBD5E1" />
            <rect x="84" y="192" width="20" height="3" rx="1.5" fill="#E2E8F0" />
            <text x="84" y="210" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Owner</text>
          </g>

          {/* Journey nodes */}
          {heroStages.map((node, i) => (
            <g
              key={node.label}
              filter={`url(#wuv-shadow-${uid})`}
              className={inView ? 'wuv-hero-node' : undefined}
              style={{ animationDelay: `${120 + i * 100}ms` }}
            >
              {/* connector */}
              {i === 0 ? (
                <path
                  d={`M120 194 L${node.x - 20} 194`}
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className={inView ? 'wuv-hero-connector' : undefined}
                />
              ) : (
                <path
                  d={`M${heroStages[i - 1].x + 28} 194 L${node.x - 12} 194`}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className={inView ? 'wuv-hero-connector' : undefined}
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                />
              )}
              {/* floating card */}
              <rect
                x={node.x - 28}
                y={168}
                width="56"
                height="52"
                rx="8"
                fill="#fff"
                stroke={node.color}
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <circle cx={node.x} cy="182" r="8" fill={node.color} fillOpacity="0.2" />
              <text x={node.x} y="186" textAnchor="middle" fill={node.color} fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">
                {i + 1}
              </text>
              <text x={node.x} y="208" textAnchor="middle" fill="#334155" fontSize="7.5" fontFamily="system-ui,sans-serif">
                {node.label}
              </text>
              {/* status dot */}
              <circle cx={node.x + 20} cy={176} r="3" fill="#22C55E" className={inView ? 'wuv-hero-status' : undefined} />
            </g>
          ))}

          {/* Floating UI panel */}
          <g className={inView ? 'wuv-hero-float' : undefined}>
            <rect x="72" y="108" width="140" height="44" rx="8" fill="#fff" stroke="#E2E8F0" strokeWidth="1" opacity="0.95" />
            <rect x="84" y="120" width="72" height="6" rx="3" fill="#7C3AED" fillOpacity="0.4" className={inView ? 'wuv-hero-shimmer' : undefined} />
            <rect x="84" y="132" width="108" height="4" rx="2" fill="#CBD5E1" />
            <rect x="84" y="140" width="88" height="4" rx="2" fill="#CBD5E1" />
          </g>

          <text x="320" y="368" textAnchor="middle" fill="#64748B" fontSize="11" fontFamily="system-ui,sans-serif">
            U&V stays beside you at every stage
          </text>
        </svg>

        {/* Moving progress dot overlay */}
        {inView && <span className="wuv-hero-progress-dot" aria-hidden />}
      </div>
    </Frame>
  );
}

export function WuvBrokenJourneyIllustration({ className }: IllustrationProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Frame className={cn('wuv-broken-journey', inView && 'is-resolved', className)}>
      <div ref={ref} className="relative h-full w-full">
        <svg viewBox="0 0 560 360" className="h-full w-full" role="img" aria-label="Vendor journey transforming from broken to accountable partnership">
          <rect width="560" height="360" fill="#FEFEFE" />

          {/* Before state */}
          <g className="wuv-broken-before" opacity={inView ? 0 : 1}>
            <path d="M80 280 L160 220 L240 260 L320 180 L400 240 L480 120" fill="none" stroke="#FCA5A5" strokeWidth="2.5" strokeDasharray="8 6" />
            {[
              { x: 80, y: 280, label: 'Promise' },
              { x: 160, y: 220, label: 'Delay' },
              { x: 240, y: 260, label: 'Silence' },
              { x: 320, y: 180, label: 'Gap' },
              { x: 400, y: 240, label: 'Handoff' },
              { x: 480, y: 120, label: 'Gone' },
            ].map((p) => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="22" fill="#FEF2F2" stroke="#F87171" strokeWidth="1.5" />
                <text x={p.x} y={p.y + 40} textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="system-ui,sans-serif">{p.label}</text>
              </g>
            ))}
            <rect x="60" y="48" width="440" height="72" rx="10" fill="#FFF" stroke="#FECACA" />
            <text x="80" y="78" fill="#DC2626" fontSize="12" fontWeight="600" fontFamily="system-ui,sans-serif">Project status: waiting on vendor</text>
            <text x="80" y="100" fill="#94A3B8" fontSize="10" fontFamily="system-ui,sans-serif">Last update: weeks ago</text>
          </g>

          {/* After state */}
          <g className="wuv-broken-after" opacity={inView ? 1 : 0}>
            <path
              d="M80 240 L160 240 L240 240 L320 240 L400 240 L480 240"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2.5"
              className="wuv-broken-line"
            />
            {[
              { x: 80, label: 'Clarity', color: '#7C3AED' },
              { x: 160, label: 'Connected', color: '#6366F1' },
              { x: 240, label: 'Visible', color: '#3B82F6' },
              { x: 320, label: 'Accountable', color: '#0EA5E9' },
              { x: 400, label: 'Supported', color: '#8B5CF6' },
              { x: 480, label: 'Growing', color: '#1E3A8A' },
            ].map((p, i) => (
              <g key={p.label} className="wuv-broken-node" style={{ animationDelay: `${i * 120}ms` }}>
                <circle cx={p.x} cy="240" r="22" fill={p.color} fillOpacity="0.12" stroke={p.color} strokeWidth="1.5" />
                <circle cx={p.x} cy="240" r="4" fill="#22C55E" />
                <text x={p.x} y="280" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="system-ui,sans-serif">{p.label}</text>
              </g>
            ))}
            <rect x="60" y="48" width="440" height="72" rx="10" fill="#FFF" stroke="#C4B5FD" />
            <text x="80" y="78" fill="#1E3A8A" fontSize="12" fontWeight="600" fontFamily="system-ui,sans-serif">Project status: on track</text>
            <text x="80" y="100" fill="#64748B" fontSize="10" fontFamily="system-ui,sans-serif">Last update: today · milestone approved</text>
            <rect x="80" y="112" width="200" height="4" rx="2" fill="#E2E8F0" />
            <rect x="80" y="112" width="140" height="4" rx="2" fill="#7C3AED" fillOpacity="0.5" className="wuv-broken-progress" />
          </g>
        </svg>
      </div>
    </Frame>
  );
}

const journeyStageColors = ['#7C3AED', '#6366F1', '#3B82F6', '#0EA5E9', '#1E3A8A'] as const;

export function WuvJourneyStageIllustration({
  stage,
  className,
  active = false,
}: IllustrationProps & { stage: 0 | 1 | 2 | 3 | 4; active?: boolean }) {
  const color = journeyStageColors[stage];
  const scenes = [
    <g key="listen"><circle cx="60" cy="44" r="14" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" /><path d="M48 48 h24 M52 40 h16" stroke={color} strokeWidth="2" strokeLinecap="round" /><path d="M40 58 Q60 68 80 58" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" /></g>,
    <g key="plan"><rect x="38" y="32" width="44" height="32" rx="5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" /><path d="M48 44 h28 M48 52 h20 M48 58 h24" stroke={color} strokeWidth="1.5" /><circle cx="72" cy="38" r="4" fill="#22C55E" /></g>,
    <g key="build"><rect x="36" y="30" width="48" height="36" rx="5" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.5" /><rect x="44" y="40" width="14" height="10" rx="2" fill={color} fillOpacity="0.25" /><rect x="62" y="40" width="14" height="10" rx="2" fill={color} fillOpacity="0.15" /><path d="M44 56 h32" stroke={color} strokeWidth="1.5" /></g>,
    <g key="launch"><path d="M44 58 L60 34 L76 58 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" /><circle cx="60" cy="46" r="5" fill={color} /><path d="M52 62 h16" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" /></g>,
    <g key="grow"><path d="M38 58 Q60 28 82 58" fill="none" stroke={color} strokeWidth="2" /><circle cx="60" cy="40" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" /><path d="M56 40 l4 4 l8-8" stroke="#22C55E" strokeWidth="1.5" fill="none" /></g>,
  ];

  return (
    <div
      className={cn(
        'wuv-journey-illus flex h-28 w-full items-center justify-center rounded-xl border border-uv-border/60 bg-gradient-to-br from-white to-[#f5f3ff] sm:h-32',
        active && 'is-active',
        className,
      )}
    >
      <svg viewBox="0 0 120 80" className="h-16 w-24" aria-hidden>
        {scenes[stage]}
      </svg>
    </div>
  );
}

export function WuvPrincipleIcon({ index, className, active = false }: { index: number; className?: string; active?: boolean }) {
  const color = '#7C3AED';
  const icons = [
    <path key="0" d="M12 20 L28 12 L44 20 L44 36 L28 44 L12 36 Z" fill="none" stroke={color} strokeWidth="2" />,
    <path key="1" d="M16 36 V20 h24 v16 M20 28 h16" fill="none" stroke={color} strokeWidth="2" />,
    <path key="2" d="M20 16 h16 v8 h-8 M24 24 v12 M32 24 v12" fill="none" stroke={color} strokeWidth="2" />,
    <path key="3" d="M16 24 h24 M16 30 h18 M16 36 h12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />,
    <path key="4" d="M20 16 v20 M28 12 v24 M36 18 v18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />,
    <path key="5" d="M16 36 L28 16 L40 36 M22 30 h12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />,
  ];
  return (
    <div
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/10 transition-transform duration-300',
        active && 'wuv-principle-icon--active',
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="h-7 w-7">{icons[index]}</svg>
    </div>
  );
}

const accountabilitySteps = [
  { label: 'Discovery', icon: '🔍' },
  { label: 'Scope', icon: '📋' },
  { label: 'Build', icon: '⚙' },
  { label: 'Review', icon: '✓' },
  { label: 'Launch', icon: '🚀' },
  { label: 'Support', icon: '🤝' },
] as const;

export function WuvAccountabilityWorkflowIllustration({ className }: IllustrationProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <Frame className={cn('wuv-accountability-flow', inView && 'is-animated', className)}>
      <div ref={ref} className="relative h-full w-full">
        <svg viewBox="0 0 640 300" className="h-full w-full" role="img" aria-label="Delivery accountability workflow">
          <rect width="640" height="300" fill="#FAFBFF" />
          <rect x="24" y="24" width="592" height="252" rx="12" fill="#fff" stroke="#E2E8F0" />

          {/* Animated connector line */}
          <path
            d="M88 120 L552 120"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M88 120 L552 120"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3"
            strokeLinecap="round"
            className={inView ? 'wuv-accountability-line' : undefined}
          />

          {accountabilitySteps.map((step, i) => {
            const x = 72 + i * 88;
            const complete = inView;
            return (
              <g key={step.label} className={complete ? 'wuv-accountability-step' : undefined} style={{ animationDelay: `${i * 150}ms` }}>
                <rect
                  x={x}
                  y="88"
                  width="64"
                  height="64"
                  rx="10"
                  fill="#7C3AED"
                  fillOpacity={0.06 + i * 0.015}
                  stroke="#7C3AED"
                  strokeWidth="1.5"
                  strokeOpacity={complete ? 0.45 : 0.2}
                />
                <circle cx={x + 32} cy="108" r="12" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" />
                <text x={x + 32} y="140" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">{step.label}</text>
                {complete && (
                  <circle cx={x + 44} cy="96" r="5" fill="#22C55E" className="wuv-accountability-check" style={{ animationDelay: `${i * 150 + 200}ms` }} />
                )}
              </g>
            );
          })}

          {/* Progress dot */}
          {inView && (
            <circle cx="88" cy="120" r="5" fill="#7C3AED" className="wuv-accountability-dot" />
          )}

          <rect x="72" y="180" width="496" height="56" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
          <rect x="88" y="196" width="120" height="8" rx="4" fill="#7C3AED" fillOpacity="0.35" className={inView ? 'wuv-hero-shimmer' : undefined} />
          <rect x="88" y="212" width="200" height="6" rx="3" fill="#CBD5E1" />
          <rect x="88" y="224" width="160" height="6" rx="3" fill="#CBD5E1" />
          <text x="320" y="268" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="system-ui,sans-serif">
            U&V keeps every stage visible and accountable
          </text>
        </svg>
      </div>
    </Frame>
  );
}

// Legacy export — industry tiles now use WuvIndustryScene directly
export function WuvIndustryBannerIllustration({
  className,
}: IllustrationProps & { industry: string }) {
  return <div className={cn('h-full w-full', className)} aria-hidden />;
}
