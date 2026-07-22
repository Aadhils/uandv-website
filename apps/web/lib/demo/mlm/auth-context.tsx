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
  MLM_ADMIN_CREDENTIALS,
  MLM_DEMO_STORAGE_KEY,
  MLM_MEMBER_CREDENTIALS,
  type DemoRole,
  type DemoSession,
} from './types';
import { demoAdminUser, demoCurrentUser } from './mock-data';

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
    const raw = window.localStorage.getItem(MLM_DEMO_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function MlmDemoAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string, role: DemoRole) => {
    const normalized = email.trim().toLowerCase();

    if (role === 'admin') {
      const valid =
        normalized === MLM_ADMIN_CREDENTIALS.email &&
        password === MLM_ADMIN_CREDENTIALS.password;
      if (!valid) {
        return {
          ok: false as const,
          error: 'Invalid admin credentials. Use admin@uandv.com / admin123.',
        };
      }
      const next: DemoSession = {
        role: 'admin',
        memberId: demoAdminUser.id,
        name: demoAdminUser.name,
        email: demoAdminUser.email,
        rank: demoAdminUser.rank,
        loggedInAt: new Date().toISOString(),
      };
      window.localStorage.setItem(MLM_DEMO_STORAGE_KEY, JSON.stringify(next));
      setSession(next);
      return { ok: true as const };
    }

    const validMember =
      (normalized === MLM_MEMBER_CREDENTIALS.email ||
        normalized === MLM_MEMBER_CREDENTIALS.memberId.toLowerCase()) &&
      password === MLM_MEMBER_CREDENTIALS.password;

    if (!validMember) {
      return {
        ok: false as const,
        error: 'Invalid member credentials. Use demo@uandv.com / demo123.',
      };
    }

    const next: DemoSession = {
      role: 'member',
      memberId: demoCurrentUser.id,
      name: demoCurrentUser.name,
      email: demoCurrentUser.email,
      rank: demoCurrentUser.rank,
      loggedInAt: new Date().toISOString(),
    };
    window.localStorage.setItem(MLM_DEMO_STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(MLM_DEMO_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, ready, login, logout }),
    [session, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useMlmDemoAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useMlmDemoAuth must be used within MlmDemoAuthProvider');
  }
  return ctx;
}
