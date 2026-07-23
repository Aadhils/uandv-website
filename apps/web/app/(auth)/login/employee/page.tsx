import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, LoginForm } from '@/components/auth';
import { WORKSPACE_ROLES } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Employee sign in',
  description:
    'Employee Workspace entry — same shared identity engine as customers and admins. Demo only.',
  robots: { index: false, follow: false },
};

export default function EmployeeLoginPage() {
  return (
    <AuthFormCard
      title="Employee sign in"
      description="Enter the Employee Workspace. Assigned records only — same identity engine, no separate employee credential store."
      footer={
        <p>
          Admin entry?{' '}
          <Link
            href="/login/admin"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Admin sign in
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
      <LoginForm intendedRole={WORKSPACE_ROLES.EMPLOYEE} />
    </AuthFormCard>
  );
}
