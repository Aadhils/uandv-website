/**
 * Shared identity + role-based access — one auth engine for all workspaces.
 *
 * Architecture:
 * - Customer, Admin, Employee, and Vendor share one identity system.
 * - Do NOT create separate credential databases per role.
 * - Dedicated login entry routes may exist; session resolves to a workspace home by membership.
 * - Demo / frontend only — no real authentication, APIs, or production permissions.
 */

import {
  WORKSPACE_ROLES,
  type WorkspaceMembership,
  type WorkspaceRole,
} from './roles';

/** Stable identity used across Customer, Admin, Employee, and Vendor workspaces. */
export type SharedIdentity = {
  userId: string;
  displayName: string;
  email: string;
  memberships: WorkspaceMembership[];
};

/** Soft demo session — never stores credentials. */
export type DemoWorkspaceSession = {
  userId: string;
  activeRole: WorkspaceRole;
};

export const WORKSPACE_HOME: Record<WorkspaceRole, string> = {
  [WORKSPACE_ROLES.CUSTOMER]: '/dashboard',
  [WORKSPACE_ROLES.VENDOR]: '/vendor',
  [WORKSPACE_ROLES.PARTNER]: '/dashboard',
  [WORKSPACE_ROLES.EMPLOYEE]: '/employee',
  [WORKSPACE_ROLES.ADMIN]: '/admin',
};

/** Capability keys used for role-aware UI gating (demo only). */
export const CAPABILITIES = {
  VIEW_ALL_LEADS: 'view_all_leads',
  VIEW_ASSIGNED_LEADS: 'view_assigned_leads',
  VIEW_ALL_CUSTOMERS: 'view_all_customers',
  VIEW_ASSIGNED_CUSTOMERS: 'view_assigned_customers',
  MANAGE_EMPLOYEES: 'manage_employees',
  ASSIGN_LEADS: 'assign_leads',
  REASSIGN_OWNERSHIP: 'reassign_ownership',
  SET_FOLLOW_UP: 'set_follow_up',
  REVIEW_FOLLOW_UP_HISTORY: 'review_follow_up_history',
  MONITOR_OVERDUE: 'monitor_overdue',
  VIEW_CRM_REPORTS: 'view_crm_reports',
  CONTROL_EMPLOYEE_PERMISSIONS: 'control_employee_permissions',
  UPDATE_COMMUNICATIONS: 'update_communications',
  UPDATE_LEAD_STATUS: 'update_lead_status',
  SUBMIT_WORK_UPDATES: 'submit_work_updates',
  PAYMENT_CONTROLS: 'payment_controls',
  ADMIN_SETTINGS: 'admin_settings',
  VIEW_ASSIGNED_VENDOR_WORK: 'view_assigned_vendor_work',
  SUBMIT_VENDOR_DELIVERABLES: 'submit_vendor_deliverables',
  RAISE_VENDOR_INVOICES: 'raise_vendor_invoices',
  VIEW_VENDOR_PAYMENTS: 'view_vendor_payments',
  VIEW_LIMITED_PROJECT_CONTEXT: 'view_limited_project_context',
} as const;

export type Capability =
  (typeof CAPABILITIES)[keyof typeof CAPABILITIES];

const ADMIN_CAPABILITIES: Capability[] = [
  CAPABILITIES.VIEW_ALL_LEADS,
  CAPABILITIES.VIEW_ALL_CUSTOMERS,
  CAPABILITIES.MANAGE_EMPLOYEES,
  CAPABILITIES.ASSIGN_LEADS,
  CAPABILITIES.REASSIGN_OWNERSHIP,
  CAPABILITIES.SET_FOLLOW_UP,
  CAPABILITIES.REVIEW_FOLLOW_UP_HISTORY,
  CAPABILITIES.MONITOR_OVERDUE,
  CAPABILITIES.VIEW_CRM_REPORTS,
  CAPABILITIES.CONTROL_EMPLOYEE_PERMISSIONS,
  CAPABILITIES.UPDATE_COMMUNICATIONS,
  CAPABILITIES.UPDATE_LEAD_STATUS,
  CAPABILITIES.SUBMIT_WORK_UPDATES,
  CAPABILITIES.PAYMENT_CONTROLS,
  CAPABILITIES.ADMIN_SETTINGS,
];

/** Default employee capability set — scoped, never global admin ops. */
export const DEFAULT_EMPLOYEE_CAPABILITIES: Capability[] = [
  CAPABILITIES.VIEW_ASSIGNED_LEADS,
  CAPABILITIES.VIEW_ASSIGNED_CUSTOMERS,
  CAPABILITIES.UPDATE_COMMUNICATIONS,
  CAPABILITIES.SET_FOLLOW_UP,
  CAPABILITIES.UPDATE_LEAD_STATUS,
  CAPABILITIES.SUBMIT_WORK_UPDATES,
];

