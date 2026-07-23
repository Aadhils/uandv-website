import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Sign in',
  description:
    'Sign in to your U&V workspace. Demo frontend only — not production authentication.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthFormCard
      title="Sign in"
      description="Access your U&V Business Workspace with one identity."
      footer={
        <p>
          Internal teams:{' '}
          <Link
            href="/login/admin"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Admin
          </Link>
          {' · '}
          <Link
            href="/login/employee"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Employee
          </Link>
          {' · '}
          <Link
            href="/login/vendor"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Vendor
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
