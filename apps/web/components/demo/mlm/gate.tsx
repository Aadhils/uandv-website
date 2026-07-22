'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';

import { MlmDemoShell } from './shell';

export function MlmDemoGate({ children }: { children: ReactNode }) {
  const { session, ready } = useMlmDemoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/demo/mlm/login' || pathname === '/demo/mlm';

  useEffect(() => {
    if (!ready) return;
    if (!session && !isLogin) {
      router.replace('/demo/mlm/login');
      return;
    }
    if (session && isLogin) {
      router.replace('/demo/mlm/dashboard');
    }
  }, [ready, session, isLogin, router]);

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">
        Loading MLM demo…
      </div>
    );
  }

  if (!session) {
    return <>{children}</>;
  }

  if (isLogin) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">
        Opening dashboard…
      </div>
    );
  }

  return <MlmDemoShell>{children}</MlmDemoShell>;
}
