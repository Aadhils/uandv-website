'use client';

import dynamic from 'next/dynamic';
import type { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@uandv/ui';

import type { WuvAnimationId } from '@/lib/why-uandv-animations';
import { wuvAnimations } from '@/lib/why-uandv-animations';
import { getWuvLottieData, prefetchWuvLottieData, type WuvLottieData } from '@/lib/why-uandv-lottie-data';

import { useInView, useReducedMotion } from './wuv-motion';
import { WuvStorySceneFallback } from './wuv-story-scenes';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function WuvLottiePlayer({
  animationId,
  className,
  eager = false,
  fallback,
}: {
  animationId: WuvAnimationId;
  className?: string;
  eager?: boolean;
  fallback?: ReactNode;
}) {
  const meta = wuvAnimations[animationId];
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: '0px 0px -5% 0px',
  });
  const [data, setData] = useState<WuvLottieData | null>(null);
  const [tabVisible, setTabVisible] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const loadRequestRef = useRef(0);

  const shouldLoad = eager || inView;
  const shouldPlay = inView && tabVisible && !reduced;

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!shouldLoad || reduced) return;

    const requestId = ++loadRequestRef.current;
    getWuvLottieData(animationId).then((json) => {
      if (requestId === loadRequestRef.current && json) setData(json);
    });
  }, [shouldLoad, reduced, animationId]);

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst || !data) return;
    if (shouldPlay) inst.play();
    else inst.pause();
  }, [shouldPlay, data]);

  const fallbackNode = fallback ?? <WuvStorySceneFallback scene={animationId} />;

  return (
    <div
      ref={ref}
      className={cn('wuv-lottie-player mx-auto w-full max-w-full', className)}
      role="img"
      aria-label={meta.label}
    >
      <div
        className="wuv-lottie-player__frame relative mx-auto w-full"
        style={{ maxWidth: meta.width, aspectRatio: `${meta.width} / ${meta.height}` }}
      >
        <div className="wuv-lottie-player__fallback absolute inset-0" aria-hidden={!reduced && !!data}>
          {fallbackNode}
        </div>
        {!reduced && data ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={data}
            loop={meta.loop ?? false}
            autoplay={false}
            className="relative z-[1] h-full w-full"
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        ) : null}
      </div>
    </div>
  );
}

export function prefetchWuvAnimation(id: WuvAnimationId) {
  prefetchWuvLottieData(id);
}
