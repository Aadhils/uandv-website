import Link from 'next/link';

import { buttonVariants, cn, Icon } from '@uandv/ui';

import { contactInquiryHref, siteConfig } from '@/lib/site';

import { Reveal } from './reveal';

/**
 * Closing homepage CTA — consultation-focused, distinct from the hero value prop.
 */
export function HomepageFinalCta() {
  return (
    <section
      aria-labelledby="homepage-final-cta-heading"
      className="relative overflow-hidden bg-[#08152F] py-16 text-white sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.28),transparent_50%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C4B5FD]">
            Ready for a consultation?
          </p>
          <h2
            id="homepage-final-cta-heading"
            className="mt-4 font-[family-name:var(--font-uv-display)] text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Share where you are today. We&apos;ll map the practical next step.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#EDE9FE]/90">
            Whether you completed the business guide or are just exploring, tell us
            your goals and U&V will recommend consulting, design, technology, or
            growth support that fits your stage.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={contactInquiryHref}
              className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}
            >
              Book a free consultation
            </Link>
            <Link
              href={contactInquiryHref}
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'w-full border-white/35 bg-white/5 text-white hover:bg-white/10 sm:w-auto',
              )}
            >
              Start your project
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'ghost' }),
                'w-full text-[#C4B5FD] hover:bg-white/10 hover:text-white sm:w-auto',
              )}
            >
              <Icon name="MessageCircle" size="sm" className="mr-2" />
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-[#C4B5FD]/80">
            Prefer answers first?{' '}
            <Link href="/faq" className="underline-offset-4 hover:underline">
              Read our FAQ
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
