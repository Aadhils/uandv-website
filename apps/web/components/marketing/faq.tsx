import { Icon } from '@uandv/ui';

import { faqs } from '@/lib/content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Faq() {
  return (
    <section
      id="faq"
      className="marketing-faq scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions about U&V."
            description="Straight answers before you reach out — so you know what to expect."
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-uv-border border-y border-uv-border">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delayMs={index * 40}>
              <details className="group py-5">
                <summary className="flex min-h-11 cursor-pointer items-start justify-between gap-4 rounded-uv-md text-left uv-focus-ring">
                  <span className="font-[family-name:var(--font-uv-display)] text-base font-semibold leading-snug text-uv-foreground sm:text-lg">
                    {faq.question}
                  </span>
                  <Icon
                    name="ChevronDown"
                    size="md"
                    className="faq-chevron mt-1 shrink-0 text-uv-foreground-muted transition-transform duration-200"
                  />
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
