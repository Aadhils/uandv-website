export type MemberStatus = 'active' | 'inactive' | 'pending';
export type DemoRole = 'admin' | 'member';

export type MlmMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  rank: string;
  status: MemberStatus;
  joinDate: string;
  sponsorId: string | null;
  leftVolume: number;
  rightVolume: number;
  personalVolume: number;
  referrals: number;
  avatarInitials: string;
};

export type BinaryNode = {
  id: string;
  name: string;
  rank: string;
  position: 'root' | 'left' | 'right';
  volume: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
};

export type WalletTransaction = {
  id: string;
  type: 'credit' | 'debit';
  category: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
  note: string;
};

export type IncomeRow = {
  id: string;
  period: string;
  binary: number;
  referral: number;
  matching: number;
  rankBonus: number;
  total: number;
};

export type CommissionRow = {
  id: string;
  date: string;
  type: string;
  fromMember: string;
  level: string;
  amount: number;
  status: 'paid' | 'processing' | 'held';
};

export type DemoSession = {
  role: DemoRole;
  memberId: string;
  name: string;
  email: string;
  rank: string;
  loggedInAt: string;
};

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  trend: string;
};

export type KycDocument = {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'rejected' | 'missing';
  updatedAt: string;
};

export type WithdrawRequest = {
  id: string;
  amount: number;
  method: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  requestedAt: string;
  note: string;
};

export type EpinItem = {
  id: string;
  code: string;
  packageName: string;
  status: 'unused' | 'used' | 'transferred';
  amount: number;
  createdAt: string;
};

export type ProductItem = {
  id: string;
  name: string;
  sku: string;
  price: number;
  bv: number;
  stock: number;
  category: string;
};

export type OrderItem = {
  id: string;
  date: string;
  product: string;
  qty: number;
  total: number;
  status: 'placed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  type: 'payout' | 'team' | 'kyc' | 'order' | 'system';
};

export const MLM_MEMBER_CREDENTIALS = {
  email: 'demo@uandv.com',
  password: 'demo123',
  memberId: 'UV1001',
} as const;

export const MLM_ADMIN_CREDENTIALS = {
  email: 'admin@uandv.com',
  password: 'admin123',
  memberId: 'ADMIN01',
} as const;

export const MLM_DEMO_STORAGE_KEY = 'uandv-mlm-demo-session-v2';
