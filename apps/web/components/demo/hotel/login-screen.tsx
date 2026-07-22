'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { Button, Input, buttonVariants, cn } from '@uandv/ui';

import { useHotelDemoAuth } from '@/lib/demo/hotel/auth-context';
import { hotelName } from '@/lib/demo/hotel/mock-data';
import {
  HOTEL_CREDENTIALS,
  homeForRole,
  type HotelRole,
} from '@/lib/demo/hotel/types';

const roles: { id: HotelRole; label: string }[] = [
  { id: 'admin', label: 'Admin' },
  { id: 'reception', label: 'Reception' },
  { id: 'housekeeping', label: 'Housekeeping' },
  { id: 'guest', label: 'Guest' },
];

export function HotelLoginScreen() {
  const { login } = useHotelDemoAuth();
  const [role, setRole] = useState<HotelRole>('admin');
  const [email, setEmail] = useState(HOTEL_CREDENTIALS.admin.email);
  const [password, setPassword] = useState(HOTEL_CREDENTIALS.admin.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const switchRole = (next: HotelRole) => {
    setRole(next);
    setError(null);
    setEmail(HOTEL_CREDENTIALS[next].email);
    setPassword(HOTEL_CREDENTIALS[next].password);
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
    window.location.replace(homeForRole(role));
  };

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-uv-background-subtle px-4 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-uv-brand/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-uv-navy/15 blur-3xl" />
      </div>
      <div className="relative w-full max-w-lg">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
            Product Demo — Mock Data
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-foreground">
            Hotel Management Platform
          </h1>
          <p className="mt-2 text-sm text-uv-foreground-muted">
            {hotelName} · Admin, Reception, Housekeeping, and Guest workspaces.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-uv-2xl border border-uv-border bg-uv-background p-6 shadow-uv-lg sm:p-8"
        >
          <div className="grid grid-cols-4 gap-1 rounded-uv-xl bg-uv-background-subtle p-1">
            {roles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => switchRole(item.id)}
                className={cn(
                  'rounded-uv-lg px-1 py-2.5 text-[10px] font-semibold sm:text-xs',
                  role === item.id
                    ? 'uv-brand-gradient text-white'
                    : 'text-uv-foreground-muted',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="mt-5 block text-sm font-medium">
            Email
            <Input
              className="mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Password
            <Input
              className="mt-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? (
            <p className="mt-4 rounded-uv-lg bg-uv-error-muted px-3 py-2 text-sm text-uv-error">
              {error}
            </p>
          ) : null}
          <Button type="submit" size="lg" className="mt-6 w-full" isLoading={loading}>
            Enter product demo
          </Button>
          <div className="mt-5 space-y-2 rounded-uv-xl border border-uv-border bg-uv-background-subtle p-4 text-sm">
            <p className="font-medium text-uv-foreground">Demo credentials</p>
            {(Object.keys(HOTEL_CREDENTIALS) as HotelRole[]).map((key) => (
              <p key={key} className="font-mono text-[11px] text-uv-foreground-muted">
                <span className="uppercase text-uv-brand">{key}</span> ·{' '}
                {HOTEL_CREDENTIALS[key].email} / {HOTEL_CREDENTIALS[key].password}
              </p>
            ))}
          </div>
        </form>
        <div className="mt-6 flex justify-center">
          <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
