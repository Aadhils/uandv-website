import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard } from '@/components/auth';
import { buttonVariants, cn } from '@uandv/ui';

export const metadata: Metadata = {
  title: 'Verify email',
  description:
    'Email verification is handled during Clerk signup. Use Create account or Sign in to continue.',
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <AuthFormCard
      title="Verify email"
      description="Email verification happens during signup. Enter the code shown on the Create account screen after you register."
      footer={
        <div className="flex flex-wrap gap-3">
          <Link href="/signup" className={cn(buttonVariants({ size: 'sm' }))}>
            Create account
          </Link>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            Sign in
          </Link>
        </div>
      }
    >
      <p className="text-sm text-uv-foreground-muted">
        If you already started signup, return to that tab to enter your
        verification code. Password recovery uses the{' '}
        <Link
          href="/forgot-password"
          className="font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Forgot password
        </Link>{' '}
        flow.
      </p>
    </AuthFormCard>
  );
}
