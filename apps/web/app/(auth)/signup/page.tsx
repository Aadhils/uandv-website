import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, SignupForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Create account',
  description:
    'Create a U&V customer account with email verification via Clerk.',
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthFormCard
      title="Create account"
      description="Register as a Customer to access your live workspace. Vendor and Partner applications are accepted for review."
      footer={
        <p>
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthFormCard>
  );
}
