import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Employee sign in',
  robots: { index: false, follow: false },
};

export default function EmployeeLoginPage() {
  return (
    <AuthFormCard
      title="Employee workspace"
      description="Demo employee login is disabled on production routes."
      footer={
        <p>
          <Link href="/login" className="font-medium text-uv-brand underline-offset-4 hover:underline">
            Customer sign in
          </Link>
        </p>
      }
    >
      <p className="text-sm text-uv-foreground-muted">
        Internal CRM/employee tools remain demo-only in this sprint.
      </p>
    </AuthFormCard>
  );
}