/** Default vendor capability set — assigned vendor work only. */
export const DEFAULT_VENDOR_CAPABILITIES: Capability[] = [
  CAPABILITIES.VIEW_ASSIGNED_VENDOR_WORK,
  CAPABILITIES.SUBMIT_VENDOR_DELIVERABLES,
  CAPABILITIES.RAISE_VENDOR_INVOICES,
  CAPABILITIES.VIEW_VENDOR_PAYMENTS,
  CAPABILITIES.VIEW_LIMITED_PROJECT_CONTEXT,
];

/** Capabilities employees must never receive (even if misconfigured in demo UI). */
export const EMPLOYEE_FORBIDDEN_CAPABILITIES: Capability[] = [
  CAPABILITIES.VIEW_ALL_LEADS,
  CAPABILITIES.VIEW_ALL_CUSTOMERS,
  CAPABILITIES.MANAGE_EMPLOYEES,
  CAPABILITIES.VIEW_CRM_REPORTS,
  CAPABILITIES.PAYMENT_CONTROLS,
  CAPABILITIES.ADMIN_SETTINGS,
  CAPABILITIES.CONTROL_EMPLOYEE_PERMISSIONS,
];

/** Capabilities vendors must never receive. */
export const VENDOR_FORBIDDEN_CAPABILITIES: Capability[] = [
  CAPABILITIES.VIEW_ALL_LEADS,
  CAPABILITIES.VIEW_ASSIGNED_LEADS,
  CAPABILITIES.VIEW_ALL_CUSTOMERS,
  CAPABILITIES.VIEW_ASSIGNED_CUSTOMERS,
  CAPABILITIES.MANAGE_EMPLOYEES,
  CAPABILITIES.VIEW_CRM_REPORTS,
  CAPABILITIES.PAYMENT_CONTROLS,
  CAPABILITIES.ADMIN_SETTINGS,
  CAPABILITIES.CONTROL_EMPLOYEE_PERMISSIONS,
  CAPABILITIES.ASSIGN_LEADS,
  CAPABILITIES.REASSIGN_OWNERSHIP,
];

export function capabilitiesForRole(role: WorkspaceRole): Capability[] {
  if (role === WORKSPACE_ROLES.ADMIN) return [...ADMIN_CAPABILITIES];
  if (role === WORKSPACE_ROLES.EMPLOYEE) return [...DEFAULT_EMPLOYEE_CAPABILITIES];
  if (role === WORKSPACE_ROLES.VENDOR) return [...DEFAULT_VENDOR_CAPABILITIES];
  return [];
}

export function roleHasCapability(
  role: WorkspaceRole,
  capability: Capability,
): boolean {
  if (
    role === WORKSPACE_ROLES.EMPLOYEE &&
    EMPLOYEE_FORBIDDEN_CAPABILITIES.includes(capability)
  ) {
    return false;
  }
  if (
    role === WORKSPACE_ROLES.VENDOR &&
    VENDOR_FORBIDDEN_CAPABILITIES.includes(capability)
  ) {
    return false;
  }
  return capabilitiesForRole(role).includes(capability);
}

export function workspaceHomeForRole(role: WorkspaceRole): string {
  return WORKSPACE_HOME[role];
}

/** Demo identities — one shared user table concept, multiple memberships. */
export const demoIdentities: SharedIdentity[] = [
  {
    userId: 'user-admin-arun',
    displayName: 'Arun Kumar',
    email: 'arun.admin@demo.uandv.local',
    memberships: [
      { role: WORKSPACE_ROLES.ADMIN, status: 'active' },
      { role: WORKSPACE_ROLES.EMPLOYEE, status: 'active' },
    ],
  },
  {
    userId: 'user-emp-divya',
    displayName: 'Divya P.',
    email: 'divya.sales@demo.uandv.local',
    memberships: [{ role: WORKSPACE_ROLES.EMPLOYEE, status: 'active' }],
  },
  {
    userId: 'user-emp-meena',
    displayName: 'Meena R.',
    email: 'meena.consult@demo.uandv.local',
    memberships: [{ role: WORKSPACE_ROLES.EMPLOYEE, status: 'active' }],
  },
  {
    userId: 'user-customer-priya',
    displayName: 'Priya Sharma',
    email: 'priya.sharma@demo.uandv.local',
    memberships: [{ role: WORKSPACE_ROLES.CUSTOMER, status: 'active' }],
  },
  {
    userId: 'user-vendor-karthik',
    displayName: 'Karthik Design Studio',
    email: 'karthik@demo.vendor.uandv.local',
    memberships: [{ role: WORKSPACE_ROLES.VENDOR, status: 'active' }],
  },
];

export const DEMO_ADMIN_IDENTITY = demoIdentities[0];
export const DEMO_EMPLOYEE_IDENTITY = demoIdentities[1];
export const DEMO_CUSTOMER_IDENTITY = demoIdentities[3];
export const DEMO_VENDOR_IDENTITY = demoIdentities[4];
