'use client';

import { useState, type FormEvent } from 'react';

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
  const services = getAllServices();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const company = String(data.get('company') ?? '');
    const interest = String(data.get('interest') ?? '');
    const message = String(data.get('message') ?? '');
    const interestLabel =
      services.find((service) => service.slug === interest)?.title ?? interest;

    const subject = encodeURIComponent(
      `U&V service inquiry — ${interestLabel}${company ? ` (${company})` : ''}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '—'}`,
        `Service: ${interestLabel}`,
        '',
        message,
      ].join('\n'),
    );

    window.location.assign(
      `mailto:${siteConfig.email}?subject=${subject}&body=${body}`,
    );
    setSubmitted(true);
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
        Form status: opens your email app to message{' '}
        <span className="font-medium text-uv-foreground">{siteConfig.email}</span>
        . Server-side form backend is not connected yet.
      </Text>

      {submitted ? (
        <div className="space-y-3 py-6 text-center">
          <p className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
            Opening your email app
          </p>
          <p className="text-sm text-uv-foreground-muted sm:text-base">
            If it did not open, email{' '}
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
            Edit message
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
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Continue in email app
          </Button>
        </Form>
      )}
    </div>
  );
}
