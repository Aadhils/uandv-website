import { CustomerPageHeader } from '@/components/customer/page-header';
import { PaymentCenter } from '@/components/lifecycle/payment-center';
import { demoInvoices, demoPaymentSummary } from '@/lib/customer';

export function CustomerPaymentsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Payment Center"
        description="Invoice list and payment status. No payment gateway is integrated."
      />
      <PaymentCenter summary={demoPaymentSummary} invoices={demoInvoices} />
    </div>
  );
}
