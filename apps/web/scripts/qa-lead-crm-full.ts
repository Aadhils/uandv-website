import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { prisma } from '../lib/db';
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

const results: Array<{ name: string; pass: boolean; detail?: string }> = [];

function record(name: string, pass: boolean, detail?: string) {
  results.push({ name, pass, detail });
  const status = pass ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${name}${detail ? ` — ${detail}` : ''}`);
}

async function main() {
  loadEnvLocal();

  const promoteAdmin = process.argv.includes('--promote-admin');

  record('Database connection', true);
  const enquiryCount = await prisma.enquiry.count();
  record('Enquiries exist in database', enquiryCount > 0, `count=${enquiryCount}`);

  const statuses = await prisma.enquiry.groupBy({
    by: ['status'],
    _count: { _all: true },
  });
  record(
    'Enquiry statuses are valid enum values',
    statuses.every((row) =>
      ENQUIRY_STATUS_VALUES.includes(
        row.status as (typeof ENQUIRY_STATUS_VALUES)[number],
      ),
    ),
    statuses.map((row) => `${row.status}:${row._count._all}`).join(', '),
  );

  const latest = await prisma.enquiry.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  if (!latest) {
    record('Latest enquiry available for detail QA', false);
    return;
  }

  await ensureEnquiryTimelineSeed(prisma, latest);
  const detail = await prisma.enquiry.findUnique({
    where: { id: latest.id },
    include: { timelineEvents: { orderBy: { createdAt: 'desc' } } },
  });
  const mapped = detail ? mapEnquiryDetail(detail) : null;
  record(
    'Lead detail mapping + timeline seed',
    Boolean(mapped && mapped.timeline.length > 0),
    mapped?.reference,
  );

  const filtered = await prisma.enquiry.findMany({
    where: buildAdminEnquiryWhere({ q: latest.reference, sort: 'desc' }),
    take: 5,
  });
  record(
    'Search filter by reference',
    filtered.some((row) => row.id === latest.id),
    latest.reference,
  );

  const listRows = mapEnquiryListRows(
    await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  );
  record(
    'Lead list mapping includes required fields',
    listRows.every(
      (row) =>
        row.reference &&
        row.name &&
        row.email &&
        row.serviceLabel &&
        row.status &&
        row.createdAt,
    ),
    `rows=${listRows.length}`,
  );

  const previousStatus = latest.status;
  const nextStatus =
    previousStatus === 'NEW' ? 'CONTACTED' : ('NEW' as const);
  await prisma.enquiry.update({
    where: { id: latest.id },
    data: { status: nextStatus },
  });
  await prisma.enquiryTimelineEvent.create({
    data: {
      enquiryId: latest.id,
      type: 'status_change',
      title: `Status updated to ${ENQUIRY_STATUS_LABELS[nextStatus]}`,
      body: 'QA script status toggle',
      actorLabel: 'QA',
    },
  });
  await prisma.enquiry.update({
    where: { id: latest.id },
    data: { status: previousStatus },
  });
  record('Status update + timeline write', true, `${previousStatus}↔${nextStatus}`);

  const adminCount = await prisma.user.count({
    where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
  });
  if (promoteAdmin && adminCount === 0) {
    const candidate = await prisma.user.findFirst({ orderBy: { createdAt: 'asc' } });
    if (candidate) {
      await prisma.user.update({
        where: { id: candidate.id },
        data: { role: 'ADMIN' },
      });
      record('Promoted first user to ADMIN for local UI QA', true);
    } else {
      record('Promoted first user to ADMIN for local UI QA', false, 'no users');
    }
  } else {
    record(
      'Admin user available for UI QA',
      adminCount > 0,
      adminCount > 0 ? `count=${adminCount}` : 'run with --promote-admin after signup',
    );
  }

  const passed = results.filter((row) => row.pass).length;
  const failed = results.filter((row) => !row.pass).length;
  console.log(`\nQA summary: ${passed} passed, ${failed} failed`);
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
