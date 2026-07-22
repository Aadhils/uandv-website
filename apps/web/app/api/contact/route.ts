import { NextResponse } from 'next/server';

import {
  buildConfirmationEmailHtml,
  buildEnquiryEmailHtml,
  getResendClient,
  getResendFromAddress,
  isValidEmail,
  type ContactPayload,
} from '@/lib/contact-email';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const data = body as Record<string, unknown>;
  const name = readString(data.name);
  const email = readString(data.email);
  const message = readString(data.message);

  if (!name || !email || !message || !isValidEmail(email)) {
    return null;
  }

  return {
    name,
    email,
    phone: readString(data.phone) || undefined,
    company: readString(data.company) || undefined,
    interest: readString(data.interest) || undefined,
    message,
  };
}

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const payload = parsePayload(json);
  if (!payload) {
    return NextResponse.json(
      {
        error:
          'Please provide a valid name, email address, and message.',
      },
      { status: 400 },
    );
  }

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      {
        error:
          'Email service is not configured. Please try WhatsApp or email us directly.',
      },
      { status: 503 },
    );
  }

  const from = getResendFromAddress();
  const teamRecipients = [siteConfig.email, siteConfig.emailSecondary];

  try {
    const enquiry = await resend.emails.send({
      from,
      to: teamRecipients,
      replyTo: payload.email,
      subject: `New enquiry from ${payload.name}${payload.company ? ` — ${payload.company}` : ''}`,
      html: buildEnquiryEmailHtml(payload),
    });

    if (enquiry.error) {
      console.error('[contact] enquiry email failed', enquiry.error);
      return NextResponse.json(
        {
          error:
            'We could not send your enquiry right now. Please try again or contact us on WhatsApp.',
        },
        { status: 502 },
      );
    }

    const confirmation = await resend.emails.send({
      from,
      to: [payload.email],
      subject: `We received your enquiry — ${siteConfig.name}`,
      html: buildConfirmationEmailHtml(payload),
    });

    if (confirmation.error) {
      console.error(
        '[contact] confirmation email failed',
        confirmation.error,
      );
      // Enquiry already reached the team — treat as success for the visitor.
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] unexpected send failure', error);
    return NextResponse.json(
      {
        error:
          'Something went wrong while sending your enquiry. Please try again shortly.',
      },
      { status: 500 },
    );
  }
}
