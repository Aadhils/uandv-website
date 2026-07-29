'use client';

import { cn } from '@uandv/ui';

export type WuvAtmosphereTone =
  | 'hero'
  | 'origin'
  | 'you-we'
  | 'journey'
  | 'ecosystem'
  | 'working'
  | 'after-launch'
  | 'consultation';

export function WuvSectionAtmosphere({
  tone,
  className,
}: {
  tone: WuvAtmosphereTone;
  className?: string;
}) {
  return (
    <div className={cn('wuv-atmosphere', `wuv-atmosphere--${tone}`, className)} aria-hidden>
      <div className="wuv-atmosphere__mesh" />
      <div className="wuv-atmosphere__orb wuv-atmosphere__orb--1" />
      <div className="wuv-atmosphere__orb wuv-atmosphere__orb--2" />
      <div className="wuv-atmosphere__orb wuv-atmosphere__orb--3" />
      <div className="wuv-atmosphere__grain" />
    </div>
  );
}
