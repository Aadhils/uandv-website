import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AuthFormCard, VerifyEmailForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Verify email',
  description:
    'Enter your verification code. Demo OTP UI only — no email service connected.',
  robots: { index: false, follow: false },
};

function VerifyEmailFallback() {
  return (
    <p className="text-sm text-uv-foreground-muted" role="status">
      Loading verification form…
    </p>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthFormCard
      title="Verify email"
      description="Confirm your email with a 6-digit code to continue to your workspace."
    >
      <Suspense fallback={<VerifyEmailFallback />}>
        <VerifyEmailForm />
      </Suspense>
    </AuthFormCard>
  );
}
