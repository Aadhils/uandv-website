import { readFileSync } from 'node:fs';
import path from 'node:path';

import PDFDocument from 'pdfkit';

import { formatInr, formatQuotationDate } from '@/lib/quotations/format';
import type { AdminQuotationDto } from '@/lib/quotations/mapper';
import { formatLocation, siteConfig } from '@/lib/site';

const BRAND_BLUE = '#2563eb';
const TEXT_DARK = '#0f172a';
const TEXT_MUTED = '#64748b';
const BORDER = '#e2e8f0';

function getLogoPath(): string | null {
  const candidates = [
    'public/android-chrome-192x192.png',
    'public/favicon-32x32.png',
  ];
  for (const relative of candidates) {
    const absolute = path.join(process.cwd(), relative);
    try {
      readFileSync(absolute);
      return absolute;
    } catch {
      // try next
    }
  }
  return null;
}

function drawSectionTitle(doc: InstanceType<typeof PDFDocument>, title: string, y: number) {
  doc
    .fillColor(BRAND_BLUE)
    .fontSize(11)
    .font('Helvetica-Bold')
    .text(title.toUpperCase(), 50, y);
  doc
    .moveTo(50, y + 16)
    .lineTo(545, y + 16)
    .strokeColor(BORDER)
    .lineWidth(1)
    .stroke();
}

function ensureSpace(doc: InstanceType<typeof PDFDocument>, needed: number): void {
  if (doc.y + needed > doc.page.height - 60) {
    doc.addPage();
  }
}

export type QuotationPdfInput = Pick<
  AdminQuotationDto,
  | 'quotationNumber'
  | 'title'
  | 'introduction'
  | 'customerName'
  | 'customerEmail'
  | 'customerPhone'
  | 'customerCompany'
  | 'serviceInterest'
  | 'leadReference'
  | 'validityDate'
  | 'subtotal'
  | 'discountAmount'
  | 'taxType'
  | 'taxRate'
  | 'taxAmount'
  | 'grandTotal'
  | 'customerNotes'
  | 'termsAndConditions'
  | 'items'
>;

