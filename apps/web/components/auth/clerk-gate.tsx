'use client';

import type { ReactNode } from 'react';

import { AuthNotConfigured } from './auth-not-configured';

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function ClerkGate({ children }: { children: ReactNode }) {
  if (!hasClerk) {
    return <AuthNotConfigured />;
  }
  return <>{children}</>;
}
