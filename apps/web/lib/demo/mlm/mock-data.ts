import type {
  BinaryNode,
  CommissionRow,
  DashboardStat,
  IncomeRow,
  MlmMember,
  WalletTransaction,
} from './types';

export const demoCurrentUser: MlmMember = {
  id: 'UV1001',
  name: 'Arun Kumar',
  email: 'demo@uandv.com',
  phone: '+91 ••••• •••54',
  rank: 'Silver Leader',
  status: 'active',
  joinDate: '2025-08-12',
  sponsorId: null,
  leftVolume: 18450,
  rightVolume: 16220,
  personalVolume: 2400,
  referrals: 12,
  avatarInitials: 'AK',
};

export const demoMembers: MlmMember[] = [
  demoCurrentUser,
  {
    id: 'UV1002',
    name: 'Priya Nair',
    email: 'priya.demo@uandv.com',
    phone: '+91 ••••• •••21',
    rank: 'Builder',
    status: 'active',
    joinDate: '2025-09-02',
    sponsorId: 'UV1001',
    leftVolume: 6200,
    rightVolume: 4100,
    personalVolume: 900,
    referrals: 4,
    avatarInitials: 'PN',
  },
  {
    id: 'UV1003',
    name: 'Vikram Shah',
    email: 'vikram.demo@uandv.com',
    phone: '+91 ••••• •••88',
    rank: 'Builder',
    status: 'active',
    joinDate: '2025-09-08',
    sponsorId: 'UV1001',
    leftVolume: 5100,
    rightVolume: 7300,
    personalVolume: 1100,
    referrals: 5,
    avatarInitials: 'VS',
  },
  {
    id: 'UV1004',
    name: 'Meera Iyer',
    email: 'meera.demo@uandv.com',
    phone: '+91 ••••• •••44',
    rank: 'Starter',
    status: 'active',
    joinDate: '2025-10-01',
    sponsorId: 'UV1002',
    leftVolume: 1800,
    rightVolume: 900,
    personalVolume: 600,
    referrals: 2,
    avatarInitials: 'MI',
  },
  {
    id: 'UV1005',
    name: 'Rahul Das',
    email: 'rahul.demo@uandv.com',
    phone: '+91 ••••• •••09',
    rank: 'Starter',
    status: 'pending',
    joinDate: '2025-10-14',
    sponsorId: 'UV1002',
    leftVolume: 0,
    rightVolume: 400,
    personalVolume: 300,
    referrals: 0,
    avatarInitials: 'RD',
  },
  {
    id: 'UV1006',
    name: 'Sana Rahman',
    email: 'sana.demo@uandv.com',
    phone: '+91 ••••• •••67',
    rank: 'Starter',
    status: 'active',
    joinDate: '2025-10-18',
    sponsorId: 'UV1003',
    leftVolume: 2200,
    rightVolume: 1500,
    personalVolume: 500,
    referrals: 1,
    avatarInitials: 'SR',
  },
  {
    id: 'UV1007',
    name: 'Joseph Fernandez',
    email: 'joseph.demo@uandv.com',
    phone: '+91 ••••• •••33',
    rank: 'Builder',
    status: 'active',
    joinDate: '2025-11-03',
    sponsorId: 'UV1003',
    leftVolume: 3400,
    rightVolume: 2800,
    personalVolume: 800,
    referrals: 3,
    avatarInitials: 'JF',
  },
  {
    id: 'UV1008',
    name: 'Ananya Bose',
    email: 'ananya.demo@uandv.com',
    phone: '+91 ••••• •••15',
    rank: 'Starter',
    status: 'inactive',
    joinDate: '2025-11-20',
    sponsorId: 'UV1004',
    leftVolume: 0,
    rightVolume: 0,
    personalVolume: 0,
    referrals: 0,
    avatarInitials: 'AB',
  },
  {
    id: 'UV1009',
    name: 'Karthik R',
    email: 'karthik.demo@uandv.com',
    phone: '+91 ••••• •••72',
    rank: 'Starter',
    status: 'active',
    joinDate: '2025-12-05',
    sponsorId: 'UV1007',
    leftVolume: 700,
    rightVolume: 1100,
    personalVolume: 450,
    referrals: 1,
    avatarInitials: 'KR',
  },
  {
    id: 'UV1010',
    name: 'Divya Menon',
    email: 'divya.demo@uandv.com',
    phone: '+91 ••••• •••50',
    rank: 'Starter',
    status: 'active',
    joinDate: '2026-01-11',
    sponsorId: 'UV1006',
    leftVolume: 300,
    rightVolume: 0,
    personalVolume: 350,
    referrals: 0,
    avatarInitials: 'DM',
  },
];

