'use client';

import { cn } from '@uandv/ui';

import type { WuvPartnerPathStage } from '@/lib/why-uandv-partner-path';
import type { WuvIndustryAnimationId } from '@/lib/why-uandv-animations';

import {
  WuvChatBubble,
  WuvDashboard,
  WuvDesk,
  WuvDocument,
  WuvLaptop,
  WuvMeetingTable,
  WuvPerson,
  WuvPhone,
  WuvWhiteboard,
} from './wuv-business-art';

function CompactFrame({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-uv-2xl border border-uv-brand/10 bg-gradient-to-br from-[#f8f7ff] via-white to-[#eef4ff] shadow-[0_12px_40px_rgb(30_58_138_/_0.08)]',
        className,
      )}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}

/** Hero — partnership meeting, compact */
export function WuvHeroVisual({ className }: { className?: string }) {
  return (
    <CompactFrame label="Business owner and U&V consultant in a partnership meeting" className={className}>
      <svg viewBox="0 0 480 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <WuvMeetingTable x={120} y={148} w={240} />
        <WuvPerson x={168} y={88} variant="owner" facing="right" scale={0.95} />
        <WuvPerson x={312} y={88} variant="consultant" facing="left" scale={0.95} />
        <path d="M228 128 c10-6 24-6 34 0" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
        <WuvLaptop x={208} y={118} w={52} />
        <WuvDocument x={292} y={112} signed />
      </svg>
    </CompactFrame>
  );
}

/** Common experience — alone vs partnership */
export function WuvCommonExperienceVisual({ className }: { className?: string }) {
  return (
    <CompactFrame label="Frustrated owner alone compared with confident U&V partnership" className={className}>
      <svg viewBox="0 0 480 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <line x1="240" y1="24" x2="240" y2="236" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
        <text x="120" y="40" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">TOO COMMON</text>
        <text x="360" y="40" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">WITH U&amp;V</text>
        <WuvDesk x={48} y={168} w={100} />
        <WuvPerson x={88} y={96} variant="owner" facing="right" scale={0.85} />
        <WuvChatBubble x={32} y={52} text="Still waiting…" />
        <WuvMeetingTable x={300} y={156} w={140} />
        <WuvPerson x={328} y={88} variant="owner" facing="right" scale={0.8} />
        <WuvPerson x={408} y={88} variant="consultant" facing="left" scale={0.8} />
        <WuvDocument x={352} y={112} signed />
      </svg>
    </CompactFrame>
  );
}

const journeyScenes: Record<WuvPartnerPathStage['id'], React.ReactNode> = {
  listen: (
    <>
      <WuvMeetingTable x={140} y={148} w={200} />
      <WuvPerson x={180} y={88} variant="owner" facing="right" scale={0.9} />
      <WuvPerson x={300} y={88} variant="consultant" facing="left" scale={0.9} />
      <WuvChatBubble x={48} y={48} text="Tell us your goals" />
    </>
  ),
  plan: (
    <>
      <WuvWhiteboard x={72} y={72} />
      <WuvPerson x={260} y={120} variant="consultant" facing="right" scale={0.85} />
      <WuvDocument x={340} y={100} signed />
    </>
  ),
  build: (
    <>
      <WuvDesk x={80} y={168} w={110} />
      <WuvDesk x={260} y={168} w={110} />
      <WuvPerson x={120} y={96} variant="team" facing="right" scale={0.85} />
      <WuvPerson x={300} y={96} variant="consultant" facing="right" scale={0.85} />
      <WuvLaptop x={96} y={128} w={56} />
      <WuvLaptop x={276} y={128} w={56} />
      <WuvPhone x={380} y={112} />
    </>
  ),
  launch: (
    <>
      <WuvPerson x={120} y={120} variant="owner" facing="right" scale={0.9} />
      <path d="M220 180 L240 88 L260 180 Z" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="1.5" />
      <WuvPhone x={300} y={100} />
      <WuvPhone x={360} y={100} />
      <WuvChatBubble x={280} y={48} text="We’re live!" />
    </>
  ),
  grow: (
    <>
      <WuvPerson x={72} y={108} variant="owner" facing="right" scale={0.85} />
      <WuvDashboard x={180} y={72} />
      <WuvChatBubble x={320} y={56} text="Support on call" />
      <WuvLaptop x={48} y={148} w={52} />
    </>
  ),
};

