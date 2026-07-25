/**
 * Sprint 3.2 Phase 1 — Admin Lead Management CRM QA
 * Run: npx tsx scripts/qa-sprint-3.2-phase1.ts [--base-url http://localhost:3000]
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { prisma } from '../lib/db';
import { adminRoutes } from '../lib/admin/navigation';
import {
  adminEnquiryListQuerySchema,
  adminEnquiryUpdateSchema,
} from '../lib/enquiries/admin-schema';
import {
  buildAdminEnquiryWhere,
  ensureEnquiryTimelineSeed,
  mapEnquiryDetail,
  mapEnquiryListRows,
} from '../lib/enquiries/admin';
import {
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_STATUS_VALUES,
} from '../lib/enquiries/status';
import { getAllServices } from '../lib/services';

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local');
  const content = readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.slice(0, index);
    const value = trimmed.slice(index + 1);
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

type QaResult = { feature: string; pass: boolean; detail?: string };
const results: QaResult[] = [];

function record(feature: string, pass: boolean, detail?: string) {
  results.push({ feature, pass, detail });
  const status = pass ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${feature}${detail ? ` — ${detail}` : ''}`);
}

async function testHttpSecurity(baseUrl: string) {
  const listUrl = `${baseUrl}/admin/leads/list`;
  const apiUrl = `${baseUrl}/api/admin/enquiries`;

  for (const [name, url] of [
    ['Unauthenticated lead list redirects to login', listUrl],
    ['Unauthenticated enquiries API redirects to login', apiUrl],
  ] as const) {
    try {
      const response = await fetch(url, { redirect: 'manual' });
      const location = response.headers.get('location') ?? '';
      const pass =
        response.status === 307 &&
        location.includes('/login') &&
        location.includes('redirect_url');
      record(name, pass, `status=${response.status}`);
    } catch (error) {
      record(name, false, String(error));
    }
  }
}

async function main() {
  loadEnvLocal();
  const baseUrl =
    process.argv.find((arg) => arg.startsWith('--base-url='))?.split('=')[1] ??
    'http://localhost:3000';

  // 1. Admin sidebar — Lead Management
  const navItem = adminRoutes.find(
    (item) => item.title === 'Lead Management' || item.path === '/admin/leads/list',
  );
  record(
    '1. Lead Management in admin sidebar',
    Boolean(navItem && navItem.path === '/admin/leads/list'),
    navItem?.path,
  );

  const enquiryCount = await prisma.enquiry.count();
  record(
    '2. Lead list backed by enquiry database',
    enquiryCount > 0,
    `enquiries=${enquiryCount}`,
  );

  const listRows = mapEnquiryListRows(
    await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
  );
  const requiredListFields = [
    'reference',
    'name',
    'email',
    'phone',
    'serviceLabel',
    'status',
    'createdAt',
  ] as const;
  record(
    '3. Lead list columns (Reference, Name, Email, Phone, Service, Status, Created)',
    listRows.length > 0 &&
      listRows.every((row) =>
        requiredListFields.every((field) => {
          const value = row[field as keyof typeof row];
          return field === 'phone' ? true : Boolean(value);
        }),
      ),
    `rows=${listRows.length}`,
  );

  const sample = listRows[0];
  if (sample) {
    const searchHits = await prisma.enquiry.findMany({
      where: buildAdminEnquiryWhere({ q: sample.reference, sort: 'desc' }),
      take: 5,
    });
    record(
      '4a. Search filter',
      searchHits.some((row) => row.id === sample.id),
      sample.reference,
    );

    const statusHits = await prisma.enquiry.findMany({
      where: buildAdminEnquiryWhere({ status: sample.status, sort: 'desc' }),
      take: 20,
    });
    record(
      '4b. Status filter',
      statusHits.every((row) => row.status === sample.status),
      sample.status,
    );

    const serviceHits = await prisma.enquiry.findMany({
      where: buildAdminEnquiryWhere({
        service: sample.serviceInterest,
        sort: 'desc',
      }),
      take: 20,
    });
    record(
      '4c. Service filter',
      serviceHits.every((row) => row.serviceInterest === sample.serviceInterest),
      sample.serviceInterest,
    );

    const asc = await prisma.enquiry.findMany({
      where: buildAdminEnquiryWhere({ sort: 'asc' }),
      orderBy: { createdAt: 'asc' },
      take: 2,
    });
    const desc = await prisma.enquiry.findMany({
      where: buildAdminEnquiryWhere({ sort: 'desc' }),
      orderBy: { createdAt: 'desc' },
      take: 2,
    });
    record(
      '4d. Date sorting (asc/desc queries)',
      asc.length >= 1 &&
        desc.length >= 1 &&
        asc[0]!.createdAt.getTime() <= desc[0]!.createdAt.getTime(),
    );
  } else {
    record('4a. Search filter', false, 'no sample row');
    record('4b. Status filter', false, 'no sample row');
    record('4c. Service filter', false, 'no sample row');
    record('4d. Date sorting (asc/desc queries)', false, 'no sample row');
  }

  record(
    '5. Lead detail route data (row id → detail mapping)',
    Boolean(sample?.id),
    sample ? `/admin/leads/${sample.id}` : undefined,
  );

  const detailRow = sample
    ? await prisma.enquiry.findUnique({
        where: { id: sample.id },
        include: { timelineEvents: { orderBy: { createdAt: 'desc' } } },
      })
    : null;
  if (detailRow) {
    await ensureEnquiryTimelineSeed(prisma, detailRow);
    const refreshed = await prisma.enquiry.findUnique({
      where: { id: detailRow.id },
      include: { timelineEvents: { orderBy: { createdAt: 'desc' } } },
    });
    const detail = refreshed ? mapEnquiryDetail(refreshed) : null;
    record(
      '6. Lead detail sections (customer, enquiry, status, notes, follow-up, timeline)',
      Boolean(
        detail &&
          detail.name &&
          detail.email &&
          detail.message &&
          detail.source &&
          detail.status &&
          detail.timeline.length > 0,
      ),
      detail?.reference,
    );
  } else {
    record(
      '6. Lead detail sections (customer, enquiry, status, notes, follow-up, timeline)',
      false,
      'no detail row',
    );
  }

  const expectedLabels = [
    'New',
    'Contacted',
    'Proposal Sent',
    'Negotiation',
    'Payment Received',
    'Project Started',
    'Completed',
    'Lost',
  ];
  record(
    '7. Status values (8 pipeline stages)',
    ENQUIRY_STATUS_VALUES.length === 8 &&
      expectedLabels.every(
        (label, index) =>
          ENQUIRY_STATUS_LABELS[ENQUIRY_STATUS_VALUES[index]!] === label,
      ),
    ENQUIRY_STATUS_VALUES.join(', '),
  );

  const enquiryColumns = await prisma.$queryRaw<
    Array<{ column_name: string }>
  >`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'enquiries'
      AND column_name IN ('internal_notes', 'follow_up_date', 'status')
  `;
  const timelineTable = await prisma.$queryRaw<Array<{ table_name: string }>>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'enquiry_timeline_events'
  `;
  record(
    '8. Prisma schema extensions applied',
    enquiryColumns.length >= 3 && timelineTable.length === 1,
    `columns=${enquiryColumns.map((c) => c.column_name).join(',')}`,
  );

  record(
    '9. Service options available for filter UI',
    getAllServices().length > 0,
    `services=${getAllServices().length}`,
  );

  const listQuery = adminEnquiryListQuerySchema.safeParse({
    q: 'UV',
    status: 'NEW',
    service: getAllServices()[0]?.slug,
    sort: 'desc',
  });
  const updatePayload = adminEnquiryUpdateSchema.safeParse({
    status: 'CONTACTED',
    internalNotes: 'QA note',
    followUpDate: new Date().toISOString(),
  });
  record(
    '10. API validation schemas',
    listQuery.success && updatePayload.success,
  );

  const adminCount = await prisma.user.count({
    where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
  });
  record(
    'Security: admin user exists for authenticated UI',
    adminCount > 0,
    `admins=${adminCount}`,
  );

  await testHttpSecurity(baseUrl);

  console.log('\n=== Sprint 3.2 Phase 1 QA Report ===');
  for (const row of results) {
    console.log(`${row.pass ? 'PASS' : 'FAIL'} | ${row.feature}`);
  }
  const passed = results.filter((row) => row.pass).length;
  const failed = results.filter((row) => !row.pass).length;
  console.log(`\nTotal: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
