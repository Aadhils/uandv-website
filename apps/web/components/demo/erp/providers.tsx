'use client';

import type { ReactNode } from 'react';

import { ErpDemoAuthProvider } from '@/lib/demo/erp/auth-context';

import { ErpDemoGate } from './gate';

export function ErpDemoProviders({ children }: { children: ReactNode }) {
  return (
    <ErpDemoAuthProvider>
      <ErpDemoGate>{children}</ErpDemoGate>
    </ErpDemoAuthProvider>
  );
}
