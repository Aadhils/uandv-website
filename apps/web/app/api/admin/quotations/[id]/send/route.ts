import { NextResponse } from 'next/server';

import { requireAdminUserApi } from '@/lib/auth/require-admin';
import { sendQuotation } from '@/lib/quotations/service';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  let actor;
  try {
    actor = await requireAdminUserApi();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNAUTHORIZED';
    const status = message === 'FORBIDDEN' ? 403 : 401;
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status });
  }

  const { id } = await context.params;

  try {
    const quotation = await sendQuotation(id, actor);
    return NextResponse.json({ ok: true, quotation });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN';
    if (message === 'NOT_FOUND') {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    if (message === 'INVALID_STATUS') {
      return NextResponse.json(
        { ok: false, error: 'Only draft quotations can be sent.' },
        { status: 409 },
      );
    }
    console.error('[admin-quotations] send failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to send quotation.' }, { status: 500 });
  }
}
