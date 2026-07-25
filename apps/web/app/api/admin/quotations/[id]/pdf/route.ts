import { NextResponse } from 'next/server';

import { requireAdminUserApi } from '@/lib/auth/require-admin';
import { quotationPdfFilename } from '@/lib/quotations/pdf';
import {
  getAdminQuotationById,
  getAdminQuotationPdfBuffer,
  recordAdminQuotationPreview,
} from '@/lib/quotations/service';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  let actor;
  try {
    actor = await requireAdminUserApi();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNAUTHORIZED';
    const status = message === 'FORBIDDEN' ? 403 : 401;
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status });
  }

  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const preview = searchParams.get('preview') === '1';

  try {
    const quotation = await getAdminQuotationById(id);
    if (!quotation) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    if (preview) {
      await recordAdminQuotationPreview(id, actor);
    }

    const pdfBuffer = await getAdminQuotationPdfBuffer(id);
    const disposition = preview ? 'inline' : 'attachment';

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `${disposition}; filename="${quotationPdfFilename(quotation.quotationNumber)}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('[admin-quotations] pdf failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to generate PDF.' }, { status: 500 });
  }
}
