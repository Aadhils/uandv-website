'use client';

import { useRef, useState, type FormEvent } from 'react';

import {
  Button,
  Form,
  FormField,
  Input,
  Select,
  Text,
  Textarea,
} from '@uandv/ui';

import { getAllServices } from '@/lib/services';
import { siteConfig } from '@/lib/site';

type ServiceInquiryFormProps = {
  defaultServiceSlug?: string;
  compact?: boolean;
};

/**
 * Safe client-side inquiry: opens the visitor's email app (mailto).
 * Server-side form backend is not connected yet.
 */
export function ServiceInquiryForm({
  defaultServiceSlug,
  compact = false,
}: ServiceInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const sendingLock = useRef(false);
  const services = getAllServices();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingLock.current || isSending) return;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    sendingLock.current = true;
    setIsSending(true);

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const interest = String(data.get('interest') ?? '');
    const message = String(data.get('message') ?? '').trim();
    const interestLabel =
      services.find((service) => service.slug === interest)?.title ?? interest;

    const subject = encodeURIComponent(
      `U&V Service Inquiry – ${interestLabel}`,
    );
    const body = encodeURIComponent(
      [
        'Hello U&V team,',
        '',
        'I would like to inquire about your services.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '—'}`,
        `Service interest: ${interestLabel}`,
        '',
        'Message:',
        message,
        '',
        'Sent from the U&V website inquiry form.',
      ].join('\n'),
    );

    window.location.assign(
      `mailto:${siteConfig.email}?subject=${subject}&body=${body}`,
    );

    window.setTimeout(() => {
      setSubmitted(true);
      setIsSending(false);
      sendingLock.current = false;
    }, 350);
  };

  return (
    <div
      className={
        compact
          ? undefined
          : 'rounded-uv-2xl border border-uv-border bg-uv-background p-6 sm:p-8'
      }
    >
      <Text variant="caption" className="mb-6 block text-uv-foreground-muted">
        Your email app will open with the inquiry details. Messages are sent
        from your device to{' '}
        <span className="font-medium text-uv-foreground">{siteConfig.email}</span>
        — nothing is submitted to a U&amp;V server yet.
      </Text>

      {submitted ? (
        <div
          className="space-y-3 py-6 text-center"
          role="status"
          aria-live="polite"
        >
          <p className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
            Inquiry ready in your email app
          </p>
          <p className="text-sm text-uv-foreground-muted sm:text-base">
            Your email app should open with a prefilled message. Send it from
            there when you are ready. If it did not open, email{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-uv-brand underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>{' '}
            or{' '}
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-uv-brand underline-offset-4 hover:underline"
            >
              message us on WhatsApp
            </a>
            .
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => setSubmitted(false)}
          >
            Edit inquiry
          </Button>
        </div>
      ) : (
        <Form onSubmit={onSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField label="Name" required>
              <Input name="name" autoComplete="name" required />
            </FormField>
            <FormField label="Email" required>
              <Input name="email" type="email" autoComplete="email" required />
            </FormField>
          </div>
          <FormField label="Company">
            <Input name="company" autoComplete="organization" />
          </FormField>
          <FormField label="Service interest" required>
            <Select
              name="interest"
              defaultValue={defaultServiceSlug ?? services[0]?.slug}
              required
            >
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Message" required>
            <Textarea
              name="message"
              required
              placeholder="Tell us about your goals, timeline, and any constraints."
            />
          </FormField>
          <div className="space-y-2">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              isLoading={isSending}
              disabled={isSending}
              aria-label="Send inquiry via your email app"
            >
              {isSending ? 'Preparing…' : 'Send Inquiry'}
            </Button>
            <p className="text-xs text-uv-foreground-muted sm:text-sm">
              Your email app will open with the inquiry details.
            </p>
          </div>
        </Form>
      )}
    </div>
  );
}
