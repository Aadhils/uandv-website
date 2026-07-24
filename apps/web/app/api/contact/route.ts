import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import {
  buildConfirmationEmailHtml,
  buildEnquiryEmailHtml,
  getContactToEmails,
  getResendClient,
  getResendFromAddress,
  type ContactPayload,
} from '@/lib/contact-email';
import { prisma } from '@/lib/db';
import {
  checkEnquiryRateLimit,
  getClientIp,
} from '@/lib/enquiries/rate-limit';
import { generateEnquiryReference } from '@/lib/enquiries/reference';
import { enquiryPayloadSchema } from '@/lib/enquiries/schema';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const parsed = enquiryPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Please provide a valid name, email address, and message.',
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot — bots fill hidden fields; humans leave empty.
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({
      ok: true,
      reference: generateEnquiryReference(),
    });
  }

  const ip = getClientIp(request);
  const rate = checkEnquiryRateLimit(`enquiry:${ip}:${data.email.toLowerCase()}`);
  if (!rate.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Too many enquiries from this device. Please wait a few minutes and try again.',
      },
      {
        status: 429,
        headers: rate.retryAfterSec
          ? { 'Retry-After': String(rate.retryAfterSec) }
          : undefined,
      },
    );
  }

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Email service is not configured. Please try WhatsApp or email us directly.',
      },
      { status: 503 },
    );
  }

  let userId: string | undefined;
  try {
    const session = await auth();
    if (session.userId) {
      const dbUser = await prisma.user.findUnique({
        where: { clerkId: session.userId },
      });
      userId = dbUser?.id;
    }
  } catch {
    // Anonymous enquiry is fine if auth lookup fails.
  }

  const reference = generateEnquiryReference();
  const source =
    data.source?.trim() ||
    (data.sourcePage?.includes('/services') ? 'service-inquiry' : 'contact');

  const payload: ContactPayload = {
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    company: data.company || undefined,
    interest: data.interest || 'general',
    message: data.message,
    visitorType: data.visitorType || undefined,
    journey: data.journey || undefined,
    partnerType: data.partnerType || undefined,
    preferredLanguage: data.preferredLanguage || undefined,
    sourcePage: data.sourcePage || undefined,
    reference,
  };

  try {
    await prisma.enquiry.create({
      data: {
        reference,
        userId,
        name: payload.name,
        email: payload.email,
        mobile: payload.phone,
        company: payload.company,
        serviceInterest: payload.interest || 'general',
        message: payload.message,
        source,
        status: 'NEW',
      },
    });
  } catch (error) {
    console.error('[contact] enquiry persist failed', error);
    return NextResponse.json(
      {
        ok: false,
        error:
          'We could not save your enquiry right now. Please try again shortly.',
      },
      { status: 500 },
    );
  }

  const from = getResendFromAddress();
  const teamRecipients = getContactToEmails();

  try {
    const enquiry = await resend.emails.send({
      from,
      to: teamRecipients,
      replyTo: payload.email,
      subject: `[${reference}] New enquiry from ${payload.name}${
        payload.company ? ` — ${payload.company}` : ''
      }`,
      html: buildEnquiryEmailHtml(payload),
    });

    if (enquiry.error) {
      console.error('[contact] enquiry email failed', enquiry.error);
      return NextResponse.json(
        {
          ok: true,
          reference,
          warning:
            'Your enquiry was saved. Email delivery is temporarily unavailable — our team will still follow up.',
        },
        { status: 200 },
      );
    }

    const confirmation = await resend.emails.send({
      from,
      to: [payload.email],
      subject: `We received your enquiry ${reference} — ${siteConfig.name}`,
      html: buildConfirmationEmailHtml(payload),
    });

    if (confirmation.error) {
      console.error(
        '[contact] confirmation email failed',
        confirmation.error,
      );
    }

    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error('[contact] unexpected send failure', error);
    return NextResponse.json(
      {
        ok: true,
        reference,
        warning:
          'Your enquiry was saved. Email delivery is temporarily unavailable — our team will still follow up.',
      },
      { status: 200 },
    );
  }
}
