import type { Prisma } from '@uandv/database';

export async function generateQuotationNumber(
  tx: Prisma.TransactionClient,
): Promise<string> {
  const year = new Date().getFullYear();

  const existing = await tx.quotationNumberSequence.findUnique({
    where: { year },
  });

  let nextNumber: number;

  if (!existing) {
    try {
      await tx.quotationNumberSequence.create({
        data: { year, lastNumber: 1 },
      });
      nextNumber = 1;
    } catch {
      const updated = await tx.quotationNumberSequence.update({
        where: { year },
        data: { lastNumber: { increment: 1 } },
      });
      nextNumber = updated.lastNumber;
    }
  } else {
    const updated = await tx.quotationNumberSequence.update({
      where: { year },
      data: { lastNumber: { increment: 1 } },
    });
    nextNumber = updated.lastNumber;
  }

  return `UV-QTN-${year}-${String(nextNumber).padStart(4, '0')}`;
}
