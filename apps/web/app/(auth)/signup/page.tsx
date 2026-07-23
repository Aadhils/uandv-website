import type { Metadata } from 'next';

import { AuthFormCard, SignupForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Create account',
  description:
    'Create a U&V account as a Customer, Vendor, or Partner. Demo frontend only.',
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthFormCard
      title="Create account"
      description="One identity for Customer, Vendor, and Partner workspaces. Employee and Admin roles come later."
    >
      <SignupForm />
    </AuthFormCard>
  );
}
