-- Add secure public token for customer quotation links
ALTER TABLE "quotations" ADD COLUMN "public_token" TEXT;

UPDATE "quotations"
SET "public_token" = md5(random()::text || clock_timestamp()::text || "id")
WHERE "public_token" IS NULL;

ALTER TABLE "quotations" ALTER COLUMN "public_token" SET NOT NULL;

CREATE UNIQUE INDEX "quotations_public_token_key" ON "quotations"("public_token");