export const demoBinaryTree: BinaryNode = {
  id: 'UV1001',
  name: 'Arun Kumar',
  rank: 'Silver Leader',
  position: 'root',
  volume: 34670,
  left: {
    id: 'UV1002',
    name: 'Priya Nair',
    rank: 'Builder',
    position: 'left',
    volume: 10300,
    left: {
      id: 'UV1004',
      name: 'Meera Iyer',
      rank: 'Starter',
      position: 'left',
      volume: 2700,
      left: {
        id: 'UV1008',
        name: 'Ananya Bose',
        rank: 'Starter',
        position: 'left',
        volume: 0,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      id: 'UV1005',
      name: 'Rahul Das',
      rank: 'Starter',
      position: 'right',
      volume: 400,
      left: null,
      right: null,
    },
  },
  right: {
    id: 'UV1003',
    name: 'Vikram Shah',
    rank: 'Builder',
    position: 'right',
    volume: 12400,
    left: {
      id: 'UV1006',
      name: 'Sana Rahman',
      rank: 'Starter',
      position: 'left',
      volume: 3700,
      left: {
        id: 'UV1010',
        name: 'Divya Menon',
        rank: 'Starter',
        position: 'left',
        volume: 300,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      id: 'UV1007',
      name: 'Joseph Fernandez',
      rank: 'Builder',
      position: 'right',
      volume: 6200,
      left: {
        id: 'UV1009',
        name: 'Karthik R',
        rank: 'Starter',
        position: 'left',
        volume: 1800,
        left: null,
        right: null,
      },
      right: null,
    },
  },
};

export const demoWallet = {
  availableBalance: 12840.5,
  pendingBalance: 2150,
  lifetimeEarnings: 89420.75,
  currency: 'INR',
  transactions: [
    {
      id: 'TXN-9041',
      type: 'credit',
      category: 'Binary commission',
      amount: 1850,
      status: 'completed',
      date: '2026-07-18',
      reference: 'BIN-0718',
      note: 'Pairing payout for week 29',
    },
    {
      id: 'TXN-9038',
      type: 'credit',
      category: 'Referral bonus',
      amount: 600,
      status: 'completed',
      date: '2026-07-16',
      reference: 'REF-UV1010',
      note: 'Direct referral — Divya Menon',
    },
    {
      id: 'TXN-9032',
      type: 'debit',
      category: 'Withdrawal',
      amount: 5000,
      status: 'completed',
      date: '2026-07-12',
      reference: 'WD-4412',
      note: 'Bank transfer request',
    },
    {
      id: 'TXN-9027',
      type: 'credit',
      category: 'Matching bonus',
      amount: 920,
      status: 'pending',
      date: '2026-07-10',
      reference: 'MAT-0710',
      note: 'Awaiting weekly settlement',
    },
    {
      id: 'TXN-9019',
      type: 'credit',
      category: 'Rank bonus',
      amount: 2500,
      status: 'completed',
      date: '2026-07-01',
      reference: 'RNK-SILVER',
      note: 'Silver Leader achievement',
    },
    {
      id: 'TXN-9011',
      type: 'debit',
      category: 'Wallet transfer',
      amount: 300,
      status: 'failed',
      date: '2026-06-28',
      reference: 'TRF-8821',
      note: 'Insufficient verification — demo fail state',
    },
  ] satisfies WalletTransaction[],
};

export const demoIncomeReport: IncomeRow[] = [
  {
    id: 'INC-2026-07',
    period: 'Jul 2026',
    binary: 4200,
    referral: 1800,
    matching: 1450,
    rankBonus: 2500,
    total: 9950,
  },
  {
    id: 'INC-2026-06',
    period: 'Jun 2026',
    binary: 5100,
    referral: 1200,
    matching: 1680,
    rankBonus: 0,
    total: 7980,
  },
  {
    id: 'INC-2026-05',
    period: 'May 2026',
    binary: 3800,
    referral: 2400,
    matching: 990,
    rankBonus: 0,
    total: 7190,
  },
  {
    id: 'INC-2026-04',
    period: 'Apr 2026',
    binary: 2950,
    referral: 900,
    matching: 760,
    rankBonus: 0,
    total: 4610,
  },
  {
    id: 'INC-2026-03',
    period: 'Mar 2026',
    binary: 3400,
    referral: 1500,
    matching: 1100,
    rankBonus: 0,
    total: 6000,
  },
  {
    id: 'INC-2026-02',
    period: 'Feb 2026',
    binary: 2100,
    referral: 600,
    matching: 420,
    rankBonus: 0,
    total: 3120,
  },
];

export const demoCommissions: CommissionRow[] = [
  {
    id: 'COM-781',
    date: '2026-07-18',
    type: 'Binary',
    fromMember: 'Team volume pair',
    level: 'Pair 12',
    amount: 1850,
    status: 'paid',
  },
  {
    id: 'COM-776',
    date: '2026-07-16',
    type: 'Referral',
    fromMember: 'Divya Menon (UV1010)',
    level: 'Direct',
    amount: 600,
    status: 'paid',
  },
  {
    id: 'COM-769',
    date: '2026-07-14',
    type: 'Matching',
    fromMember: 'Priya Nair (UV1002)',
    level: 'L1',
    amount: 420,
    status: 'processing',
  },
  {
    id: 'COM-761',
    date: '2026-07-10',
    type: 'Matching',
    fromMember: 'Vikram Shah (UV1003)',
    level: 'L1',
    amount: 500,
    status: 'held',
  },
  {
    id: 'COM-752',
    date: '2026-07-08',
    type: 'Binary',
    fromMember: 'Team volume pair',
    level: 'Pair 11',
    amount: 1600,
    status: 'paid',
  },
  {
    id: 'COM-741',
    date: '2026-07-01',
    type: 'Rank bonus',
    fromMember: 'System',
    level: 'Silver',
    amount: 2500,
    status: 'paid',
  },
  {
    id: 'COM-733',
    date: '2026-06-28',
    type: 'Referral',
    fromMember: 'Karthik R (UV1009)',
    level: 'Direct',
    amount: 600,
    status: 'paid',
  },
  {
    id: 'COM-720',
    date: '2026-06-22',
    type: 'Binary',
    fromMember: 'Team volume pair',
    level: 'Pair 10',
    amount: 1450,
    status: 'paid',
  },
];

export const demoDashboardStats: DashboardStat[] = [
  {
    id: 'balance',
    label: 'Wallet balance',
    value: '₹12,840.50',
    hint: 'Available to withdraw',
    trend: '+₹2,450 this week',
  },
  {
    id: 'team',
    label: 'Team size',
    value: '12',
    hint: 'Direct + downline',
    trend: '+2 this month',
  },
  {
    id: 'left',
    label: 'Left volume',
    value: '18,450',
    hint: 'Binary left leg',
    trend: 'Pairing ready',
  },
  {
    id: 'right',
    label: 'Right volume',
    value: '16,220',
    hint: 'Binary right leg',
    trend: 'Needs 2,230 to pair',
  },
];

export const demoReferral = {
  code: 'UV1001-AK',
  link: 'https://demo.uandv.com/join/UV1001-AK',
  clicks: 148,
  signups: 12,
  conversionRate: '8.1%',
  leftOpenSlots: 1,
  rightOpenSlots: 0,
};

export const demoSettings = {
  notifications: {
    emailPayouts: true,
    smsOtp: true,
    whatsappUpdates: true,
    weeklyDigest: false,
  },
  security: {
    twoFactor: false,
    loginAlerts: true,
  },
  preferences: {
    language: 'English',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
  },
};

export const demoAdminUser = {
  id: 'ADMIN01',
  name: 'U&V Admin',
  email: 'admin@uandv.com',
  rank: 'Platform Admin',
  avatarInitials: 'UA',
};

export const demoKycDocuments = [
  {
    id: 'KYC-ID',
    name: 'Government ID',
    status: 'verified' as const,
    updatedAt: '2026-06-12',
  },
  {
    id: 'KYC-ADDR',
    name: 'Address proof',
    status: 'verified' as const,
    updatedAt: '2026-06-12',
  },
  {
    id: 'KYC-PAN',
    name: 'Tax ID / PAN',
    status: 'pending' as const,
    updatedAt: '2026-07-10',
  },
  {
    id: 'KYC-BANK',
    name: 'Bank account',
    status: 'missing' as const,
    updatedAt: '—',
  },
];

export const demoWithdrawRequests = [
  {
    id: 'WD-4412',
    amount: 5000,
    method: 'Bank transfer',
    status: 'paid' as const,
    requestedAt: '2026-07-12',
    note: 'July payout',
  },
  {
    id: 'WD-4488',
    amount: 2500,
    method: 'UPI',
    status: 'pending' as const,
    requestedAt: '2026-07-20',
    note: 'Awaiting admin review',
  },
  {
    id: 'WD-4390',
    amount: 1200,
    method: 'Bank transfer',
    status: 'rejected' as const,
    requestedAt: '2026-07-02',
    note: 'KYC bank details incomplete',
  },
];

export const demoEpins = [
  {
    id: 'EP-901',
    code: 'UV-EPIN-8F2A91',
    packageName: 'Starter Pack',
    status: 'unused' as const,
    amount: 2999,
    createdAt: '2026-07-15',
  },
  {
    id: 'EP-902',
    code: 'UV-EPIN-44C1B2',
    packageName: 'Builder Pack',
    status: 'used' as const,
    amount: 5999,
    createdAt: '2026-07-01',
  },
  {
    id: 'EP-903',
    code: 'UV-EPIN-77D0E3',
    packageName: 'Starter Pack',
    status: 'transferred' as const,
    amount: 2999,
    createdAt: '2026-06-22',
  },
];

export const demoProducts = [
  {
    id: 'PRD-01',
    name: 'Wellness Starter Kit',
    sku: 'WSK-100',
    price: 2999,
    bv: 100,
    stock: 240,
    category: 'Starter',
  },
  {
    id: 'PRD-02',
    name: 'Builder Bundle',
    sku: 'BB-250',
    price: 5999,
    bv: 250,
    stock: 120,
    category: 'Growth',
  },
  {
    id: 'PRD-03',
    name: 'Leadership Pack',
    sku: 'LP-500',
    price: 11999,
    bv: 500,
    stock: 48,
    category: 'Leadership',
  },
  {
    id: 'PRD-04',
    name: 'Reorder Essentials',
    sku: 'RE-80',
    price: 1499,
    bv: 80,
    stock: 510,
    category: 'Reorder',
  },
];

export const demoOrders = [
  {
    id: 'ORD-7781',
    date: '2026-07-18',
    product: 'Wellness Starter Kit',
    qty: 1,
    total: 2999,
    status: 'delivered' as const,
  },
  {
    id: 'ORD-7760',
    date: '2026-07-10',
    product: 'Builder Bundle',
    qty: 1,
    total: 5999,
    status: 'shipped' as const,
  },
  {
    id: 'ORD-7722',
    date: '2026-07-02',
    product: 'Reorder Essentials',
    qty: 2,
    total: 2998,
    status: 'placed' as const,
  },
  {
    id: 'ORD-7701',
    date: '2026-06-28',
    product: 'Leadership Pack',
    qty: 1,
    total: 11999,
    status: 'cancelled' as const,
  },
];

export const demoNotifications = [
  {
    id: 'NTF-1',
    title: 'Commission credited',
    body: 'Binary commission ₹1,850 was added to your wallet.',
    date: '2026-07-18',
    read: false,
    type: 'payout' as const,
  },
  {
    id: 'NTF-2',
    title: 'New downline joined',
    body: 'Divya Menon joined under your referral link.',
    date: '2026-07-16',
    read: false,
    type: 'team' as const,
  },
  {
    id: 'NTF-3',
    title: 'KYC pending',
    body: 'Tax ID / PAN verification is awaiting review.',
    date: '2026-07-10',
    read: true,
    type: 'kyc' as const,
  },
  {
    id: 'NTF-4',
    title: 'Order shipped',
    body: 'Builder Bundle ORD-7760 is on the way.',
    date: '2026-07-11',
    read: true,
    type: 'order' as const,
  },
  {
    id: 'NTF-5',
    title: 'System notice',
    body: 'Weekly payout cycle runs every Friday 18:00 IST (demo).',
    date: '2026-07-08',
    read: true,
    type: 'system' as const,
  },
];

export const demoAdminStats = [
  { id: 'members', label: 'Active members', value: '1,284', hint: 'Demo network size', trend: '+42 this month' },
  { id: 'pending-kyc', label: 'Pending KYC', value: '37', hint: 'Needs review', trend: 'Admin queue' },
  { id: 'withdrawals', label: 'Open withdrawals', value: '18', hint: 'Awaiting approval', trend: '₹2.4L pending' },
  { id: 'orders', label: 'Orders today', value: '96', hint: 'Mock commerce volume', trend: '+12 vs yesterday' },
];

export function getMemberById(id: string) {
  return demoMembers.find((member) => member.id === id);
}

export function getDownline(memberId: string) {
  return demoMembers.filter((member) => member.sponsorId === memberId);
}

export function getAllDownlineFlat(rootId: string) {
  const result: MlmMember[] = [];
  const queue = [rootId];
  while (queue.length) {
    const current = queue.shift()!;
    const children = getDownline(current);
    for (const child of children) {
      result.push(child);
      queue.push(child.id);
    }
  }
  return result;
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}
