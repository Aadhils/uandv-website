import type { Metadata } from 'next';

import { AuthFormCard, ForgotPasswordForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Reset your U&V account password through Clerk email verification.',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthFormCard
      title="Forgot password"
      description="Enter the email on your account. Clerk will send a one-time reset code."
    >
      <ForgotPasswordForm />
    </AuthFormCard>
  );
}
