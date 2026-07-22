'use client';
import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSuiteDemoAuth } from '@/lib/demo/enterprise-suite/auth-context';
import { roleCanAccess } from '@/lib/demo/enterprise-suite/nav';
import { homeForRole, SUITE_MODULE_INTENT_KEY } from '@/lib/demo/enterprise-suite/types';
import { SuiteDemoShell } from './shell';

export function SuiteDemoGate({ children }: { children: ReactNode }) {
  const { session, ready } = useSuiteDemoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLogin = pathname === '/demo/enterprise-suite/login' || pathname === '/demo/enterprise-suite';

  useEffect(() => {
    if (searchParams.get('module') === 'travel') {
      window.sessionStorage.setItem(SUITE_MODULE_INTENT_KEY, 'travel');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!ready) return;
    if (!session && !isLogin) {
      router.replace('/demo/enterprise-suite/login');
      return;
    }
    if (session && isLogin) {
      const intent = window.sessionStorage.getItem(SUITE_MODULE_INTENT_KEY);
      if (intent === 'travel' || searchParams.get('module') === 'travel') {
        window.sessionStorage.removeItem(SUITE_MODULE_INTENT_KEY);
        router.replace('/demo/enterprise-suite/travel');
        return;
      }
      router.replace(homeForRole(session.role));
      return;
    }
    if (session && !isLogin && !roleCanAccess(session.role, pathname)) {
      router.replace(homeForRole(session.role));
    }
  }, [ready, session, isLogin, router, pathname, searchParams]);

  if (!ready) {
    return <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">Loading enterprise suite…</div>;
  }
  if (!session) return <>{children}</>;
  if (isLogin) {
    return <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">Opening workspace…</div>;
  }
  return <SuiteDemoShell>{children}</SuiteDemoShell>;
}
