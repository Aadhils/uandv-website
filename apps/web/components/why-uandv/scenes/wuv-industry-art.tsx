'use client';

import { useId, type ReactNode } from 'react';

import { cn } from '@uandv/ui';

import type { WuvIndustryAnimationId } from '@/lib/why-uandv-animations';

import { useInView, useReducedMotion } from '../wuv-motion';

import {
  WuvChatBubble,
  WuvDashboard,
  WuvDocument,
  WuvLaptop,
  WuvPerson,
  WuvPhone,
} from './wuv-business-art';

const VB_W = 640;
const VB_H = 360;

function ArtBg({ gradId, shadowId }: { gradId: string; shadowId: string }) {
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8f7ff" />
          <stop offset="45%" stopColor="#f4f8ff" />
          <stop offset="100%" stopColor="#eef4ff" />
        </linearGradient>
        <filter id={shadowId} x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1E3A8A" floodOpacity="0.1" />
        </filter>
        <filter id={`${shadowId}-lg`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#7C3AED" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width={VB_W} height={VB_H} fill={`url(#${gradId})`} />
      <circle cx="560" cy="48" r="72" fill="#7C3AED" fillOpacity="0.07" />
      <circle cx="72" cy="300" r="56" fill="#1E3A8A" fillOpacity="0.05" />
      <circle cx="480" cy="280" r="40" fill="#7C3AED" fillOpacity="0.04" />
    </>
  );
}

