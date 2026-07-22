'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import { Button, Input, buttonVariants, cn } from '@uandv/ui';

import { useErpDemoAuth } from '@/lib/demo/erp/auth-context';
import { ERP_CREDENTIALS, type DemoRole } from '@/lib/demo/erp/types';

const roles: { id: DemoRole; label: string }[] = [
  { id: 'admin', label: 'Admin' },
  { id: 'sales', label: 'Sales' },
  { id: 'hr', label: 'HR' },
];

export function ErpLoginScreen() {
  const { login } = useErpDemoAuth();
  const router = useRouter();
  const [role, setRole] = useState<DemoRole>('admin');
  const [email, setEmail] = useState<string>(ERP_CREDENTIALS.admin.email);
  const [password, setPassword] = useState<string>(ERP_CREDENTIALS.admin.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const switchRole = (next: DemoRole) => {
    setRole(next);
    setError(null);
    setEmail(ERP_CREDENTIALS[next].email);
    setPassword(ERP_CREDENTIALS[next].password);
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
    router.replace('/demo/erp/dashboard');
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
            Product Demo · Enterprise ERP &amp; CRM
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
            ERP &amp; CRM Demo
          </h1>
          <p className="mt-2 text-sm text-uv-foreground-muted">
            Sign in as Admin, Sales, or HR to explore the interactive workspace.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-uv-2xl border border-uv-border bg-uv-background p-6 shadow-uv-lg sm:p-8"
        >
          <div className="grid grid-cols-3 gap-2 rounded-uv-xl bg-uv-background-subtle p-1">
            {roles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => switchRole(item.id)}
                className={cn(
                  'rounded-uv-lg px-2 py-2.5 text-sm font-semibold transition-colors',
                  role === item.id
                    ? 'uv-brand-gradient text-white'
                    : 'text-uv-foreground-muted hover:text-uv-foreground',
                )}
              >
                {item.label}
              </button>
            ))}
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
            {(Object.keys(ERP_CREDENTIALS) as DemoRole[]).map((key) => (
              <div key={key}>
                <p className="text-xs uppercase tracking-[0.12em] text-uv-brand">{key}</p>
                <p className="mt-1 font-mono text-uv-foreground">
                  {ERP_CREDENTIALS[key].email} / {ERP_CREDENTIALS[key].password}
                </p>
              </div>
            ))}
          </div>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/services/erp-software"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            ERP Software
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
