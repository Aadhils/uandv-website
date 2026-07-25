-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QuotationDiscountType" AS ENUM ('NONE', 'PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "QuotationTaxType" AS ENUM ('NONE', 'GST', 'CUSTOM');

-- CreateEnum
CREATE TYPE "QuotationTimelineActorType" AS ENUM ('ADMIN', 'CUSTOMER', 'SYSTEM');

-- CreateTable
CREATE TABLE "quotation_number_sequences" (
    "year" INTEGER NOT NULL,
    "last_number" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quotation_number_sequences_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "quotations" (
    "id" TEXT NOT NULL,
    "quotation_number" TEXT NOT NULL,
    "lead_id" TEXT,
    "customer_id" TEXT,
    "customer_email" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_phone" TEXT,
    "customer_company" TEXT,
    "service_interest" TEXT,
    "lead_reference" TEXT,
    "title" TEXT NOT NULL,
    "introduction" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "subtotal" DECIMAL(14,2) NOT NULL,
    "discount_type" "QuotationDiscountType" NOT NULL DEFAULT 'NONE',
    "discount_value" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "discount_amount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "tax_type" "QuotationTaxType" NOT NULL DEFAULT 'GST',
    "tax_rate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "tax_amount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "grand_total" DECIMAL(14,2) NOT NULL,
    "validity_date" TIMESTAMP(3) NOT NULL,
    "status" "QuotationStatus" NOT NULL DEFAULT 'DRAFT',
    "internal_notes" TEXT,
    "customer_notes" TEXT,
    "terms_and_conditions" TEXT,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sent_at" TIMESTAMP(3),
    "viewed_at" TIMESTAMP(3),
    "accepted_at" TIMESTAMP(3),
    "rejected_at" TIMESTAMP(3),
    "rejection_reason" TEXT,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_items" (
    "id" TEXT NOT NULL,
    "quotation_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DECIMAL(14,4) NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'unit',
    "unit_price" DECIMAL(14,2) NOT NULL,
    "discount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "tax_rate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "line_total" DECIMAL(14,2) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quotation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotation_timeline_events" (
    "id" TEXT NOT NULL,
    "quotation_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor_type" "QuotationTimelineActorType" NOT NULL,
    "actor_id" TEXT,
    "actor_label" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quotation_timeline_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quotations_quotation_number_key" ON "quotations"("quotation_number");

-- CreateIndex
CREATE INDEX "quotations_lead_id_idx" ON "quotations"("lead_id");

-- CreateIndex
CREATE INDEX "quotations_customer_id_idx" ON "quotations"("customer_id");

-- CreateIndex
CREATE INDEX "quotations_customer_email_idx" ON "quotations"("customer_email");

-- CreateIndex
CREATE INDEX "quotations_status_idx" ON "quotations"("status");

-- CreateIndex
CREATE INDEX "quotations_created_at_idx" ON "quotations"("created_at");

-- CreateIndex
CREATE INDEX "quotations_validity_date_idx" ON "quotations"("validity_date");

-- CreateIndex
CREATE INDEX "quotation_items_quotation_id_sort_order_idx" ON "quotation_items"("quotation_id", "sort_order");

-- CreateIndex
CREATE INDEX "quotation_timeline_events_quotation_id_created_at_idx" ON "quotation_timeline_events"("quotation_id", "created_at");

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "enquiries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_items" ADD CONSTRAINT "quotation_items_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_timeline_events" ADD CONSTRAINT "quotation_timeline_events_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
