import type { IconName } from '@uandv/ui';

import { serviceIndexCards } from '@/lib/service-index-cards';
import { getServiceBySlug } from '@/lib/services';
import { contactInquiryHref } from '@/lib/site';

export type WuvServiceGroupId =
  | 'build-digital-product'
  | 'run-business-better'
  | 'launch-and-grow'
  | 'industry-specific'
  | 'legal-support-partnership';

export type WuvServiceEntry = {
  id: string;
  title: string;
  problem: string;
  outcome: string;
  detailHref: string;
  icon: IconName;
};

export type WuvServiceGroup = {
  id: WuvServiceGroupId;
  title: string;
  services: WuvServiceEntry[];
};

function fromSlug(slug: string, titleOverride?: string): WuvServiceEntry {
  const service = getServiceBySlug(slug);
  const card = serviceIndexCards[slug];
  if (!service) {
    throw new Error(`Unknown service slug: ${slug}`);
  }
  return {
    id: slug,
    title: titleOverride ?? service.title,
    problem:
      card?.problem ??
      'You need a clearer path from today’s challenge to a working solution.',
    outcome: card?.outcome ?? service.summary,
    detailHref: `/services/${slug}`,
    icon: service.icon,
  };
}

function customEntry(
  id: string,
  title: string,
  problem: string,
  outcome: string,
  detailHref: string = contactInquiryHref,
  icon: IconName = 'MessageCircle',
): WuvServiceEntry {
  return { id, title, problem, outcome, detailHref, icon };
}

/** Grouped service catalog for the Why U&V discovery section. */
export const wuvServiceGroups: WuvServiceGroup[] = [
  {
    id: 'build-digital-product',
    title: 'Build Your Digital Product',
    services: [
      fromSlug('website-development'),
      fromSlug('mobile-app-development'),
      fromSlug('custom-software-development', 'Custom Software'),
      fromSlug('ai-automation'),
    ],
  },
  {
    id: 'run-business-better',
    title: 'Run Your Business Better',
    services: [
      fromSlug('erp-software', 'ERP & Operations'),
      fromSlug('crm-software', 'CRM & Sales'),
    ],
  },
  {
    id: 'launch-and-grow',
    title: 'Launch and Grow',
    services: [
      fromSlug('digital-marketing'),
      fromSlug('branding-logo-design', 'Branding and Business Growth'),
      fromSlug('startup-business-consulting', 'Startup Launch Support'),
      customEntry(
        'business-reactivation',
        'Business Re-activation Support',
        'Growth stalled or operations drifted — and restarting without a plan wastes time and budget.',
        'A structured review of your digital presence, systems, and priorities — then a practical path to momentum.',
        contactInquiryHref,
        'Sparkles',
      ),
    ],
  },
  {
    id: 'industry-specific',
    title: 'Industry-Specific Solutions',
    services: [
      fromSlug('mlm-software'),
      customEntry(
        'fintech-solutions',
        'FinTech Solutions',
        'Financial businesses need secure, compliant platforms — not generic tools that miss how you operate.',
        'Custom FinTech software: CRM, dashboards, client portals, mobile apps, and API integrations.',
        '/fintech',
        'Wallet',
      ),
      fromSlug('travel-tourism-software', 'Travel & Tourism Software'),
      fromSlug('hotel-restaurant-software', 'Hotel & Restaurant Software'),
      fromSlug('ecommerce-solutions', 'Food Delivery Platforms'),
      fromSlug('taxi-booking-software', 'Taxi, Bike, Auto & Car Booking'),
      customEntry(
        'school-management',
        'School Management Software',
        'Admissions, fees, attendance, and parent communication scattered across tools slow every term.',
        'A school platform connecting administration, teachers, students, and parents in one place.',
        contactInquiryHref,
        'GraduationCap',
      ),
      customEntry(
        'hospital-management',
        'Hospital Management Software',
        'Patient flow, records, and departmental coordination break down when systems do not talk.',
        'Healthcare operations software with privacy-sensitive workflows your staff can rely on daily.',
        contactInquiryHref,
        'HeartPulse',
      ),
    ],
  },
  {
    id: 'legal-support-partnership',
    title: 'Legal, Support and Long-Term Partnership',
    services: [
      fromSlug('business-registration-support', 'Company Registration'),
      customEntry(
        'legal-compliance',
        'Legal and Compliance Support',
        'Regulatory requirements feel overwhelming — and mistakes at setup cost you later.',
        'Guidance on structure, compliance steps, and the documentation your business needs to operate properly.',
        contactInquiryHref,
        'Lock',
      ),
      customEntry(
        'trademark-agreements',
        'Trademark and Agreements',
        'Your brand and contracts need protection — but legal paperwork is easy to postpone.',
        'Support for trademark filings, commercial agreements, and the records that protect what you build.',
        contactInquiryHref,
        'FileText',
      ),
      customEntry(
        'maintenance-support',
        'Maintenance and Long-Term Support',
        'Software without ongoing care becomes slow, insecure, and expensive to fix after something breaks.',
        'Post-launch maintenance, updates, monitoring, and a partner who stays when adoption matters most.',
        contactInquiryHref,
        'Wrench',
      ),
    ],
  },
];
