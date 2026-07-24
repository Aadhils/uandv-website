import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your U&V customer workspace.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthFormCard
      title="Sign in"
      description="Access your U&V customer workspace with your Clerk account."
      footer={
        <p>
          New here?{' '}
          <Link
            href="/signup"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
          {' · '}
          Need help?{' '}
          <Link
            href="/contact"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Contact us
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthFormCard>
  );
}
