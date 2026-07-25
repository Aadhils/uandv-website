import { NextResponse } from 'next/server';

import { ensureDbUser } from '@/lib/auth/server-user';
import { acceptCustomerQuotation } from '@/lib/quotations/service';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  const user = await ensureDbUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const quotation = await acceptCustomerQuotation(id, user);
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
        { ok: false, error: 'This quotation can no longer be accepted.' },
        { status: 409 },
      );
    }
    return NextResponse.json({ ok: false, error: 'Unable to accept quotation.' }, { status: 500 });
  }
}
