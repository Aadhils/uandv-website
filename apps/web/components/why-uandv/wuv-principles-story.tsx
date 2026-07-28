'use client';

import { Reveal } from '@/components/marketing/reveal';
import { wuvPrinciples } from '@/lib/why-uandv-content';
import { whyCorePrinciples } from '@/lib/why-uandv';

import { WuvPrincipleIcon } from './wuv-illustrations';
import { WuvStoryCopy, WuvStorySection, WuvStorySplit, WuvStoryVisual } from './wuv-story-scenes';

const principleRows = [
  [0, 1],
  [2, 3],
  [4, 5],
] as const;

function PrincipleSpotlight({ index }: { index: number }) {
  const p = whyCorePrinciples[index];
  return (
    <div className="min-w-0">
      <h3 className="text-base font-semibold text-uv-foreground sm:text-lg">{p.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">{p.description}</p>
    </div>
  );
}

function PrincipleVisual({ indices }: { indices: readonly [number, number] }) {
  return (
    <div className="flex h-full min-h-[180px] items-center justify-center gap-6 p-6 sm:min-h-[220px] sm:gap-10 sm:p-8">
      {indices.map((pi) => (
        <div key={pi} className="flex flex-col items-center gap-3 text-center">
          <WuvPrincipleIcon index={pi} active className="h-16 w-16 sm:h-20 sm:w-20" />
          <span className="max-w-[7rem] text-xs font-semibold text-uv-foreground sm:text-sm">
            {whyCorePrinciples[pi].title}
          </span>
        </div>
      ))}
    </div>
  );
}

export function WuvPrinciplesStorySection() {
  return (
    <WuvStorySection
      id="principles"
      variant="lavender"
      aria-label="What we stand behind"
      className="py-10 sm:py-14 lg:py-[4.5rem]"
    >
      <Reveal variant="up-blur" className="mx-auto max-w-2xl text-center">
        <WuvStoryCopy
          eyebrow={wuvPrinciples.eyebrow}
          title={wuvPrinciples.title}
          className="mx-auto text-center [&_h2]:text-center"
        >
          <p>{wuvPrinciples.intro}</p>
          <p className="font-medium text-uv-foreground">{wuvPrinciples.outro}</p>
        </WuvStoryCopy>
      </Reveal>

      <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-16">
        {principleRows.map((pair, rowIndex) => {
          const reversed = rowIndex % 2 === 1;
          return (
            <Reveal key={rowIndex} delayMs={rowIndex * 60} variant="up">
              <WuvStorySplit
                reverse={reversed}
                visual={
                  <WuvStoryVisual glow className="max-w-md lg:mx-auto">
                    <PrincipleVisual indices={pair} />
                  </WuvStoryVisual>
                }
                copy={
                  <div className="space-y-6">
                    {pair.map((pi) => (
                      <PrincipleSpotlight key={pi} index={pi} />
                    ))}
                  </div>
                }
              />
            </Reveal>
          );
        })}
      </div>
    </WuvStorySection>
  );
}
