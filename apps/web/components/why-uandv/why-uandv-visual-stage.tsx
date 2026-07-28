'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@uandv/ui';

export type WhyUandVAspectRatio = '16/10' | '4/3' | '3/2' | 'auto';

export type WhyUandVStagePreset =
  | 'hero'
  | 'journey'
  | 'journey-grow'
  | 'section'
  | 'industry'
  | 'backdrop';

export type WhyUandVMotionVariant = 'none' | 'fade' | 'scale';

const aspectClass: Record<WhyUandVAspectRatio, string> = {
  '16/10': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  auto: '',
};

export type WhyUandVVisualStageProps = {
  src: string;
  alt: string;
  aspectRatio?: WhyUandVAspectRatio;
  priority?: boolean;
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
  className?: string;
  sizes?: string;
  preset?: WhyUandVStagePreset;
  imageClassName?: string;
  loading?: 'lazy' | 'eager';
};

export function WhyUandVVisualStage({
  src,
  alt,
  aspectRatio = '4/3',
  priority = false,
  objectFit = 'contain',
  objectPosition = 'center',
  className,
  sizes = '(max-width: 1024px) 100vw, 45vw',
  preset = 'section',
  imageClassName,
  loading,
}: WhyUandVVisualStageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = loaded && !failed;
  const imageLoading = loading ?? (priority ? 'eager' : 'lazy');

  const skipAspect = preset === 'backdrop' || preset === 'industry' || preset === 'hero' || preset === 'journey' || preset === 'journey-grow';

  return (
    <div
      className={cn(
        'wuv-visual-stage relative overflow-hidden',
        `wuv-visual-stage--${preset}`,
        !skipAspect && aspectRatio !== 'auto' && aspectClass[aspectRatio],
        className,
      )}
      data-wuv-visual={showImage ? 'loaded' : 'stage'}
    >
      <div className="wuv-visual-stage__surface absolute inset-0" aria-hidden>
        <div className="wuv-visual-stage__glow wuv-visual-stage__glow--uv" />
        <div className="wuv-visual-stage__glow wuv-visual-stage__glow--navy" />
      </div>

      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={imageLoading}
          sizes={sizes}
          className={cn(
            'wuv-visual-stage__image relative z-[1]',
            objectFit === 'cover' ? 'object-cover' : 'object-contain',
            imageClassName,
          )}
          style={{ objectPosition }}
          onError={() => setFailed(true)}
        />
      ) : (
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          loading={imageLoading}
          sizes={sizes}
          className="pointer-events-none absolute inset-0 z-0 opacity-0"
          aria-hidden
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
