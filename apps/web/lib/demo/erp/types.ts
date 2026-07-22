export type DemoRole = 'admin' | 'sales' | 'hr';

export type DemoSession = {
  role: DemoRole;
  userId: string;
  name: string;
  email: string;
  title: string;
  loggedInAt: string;
};

export type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  status: 'active' | 'inactive' | 'prospect';
  owner: string;
  lifetimeValue: number;
  openDeals: number;
  lastContact: string;
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  owner: string;
  createdAt: string;
};

export type FollowUp = {
  id: string;
  relatedTo: string;
  type: 'call' | 'email' | 'meeting' | 'whatsapp';
  dueDate: string;
  status: 'open' | 'done' | 'overdue';
  owner: string;
  note: string;
};

export type Quotation = {
  id: string;
  customer: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  validUntil: string;
  owner: string;
};

export type SalesOrder = {
  id: string;
  customer: string;
  amount: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  items: number;
};

export type Deal = {
  id: string;
  name: string;
  customer: string;
  stage: 'qualification' | 'proposal' | 'negotiation' | 'won' | 'lost';
  value: number;
  probability: number;
  owner: string;
  closeDate: string;
};

export type TaskItem = {
  id: string;
  title: string;
  relatedTo: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'done';
  dueDate: string;
  owner: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'call' | 'demo' | 'internal';
  attendees: string;
};

export type NoteItem = {
  id: string;
  title: string;
  body: string;
  relatedTo: string;
  author: string;
  updatedAt: string;
};

export type EmailEvent = {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  direction: 'inbound' | 'outbound';
  preview: string;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'on_leave' | 'exited';
  joinDate: string;
  salary: number;
};

export type AttendanceRow = {
  id: string;
  employee: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'late' | 'absent' | 'remote';
};

export type LeaveRequest = {
  id: string;
  employee: string;
  type: 'casual' | 'sick' | 'earned' | 'unpaid';
  from: string;
  to: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
};

export type PayrollRow = {
  id: string;
  employee: string;
  period: string;
  gross: number;
  deductions: number;
  net: number;
  status: 'draft' | 'processed' | 'paid';
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderLevel: number;
};

export type Category = {
  id: string;
  name: string;
  products: number;
  description: string;
};

export type PurchaseOrder = {
  id: string;
  supplier: string;
  amount: number;
  status: 'draft' | 'ordered' | 'received' | 'cancelled';
  orderDate: string;
  expectedDate: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  city: string;
  rating: number;
  openPos: number;
};

export type LedgerEntry = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  method: string;
};

export type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'void';
  issueDate: string;
  dueDate: string;
};

export type Payment = {
  id: string;
  invoiceId: string;
  customer: string;
  amount: number;
  method: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'invited' | 'disabled';
  lastLogin: string;
};

export type RoleItem = {
  id: string;
  name: string;
  users: number;
  description: string;
};

export type PermissionItem = {
  id: string;
  module: string;
  action: string;
  admin: boolean;
  sales: boolean;
  hr: boolean;
};

export const ERP_CREDENTIALS = {
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
} as const;

export const ERP_DEMO_STORAGE_KEY = 'uandv-erp-demo-session-v1';
