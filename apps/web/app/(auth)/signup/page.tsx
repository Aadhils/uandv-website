import type { Metadata } from 'next';
import Link from 'next/link';

import { Icon } from '@uandv/ui';

import { SignupForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create a U&V customer account with email verification via Clerk.',
  robots: { index: false, follow: false },
};

const benefits = [
  {
    icon: 'Layers' as const,
    title: 'One secure identity',
    text: 'Keep your U&V journey connected from one account.',
  },
  {
    icon: 'BriefcaseBusiness' as const,
    title: 'Choose how you work with us',
    text: 'Start as a Customer, Vendor, or Partner based on what you need today.',
  },
  {
    icon: 'Sparkles' as const,
    title: 'Grow without starting over',
    text: 'More eligible workspace roles can be added to the same identity later.',
  },
];

export default function SignupPage() {
  return (
    <div className="w-full max-w-6xl">
      <div className="grid overflow-hidden rounded-uv-xl border border-uv-border bg-uv-card shadow-uv-sm xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="p-5 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-3 border-b border-uv-border pb-7 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-uv-brand">
                Your U&amp;V journey starts here
              </p>
              <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight text-uv-foreground sm:text-4xl">
                Create your account
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                Choose the role that matches what you want to do now. Customer
                accounts can enter their workspace after verification; Vendor
                and Partner applications continue through review.
              </p>
            </div>
            <p className="shrink-0 text-sm text-uv-foreground-muted">
              Already registered?{' '}
              <Link
                href="/login"
                className="font-semibold text-uv-brand underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <SignupForm />
        </section>

        <aside className="border-t border-uv-border bg-uv-background-muted/55 p-6 xl:border-l xl:border-t-0 xl:p-7">
          <p className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Why join U&amp;V?
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-3 xl:grid-cols-1">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg border border-uv-brand/15 bg-uv-brand/10 text-uv-brand">
                  <Icon name={benefit.icon} size="sm" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-uv-foreground">
                    {benefit.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-uv-foreground-muted">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-uv-xl border border-uv-border bg-uv-card p-4">
            <p className="text-sm font-semibold text-uv-foreground">
              What happens next?
            </p>
            <p className="mt-2 text-xs leading-relaxed text-uv-foreground-muted">
              We verify your email first. Customers continue to their workspace;
              Vendor and Partner applications are shown their review status.
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
          >
            Need help? Contact U&amp;V
          </Link>
        </aside>
      </div>
    </div>
  );
}
