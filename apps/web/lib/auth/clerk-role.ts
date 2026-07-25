import type { UserRole } from '@uandv/database';

const USER_ROLES: UserRole[] = [
  'USER',
  'BUSINESS_OWNER',
  'BUSINESS_STAFF',
  'ADMIN',
  'SUPER_ADMIN',
];

/**
 * Maps Clerk public metadata role to Prisma UserRole.
 * Admin roles are only applied when explicitly set in Clerk public metadata
 * (server-controlled), never from client signup metadata.
 */
export function mapClerkRole(
  metadata?: Record<string, unknown> | null,
): UserRole | null {
  const role = metadata?.role;
  if (typeof role !== 'string') return null;
  const normalized = role.trim().toUpperCase();
  if (USER_ROLES.includes(normalized as UserRole)) {
    return normalized as UserRole;
  }
  return null;
}
