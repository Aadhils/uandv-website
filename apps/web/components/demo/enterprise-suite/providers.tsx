'use client';
import type { ReactNode } from 'react';
import { SuiteDemoAuthProvider } from '@/lib/demo/enterprise-suite/auth-context';
import { SuiteDemoGate } from './gate';
export function SuiteDemoProviders({ children }: { children: ReactNode }) {
  return (
    <SuiteDemoAuthProvider>
      <SuiteDemoGate>{children}</SuiteDemoGate>
    </SuiteDemoAuthProvider>
  );
}
