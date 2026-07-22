'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useTravelDemoAuth } from '@/lib/demo/travel/auth-context';
import { homeForRole, type TravelRole } from '@/lib/demo/travel/types';

import { TravelDemoShell } from './shell';

function allowedForRole(pathname: string, role: TravelRole) {
  if (pathname.startsWith('/demo/travel/admin')) return role === 'admin';
  if (pathname.startsWith('/demo/travel/agent')) return role === 'agent';
  if (
    pathname.startsWith('/demo/travel/portal') ||
    pathname.startsWith('/demo/travel/flights') ||
    pathname.startsWith('/demo/travel/trains') ||
    pathname.startsWith('/demo/travel/buses') ||
    pathname.startsWith('/demo/travel/hotels') ||
    pathname.startsWith('/demo/travel/packages') ||
    pathname.startsWith('/demo/travel/visa') ||
    pathname.startsWith('/demo/travel/insurance') ||
    pathname.startsWith('/demo/travel/car-rental') ||
    pathname.startsWith('/demo/travel/sightseeing') ||
    pathname.startsWith('/demo/travel/bookings') ||
    pathname.startsWith('/demo/travel/wallet') ||
    pathname.startsWith('/demo/travel/offers') ||
    pathname.startsWith('/demo/travel/checkout') ||
    pathname.startsWith('/demo/travel/confirmation')
  ) {
    return role === 'traveler' || role === 'agent';
  }
  return true;
}

export function TravelDemoGate({ children }: { children: ReactNode }) {
  const { session, ready } = useTravelDemoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === '/demo/travel/login' || pathname === '/demo/travel';

  useEffect(() => {
    if (!ready) return;
    if (!session && !isLogin) {
      router.replace('/demo/travel/login');
      return;
    }
    if (session && isLogin) {
      router.replace(homeForRole(session.role));
      return;
    }
    if (session && !allowedForRole(pathname, session.role)) {
      router.replace(homeForRole(session.role));
    }
  }, [ready, session, isLogin, pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">
        Loading travel platform demo…
      </div>
    );
  }

  if (!session) {
    return <>{children}</>;
  }

  if (isLogin) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-uv-background-subtle text-sm text-uv-foreground-muted">
        Opening workspace…
      </div>
    );
  }

  return <TravelDemoShell>{children}</TravelDemoShell>;
}
