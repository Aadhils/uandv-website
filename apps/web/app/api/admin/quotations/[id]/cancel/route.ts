import { NextResponse } from 'next/server';

import { requireAdminUserApi } from '@/lib/auth/require-admin';
import { cancelQuotation } from '@/lib/quotations/service';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  let actor;
  try {
    actor = await requireAdminUserApi();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNAUTHORIZED';
    const status = message === 'FORBIDDEN' ? 403 : 401;
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status });
  }

  const { id } = await context.params;
  let note: string | undefined;
  try {
    const body = (await request.json()) as { note?: string };
    note = body.note;
  } catch {
    note = undefined;
  }

  try {
    const quotation = await cancelQuotation(id, actor, note);
    return NextResponse.json({ ok: true, quotation });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN';
    if (message === 'NOT_FOUND') {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    if (message === 'INVALID_STATUS') {
      return NextResponse.json(
        { ok: false, error: 'This quotation cannot be cancelled.' },
        { status: 409 },
      );
    }
    console.error('[admin-quotations] cancel failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to cancel quotation.' }, { status: 500 });
  }
}
