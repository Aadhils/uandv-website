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
import { PasswordField } from '@/components/auth/password-field';
import { hasFieldErrors, validateLogin, type FieldErrors } from '@/lib/auth';

export type LoginFormProps = {
  /** Ignored for production Clerk login — kept for route compatibility. */
  intendedRole?: string;
  redirectTo?: string;
};

function clerkErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === 'object' &&
    'errors' in error &&
    Array.isArray((error as { errors?: { message?: string; longMessage?: string; code?: string }[] }).errors)
  ) {
    const first = (
      error as { errors: { message?: string; longMessage?: string; code?: string }[] }
    ).errors[0];
    return first?.longMessage || first?.message || fallback;
  }
  return fallback;
}

function isSessionAlreadyExistsError(error: unknown): boolean {
  if (
    error &&
    typeof error === 'object' &&
    'errors' in error &&
    Array.isArray((error as { errors?: { code?: string; message?: string }[] }).errors)
  ) {
    const errors = (error as { errors: { code?: string; message?: string }[] }).errors;
    return errors.some((item) => {
      const code = (item.code || '').toLowerCase();
      const message = (item.message || '').toLowerCase();
      return (
        code.includes('session_exists') ||
        code.includes('session_already') ||
        message.includes('session already exists')
      );
    });
  }
  return clerkErrorMessage(error, '').toLowerCase().includes('session already exists');
}

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
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const redirectedRef = React.useRef(false);

  const destination = safeRedirectPath(
    redirectTo || searchParams.get('redirect_url'),
  );
  const sessionVerifyError = searchParams.get('auth_error') === 'session_verify';

  // Auth guard: signed-in users leave /login once (no repeated replaces)
  React.useEffect(() => {
    console.log('[uv-auth:login]', {
      pathname,
      isLoaded: authLoaded,
      isSignedIn,
      userId,
      sessionId,
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
        console.warn(
          '[uv-auth:login] redirect loop detected — server likely cannot verify Clerk session (check CLERK_SECRET_KEY)',
        );
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const identifier = String(data.get('identifier') ?? '');
    const password = String(data.get('password') ?? '');
    const rememberMe = data.get('rememberMe') === 'on';

    const nextErrors = validateLogin({ identifier, password, rememberMe });
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) return;

    if (!isLoaded || !signIn) {
      setFormError(
        'Authentication is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY.',
      );
      return;
    }

    setSubmitting(true);
    try {
      const result = await signIn.create({
        identifier: identifier.trim(),
        password,
      });

      if (result.status === 'complete') {
        await activateAndGo(
          result.createdSessionId ?? signIn.createdSessionId,
        );
        return;
      }

      setFormError(
        'Additional verification is required. Please check your email or try again.',
      );
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

      setFormError(
        clerkErrorMessage(
          error,
          'Unable to sign in. Check your email and password.',
        ),
      );
    } finally {
      setSubmitting(false);
    }
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
        <p className="font-medium text-uv-foreground">
          Redirect loop stopped
        </p>
        <p>
          You are signed in in the browser, but the server could not verify the
          session. Set a valid <code className="text-xs">CLERK_SECRET_KEY</code>{' '}
          (<code className="text-xs">sk_test_…</code>) in{' '}
          <code className="text-xs">apps/web/.env.local</code>, restart{' '}
          <code className="text-xs">pnpm --filter @uandv/web dev</code>, then
          open{' '}
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

  return (
    <Form spacing="md" onSubmit={onSubmit} noValidate>
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
        <p className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-3 py-2 text-sm text-uv-error" role="alert">
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </Form>
  );
}
