'use client';

import Link from 'next/link';
import * as React from 'react';

import { Button, Form, FormField, Input } from '@uandv/ui';

import {
  hasFieldErrors,
  validateForgotPassword,
  type FieldErrors,
} from '@/lib/auth';

export function ForgotPasswordForm() {
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [identifier, setIdentifier] = React.useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = String(data.get('identifier') ?? '');

    const nextErrors = validateForgotPassword({ identifier: value });
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) {
      setSubmitted(false);
      return;
    }

    setIdentifier(value.trim());
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-4" role="status" aria-live="polite">
        <p className="text-sm leading-relaxed text-uv-foreground">
          If an account exists for{' '}
          <span className="font-medium">{identifier}</span>, recovery
          instructions would be sent. This is a{' '}
          <span className="font-medium">demo placeholder</span> — no email or
          SMS is sent yet.
        </p>
        <Link
          href="/login"
          className="inline-flex text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <Form spacing="md" onSubmit={onSubmit} noValidate>
      <FormField
        label="Email or mobile number"
        htmlFor="forgot-identifier"
        required
        hint="We’ll show recovery instructions here. No message is sent in this demo."
        error={errors.identifier}
      >
        <Input
          name="identifier"
          id="forgot-identifier"
          type="text"
          autoComplete="username"
          placeholder="you@example.com or mobile"
        />
      </FormField>

      <Button type="submit" fullWidth>
        Send recovery instructions
      </Button>

      <p className="text-center text-sm text-uv-foreground-muted">
        <Link
          href="/login"
          className="font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      </p>
    </Form>
  );
}
