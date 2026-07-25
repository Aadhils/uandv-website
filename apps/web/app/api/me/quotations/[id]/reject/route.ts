import { NextResponse } from 'next/server';

import { ensureDbUser } from '@/lib/auth/server-user';
import { rejectCustomerQuotation } from '@/lib/quotations/service';
import { customerRejectSchema } from '@/lib/quotations/schema';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const user = await ensureDbUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = customerRejectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const quotation = await rejectCustomerQuotation(id, user, parsed.data.reason);
    return NextResponse.json({ ok: true, quotation });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN';
    if (message === 'NOT_FOUND') {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    if (message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
    }
    if (message === 'INVALID_STATUS' || message === 'EXPIRED') {
      return NextResponse.json(
        { ok: false, error: 'This quotation can no longer be rejected.' },
        { status: 409 },
      );
    }
    return NextResponse.json({ ok: false, error: 'Unable to reject quotation.' }, { status: 500 });
  }
}
