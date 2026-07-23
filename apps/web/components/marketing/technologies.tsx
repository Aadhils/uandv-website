import { technologies } from '@/lib/content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Technologies() {
  return (
    <section
      id="technologies"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Technologies"
            title="Modern tools. Production standards."
            description="We build with proven, maintainable technology so your product stays fast, secure, and ready to grow."
          />
        </Reveal>

        <Reveal delayMs={100}>
          <ul className="mt-12 flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-uv-lg border border-uv-border bg-uv-background-subtle px-4 py-2.5 text-sm font-medium text-uv-foreground transition-colors duration-200 hover:border-uv-brand/40 hover:text-uv-brand"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
