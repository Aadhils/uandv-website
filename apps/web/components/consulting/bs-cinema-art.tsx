import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

function Canvas({
  children,
  className,
  label,
  aspect,
}: {
  children: ReactNode;
  className?: string;
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn('bs-canvas relative h-full w-full overflow-hidden', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
      aria-hidden
    >
      <div className="bs-canvas-mesh pointer-events-none absolute inset-0" />
      <div className="bs-canvas-grid pointer-events-none absolute inset-0 opacity-30" />
      <svg viewBox="0 0 800 500" className="relative h-full w-full" fill="none" role="img" aria-label={label}>
        <defs>
          <linearGradient id="bscG" x1="0" y1="0" x2="800" y2="500">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#a78bfa" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="bscS" x1="100" y1="80" x2="700" y2="420">
            <stop stopColor="#ede9fe" />
            <stop offset="1" stopColor="#ddd6fe" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="bscSky" x1="0" y1="0" x2="800" y2="0">
            <stop stopColor="#e0f2fe" />
            <stop offset="0.5" stopColor="#f5f3ff" />
            <stop offset="1" stopColor="#ede9fe" />
          </linearGradient>
          <linearGradient id="bscGrowth" x1="0" y1="300" x2="800" y2="100">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="bscGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {children}
      </svg>
    </div>
  );
}

/** Signature U&V story: Chaos → Strategy → Technology → Growth */
export function SignatureJourneyVisual({ className }: { className?: string }) {
  return (
    <div className={cn('bs-signature-journey w-full', className)}>
      <div className="bs-signature-journey__frame overflow-hidden rounded-uv-2xl border border-uv-border/50 bg-gradient-to-br from-white via-[#f8fbff] to-[#f5f3ff] shadow-[0_32px_80px_rgb(30_58_138_/_0.07)]">
        <svg viewBox="0 0 960 320" className="h-auto w-full" fill="none" role="img" aria-label="Business journey from chaos through strategy and technology to growth">
          <rect width="960" height="320" fill="url(#bscSky)" opacity="0.35" />
          {/* Connecting journey path */}
          <path
            className="bs-signature-path"
            d="M80 200 C200 200, 240 160, 320 160 S480 160, 560 140 S720 120, 880 100"
            stroke="url(#bscGrowth)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.55"
          />
          {/* Stage 1 — Chaos */}
          <g className="bs-signature-stage">
            <rect x="40" y="48" width="180" height="200" rx="20" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="60" y="72" width="72" height="52" rx="8" fill="#f1f5f9" transform="rotate(-8 96 98)" />
            <text x="96" y="102" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">Excel</text>
            <rect x="130" y="88" width="68" height="44" rx="8" fill="#dcfce7" transform="rotate(6 164 110)" />
            <text x="164" y="114" textAnchor="middle" fill="#16a34a" fontSize="8" fontWeight="600">WhatsApp</text>
            <rect x="70" y="140" width="80" height="50" rx="8" fill="#fef3c7" transform="rotate(-4 110 165)" />
            <text x="110" y="170" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="600">Paper</text>
            <text x="130" y="218" textAnchor="middle" fill="#102a56" fontSize="13" fontWeight="700">Business Chaos</text>
            <text x="130" y="234" textAnchor="middle" fill="#64748b" fontSize="9">Scattered · Manual · Reactive</text>
          </g>
          {/* Stage 2 — Strategy */}
          <g className="bs-signature-stage bs-signature-stage--delay-1">
            <rect x="260" y="48" width="180" height="200" rx="20" fill="white" stroke="#a78bfa" strokeWidth="1.5" />
            <rect x="285" y="78" width="130" height="14" rx="7" fill="url(#bscG)" opacity="0.7" />
            <rect x="285" y="102" width="100" height="10" rx="5" fill="#e9d5ff" />
            <rect x="285" y="122" width="115" height="10" rx="5" fill="#e9d5ff" />
            <rect x="285" y="142" width="90" height="10" rx="5" fill="#e9d5ff" />
            <circle cx="310" cy="175" r="16" fill="url(#bscG)" opacity="0.85" />
            <path d="M304 175h12M310 169v12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <text x="350" y="218" textAnchor="middle" fill="#102a56" fontSize="13" fontWeight="700">Business Strategy</text>
            <text x="350" y="234" textAnchor="middle" fill="#64748b" fontSize="9">Clarity · Priorities · Plan</text>
          </g>
          {/* Stage 3 — Technology */}
          <g className="bs-signature-stage bs-signature-stage--delay-2">
            <rect x="480" y="48" width="180" height="200" rx="20" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
            <rect x="505" y="72" width="130" height="100" rx="12" fill="url(#bscS)" />
            <rect x="518" y="86" width="104" height="22" rx="6" fill="url(#bscG)" opacity="0.75" />
            <rect x="518" y="118" width="48" height="40" rx="6" fill="url(#bscG)" opacity="0.45" />
            <rect x="574" y="118" width="48" height="40" rx="6" fill="url(#bscG)" opacity="0.35" />
            <text x="570" y="218" textAnchor="middle" fill="#102a56" fontSize="13" fontWeight="700">Technology</text>
            <text x="570" y="234" textAnchor="middle" fill="#64748b" fontSize="9">CRM · Automation · Systems</text>
          </g>
          {/* Stage 4 — Growth */}
          <g className="bs-signature-stage bs-signature-stage--delay-3">
            <rect x="700" y="48" width="220" height="200" rx="20" fill="white" stroke="#38bdf8" strokeWidth="1.5" filter="url(#bscGlow)" />
            <path className="bs-draw-path" d="M730 180 L780 130 L830 150 L880 90" stroke="url(#bscGrowth)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="880" cy="90" r="8" fill="#7c3aed" />
            <rect x="730" y="190" width="160" height="8" rx="4" fill="#e0f2fe" />
            <rect x="730" y="190" width="120" height="8" rx="4" fill="url(#bscG)" opacity="0.6" />
            <text x="810" y="218" textAnchor="middle" fill="#102a56" fontSize="13" fontWeight="700">Business Growth</text>
            <text x="810" y="234" textAnchor="middle" fill="#64748b" fontSize="9">Revenue · Scale · Confidence</text>
          </g>
          {/* Arrow markers */}
          <path d="M248 160h8l-4-6 4 6-4 6" fill="#7c3aed" opacity="0.5" />
          <path d="M468 150h8l-4-6 4 6-4 6" fill="#7c3aed" opacity="0.5" />
          <path d="M688 130h8l-4-6 4 6-4 6" fill="#7c3aed" opacity="0.5" />
        </svg>
        {/* Mobile vertical labels */}
        <ol className="bs-signature-journey__mobile grid grid-cols-2 gap-3 border-t border-uv-border/40 bg-white/60 p-4 sm:grid-cols-4 lg:hidden">
          {['Business Chaos', 'Business Strategy', 'Technology', 'Business Growth'].map((label, i) => (
            <li key={label} className="text-center">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-uv-brand text-[10px] font-bold text-white">{i + 1}</span>
              <p className="mt-1.5 text-[10px] font-semibold leading-tight text-uv-navy-blue sm:text-xs">{label}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-full min-h-[280px] w-full sm:min-h-[300px] lg:min-h-[320px]', className)}>
      <div className="bs-hero-glow pointer-events-none absolute -inset-8 rounded-[3rem]" aria-hidden />
      <Canvas label="From business chaos to organised growth">
        <ellipse cx="400" cy="430" rx="300" ry="36" fill="#6d28d9" opacity="0.08" />
        {/* Left: chaos */}
        <rect x="60" y="120" width="90" height="64" rx="10" fill="#f1f5f9" transform="rotate(-10 105 152)" />
        <text x="105" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">Excel</text>
        <rect x="130" y="100" width="80" height="56" rx="10" fill="#dcfce7" transform="rotate(8 170 128)" />
        <text x="170" y="132" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="600">WhatsApp</text>
        <path d="M200 200 Q280 180 340 170" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        {/* Centre: owner */}
        <circle cx="300" cy="220" r="44" fill="url(#bscG)" opacity="0.9" filter="url(#bscGlow)" />
        <circle cx="300" cy="202" r="22" fill="url(#bscS)" />
        {/* Right: organised growth */}
        <rect x="420" y="130" width="280" height="180" rx="18" fill="url(#bscS)" />
        <rect x="445" y="155" width="230" height="28" rx="8" fill="url(#bscG)" opacity="0.8" />
        <rect x="445" y="198" width="100" height="70" rx="8" fill="url(#bscG)" opacity="0.45" />
        <rect x="560" y="198" width="115" height="70" rx="8" fill="url(#bscG)" opacity="0.35" />
        <path className="bs-draw-path" d="M460 290 L520 240 L580 255 L660 200" stroke="url(#bscGrowth)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <circle cx="660" cy="200" r="6" fill="#7c3aed" />
      </Canvas>
    </div>
  );
}

export function ProcessStepScene({ index, className }: { index: number; className?: string }) {
  const arts: ReactNode[] = [
    <g key="0"><circle cx="280" cy="200" r="36" fill="url(#bscG)" opacity="0.8" /><rect x="360" y="140" width="200" height="120" rx="16" fill="url(#bscS)" /><rect x="380" y="165" width="160" height="12" rx="6" fill="url(#bscG)" opacity="0.5" /><rect x="380" y="188" width="120" height="12" rx="6" fill="url(#bscG)" opacity="0.35" /><text x="460" y="230" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">Listen first</text></g>,
    <g key="1"><circle cx="260" cy="220" r="50" fill="url(#bscS)" /><circle cx="540" cy="220" r="50" fill="url(#bscS)" /><text x="260" y="225" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="700">You</text><text x="540" y="225" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="700">Market</text><path className="bs-draw-path" d="M310 220h220" stroke="#7c3aed" strokeWidth="4" strokeDasharray="8 6" /></g>,
    <g key="2"><path d="M400 120 L280 340 L520 340 Z" fill="url(#bscS)" opacity="0.5" /><circle cx="400" cy="200" r="28" fill="url(#bscG)" /><text x="400" y="380" textAnchor="middle" fill="#102a56" fontSize="11" fontWeight="600">Build · Buy · Wait</text></g>,
    <g key="3"><rect x="180" y="150" width="440" height="180" rx="20" fill="url(#bscS)" /><rect x="210" y="180" width="120" height="120" rx="12" fill="url(#bscG)" opacity="0.5" /><rect x="350" y="180" width="120" height="120" rx="12" fill="url(#bscG)" opacity="0.35" /><rect x="490" y="180" width="100" height="120" rx="12" fill="url(#bscG)" opacity="0.25" /></g>,
    <g key="4"><path className="bs-draw-path" d="M200 320 C280 180 360 180 440 260 S560 300 620 200" stroke="url(#bscG)" strokeWidth="8" strokeLinecap="round" fill="none" /><circle cx="620" cy="200" r="20" fill="url(#bscG)" /></g>,
    <g key="5"><rect x="160" y="110" width="480" height="260" rx="24" fill="url(#bscS)" /><rect x="200" y="150" width="140" height="180" rx="12" fill="url(#bscG)" opacity="0.55" /><rect x="360" y="150" width="260" height="40" rx="10" fill="url(#bscG)" opacity="0.4" /><rect x="360" y="210" width="260" height="40" rx="10" fill="url(#bscG)" opacity="0.3" /></g>,
    <g key="6"><rect x="220" y="140" width="360" height="200" rx="20" fill="url(#bscS)" /><path d="M320 280 L400 180 L480 280 Z" fill="url(#bscG)" opacity="0.6" /><path d="M360 250 L400 210 L440 250" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></g>,
    <g key="7"><circle cx="400" cy="250" r="80" stroke="url(#bscG)" strokeWidth="6" /><circle cx="400" cy="250" r="20" fill="url(#bscG)" /><path d="M400 170v-30M400 330v30" stroke="#7c3aed" strokeWidth="3" opacity="0.4" /></g>,
    <g key="8"><path className="bs-draw-path" d="M140 300 L260 220 L380 260 L500 180 L660 240" stroke="url(#bscGrowth)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="660" cy="240" r="10" fill="#7c3aed" /></g>,
    <g key="9"><circle cx="400" cy="250" r="90" fill="url(#bscS)" /><circle cx="320" cy="200" r="22" fill="url(#bscG)" /><circle cx="480" cy="200" r="22" fill="url(#bscG)" opacity="0.7" /><circle cx="400" cy="310" r="22" fill="url(#bscG)" opacity="0.55" /><path d="M320 200h160M400 222v66" stroke="#7c3aed" strokeWidth="2" opacity="0.3" /></g>,
  ];
  return (
    <div className={cn('h-full w-full', className)}>
      <Canvas label={`Process step ${index + 1}`}>{arts[index % arts.length]}</Canvas>
    </div>
  );
}

export function GrowthBeatScene({ index, className }: { index: number; className?: string }) {
  const arts: ReactNode[] = [
    <g key="0"><rect x="140" y="100" width="520" height="280" rx="24" fill="url(#bscS)" /><rect x="180" y="140" width="180" height="200" rx="14" fill="url(#bscG)" opacity="0.55" /><path className="bs-draw-path" d="M400 160 L460 200 L520 175 L600 220" stroke="#7c3aed" strokeWidth="4" /><text x="500" y="300" fill="#102a56" fontSize="12" fontWeight="600">Software roadmap</text></g>,
    <g key="1"><rect x="200" y="120" width="400" height="240" rx="20" fill="url(#bscS)" /><path className="bs-draw-path" d="M240 300 L340 180 L440 240 L560 160" stroke="url(#bscGrowth)" strokeWidth="8" strokeLinecap="round" /><text x="400" y="340" textAnchor="middle" fill="#102a56" fontSize="12" fontWeight="600">Idea → Launch</text></g>,
    <g key="2"><circle cx="400" cy="250" r="100" stroke="url(#bscG)" strokeWidth="3" opacity="0.3" /><circle cx="400" cy="150" r="20" fill="url(#bscG)" /><circle cx="520" cy="250" r="16" fill="url(#bscG)" opacity="0.7" /><circle cx="280" cy="250" r="16" fill="url(#bscG)" opacity="0.7" /><circle cx="400" cy="350" r="16" fill="url(#bscG)" opacity="0.5" /><path d="M400 170v140M300 250h200" stroke="#7c3aed" strokeWidth="2" opacity="0.25" /><text x="400" y="400" textAnchor="middle" fill="#102a56" fontSize="12" fontWeight="600">MLM network</text></g>,
    <g key="3"><rect x="180" y="130" width="440" height="200" rx="20" fill="url(#bscS)" /><path className="bs-draw-path" d="M220 250h120M380 250h40M460 250h80" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" /><circle cx="340" cy="250" r="24" fill="url(#bscG)" opacity="0.7" /><text x="400" y="360" textAnchor="middle" fill="#102a56" fontSize="12" fontWeight="600">Automation flow</text></g>,
    <g key="4"><rect x="160" y="110" width="480" height="260" rx="22" fill="url(#bscS)" /><rect x="200" y="150" width="400" height="36" rx="10" fill="url(#bscG)" opacity="0.7" /><rect x="200" y="200" width="180" height="120" rx="10" fill="url(#bscG)" opacity="0.4" /><rect x="400" y="200" width="200" height="56" rx="10" fill="url(#bscG)" opacity="0.35" /><text x="400" y="390" textAnchor="middle" fill="#102a56" fontSize="12" fontWeight="600">CRM &amp; enquiries</text></g>,
    <g key="5"><rect x="200" y="140" width="400" height="200" rx="20" fill="url(#bscS)" /><rect x="230" y="170" width="340" height="80" rx="12" fill="url(#bscG)" opacity="0.45" /><path className="bs-draw-path" d="M260 290 L340 250 L420 270 L500 230 L560 250" stroke="url(#bscGrowth)" strokeWidth="5" strokeLinecap="round" /><text x="400" y="370" textAnchor="middle" fill="#102a56" fontSize="12" fontWeight="600">Marketing pipeline</text></g>,
  ];
  return (
    <div className={cn('h-full min-h-[200px] w-full sm:min-h-[240px] lg:min-h-[280px]', className)}>
      <Canvas label={`Growth area ${index + 1}`}>{arts[index % arts.length]}</Canvas>
    </div>
  );
}

export function WhyHeroScene({ className }: { className?: string }) {
  return (
    <div className={cn('h-full min-h-[220px] w-full sm:min-h-[260px] lg:min-h-[300px]', className)}>
      <Canvas label="One partner under one roof">
        <rect x="200" y="100" width="400" height="260" rx="24" fill="url(#bscS)" />
        <circle cx="320" cy="220" r="40" fill="url(#bscG)" opacity="0.85" />
        <circle cx="480" cy="220" r="40" fill="url(#bscG)" opacity="0.65" />
        <path className="bs-draw-path" d="M360 220h80" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <rect x="280" y="290" width="240" height="40" rx="10" fill="url(#bscG)" opacity="0.5" />
        <text x="400" y="316" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Strategy · Build · Growth</text>
        <text x="400" y="380" textAnchor="middle" fill="#102a56" fontSize="12" fontWeight="600">One partner, one story</text>
      </Canvas>
    </div>
  );
}

export function BeforeScene({ className }: { className?: string }) {
  const labels = ['Paper', 'WhatsApp', 'Spreadsheet', 'Manual follow-up', 'Missed enquiries'];
  const positions = [
    { x: 80, y: 70, r: -5, w: 130, h: 88 },
    { x: 240, y: 140, r: 4, w: 140, h: 90 },
    { x: 420, y: 80, r: -3, w: 150, h: 92 },
    { x: 180, y: 260, r: 2, w: 140, h: 86 },
    { x: 500, y: 240, r: -4, w: 150, h: 88 },
  ];
  return (
    <div className={cn('absolute inset-0', className)}>
      <Canvas label="Before: scattered manual processes">
        <text x="400" y="48" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="700" letterSpacing="2">CHAOS</text>
        {positions.map((pos, i) => (
          <g key={labels[i]} transform={`rotate(${pos.r} ${pos.x + pos.w / 2} ${pos.y + pos.h / 2})`}>
            <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx="12" fill="url(#bscS)" opacity={0.92 - i * 0.08} />
            <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 5} textAnchor="middle" fill="#1e3a5f" fontSize="11" fontWeight="600" opacity="0.65">
              {labels[i]}
            </text>
          </g>
        ))}
        <path className="bs-draw-path" d="M160 390c100-30 220-50 340-20s220 40 300 10" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" opacity="0.35" strokeDasharray="6 6" />
      </Canvas>
    </div>
  );
}

export function AfterScene({ className }: { className?: string }) {
  const labels = ['Dashboard', 'CRM', 'Automation', 'Analytics', 'Organised workflow'];
  return (
    <div className={cn('h-full w-full', className)}>
      <Canvas label="After: unified U and V platform">
        <text x="400" y="48" textAnchor="middle" fill="#7c3aed" fontSize="13" fontWeight="700" letterSpacing="2">CONTROL</text>
        <rect x="120" y="70" width="560" height="320" rx="24" fill="url(#bscS)" />
        <rect x="160" y="110" width="480" height="44" rx="12" fill="url(#bscG)" opacity="0.8" />
        {labels.slice(0, 4).map((label, i) => (
          <g key={label}>
            <rect x={160 + (i % 2) * 250} y={175 + Math.floor(i / 2) * 72} width="220" height="52" rx="12" fill="url(#bscG)" opacity={0.4 + (i % 2) * 0.15} />
            <text x={160 + (i % 2) * 250 + 110} y={175 + Math.floor(i / 2) * 72 + 32} textAnchor="middle" fill="#1e3a5f" fontSize="12" fontWeight="600" opacity="0.85">
              {label}
            </text>
          </g>
        ))}
        <rect x="160" y="330" width="480" height="36" rx="10" fill="url(#bscG)" opacity="0.35" />
        <text x="400" y="353" textAnchor="middle" fill="#1e3a5f" fontSize="12" fontWeight="600" opacity="0.8">
          {labels[4]}
        </text>
      </Canvas>
    </div>
  );
}

export function PartnershipRoadmapVisual({ className }: { className?: string }) {
  const stages = ['Settle in', 'Review', 'Grow', 'Partner'];
  const nodes = [80, 180, 280, 380];
  return (
    <div className={cn('relative w-full max-w-[200px]', className)}>
      <svg viewBox="0 0 100 440" className="h-auto w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="440">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <line x1="28" y1="40" x2="28" y2="400" stroke="var(--uv-border)" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="40" x2="28" y2="400" stroke="url(#roadGrad)" strokeWidth="2" strokeLinecap="round" />
        {nodes.map((y, i) => (
          <g key={i}>
            <circle cx="28" cy={y} r="10" fill="#7c3aed" />
            <text x="48" y={y + 4} fill="var(--uv-brand)" fontSize="10" fontWeight="700">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x="48" y={y + 18} fill="var(--uv-foreground-muted)" fontSize="8" fontWeight="600">
              {stages[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ClosingScene({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="bs-closing-glow-light absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <svg viewBox="0 0 1200 300" className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="xMidYMid slice">
        <path className="bs-draw-path" d="M0 220 C200 140, 400 260, 600 180 S1000 100, 1200 160" stroke="#7c3aed" strokeWidth="2" fill="none" opacity="0.25" />
        <path d="M200 180 L400 140 L600 200 L800 120" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.2" />
      </svg>
    </div>
  );
}
