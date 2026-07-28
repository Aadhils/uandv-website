'use client';

import { cn } from '@uandv/ui';

import { useInView, useReducedMotion } from '../wuv-motion';

import {
  WuvChatBubble,
  WuvDesk,
  WuvDocument,
  WuvLaptop,
  WuvMeetingTable,
  WuvPerson,
  WuvPhone,
  WuvSceneBackdrop,
  WuvSceneIconBadge,
} from './wuv-business-art';
import { WuvSceneShell } from './wuv-scene-shell';

const LABEL =
  'Frustrated owner alone with missed updates versus confident partnership meeting with U&V';

export function WuvBadVendorScene({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const active = reduced || inView;

  return (
    <div ref={ref} className={cn('w-full', active && 'is-active', className)}>
      <WuvSceneShell label={LABEL} aspectClassName="aspect-[7/5] min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
        <WuvSceneBackdrop tone="lavender">
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 sm:left-6 sm:top-6">
            <WuvSceneIconBadge name="CircleAlert" label="Too common" tone="navy" className="opacity-90" />
            <WuvSceneIconBadge name="Handshake" label="With U&V" tone="brand" className="hidden sm:flex" />
          </div>
          <svg viewBox="0 0 640 360" className={cn('h-full w-full', active && 'wuv-scene-enter')} aria-hidden>
            <text x="160" y="36" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="600" letterSpacing="0.08em" fontFamily="system-ui,sans-serif">
              TOO COMMON
            </text>
            <text x="480" y="36" textAnchor="middle" fill="#7C3AED" fontSize="10" fontWeight="600" letterSpacing="0.08em" fontFamily="system-ui,sans-serif">
              WITH U&amp;V
            </text>
            <line x1="320" y1="48" x2="320" y2="332" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />

            {/* Alone at desk — missed calls, confusion */}
            <g className={active && !reduced ? 'wuv-bv-before' : undefined}>
              <WuvDesk x={56} y={220} w={140} />
              <WuvPerson x={120} y={128} variant="owner" facing="right" />
              <WuvLaptop x={88} y={172} w={64} />
              <WuvPhone x={168} y={156} />
              <WuvChatBubble x={48} y={72} text="Still waiting…" />
              <circle cx="200" cy="88" r="14" fill="#FEF2F2" stroke="#F87171" strokeWidth="1.2" />
              <text x="200" y="92" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">?</text>
              <rect x="48" y="248" width="88" height="48" rx="8" fill="#fff" stroke="#FECACA" strokeWidth="1.2" />
              <text x="60" y="268" fill="#DC2626" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Deadline moved</text>
              <text x="60" y="284" fill="#94A3B8" fontSize="8" fontFamily="system-ui,sans-serif">Again</text>
            </g>

            {/* Partnership meeting — clarity */}
            <g className={active ? 'wuv-bv-after' : undefined}>
              <WuvMeetingTable x={360} y={208} w={220} />
              <WuvPerson x={400} y={116} variant="owner" facing="right" />
              <WuvPerson x={540} y={116} variant="consultant" facing="left" />
              <path d="M468 156 c10-6 24-6 34 0" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" className="wuv-scene-handshake" />
              <WuvDocument x={448} y={144} signed />
              <WuvChatBubble x={348} y={64} text="Reply within 2 hrs" />
              <rect x="520" y="248" width="88" height="36" rx="18" fill="#7C3AED" fillOpacity="0.1" stroke="#7C3AED" strokeWidth="1.2" />
              <text x="564" y="270" textAnchor="middle" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Support on</text>
            </g>
          </svg>
        </WuvSceneBackdrop>
      </WuvSceneShell>
    </div>
  );
}
