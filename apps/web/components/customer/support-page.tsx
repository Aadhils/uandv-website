import { CustomerPageHeader } from '@/components/customer/page-header';
import { SupportTicketCenter } from '@/components/lifecycle/support-ticket-center';
import { demoTickets } from '@/lib/customer';

export function CustomerSupportPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Support Ticket Center"
        description="Tickets, priorities, and conversation placeholders. No live messaging."
      />
      <SupportTicketCenter tickets={demoTickets} />
    </div>
  );
}
