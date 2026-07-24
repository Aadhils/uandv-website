import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Vendor sign in',
  robots: { index: false, follow: false },
};

export default function VendorLoginPage() {
  return (
    <AuthFormCard
      title="Vendor workspace"
      description="Vendor onboarding is under review after signup. Demo vendor login is disabled on production routes."
      footer={
        <p>
          <Link href="/signup" className="font-medium text-uv-brand underline-offset-4 hover:underline">
            Apply as a vendor
          </Link>
          {' · '}
          <Link href="/login" className="font-medium text-uv-brand underline-offset-4 hover:underline">
            Customer sign in
          </Link>
        </p>
      }
    >
      <p className="text-sm text-uv-foreground-muted">
        After approval, vendors will receive workspace access. Until then, use
        the customer account path or contact U&amp;V.
      </p>
    </AuthFormCard>
  );
}
