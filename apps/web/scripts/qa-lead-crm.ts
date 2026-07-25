import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { prisma } from '../lib/db';

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

async function main() {
  loadEnvLocal();

  const enquiryCount = await prisma.enquiry.count();
  const latestEnquiry = await prisma.enquiry.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { id: true, reference: true, status: true },
  });
  const adminUserCount = await prisma.user.count({
    where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
  });

  console.log(
    JSON.stringify({ enquiryCount, latestEnquiry, adminUserCount }, null, 2),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
