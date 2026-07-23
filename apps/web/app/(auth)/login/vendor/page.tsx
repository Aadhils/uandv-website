import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, LoginForm } from '@/components/auth';
import { WORKSPACE_ROLES } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Vendor sign in',
  description:
    'Vendor Workspace entry — same shared identity engine as customers, employees, and admins. Demo only.',
  robots: { index: false, follow: false },
};

export default function VendorLoginPage() {
  return (
    <AuthFormCard
      title="Vendor sign in"
      description="Enter the Vendor Workspace. Assigned work only — same identity engine, no separate vendor credential store."
      footer={
        <p>
          Other entries:{' '}
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
            href="/login"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Customer
          </Link>
        </p>
      }
    >
      <LoginForm intendedRole={WORKSPACE_ROLES.VENDOR} />
    </AuthFormCard>
  );
}
