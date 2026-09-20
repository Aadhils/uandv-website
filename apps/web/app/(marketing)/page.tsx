import type { Metadata } from 'next';

import { Logo } from '@/components/brand/logo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `U&V — You Post. We Connect.`,
  description:
    'U&V is a new social and marketplace ecosystem for discovering, connecting, buying, selling, booking services and unlocking optional earning opportunities.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'U&V — You Post. We Connect.',
    description:
      'Connect, discover, buy, sell, book services and grow — all from one U&V account.',
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'U&V — You Post. We Connect.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'U&V — You Post. We Connect.',
    description: 'One account to connect, discover, buy, sell, book services and grow.',
    images: ['/twitter-image'],
  },
};

const ecosystem = ['Social', 'Classifieds', 'Local Services', 'Marketplace', 'E-Commerce'];

export default function MarketingHomePage() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-8rem)] items-center overflow-hidden bg-uv-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.10),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(124,58,237,0.14),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(79,70,229,0.08),transparent_38%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto flex w-fit items-center justify-center rounded-2xl border border-uv-border bg-uv-card/80 px-5 py-3 shadow-uv-sm backdrop-blur">
          <Logo size="lg" />
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-uv-brand sm:text-sm">
          Something bigger is coming
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl font-[family-name:var(--font-uv-display)] text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-uv-foreground sm:text-6xl lg:text-8xl">
          You Post.
          <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            We Connect.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-uv-foreground-muted sm:text-lg sm:leading-8">
          One place to connect, discover, buy, sell, book services and grow. Post what you need,
          offer or sell — U&amp;V helps connect you with the right people, services, products and
          opportunities.
        </p>

        <div className="mx-auto mt-9 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
          {ecosystem.map((item) => (
            <span
              key={item}
              className="rounded-full border border-uv-border bg-uv-card px-4 py-2 text-sm font-semibold text-uv-foreground shadow-uv-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left sm:grid-cols-2">
          <div className="rounded-3xl border border-uv-border bg-uv-card/90 p-6 shadow-uv-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-uv-brand">Use U&amp;V your way</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-uv-foreground">Your everyday platform</h2>
            <p className="mt-3 text-sm leading-6 text-uv-foreground-muted">
              Join as a normal user and enjoy the social and marketplace experience. Use free or
              paid services whenever you need them — earning participation is never required.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/50 bg-gradient-to-br from-violet-50 to-blue-50 p-6 shadow-uv-sm dark:border-violet-800/50 dark:from-violet-950/30 dark:to-blue-950/30 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">Want more?</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-uv-foreground">Unlock opportunities</h2>
            <p className="mt-3 text-sm leading-6 text-uv-foreground-muted">
              Eligible users can choose to upgrade later and unlock additional network, growth and
              earning-opportunity features. It remains an optional part of the U&amp;V experience.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-uv-navy px-5 py-2.5 text-sm font-semibold text-white shadow-uv-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-300" aria-hidden />
            Coming Soon
          </span>
          <p className="mt-5 text-sm font-semibold text-uv-foreground-muted">
            U&amp;V — You Post. We Connect.
          </p>
        </div>
      </div>
    </section>
  );
}
