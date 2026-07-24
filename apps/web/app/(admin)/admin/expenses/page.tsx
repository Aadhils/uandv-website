import type { Metadata } from 'next';

import { AdminExpensesPage } from '@/components/admin/expenses-page';

export const metadata: Metadata = { title: 'Expenses' };

export default function AdminExpensesRoute() {
  return <AdminExpensesPage />;
}
