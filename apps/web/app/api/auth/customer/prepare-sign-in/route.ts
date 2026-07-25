import { NextResponse } from 'next/server';

import { applyCustomerPasswordOnlyPolicyByIdentifier } from '@/lib/auth/clerk-customer-auth-policy';
import { logAuthEvent } from '@/lib/auth/clerk-sign-in';

export const runtime = 'nodejs';

type PrepareSignInBody = {
  identifier?: string;
};

/**
 * Customer sign-in helper — verify email + disable MFA so password-only login works.
 * Admin accounts are never modified.
 */
export async function POST(request: Request) {
  let body: PrepareSignInBody;
  try {
    body = (await request.json()) as PrepareSignInBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const identifier = body.identifier?.trim();
  if (!identifier) {
    return NextResponse.json({ error: 'Identifier is required.' }, { status: 400 });
  }

  try {
    const result = await applyCustomerPasswordOnlyPolicyByIdentifier(identifier);
    logAuthEvent('customer-prepare-sign-in', {
      applied: result.applied,
      reason: result.reason ?? null,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('[uv-auth] customer prepare-sign-in failed', error);
    return NextResponse.json(
      { error: 'Unable to prepare customer sign-in.' },
      { status: 500 },
    );
  }
}
