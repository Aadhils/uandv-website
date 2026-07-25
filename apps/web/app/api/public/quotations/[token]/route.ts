import { NextResponse } from 'next/server';

import { customerRejectSchema } from '@/lib/quotations/schema';
import {
  acceptPublicQuotation,
  getPublicQuotationByToken,
  recordPublicQuotationView,
  rejectPublicQuotation,
} from '@/lib/quotations/service';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ token: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { token } = await context.params;

  try {
    const quotation = await getPublicQuotationByToken(token);
    if (!quotation) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, quotation });
  } catch (error) {
    console.error('[public-quotations] get failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to load quotation.' }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;

  try {
    const body = (await request.json()) as { action?: string; reason?: string };
    const action = body.action;

    if (action === 'view') {
      const result = await recordPublicQuotationView(token);
      return NextResponse.json({ ok: true, ...result });
    }

    if (action === 'accept') {
      const quotation = await acceptPublicQuotation(token);
      return NextResponse.json({ ok: true, quotation });
    }

    if (action === 'reject') {
      const parsed = customerRejectSchema.safeParse({ reason: body.reason });
      if (!parsed.success) {
        return NextResponse.json(
          { ok: false, error: 'A rejection reason is required.' },
          { status: 400 },
        );
      }
      const quotation = await rejectPublicQuotation(token, parsed.data.reason);
      return NextResponse.json({ ok: true, quotation });
    }

    return NextResponse.json({ ok: false, error: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN';
    if (message === 'NOT_FOUND') {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    if (message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
    }
    if (message === 'EXPIRED') {
      return NextResponse.json({ ok: false, error: 'This quotation has expired.' }, { status: 410 });
    }
    if (message === 'INVALID_STATUS') {
      return NextResponse.json(
        { ok: false, error: 'This quotation can no longer be updated.' },
        { status: 409 },
      );
    }
    console.error('[public-quotations] action failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to process request.' }, { status: 500 });
  }
}