function Panel({
  x,
  y,
  w,
  h,
  title,
  accent = '#7C3AED',
  shadowId,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  accent?: string;
  shadowId?: string;
  className?: string;
}) {
  return (
    <g className={className} filter={shadowId ? `url(#${shadowId})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="#fff" stroke={accent} strokeWidth="1.5" strokeOpacity="0.32" />
      <rect x={x + 1} y={y + 1} width={w - 2} height="28" rx="11" fill={accent} fillOpacity="0.06" />
      <text x={x + 16} y={y + 22} fill={accent} fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
        {title}
      </text>
    </g>
  );
}

function GlassWidget({
  x,
  y,
  w,
  h,
  shadowId,
  floatClass = 'wuv-industry-float-1',
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  shadowId?: string;
  floatClass?: string;
  children?: ReactNode;
}) {
  return (
    <g className={floatClass} filter={shadowId ? `url(#${shadowId})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#fff" fillOpacity="0.96" stroke="#E2E8F0" strokeWidth="1" />
      {children}
    </g>
  );
}

function StatusPill({
  x,
  y,
  label,
  tone = 'success',
  className,
}: {
  x: number;
  y: number;
  label: string;
  tone?: 'success' | 'brand' | 'sky' | 'warn';
  className?: string;
}) {
  const colors = {
    success: { fill: '#F0FDF4', stroke: '#86EFAC', text: '#16A34A' },
    brand: { fill: '#F5F3FF', stroke: '#C4B5FD', text: '#7C3AED' },
    sky: { fill: '#F0F9FF', stroke: '#7DD3FC', text: '#0284C7' },
    warn: { fill: '#FFF7ED', stroke: '#FDBA74', text: '#EA580C' },
  }[tone];
  const w = label.length * 6.5 + 28;

  return (
    <g className={className}>
      <rect x={x} y={y} width={w} height="24" rx="12" fill={colors.fill} stroke={colors.stroke} strokeWidth="1" />
      <text x={x + 12} y={y + 16} fill={colors.text} fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">
        {label}
      </text>
    </g>
  );
}

function StatusDot({ cx, cy, color = '#22C55E', className }: { cx: number; cy: number; color?: string; className?: string }) {
  return (
    <g className={className}>
      <circle cx={cx} cy={cy} r="5" fill={color} fillOpacity="0.2" />
      <circle cx={cx} cy={cy} r="3" fill={color} />
    </g>
  );
}

function MiniChart({
  x,
  y,
  w,
  h,
  className,
  color = '#7C3AED',
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  color?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <path
        d={`M${x + 12} ${y + h - 14} L${x + w * 0.28} ${y + h * 0.55} L${x + w * 0.48} ${y + h * 0.62} L${x + w * 0.68} ${y + h * 0.38} L${x + w - 12} ${y + h * 0.45}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        className={className}
      />
    </g>
  );
}

function Connector({
  d,
  className,
  accent = '#7C3AED',
}: {
  d: string;
  className?: string;
  accent?: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={accent}
      strokeWidth="1.5"
      strokeOpacity="0.45"
      strokeDasharray="4 3"
      className={className}
    />
  );
}

function ArrowHead({ x, y, angle = 0, color = '#7C3AED' }: { x: number; y: number; angle?: number; color?: string }) {
  return (
    <polygon
      points="0,-4 8,0 0,4"
      fill={color}
      fillOpacity="0.7"
      transform={`translate(${x}, ${y}) rotate(${angle})`}
    />
  );
}

function HealthcareScene({ shadowId }: { shadowId: string }) {
  return (
    <>
      {/* Hero: doctor + patient consult */}
      <ellipse cx="108" cy="248" rx="56" ry="8" fill="#1E3A8A" fillOpacity="0.06" />
      <WuvPerson x={52} y={148} variant="consultant" facing="right" scale={0.92} />
      <WuvPerson x={132} y={160} variant="owner" facing="left" scale={0.86} />
      <rect x="88" y="210" width="72" height="6" rx="3" fill="#E2E8F0" />
      <circle cx="88" cy="196" r="10" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="1.2" />
      <path d="M88 192 v8 M84 196 h8" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />

      {/* Main vitals dashboard */}
      <Panel x={196} y={44} w={252} h={156} title="Vitals dashboard" accent="#0EA5E9" shadowId={shadowId} />
      <rect x="216" y="80" width="212" height="8" rx="4" fill="#E2E8F0" />
      <rect x="216" y="80" width="156" height="8" rx="4" fill="#0EA5E9" fillOpacity="0.5" className="wuv-industry-progress" />
      <MiniChart x={216} y={98} w={128} h={72} className="wuv-industry-chart-rise" color="#0EA5E9" />
      <g className="wuv-industry-vitals">
        <rect x="356" y="98" width="72" height="32" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
        <StatusDot cx={368} cy={110} color="#22C55E" className="wuv-industry-pulse" />
        <text x="378" y="118" fill="#16A34A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          Vitals OK
        </text>
        <rect x="356" y="138" width="72" height="32" rx="6" fill="#F0F9FF" stroke="#7DD3FC" strokeWidth="1" />
        <text x="366" y="158" fill="#0284C7" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          BP 118/76
        </text>
      </g>
      <path
        d="M216 178 L256 162 L296 170 L336 152 L376 158 L416 148"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="2"
        className="wuv-industry-chart-rise wuv-industry-heartbeat"
      />

      {/* Floating: appointment queue */}
      <GlassWidget x={468} y={52} w={148} h={88} shadowId={shadowId} floatClass="wuv-industry-float-2">
        <text x="484" y="72" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          Queue
        </text>
        <rect x="484" y="78" width="116" height="6" rx="3" fill="#E2E8F0" />
        <rect x="484" y="90" width="96" height="6" rx="3" fill="#7C3AED" fillOpacity="0.25" />
        <rect x="484" y="102" width="108" height="6" rx="3" fill="#E2E8F0" />
        <rect x="484" y="114" width="72" height="6" rx="3" fill="#E2E8F0" />
        <StatusDot cx={596} cy={81} color="#7C3AED" />
      </GlassWidget>

      <StatusPill x={468} y={152} label="HIPAA Secure" tone="sky" className="wuv-industry-float-3" />
      <StatusPill x={196} y={212} label="72 bpm" tone="brand" className="wuv-industry-float-1 wuv-industry-status" />
      <WuvDocument x={556} y={168} signed />

      <Connector d="M184 196 C210 180 196 120 216 100" className="wuv-industry-route" accent="#0EA5E9" />
      <ArrowHead x={214} y={102} angle={-30} color="#0EA5E9" />
    </>
  );
}

function EducationScene({ shadowId }: { shadowId: string }) {
  return (
    <>
      {/* Hero: student at laptop */}
      <ellipse cx="88" cy="268" rx="52" ry="7" fill="#1E3A8A" fillOpacity="0.06" />
      <WuvPerson x={40} y={156} variant="team" facing="right" scale={0.9} />
      <WuvLaptop x={32} y={216} w={80} />
      <rect x="28" y="248" width="88" height="6" rx="3" fill="#E2E8F0" />

      {/* Main course progress dashboard */}
      <Panel x={148} y={40} w={288} h={164} title="Course progress" accent="#6366F1" shadowId={shadowId} />
      <rect x="168" y="76" width="248" height="10" rx="5" fill="#E2E8F0" />
      <rect x="168" y="76" width="188" height="10" rx="5" fill="#6366F1" fillOpacity="0.45" className="wuv-industry-progress" />
      <text x="168" y="104" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
        Module 4 of 5
      </text>

      {/* Live class widget inside dashboard */}
      <rect x="168" y="112" width="116" height="76" rx="6" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="176" y="120" width="100" height="52" rx="4" fill="#1E293B" fillOpacity="0.85" />
      <circle cx="226" cy="146" r="14" fill="#6366F1" fillOpacity="0.3" />
      <polygon points="222,140 222,152 234,146" fill="#fff" fillOpacity="0.9" />
      <text x="176" y="184" fill="#6366F1" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
        Live class
      </text>
      <StatusDot cx={276} cy={180} color="#EF4444" className="wuv-industry-pulse" />

      <rect x="296" y="112" width="120" height="10" rx="5" fill="#E2E8F0" />
      <rect x="296" y="130" width="96" height="10" rx="5" fill="#E2E8F0" />
      <rect x="296" y="148" width="108" height="10" rx="5" fill="#22C55E" fillOpacity="0.35" />
      <rect x="296" y="166" width="72" height="10" rx="5" fill="#E2E8F0" />

      {/* Floating: attendance ring */}
      <GlassWidget x={456} y={48} w={108} h={100} shadowId={shadowId} floatClass="wuv-industry-float-2">
        <circle cx="510" cy="88" r="28" fill="#fff" stroke="#6366F1" strokeWidth="1.5" strokeOpacity="0.35" />
        <circle
          cx="510"
          cy="88"
          r="22"
          fill="none"
          stroke="#6366F1"
          strokeWidth="3.5"
          strokeDasharray="100 38"
          strokeLinecap="round"
          className="wuv-industry-progress"
        />
        <text x="510" y="93" textAnchor="middle" fill="#6366F1" fontSize="13" fontWeight="700" fontFamily="system-ui,sans-serif">
          92%
        </text>
        <text x="510" y="128" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
          Attendance
        </text>
      </GlassWidget>

      {/* Assignment due chip */}
      <StatusPill x={456} y={164} label="Due Fri" tone="warn" className="wuv-industry-float-3" />
      <StatusPill x={148} y={216} label="Enrolled" tone="success" className="wuv-industry-float-1 wuv-industry-status" />

      <Connector d="M120 200 C140 160 148 120 168 100" className="wuv-industry-route" accent="#6366F1" />
      <ArrowHead x={166} y={102} angle={-20} color="#6366F1" />
    </>
  );
}

function FinanceScene({ shadowId }: { shadowId: string }) {
  return (
    <>
      {/* Hero: portfolio dashboard */}
      <g filter={`url(#${shadowId})`}>
        <WuvDashboard x={28} y={44} />
      </g>

      {/* Main transactions panel */}
      <Panel x={196} y={40} w={244} h={164} title="Portfolio & transactions" accent="#1E3A8A" shadowId={shadowId} />
      <rect x="216" y="76" width="204" height="56" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="228" y="88" width="80" height="8" rx="4" fill="#E2E8F0" />
      <rect x="228" y="104" width="108" height="8" rx="4" fill="#E2E8F0" />
      <rect x="228" y="120" width="64" height="8" rx="4" fill="#7C3AED" fillOpacity="0.35" />
      <text
        x="340"
        y="96"
        fill="#16A34A"
        fontSize="9"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        className="wuv-industry-revenue"
      >
        +$12.4k
      </text>
      <text x="340" y="112" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
        Wire transfer
      </text>
      <MiniChart x={216} y={140} w={204} h={48} className="wuv-industry-chart-rise" color="#1E3A8A" />

      {/* Floating KPI cards */}
      <GlassWidget x={460} y={44} w={108} h={64} shadowId={shadowId} floatClass="wuv-industry-float-1">
        <text x="476" y="68" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
          Revenue
        </text>
        <text
          x="476"
          y="88"
          fill="#16A34A"
          fontSize="14"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
          className="wuv-industry-revenue"
        >
          +24%
        </text>
        <path d="M540 80 L548 72 L556 76 L564 64" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" className="wuv-industry-chart-rise" />
      </GlassWidget>

      <GlassWidget x={460} y={120} w={108} h={64} shadowId={shadowId} floatClass="wuv-industry-float-2">
        <text x="476" y="144" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
          Active users
        </text>
        <text x="476" y="164" fill="#1E3A8A" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
          8.2k
        </text>
        <rect x="536" y="148" width="6" height="16" rx="2" fill="#7C3AED" fillOpacity="0.5" />
        <rect x="546" y="140" width="6" height="24" rx="2" fill="#7C3AED" fillOpacity="0.7" />
      </GlassWidget>

      <circle cx="460" cy="208" r="22" fill="#fff" stroke="#22C55E" strokeWidth="2" className="wuv-industry-check" />
      <path d="M450 208 l7 7 l16-18" fill="none" stroke="#22C55E" strokeWidth="2.5" />
      <StatusPill x={488} y={196} label="Trending up" tone="success" className="wuv-industry-float-3" />
      <WuvDocument x={28} y={152} signed />

      <Connector d="M168 88 C180 72 196 68 216 76" className="wuv-industry-route" accent="#1E3A8A" />
      <ArrowHead x={214} y={76} angle={10} color="#1E3A8A" />
    </>
  );
}

function TravelScene({ shadowId }: { shadowId: string }) {
  return (
    <>
      {/* Hero: route map */}
      <path
        d="M80 220 L200 100 L320 160 L440 80 L560 140"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="2"
        strokeOpacity="0.15"
      />
      <path
        d="M80 220 L200 100 L320 160 L440 80"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="2.5"
        strokeDasharray="8 5"
        className="wuv-industry-route"
      />
      <circle cx="80" cy="220" r="8" fill="#7C3AED" />
      <circle cx="200" cy="100" r="7" fill="#fff" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="320" cy="160" r="7" fill="#fff" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="440" cy="80" r="14" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.35" className="wuv-industry-pin-ring" />
      <circle cx="440" cy="80" r="8" fill="#22C55E" className="wuv-industry-check wuv-industry-pin" />

      {/* Map landmark */}
      <path
        d="M380 60 L420 40 L460 60 L440 100 L400 100 Z"
        fill="#7C3AED"
        fillOpacity="0.1"
        stroke="#7C3AED"
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      <circle cx="420" cy="68" r="14" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" />
      <path d="M408 68 h24 M420 56 v24" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />

      {/* Itinerary panel */}
      <Panel x={40} y={228} w={176} h={96} title="Itinerary" accent="#7C3AED" shadowId={shadowId} />
      <rect x="60" y="264" width="136" height="8" rx="4" fill="#7C3AED" fillOpacity="0.35" className="wuv-industry-progress" />
      <rect x="60" y="280" width="96" height="6" rx="3" fill="#E2E8F0" />
      <rect x="60" y="294" width="72" height="6" rx="3" fill="#E2E8F0" />
      <StatusDot cx={184} cy={268} color="#22C55E" className="wuv-industry-pulse" />

      {/* Floating destination card */}
      <GlassWidget x={472} y={48} w={132} h={92} shadowId={shadowId} floatClass="wuv-industry-float-2">
        <rect x="488" y="60" width="100" height="44" rx="6" fill="#7C3AED" fillOpacity="0.12" />
        <text x="496" y="78" fill="#7C3AED" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">
          Tokyo
        </text>
        <text x="496" y="94" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
          Mar 14 – 21
        </text>
        <rect x="488" y="104" width="72" height="20" rx="10" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
        <text x="500" y="118" fill="#16A34A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          Confirmed
        </text>
      </GlassWidget>

      <WuvChatBubble x={280} y={36} text="Booking confirmed" />
      <g className="wuv-industry-float-3">
        <WuvPhone x={528} y={168} />
      </g>
      <StatusPill x={280} y={200} label="2 stops" tone="brand" className="wuv-industry-float-1" />

      <Connector d="M216 264 C280 220 360 180 420 100" className="wuv-industry-route" accent="#7C3AED" />
      <ArrowHead x={418} y={102} angle={-40} color="#7C3AED" />
    </>
  );
}

function HospitalityScene({ shadowId }: { shadowId: string }) {
  return (
    <>
      {/* Hero: front desk reception */}
      <ellipse cx="148" cy="248" rx="72" ry="8" fill="#1E3A8A" fillOpacity="0.06" />
      <Panel x={36} y={40} w={272} h={168} title="Front desk" accent="#8B5CF6" shadowId={shadowId} />
      <rect x="56" y="200" width="232" height="8" rx="4" fill="#E2E8F0" />
      <WuvPerson x={64} y={108} variant="consultant" facing="right" scale={0.82} />
      <WuvPerson x={148} y={116} variant="owner" facing="left" scale={0.76} />
      <rect x="200" y="128" width="92" height="56" rx="6" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1" />
      <text x="212" y="148" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
        Room 204
      </text>
      <rect x="212" y="156" width="68" height="18" rx="9" fill="#fff" stroke="#C4B5FD" strokeWidth="1" className="wuv-industry-status" />
      <text x="246" y="169" textAnchor="middle" fill="#7C3AED" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
        Ready
      </text>
      <WuvPhone x={248} y={108} />

      {/* Reservations calendar dashboard */}
      <Panel x={328} y={44} w={212} h={152} title="Reservations" accent="#8B5CF6" shadowId={shadowId} />
      <rect x="348" y="80" width="8" height="8" rx="2" fill="#8B5CF6" fillOpacity="0.3" />
      <rect x="362" y="80" width="8" height="8" rx="2" fill="#E2E8F0" />
      <rect x="376" y="80" width="8" height="8" rx="2" fill="#8B5CF6" fillOpacity="0.5" />
      <rect x="390" y="80" width="8" height="8" rx="2" fill="#E2E8F0" />
      <rect x="404" y="80" width="8" height="8" rx="2" fill="#22C55E" fillOpacity="0.4" />
      <rect x="418" y="80" width="8" height="8" rx="2" fill="#E2E8F0" />
      <rect x="432" y="80" width="8" height="8" rx="2" fill="#8B5CF6" fillOpacity="0.3" />
      <rect x="348" y="100" width="172" height="10" rx="5" fill="#E2E8F0" />
      <rect x="348" y="118" width="132" height="10" rx="5" fill="#E2E8F0" />
      <rect x="348" y="136" width="152" height="10" rx="5" fill="#8B5CF6" fillOpacity="0.25" />
      <rect x="348" y="160" width="80" height="24" rx="12" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1" className="wuv-industry-status" />
      <text x="388" y="176" textAnchor="middle" fill="#7C3AED" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
        Check-in
      </text>

      {/* Floating room availability */}
      <GlassWidget x={460} y={208} w={148} h={72} shadowId={shadowId} floatClass="wuv-industry-float-2">
        <text x="476" y="228" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          Availability
        </text>
        <rect x="476" y="236" width="116" height="8" rx="4" fill="#E2E8F0" />
        <rect x="476" y="236" width="84" height="8" rx="4" fill="#8B5CF6" fillOpacity="0.45" className="wuv-industry-progress" />
        <text x="476" y="262" fill="#16A34A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          12 rooms open
        </text>
      </GlassWidget>

      <g className="wuv-industry-float-3">
        <WuvChatBubble x={328} y={212} text="Guest arrives" />
      </g>
      <StatusPill x={36} y={220} label="VIP arrival" tone="brand" className="wuv-industry-float-1" />

      <Connector d="M308 140 C320 120 328 100 348 88" className="wuv-industry-route" accent="#8B5CF6" />
      <ArrowHead x={346} y={90} angle={20} color="#8B5CF6" />
    </>
  );
}

function DeliveryTruck({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="8" width="36" height="20" rx="4" fill="#3B82F6" />
      <rect x="36" y="4" width="28" height="24" rx="4" fill="#3B82F6" fillOpacity="0.85" />
      <rect x="40" y="8" width="16" height="12" rx="2" fill="#F0F9FF" fillOpacity="0.7" />
      <circle cx="12" cy="30" r="6" fill="#1E293B" />
      <circle cx="12" cy="30" r="3" fill="#94A3B8" />
      <circle cx="52" cy="30" r="6" fill="#1E293B" />
      <circle cx="52" cy="30" r="3" fill="#94A3B8" />
    </g>
  );
}

function LogisticsScene({ shadowId }: { shadowId: string }) {
  return (
    <>
      {/* Hero: dispatch map with truck */}
      <Panel x={32} y={44} w={236} h={160} title="Dispatch map" accent="#3B82F6" shadowId={shadowId} />
      <path
        d="M56 168 Q140 100 220 132 T380 108"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2.5"
        strokeDasharray="8 5"
        className="wuv-industry-route"
      />
      <circle cx="120" cy="152" r="4" fill="#3B82F6" className="wuv-industry-tracking-dot" />
      <circle cx="56" cy="168" r="8" fill="#7C3AED" />
      <circle cx="380" cy="108" r="8" fill="#22C55E" className="wuv-industry-check" />
      <g className="wuv-industry-float-1">
        <DeliveryTruck x={148} y={120} />
      </g>
      <rect x="72" y="80" width="52" height="32" rx="6" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.4" />
      <text x="80" y="100" fill="#3B82F6" fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">
        Hub A
      </text>

      {/* Shipment tracking panel */}
      <Panel x={288} y={40} w={212} h={100} title="Shipment tracking" accent="#3B82F6" shadowId={shadowId} />
      <rect x="308" y="76" width="172" height="8" rx="4" fill="#E2E8F0" />
      <rect x="308" y="76" width="124" height="8" rx="4" fill="#3B82F6" fillOpacity="0.5" className="wuv-industry-progress" />
      <rect x="308" y="92" width="140" height="6" rx="3" fill="#E2E8F0" />
      <rect x="308" y="106" width="96" height="6" rx="3" fill="#22C55E" fillOpacity="0.4" />
      <StatusDot cx={476} cy={80} color="#3B82F6" className="wuv-industry-pulse" />

      {/* Dispatch board mini-panel */}
      <GlassWidget x={288} y={156} w={212} h={88} shadowId={shadowId} floatClass="wuv-industry-float-2">
        <text x="304" y="176" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          Dispatch board
        </text>
        <rect x="304" y="184" width="80" height="6" rx="3" fill="#7C3AED" fillOpacity="0.3" />
        <rect x="304" y="198" width="108" height="6" rx="3" fill="#E2E8F0" />
        <rect x="304" y="212" width="64" height="6" rx="3" fill="#E2E8F0" />
        <rect x="304" y="226" width="92" height="6" rx="3" fill="#3B82F6" fillOpacity="0.25" />
        <StatusDot cx={480} cy={187} color="#22C55E" />
      </GlassWidget>

      {/* Floating ETA widget */}
      <GlassWidget x={460} y={44} w={148} h={80} shadowId={shadowId} floatClass="wuv-industry-float-3">
        <text x="476" y="64" fill="#64748B" fontSize="8" fontFamily="system-ui,sans-serif">
          ETA
        </text>
        <text x="476" y="86" fill="#1E3A8A" fontSize="16" fontWeight="700" fontFamily="system-ui,sans-serif">
          2h 14m
        </text>
        <rect x="476" y="94" width="72" height="20" rx="10" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1" />
        <text x="488" y="108" fill="#7C3AED" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
          In transit
        </text>
      </GlassWidget>

      <g filter={`url(#${shadowId})`}>
        <WuvDashboard x={460} y={256} />
      </g>
      <StatusPill x={32} y={220} label="On route" tone="sky" className="wuv-industry-status" />

      <Connector d="M268 140 C280 120 288 100 308 88" className="wuv-industry-route" accent="#3B82F6" />
      <ArrowHead x={306} y={90} angle={15} color="#3B82F6" />
    </>
  );
}

const industryScenes: Record<WuvIndustryAnimationId, (props: { shadowId: string }) => React.JSX.Element> = {
  healthcare: HealthcareScene,
  education: EducationScene,
  finance: FinanceScene,
  travel: TravelScene,
  hospitality: HospitalityScene,
  logistics: LogisticsScene,
};

export function WuvIndustryBannerArt({
  industry,
  className,
}: {
  industry: WuvIndustryAnimationId;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const grad = `wuv-ind-art-${uid}-${industry}`;
  const shadow = `wuv-ind-shadow-${uid}-${industry}`;
  const Scene = industryScenes[industry];

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={cn('wuv-industry-art', className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <ArtBg gradId={grad} shadowId={shadow} />
      <Scene shadowId={shadow} />
    </svg>
  );
}

/** Shared 16:9 frame for industry card banners */
export function WuvIndustryCardBanner({
  industry,
  className,
}: {
  industry: WuvIndustryAnimationId;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const reduced = useReducedMotion();

  const labels: Record<WuvIndustryAnimationId, string> = {
    healthcare: 'Healthcare: secure patient workflow and hospital dashboard',
    education: 'Education: student portal, online classes, and learning dashboard',
    finance: 'Finance: analytics dashboard, growth charts, and transactions',
    travel: 'Travel: booking system, route map, and destination planning',
    hospitality: 'Hospitality: hotel reception, reservations, and room management',
    logistics: 'Logistics: shipment tracking, delivery routes, and dispatch dashboard',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-industry-card-banner-art relative aspect-video w-full overflow-hidden rounded-t-uv-2xl',
        `wuv-industry--${industry}`,
        inView && !reduced && 'is-premium-active',
        className,
      )}
      role="img"
      aria-label={labels[industry]}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7C3AED]/12 via-transparent to-[#1E3A8A]/8"
        aria-hidden
      />
      <WuvIndustryBannerArt industry={industry} className="h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30"
        aria-hidden
      />
    </div>
  );
}
