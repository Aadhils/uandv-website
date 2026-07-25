import { Icon } from '@uandv/ui';

import { launchPartnerVoices } from '@/lib/launch-content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function LaunchPartnerVoices() {
  return (
    <section
      id="voices"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What partners value"
            title="The priorities we hear on every engagement."
            description="These reflect common client priorities from our work — honest principles, not fabricated reviews or logos."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {launchPartnerVoices.map((voice, index) => (
            <Reveal key={voice.context} delayMs={index * 80} className="h-full">
              <figure className="marketing-glass marketing-card-lift marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl p-6 sm:p-7">
                <Icon
                  name="MessageCircle"
                  size="md"
                  className="text-uv-brand/70"
                  aria-hidden
                />
                <blockquote className="mt-4 flex-1 break-words text-base leading-relaxed text-uv-foreground sm:text-lg">
                  &ldquo;{voice.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-uv-border pt-4 text-sm font-medium text-uv-brand">
                  {voice.context}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
