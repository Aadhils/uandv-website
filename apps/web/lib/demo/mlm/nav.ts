import type { IconName } from '@uandv/ui';

import type { DemoRole } from './types';

export type MlmNavItem = {
  label: string;
  href: string;
  icon: IconName;
  roles: DemoRole[];
};

export const mlmDemoNav: MlmNavItem[] = [
  { label: 'Dashboard', href: '/demo/mlm/dashboard', icon: 'Layers', roles: ['admin', 'member'] },
  { label: 'Member Profile', href: '/demo/mlm/profile', icon: 'User', roles: ['admin', 'member'] },
  { label: 'Binary Tree', href: '/demo/mlm/binary', icon: 'Workflow', roles: ['admin', 'member'] },
  { label: 'Referral Tree', href: '/demo/mlm/referral', icon: 'Network', roles: ['admin', 'member'] },
  { label: 'Downline List', href: '/demo/mlm/downline', icon: 'Users', roles: ['admin', 'member'] },
  { label: 'Wallet', href: '/demo/mlm/wallet', icon: 'Wallet', roles: ['admin', 'member'] },
  { label: 'Income Report', href: '/demo/mlm/income', icon: 'FileText', roles: ['admin', 'member'] },
  { label: 'Commission History', href: '/demo/mlm/commissions', icon: 'CreditCard', roles: ['admin', 'member'] },
  { label: 'KYC', href: '/demo/mlm/kyc', icon: 'FileText', roles: ['admin', 'member'] },
  { label: 'Withdraw Request', href: '/demo/mlm/withdraw', icon: 'Wallet', roles: ['admin', 'member'] },
  { label: 'E-Pin', href: '/demo/mlm/epin', icon: 'Sparkles', roles: ['admin', 'member'] },
  { label: 'Products', href: '/demo/mlm/products', icon: 'Package', roles: ['admin', 'member'] },
  { label: 'Orders', href: '/demo/mlm/orders', icon: 'ShoppingCart', roles: ['admin', 'member'] },
  { label: 'Notifications', href: '/demo/mlm/notifications', icon: 'Bell', roles: ['admin', 'member'] },
  { label: 'Settings', href: '/demo/mlm/settings', icon: 'Settings', roles: ['admin', 'member'] },
];

export function getNavForRole(role: DemoRole) {
  return mlmDemoNav.filter((item) => item.roles.includes(role));
}
