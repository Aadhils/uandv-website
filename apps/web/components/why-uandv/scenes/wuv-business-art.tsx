'use client';

import type { ReactNode } from 'react';

import { Icon, cn, type IconName } from '@uandv/ui';

/** Shared illustrated primitives — business scenes, not wireframes */

export function WuvSceneBackdrop({
  children,
  className,
  tone = 'lavender',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'lavender' | 'sky' | 'warm' | 'mint';
}) {
  const tones = {
    lavender: 'from-[#f8f6ff] via-white to-[#eef4ff]',
    sky: 'from-[#f0f7ff] via-white to-[#f8faff]',
    warm: 'from-[#fff8f3] via-white to-[#fef6ee]',
    mint: 'from-[#f2fbf6] via-white to-[#eef8f3]',
  };

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-[inherit] bg-gradient-to-br',
        tones[tone],
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-uv-brand/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-[#1E3A8A]/6 blur-3xl"
        aria-hidden
      />
      {children}
    </div>
  );
}

export function WuvSceneIconBadge({
  name,
  label,
  className,
  tone = 'brand',
}: {
  name: IconName;
  label: string;
  className?: string;
  tone?: 'brand' | 'success' | 'navy';
}) {
  const tones = {
    brand: 'border-uv-brand/20 bg-white text-uv-brand shadow-[0_8px_24px_rgb(124_58_237_/_0.12)]',
    success: 'border-emerald-200 bg-white text-emerald-600 shadow-[0_8px_24px_rgb(16_185_129_/_0.12)]',
    navy: 'border-[#1E3A8A]/15 bg-white text-[#1E3A8A] shadow-[0_8px_24px_rgb(30_58_138_/_0.1)]',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold sm:text-sm',
        tones[tone],
        className,
      )}
    >
      <Icon name={name} size="sm" />
      <span>{label}</span>
    </div>
  );
}

