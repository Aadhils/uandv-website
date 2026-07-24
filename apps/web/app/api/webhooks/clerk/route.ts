import type { AccountType } from '@uandv/database';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

type ClerkEmail = { email_address: string; id: string };
type ClerkWebhookUser = {
  id: string;
  email_addresses?: ClerkEmail[];
  primary_email_address_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  image_url?: string | null;
  unsafe_metadata?: Record<string, unknown>;
  public_metadata?: Record<string, unknown>;
};

function extractEmail(data: ClerkWebhookUser): string | null {
  const emails = data.email_addresses ?? [];
  const primary = emails.find((e) => e.id === data.primary_email_address_id);
  return primary?.email_address || emails[0]?.email_address || null;
}

function parseAccountType(value: unknown): AccountType {
  if (typeof value !== 'string') return 'CUSTOMER';
  const normalized = value.trim().toUpperCase();
  if (normalized === 'VENDOR' || normalized === 'PARTNER' || normalized === 'CUSTOMER') {
    return normalized;
  }
  return 'CUSTOMER';
}

export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Webhook secret is not configured.' },
      { status: 503 },
    );
  }

  const payload = await request.text();
  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing Svix headers.' }, { status: 400 });
  }

  let event: { type: string; data: ClerkWebhookUser };

  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as typeof event;
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'user.created':
      case 'user.updated': {
        const email = extractEmail(event.data);
        if (!email) break;

        const firstName = event.data.first_name ?? undefined;
        const lastName = event.data.last_name ?? undefined;
        const fullName =
          [firstName, lastName].filter(Boolean).join(' ').trim() || undefined;
        const accountType = parseAccountType(
          event.data.unsafe_metadata?.accountType ??
            event.data.public_metadata?.accountType,
        );

        const user = await prisma.user.upsert({
          where: { clerkId: event.data.id },
          create: {
            clerkId: event.data.id,
            email,
            firstName,
            lastName,
            fullName,
            avatarUrl: event.data.image_url ?? undefined,
            accountType,
            customerProfile:
              accountType === 'CUSTOMER' ? { create: {} } : undefined,
          },
          update: {
            email,
            firstName,
            lastName,
            fullName,
            avatarUrl: event.data.image_url ?? undefined,
            // accountType is set only on create — never trust later client metadata changes
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

        await prisma.authAuditLog.create({
          data: {
            userId: user.id,
            clerkId: user.clerkId,
            action: event.type,
            metadata: { source: 'web-clerk-webhook' },
          },
        });
        break;
      }
      case 'user.deleted': {
        const existing = await prisma.user.findUnique({
          where: { clerkId: event.data.id },
        });
        if (existing) {
          await prisma.user.update({
            where: { clerkId: event.data.id },
            data: { deletedAt: new Date() },
          });
          await prisma.authAuditLog.create({
            data: {
              userId: existing.id,
              clerkId: event.data.id,
              action: event.type,
              metadata: { source: 'web-clerk-webhook' },
            },
          });
        }
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error('[clerk-webhook] sync failed', error);
    return NextResponse.json({ error: 'Sync failed.' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
