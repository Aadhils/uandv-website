import { auth } from '@clerk/nextjs/server';
import type { User } from '@uandv/database';
import { redirect } from 'next/navigation';

import { isAdminRole } from '@/lib/auth/db-roles';
import { ensureDbUser } from '@/lib/auth/server-user';
import {
  getWorkspaceUserDisplay,
  type WorkspaceUserDisplay,
} from '@/lib/auth/workspace-user';

export type AdminWorkspaceGate =
  | { kind: 'allowed'; user: User; userDisplay: WorkspaceUserDisplay }
  | { kind: 'forbidden'; userDisplay: WorkspaceUserDisplay }
  | { kind: 'unauthenticated' };

/**
 * Server-side gate for the admin workspace layout.
 * Middleware should already redirect signed-out users to /login/admin.
 */
export async function getAdminWorkspaceGate(): Promise<AdminWorkspaceGate> {
  const { userId } = await auth();
  if (!userId) {
    return { kind: 'unauthenticated' };
  }

  const userDisplay = await getWorkspaceUserDisplay();
  if (!userDisplay) {
    return { kind: 'unauthenticated' };
  }

  const dbUser = await ensureDbUser();
  if (!dbUser) {
    redirect('/login/admin?redirect_url=%2Fadmin&auth_error=session_verify');
  }

  if (!isAdminRole(dbUser.role)) {
    return { kind: 'forbidden', userDisplay };
  }

  return {
    kind: 'allowed',
    user: dbUser,
    userDisplay,
  };
}
