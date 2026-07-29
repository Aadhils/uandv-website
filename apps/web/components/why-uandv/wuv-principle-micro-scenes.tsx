'use client';

import { cn } from '@uandv/ui';

import { wuvWorkingWithUs } from '@/lib/why-uandv-content';

import { WuvMicroFloatG, WuvMicroSceneShell } from './wuv-micro-scene';

import { WuvChatBubble, WuvDocument, WuvPerson } from './scenes/wuv-business-art';

type PrincipleId = (typeof wuvWorkingWithUs.principles)[number]['id'];

const labels: Record<PrincipleId, string> = {
  communication: 'Clear communication with message updates',
  honesty: 'Honest recommendations with checkmark approval',
  progress: 'Visible progress with milestone tracking',
  documentation: 'Documented decisions and signed scope',
  timelines: 'Realistic timeline with calendar milestones',
  support: 'Continued support after launch',
  responsibility: 'Shared responsibility handshake partnership',
};

function CommunicationScene() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <WuvMicroFloatG delay={0} duration="5s">
        <WuvChatBubble x={16} y={12} text="Update sent" />
      </WuvMicroFloatG>
      <WuvMicroFloatG delay={300} duration="6s">
        <rect x="100" y="20" width="80" height="48" rx="8" fill="#fff" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.25" />
        <rect x="112" y="32" width="56" height="4" rx="2" fill="#7C3AED" fillOpacity="0.35" className="wuv-micro-shimmer" />
        <rect x="112" y="42" width="40" height="3" rx="1.5" fill="#E2E8F0" />
        <rect x="112" y="50" width="48" height="3" rx="1.5" fill="#E2E8F0" />
      </WuvMicroFloatG>
      <path d="M60 56 h28" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="4 3" className="wuv-micro-connector" />
    </svg>
  );
}

function HonestyScene() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <rect x="24" y="28" width="72" height="56" rx="8" fill="#fff" stroke="#FECACA" strokeWidth="1" />
      <rect x="36" y="44" width="48" height="4" rx="2" fill="#FECACA" className="wuv-micro-shimmer" />
      <rect x="36" y="54" width="32" height="4" rx="2" fill="#E2E8F0" />
      <path d="M108 56 h24" stroke="#7C3AED" strokeWidth="2" />
      <polygon points="132,52 140,56 132,60" fill="#7C3AED" />
      <circle cx="160" cy="56" r="16" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="1.5" className="wuv-micro-pulse" />
      <path d="M154 56 l4 4 l8-10" fill="none" stroke="#22C55E" strokeWidth="2" />
    </svg>
  );
}

function ProgressScene() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <rect x="20" y="24" width="160" height="72" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="32" y="40" width="136" height="8" rx="4" fill="#E2E8F0" />
      <rect x="32" y="40" width="96" height="8" rx="4" fill="#7C3AED" fillOpacity="0.55" className="wuv-banner-progress" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={48 + i * 48} cy="72" r="6" fill={i < 2 ? '#7C3AED' : '#CBD5E1'} fillOpacity={i < 2 ? 0.6 : 1} />
          <rect x={36 + i * 48} y="84" width="24" height="3" rx="1.5" fill="#E2E8F0" />
        </g>
      ))}
    </svg>
  );
}

function DocumentationScene() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <WuvMicroFloatG delay={0} duration="5.5s">
        <WuvDocument x={24} y={20} signed />
      </WuvMicroFloatG>
      <WuvMicroFloatG delay={200} duration="6s">
        <WuvDocument x={80} y={28} signed />
      </WuvMicroFloatG>
      <rect x="136" y="32" width="48" height="56" rx="6" fill="#fff" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.25" />
      <rect x="148" y="44" width="24" height="4" rx="2" fill="#7C3AED" fillOpacity="0.3" />
      <rect x="148" y="54" width="32" height="3" rx="1.5" fill="#E2E8F0" />
      <rect x="148" y="62" width="28" height="3" rx="1.5" fill="#E2E8F0" />
    </svg>
  );
}

function TimelinesScene() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <rect x="20" y="20" width="160" height="80" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1" />
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => {
          const active = row === 1 && col === 2;
          return (
            <rect
              key={`${row}-${col}`}
              x={32 + col * 36}
              y={32 + row * 20}
              width="28"
              height="14"
              rx="4"
              fill={active ? '#7C3AED' : '#F1F5F9'}
              fillOpacity={active ? 0.45 : 1}
              className={active ? 'wuv-journey-stage-active' : undefined}
            />
          );
        }),
      )}
      <line x1="32" y1="96" x2="168" y2="96" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 3" className="wuv-micro-connector" />
    </svg>
  );
}

function SupportScene() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <circle cx="60" cy="56" r="20" fill="#22C55E" fillOpacity="0.12" stroke="#22C55E" strokeWidth="1.5" className="wuv-micro-pulse" />
      <WuvPerson x={60} y={36} variant="consultant" facing="right" scale={0.55} />
      <WuvMicroFloatG delay={300} duration="5s">
        <WuvChatBubble x={100} y={16} text="We're here" />
      </WuvMicroFloatG>
      <rect x="108" y="52" width="72" height="40" rx="8" fill="#7C3AED" fillOpacity="0.08" stroke="#7C3AED" strokeWidth="1" className="wuv-banner-support" />
      <rect x="120" y="64" width="48" height="4" rx="2" fill="#7C3AED" fillOpacity="0.3" />
      <rect x="120" y="74" width="36" height="3" rx="1.5" fill="#E2E8F0" />
    </svg>
  );
}

function ResponsibilityScene() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <WuvPerson x={48} y={32} variant="owner" facing="right" scale={0.65} />
      <WuvPerson x={128} y={32} variant="consultant" facing="left" scale={0.65} />
      <path d="M88 72 c8-6 24-6 32 0" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" className="wuv-banner-handshake" />
      <rect x="40" y="84" width="120" height="8" rx="4" fill="#E2E8F0" />
      <rect x="40" y="84" width="80" height="8" rx="4" fill="#7C3AED" fillOpacity="0.45" className="wuv-banner-progress" />
    </svg>
  );
}

const scenes: Record<PrincipleId, () => React.JSX.Element> = {
  communication: CommunicationScene,
  honesty: HonestyScene,
  progress: ProgressScene,
  documentation: DocumentationScene,
  timelines: TimelinesScene,
  support: SupportScene,
  responsibility: ResponsibilityScene,
};

export function WuvPrincipleMicroScene({
  id,
  className,
}: {
  id: PrincipleId;
  className?: string;
}) {
  const Scene = scenes[id];

  return (
    <WuvMicroSceneShell
      label={labels[id]}
      className={cn('wuv-principle-micro-scene h-full w-full', className)}
      activeClassName="is-active"
      threshold={0.2}
    >
      <Scene />
    </WuvMicroSceneShell>
  );
}
