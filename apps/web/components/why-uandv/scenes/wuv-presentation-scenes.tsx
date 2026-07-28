'use client';

import { cn } from '@uandv/ui';

import type { IconName } from '@uandv/ui';

import { useInView, useReducedMotion } from '../wuv-motion';

import {
  WuvChatBubble,
  WuvDashboard,
  WuvDesk,
  WuvDocument,
  WuvLaptop,
  WuvMeetingTable,
  WuvPerson,
  WuvPhone,
  WuvSceneBackdrop,
  WuvSceneIconBadge,
  WuvWhiteboard,
} from './wuv-business-art';
import { WuvSceneShell } from './wuv-scene-shell';

function SceneFrame({
  label,
  children,
  className,
  badge,
  tone = 'lavender',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  badge?: { name: IconName; label: string };
  tone?: 'lavender' | 'sky' | 'warm' | 'mint';
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const active = reduced || inView;

  return (
    <div ref={ref} className={cn(active && 'is-active', className)}>
      <WuvSceneShell label={label} aspectClassName="aspect-[16/9] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]">
        <WuvSceneBackdrop tone={tone}>
          {badge ? (
            <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
              <WuvSceneIconBadge name={badge.name} label={badge.label} />
            </div>
          ) : null}
          <div className={cn('h-full w-full', active && 'wuv-scene-enter')}>{children}</div>
        </WuvSceneBackdrop>
      </WuvSceneShell>
    </div>
  );
}

/** Hero — trust through partnership meeting */
export function WuvCinematicHeroScene({ className }: { className?: string }) {
  return (
    <SceneFrame
      label="Business owner and U&V consultant building trust through partnership"
      className={cn('wuv-scene-hero', className)}
      badge={{ name: 'Handshake', label: 'Partnership first' }}
      tone="sky"
    >
      <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
        <rect x="48" y="48" width="544" height="224" rx="16" fill="#fff" fillOpacity="0.55" stroke="#E2E8F0" strokeWidth="1.2" />
        <WuvMeetingTable x={160} y={176} w={320} />
        <WuvPerson x={220} y={108} variant="owner" facing="right" scale={1.1} />
        <WuvPerson x={420} y={108} variant="consultant" facing="left" scale={1.1} />
        <path d="M300 148 c8-6 32-6 40 0" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" className="wuv-scene-handshake" />
        <WuvLaptop x={268} y={152} w={64} />
        <WuvDocument x={372} y={144} signed />
        <WuvChatBubble x={88} y={72} text="Your business goals" />
        <rect x="472" y="72" width="88" height="64" rx="8" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="488" y="96" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          Agreement
        </text>
        <path d="M488 110 h56 M488 122 h40 M488 134 h48" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="520" cy="148" r="8" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="1.2" />
        <path d="M516 148 l3 3 l6-7" fill="none" stroke="#22C55E" strokeWidth="1.5" />
      </svg>
    </SceneFrame>
  );
}

/** Principles — business scenes by row */
export function WuvCinematicPrinciplesScene({ row }: { row: 0 | 1 | 2 }) {
  const configs = [
    {
      label: 'Business goals guide every recommendation before tools are chosen',
      badge: { name: 'Briefcase' as const, label: 'Business first' },
      tone: 'lavender' as const,
    },
    {
      label: 'Less manual work through automation and visible project communication',
      badge: { name: 'MessageCircle' as const, label: 'Clear updates' },
      tone: 'sky' as const,
    },
    {
      label: 'Launch celebration with ongoing support and room to grow',
      badge: { name: 'Rocket' as const, label: 'After go-live' },
      tone: 'warm' as const,
    },
  ];
  const config = configs[row];

  return (
    <SceneFrame label={config.label} badge={config.badge} tone={config.tone} className="wuv-scene-principles">
      <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
        {row === 0 && (
          <>
            <WuvPerson x={120} y={132} variant="owner" facing="right" scale={1.05} />
            <rect x="220" y="88" width="160" height="120" rx="10" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.3" />
            <text x="240" y="114" fill="#7C3AED" fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif">
              Your priorities
            </text>
            {['Customers', 'Revenue', 'Operations'].map((item, i) => (
              <g key={item}>
                <rect x="236" y={124 + i * 26} width="128" height="18" rx="9" fill={i === 0 ? '#7C3AED' : '#F1F5F9'} fillOpacity={i === 0 ? 0.2 : 1} stroke={i === 0 ? '#7C3AED' : '#E2E8F0'} strokeWidth="1" />
                <text x="248" y={137 + i * 26} fill="#334155" fontSize="9" fontFamily="system-ui,sans-serif">{item}</text>
              </g>
            ))}
            <WuvDocument x={420} y={108} signed />
            <WuvLaptop x={500} y={148} w={72} />
          </>
        )}
        {row === 1 && (
          <>
            <WuvDesk x={72} y={200} w={130} />
            <WuvPerson x={120} y={118} variant="owner" facing="right" />
            <rect x="220" y="96" width="120" height="88" rx="10" fill="#fff" stroke="#FECACA" strokeWidth="1.2" />
            <text x="236" y="118" fill="#DC2626" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Manual tasks</text>
            <rect x="236" y="128" width="88" height="6" rx="3" fill="#FECACA" className="wuv-scene-fade-out" />
            <rect x="236" y="142" width="72" height="6" rx="3" fill="#FECACA" className="wuv-scene-fade-out" style={{ animationDelay: '0.2s' }} />
            <path d="M360 140 h48" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#arrow)" />
            <WuvWhiteboard x={420} y={88} />
            <WuvChatBubble x={88} y={64} text="Weekly update sent" />
            <WuvPerson x={500} y={196} variant="team" facing="left" />
          </>
        )}
        {row === 2 && (
          <>
            <WuvPerson x={100} y={140} variant="owner" facing="right" />
            <WuvPerson x={180} y={148} variant="consultant" facing="right" />
            <g className="wuv-scene-launch-rocket">
              <path d="M300 228 L318 132 L336 228 Z" fill="#7C3AED" fillOpacity="0.18" stroke="#7C3AED" strokeWidth="2" />
            </g>
            <WuvPhone x={360} y={108} />
            <WuvPhone x={420} y={108} />
            <WuvDashboard x={480} y={88} />
            <WuvChatBubble x={360} y={52} text="Support on call" />
          </>
        )}
      </svg>
    </SceneFrame>
  );
}

/** Accountability — documents, approvals, visible delivery */
export function WuvCinematicAccountabilityScene({ className }: { className?: string }) {
  return (
    <SceneFrame
      label="Accountability through signed scope, milestone reviews and ongoing support"
      className={cn('wuv-scene-accountability', className)}
      badge={{ name: 'ClipboardList', label: 'Clear delivery' }}
      tone="mint"
    >
      <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
        <WuvMeetingTable x={140} y={184} w={360} />
        <WuvPerson x={200} y={112} variant="owner" facing="right" />
        <WuvPerson x={440} y={112} variant="consultant" facing="left" />
        <WuvDocument x={268} y={132} signed />
        <WuvDocument x={316} y={128} signed />
        <rect x="88" y="72" width="108" height="88" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="104" y="96" fill="#1E3A8A" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Milestones</text>
        {['Discovery', 'Build', 'Launch'].map((step, i) => (
          <g key={step}>
            <circle cx="108" cy={112 + i * 18} r="6" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="1.2" />
            <path d={`M105 ${112 + i * 18} l2 2 l4-5`} fill="none" stroke="#22C55E" strokeWidth="1.2" />
            <text x="122" y={116 + i * 18} fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">{step}</text>
          </g>
        ))}
        <WuvChatBubble x={420} y={56} text="Progress shared" />
        <rect x="472" y="168" width="96" height="72" rx="10" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.25" />
        <text x="488" y="190" fill="#7C3AED" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Support desk</text>
        <rect x="484" y="200" width="72" height="6" rx="3" fill="#E2E8F0" />
        <rect x="484" y="214" width="56" height="6" rx="3" fill="#7C3AED" fillOpacity="0.35" />
      </svg>
    </SceneFrame>
  );
}

/** Closing — partnership that keeps the business moving */
export function WuvCinematicClosingScene({ className }: { className?: string }) {
  return (
    <SceneFrame
      label="Long-term partnership keeps your business moving after launch"
      className={cn('wuv-scene-closing', className)}
      badge={{ name: 'Users', label: 'Long-term partner' }}
      tone="lavender"
    >
      <svg viewBox="0 0 640 280" className="h-full w-full" aria-hidden>
        <WuvPerson x={180} y={108} variant="owner" facing="right" scale={1.15} />
        <WuvPerson x={460} y={108} variant="consultant" facing="left" scale={1.15} />
        <path d="M248 148 c40-8 96-8 136 0" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" className="wuv-scene-handshake" />
        <WuvDashboard x={248} y={168} />
        <WuvLaptop x={88} y={148} w={64} />
        <WuvPhone x={488} y={148} />
        <WuvChatBubble x={360} y={48} text="We’re with you" />
      </svg>
    </SceneFrame>
  );
}
