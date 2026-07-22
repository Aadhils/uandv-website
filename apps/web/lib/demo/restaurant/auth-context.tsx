'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  RESTAURANT_CREDENTIALS,
  RESTAURANT_DEMO_STORAGE_KEY,
  type RestaurantRole,
  type RestaurantSession,
} from './types';

type AuthContextValue = {
  session: RestaurantSession | null;
  ready: boolean;
  login: (
    email: string,
    password: string,
    role: RestaurantRole,
  ) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): RestaurantSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(RESTAURANT_DEMO_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RestaurantSession;
  } catch {
    return null;
  }
}

export function RestaurantDemoAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<RestaurantSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string, role: RestaurantRole) => {
    const normalized = email.trim().toLowerCase();
    const creds = RESTAURANT_CREDENTIALS[role];
    if (normalized !== creds.email || password !== creds.password) {
      return {
        ok: false as const,
        error: `Invalid ${role} credentials. Use ${creds.email} / ${creds.password}.`,
      };
    }
    const next: RestaurantSession = {
      role,
      name: creds.name,
      email: creds.email,
      loggedInAt: new Date().toISOString(),
    };
    window.localStorage.setItem(RESTAURANT_DEMO_STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(RESTAURANT_DEMO_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, ready, login, logout }),
    [session, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useRestaurantDemoAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useRestaurantDemoAuth must be used within RestaurantDemoAuthProvider');
  }
  return ctx;
}
