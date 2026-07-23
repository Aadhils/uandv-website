import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, LoginForm } from '@/components/auth';
import { WORKSPACE_ROLES } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Admin sign in',
  description:
    'Admin Workspace entry — same shared identity engine as customers and employees. Demo only.',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AuthFormCard
      title="Admin sign in"
      description="Enter the Admin Workspace. Uses the shared U&V identity system — not a separate credential database."
      footer={
        <p>
          Employee entry?{' '}
          <Link
            href="/login/employee"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Employee sign in
          </Link>
          {' · '}
          <Link
            href="/login"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Customer sign in
          </Link>
        </p>
      }
    >
      <LoginForm intendedRole={WORKSPACE_ROLES.ADMIN} />
    </AuthFormCard>
  );
}
