'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@uandv/ui';

import type { WuvFilmChapter, WuvFilmChapterId } from '@/lib/why-uandv-film';

import { useReducedMotion } from './wuv-motion';

export function WuvFilmThread({
  chapters,
  activeId,
  className,
}: {
  chapters: readonly WuvFilmChapter[];
  activeId: WuvFilmChapterId;
  className?: string;
}) {
  const activeIndex = chapters.findIndex((c) => c.id === activeId);
  const progress = chapters.length <= 1 ? 0 : (activeIndex / (chapters.length - 1)) * 100;

  return (
    <div
      className={cn('wuv-film-thread', className)}
      aria-hidden
    >
      <div className="wuv-film-thread__track">
        <div className="wuv-film-thread__fill" style={{ height: `${progress}%` }} />
      </div>
      <ol className="wuv-film-thread__chapters">
        {chapters.map((chapter, index) => (
          <li
            key={chapter.id}
            className={cn(
              'wuv-film-thread__dot',
              index <= activeIndex && 'is-lit',
              chapter.id === activeId && 'is-active',
            )}
          >
            <span className="wuv-film-thread__num">{chapter.chapter}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function useWuvFilmActiveChapter(chapterIds: readonly WuvFilmChapterId[]) {
  const [activeId, setActiveId] = useState<WuvFilmChapterId>(chapterIds[0]);
  const refs = useRef<Map<WuvFilmChapterId, HTMLElement>>(new Map());

  useEffect(() => {
    const elements = chapterIds
      .map((id) => refs.current.get(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target instanceof HTMLElement && top.target.dataset.chapterId) {
          setActiveId(top.target.dataset.chapterId as WuvFilmChapterId);
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.35, 0.55] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapterIds]);

  const register = (id: WuvFilmChapterId) => (el: HTMLElement | null) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };

  return { activeId, register };
}

export function WuvFilmTransition({
  fromChapter,
  toChapter,
  visible,
}: {
  fromChapter: number;
  toChapter: number;
  visible: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced || !visible) return null;

  return (
    <div className="wuv-film-bridge" aria-hidden>
      <div className="wuv-film-bridge__line" />
      <p className="wuv-film-bridge__label">
        Chapter {fromChapter} → {toChapter}
      </p>
    </div>
  );
}
