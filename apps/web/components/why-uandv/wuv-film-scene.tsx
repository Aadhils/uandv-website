'use client';

import Image from 'next/image';

import { cn } from '@uandv/ui';

import type { WuvFilmChapter, WuvFilmChapterId } from '@/lib/why-uandv-film';

import { useReducedMotion } from './wuv-motion';

export function WuvFilmScene({
  chapter,
  registerRef,
  isActive = false,
  priority = false,
  children,
}: {
  chapter: WuvFilmChapter;
  registerRef: (el: HTMLElement | null) => void;
  isActive?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <article
      ref={registerRef}
      id={`chapter-${chapter.id}`}
      data-chapter-id={chapter.id}
      aria-label={`Chapter ${chapter.chapter}: ${chapter.feeling}`}
      className={cn(
        'wuv-film-scene group relative scroll-mt-20',
        isActive && 'is-scene-active',
        reduced && 'is-reduced-motion',
      )}
    >
      <div className="wuv-film-scene__frame">
        <div className="wuv-film-scene__image-wrap">
          <Image
            src={chapter.image}
            alt={chapter.imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="wuv-film-scene__image object-cover"
          />
          <div className="wuv-film-scene__scrim" aria-hidden />
          <div className="wuv-film-scene__grade" aria-hidden />
        </div>

        <div className="wuv-film-scene__content">
          <p className="wuv-film-scene__chapter">
            <span className="wuv-film-scene__chapter-num">0{chapter.chapter}</span>
            <span className="wuv-film-scene__chapter-feel">{chapter.feeling}</span>
          </p>

          <h2 className="wuv-film-scene__title">{chapter.title}</h2>

          <div className="wuv-film-scene__body">
            {chapter.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          {chapter.beats?.length ? (
            <ul className="wuv-film-scene__beats">
              {chapter.beats.map((beat, i) => (
                <li
                  key={beat}
                  className="wuv-film-scene__beat"
                  style={{ animationDelay: reduced ? undefined : `${i * 120}ms` }}
                >
                  {beat}
                </li>
              ))}
            </ul>
          ) : null}

          {children}
        </div>

        <div className="wuv-film-scene__progress" aria-hidden>
          <div className="wuv-film-scene__progress-bar" />
        </div>
      </div>
    </article>
  );
}

export type { WuvFilmChapterId };
