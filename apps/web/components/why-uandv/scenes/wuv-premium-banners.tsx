'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { cn } from '@uandv/ui';

import type { WuvIndustryAnimationId } from '@/lib/why-uandv-animations';

import { WuvMaskReveal, WuvParallaxWrap } from '../wuv-polish';
import { useInView, useParallax, useReducedMotion } from '../wuv-motion';

import {
  WuvDashboard,
  WuvDocument,
  WuvLaptop,
  WuvMeetingTable,
  WuvPerson,
  WuvSceneBackdrop,
} from './wuv-business-art';
import { WuvIndustryCardBanner } from './wuv-industry-art';

const HERO_IMAGE = '/images/why-uandv/hero-partnership.webp';
const COMPARE_IMAGE = '/images/why-uandv/compare-experience.webp';

function PremiumBannerFrame({
  label,
  children,
  className,
  glow = 'lavender',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  glow?: 'lavender' | 'sky' | 'mint';
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const reduced = useReducedMotion();

  const glowClass = {
    lavender: 'from-[#7C3AED]/20 via-transparent to-[#1E3A8A]/10',
    sky: 'from-[#3B82F6]/15 via-transparent to-[#7C3AED]/10',
    mint: 'from-[#0EA5E9]/15 via-transparent to-[#7C3AED]/10',
  }[glow];

  return (
    <div
      ref={ref}
      className={cn(
        'wuv-premium-banner group relative h-full w-full overflow-hidden rounded-uv-2xl border border-uv-brand/15 shadow-[0_20px_50px_rgb(30_58_138_/_0.14)]',
        inView && !reduced && 'is-premium-active',
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity duration-700 ease-out',
          glowClass,
          inView && !reduced && 'opacity-100',
        )}
        aria-hidden
      />
      {children}
      <div
        className="wuv-premium-frame-ring pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40"
        aria-hidden
      />
    </div>
  );
}

/** Hero — partnership visual: illustrated scene with subtle photo texture */
export function WuvPremiumHeroBanner({ className }: { className?: string }) {
  const imageRef = useRef<HTMLDivElement>(null);
  useParallax(imageRef, 5);

  return (
    <WuvMaskReveal className="h-full" delayMs={70} immediate>
      <PremiumBannerFrame
        label="U&V partnership meeting with business dashboard and strategy roadmap"
        className={cn('wuv-premium-hero min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]', className)}
        glow="lavender"
      >
        <div className="wuv-hero-float wuv-hero-float--lavender" aria-hidden />
        <div className="wuv-hero-float wuv-hero-float--navy" aria-hidden />
        <div className="wuv-hero-float wuv-hero-float--sky" aria-hidden />

        <div ref={imageRef} className="wuv-hero-parallax wuv-hero-photo-layer absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="wuv-hero-parallax__image wuv-hero-photo object-cover object-center"
          />
        </div>

        <WuvSceneBackdrop tone="lavender" className="wuv-hero-scene absolute inset-0 rounded-[inherit]">
          <svg
            viewBox="0 0 560 340"
            className="wuv-hero-scene__svg h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <rect x="20" y="20" width="520" height="210" rx="14" fill="#fff" fillOpacity="0.72" stroke="#E2E8F0" strokeWidth="1.2" />
            <WuvMeetingTable x={150} y={158} w={260} />
            <WuvPerson x={210} y={78} variant="owner" facing="right" scale={1.02} />
            <WuvPerson x={360} y={78} variant="consultant" facing="left" scale={1.02} />
            <path
              d="M288 128 c10-7 28-7 38 0"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="wuv-banner-handshake"
            />
            <WuvLaptop x={258} y={118} w={64} />
            <WuvDocument x={392} y={98} signed />
            <WuvDashboard x={48} y={52} />
            <rect x="40" y="252" width="480" height="40" rx="10" fill="#fff" fillOpacity="0.88" stroke="#C4B5FD" strokeWidth="1.2" />
            <text x="56" y="270" fill="#64748B" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">
              Partnership progress
            </text>
            <rect x="56" y="278" width="448" height="6" rx="3" fill="#E2E8F0" />
            <rect x="56" y="278" width="300" height="6" rx="3" fill="#7C3AED" fillOpacity="0.55" className="wuv-banner-progress" />
          </svg>
        </WuvSceneBackdrop>

        <div
          className="pointer-events-none absolute left-4 top-4 z-[3] rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-uv-brand shadow-[0_8px_24px_rgb(124_58_237_/_0.12)] backdrop-blur-sm sm:left-5 sm:top-5 sm:text-[11px]"
          aria-hidden
        >
          Long-term partner
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/12 via-transparent to-white/20" aria-hidden />
      </PremiumBannerFrame>
    </WuvMaskReveal>
  );
}

/** Common experience — before / after comparison */
export function WuvPremiumCompareBanner({ className }: { className?: string }) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useParallax(leftRef, 4);
  useParallax(rightRef, -4);

  return (
    <WuvMaskReveal className="h-full" delayMs={100}>
      <PremiumBannerFrame
        label="Poor vendor experience compared with accountable U&V partnership"
        className={cn('wuv-premium-compare min-h-[180px] sm:min-h-[220px] lg:min-h-[220px]', className)}
        glow="sky"
      >
        <div ref={leftRef} className="wuv-compare-half wuv-compare-half--muted absolute inset-0 overflow-hidden">
          <Image src={COMPARE_IMAGE} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-left" />
        </div>
        <div ref={rightRef} className="wuv-compare-half wuv-compare-half--bright absolute inset-0 overflow-hidden">
          <Image
            src={COMPARE_IMAGE}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-right"
          />
        </div>
        <div className="wuv-premium-sweep absolute inset-y-0 left-1/2 z-[2] w-0.5 -translate-x-1/2 bg-white/60 shadow-[0_0_12px_rgb(255_255_255_/_0.8)]" aria-hidden />
        <div className="wuv-compare-progress absolute bottom-3 left-3 right-3 z-[2] sm:bottom-4 sm:left-4 sm:right-4">
          <div className="h-0.5 overflow-hidden rounded-full bg-white/30">
            <div className="wuv-compare-progress__bar h-full rounded-full bg-gradient-to-r from-[#DC2626]/60 via-white/80 to-[#7C3AED]" />
          </div>
        </div>
        <div className="absolute bottom-8 left-3 z-[2] rounded-lg border border-white/60 bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#DC2626] backdrop-blur-sm sm:bottom-10 sm:left-4 sm:text-xs">
          Too common
        </div>
        <div className="absolute bottom-8 right-3 z-[2] rounded-lg border border-white/60 bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-uv-brand backdrop-blur-sm sm:bottom-10 sm:right-4 sm:text-xs">
          With U&V
        </div>
      </PremiumBannerFrame>
    </WuvMaskReveal>
  );
}

/** Unified premium industry card visual — all six industries */
export function WuvPremiumIndustryBanner({
  industry,
  className,
}: {
  industry: WuvIndustryAnimationId;
  className?: string;
}) {
  return <WuvIndustryCardBanner industry={industry} className={className} />;
}
