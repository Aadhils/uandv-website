/**
 * Workspace role model for U&V Business Workspace Platform.
 *
 * Architecture:
 * - One user identity may hold multiple workspace roles (memberships).
 * - Do NOT create separate auth systems / credential databases per role.
 * - Customer → /dashboard · Admin → /admin · Employee → /employee · Vendor → /vendor
 * - Dedicated login entry routes may exist; they share this identity engine.
 * - Signup offers Customer / Vendor / Partner only; Admin/Employee are internal.
 */

export const WORKSPACE_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  PARTNER: 'partner',
  EMPLOYEE: 'employee',
  ADMIN: 'admin',
} as const;

export type WorkspaceRole =
  (typeof WORKSPACE_ROLES)[keyof typeof WORKSPACE_ROLES];

/** Roles selectable during public signup (Sprint 3.0.2). */
export const SIGNUP_ACCOUNT_TYPES = [
  {
    value: WORKSPACE_ROLES.CUSTOMER,
    label: 'Customer',
    description: 'Buy, book, and manage services',
  },
  {
    value: WORKSPACE_ROLES.VENDOR,
    label: 'Vendor',
    description: 'Deliver assigned work and manage operations',
  },
  {
    value: WORKSPACE_ROLES.PARTNER,
    label: 'Partner',
    description: 'Collaborate, refer, and grow together',
  },
] as const;

export type SignupAccountType =
  (typeof SIGNUP_ACCOUNT_TYPES)[number]['value'];

/** Future / internal roles — not offered on public signup yet. */
export const FUTURE_WORKSPACE_ROLES = [
  WORKSPACE_ROLES.EMPLOYEE,
  WORKSPACE_ROLES.ADMIN,
] as const;

/**
 * Placeholder membership shape: one identity → many roles.
 * Not persisted in this sprint (demo UI only).
 */
export type WorkspaceMembership = {
  role: WorkspaceRole;
  status: 'active' | 'invited' | 'suspended';
};

export function isSignupAccountType(
  value: string,
): value is SignupAccountType {
  return SIGNUP_ACCOUNT_TYPES.some((item) => item.value === value);
}

export function isWorkspaceRole(value: string): value is WorkspaceRole {
  return (Object.values(WORKSPACE_ROLES) as string[]).includes(value);
}
