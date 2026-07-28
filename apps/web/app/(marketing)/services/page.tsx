import { redirect } from 'next/navigation';

/** Services index merged into Why U&V — permanent redirect handled in next.config. */
export default function ServicesPage() {
  redirect('/why-uandv#solutions');
}
