'use client';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import {
  type WhyUandVVisualAssetKey,
  WUV_HERO_OBJECT_POSITION,
  WUV_JOURNEY_IMAGE_SIZES,
  wuvVisualAsset,
} from '@/lib/why-uandv-visual-assets';

import { WhyUandVVisualStage } from './why-uandv-visual-stage';

type StageOptions = {
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
};

function fromKey(key: WhyUandVVisualAssetKey, preset: Parameters<typeof WhyUandVVisualStage>[0]['preset'], options?: StageOptions) {
  const asset = wuvVisualAsset(key);
  return (
    <WhyUandVVisualStage
      src={asset.src}
      alt={asset.alt}
      aspectRatio={asset.aspectRatio}
      objectFit={asset.objectFit}
      objectPosition={'objectPosition' in asset ? asset.objectPosition : 'center'}
      preset={preset}
      priority={options?.priority}
      sizes={options?.sizes}
      className={cn('w-full', options?.className)}
    />
  );
}

export function HeroTableVisual(options?: StageOptions) {
  const asset = wuvVisualAsset('hero');

  return (
    <Reveal delayMs={140} variant="scale" className={options?.className}>
      <WhyUandVVisualStage
        src={asset.src}
        alt={asset.alt}
        aspectRatio={asset.aspectRatio}
        objectFit="cover"
        objectPosition={options?.objectPosition ?? WUV_HERO_OBJECT_POSITION}
        preset="hero"
        priority
        sizes={options?.sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 52vw'}
        className="w-full"
      />
    </Reveal>
  );
}

export function PrinciplesBannerVisual(options?: StageOptions) {
  return fromKey('principles', 'section', {
    sizes: '(max-width: 1024px) 100vw, 45vw',
    ...options,
  });
}

export function WorkflowBannerVisual(options?: StageOptions) {
  return fromKey('workflow', 'section', {
    sizes: '(max-width: 1024px) 100vw, 45vw',
    ...options,
  });
}

export function PartnershipVisual(options?: StageOptions) {
  return fromKey('partnership', 'section', {
    sizes: '(max-width: 1024px) 100vw, 45vw',
    ...options,
  });
}

/** @deprecated Use PartnershipVisual — kept for import compatibility */
export const DepthTimelineVisual = PartnershipVisual;

export function ClosingTableVisual(options?: StageOptions) {
  return fromKey('closing', 'backdrop', {
    sizes: '100vw',
    className: cn('pointer-events-none absolute inset-0 h-full w-full', options?.className),
    ...options,
  });
}

export function JourneyStageVisual({
  assetKey,
  emphasized = false,
  className,
}: {
  assetKey: WhyUandVVisualAssetKey;
  emphasized?: boolean;
  className?: string;
}) {
  const asset = wuvVisualAsset(assetKey);
  return (
    <WhyUandVVisualStage
      src={asset.src}
      alt={asset.alt}
      aspectRatio={asset.aspectRatio}
      objectFit={asset.objectFit}
      preset={emphasized ? 'journey-grow' : 'journey'}
      priority={false}
      loading="lazy"
      sizes={WUV_JOURNEY_IMAGE_SIZES}
      className={cn('w-full', className)}
    />
  );
}

export function IndustryVisual({
  assetKey,
  className,
}: {
  assetKey: WhyUandVVisualAssetKey;
  className?: string;
}) {
  const asset = wuvVisualAsset(assetKey);
  return (
    <WhyUandVVisualStage
      src={asset.src}
      alt={asset.alt}
      aspectRatio={asset.aspectRatio}
      objectFit={asset.objectFit}
      preset="industry"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={cn('w-full', className)}
      imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  );
}
