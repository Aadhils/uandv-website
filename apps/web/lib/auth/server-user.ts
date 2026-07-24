import { auth, currentUser } from '@clerk/nextjs/server';
import type { AccountType, User } from '@uandv/database';

import { prisma } from '@/lib/db';

function displayName(input: {
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}) {
  if (input.fullName?.trim()) return input.fullName.trim();
  const joined = [input.firstName, input.lastName].filter(Boolean).join(' ').trim();
  if (joined) return joined;
  return input.email.split('@')[0] || 'Customer';
}

function parseAccountType(value: unknown): AccountType {
  if (typeof value !== 'string') return 'CUSTOMER';
  const normalized = value.trim().toUpperCase();
  if (normalized === 'VENDOR' || normalized === 'PARTNER' || normalized === 'CUSTOMER') {
    return normalized;
  }
  return 'CUSTOMER';
}

/**
 * Upsert the authenticated Clerk user into PostgreSQL.
 * Temporary fallback when webhooks are delayed; webhook remains preferred.
 */
export async function ensureDbUser(): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ||
    clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const firstName = clerkUser.firstName;
  const lastName = clerkUser.lastName;
  const fullName =
    clerkUser.fullName ||
    [firstName, lastName].filter(Boolean).join(' ').trim() ||
    null;
  const mobile =
    clerkUser.primaryPhoneNumber?.phoneNumber ||
    clerkUser.phoneNumbers[0]?.phoneNumber ||
    null;
  const accountType = parseAccountType(
    clerkUser.unsafeMetadata?.accountType ??
      clerkUser.publicMetadata?.accountType,
  );

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    create: {
      clerkId: userId,
      email,
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      fullName: fullName ?? undefined,
      mobile: mobile ?? undefined,
      avatarUrl: clerkUser.imageUrl ?? undefined,
      accountType,
      customerProfile:
        accountType === 'CUSTOMER'
          ? {
              create: {},
            }
          : undefined,
    },
    update: {
      email,
      firstName: firstName ?? undefined,
      lastName: lastName ?? undefined,
      fullName: fullName ?? undefined,
      mobile: mobile ?? undefined,
      avatarUrl: clerkUser.imageUrl ?? undefined,
      // Do not overwrite accountType from client on every visit after create
      deletedAt: null,
    },
  });

  if (user.accountType === 'CUSTOMER') {
    await prisma.customerProfile.upsert({
      where: { userId: user.id },
      create: { userId: user.id },
      update: {},
    });
  }

  return user;
}

export async function requireDbUser(): Promise<User> {
  const user = await ensureDbUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

export { displayName, parseAccountType };
