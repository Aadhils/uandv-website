import type { Metadata } from 'next';
import Link from 'next/link';

import { Icon } from '@uandv/ui';

import { SignupForm } from '@/components/auth';
import { Logo } from '@/components/brand/logo';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create a U&V account with email verification via Clerk.',
  robots: { index: false, follow: false },
};

const joinBenefits = [
  'Access multiple business solutions',
  'Manage projects and support easily',
  'Work with trusted partners',
  'Track your complete business journey',
  'Secure and reliable platform',
  'Built for businesses of all sizes',
];

const nextSteps = [
  'Create your account',
  'Choose your workspace role',
  'Verify your email',
  'Complete your profile',
  'Start your U&V journey',
];

export default function SignupPage() {
  return (
    <div id="signup-concept" className="min-h-dvh bg-[radial-gradient(circle_at_100%_0%,rgba(124,58,237,0.09),transparent_25%),radial-gradient(circle_at_0%_75%,rgba(37,99,235,0.07),transparent_22%)]">
      <header className="border-b border-uv-border/70 bg-uv-background/90">
        <div className="mx-auto flex min-h-16 max-w-[1440px] items-center gap-5 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex shrink-0 uv-focus-ring rounded-uv-md" aria-label="U&V home">
            <Logo size="lg" />
          </Link>
          <span className="hidden h-8 w-px bg-uv-border sm:block" aria-hidden />
          <span className="hidden text-xs font-semibold leading-tight text-uv-foreground-muted sm:block">Your Growth<br />Partner</span>
          <nav className="ml-auto hidden items-center gap-6 text-sm font-medium text-uv-foreground-muted lg:flex" aria-label="Signup navigation">
            <Link href="/" className="hover:text-uv-brand">Home</Link>
            <Link href="/about" className="hover:text-uv-brand">About</Link>
            <Link href="/business-solutions" className="hover:text-uv-brand">Business Solutions</Link>
            <Link href="/about#services" className="hover:text-uv-brand">Services</Link>
            <Link href="/portfolio" className="hover:text-uv-brand">Portfolio</Link>
            <Link href="/faq" className="hover:text-uv-brand">FAQ</Link>
          </nav>
          <div className="ml-auto text-right lg:ml-4">
            <span className="hidden text-xs text-uv-foreground-muted sm:block">Already have an account?</span>
            <Link href="/login" className="text-sm font-semibold text-uv-brand hover:underline">Sign in →</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="overflow-hidden rounded-[1.5rem] border border-uv-border bg-uv-card shadow-uv-sm lg:grid lg:grid-cols-[minmax(17rem,0.9fr)_minmax(32rem,1.45fr)_minmax(16rem,0.72fr)]">
          <aside className="relative overflow-hidden bg-uv-navy p-7 text-white sm:p-9 lg:min-h-[720px] lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,0.45),transparent_34%),radial-gradient(circle_at_70%_95%,rgba(109,40,217,0.5),transparent_32%)]" aria-hidden />
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <Logo invert size="lg" />
                <span className="h-9 w-px bg-white/30" aria-hidden />
                <span className="text-sm font-medium leading-tight text-white/90">Your Growth<br />Partner</span>
              </div>
              <h1 className="mt-12 font-[family-name:var(--font-uv-display)] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                One account.<br />
                Many <span className="text-uv-soft-violet">opportunities.</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/75 sm:text-base">
                Create your U&amp;V account to access your business journey, services, projects and future eligible workspaces — everything in one place.
              </p>
              <div className="mt-9 space-y-5">
                {[
                  ['Access multiple workspaces', 'Customer, Vendor, Partner and more'],
                  ['Manage your business easily', 'Services, projects, documents and support'],
                  ['Grow together', 'More opportunities, stronger business network'],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-uv-brand/35 text-white">
                      <Icon name="Check" size="sm" />
                    </span>
                    <div><p className="font-semibold">{title}</p><p className="mt-1 text-xs leading-relaxed text-white/65">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 mt-12 border-t border-white/15 pt-5 text-sm font-medium leading-relaxed text-white/90 lg:absolute lg:bottom-10 lg:left-10 lg:right-10">
              “Everything Your Business Needs Under One Roof.”
            </div>
          </aside>

          <section className="p-5 sm:p-8 lg:p-9">
            <div className="mb-6">
              <h2 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight text-uv-foreground sm:text-4xl">Create your account</h2>
              <p className="mt-2 text-sm text-uv-foreground-muted sm:text-base">Get started with U&amp;V and choose how you want to use the platform.</p>
            </div>
            <SignupForm />
          </section>

          <aside className="border-t border-uv-border bg-uv-background-muted/40 p-5 sm:p-6 lg:border-l lg:border-t-0">
            <div className="rounded-uv-xl border border-uv-brand/15 bg-uv-card p-5 shadow-uv-sm">
              <h3 className="text-lg font-semibold text-uv-brand">Why join U&amp;V?</h3>
              <div className="mt-4 space-y-3">
                {joinBenefits.map((item) => (
                  <div key={item} className="flex gap-2.5 text-sm text-uv-foreground">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-uv-brand text-white"><Icon name="Check" size="sm" /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-uv-xl border border-uv-brand/15 bg-uv-card p-5 shadow-uv-sm">
              <h3 className="text-lg font-semibold text-uv-brand">Next steps</h3>
              <ol className="mt-4 space-y-3">
                {nextSteps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3 text-sm text-uv-foreground">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-uv-brand text-xs font-bold text-white">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-4 rounded-uv-xl border border-uv-brand/15 bg-uv-brand-muted/30 p-5">
              <h3 className="font-semibold text-uv-foreground">Need help?</h3>
              <p className="mt-1 text-xs leading-relaxed text-uv-foreground-muted">Our support team is here to help.</p>
              <Link href="/contact" className="mt-3 inline-flex text-sm font-semibold text-uv-brand hover:underline">Contact U&amp;V →</Link>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-uv-border/70 bg-uv-background">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-uv-foreground-muted sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-2"><Logo size="sm" /><span>Your Growth Partner</span></div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/legal/privacy" className="hover:text-uv-brand">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-uv-brand">Terms of Service</Link>
            <Link href="/legal/cookies" className="hover:text-uv-brand">Cookie Policy</Link>
          </div>
          <span>© 2026 U&amp;V. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
