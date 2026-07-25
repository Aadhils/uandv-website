import { NextResponse } from 'next/server';

import { requireAdminUserApi } from '@/lib/auth/require-admin';
import {
  createQuotation,
  getAdminQuotationStats,
  listAdminQuotations,
} from '@/lib/quotations/service';
import {
  adminQuotationListQuerySchema,
  quotationUpsertSchema,
} from '@/lib/quotations/schema';

export const runtime = 'nodejs';

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

export async function GET(request: Request) {
  try {
    await requireAdminUserApi();
  } catch (error) {
    return errorResponse(error);
  }

  const { searchParams } = new URL(request.url);
  const parsed = adminQuotationListQuerySchema.safeParse({
    q: searchParams.get('q') ?? undefined,
    status: searchParams.get('status') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Invalid query parameters.' },
      { status: 400 },
    );
  }

  const [quotations, stats] = await Promise.all([
    listAdminQuotations(parsed.data),
    getAdminQuotationStats(),
  ]);

  return NextResponse.json({ ok: true, quotations, stats });
}

export async function POST(request: Request) {
  let actor;
  try {
    actor = await requireAdminUserApi();
  } catch (error) {
    return errorResponse(error);
  }

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
    const quotation = await createQuotation(parsed.data, actor);
    return NextResponse.json({ ok: true, quotation }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN';
    if (message.includes('QuotationCalculationError')) {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
    console.error('[admin-quotations] create failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to create quotation.' }, { status: 500 });
  }
}
