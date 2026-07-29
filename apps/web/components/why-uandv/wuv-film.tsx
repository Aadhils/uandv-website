'use client';

import Link from 'next/link';

import {
  MarketingButtonLink,
  MarketingEyebrow,
} from '@/components/marketing/marketing-primitives';
import { wuvFilmChapters, wuvFilmIndustries } from '@/lib/why-uandv-film';
import { wuvAccountability, wuvHero } from '@/lib/why-uandv-content';

import { WuvFilmScene } from './wuv-film-scene';
import { useWuvFilmActiveChapter, WuvFilmThread } from './wuv-film-thread';

const CHAPTER_IDS = wuvFilmChapters.map((c) => c.id);

export function WuvFilm() {
  const { activeId, register } = useWuvFilmActiveChapter(CHAPTER_IDS);

  return (
    <div className="wuv-film relative">
      <WuvFilmThread
        chapters={wuvFilmChapters}
        activeId={activeId}
        className="hidden lg:block"
      />

      <div className="wuv-film__acts">
        {wuvFilmChapters.map((chapter, index) => (
          <WuvFilmScene
            key={chapter.id}
            chapter={chapter}
            registerRef={register(chapter.id)}
            isActive={activeId === chapter.id}
            priority={index === 0}
          >
            {chapter.id === 'idea' ? (
              <div className="wuv-film-scene__hero-meta">
                <MarketingEyebrow className="text-white/95">{wuvHero.eyebrow}</MarketingEyebrow>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <MarketingButtonLink href="/about#services">Explore Our Services</MarketingButtonLink>
                  <MarketingButtonLink
                    href="/business-solutions"
                    variant="outline"
                    size="md"
                    className="border-white/50 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                  >
                    How we partner
                  </MarketingButtonLink>
                </div>
              </div>
            ) : null}

            {chapter.id === 'partnership' ? (
              <>
                <ul className="wuv-film-scene__commitments">
                  {wuvAccountability.commitments.slice(0, 4).map((item) => (
                    <li key={item.title}>
                      <span className="font-semibold text-white">{item.title}.</span>{' '}
                      {item.description}
                    </li>
                  ))}
                </ul>
                <p className="wuv-film-scene__epilogue">
                  <Link href="/contact" className="font-medium text-white underline-offset-4 hover:underline">
                    Talk to our team
                  </Link>
                  {' · '}
                  {wuvFilmIndustries}
                </p>
              </>
            ) : null}
          </WuvFilmScene>
        ))}
      </div>
    </div>
  );
}
