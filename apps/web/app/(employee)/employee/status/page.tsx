import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Lead Status' };

/** Sprint 3.0.8 — status updates live on the Pipeline board. */
export default function EmployeeStatusRedirect() {
  redirect('/employee/pipeline');
}
