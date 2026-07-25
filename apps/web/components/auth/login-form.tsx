'use client';

import { useAuth, useClerk, useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Suspense } from 'react';

import {
  Button,
  Checkbox,
  Form,
  FormField,
  Input,
} from '@uandv/ui';

import { ClerkGate } from '@/components/auth/clerk-gate';
import { OtpInput } from '@/components/auth/otp-input';
import { PasswordField } from '@/components/auth/password-field';
import {
  getClerkErrorCodes,
  hasFieldErrors,
  isSessionAlreadyExistsError,
  logAuthEvent,
  mapClerkSignInError,
  maskIdentifier,
  normalizeSignInStatus,
  validateLogin,
  type FieldErrors,
} from '@/lib/auth';

export type LoginFormProps = {
  /** Ignored for production Clerk login — kept for route compatibility. */
  intendedRole?: string;
  redirectTo?: string;
};

type LoginStep = 'credentials' | 'email_verify' | 'second_factor';

function safeRedirectPath(raw: string | null | undefined): string {
  if (
    raw &&
    raw.startsWith('/') &&
    !raw.startsWith('//') &&
    !raw.startsWith('/login')
  ) {
    return raw;
  }
  return process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard';
}

export function LoginForm(props: LoginFormProps) {
  return (
    <ClerkGate>
      <Suspense
        fallback={
          <p className="text-sm text-uv-foreground-muted" role="status">
            Loading sign in…
          </p>
        }
      >
        <ClerkLoginForm {...props} />
      </Suspense>
    </ClerkGate>
  );
}

function ClerkLoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clerk = useClerk();
  const { isLoaded: authLoaded, isSignedIn, userId, sessionId } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [step, setStep] = React.useState<LoginStep>('credentials');
  const [identifier, setIdentifier] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [infoMessage, setInfoMessage] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [resending, setResending] = React.useState(false);
  const redirectedRef = React.useRef(false);

  const destination = safeRedirectPath(
    redirectTo || searchParams.get('redirect_url'),
  );
  const sessionVerifyError = searchParams.get('auth_error') === 'session_verify';

  React.useEffect(() => {
    logAuthEvent('login:session', {
      pathname,
      authLoaded,
      isSignedIn,
      hasUserId: Boolean(userId),
      hasSessionId: Boolean(sessionId),
      redirectTarget: destination,
      sessionVerifyError,
    });

    if (!authLoaded || !isSignedIn || redirectedRef.current || sessionVerifyError) {
      return;
    }

    try {
      const key = 'uv_auth_login_redirect_ts';
      const last = sessionStorage.getItem(key);
      const now = Date.now();
      if (last && now - Number(last) < 4000) {
        logAuthEvent('login:redirect_loop_blocked', { redirectTarget: destination });
        router.replace('/login?auth_error=session_verify');
        return;
      }
      sessionStorage.setItem(key, String(now));
    } catch {
      // sessionStorage may be unavailable
    }

    redirectedRef.current = true;
    router.replace(destination);
  }, [
    authLoaded,
    isSignedIn,
    userId,
    sessionId,
    destination,
    pathname,
    router,
    sessionVerifyError,
  ]);

  const activateAndGo = async (activeSessionId: string | null | undefined) => {
    if (!setActive) {
      setFormError('Clerk session helper is unavailable. Refresh and try again.');
      return;
    }
    if (!activeSessionId) {
      setFormError('No active session was created. Please try again.');
      return;
    }
    await setActive({ session: activeSessionId });
    redirectedRef.current = true;
    router.replace(destination);
  };

  const handleSignInResult = async (
    result: {
      status: string | null;
      createdSessionId?: string | null;
    },
    context: string,
  ) => {
    const status = normalizeSignInStatus(result.status);
    logAuthEvent(`login:${context}`, { status });

    if (status === 'complete') {
      await activateAndGo(result.createdSessionId ?? signIn?.createdSessionId);
      return;
    }

    if (status === 'needs_new_password') {
      setStep('credentials');
      setFormError(
        'You need to set a new password before signing in. Use the reset link below.',
      );
      return;
    }

    if (status === 'needs_second_factor') {
      setStep('second_factor');
      setFormError(null);
      setInfoMessage('Enter the verification code from your authenticator app.');
      return;
    }

    if (status === 'needs_first_factor' && signIn) {
      const factors = signIn.supportedFirstFactors ?? [];
      const emailFactor = factors.find((factor) => factor.strategy === 'email_code');

      if (emailFactor && 'emailAddressId' in emailFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: emailFactor.emailAddressId,
        });
        setStep('email_verify');
        setFormError(null);
        setInfoMessage('Your email is not verified yet.');
        logAuthEvent('login:email_verification_required', {
          maskedIdentifier: maskIdentifier(identifier),
        });
        return;
      }

      const phoneFactor = factors.find((factor) => factor.strategy === 'phone_code');
      if (phoneFactor && 'phoneNumberId' in phoneFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId: phoneFactor.phoneNumberId,
        });
        setStep('email_verify');
        setFormError(null);
        setInfoMessage('Enter the verification code we sent to your phone.');
        return;
      }
    }

    if (status === 'needs_client_trust') {
      setFormError(
        'Additional security verification is required. Complete the check below and try again.',
      );
      return;
    }

    setFormError('Unable to sign in. Please check your details and try again.');
  };

  const onSubmitCredentials = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setInfoMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextIdentifier = String(data.get('identifier') ?? '');
    const password = String(data.get('password') ?? '');
    const rememberMe = data.get('rememberMe') === 'on';

    const nextErrors = validateLogin({ identifier: nextIdentifier, password, rememberMe });
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) return;

    if (!isLoaded || !signIn) {
      setFormError(
        'Authentication is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY.',
      );
      return;
    }

    setIdentifier(nextIdentifier.trim());
    setSubmitting(true);

    try {
      const created = await signIn.create({
        identifier: nextIdentifier.trim(),
      });

      logAuthEvent('login:create', {
        status: normalizeSignInStatus(created.status),
        maskedIdentifier: maskIdentifier(nextIdentifier),
      });

      let result = created;

      if (result.status === 'needs_first_factor') {
        const factors = signIn.supportedFirstFactors ?? [];
        const supportsPassword = factors.some(
          (factor) => factor.strategy === 'password',
        );

        if (supportsPassword) {
          result = await signIn.attemptFirstFactor({
            strategy: 'password',
            password,
          });
          logAuthEvent('login:password_factor', {
            status: normalizeSignInStatus(result.status),
          });
        }
      }

      await handleSignInResult(result, 'after_password');
    } catch (error) {
      if (isSessionAlreadyExistsError(error)) {
        if (userId || sessionId || isSignedIn) {
          redirectedRef.current = true;
          router.replace(destination);
          return;
        }
        const existingSessionId =
          clerk.session?.id || clerk.client?.sessions?.[0]?.id || null;
        if (existingSessionId) {
          await activateAndGo(existingSessionId);
          return;
        }
        redirectedRef.current = true;
        router.replace(destination);
        return;
      }

      const message = mapClerkSignInError(error);
      logAuthEvent('login:error', {
        codes: getClerkErrorCodes(error),
        maskedIdentifier: maskIdentifier(nextIdentifier),
      });
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const onVerifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!isLoaded || !signIn) return;

    const code = verificationCode.trim();
    if (!code) {
      setFormError('Enter the verification code from your email.');
      return;
    }

    setSubmitting(true);
    try {
      const factors = signIn.supportedFirstFactors ?? [];
      const emailFactor = factors.find((factor) => factor.strategy === 'email_code');
      const phoneFactor = factors.find((factor) => factor.strategy === 'phone_code');
      const strategy = emailFactor ? 'email_code' : phoneFactor ? 'phone_code' : null;

      if (!strategy) {
        setFormError('Verification is not available. Try signing in again.');
        setStep('credentials');
        return;
      }

      const result = await signIn.attemptFirstFactor({
        strategy,
        code,
      });

      await handleSignInResult(result, 'email_code_factor');
    } catch (error) {
      logAuthEvent('login:verify_error', { codes: getClerkErrorCodes(error) });
      setFormError(mapClerkSignInError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const onVerifySecondFactor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!isLoaded || !signIn) return;

    const code = verificationCode.trim();
    if (!code) {
      setFormError('Enter your authentication code.');
      return;
    }

    setSubmitting(true);
    try {
      const factors = signIn.supportedSecondFactors ?? [];
      const totp = factors.find((factor) => factor.strategy === 'totp');
      const phone = factors.find((factor) => factor.strategy === 'phone_code');
      const strategy = totp ? 'totp' : phone ? 'phone_code' : null;

      if (!strategy) {
        setFormError('Two-factor authentication is not available. Try again.');
        setStep('credentials');
        return;
      }

      const result = await signIn.attemptSecondFactor({ strategy, code });
      await handleSignInResult(result, 'second_factor');
    } catch (error) {
      logAuthEvent('login:second_factor_error', {
        codes: getClerkErrorCodes(error),
      });
      setFormError(mapClerkSignInError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const onResendVerification = async () => {
    if (!isLoaded || !signIn) return;
    setResending(true);
    setFormError(null);
    try {
      const factors = signIn.supportedFirstFactors ?? [];
      const emailFactor = factors.find((factor) => factor.strategy === 'email_code');
      const phoneFactor = factors.find((factor) => factor.strategy === 'phone_code');

      if (emailFactor && 'emailAddressId' in emailFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: emailFactor.emailAddressId,
        });
        setInfoMessage('Verification email sent. Check your inbox.');
        logAuthEvent('login:resend_verification', { channel: 'email' });
        return;
      }

      if (phoneFactor && 'phoneNumberId' in phoneFactor) {
        await signIn.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId: phoneFactor.phoneNumberId,
        });
        setInfoMessage('Verification code sent to your phone.');
        logAuthEvent('login:resend_verification', { channel: 'phone' });
        return;
      }

      setFormError('Unable to resend verification. Try signing in again.');
    } catch (error) {
      logAuthEvent('login:resend_error', { codes: getClerkErrorCodes(error) });
      setFormError(mapClerkSignInError(error));
    } finally {
      setResending(false);
    }
  };

  const backToCredentials = () => {
    setStep('credentials');
    setVerificationCode('');
    setFormError(null);
    setInfoMessage(null);
  };

  if (!authLoaded) {
    return (
      <p className="text-sm text-uv-foreground-muted" role="status">
        Checking session…
      </p>
    );
  }

  if (sessionVerifyError && isSignedIn) {
    return (
      <div className="space-y-3 text-sm text-uv-foreground-muted" role="alert">
        <p className="font-medium text-uv-foreground">Redirect loop stopped</p>
        <p>
          You are signed in in the browser, but the server could not verify the
          session. Set a valid <code className="text-xs">CLERK_SECRET_KEY</code>{' '}
          (<code className="text-xs">sk_test_…</code>) in{' '}
          <code className="text-xs">apps/web/.env.local</code>, restart{' '}
          <code className="text-xs">pnpm --filter @uandv/web dev</code>, then open{' '}
          <Link
            href="/dashboard"
            className="text-uv-brand underline-offset-4 hover:underline"
          >
            /dashboard
          </Link>
          .
        </p>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <p className="text-sm text-uv-foreground-muted" role="status">
        You’re already signed in. Redirecting…
      </p>
    );
  }

  if (step === 'email_verify') {
    return (
      <Form spacing="md" onSubmit={onVerifyEmail} noValidate>
        <div id="clerk-captcha" />
        <p className="text-sm font-medium text-uv-foreground" role="status">
          {infoMessage ?? 'Your email is not verified yet.'}
        </p>
        <p className="text-sm text-uv-foreground-muted">
          Enter the verification code we sent to your email to continue signing in.
        </p>
        <FormField label="Verification code" htmlFor="login-verify-code" required>
          <OtpInput
            id="login-verify-code"
            value={verificationCode}
            onChange={setVerificationCode}
            disabled={submitting}
          />
        </FormField>
        {formError ? (
          <p
            className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-3 py-2 text-sm text-uv-error"
            role="alert"
          >
            {formError}
          </p>
        ) : null}
        {infoMessage && !formError ? (
          <p className="text-sm text-uv-foreground-muted" role="status">
            {infoMessage}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Verifying…' : 'Verify now'}
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={resending || submitting}
            onClick={onResendVerification}
          >
            {resending ? 'Sending…' : 'Resend verification email'}
          </Button>
          <button
            type="button"
            className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
            onClick={backToCredentials}
          >
            Back to sign in
          </button>
        </div>
      </Form>
    );
  }

  if (step === 'second_factor') {
    return (
      <Form spacing="md" onSubmit={onVerifySecondFactor} noValidate>
        <div id="clerk-captcha" />
        <p className="text-sm text-uv-foreground-muted" role="status">
          {infoMessage ?? 'Enter your two-factor authentication code.'}
        </p>
        <FormField label="Authentication code" htmlFor="login-2fa-code" required>
          <OtpInput
            id="login-2fa-code"
            value={verificationCode}
            onChange={setVerificationCode}
            disabled={submitting}
          />
        </FormField>
        {formError ? (
          <p
            className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-3 py-2 text-sm text-uv-error"
            role="alert"
          >
            {formError}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Verifying…' : 'Verify and sign in'}
        </Button>
        <button
          type="button"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
          onClick={backToCredentials}
        >
          Back to sign in
        </button>
      </Form>
    );
  }

  return (
    <Form spacing="md" onSubmit={onSubmitCredentials} noValidate>
      <div id="clerk-captcha" />

      <FormField
        label="Email or mobile"
        htmlFor="login-identifier"
        required
        error={errors.identifier}
      >
        <Input
          name="identifier"
          id="login-identifier"
          autoComplete="username"
          placeholder="you@company.com"
          defaultValue={identifier}
          disabled={submitting}
        />
      </FormField>

      <PasswordField
        name="password"
        id="login-password"
        label="Password"
        autoComplete="current-password"
        error={errors.password}
        disabled={submitting}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Checkbox name="rememberMe" label="Remember me" />
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {formError ? (
        <p
          className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-3 py-2 text-sm text-uv-error"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </Form>
  );
}
