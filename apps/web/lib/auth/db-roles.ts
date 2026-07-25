import type { User } from '@uandv/database';

export function isAdminRole(role: User['role']): boolean {
  return role === 'ADMIN' || role === 'SUPER_ADMIN';
}
