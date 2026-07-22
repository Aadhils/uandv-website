'use client';

import { useState, type FormEvent } from 'react';

import {
  Button,
  Form,
  FormField,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { formatLocation, siteConfig } from '@/lib/site';
import { getAllServices } from '@/lib/services';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

/**
 * Safe client-side submission: opens the visitor's email app (mailto).
 * Server-side form backend is not connected yet.
 */
export function Contact() {
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

    const subject = encodeURIComponent(
      `U&V inquiry${company ? ` — ${company}` : ''}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '—'}`,
        `Interest: ${interest}`,
        '',
        message,
      ].join('\n'),
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-uv-background-subtle py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Tell us what you are building."
              description="Share your goals and we will recommend the right next step — planning, product, AI, or growth."
            />
            <dl className="mt-10 space-y-5 text-sm sm:text-base">
              <div className="flex gap-3">
                <Icon name="Mail" className="mt-0.5 text-uv-brand" />
                <div>
                  <dt className="font-medium text-uv-foreground">Email</dt>
                  <dd className="mt-1 text-uv-foreground-muted">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="MessageCircle" className="mt-0.5 text-uv-brand" />
                <div>
                  <dt className="font-medium text-uv-foreground">
                    WhatsApp Business Support
                  </dt>
                  <dd className="mt-1 text-uv-foreground-muted">
                    <a
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      Message our team on WhatsApp
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="MapPin" className="mt-0.5 text-uv-brand" />
                <div>
                  <dt className="font-medium text-uv-foreground">Location</dt>
                  <dd className="mt-1 text-uv-foreground-muted">
                    {formatLocation()}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="Linkedin" className="mt-0.5 text-uv-brand" />
                <div>
                  <dt className="font-medium text-uv-foreground">LinkedIn</dt>
                  <dd className="mt-1 text-uv-foreground-muted">
                    <a
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      U&V on LinkedIn
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: 'md' }),
                  'w-full justify-center sm:w-auto',
                )}
              >
                Chat on WhatsApp
              </a>
              <a
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'md', variant: 'outline' }),
                  'w-full justify-center sm:w-auto',
                )}
              >
                Book Consultation
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={100}>
            <div className="rounded-uv-2xl border border-uv-border bg-uv-background p-6 sm:p-8">
              <Text variant="caption" className="mb-6 block text-uv-foreground-muted">
                Form status: opens your email app to message{' '}
                <span className="font-medium text-uv-foreground">
                  {siteConfig.email}
                </span>
                . Server-side form backend is not connected yet.
              </Text>

              {submitted ? (
                <div className="space-y-3 py-8 text-center">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold text-uv-foreground">
                    Opening your email app
                  </p>
                  <p className="text-uv-foreground-muted">
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
                    className="mt-4"
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
                      <Input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                      />
                    </FormField>
                  </div>
                  <FormField label="Company">
                    <Input name="company" autoComplete="organization" />
                  </FormField>
                  <FormField label="I need help with">
                    <Select
                      name="interest"
                      defaultValue={services[0]?.slug ?? 'website-development'}
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
                      placeholder="Tell us about your business and what you want to achieve."
                    />
                  </FormField>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Continue in email app
                  </Button>
                </Form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
