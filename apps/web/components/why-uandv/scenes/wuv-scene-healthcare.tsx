'use client';

import { useId } from 'react';

import { cn } from '@uandv/ui';

import { useInView, useReducedMotion } from '../wuv-motion';

import { WuvSceneShell } from './wuv-scene-shell';

const LABEL =
  'Healthcare: doctor and patient with digital records, heartbeat monitor, appointment workflow, and secure status';

export function WuvHealthcareScene({ className, active = true }: { className?: string; active?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const animate = active && (reduced || inView);

  return (
    <div ref={ref} className={cn('h-full w-full', className)}>
      <WuvSceneShell
        label={LABEL}
        aspectClassName="aspect-[13/8] w-full min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]"
      >
        <svg viewBox="0 0 520 300" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id={`wuv-hc-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFF" />
              <stop offset="100%" stopColor="#EEF4FF" />
            </linearGradient>
            <filter id={`wuv-hc-shadow-${uid}`}>
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1E3A8A" floodOpacity="0.1" />
            </filter>
          </defs>
          <rect width="520" height="300" fill={`url(#wuv-hc-bg-${uid})`} rx="12" />

          {/* Secure badge */}
          <g filter={`url(#wuv-hc-shadow-${uid})`} className={animate && !reduced ? 'wuv-hc-secure' : undefined}>
            <rect x="388" y="20" width="108" height="36" rx="18" fill="#fff" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" />
            <path d="M404 38 h12 v-6 a6 6 0 0 1 12 0 v6 h-12 a6 6 0 0 0-6 6 v4 h12 v-4" fill="none" stroke="#7C3AED" strokeWidth="1.3" transform="translate(-2,2) scale(0.85)" />
            <rect x="400" y="28" width="14" height="16" rx="2" fill="#7C3AED" fillOpacity="0.12" stroke="#7C3AED" strokeWidth="1" />
            <path d="M403 36 h8 M407 32 v8" stroke="#7C3AED" strokeWidth="1" />
            <text x="448" y="42" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">Secure</text>
          </g>

          {/* Doctor */}
          <g filter={`url(#wuv-hc-shadow-${uid})`} className={animate && !reduced ? 'wuv-hc-doctor' : undefined}>
            <ellipse cx="108" cy="248" rx="36" ry="10" fill="#1E3A8A" fillOpacity="0.06" />
            <rect x="76" y="108" width="64" height="128" rx="12" fill="#fff" stroke="#1E3A8A" strokeWidth="1.5" strokeOpacity="0.25" />
            <circle cx="108" cy="88" r="22" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.2" />
            <path d="M88 108 h40 l-8 20 h-24 z" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="1" />
            <rect x="82" y="128" width="52" height="72" rx="6" fill="#fff" stroke="#E2E8F0" strokeWidth="1" />
            <path d="M132 148 c12 0 20 8 20 18" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <circle cx="152" cy="168" r="6" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1" />
            <text x="108" y="252" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">Doctor</text>
          </g>

          {/* Patient */}
          <g filter={`url(#wuv-hc-shadow-${uid})`} className={animate && !reduced ? 'wuv-hc-patient' : undefined}>
            <ellipse cx="248" cy="252" rx="40" ry="10" fill="#1E3A8A" fillOpacity="0.06" />
            <rect x="208" y="156" width="80" height="72" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1.2" />
            <circle cx="248" cy="132" r="24" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.2" />
            <rect x="220" y="168" width="56" height="48" rx="6" fill="#F1F5F9" />
            <text x="248" y="268" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="system-ui,sans-serif">Patient</text>
          </g>

          {/* Digital patient record */}
          <g filter={`url(#wuv-hc-shadow-${uid})`} className={animate && !reduced ? 'wuv-hc-record' : undefined}>
            <rect x="312" y="64" width="168" height="148" rx="12" fill="#fff" stroke="#1E3A8A" strokeWidth="1.5" strokeOpacity="0.2" />
            <rect x="324" y="76" width="144" height="20" rx="4" fill="#7C3AED" fillOpacity="0.12" />
            <text x="336" y="90" fill="#1E3A8A" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Patient record</text>
            <text x="452" y="90" textAnchor="end" fill="#22C55E" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Active</text>
            {/* Vitals bars */}
            {[
              { y: 108, w: 100, label: 'Heart rate' },
              { y: 128, w: 80, label: 'Blood pressure' },
              { y: 148, w: 120, label: 'Notes' },
            ].map((row) => (
              <g key={row.label}>
                <text x="332" y={row.y} fill="#94A3B8" fontSize="7" fontFamily="system-ui,sans-serif">{row.label}</text>
                <rect x="332" y={row.y + 4} width={row.w} height="6" rx="3" fill="#E2E8F0" />
                <rect x="332" y={row.y + 4} width={row.w * 0.7} height="6" rx="3" fill="#7C3AED" fillOpacity="0.45" className="wuv-hc-vital-bar" />
              </g>
            ))}
            {/* Appointment row */}
            <rect x="324" y="176" width="144" height="28" rx="6" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="1" />
            <circle cx="338" cy="190" r="6" fill="#22C55E" fillOpacity="0.2" />
            <path d="M335 190 l2 2 l4-5" fill="none" stroke="#22C55E" strokeWidth="1.2" />
            <text x="352" y="194" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Appointment confirmed</text>
          </g>

          {/* Heartbeat monitor */}
          <g className={animate && !reduced ? 'wuv-hc-heartbeat' : undefined}>
            <rect x="32" y="228" width="456" height="52" rx="8" fill="#fff" stroke="#E2E8F0" strokeWidth="1.2" />
            <text x="48" y="248" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Vitals</text>
            <path
              d="M72 258 h24 l8-16 l8 24 l8-32 l8 40 l8-20 h80"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="wuv-hc-ekg-line"
            />
            <circle cx="72" cy="258" r="3" fill="#7C3AED" className="wuv-hc-pulse-dot" />
          </g>
        </svg>
      </WuvSceneShell>
    </div>
  );
}
