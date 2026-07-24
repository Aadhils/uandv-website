import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Work Updates' };

/** Sprint 3.0.8 — daily work updates live under Daily Report. */
export default function EmployeeWorkUpdatesRedirect() {
  redirect('/employee/reports');
}
