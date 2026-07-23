'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import {
  Button,
  Form,
  FormField,
  Input,
} from '@uandv/ui';

import { AccountTypeSelector } from '@/components/auth/account-type-selector';
import { PasswordField } from '@/components/auth/password-field';
import {
  hasFieldErrors,
  toSignupDemoPayload,
  validateSignup,
  type FieldErrors,
  type SignupAccountType,
} from '@/lib/auth';

export function SignupForm() {
  const router = useRouter();
  const [accountType, setAccountType] = React.useState<SignupAccountType | ''>(
    '',
  );
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const input = {
      fullName: String(data.get('fullName') ?? ''),
      email: String(data.get('email') ?? ''),
      mobile: String(data.get('mobile') ?? ''),
      password: String(data.get('password') ?? ''),
      confirmPassword: String(data.get('confirmPassword') ?? ''),
      accountType,
      acceptTerms,
    };

    const nextErrors = validateSignup(input);
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) return;

    // Demo only — never log or persist passwords.
    const safePayload = toSignupDemoPayload(input);
    setSubmitting(true);

    const params = new URLSearchParams({
      email: safePayload.email,
      from: 'signup',
    });

    window.setTimeout(() => {
      router.push(`/verify-email?${params.toString()}`);
    }, 200);
  };

  return (
    <Form spacing="md" onSubmit={onSubmit} noValidate>
      <FormField
        label="Full name"
        htmlFor="signup-full-name"
        required
        error={errors.fullName}
      >
        <Input
          name="fullName"
          id="signup-full-name"
          autoComplete="name"
          placeholder="Your full name"
        />
      </FormField>

      <FormField
        label="Email"
        htmlFor="signup-email"
        required
        error={errors.email}
      >
        <Input
          name="email"
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </FormField>

      <FormField
        label="Mobile number"
        htmlFor="signup-mobile"
        required
        hint="Indian mobile preferred (10 digits)."
        error={errors.mobile}
      >
        <Input
          name="mobile"
          id="signup-mobile"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="9876543210"
        />
      </FormField>

      <PasswordField
        label="Password"
        name="password"
        id="signup-password"
        required
        autoComplete="new-password"
        hint="At least 8 characters with a letter and a number."
        error={errors.password}
      />

      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        id="signup-confirm-password"
        required
        autoComplete="new-password"
        error={errors.confirmPassword}
      />

      <AccountTypeSelector
        value={accountType}
        onChange={setAccountType}
        error={errors.accountType}
      />

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <input
            id="signup-terms"
            name="acceptTerms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(event) => setAcceptTerms(event.target.checked)}
            aria-invalid={errors.acceptTerms ? true : undefined}
            aria-describedby={
              errors.acceptTerms ? 'signup-terms-error' : undefined
            }
            className="mt-1 h-4 w-4 rounded border-uv-input-border text-uv-brand uv-focus-ring"
          />
          <label htmlFor="signup-terms" className="text-sm text-uv-foreground">
            I agree to the{' '}
            <Link
              href="/legal/terms"
              className="font-medium text-uv-brand underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/legal/privacy"
              className="font-medium text-uv-brand underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.acceptTerms ? (
          <p
            id="signup-terms-error"
            className="text-xs text-uv-error"
            role="alert"
          >
            {errors.acceptTerms}
          </p>
        ) : null}
      </div>

      <Button type="submit" fullWidth isLoading={submitting}>
        Create account
      </Button>

      <p className="text-center text-sm text-uv-foreground-muted">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </Form>
  );
}
