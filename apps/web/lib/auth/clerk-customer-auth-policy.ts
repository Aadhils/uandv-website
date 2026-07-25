import { clerkClient, type User } from '@clerk/nextjs/server';

import { mapClerkRole } from '@/lib/auth/clerk-role';
import { isAdminRole } from '@/lib/auth/db-roles';
import { logAuthEvent } from '@/lib/auth/clerk-sign-in';

async function getClerk() {
  return clerkClient();
}

function isClerkAdminUser(
  publicMetadata?: Record<string, unknown> | null,
): boolean {
  const role = mapClerkRole(publicMetadata);
  return role ? isAdminRole(role) : false;
}

async function verifyPrimaryEmail(user: User): Promise<void> {
  const emailId = user.primaryEmailAddressId;
  if (!emailId) return;

  const email = user.emailAddresses.find((item) => item.id === emailId);
  if (!email || email.verification?.status === 'verified') {
    return;
  }

  const client = await getClerk();
  await client.emailAddresses.updateEmailAddress(emailId, {
    verified: true,
  });
}

async function disableCustomerMfa(clerkUserId: string): Promise<void> {
  const client = await getClerk();

  try {
    await client.users.disableUserMFA(clerkUserId);
  } catch {
    // User may not have MFA enrolled.
  }

  try {
    await client.users.deleteUserTOTP(clerkUserId);
  } catch {
    // No TOTP to remove.
  }
}

export type CustomerAuthPolicyResult = {
  applied: boolean;
  reason?: 'admin_user' | 'user_not_found';
};

/**
 * Ensures customer accounts can sign in with email + password only (Sprint 3.3).
 * Skips admin users so admin authentication is unchanged.
 */
export async function applyCustomerPasswordOnlyPolicy(
  clerkUserId: string,
  options?: { publicMetadata?: Record<string, unknown> | null },
): Promise<CustomerAuthPolicyResult> {
  const client = await getClerk();
  const metadata =
    options?.publicMetadata ??
    (await client.users.getUser(clerkUserId)).publicMetadata;

  if (isClerkAdminUser(metadata as Record<string, unknown>)) {
    logAuthEvent('customer-policy:skipped', { reason: 'admin_user' });
    return { applied: false, reason: 'admin_user' };
  }

  const user = await client.users.getUser(clerkUserId);
  await verifyPrimaryEmail(user);
  await disableCustomerMfa(clerkUserId);

  logAuthEvent('customer-policy:applied', { clerkUserId });
  return { applied: true };
}

export async function findClerkUserIdByIdentifier(
  identifier: string,
): Promise<string | null> {
  const trimmed = identifier.trim();
  if (!trimmed) return null;

  const client = await getClerk();

  if (trimmed.includes('@')) {
    const byEmail = await client.users.getUserList({
      emailAddress: [trimmed],
      limit: 1,
    });
    return byEmail.data[0]?.id ?? null;
  }

  const byUsername = await client.users.getUserList({
    username: [trimmed],
    limit: 1,
  });
  if (byUsername.data[0]?.id) {
    return byUsername.data[0].id;
  }

  const byPhone = await client.users.getUserList({
    phoneNumber: [trimmed],
    limit: 1,
  });
  return byPhone.data[0]?.id ?? null;
}

export async function applyCustomerPasswordOnlyPolicyByIdentifier(
  identifier: string,
): Promise<CustomerAuthPolicyResult> {
  const clerkUserId = await findClerkUserIdByIdentifier(identifier);
  if (!clerkUserId) {
    return { applied: false, reason: 'user_not_found' };
  }
  return applyCustomerPasswordOnlyPolicy(clerkUserId);
}
