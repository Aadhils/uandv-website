'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useErpDemoAuth } from '@/lib/demo/erp/auth-context';
import { getNavForRole } from '@/lib/demo/erp/nav';

import { ErpDemoShell } from './shell';

export function ErpDemoGate({ children }: { children: ReactNode }) {
  const { session, ready } = useErpDemoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/demo/erp/login' || pathname === '/demo/erp';

  useEffect(() => {
    if (!ready) return;
    if (!session && !isLogin) {
      router.replace('/demo/erp/login');
      return;
    }
    if (session && isLogin) {
      router.replace('/demo/erp/dashboard');
      return;
    }
    if (session && !isLogin) {
      const allowed = getNavForRole(session.role).some((group) =>
        group.items.some(
          (item) =>
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`) ||
            (item.href.includes('customers') && pathname.startsWith('/demo/erp/customers')),
        ),
      );
      const alwaysAllowed =
        pathname === '/demo/erp/dashboard' || pathname.startsWith('/demo/erp/customers/');
      if (!allowed && !alwaysAllowed) {
        router.replace('/demo/erp/dashboard');
      }
    }
  }, [ready, session, isLogin, router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">
        Loading ERP demo…
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

  return <ErpDemoShell>{children}</ErpDemoShell>;
}
