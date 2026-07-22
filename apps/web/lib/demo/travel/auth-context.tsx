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
  TRAVEL_CREDENTIALS,
  TRAVEL_DEMO_STORAGE_KEY,
  type TravelRole,
  type TravelSession,
} from './types';

type AuthContextValue = {
  session: TravelSession | null;
  ready: boolean;
  login: (
    email: string,
    password: string,
    role: TravelRole,
  ) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): TravelSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(TRAVEL_DEMO_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TravelSession;
  } catch {
    return null;
  }
}

export function TravelDemoAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<TravelSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string, role: TravelRole) => {
    const normalized = email.trim().toLowerCase();
    const creds = TRAVEL_CREDENTIALS[role];
    if (normalized !== creds.email || password !== creds.password) {
      return {
        ok: false as const,
        error: `Invalid ${role} credentials. Use ${creds.email} / ${creds.password}.`,
      };
    }
    const next: TravelSession = {
      role,
      name: creds.name,
      email: creds.email,
      loggedInAt: new Date().toISOString(),
    };
    window.localStorage.setItem(TRAVEL_DEMO_STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TRAVEL_DEMO_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, ready, login, logout }),
    [session, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useTravelDemoAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useTravelDemoAuth must be used within TravelDemoAuthProvider');
  return ctx;
}
