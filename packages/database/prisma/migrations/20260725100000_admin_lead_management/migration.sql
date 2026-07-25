-- Expand enquiry status pipeline for admin lead management
CREATE TYPE "EnquiryStatus_new" AS ENUM (
  'NEW',
  'CONTACTED',
  'PROPOSAL_SENT',
  'NEGOTIATION',
  'PAYMENT_RECEIVED',
  'PROJECT_STARTED',
  'COMPLETED',
  'LOST'
);

ALTER TABLE "enquiries" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "enquiries"
ALTER COLUMN "status" TYPE "EnquiryStatus_new"
USING (
  CASE "status"::text
    WHEN 'NEW' THEN 'NEW'::"EnquiryStatus_new"
    WHEN 'CONTACTED' THEN 'CONTACTED'::"EnquiryStatus_new"
    WHEN 'QUALIFIED' THEN 'NEGOTIATION'::"EnquiryStatus_new"
    WHEN 'CLOSED' THEN 'COMPLETED'::"EnquiryStatus_new"
    ELSE 'NEW'::"EnquiryStatus_new"
  END
);

ALTER TABLE "enquiries"
ALTER COLUMN "status" SET DEFAULT 'NEW'::"EnquiryStatus_new";

DROP TYPE "EnquiryStatus";
ALTER TYPE "EnquiryStatus_new" RENAME TO "EnquiryStatus";

ALTER TABLE "enquiries" ADD COLUMN "internal_notes" TEXT;
ALTER TABLE "enquiries" ADD COLUMN "follow_up_date" TIMESTAMP(3);

CREATE TABLE "enquiry_timeline_events" (
  "id" TEXT NOT NULL,
  "enquiry_id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT,
  "actor_label" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "enquiry_timeline_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "enquiry_timeline_events_enquiry_id_created_at_idx"
ON "enquiry_timeline_events"("enquiry_id", "created_at");

ALTER TABLE "enquiry_timeline_events"
ADD CONSTRAINT "enquiry_timeline_events_enquiry_id_fkey"
FOREIGN KEY ("enquiry_id") REFERENCES "enquiries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
