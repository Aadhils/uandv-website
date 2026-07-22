'use client';

import type { ReactNode } from 'react';

import { RestaurantDemoAuthProvider } from '@/lib/demo/restaurant/auth-context';
import { RestaurantDemoStoreProvider } from '@/lib/demo/restaurant/store-context';

import { RestaurantDemoGate } from './gate';

export function RestaurantDemoProviders({ children }: { children: ReactNode }) {
  return (
    <RestaurantDemoAuthProvider>
      <RestaurantDemoStoreProvider>
        <RestaurantDemoGate>{children}</RestaurantDemoGate>
      </RestaurantDemoStoreProvider>
    </RestaurantDemoAuthProvider>
  );
}
