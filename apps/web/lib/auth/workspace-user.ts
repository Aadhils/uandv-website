import { auth, currentUser } from '@clerk/nextjs/server';
import type { User } from '@uandv/database';

import { isAdminRole } from '@/lib/auth/db-roles';
import { displayName, ensureDbUser } from '@/lib/auth/server-user';

export type WorkspaceUserDisplay = {
  name: string;
  email: string;
  roleLabel: string;
  avatarUrl?: string | null;
};

function formatRoleLabel(user: User): string {
  if (isAdminRole(user.role)) {
    return user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin';
  }
  if (user.accountType === 'VENDOR') return 'Vendor';
  if (user.accountType === 'PARTNER') return 'Partner';
  if (user.role === 'BUSINESS_OWNER') return 'Business Owner';
  if (user.role === 'BUSINESS_STAFF') return 'Business Staff';
  return 'Customer';
}

export async function getWorkspaceUserDisplay(): Promise<WorkspaceUserDisplay | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  const dbUser = await ensureDbUser();

  const email =
    dbUser?.email ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.emailAddresses[0]?.emailAddress ||
    '';

  if (dbUser) {
    return {
      name: displayName(dbUser),
      email,
      roleLabel: formatRoleLabel(dbUser),
      avatarUrl: dbUser.avatarUrl ?? clerkUser?.imageUrl ?? null,
    };
  }

  if (clerkUser) {
    const name =
      clerkUser.fullName ||
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ').trim() ||
      email.split('@')[0] ||
      'User';

    return {
      name,
      email,
      roleLabel: 'Customer',
      avatarUrl: clerkUser.imageUrl ?? null,
    };
  }

  return null;
}