export function WuvJourneyVisual({
  stageId,
  className,
}: {
  stageId: WuvPartnerPathStage['id'];
  className?: string;
}) {
  return (
    <CompactFrame label={`Partnership stage: ${stageId}`} className={cn('wuv-journey-visual', className)}>
      <svg viewBox="0 0 480 260" className="h-full w-full transition-opacity duration-300" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {journeyScenes[stageId]}
      </svg>
    </CompactFrame>
  );
}

export function WuvAccountabilityVisual({ className }: { className?: string }) {
  return (
    <CompactFrame label="Signed documents, milestones and support desk" className={className}>
      <svg viewBox="0 0 480 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <WuvMeetingTable x={120} y={148} w={240} />
        <WuvPerson x={168} y={88} variant="owner" facing="right" scale={0.9} />
        <WuvPerson x={312} y={88} variant="consultant" facing="left" scale={0.9} />
        <WuvDocument x={208} y={108} signed />
        <WuvDocument x={252} y={104} signed />
        <rect x="48" y="56" width="96" height="72" rx="8" fill="#fff" stroke="#CBD5E1" strokeWidth="1" />
        <text x="60" y="76" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Milestones</text>
        {['Discovery', 'Build', 'Launch'].map((s, i) => (
          <text key={s} x="60" y={96 + i * 14} fill="#64748B" fontSize="7" fontFamily="system-ui,sans-serif">✓ {s}</text>
        ))}
      </svg>
    </CompactFrame>
  );
}

const industryMini: Record<WuvIndustryAnimationId, React.ReactNode> = {
  healthcare: (
    <>
      <WuvPerson x={80} y={100} variant="consultant" facing="right" scale={0.75} />
      <WuvPerson x={160} y={108} variant="owner" facing="left" scale={0.7} />
      <rect x="220" y="72" width="120" height="88" rx="8" fill="#fff" stroke="#0EA5E9" strokeWidth="1.2" strokeOpacity="0.4" />
      <text x="236" y="92" fill="#0EA5E9" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Patient record</text>
    </>
  ),
  education: (
    <>
      <WuvPerson x={100} y={96} variant="consultant" facing="right" scale={0.75} />
      <rect x="180" y="80" width="140" height="80" rx="8" fill="#fff" stroke="#6366F1" strokeWidth="1.2" strokeOpacity="0.35" />
      <WuvLaptop x={220} y={108} w={48} />
    </>
  ),
  finance: (
    <>
      <WuvMeetingTable x={120} y={140} w={160} />
      <WuvDocument x={200} y={96} signed />
      <WuvDashboard x={300} y={72} />
    </>
  ),
  travel: (
    <>
      <WuvPerson x={100} y={100} variant="team" facing="right" scale={0.75} />
      <WuvPhone x={180} y={88} />
      <WuvChatBubble x={240} y={64} text="Booking confirmed" />
    </>
  ),
  hospitality: (
    <>
      <WuvPerson x={120} y={100} variant="consultant" facing="right" scale={0.75} />
      <WuvPerson x={220} y={108} variant="owner" facing="left" scale={0.7} />
      <rect x="300" y="88" width="80" height="56" rx="6" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1" />
    </>
  ),
  logistics: (
    <>
      <WuvDashboard x={140} y={72} />
      <rect x="300" y="96" width="100" height="56" rx="6" fill="#fff" stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.35" />
      <rect x="312" y="116" width="76" height="6" rx="3" fill="#22C55E" fillOpacity="0.4" />
    </>
  ),
};

export function WuvIndustryCardVisual({ industry }: { industry: WuvIndustryAnimationId }) {
  const gradId = `wuv-ind-bg-${industry}`;
  return (
    <svg viewBox="0 0 360 200" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8f7ff" />
          <stop offset="100%" stopColor="#eef4ff" />
        </linearGradient>
      </defs>
      <rect width="360" height="200" fill={`url(#${gradId})`} />
      {industryMini[industry]}
    </svg>
  );
}