export function WuvPerson({
  x,
  y,
  scale = 1,
  variant = 'owner',
  facing = 'right',
}: {
  x: number;
  y: number;
  scale?: number;
  variant?: 'owner' | 'consultant' | 'team';
  facing?: 'left' | 'right';
}) {
  const skin = '#F8D8C0';
  const hair = variant === 'consultant' ? '#1E3A8A' : '#334155';
  const shirt =
    variant === 'consultant' ? '#7C3AED' : variant === 'team' ? '#3B82F6' : '#1E3A8A';
  const flip = facing === 'left' ? -1 : 1;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale * flip}, ${scale})`}>
      <ellipse cx="0" cy="58" rx="22" ry="5" fill="#1E3A8A" fillOpacity="0.08" />
      <rect x="-16" y="28" width="32" height="34" rx="10" fill={shirt} />
      <circle cx="0" cy="14" r="13" fill={skin} stroke={hair} strokeWidth="1.2" />
      <path d="M-13 8 q13-10 26 0" fill={hair} />
      {variant === 'consultant' ? (
        <rect x="-8" y="34" width="16" height="3" rx="1.5" fill="#fff" fillOpacity="0.35" />
      ) : null}
      <circle cx={flip === 1 ? 10 : -10} cy="36" r="5" fill={skin} />
    </g>
  );
}

export function WuvDesk({ x, y, w = 120 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width={w} height="10" rx="4" fill="#E2E8F0" />
      <rect x="8" y="10" width="6" height="28" fill="#CBD5E1" />
      <rect x={w - 14} y="10" width="6" height="28" fill="#CBD5E1" />
    </g>
  );
}

export function WuvLaptop({ x, y, w = 56 }: { x: number; y: number; w?: number }) {
  const h = w * 0.62;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width={w} height={h} rx="4" fill="#1E293B" />
      <rect x="3" y="3" width={w - 6} height={h - 8} rx="2" fill="#F8FAFC" />
      <rect x="8" y="8" width={w - 16} height="6" rx="3" fill="#7C3AED" fillOpacity="0.35" />
      <rect x="8" y="18" width={(w - 16) * 0.55} height="4" rx="2" fill="#CBD5E1" />
      <rect x="8" y="26" width={(w - 16) * 0.75} height="4" rx="2" fill="#E2E8F0" />
      <path d={`M-4 ${h} h${w + 8} l-4 6 h-${w} z`} fill="#94A3B8" />
    </g>
  );
}

export function WuvPhone({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="28" height="48" rx="6" fill="#1E293B" />
      <rect x="3" y="6" width="22" height="36" rx="3" fill="#F8FAFC" />
      <rect x="7" y="10" width="14" height="4" rx="2" fill="#7C3AED" fillOpacity="0.4" />
      <rect x="7" y="18" width="14" height="10" rx="2" fill="#E2E8F0" />
      <circle cx="14" cy="42" r="2" fill="#64748B" />
    </g>
  );
}

export function WuvDocument({ x, y, signed = false }: { x: number; y: number; signed?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="44" height="56" rx="4" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
      <rect x="8" y="10" width="28" height="4" rx="2" fill="#94A3B8" />
      <rect x="8" y="20" width="24" height="3" rx="1.5" fill="#E2E8F0" />
      <rect x="8" y="28" width="20" height="3" rx="1.5" fill="#E2E8F0" />
      {signed ? (
        <path d="M10 44 c6-6 12-2 18 0 c4 2 8 0 12-4" fill="none" stroke="#7C3AED" strokeWidth="1.5" />
      ) : null}
    </g>
  );
}

export function WuvWhiteboard({ x, y }: { x: number; y: number }) {
  const notes = [
    { nx: 12, ny: 14, color: '#FDE68A' },
    { nx: 52, ny: 10, color: '#BFDBFE' },
    { nx: 88, ny: 18, color: '#FBCFE8' },
    { nx: 30, ny: 42, color: '#BBF7D0' },
  ];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="120" height="72" rx="6" fill="#fff" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="60" y1="8" x2="60" y2="64" stroke="#E2E8F0" strokeWidth="1" />
      {notes.map((n, i) => (
        <rect
          key={i}
          x={n.nx}
          y={n.ny}
          width="24"
          height="18"
          rx="2"
          fill={n.color}
          transform={`rotate(${i % 2 === 0 ? -4 : 5} ${n.nx + 12} ${n.ny + 9})`}
        />
      ))}
    </g>
  );
}

export function WuvMeetingTable({ x, y, w = 180 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={w / 2} cy="18" rx={w / 2 - 8} ry="14" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.2" />
      <ellipse cx={w / 2} cy="16" rx={w / 2 - 12} ry="10" fill="#F8FAFC" />
    </g>
  );
}

export function WuvDashboard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="140" height="88" rx="8" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
      <rect x="10" y="10" width="48" height="28" rx="4" fill="#7C3AED" fillOpacity="0.1" />
      <text x="16" y="24" fill="#64748B" fontSize="7" fontFamily="system-ui,sans-serif">
        Revenue
      </text>
      <text x="16" y="34" fill="#1E3A8A" fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif">
        +24%
      </text>
      <rect x="66" y="10" width="64" height="28" rx="4" fill="#F1F5F9" />
      <rect x="72" y="28" width="8" height="10" rx="2" fill="#7C3AED" fillOpacity="0.5" />
      <rect x="84" y="22" width="8" height="16" rx="2" fill="#7C3AED" fillOpacity="0.7" />
      <rect x="96" y="16" width="8" height="22" rx="2" fill="#7C3AED" />
      <rect x="108" y="20" width="8" height="18" rx="2" fill="#3B82F6" fillOpacity="0.8" />
      <rect x="10" y="48" width="120" height="30" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M18 68 L38 60 L58 64 L78 50 L98 46 L118 38" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function WuvChatBubble({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="96" height="34" rx="10" fill="#fff" stroke="#C4B5FD" strokeWidth="1.2" />
      <polygon points="12,34 20,34 8,42" fill="#fff" stroke="#C4B5FD" strokeWidth="1.2" />
      <text x="10" y="20" fill="#1E3A8A" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
        {text}
      </text>
    </g>
  );
}
