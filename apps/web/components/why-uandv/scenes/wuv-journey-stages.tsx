'use client';

import { cn } from '@uandv/ui';

import { useInView, useReducedMotion } from '../wuv-motion';
import type { WuvPartnerPathStage } from '@/lib/why-uandv-partner-path';

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

const stageLabels: Record<WuvPartnerPathStage['id'], string> = {
  listen: 'Consultation meeting — understanding your business first',
  plan: 'Planning session with whiteboard, calendar and roadmap',
  build: 'Team building your website, app and business software',
  launch: 'Product launch with customers celebrating go-live',
  grow: 'Ongoing support, analytics and long-term partnership',
};

function ListenScene() {
  return (
  <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
    <WuvMeetingTable x={180} y={168} w={280} />
    <WuvPerson x={220} y={118} variant="owner" facing="right" />
    <WuvPerson x={420} y={118} variant="consultant" facing="left" />
    <WuvDocument x={300} y={138} />
    <WuvChatBubble x={88} y={56} text="Tell us your goals" />
    <WuvChatBubble x={420} y={48} text="We’re listening" />
  </svg>
  );
}

function PlanScene() {
  return (
  <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
    <WuvWhiteboard x={72} y={72} />
    <WuvPerson x={260} y={132} variant="consultant" facing="right" />
    <WuvPerson x={340} y={140} variant="team" facing="left" />
    <rect x="420" y="88" width="120" height="96" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
    <text x="436" y="112" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">
      March roadmap
    </text>
    {[0, 1, 2, 3].map((row) =>
      [0, 1, 2, 3, 4, 5, 6].map((col) => {
        const active = row === 1 && col >= 2 && col <= 4;
        return (
          <rect
            key={`${row}-${col}`}
            x={432 + col * 14}
            y={120 + row * 14}
            width="10"
            height="10"
            rx="2"
            fill={active ? '#7C3AED' : '#F1F5F9'}
            fillOpacity={active ? 0.55 : 1}
          />
        );
      }),
    )}
    <WuvDocument x={500} y={200} signed />
  </svg>
  );
}

function BuildScene() {
  return (
  <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
    <WuvDesk x={80} y={196} w={140} />
    <WuvDesk x={300} y={196} w={140} />
    <WuvPerson x={130} y={118} variant="team" facing="right" />
    <WuvPerson x={360} y={118} variant="consultant" facing="right" />
    <WuvLaptop x={104} y={148} w={72} />
    <WuvLaptop x={324} y={148} w={72} />
    <WuvPhone x={460} y={132} />
    <rect x="468" y="108" width="88" height="64" rx="8" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" />
    <rect x="476" y="116" width="72" height="10" rx="4" fill="#7C3AED" fillOpacity="0.25" />
    <rect x="476" y="132" width="32" height="24" rx="4" fill="#E2E8F0" />
    <rect x="512" y="132" width="28" height="10" rx="3" fill="#E2E8F0" />
    <rect x="512" y="146" width="28" height="10" rx="3" fill="#E2E8F0" />
  </svg>
  );
}

function LaunchScene() {
  return (
  <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
    <WuvPerson x={120} y={148} variant="owner" facing="right" />
    <WuvPerson x={500} y={156} variant="team" facing="left" />
    <g className="wuv-scene-launch-rocket">
      <path d="M300 220 L320 120 L340 220 Z" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="320" cy="118" r="10" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="1.5" />
      <path d="M308 200 l12 20 l12-20" fill="#7C3AED" fillOpacity="0.35" />
    </g>
    <WuvPhone x={200} y={108} />
    <WuvPhone x={400} y={108} />
    <WuvChatBubble x={168} y={52} text="We’re live!" />
    <circle cx="88" cy="72" r="4" fill="#F59E0B" className="wuv-scene-confetti" />
    <circle cx="552" cy="64" r="4" fill="#7C3AED" className="wuv-scene-confetti" style={{ animationDelay: '0.3s' }} />
    <circle cx={520} cy={96} r="3" fill="#22C55E" className="wuv-scene-confetti" style={{ animationDelay: '0.6s' }} />
  </svg>
  );
}

function GrowScene() {
  return (
  <svg viewBox="0 0 640 320" className="h-full w-full" aria-hidden>
    <WuvPerson x={96} y={138} variant="owner" facing="right" />
    <WuvDesk x={72} y={210} w={120} />
    <WuvLaptop x={96} y={162} w={64} />
    <WuvDashboard x={220} y={88} />
    <WuvChatBubble x={400} y={72} text="Support is here" />
    <rect x="400" y="168" width="120" height="72" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
    <circle cx="420" cy="190" r="10" fill="#7C3AED" fillOpacity="0.15" />
    <IconHeadset x={416} y={186} />
    <text x="438" y="194" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
      Helpdesk online
    </text>
    <rect x="412" y="206" width="96" height="6" rx="3" fill="#E2E8F0" />
    <rect x="412" y="220" width="72" height="6" rx="3" fill="#E2E8F0" />
  </svg>
  );
}

function IconHeadset({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path d="M0 4 a8 8 0 0 1 16 0 v6 h-4 v-6 a4 4 0 0 0-8 0" fill="none" stroke="#7C3AED" strokeWidth="1.5" />
      <rect x="-2" y="10" width="6" height="8" rx="2" fill="#7C3AED" fillOpacity="0.25" />
      <rect x="14" y="10" width="6" height="8" rx="2" fill="#7C3AED" fillOpacity="0.25" />
    </g>
  );
}

const scenes: Record<WuvPartnerPathStage['id'], () => React.JSX.Element> = {
  listen: ListenScene,
  plan: PlanScene,
  build: BuildScene,
  launch: LaunchScene,
  grow: GrowScene,
};

const stageBadges: Record<WuvPartnerPathStage['id'], { name: 'MessageCircle' | 'Calendar' | 'Code2' | 'Rocket' | 'TrendingUp'; label: string }> = {
  listen: { name: 'MessageCircle', label: 'We listen first' },
  plan: { name: 'Calendar', label: 'Clear roadmap' },
  build: { name: 'Code2', label: 'Products built' },
  launch: { name: 'Rocket', label: 'Go live' },
  grow: { name: 'TrendingUp', label: 'Keep growing' },
};

export function WuvJourneyStageScene({
  stageId,
  className,
}: {
  stageId: WuvPartnerPathStage['id'];
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const active = reduced || inView;
  const Scene = scenes[stageId];
  const badge = stageBadges[stageId];

  return (
    <div ref={ref} className={cn('w-full', active && 'is-active', className)}>
      <WuvSceneShell label={stageLabels[stageId]} aspectClassName="aspect-[16/9] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]">
        <WuvSceneBackdrop tone={stageId === 'launch' ? 'warm' : stageId === 'grow' ? 'mint' : 'lavender'}>
          <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
            <WuvSceneIconBadge name={badge.name} label={badge.label} />
          </div>
          <div className={cn('h-full w-full', active && 'wuv-scene-enter')}>
            <Scene />
          </div>
        </WuvSceneBackdrop>
      </WuvSceneShell>
    </div>
  );
}
