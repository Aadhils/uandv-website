import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AuthFormCard
      title="Admin sign in"
      description="Sign in with your U&V admin account to access the operations workspace."
      footer={
        <p>
          <Link
            href="/login"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Customer sign in
          </Link>
        </p>
      }
    >
      <LoginForm redirectTo="/admin" authMode="admin" />
    </AuthFormCard>
  );
}
