import type { Metadata } from 'next';

import { AuthFormCard, ForgotPasswordForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Forgot password',
  description:
    'Recover your U&V account. Demo placeholder — no email or SMS is sent.',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthFormCard
      title="Forgot password"
      description="Enter the email or mobile on your account. Recovery is a demo placeholder in this sprint."
    >
      <ForgotPasswordForm />
    </AuthFormCard>
  );
}
