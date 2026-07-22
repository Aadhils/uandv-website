import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { siteConfig } from '@/lib/site';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

/** Homepage contact CTA — full form lives on /contact. */
export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-uv-background-subtle py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <SectionHeading
                  eyebrow="Contact"
                  title="Tell us what you are building."
                  description="Share your goals and we will recommend the right next step — planning, product, AI, or growth."
                />
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Go to contact page
                </Link>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'justify-center',
                  )}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
