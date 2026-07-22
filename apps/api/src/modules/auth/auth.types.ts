import { UserRole } from '@uandv/database';

export interface ClerkUserData {
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
}

export interface ClerkWebhookUserPayload {
  id: string;
  email_addresses: Array<{ email_address: string; id: string }>;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  public_metadata?: Record<string, unknown>;
}

export function mapClerkRole(metadata?: Record<string, unknown>): UserRole {
  const role = metadata?.role;
  if (typeof role === 'string' && role in UserRole) {
    return role as UserRole;
  }
  return UserRole.USER;
}

export function extractPrimaryEmail(
  payload: ClerkWebhookUserPayload,
): string | null {
  return payload.email_addresses[0]?.email_address ?? null;
}
