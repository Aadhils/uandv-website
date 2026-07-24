'use client';

import { useSignUp } from '@clerk/nextjs';
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
import { ClerkGate } from '@/components/auth/clerk-gate';
import { PasswordField } from '@/components/auth/password-field';
import {
  hasFieldErrors,
  normalizeMobile,
  validateSignup,
  type FieldErrors,
  type SignupAccountType,
} from '@/lib/auth';

/** Fields from older Clerk configs that must not block email+password signup. */
const STALE_SIGNUP_FIELDS = new Set(['phone_number', 'username']);

function clerkErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === 'object' &&
    'errors' in error &&
    Array.isArray(
      (
        error as {
          errors?: { longMessage?: string; message?: string; code?: string }[];
        }
      ).errors,
    )
  ) {
    const first = (
      error as { errors: { longMessage?: string; message?: string }[] }
    ).errors[0];
    return first?.longMessage || first?.message || fallback;
  }
  return fallback;
}

function errorMentionsStaleFields(error: unknown): boolean {
  const message = clerkErrorMessage(error, '').toLowerCase();
  return (
    message.includes('phone') ||
    message.includes('username') ||
    message.includes('phone_number')
  );
}

function collectSignUpFields(signUp: {
  missingFields?: string[] | null;
  unverifiedFields?: string[] | null;
  requiredFields?: string[] | null;
}) {
  return new Set(
    [
      ...(signUp.missingFields ?? []),
      ...(signUp.unverifiedFields ?? []),
      ...(signUp.requiredFields ?? []),
    ].map((field) => field.toLowerCase()),
  );
}

/** Incomplete client SignUp still requiring phone/username from a prior Clerk config. */
function hasStaleSignUpAttempt(
  signUp:
    | {
        id?: string | null;
        status?: string | null;
        missingFields?: string[] | null;
        unverifiedFields?: string[] | null;
        requiredFields?: string[] | null;
      }
    | null
    | undefined,
): boolean {
  if (!signUp?.id) return false;
  if (signUp.status === 'complete') return false;
  const fields = collectSignUpFields(signUp);
  for (const stale of STALE_SIGNUP_FIELDS) {
    if (fields.has(stale)) return true;
  }
  return false;
}

function afterSignUpPath(accountType: SignupAccountType | '') {
  if (accountType === 'vendor' || accountType === 'partner') {
    return '/signup/pending';
  }
  return process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard';
}

export function SignupForm() {
  return (
    <ClerkGate>
      <ClerkSignupForm />
    </ClerkGate>
  );
}

function ClerkSignupForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [accountType, setAccountType] = React.useState<SignupAccountType | ''>(
    '',
  );
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const finishSignup = async (
    sessionId: string | null | undefined,
    type: SignupAccountType | '',
  ) => {
    if (!sessionId) {
      setFormError(
        'Account verification succeeded but no session was created. Try signing in.',
      );
      return;
    }

    if (!setActive) {
      setFormError(
        'Clerk session helper is unavailable. Refresh the page and try again.',
      );
      return;
    }

    const destination = afterSignUpPath(type);
    // Activate the session before any navigation so middleware sees the user.
    await setActive({ session: sessionId });
    router.replace(destination);
  };

  /**
   * Clerk's signUp.create() deactivates any in-progress SignUp and starts a new one.
   * Detect stale attempts that still require phone_number / username, clear local
   * verification UI state, then create with email + password only.
   */
  const createFreshEmailPasswordSignUp = async (params: {
    emailAddress: string;
    password: string;
    unsafeMetadata: {
      fullName: string;
      mobile: string;
      accountType: string;
    };
  }) => {
    if (!signUp) {
      throw new Error('SignUp is not ready.');
    }

    const payload = {
      emailAddress: params.emailAddress,
      password: params.password,
      unsafeMetadata: params.unsafeMetadata,
    };

    if (hasStaleSignUpAttempt(signUp)) {
      setPendingVerification(false);
      setCode('');
    }

    try {
      // create() abandons/deactivates any incomplete SignUp on this client
      return await signUp.create(payload);
    } catch (error) {
      if (!errorMentionsStaleFields(error)) {
        throw error;
      }

      // Retry once — create() replaces the incomplete attempt
      setPendingVerification(false);
      setCode('');
      return await signUp.create(payload);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

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

    if (!isLoaded || !signUp) {
      setFormError(
        'Authentication is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY.',
      );
      return;
    }

    const mobileNormalized = normalizeMobile(input.mobile.trim());

    setSubmitting(true);
    try {
      // 1) Fresh SignUp — email + password only (no username / Clerk phoneNumber)
      const created = await createFreshEmailPasswordSignUp({
        emailAddress: input.email.trim().toLowerCase(),
        password: input.password,
        unsafeMetadata: {
          fullName: input.fullName.trim(),
          mobile: mobileNormalized,
          accountType: input.accountType,
        },
      });

      if (created.status === 'complete') {
        await finishSignup(
          created.createdSessionId,
          input.accountType as SignupAccountType,
        );
        return;
      }

      // 2) Email OTP
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });
      setPendingVerification(true);
    } catch (error) {
      setFormError(
        clerkErrorMessage(
          error,
          'Unable to create your account. Please try again.',
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!isLoaded || !signUp) return;

    const trimmed = code.trim();
    if (!trimmed) {
      setFormError('Enter the verification code from your email.');
      return;
    }

    setSubmitting(true);
    try {
      // 3) Verify OTP
      const result = await signUp.attemptEmailAddressVerification({
        code: trimmed,
      });

      // 4–5) Activate session, then redirect — never send verified users to /login
      if (result.status === 'complete') {
        await finishSignup(
          signUp.createdSessionId ?? result.createdSessionId,
          (accountType || 'customer') as SignupAccountType,
        );
        return;
      }

      const missing = [
        ...(result.missingFields ?? []),
        ...(result.unverifiedFields ?? []),
      ].filter((field) => !STALE_SIGNUP_FIELDS.has(field));

      setFormError(
        missing.length > 0
          ? `Verification incomplete. Still required: ${missing.join(', ')}.`
          : `Verification incomplete (status: ${result.status}). Start again from Create account if this persists.`,
      );
    } catch (error) {
      setFormError(clerkErrorMessage(error, 'Invalid verification code.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (pendingVerification) {
    return (
      <Form spacing="md" onSubmit={onVerify} noValidate>
        <p className="text-sm text-uv-foreground-muted">
          Enter the verification code we sent to your email to finish creating
          your account.
        </p>
        {/* Required when Clerk bot protection / CAPTCHA is enabled */}
        <div id="clerk-captcha" />
        <FormField label="Verification code" htmlFor="signup-code" required>
          <Input
            id="signup-code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={submitting}
          />
        </FormField>
        {formError ? (
          <p className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-3 py-2 text-sm text-uv-error" role="alert">
            {formError}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Verifying…' : 'Verify email'}
        </Button>
      </Form>
    );
  }

  return (
    <Form spacing="md" onSubmit={onSubmit} noValidate>
      {/* Required when Clerk bot protection / CAPTCHA is enabled */}
      <div id="clerk-captcha" />

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
          disabled={submitting}
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
          placeholder="you@company.com"
          disabled={submitting}
        />
      </FormField>

      <FormField
        label="Mobile"
        htmlFor="signup-mobile"
        required
        error={errors.mobile}
      >
        <Input
          name="mobile"
          id="signup-mobile"
          type="tel"
          autoComplete="tel"
          placeholder="+91…"
          disabled={submitting}
        />
      </FormField>

      <AccountTypeSelector
        value={accountType}
        onChange={setAccountType}
        error={errors.accountType}
      />

      <PasswordField
        name="password"
        id="signup-password"
        label="Password"
        autoComplete="new-password"
        error={errors.password}
        disabled={submitting}
      />

      <PasswordField
        name="confirmPassword"
        id="signup-confirm-password"
        label="Confirm password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        disabled={submitting}
      />

      <label className="flex items-start gap-3 text-sm text-uv-foreground-muted">
        <input
          type="checkbox"
          className="mt-1"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          disabled={submitting}
        />
        <span>
          I agree to the{' '}
          <Link href="/legal/terms" className="text-uv-brand underline-offset-4 hover:underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy" className="text-uv-brand underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {errors.acceptTerms ? (
        <p className="text-sm text-uv-error">{errors.acceptTerms}</p>
      ) : null}

      {formError ? (
        <p className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-3 py-2 text-sm text-uv-error" role="alert">
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Creating account…' : 'Create account'}
      </Button>
    </Form>
  );
}
