'use client';

import type { ReactNode } from 'react';

import { TravelDemoAuthProvider } from '@/lib/demo/travel/auth-context';
import { TravelDemoStoreProvider } from '@/lib/demo/travel/store-context';

import { TravelDemoGate } from './gate';

export function TravelDemoProviders({ children }: { children: ReactNode }) {
  return (
    <TravelDemoAuthProvider>
      <TravelDemoStoreProvider>
        <TravelDemoGate>{children}</TravelDemoGate>
      </TravelDemoStoreProvider>
    </TravelDemoAuthProvider>
  );
}
