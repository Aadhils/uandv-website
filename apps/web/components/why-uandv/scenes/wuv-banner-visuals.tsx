'use client';

import { useId } from 'react';

import { cn } from '@uandv/ui';

import type { WuvPartnerPathStage } from '@/lib/why-uandv-partner-path';
import type { WuvIndustryAnimationId } from '@/lib/why-uandv-animations';

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
  WuvWhiteboard,
} from './wuv-business-art';

function BannerShell({
  label,
  children,
  className,
  tone = 'lavender',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'lavender' | 'sky' | 'warm' | 'mint';
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-banner-shell relative h-full min-h-[inherit] w-full overflow-hidden rounded-uv-2xl border border-uv-brand/15 shadow-[0_16px_44px_rgb(30_58_138_/_0.11)]',
        inView && !reduced && 'is-banner-active',
        className,
      )}
      role="img"
      aria-label={label}
    >
      <WuvSceneBackdrop tone={tone} className="h-full min-h-[inherit] rounded-[inherit]">
        <div className="relative h-full min-h-[inherit] w-full">{children}</div>
      </WuvSceneBackdrop>
    </div>
  );
}

/** Hero — partnership banner filling visual area */
export function WuvHeroBanner({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <BannerShell label="U&V partnership: consultant and business owner with agreement and progress" tone="sky" className={className}>
      <svg viewBox="0 0 560 340" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`wuv-hero-bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4f8ff" />
            <stop offset="100%" stopColor="#ede9fe" />
          </linearGradient>
        </defs>
        <rect width="560" height="340" fill={`url(#wuv-hero-bg-${uid})`} />
        <rect x="24" y="24" width="512" height="220" rx="16" fill="#fff" fillOpacity="0.7" stroke="#E2E8F0" strokeWidth="1.2" />
        <WuvMeetingTable x={140} y={168} w={280} />
        <WuvPerson x={200} y={88} variant="owner" facing="right" scale={1.05} />
        <WuvPerson x={360} y={88} variant="consultant" facing="left" scale={1.05} />
        <path d="M278 138 c12-8 32-8 44 0" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" className="wuv-banner-handshake" />
        <WuvLaptop x={248} y={128} w={68} />
        <rect x="332" y="118" width="72" height="88" rx="8" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" />
        <text x="344" y="138" fill="#1E3A8A" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Agreement</text>
        <path d="M344 152 h48 M344 166 h36" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="380" cy="182" r="10" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="1.5" className="wuv-banner-check" />
        <path d="M376 182 l3 3 l6-7" fill="none" stroke="#22C55E" strokeWidth="1.8" />
        <rect x="40" y="268" width="480" height="44" rx="10" fill="#fff" stroke="#C4B5FD" strokeWidth="1.2" />
        <text x="56" y="286" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Partnership progress</text>
        <rect x="56" y="296" width="448" height="8" rx="4" fill="#E2E8F0" />
        <rect x="56" y="296" width="320" height="8" rx="4" fill="#7C3AED" fillOpacity="0.55" className="wuv-banner-progress" />
        {['Listen', 'Plan', 'Build', 'Launch', 'Grow'].map((s, i) => (
          <g key={s}>
            <circle cx={120 + i * 80} cy="300" r="5" fill={i < 3 ? '#7C3AED' : '#CBD5E1'} />
            <text x={120 + i * 80} y="318" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="system-ui,sans-serif">{s}</text>
          </g>
        ))}
      </svg>
    </BannerShell>
  );
}

/** Common experience — before / after comparison banner */
export function WuvCompareBanner({ className }: { className?: string }) {
  return (
    <BannerShell label="Vendor problems versus U&V partnership outcomes" className={className}>
      <svg viewBox="0 0 560 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect x="16" y="16" width="256" height="268" rx="12" fill="#FEF2F2" fillOpacity="0.5" stroke="#FECACA" strokeWidth="1.2" />
        <rect x="288" y="16" width="256" height="268" rx="12" fill="#F5F3FF" fillOpacity="0.6" stroke="#C4B5FD" strokeWidth="1.2" />
        <text x="144" y="40" textAnchor="middle" fill="#DC2626" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">TOO COMMON</text>
        <text x="416" y="40" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">WITH U&amp;V</text>
        {/* Before */}
        <WuvDesk x={40} y={200} w={110} />
        <WuvPerson x={88} y={108} variant="owner" facing="right" scale={0.9} />
        <rect x="32" y="56" width="120" height="44" rx="8" fill="#fff" stroke="#FECACA" strokeWidth="1.2" className="wuv-banner-warning" />
        <text x="44" y="74" fill="#DC2626" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">No reply · 3 days</text>
        <rect x="44" y="80" width="96" height="4" rx="2" fill="#FECACA" />
        <rect x="32" y="148" width="88" height="36" rx="6" fill="#fff" stroke="#FED7AA" strokeWidth="1" />
        <text x="44" y="164" fill="#EA580C" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">Deadline moved</text>
        <rect x="140" y="120" width="72" height="52" rx="6" fill="#fff" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3" />
        <text x="152" y="158" fill="#94A3B8" fontSize="7" fontFamily="system-ui,sans-serif">Incomplete</text>
        <text x="88" y="248" textAnchor="middle" fill="#DC2626" fontSize="14" fontFamily="system-ui,sans-serif">?</text>
        {/* After */}
        <WuvMeetingTable x={320} y={188} w={180} />
        <WuvPerson x={352} y={100} variant="owner" facing="right" scale={0.85} />
        <WuvPerson x={448} y={100} variant="consultant" facing="left" scale={0.85} />
        <rect x="304" y="52" width="128" height="40" rx="8" fill="#fff" stroke="#C4B5FD" strokeWidth="1.2" />
        <text x="316" y="70" fill="#1E3A8A" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">Reply within 2 hours</text>
        <path d="M316 82 h100" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
        <path d="M316 82 h72" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" className="wuv-banner-progress" />
        <WuvDocument x={400} y={108} signed />
        <rect x="456" y="148" width="64" height="40" rx="8" fill="#fff" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.35" />
        <circle cx="488" cy="162" r="6" fill="#22C55E" className="wuv-banner-check" />
        <text x="488" y="178" textAnchor="middle" fill="#16A34A" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif">LIVE</text>
        <rect x="456" y="196" width="72" height="24" rx="12" fill="#7C3AED" fillOpacity="0.12" stroke="#7C3AED" strokeWidth="1" className="wuv-banner-support" />
        <text x="492" y="212" textAnchor="middle" fill="#7C3AED" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">Support on</text>
      </svg>
    </BannerShell>
  );
}

const stageOrder: WuvPartnerPathStage['id'][] = [
  'listen',
  'understand',
  'plan',
  'build',
  'launch',
  'improve',
  'grow',
];

const stageLabels: Record<WuvPartnerPathStage['id'], string> = {
  listen: 'Listen',
  understand: 'Understand',
  plan: 'Plan',
  build: 'Build',
  launch: 'Launch',
  improve: 'Improve',
  grow: 'Grow',
};

function JourneyFeaturedScene({ stageId }: { stageId: WuvPartnerPathStage['id'] }) {
  const scenes: Record<WuvPartnerPathStage['id'], React.ReactNode> = {
    listen: (
      <>
        <WuvMeetingTable x={120} y={108} w={240} />
        <WuvPerson x={168} y={48} variant="owner" facing="right" scale={0.9} />
        <WuvPerson x={312} y={48} variant="consultant" facing="left" scale={0.9} />
        <WuvChatBubble x={48} y={24} text="Your goals" />
        <WuvDocument x={228} y={72} />
      </>
    ),
    understand: (
      <>
        <WuvWhiteboard x={32} y={32} />
        <WuvPerson x={200} y={72} variant="owner" facing="right" scale={0.85} />
        <WuvPerson x={320} y={72} variant="consultant" facing="left" scale={0.85} />
        <rect x="360" y="40" width="100" height="120" rx="10" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.3" />
        <text x="376" y="60" fill="#7C3AED" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Your world</text>
        {['Customers', 'Budget', 'Goals', 'Challenges'].map((item, i) => (
          <g key={item}>
            <rect x="372" y={68 + i * 20} width="76" height="14" rx="7" fill={i === 0 ? '#7C3AED' : '#F1F5F9'} fillOpacity={i === 0 ? 0.2 : 1} stroke="#E2E8F0" strokeWidth="1" />
            <text x="382" y={78 + i * 20} fill="#334155" fontSize="7" fontFamily="system-ui,sans-serif">{item}</text>
          </g>
        ))}
      </>
    ),
    plan: (
      <>
        <WuvWhiteboard x={48} y={36} />
        <WuvPerson x={200} y={72} variant="consultant" facing="right" scale={0.85} />
        <rect x="300" y="40" width="140" height="96" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="316" y="64" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">
          Roadmap
        </text>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4, 5, 6].map((col) => {
            const active = row === 1 && col >= 2 && col <= 4;
            return (
              <rect
                key={`${row}-${col}`}
                x={312 + col * 14}
                y={72 + row * 14}
                width="10"
                height="10"
                rx="2"
                fill={active ? '#7C3AED' : '#F1F5F9'}
                fillOpacity={active ? 0.55 : 1}
              />
            );
          }),
        )}
        <WuvDocument x={380} y={148} signed />
      </>
    ),
    build: (
      <>
        <WuvDesk x={56} y={128} w={120} />
        <WuvDesk x={220} y={128} w={120} />
        <WuvPerson x={96} y={56} variant="team" facing="right" scale={0.85} />
        <WuvPerson x={268} y={56} variant="consultant" facing="right" scale={0.85} />
        <WuvLaptop x={80} y={88} w={64} />
        <WuvLaptop x={244} y={88} w={64} />
        <WuvPhone x={380} y={72} />
        <rect x="388" y="48" width="72" height="56" rx="8" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" />
        <rect x="396" y="56" width="56" height="8" rx="4" fill="#7C3AED" fillOpacity="0.25" />
        <rect x="396" y="72" width="24" height="20" rx="4" fill="#E2E8F0" />
        <rect x="424" y="72" width="20" height="8" rx="3" fill="#E2E8F0" />
      </>
    ),
    launch: (
      <>
        <WuvPerson x={72} y={88} variant="owner" facing="right" scale={0.85} />
        <WuvPerson x={380} y={96} variant="team" facing="left" scale={0.8} />
        <circle cx="240" cy="88" r="28" fill="#22C55E" fillOpacity="0.12" stroke="#22C55E" strokeWidth="1.5" className="wuv-banner-check" />
        <text x="240" y="94" textAnchor="middle" fill="#16A34A" fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
          LIVE
        </text>
        <WuvPhone x={160} y={48} />
        <WuvPhone x={300} y={48} />
        <WuvChatBubble x={128} y={16} text="We're live!" />
      </>
    ),
    improve: (
      <>
        <WuvPerson x={72} y={80} variant="owner" facing="right" scale={0.85} />
        <WuvLaptop x={200} y={64} w={80} />
        <WuvChatBubble x={300} y={24} text="Feedback" />
        <rect x="320" y="100" width="130" height="72" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="336" y="120" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">Improvements</text>
        <rect x="336" y="128" width="98" height="8" rx="4" fill="#E2E8F0" />
        <rect x="336" y="128" width="72" height="8" rx="4" fill="#7C3AED" fillOpacity="0.5" className="wuv-banner-progress" />
        <rect x="336" y="144" width="80" height="6" rx="3" fill="#E2E8F0" />
        <rect x="336" y="156" width="60" height="6" rx="3" fill="#E2E8F0" />
      </>
    ),
    grow: (
      <>
        <WuvPerson x={56} y={80} variant="owner" facing="right" scale={0.85} />
        <WuvDashboard x={168} y={40} />
        <WuvChatBubble x={320} y={28} text="Support is here" />
        <rect x="320" y="108" width="120" height="72" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
        <path d="M332 156 L360 132 L388 140 L416 116 L444 108" fill="none" stroke="#22C55E" strokeWidth="2.5" className="wuv-banner-graph" />
        <text x="332" y="128" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
          Growth metrics
        </text>
      </>
    ),
  };

  return (
    <svg viewBox="0 0 480 200" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {scenes[stageId]}
    </svg>
  );
}

