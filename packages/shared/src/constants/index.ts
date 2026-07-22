export enum UserRole {
  USER = 'USER',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  BUSINESS_STAFF = 'BUSINESS_STAFF',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export const ADMIN_ROLES: UserRole[] = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

export const API_PREFIX = 'v1';

export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;
