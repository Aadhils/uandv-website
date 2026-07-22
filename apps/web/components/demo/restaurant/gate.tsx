'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useRestaurantDemoAuth } from '@/lib/demo/restaurant/auth-context';
import { homeForRole, type RestaurantRole } from '@/lib/demo/restaurant/types';

import { RestaurantDemoShell } from './shell';

function allowedForRole(pathname: string, role: RestaurantRole) {
  if (pathname.startsWith('/demo/restaurant-platform/admin')) return role === 'admin';
  if (pathname.startsWith('/demo/restaurant-platform/kitchen')) return role === 'kitchen';
  if (pathname.startsWith('/demo/restaurant-platform/delivery')) return role === 'delivery';
  if (pathname.startsWith('/demo/restaurant-platform/manager')) return role === 'restaurant';
  if (pathname.startsWith('/demo/restaurant-platform/pos')) {
    return role === 'restaurant' || role === 'admin';
  }
  if (pathname.startsWith('/demo/restaurant-platform/inventory')) {
    return role === 'restaurant' || role === 'admin';
  }
  if (pathname.startsWith('/demo/restaurant-platform/customer')) return role === 'customer';
  if (pathname.startsWith('/demo/restaurant-platform/dine-in')) {
    return role === 'customer' || role === 'restaurant';
  }
  return true;
}

export function RestaurantDemoGate({ children }: { children: ReactNode }) {
  const { session, ready } = useRestaurantDemoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin =
    pathname === '/demo/restaurant-platform/login' ||
    pathname === '/demo/restaurant-platform';

  useEffect(() => {
    if (!ready) return;
    if (!session && !isLogin) {
      router.replace('/demo/restaurant-platform/login');
      return;
    }
    if (session && isLogin) {
      // Hard navigation avoids rare client-router stalls on the login gate
      window.location.replace(homeForRole(session.role));
      return;
    }
    if (session && !allowedForRole(pathname, session.role)) {
      router.replace(homeForRole(session.role));
    }
  }, [ready, session, isLogin, pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">
        Loading restaurant platform demo…
      </div>
    );
  }

  if (!session) return <>{children}</>;

  if (isLogin) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">
        Opening workspace…
      </div>
    );
  }

  return <RestaurantDemoShell>{children}</RestaurantDemoShell>;
}
