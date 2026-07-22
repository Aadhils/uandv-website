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
  ERP_CREDENTIALS,
  ERP_DEMO_STORAGE_KEY,
  type DemoRole,
  type DemoSession,
} from './types';

type AuthContextValue = {
  session: DemoSession | null;
  ready: boolean;
  login: (
    email: string,
    password: string,
    role: DemoRole,
  ) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): DemoSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(ERP_DEMO_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function ErpDemoAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string, role: DemoRole) => {
    const normalized = email.trim().toLowerCase();
    const creds = ERP_CREDENTIALS[role];
    const valid = normalized === creds.email && password === creds.password;
    if (!valid) {
      return {
        ok: false as const,
        error: `Invalid ${role} credentials. Use ${creds.email} / ${creds.password}.`,
      };
    }
    const next: DemoSession = {
      role,
      userId: creds.userId,
      name: creds.name,
      email: creds.email,
      title: creds.title,
      loggedInAt: new Date().toISOString(),
    };
    window.localStorage.setItem(ERP_DEMO_STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(ERP_DEMO_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, ready, login, logout }),
    [session, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useErpDemoAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useErpDemoAuth must be used within ErpDemoAuthProvider');
  }
  return ctx;
}
