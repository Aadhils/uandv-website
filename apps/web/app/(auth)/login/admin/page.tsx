import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AuthFormCard
      title="Admin workspace"
      description="Demo admin login is disabled on production routes. Admin access will use Clerk organization roles in a later sprint."
      footer={
        <p>
          <Link href="/login" className="font-medium text-uv-brand underline-offset-4 hover:underline">
            Customer sign in
          </Link>
        </p>
      }
    >
      <p className="text-sm text-uv-foreground-muted">
        Product demos under <code className="text-xs">/demo/*</code> keep their
        own mock authentication.
      </p>
    </AuthFormCard>
  );
}
