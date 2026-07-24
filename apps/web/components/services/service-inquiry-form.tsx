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

type ServiceInquiryFormProps = {
  defaultServiceSlug?: string;
  compact?: boolean;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Service enquiry — posts to /api/contact (Resend + PostgreSQL).
 */
export function ServiceInquiryForm({
  defaultServiceSlug,
  compact = false,
}: ServiceInquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const sendingLock = useRef(false);
  const services = getAllServices();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingLock.current || status === 'submitting') return;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    sendingLock.current = true;
    setStatus('submitting');
    setErrorMessage(null);
    setReference(null);

    const data = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          company: String(data.get('company') ?? ''),
          interest: String(data.get('interest') ?? ''),
          message: String(data.get('message') ?? ''),
          source: 'service-inquiry',
          sourcePage:
            typeof window !== 'undefined' ? window.location.pathname : '/services',
          website: String(data.get('website') ?? ''),
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        reference?: string;
      } | null;

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(
          result?.error ??
            'We could not send your enquiry. Please try again shortly.',
        );
        return;
      }

      setReference(result?.reference ?? null);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      sendingLock.current = false;
    }
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
        Send a service enquiry directly to the U&amp;V team. You will receive a
        confirmation email and a reference ID.
      </Text>

      {status === 'success' ? (
        <div
          className="space-y-3 rounded-uv-xl border border-uv-brand/25 bg-uv-brand-muted/40 px-4 py-6 text-center"
          role="status"
        >
          <p className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Thank you. Your enquiry has been received.
            {reference ? (
              <>
                {' '}
                Reference: <span className="text-uv-brand">{reference}</span>
              </>
            ) : null}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setStatus('idle');
              setReference(null);
            }}
          >
            Send another enquiry
          </Button>
        </div>
      ) : (
        <Form onSubmit={onSubmit} className="relative">
          <div
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            aria-hidden
          >
            <label htmlFor="service-website">Website</label>
            <input
              id="service-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <FormField label="Name" required>
            <Input
              name="name"
              required
              autoComplete="name"
              disabled={status === 'submitting'}
            />
          </FormField>
          <FormField label="Email" required>
            <Input
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={status === 'submitting'}
            />
          </FormField>
          <FormField label="Company">
            <Input
              name="company"
              autoComplete="organization"
              disabled={status === 'submitting'}
            />
          </FormField>
          <FormField label="Service interest" required>
            <Select
              name="interest"
              required
              defaultValue={defaultServiceSlug || services[0]?.slug}
              disabled={status === 'submitting'}
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
              rows={4}
              disabled={status === 'submitting'}
            />
          </FormField>

          {status === 'error' && errorMessage ? (
            <p className="text-sm text-uv-error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
          </Button>
        </Form>
      )}
    </div>
  );
}
