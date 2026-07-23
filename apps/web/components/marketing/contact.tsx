import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

/** Homepage contact CTA — full form lives on /contact. */
export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-uv-background-subtle py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background px-6 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
              <SectionHeading
                eyebrow="Contact"
                title="Tell us what you are building."
                description="Share your goals and we will recommend the right next step — planning, product, AI, or growth."
              />
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'w-full justify-center sm:w-auto',
                )}
              >
                Go to contact page
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
