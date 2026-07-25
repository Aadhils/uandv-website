import Link from 'next/link';

import { buttonVariants, cn, Icon } from '@uandv/ui';

import { siteConfig } from '@/lib/site';

import { Reveal } from './reveal';

export function LaunchFinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#08152F] py-20 text-white sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.35),transparent_55%)]"
        aria-hidden
      />
      <div
        className="marketing-orb marketing-pulse-glow pointer-events-none absolute -left-20 bottom-0 h-64 w-64 bg-[#7c3aed]/30"
        aria-hidden
      />
      <div
        className="marketing-orb marketing-float pointer-events-none absolute -right-16 top-8 h-56 w-56 bg-[#102A56]/40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <div className="marketing-glass-dark marketing-gradient-border mx-auto max-w-3xl rounded-uv-2xl p-8 sm:p-10">
            <h2 className="break-words font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s Build Something Extraordinary Together.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl break-words text-base leading-relaxed text-[#EDE9FE]/90 sm:text-lg">
              Tell us what you want to build. U&V will recommend the practical next
              step across consulting, design, technology, automation, and growth.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'w-full shadow-[0_8px_32px_rgb(124_58_237_/_0.35)] sm:w-auto',
                )}
              >
                Start Your Project
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'w-full border-white/35 bg-white/5 text-white hover:bg-white/10 sm:w-auto',
                )}
              >
                Book Free Consultation
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
