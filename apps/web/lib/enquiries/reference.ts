import { randomBytes } from 'node:crypto';

/** Public enquiry reference shown to visitors, e.g. UV-A1B2C3 */
export function generateEnquiryReference() {
  const token = randomBytes(3).toString('hex').toUpperCase();
  return `UV-${token}`;
}
