import Link from 'next/link';

import { AuthFormCard } from '@/components/auth';
import { buttonVariants, cn } from '@uandv/ui';
import type { WorkspaceUserDisplay } from '@/lib/auth/workspace-user';

type AdminAccessDeniedPageProps = {
  user: WorkspaceUserDisplay;
};

export function AdminAccessDeniedPage({ user }: AdminAccessDeniedPageProps) {
  return (
    <AuthFormCard
      title="Admin access required"
      description="You are signed in, but this account does not have permission to open the Admin Workspace."
    >
      <div className="space-y-4 text-sm text-uv-foreground-muted">
        <p>
          Signed in as{' '}
          <span className="font-medium text-uv-foreground">{user.name}</span>{' '}
          ({user.email}) · {user.roleLabel}
        </p>
        <p>
          Admin access requires the <code className="text-xs">ADMIN</code> or{' '}
          <code className="text-xs">SUPER_ADMIN</code> role in the platform
          database. Ask your platform administrator to set{' '}
          <code className="text-xs">publicMetadata.role</code> in Clerk if you
          need access.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/login/admin?redirect_url=%2Fadmin"
            className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
          >
            Sign in with a different account
          </Link>
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Go to customer workspace
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            Back to website
          </Link>
        </div>
      </div>
    </AuthFormCard>
  );
}