/** Journey — featured scene with connected stage track */
export function WuvJourneyStoryBanner({
  activeIndex = 0,
  className,
}: {
  activeIndex?: number;
  className?: string;
}) {
  const progress = activeIndex / (stageOrder.length - 1);

  return (
    <BannerShell label="Partnership journey from listen through grow" tone="lavender" className={cn('wuv-journey-banner', className)}>
      <div className="flex h-full min-h-[180px] flex-col sm:min-h-[200px]">
        <div className="wuv-journey-banner__scene relative min-h-[140px] flex-1 overflow-hidden px-3 pt-3 sm:min-h-[150px] sm:px-4 sm:pt-4">
          {stageOrder.map((id, index) => (
            <div
              key={id}
              className={cn(
                'wuv-journey-banner__slide absolute inset-x-3 top-3 bottom-0 transition-all duration-700 ease-out sm:inset-x-4 sm:top-4',
                index === activeIndex
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-1 opacity-0',
              )}
              aria-hidden={index !== activeIndex}
            >
              <JourneyFeaturedScene stageId={id} />
            </div>
          ))}
        </div>

        <div className="wuv-journey-banner__track px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
          <div className="relative">
            <div className="wuv-journey-banner__track-line" aria-hidden />
            <div
              className="wuv-journey-banner__track-fill"
              style={{ transform: `scaleX(${progress})` }}
              aria-hidden
            />
            <ol className="relative z-[1] flex items-start justify-between">
              {stageOrder.map((id, index) => {
                const isActive = activeIndex === index;
                const isReached = index <= activeIndex;
                return (
                  <li key={id} className="flex flex-col items-center gap-1">
                    <span
                      className={cn(
                        'wuv-journey-banner__node',
                        isActive && 'is-active',
                        isReached && 'is-reached',
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        'text-[9px] font-semibold uppercase tracking-wide sm:text-[10px]',
                        isActive ? 'text-uv-brand' : isReached ? 'text-uv-foreground' : 'text-uv-foreground-muted',
                      )}
                    >
                      {stageLabels[id]}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </BannerShell>
  );
}

/** Principles — wide banner by row */
export function WuvPrinciplesBanner({ row }: { row: 0 | 1 | 2 }) {
  const configs = [
    { label: 'Business goals and systems built to last', tone: 'lavender' as const },
    { label: 'Automation replacing manual work with clear communication', tone: 'sky' as const },
    { label: 'Go-live with ongoing support and room to grow', tone: 'warm' as const },
  ];
  const config = configs[row];

  return (
    <BannerShell label={config.label} tone={config.tone} className="min-h-[130px] sm:min-h-[150px]">
      <svg viewBox="0 0 480 180" className="h-full w-full min-h-[130px]" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {row === 0 && (
          <>
            <rect x="24" y="24" width="140" height="100" rx="10" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.35" />
            <text x="40" y="48" fill="#7C3AED" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Your priorities</text>
            {['Customers', 'Revenue', 'Operations'].map((g, i) => (
              <rect key={g} x="40" y={58 + i * 20} width={108} height="14" rx="7" fill={i === 0 ? '#7C3AED' : '#F1F5F9'} fillOpacity={i === 0 ? 0.25 : 1} stroke={i === 0 ? '#7C3AED' : '#E2E8F0'} strokeWidth="1" />
            ))}
            <rect x="200" y="32" width="120" height="80" rx="10" fill="#fff" stroke="#1E3A8A" strokeWidth="1.2" strokeOpacity="0.25" />
            <text x="216" y="52" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Built to last</text>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={216 + i * 8} y={88 - i * 16} width="40" height="14" rx="4" fill="#7C3AED" fillOpacity={0.12 + i * 0.08} stroke="#7C3AED" strokeWidth="1" />
            ))}
            <WuvDocument x={340} y={40} signed />
          </>
        )}
        {row === 1 && (
          <>
            <rect x="24" y="32" width="120" height="80" rx="10" fill="#fff" stroke="#FECACA" strokeWidth="1.2" />
            <text x="36" y="50" fill="#DC2626" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Manual tasks</text>
            <rect x="36" y="58" width="96" height="6" rx="3" fill="#FECACA" className="wuv-banner-fade" />
            <rect x="36" y="72" width="72" height="6" rx="3" fill="#FECACA" className="wuv-banner-fade" style={{ animationDelay: '0.3s' }} />
            <path d="M160 72 h40" stroke="#7C3AED" strokeWidth="2" />
            <polygon points="200,68 208,72 200,76" fill="#7C3AED" />
            <rect x="220" y="32" width="120" height="80" rx="10" fill="#fff" stroke="#C4B5FD" strokeWidth="1.2" />
            <circle cx="280" cy="72" r="18" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="1.5" className="wuv-banner-check" />
            <WuvChatBubble x={360} y={24} text="Weekly update" />
            <rect x="360" y="100" width="100" height="40" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="372" y1="120" x2="448" y2="120" stroke="#7C3AED" strokeWidth="3" strokeDasharray="6 4" className="wuv-banner-progress" />
          </>
        )}
        {row === 2 && (
          <>
            <rect x="24" y="40" width="100" height="72" rx="10" fill="#fff" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="74" cy="68" r="12" fill="#22C55E" fillOpacity="0.2" className="wuv-banner-check" />
            <text x="74" y="72" textAnchor="middle" fill="#16A34A" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">LIVE</text>
            <rect x="148" y="48" width="100" height="56" rx="10" fill="#7C3AED" fillOpacity="0.08" stroke="#7C3AED" strokeWidth="1.2" />
            <text x="198" y="72" textAnchor="middle" fill="#7C3AED" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Support active</text>
            <WuvDashboard x={268} y={28} />
            <path d="M380 120 Q420 60 460 100" fill="none" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.4" className="wuv-banner-graph" />
          </>
        )}
      </svg>
    </BannerShell>
  );
}

/** Accountability banner */
export function WuvAccountabilityBanner({ className }: { className?: string }) {
  return (
    <BannerShell label="Milestones, signed scope and active support" tone="mint" className={cn('wuv-accountability-banner', className)}>
      <svg viewBox="0 0 480 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <line x1="32" y1="200" x2="448" y2="200" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="200" x2="448" y2="200" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" className="wuv-accountability-line" />
        <WuvMeetingTable x={100} y={148} w={280} />
        <WuvPerson x={148} y={72} variant="owner" facing="right" scale={0.95} />
        <WuvPerson x={332} y={72} variant="consultant" facing="left" scale={0.95} />
        <WuvDocument x={208} y={100} signed />
        <WuvDocument x={252} y={96} signed />
        <rect x="32" y="40" width="100" height="88" rx="8" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="44" y="60" fill="#1E3A8A" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Milestones</text>
        {['Discovery', 'Build', 'Launch', 'Support'].map((s, i) => (
          <g key={s} className="wuv-accountability-node" style={{ animationDelay: `${i * 0.15}s` }}>
            <circle cx="52" cy={72 + i * 14} r="5" fill="#22C55E" fillOpacity="0.15" />
            <text x="64" y={76 + i * 14} fill="#64748B" fontSize="7" fontFamily="system-ui,sans-serif">{s}</text>
          </g>
        ))}
        <WuvChatBubble x={360} y={32} text="Progress shared" />
        <rect x="360" y="168" width="88" height="28" rx="14" fill="#7C3AED" fillOpacity="0.1" stroke="#7C3AED" strokeWidth="1" className="wuv-accountability-support" />
        <text x="404" y="186" textAnchor="middle" fill="#7C3AED" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">Support active</text>
      </svg>
    </BannerShell>
  );
}

function IndustryBannerArt({ industry, uid }: { industry: WuvIndustryAnimationId; uid: string }) {
  const grad = `wuv-ind-${uid}-${industry}`;
  const scenes: Record<WuvIndustryAnimationId, React.ReactNode> = {
    healthcare: (
      <>
        <WuvPerson x={48} y={88} variant="consultant" facing="right" scale={0.8} />
        <WuvPerson x={120} y={96} variant="owner" facing="left" scale={0.75} />
        <rect x="180" y="48" width="150" height="100" rx="10" fill="#fff" stroke="#0EA5E9" strokeWidth="1.5" strokeOpacity="0.45" />
        <text x="196" y="72" fill="#0EA5E9" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Patient record</text>
        <rect x="196" y="80" width="118" height="6" rx="3" fill="#E2E8F0" />
        <rect x="196" y="80" width="82" height="6" rx="3" fill="#0EA5E9" fillOpacity="0.5" className="wuv-banner-progress" />
        <path d="M196 110 h118" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M196 110 L220 100 L244 108 L268 92 L292 96 L314 88" fill="none" stroke="#7C3AED" strokeWidth="2" className="wuv-banner-graph" />
        <rect x="348" y="56" width="56" height="24" rx="12" fill="#fff" stroke="#22C55E" strokeWidth="1" />
        <text x="376" y="72" textAnchor="middle" fill="#16A34A" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">Secure</text>
      </>
    ),
    education: (
      <>
        <WuvPerson x={56} y={92} variant="team" facing="right" scale={0.75} />
        <rect x="140" y="44" width="180" height="108" rx="10" fill="#fff" stroke="#6366F1" strokeWidth="1.5" strokeOpacity="0.4" />
        <text x="156" y="68" fill="#6366F1" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Course dashboard</text>
        <rect x="156" y="76" width="148" height="8" rx="4" fill="#6366F1" fillOpacity="0.25" />
        <rect x="156" y="92" width="64" height="40" rx="4" fill="#F1F5F9" />
        <rect x="228" y="92" width="76" height="8" rx="4" fill="#E2E8F0" />
        <rect x="228" y="106" width="56" height="8" rx="4" fill="#E2E8F0" />
        <rect x="156" y="140" width="100" height="6" rx="3" fill="#22C55E" fillOpacity="0.4" />
        <text x="340" y="72" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">Attendance</text>
        <circle cx="360" cy="100" r="16" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeWidth="1.5" />
        <text x="360" y="104" textAnchor="middle" fill="#6366F1" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">92%</text>
      </>
    ),
    finance: (
      <>
        <WuvDashboard x={40} y={40} />
        <rect x="200" y="48" width="140" height="96" rx="10" fill="#fff" stroke="#1E3A8A" strokeWidth="1.5" strokeOpacity="0.3" />
        <text x="216" y="72" fill="#1E3A8A" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Transactions</text>
        <rect x="216" y="80" width="108" height="40" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="360" cy="72" r="20" fill="#fff" stroke="#22C55E" strokeWidth="2" />
        <path d="M352 72 l6 6 l12-14" fill="none" stroke="#22C55E" strokeWidth="2" className="wuv-banner-check" />
        <WuvDocument x={320} y={108} signed />
      </>
    ),
    travel: (
      <>
        <path d="M80 100 L200 60 L320 100 L280 140 Z" fill="#7C3AED" fillOpacity="0.12" stroke="#7C3AED" strokeWidth="1.5" />
        <circle cx="200" cy="72" r="18" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" />
        <path d="M188 72 h24 M200 60 v24" stroke="#7C3AED" strokeWidth="2" />
        <rect x="48" y="120" width="120" height="48" rx="8" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="60" y="140" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Itinerary</text>
        <rect x="60" y="148" width="96" height="6" rx="3" fill="#7C3AED" fillOpacity="0.35" className="wuv-banner-progress" />
        <WuvChatBubble x={280} y={48} text="Booking confirmed" />
        <WuvPhone x={340} y={108} />
      </>
    ),
    hospitality: (
      <>
        <rect x="48" y="48" width="200" height="100" rx="10" fill="#fff" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.35" />
        <text x="64" y="72" fill="#8B5CF6" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Front desk</text>
        <WuvPerson x={72} y={88} variant="consultant" facing="right" scale={0.7} />
        <WuvPerson x={140} y={96} variant="owner" facing="left" scale={0.65} />
        <rect x="180" y="108" width="56" height="28" rx="4" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1" />
        <text x="188" y="126" fill="#64748B" fontSize="7" fontFamily="system-ui,sans-serif">Room 204</text>
        <WuvChatBubble x={280} y={40} text="Guest arrives" />
        <rect x="300" y="88" width="80" height="56" rx="8" fill="#fff" stroke="#E2E8F0" strokeWidth="1" />
        <text x="312" y="108" fill="#1E3A8A" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">Reservation</text>
      </>
    ),
    logistics: (
      <>
        <rect x="40" y="56" width="160" height="88" rx="10" fill="#fff" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.35" />
        <text x="56" y="76" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Dispatch map</text>
        <path d="M56 120 Q120 80 180 100 T260 88" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 4" className="wuv-banner-route" />
        <circle cx="56" cy="120" r="5" fill="#7C3AED" />
        <circle cx="260" cy="88" r="5" fill="#22C55E" className="wuv-banner-check" />
        <rect x="220" y="48" width="56" height="32" rx="6" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1" />
        <rect x="232" y="60" width="32" height="16" rx="3" fill="#fff" fillOpacity="0.8" />
        <WuvDashboard x={300} y={40} />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 400 180" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8f7ff" />
          <stop offset="50%" stopColor="#f4f8ff" />
          <stop offset="100%" stopColor="#eef4ff" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill={`url(#${grad})`} />
      {scenes[industry]}
    </svg>
  );
}

export function WuvIndustryBanner({ industry }: { industry: WuvIndustryAnimationId }) {
  const uid = useId().replace(/:/g, '');
  return (
    <div className="wuv-industry-banner relative h-full min-h-[130px] w-full overflow-hidden sm:min-h-[145px]" role="img" aria-label={`${industry} industry scene`}>
      <IndustryBannerArt industry={industry} uid={uid} />
    </div>
  );
}

// Re-exports for split sections
export { WuvHeroBanner as WuvHeroVisual };
export { WuvCompareBanner as WuvCommonExperienceVisual };
export { WuvAccountabilityBanner as WuvAccountabilityVisual };
