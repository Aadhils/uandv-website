'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import { Button, Form, FormField } from '@uandv/ui';

import { OtpInput } from '@/components/auth/otp-input';
import {
  hasFieldErrors,
  setDemoAuthPreview,
  validateVerifyEmail,
  type FieldErrors,
} from '@/lib/auth';

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') ?? '';

  const [code, setCode] = React.useState('');
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [resent, setResent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateVerifyEmail({ code });
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) return;

    // Demo only — any 6-digit code continues to the dashboard foundation.
    setSubmitting(true);
    setDemoAuthPreview(true);
    window.setTimeout(() => {
      router.push('/dashboard');
    }, 200);
  };

  const onResend = () => {
    setResent(true);
    setErrors({});
  };

  return (
    <Form spacing="md" onSubmit={onSubmit} noValidate>
      {emailParam ? (
        <p className="text-sm text-uv-foreground-muted">
          Enter the demo code sent to{' '}
          <span className="font-medium text-uv-foreground">{emailParam}</span>.
          No real email is delivered in this sprint.
        </p>
      ) : (
        <p className="text-sm text-uv-foreground-muted">
          Enter a 6-digit demo verification code. No OTP service is connected
          yet.
        </p>
      )}

      <FormField
        label="Verification code"
        htmlFor="verify-code-0"
        required
        error={errors.code}
      >
        <OtpInput
          id="verify-code-0"
          value={code}
          onChange={setCode}
          error={Boolean(errors.code)}
          aria-invalid={errors.code ? true : undefined}
        />
      </FormField>

      <Button type="submit" fullWidth isLoading={submitting}>
        Continue to dashboard
      </Button>

      <div className="flex flex-col gap-2 text-center text-sm">
        <button
          type="button"
          onClick={onResend}
          className="font-medium text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
        >
          Resend code
        </button>
        {resent ? (
          <p className="text-xs text-uv-foreground-subtle" role="status">
            Demo placeholder — no code was resent.
          </p>
        ) : null}
        <Link
          href="/signup"
          className="text-uv-foreground-muted underline-offset-4 hover:underline"
        >
          Change email
        </Link>
      </div>
    </Form>
  );
}
