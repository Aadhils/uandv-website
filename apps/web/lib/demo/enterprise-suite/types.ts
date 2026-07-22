export type DemoRole = 'admin' | 'sales' | 'hr' | 'travel';

export type DemoSession = {
  role: DemoRole;
  userId: string;
  name: string;
  email: string;
  title: string;
  loggedInAt: string;
};

export const SUITE_CREDENTIALS = {
  admin: {
    email: 'admin@uandv.com',
    password: 'admin123',
    userId: 'USR-ADMIN',
    name: 'Priya Menon',
    title: 'Platform Admin',
  },
  sales: {
    email: 'sales@uandv.com',
    password: 'sales123',
    userId: 'USR-SALES',
    name: 'Karthik Rao',
    title: 'Sales Executive',
  },
  hr: {
    email: 'hr@uandv.com',
    password: 'hr123',
    userId: 'USR-HR',
    name: 'Anitha Selvan',
    title: 'HR Manager',
  },
  travel: {
    email: 'travel@uandv.com',
    password: 'travel123',
    userId: 'USR-TRAVEL',
    name: 'Nisha Varma',
    title: 'Travel Manager',
  },
} as const;

export const SUITE_DEMO_STORAGE_KEY = 'uandv-enterprise-suite-session-v1';
export const SUITE_MODULE_INTENT_KEY = 'uandv-enterprise-suite-module-intent';

export const homeForRole = (role: DemoRole) =>
  role === 'travel' ? '/demo/enterprise-suite/travel' : '/demo/enterprise-suite/dashboard';
