import { auth } from '@clerk/nextjs/server';
import type { User } from '@uandv/database';
import { redirect } from 'next/navigation';

import { displayName, requireDbUser } from '@/lib/auth/server-user';

export function isAdminRole(role: User['role']): boolean {
  return role === 'ADMIN' || role === 'SUPER_ADMIN';
}

type RequireAdminOptions = {
  /** Path to return to after sign-in (must start with /). */
  redirectPath?: string;
};

function loginRedirect(path: string, authError?: string): never {
  const params = new URLSearchParams({ redirect_url: path });
  if (authError) {
    params.set('auth_error', authError);
  }
  redirect(`/login?${params.toString()}`);
}

function forbiddenRedirect(): never {
  // Keep the Clerk session — do not send signed-in users back to /login.
  redirect('/admin?error=admin_required');
}

/**
 * Page guard for live admin CRM routes.
 * - No Clerk session → /login with redirect_url preserved
 * - Signed in but missing admin DB role → /admin access notice (no login loop)
 */
export async function requireAdminUser(
  options: RequireAdminOptions = {},
): Promise<User> {
  const redirectPath = options.redirectPath ?? '/admin/leads/list';
  const { userId } = await auth();

  let user: User;
  try {
    user = await requireDbUser();
  } catch {
    if (!userId) {
      loginRedirect(redirectPath);
    }
    loginRedirect(redirectPath, 'session_verify');
  }

  if (!isAdminRole(user.role)) {
    forbiddenRedirect();
  }

  return user;
}

/** API routes — returns 401/403 via thrown errors instead of redirect. */
export async function requireAdminUserApi(): Promise<User> {
  let user: User;
  try {
    user = await requireDbUser();
  } catch {
    throw new Error('UNAUTHORIZED');
  }

  if (!isAdminRole(user.role)) {
    throw new Error('FORBIDDEN');
  }

  return user;
}

export function getAdminActorLabel(user: User): string {
  return displayName(user);
}
