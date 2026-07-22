'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { Button, Input, buttonVariants, cn } from '@uandv/ui';

import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';
import {
  MLM_ADMIN_CREDENTIALS,
  MLM_MEMBER_CREDENTIALS,
  type DemoRole,
} from '@/lib/demo/mlm/types';

export function MlmLoginScreen() {
  const { login } = useMlmDemoAuth();
  const router = useRouter();
  const [role, setRole] = useState<DemoRole>('member');
  const [email, setEmail] = useState<string>(MLM_MEMBER_CREDENTIALS.email);
  const [password, setPassword] = useState<string>(MLM_MEMBER_CREDENTIALS.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const switchRole = (next: DemoRole) => {
    setRole(next);
    setError(null);
    if (next === 'admin') {
      setEmail(MLM_ADMIN_CREDENTIALS.email);
      setPassword(MLM_ADMIN_CREDENTIALS.password);
    } else {
      setEmail(MLM_MEMBER_CREDENTIALS.email);
      setPassword(MLM_MEMBER_CREDENTIALS.password);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const result = login(email, password, role);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace('/demo/mlm/dashboard');
  };

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-uv-background-subtle px-4 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-uv-brand/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-uv-navy/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
            Product Demo · Interactive MLM Software
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
            MLM Software Demo
          </h1>
          <p className="mt-2 text-sm text-uv-foreground-muted">
            Choose Admin or Member login, then enter the dashboard.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-uv-2xl border border-uv-border bg-uv-background p-6 shadow-uv-lg sm:p-8"
        >
          <div className="grid grid-cols-2 gap-2 rounded-uv-xl bg-uv-background-subtle p-1">
            <button
              type="button"
              onClick={() => switchRole('member')}
              className={cn(
                'rounded-uv-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                role === 'member'
                  ? 'uv-brand-gradient text-white'
                  : 'text-uv-foreground-muted hover:text-uv-foreground',
              )}
            >
              Member Login
            </button>
            <button
              type="button"
              onClick={() => switchRole('admin')}
              className={cn(
                'rounded-uv-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                role === 'admin'
                  ? 'uv-brand-gradient text-white'
                  : 'text-uv-foreground-muted hover:text-uv-foreground',
              )}
            >
              Admin Login
            </button>
          </div>

          <label className="mt-5 block text-sm font-medium text-uv-foreground">
            Email
            <Input
              className="mt-2"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-uv-foreground">
            Password
            <Input
              className="mt-2"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-uv-lg bg-uv-error-muted px-3 py-2 text-sm text-uv-error">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="mt-6 w-full" isLoading={loading}>
            Sign in to dashboard
          </Button>

          <div className="mt-5 space-y-3 rounded-uv-xl border border-uv-border bg-uv-background-subtle p-4 text-sm text-uv-foreground-muted">
            <p className="font-medium text-uv-foreground">Demo credentials</p>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-uv-brand">Member</p>
              <p className="mt-1 font-mono text-uv-foreground">
                {MLM_MEMBER_CREDENTIALS.email} / {MLM_MEMBER_CREDENTIALS.password}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-uv-brand">Admin</p>
              <p className="mt-1 font-mono text-uv-foreground">
                {MLM_ADMIN_CREDENTIALS.email} / {MLM_ADMIN_CREDENTIALS.password}
              </p>
            </div>
          </div>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/solutions/mlm-software"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            MLM Solutions
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
