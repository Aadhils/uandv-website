import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthFormCard, ClerkSignOutButton } from '@/components/auth';
import { buttonVariants, cn } from '@uandv/ui';

export const metadata: Metadata = {
  title: 'Registration received',
  robots: { index: false, follow: false },
};

export default function SignupPendingPage() {
  return (
    <AuthFormCard
      title="Registration received"
      description="Thank you for applying as a Vendor or Partner. Your registration is under review. Our team will contact you when your workspace is ready."
      footer={
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className={cn(buttonVariants({ size: 'sm' }))}>
            Contact U&V
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            Back to home
          </Link>
          <ClerkSignOutButton />
        </div>
      }
    >
      <p className="text-sm text-uv-foreground-muted">
        Customer accounts can access the live dashboard immediately. Vendor and
        Partner workflows are enabled after approval — they are not part of this
        production foundation sprint.
      </p>
    </AuthFormCard>
  );
}
