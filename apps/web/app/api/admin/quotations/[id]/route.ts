import { NextResponse } from 'next/server';

import { requireAdminUserApi } from '@/lib/auth/require-admin';
import {
  getAdminQuotationById,
  updateQuotation,
} from '@/lib/quotations/service';
import { quotationUpsertSchema } from '@/lib/quotations/schema';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : 'UNKNOWN';
  if (message === 'UNAUTHORIZED') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  if (message === 'FORBIDDEN') {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({ ok: false, error: 'Request failed' }, { status: 500 });
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    await requireAdminUserApi();
  } catch (error) {
    return errorResponse(error);
  }

  const { id } = await context.params;
  const quotation = await getAdminQuotationById(id);
  if (!quotation) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, quotation });
}

export async function PATCH(request: Request, context: RouteContext) {
  let actor;
  try {
    actor = await requireAdminUserApi();
  } catch (error) {
    return errorResponse(error);
  }

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = quotationUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const quotation = await updateQuotation(id, parsed.data, actor);
    return NextResponse.json({ ok: true, quotation });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN';
    if (message === 'NOT_FOUND') {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    if (message === 'NOT_EDITABLE') {
      return NextResponse.json(
        { ok: false, error: 'Only draft quotations can be edited.' },
        { status: 409 },
      );
    }
    console.error('[admin-quotations] update failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to update quotation.' }, { status: 500 });
  }
}
