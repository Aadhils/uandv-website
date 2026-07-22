import Image from 'next/image';

import { buttonVariants, cn } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { siteConfig } from '@/lib/site';

export function Hero() {
  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#08152F] text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
          alt="Circuit board technology representing software, AI, and digital systems"
          fill
          priority
          sizes="100vw"
          className="marketing-hero-media object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#08152F] via-[#08152F]/88 to-[#102A56]/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#08152F]/95 via-[#3B1C78]/55 to-transparent"
          aria-hidden
        />
        <div className="marketing-hero-grid absolute inset-0" aria-hidden />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="marketing-animate-in">
          <Logo invert size="hero" className="text-white" />
        </div>

        <h1
          id="hero-heading"
          className="marketing-animate-in marketing-animate-in-delay-1 mt-6 max-w-3xl font-[family-name:var(--font-uv-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          {siteConfig.headline}
        </h1>

        <p className="marketing-animate-in marketing-animate-in-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[#EDE9FE] sm:text-lg">
          {siteConfig.tagline} We help startups, SMEs, and enterprises start,
          build, grow, and scale with software, AI, and digital transformation.
        </p>

        <div className="marketing-animate-in marketing-animate-in-delay-3 mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'w-full justify-center sm:w-auto',
            )}
          >
            Start your project
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'w-full justify-center border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto',
            )}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
