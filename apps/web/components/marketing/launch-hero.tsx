import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants, cn, Icon } from '@uandv/ui';

import { launchImages } from '@/lib/launch-images';
import { siteConfig } from '@/lib/site';

export function LaunchHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[min(100vh,920px)] overflow-hidden bg-[#08152F] text-white"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={launchImages.hero}
          alt=""
          fill
          priority
          quality={75}
          sizes="100vw"
          className="marketing-hero-media object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08152F] via-[#08152F]/88 to-[#102A56]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08152F]/96 via-[#3B1C78]/50 to-transparent" />
        <div className="marketing-hero-grid absolute inset-0 opacity-50" />
        <div className="marketing-orb marketing-pulse-glow -left-24 top-20 h-72 w-72 bg-[#7c3aed]/40" />
        <div className="marketing-orb marketing-float-delayed right-0 top-1/4 h-80 w-80 bg-[#102A56]/50" />
        <div className="marketing-orb marketing-float bottom-0 left-1/3 h-64 w-64 bg-[#6d28d9]/30" />
      </div>

      <div className="relative mx-auto grid w-full min-w-0 max-w-7xl gap-10 px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="min-w-0">
          <div className="marketing-animate-in marketing-glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C4B5FD] sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_12px_#A78BFA]" />
            U&V Technologies
          </div>

          <h1
            id="hero-heading"
            className="marketing-animate-in marketing-animate-in-delay-1 mt-6 max-w-4xl break-words font-[family-name:var(--font-uv-display)] text-[1.875rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]"
          >
            Everything Your Business Needs{' '}
            <span className="bg-gradient-to-r from-[#C4B5FD] via-white to-[#A78BFA] bg-clip-text text-transparent">
              Under One Roof.
            </span>
          </h1>

          <p className="marketing-animate-in marketing-animate-in-delay-2 mt-6 max-w-2xl break-words text-base leading-relaxed text-[#EDE9FE]/95 sm:text-lg">
            International-quality software, branding, and growth services for
            startups, SMEs, and enterprises — from first idea to long-term scale.
          </p>

          <div className="marketing-animate-in marketing-animate-in-delay-3 mt-9 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'w-full justify-center shadow-[0_8px_32px_rgb(124_58_237_/_0.35)] sm:w-auto',
              )}
            >
              Start Your Project
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'w-full justify-center border-white/35 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 sm:w-auto',
              )}
            >
              Book a Free Consultation
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'ghost' }),
                'w-full justify-center text-[#C4B5FD] hover:bg-white/10 hover:text-white sm:w-auto',
              )}
            >
              <Icon name="MessageCircle" size="sm" className="mr-2" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="marketing-animate-in marketing-animate-in-delay-3 min-w-0">
          <div className="marketing-glass-dark marketing-gradient-border relative rounded-uv-2xl p-5 sm:p-6">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C4B5FD]">
              Your growth partner
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-[#EDE9FE]/90">
              <li className="flex gap-3">
                <Icon name="Check" className="mt-0.5 shrink-0 text-[#A78BFA]" />
                <span>Technology, branding, and marketing coordinated by one team</span>
              </li>
              <li className="flex gap-3">
                <Icon name="Check" className="mt-0.5 shrink-0 text-[#A78BFA]" />
                <span>Custom software, websites, and AI automation built for your workflows</span>
              </li>
              <li className="flex gap-3">
                <Icon name="Check" className="mt-0.5 shrink-0 text-[#A78BFA]" />
                <span>Long-term support beyond launch — not a one-time handoff</span>
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
              <div className="rounded-uv-lg bg-white/5 p-3 text-center">
                <p className="font-[family-name:var(--font-uv-display)] text-xl font-bold text-white sm:text-2xl">
                  Since {siteConfig.founded}
                </p>
                <p className="mt-1 text-xs text-[#C4B5FD]">Tamil Nadu, India</p>
              </div>
              <div className="rounded-uv-lg bg-white/5 p-3 text-center">
                <p className="font-[family-name:var(--font-uv-display)] text-xl font-bold text-white sm:text-2xl">
                  15+
                </p>
                <p className="mt-1 text-xs text-[#C4B5FD]">Service capabilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
