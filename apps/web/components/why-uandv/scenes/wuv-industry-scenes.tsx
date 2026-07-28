'use client';

import { cn } from '@uandv/ui';

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
  WuvSceneIconBadge,
} from './wuv-business-art';
import { WuvHealthcareScene } from './wuv-scene-healthcare';
import { WuvSceneShell } from './wuv-scene-shell';

const industryMeta: Record<
  WuvIndustryAnimationId,
  { label: string; badge: 'HeartPulse' | 'GraduationCap' | 'CreditCard' | 'Plane' | 'Hotel' | 'Truck'; sceneLabel: string }
> = {
  healthcare: { label: 'Healthcare', badge: 'HeartPulse', sceneLabel: 'Doctor and patient with secure records' },
  education: { label: 'Education', badge: 'GraduationCap', sceneLabel: 'Teachers and students in a modern classroom' },
  finance: { label: 'Finance', badge: 'CreditCard', sceneLabel: 'Advisor reviewing secure financial records' },
  travel: { label: 'Travel', badge: 'Plane', sceneLabel: 'Travel team coordinating bookings and customers' },
  hospitality: { label: 'Hospitality', badge: 'Hotel', sceneLabel: 'Hotel front desk serving guests smoothly' },
  logistics: { label: 'Logistics', badge: 'Truck', sceneLabel: 'Dispatch team tracking deliveries in real time' },
};

function EducationScene() {
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" aria-hidden>
      <WuvPerson x={100} y={132} variant="consultant" facing="right" />
      <rect x="180" y="88" width="200" height="120" rx="10" fill="#fff" stroke="#6366F1" strokeWidth="1.2" strokeOpacity="0.35" />
      <text x="200" y="112" fill="#6366F1" fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif">Classroom</text>
      <WuvPerson x={220} y={156} variant="team" facing="right" scale={0.85} />
      <WuvPerson x={280} y={160} variant="owner" facing="right" scale={0.8} />
      <WuvLaptop x={340} y={148} w={56} />
      <WuvDocument x={400} y={120} />
    </svg>
  );
}

function FinanceScene() {
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" aria-hidden>
      <WuvMeetingTable x={140} y={188} w={240} />
      <WuvPerson x={180} y={108} variant="owner" facing="right" />
      <WuvPerson x={340} y={108} variant="consultant" facing="left" />
      <WuvDocument x={248} y={132} signed />
      <WuvDashboard x={80} y={72} />
      <rect x="380" y="72" width="100" height="72" rx="8" fill="#fff" stroke="#1E3A8A" strokeWidth="1.2" strokeOpacity="0.25" />
      <text x="396" y="96" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Secure records</text>
      <rect x="392" y="106" width="76" height="6" rx="3" fill="#E2E8F0" />
      <rect x="392" y="120" width="60" height="6" rx="3" fill="#E2E8F0" />
      <circle cx="448" cy="140" r="8" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="1.2" />
    </svg>
  );
}

function TravelScene() {
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" aria-hidden>
      <WuvDesk x={80} y={200} w={120} />
      <WuvPerson x={120} y={118} variant="team" facing="right" />
      <WuvLaptop x={96} y={156} w={64} />
      <WuvPhone x={200} y={140} />
      <WuvChatBubble x={260} y={72} text="Booking confirmed" />
      <path d="M360 180 L420 120 L480 160 L440 200 Z" fill="#7C3AED" fillOpacity="0.12" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="420" cy="132" r="16" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" />
      <path d="M412 132 h16 M420 124 v16" stroke="#7C3AED" strokeWidth="1.5" />
      <WuvPerson x={400} y={168} variant="owner" facing="left" scale={0.9} />
    </svg>
  );
}

function HospitalityScene() {
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" aria-hidden>
      <rect x="120" y="96" width="280" height="120" rx="12" fill="#fff" stroke="#8B5CF6" strokeWidth="1.2" strokeOpacity="0.3" />
      <text x="144" y="120" fill="#8B5CF6" fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif">Front desk</text>
      <WuvPerson x={160} y={140} variant="consultant" facing="right" />
      <WuvPerson x={280} y={148} variant="owner" facing="left" />
      <WuvPhone x={360} y={132} />
      <WuvChatBubble x={80} y={64} text="Reservation ready" />
      <rect x="340" y="168" width="48" height="32" rx="4" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1" />
      <text x="348" y="188" fill="#64748B" fontSize="7" fontFamily="system-ui,sans-serif">Room 204</text>
    </svg>
  );
}

function LogisticsScene() {
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" aria-hidden>
      <WuvPerson x={88} y={128} variant="team" facing="right" />
      <WuvLaptop x={64} y={168} w={72} />
      <WuvDashboard x={180} y={80} />
      <rect x="340" y="120" width="140" height="72" rx="10" fill="#fff" stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.3" />
      <text x="356" y="144" fill="#1E3A8A" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">Dispatch board</text>
      <rect x="352" y="156" width="108" height="8" rx="4" fill="#22C55E" fillOpacity="0.35" />
      <rect x="352" y="172" width="88" height="8" rx="4" fill="#3B82F6" fillOpacity="0.35" />
      <path d="M360 200 h100" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <rect x="368" y="192" width="28" height="16" rx="3" fill="#3B82F6" fillOpacity="0.25" />
      <rect x="408" y="192" width="28" height="16" rx="3" fill="#7C3AED" fillOpacity="0.25" />
    </svg>
  );
}

const scenes: Record<Exclude<WuvIndustryAnimationId, 'healthcare'>, () => React.JSX.Element> = {
  education: EducationScene,
  finance: FinanceScene,
  travel: TravelScene,
  hospitality: HospitalityScene,
  logistics: LogisticsScene,
};

export function WuvIndustryBusinessScene({
  industry,
  active = true,
  className,
}: {
  industry: WuvIndustryAnimationId;
  active?: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const on = active && (reduced || inView);
  const meta = industryMeta[industry];

  if (industry === 'healthcare') {
    return (
      <div ref={ref} className={cn('w-full p-1 sm:p-2', on && 'is-active', className)}>
        <WuvHealthcareScene active={active} />
      </div>
    );
  }

  const Scene = scenes[industry];

  return (
    <div ref={ref} className={cn('w-full', on && 'is-active', className)}>
      <WuvSceneShell label={meta.sceneLabel} aspectClassName="aspect-[13/8] w-full min-h-[220px] sm:min-h-[260px]">
        <WuvSceneBackdrop tone="sky">
          <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
            <WuvSceneIconBadge name={meta.badge} label={meta.label} />
          </div>
          <div className={cn('h-full w-full', on && 'wuv-scene-enter')}>
            <Scene />
          </div>
        </WuvSceneBackdrop>
      </WuvSceneShell>
    </div>
  );
}