export async function generateQuotationPdfBuffer(
  quotation: QuotationPdfInput,
): Promise<Buffer> {
  const logoPath = getLogoPath();

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      info: {
        Title: `Quotation ${quotation.quotationNumber}`,
        Author: siteConfig.legalName,
        Subject: quotation.title,
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    let headerY = 50;
    if (logoPath) {
      doc.image(logoPath, 50, headerY, { width: 48, height: 48 });
    }

    doc
      .fillColor(TEXT_DARK)
      .font('Helvetica-Bold')
      .fontSize(20)
      .text(siteConfig.legalName, logoPath ? 110 : 50, headerY);

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(TEXT_MUTED)
      .text(siteConfig.email, logoPath ? 110 : 50, headerY + 24)
      .text(formatLocation(), logoPath ? 110 : 50, headerY + 38)
      .text(siteConfig.url.replace(/^https?:\/\//, ''), logoPath ? 110 : 50, headerY + 52);

    doc
      .fillColor(BRAND_BLUE)
      .font('Helvetica-Bold')
      .fontSize(24)
      .text('QUOTATION', 360, headerY, { align: 'right', width: 185 });

    doc
      .fillColor(TEXT_DARK)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(quotation.quotationNumber, 360, headerY + 30, {
        align: 'right',
        width: 185,
      });

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(TEXT_MUTED)
      .text(`Valid until ${formatQuotationDate(quotation.validityDate)}`, 360, headerY + 48, {
        align: 'right',
        width: 185,
      });

    let y = headerY + 90;
    drawSectionTitle(doc, 'Customer details', y);
    y += 28;

    doc
      .fillColor(TEXT_DARK)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(quotation.customerName, 50, y);
    y += 16;

    doc.font('Helvetica').fontSize(10).fillColor(TEXT_MUTED);
    doc.text(quotation.customerEmail, 50, y);
    y += 14;
    if (quotation.customerPhone) {
      doc.text(quotation.customerPhone, 50, y);
      y += 14;
    }
    if (quotation.customerCompany) {
      doc.text(quotation.customerCompany, 50, y);
      y += 14;
    }
    if (quotation.serviceInterest) {
      doc.text(`Service: ${quotation.serviceInterest}`, 50, y);
      y += 14;
    }
    if (quotation.leadReference) {
      doc.text(`Reference: ${quotation.leadReference}`, 50, y);
      y += 14;
    }

    y += 12;
    drawSectionTitle(doc, quotation.title, y);
    y += 28;

    if (quotation.introduction) {
      doc
        .font('Helvetica')
        .fontSize(10)
        .fillColor(TEXT_MUTED)
        .text(quotation.introduction, 50, y, { width: 495 });
      y = doc.y + 16;
    }

    const tableTop = y;
    const colX = [50, 290, 340, 390, 460];
    doc.font('Helvetica-Bold').fontSize(9).fillColor(TEXT_MUTED);
    doc.text('Description', colX[0], tableTop);
    doc.text('Qty', colX[1], tableTop);
    doc.text('Unit', colX[2], tableTop);
    doc.text('Rate', colX[3], tableTop);
    doc.text('Total', colX[4], tableTop);

    doc
      .moveTo(50, tableTop + 14)
      .lineTo(545, tableTop + 14)
      .strokeColor(BORDER)
      .stroke();

    let rowY = tableTop + 22;
    doc.font('Helvetica').fontSize(9).fillColor(TEXT_DARK);

    for (const item of quotation.items) {
      ensureSpace(doc, 24);
      if (rowY > doc.page.height - 120) {
        doc.addPage();
        rowY = 50;
      }
      doc.text(item.description, colX[0], rowY, { width: 230 });
      doc.text(parseFloat(item.quantity).toString(), colX[1], rowY);
      doc.text(item.unit, colX[2], rowY);
      doc.text(formatInr(item.unitPrice), colX[3], rowY);
      doc.text(formatInr(item.lineTotal), colX[4], rowY);
      rowY += Math.max(18, doc.heightOfString(item.description, { width: 230 }) + 6);
    }

    ensureSpace(doc, 120);
    const totalsX = 360;
    let totalsY = rowY + 20;

    doc
      .moveTo(totalsX, totalsY - 8)
      .lineTo(545, totalsY - 8)
      .strokeColor(BORDER)
      .stroke();

    const totalRow = (label: string, value: string, bold = false) => {
      doc
        .font(bold ? 'Helvetica-Bold' : 'Helvetica')
        .fontSize(bold ? 12 : 10)
        .fillColor(bold ? TEXT_DARK : TEXT_MUTED)
        .text(label, totalsX, totalsY, { width: 100 })
        .text(value, totalsX + 100, totalsY, { align: 'right', width: 85 });
      totalsY += bold ? 22 : 16;
    };

    totalRow('Subtotal', formatInr(quotation.subtotal));
    totalRow('Discount', `-${formatInr(quotation.discountAmount)}`);
    totalRow(
      `${quotation.taxType} (${quotation.taxRate}%)`,
      formatInr(quotation.taxAmount),
    );
    totalRow('Grand total', formatInr(quotation.grandTotal), true);

    if (quotation.customerNotes) {
      ensureSpace(doc, 60);
      totalsY += 10;
      drawSectionTitle(doc, 'Notes', totalsY);
      totalsY += 28;
      doc
        .font('Helvetica')
        .fontSize(10)
        .fillColor(TEXT_MUTED)
        .text(quotation.customerNotes, 50, totalsY, { width: 495 });
      totalsY = doc.y + 12;
    }

    const terms =
      quotation.termsAndConditions?.trim() ||
      [
        'Prices are valid until the date shown above.',
        'Payment terms and delivery schedule will be confirmed upon acceptance.',
        'Scope changes may affect pricing and timelines.',
        `For questions, contact ${siteConfig.email}.`,
      ].join('\n');

    ensureSpace(doc, 80);
    drawSectionTitle(doc, 'Terms & conditions', totalsY + 10);
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(TEXT_MUTED)
      .text(terms, 50, totalsY + 38, { width: 495 });

    const footerY = doc.page.height - 40;
    doc
      .fontSize(8)
      .fillColor(TEXT_MUTED)
      .text(
        `${siteConfig.legalName} · ${siteConfig.email} · ${formatLocation()}`,
        50,
        footerY,
        { align: 'center', width: 495 },
      );

    doc.end();
  });
}

export function quotationPdfFilename(quotationNumber: string): string {
  return `${quotationNumber.replace(/[^a-zA-Z0-9-]+/g, '-')}.pdf`;
}
