'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useHotelDemoAuth } from '@/lib/demo/hotel/auth-context';
import { homeForRole, type HotelRole } from '@/lib/demo/hotel/types';

import { HotelDemoShell } from './shell';

function allowedForRole(pathname: string, role: HotelRole) {
  if (pathname.startsWith('/demo/hotel-management/guest')) return role === 'guest';
  if (pathname.startsWith('/demo/hotel-management/reports')) return role === 'admin';
  if (pathname.startsWith('/demo/hotel-management/housekeeping')) {
    return role === 'housekeeping' || role === 'admin' || role === 'reception';
  }
  if (pathname.startsWith('/demo/hotel-management/maintenance')) {
    return role === 'housekeeping' || role === 'admin' || role === 'reception';
  }
  if (role === 'guest') return false;
  if (role === 'housekeeping') {
    return (
      pathname.startsWith('/demo/hotel-management/housekeeping') ||
      pathname.startsWith('/demo/hotel-management/maintenance')
    );
  }
  return true;
}

export function HotelDemoGate({ children }: { children: ReactNode }) {
  const { session, ready } = useHotelDemoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin =
    pathname === '/demo/hotel-management/login' || pathname === '/demo/hotel-management';

  useEffect(() => {
    if (!ready) return;
    if (!session && !isLogin) {
      router.replace('/demo/hotel-management/login');
      return;
    }
    if (session && isLogin) {
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
        Loading hotel management demo…
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

  return <HotelDemoShell>{children}</HotelDemoShell>;
}
