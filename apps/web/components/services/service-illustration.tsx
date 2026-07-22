import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

import type { ServiceIllustrationKey } from '@/lib/services';

type ServiceIllustrationProps = {
  name: ServiceIllustrationKey;
  className?: string;
};

/** Distinct SVG illustrations for each service category — brand violet system. */
export function ServiceIllustration({
  name,
  className,
}: ServiceIllustrationProps) {
  return (
    <div
      className={cn(
        'relative aspect-[4/3] w-full overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background-subtle',
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 marketing-grain opacity-80" />
      <svg
        viewBox="0 0 640 480"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="uvGrad" x1="80" y1="40" x2="560" y2="440">
            <stop stopColor="#6d28d9" stopOpacity="0.95" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="uvSoft" x1="120" y1="80" x2="520" y2="400">
            <stop stopColor="#ddd6fe" stopOpacity="0.9" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {illustrationPaths[name]}
      </svg>
    </div>
  );
}

const illustrationPaths: Record<ServiceIllustrationKey, ReactNode> = {
  web: (
    <>
      <rect x="96" y="88" width="448" height="280" rx="24" fill="url(#uvSoft)" />
      <rect x="120" y="120" width="400" height="36" rx="10" fill="url(#uvGrad)" />
      <rect x="120" y="176" width="180" height="150" rx="16" fill="#6d28d9" opacity="0.25" />
      <rect x="320" y="176" width="200" height="70" rx="14" fill="#6d28d9" opacity="0.35" />
      <rect x="320" y="260" width="200" height="66" rx="14" fill="#6d28d9" opacity="0.2" />
      <circle cx="148" cy="138" r="7" fill="#fff" opacity="0.9" />
      <circle cx="172" cy="138" r="7" fill="#fff" opacity="0.55" />
      <circle cx="196" cy="138" r="7" fill="#fff" opacity="0.35" />
    </>
  ),
  mobile: (
    <>
      <rect x="250" y="56" width="140" height="360" rx="28" fill="url(#uvSoft)" />
      <rect x="268" y="92" width="104" height="260" rx="12" fill="url(#uvGrad)" opacity="0.85" />
      <rect x="286" y="118" width="68" height="12" rx="6" fill="#fff" opacity="0.7" />
      <rect x="286" y="148" width="68" height="48" rx="10" fill="#fff" opacity="0.25" />
      <rect x="286" y="212" width="68" height="48" rx="10" fill="#fff" opacity="0.18" />
      <circle cx="320" cy="380" r="12" fill="#6d28d9" opacity="0.5" />
    </>
  ),
  software: (
    <>
      <rect x="88" y="110" width="200" height="240" rx="20" fill="url(#uvSoft)" />
      <rect x="220" y="140" width="220" height="210" rx="20" fill="url(#uvGrad)" opacity="0.8" />
      <rect x="340" y="100" width="180" height="160" rx="18" fill="#6d28d9" opacity="0.28" />
      <path d="M130 180h100M130 210h80M130 240h90" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
      <path d="M260 210h120M260 245h90M260 280h105" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.45" />
    </>
  ),
  ai: (
    <>
      <circle cx="320" cy="230" r="110" fill="url(#uvSoft)" />
      <circle cx="320" cy="230" r="68" fill="url(#uvGrad)" />
      <circle cx="320" cy="230" r="28" fill="#fff" opacity="0.85" />
      <path d="M320 90v40M320 330v40M190 230h40M410 230h40M230 140l28 28M382 292l28 28M230 320l28-28M382 168l28-28" stroke="#6d28d9" strokeWidth="10" strokeLinecap="round" opacity="0.45" />
    </>
  ),
  erp: (
    <>
      <rect x="100" y="120" width="120" height="220" rx="16" fill="url(#uvSoft)" />
      <rect x="250" y="90" width="140" height="250" rx="16" fill="url(#uvGrad)" />
      <rect x="420" y="150" width="120" height="190" rx="16" fill="#6d28d9" opacity="0.35" />
      <path d="M220 230h30M390 230h30" stroke="#6d28d9" strokeWidth="8" opacity="0.5" />
      <rect x="270" y="130" width="100" height="18" rx="8" fill="#fff" opacity="0.55" />
      <rect x="270" y="170" width="100" height="18" rx="8" fill="#fff" opacity="0.35" />
      <rect x="270" y="210" width="100" height="18" rx="8" fill="#fff" opacity="0.25" />
    </>
  ),
  crm: (
    <>
      <circle cx="200" cy="180" r="54" fill="url(#uvGrad)" />
      <circle cx="320" cy="150" r="62" fill="url(#uvSoft)" />
      <circle cx="440" cy="190" r="50" fill="#6d28d9" opacity="0.4" />
      <path d="M240 280c20-40 60-60 100-60s80 20 100 60" stroke="#6d28d9" strokeWidth="14" strokeLinecap="round" opacity="0.35" />
      <rect x="180" y="320" width="280" height="48" rx="24" fill="url(#uvGrad)" opacity="0.7" />
    </>
  ),
  mlm: (
    <>
      <circle cx="320" cy="120" r="28" fill="url(#uvGrad)" />
      <circle cx="220" cy="230" r="24" fill="url(#uvSoft)" />
      <circle cx="420" cy="230" r="24" fill="url(#uvSoft)" />
      <circle cx="160" cy="340" r="20" fill="#6d28d9" opacity="0.35" />
      <circle cx="280" cy="340" r="20" fill="#6d28d9" opacity="0.35" />
      <circle cx="360" cy="340" r="20" fill="#6d28d9" opacity="0.35" />
      <circle cx="480" cy="340" r="20" fill="#6d28d9" opacity="0.35" />
      <path d="M320 148v54M300 200l-60 20M340 200l60 20M210 254l-40 70M230 254l40 70M410 254l-40 70M430 254l40 70" stroke="#6d28d9" strokeWidth="8" opacity="0.4" />
    </>
  ),
  taxi: (
    <>
      <rect x="120" y="220" width="400" height="90" rx="28" fill="url(#uvGrad)" />
      <path d="M170 220c20-50 60-70 100-70h100c40 0 80 20 100 70" fill="url(#uvSoft)" />
      <circle cx="210" cy="320" r="28" fill="#3f3f46" />
      <circle cx="430" cy="320" r="28" fill="#3f3f46" />
      <rect x="250" y="180" width="70" height="40" rx="8" fill="#fff" opacity="0.45" />
      <rect x="340" y="180" width="70" height="40" rx="8" fill="#fff" opacity="0.3" />
    </>
  ),
  travel: (
    <>
      <path d="M80 320c80-120 160-180 240-180s160 60 240 180" stroke="url(#uvGrad)" strokeWidth="18" strokeLinecap="round" opacity="0.35" />
      <path d="M140 300c60-90 120-130 180-130s120 40 180 130" stroke="#6d28d9" strokeWidth="10" opacity="0.25" />
      <path d="M180 260l280-80-40 40 80 20-320 80z" fill="url(#uvGrad)" />
      <circle cx="480" cy="140" r="36" fill="url(#uvSoft)" />
    </>
  ),
  hospitality: (
    <>
      <rect x="160" y="120" width="320" height="240" rx="20" fill="url(#uvSoft)" />
      <rect x="200" y="160" width="70" height="70" rx="10" fill="url(#uvGrad)" opacity="0.8" />
      <rect x="285" y="160" width="70" height="70" rx="10" fill="#6d28d9" opacity="0.35" />
      <rect x="370" y="160" width="70" height="70" rx="10" fill="#6d28d9" opacity="0.25" />
      <rect x="200" y="250" width="240" height="70" rx="12" fill="#6d28d9" opacity="0.2" />
      <path d="M280 360h80" stroke="#6d28d9" strokeWidth="12" strokeLinecap="round" opacity="0.4" />
    </>
  ),
  commerce: (
    <>
      <rect x="140" y="100" width="240" height="280" rx="22" fill="url(#uvSoft)" />
      <rect x="170" y="140" width="180" height="120" rx="14" fill="url(#uvGrad)" />
      <rect x="170" y="280" width="120" height="18" rx="8" fill="#6d28d9" opacity="0.35" />
      <rect x="170" y="312" width="80" height="18" rx="8" fill="#6d28d9" opacity="0.25" />
      <circle cx="430" cy="280" r="70" fill="url(#uvGrad)" opacity="0.75" />
      <path d="M400 280h60M430 250v60" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
    </>
  ),
  marketing: (
    <>
      <path d="M120 320l80-180h120l40 80h100l60 100H120z" fill="url(#uvSoft)" />
      <rect x="180" y="200" width="36" height="120" rx="8" fill="url(#uvGrad)" />
      <rect x="240" y="160" width="36" height="160" rx="8" fill="#6d28d9" opacity="0.55" />
      <rect x="300" y="220" width="36" height="100" rx="8" fill="#6d28d9" opacity="0.35" />
      <rect x="360" y="180" width="36" height="140" rx="8" fill="#6d28d9" opacity="0.45" />
      <circle cx="480" cy="150" r="40" fill="url(#uvGrad)" />
    </>
  ),
  branding: (
    <>
      <rect x="170" y="90" width="300" height="300" rx="40" fill="url(#uvSoft)" />
      <path d="M250 300V180h50c40 0 70 25 70 60s-30 60-70 60H250zm48-42h8c16 0 28-10 28-24s-12-24-28-24h-8v48z" fill="url(#uvGrad)" />
      <circle cx="470" cy="130" r="24" fill="#6d28d9" opacity="0.35" />
    </>
  ),
  consulting: (
    <>
      <path d="M320 80l150 260H170L320 80z" fill="url(#uvSoft)" />
      <path d="M320 140l95 170H225L320 140z" fill="url(#uvGrad)" opacity="0.85" />
      <circle cx="320" cy="360" r="18" fill="#6d28d9" opacity="0.45" />
      <path d="M200 380h240" stroke="#6d28d9" strokeWidth="10" strokeLinecap="round" opacity="0.3" />
    </>
  ),
  registration: (
    <>
      <rect x="170" y="90" width="300" height="320" rx="24" fill="url(#uvSoft)" />
      <rect x="210" y="140" width="220" height="24" rx="10" fill="url(#uvGrad)" />
      <rect x="210" y="190" width="180" height="16" rx="8" fill="#6d28d9" opacity="0.3" />
      <rect x="210" y="226" width="200" height="16" rx="8" fill="#6d28d9" opacity="0.22" />
      <rect x="210" y="262" width="160" height="16" rx="8" fill="#6d28d9" opacity="0.18" />
      <rect x="210" y="320" width="120" height="40" rx="12" fill="url(#uvGrad)" opacity="0.8" />
      <path d="M430 330l18 18 34-40" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};
