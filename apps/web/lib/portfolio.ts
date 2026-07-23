import type { IconName } from '@uandv/ui';

import type { ServiceIllustrationKey } from './services';

export type PortfolioCategory =
  | 'All'
  | 'Website Development'
  | 'Mobile Apps'
  | 'MLM Software'
  | 'ERP Systems'
  | 'CRM Solutions'
  | 'Restaurant POS'
  | 'Taxi Booking'
  | 'Travel & Tourism'
  | 'Hospital Management'
  | 'School ERP'
  | 'AI Automation'
  | 'E-Commerce';

/**
 * Verified public interactive demo entry routes under `app/demo/*`.
 * Only these may be used as portfolio Live Demo targets.
 */
export const VALIDATED_LIVE_DEMO_ROUTES = [
  '/demo/restaurant-platform',
  '/demo/mlm',
  '/demo/smart-mobility',
  '/demo/enterprise-suite',
  '/demo/travel',
  '/demo/hotel-management',
] as const;

export type LiveDemoHref = (typeof VALIDATED_LIVE_DEMO_ROUTES)[number];

export type CaseStudy = {
  slug: string;
  title: string;
  /** Generic business type — never a real company name */
  businessType: string;
  industry: string;
  category: Exclude<PortfolioCategory, 'All'>;
  services: string[];
  relatedServiceSlugs: string[];
  summary: string;
  objective: string;
  challenge: string[];
  solution: string[];
  features: { title: string; description: string }[];
  technologies: string[];
  process: { title: string; description: string }[];
  /** Qualitative expected value — no fake metrics */
  outcomes: { title: string; description: string }[];
  /** Illustrative concept timeline for the demo */
  timeline: { phase: string; duration: string; description: string }[];
  visuals: { label: string; caption: string }[];
  illustration: ServiceIllustrationKey;
  icon: IconName;
  featured?: boolean;
  /**
   * Optional interactive product demo route.
   * Must be one of VALIDATED_LIVE_DEMO_ROUTES — omit when no demo exists.
   */
  liveDemoHref?: LiveDemoHref;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export function getValidatedLiveDemoHref(
  href: string | undefined | null,
): LiveDemoHref | undefined {
  if (!href) return undefined;
  return (VALIDATED_LIVE_DEMO_ROUTES as readonly string[]).includes(href)
    ? (href as LiveDemoHref)
    : undefined;
}

export function hasLiveDemo(study: Pick<CaseStudy, 'liveDemoHref'>): boolean {
  return Boolean(getValidatedLiveDemoHref(study.liveDemoHref));
}

export const DEMO_PROJECT_LABEL = 'Product Demo';

export const portfolioCategories: PortfolioCategory[] = [
  'All',
  'Website Development',
  'Mobile Apps',
  'MLM Software',
  'ERP Systems',
  'CRM Solutions',
  'Restaurant POS',
  'Taxi Booking',
  'Travel & Tourism',
  'Hospital Management',
  'School ERP',
  'AI Automation',
  'E-Commerce',
];

export const portfolioTechnologies = [
  { title: 'Next.js', icon: 'Globe' as IconName },
  { title: 'React', icon: 'Code2' as IconName },
  { title: 'Flutter', icon: 'Smartphone' as IconName },
  { title: 'Node.js', icon: 'Cpu' as IconName },
  { title: 'Python', icon: 'Workflow' as IconName },
  { title: 'Firebase', icon: 'Database' as IconName },
  { title: 'PostgreSQL', icon: 'Database' as IconName },
  { title: 'AI', icon: 'Sparkles' as IconName },
  { title: 'OpenAI', icon: 'Bot' as IconName },
  { title: 'Claude', icon: 'Bot' as IconName },
];

export const portfolioProcess = [
  {
    title: 'Discovery',
    description: 'Clarify goals, users, constraints, and success criteria.',
  },
  {
    title: 'Planning',
    description: 'Shape scope, architecture options, milestones, and risks.',
  },
  {
    title: 'UI/UX',
    description: 'Design clear flows, information architecture, and interfaces.',
  },
  {
    title: 'Development',
    description: 'Build production-minded software with accountable ownership.',
  },
  {
    title: 'Testing',
    description: 'Validate quality, edge cases, security, and readiness.',
  },
  {
    title: 'Deployment',
    description: 'Ship with controlled rollout, documentation, and go-live support.',
  },
  {
    title: 'Support',
    description: 'Stabilize adoption and improve continuously after launch.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'restaurant-ordering-platform',
    title: 'Restaurant, Food Delivery & POS Platform',
    businessType: 'Multi-outlet restaurant, cloud kitchen & delivery group',
    industry: 'Food & hospitality',
    category: 'Restaurant POS',
    services: [
      'Website & mobile apps',
      'Custom software',
      'Hotel & restaurant software',
    ],
    relatedServiceSlugs: [
      'hotel-restaurant-software',
      'mobile-app-development',
      'website-development',
    ],
    summary:
      'An interactive platform concept covering customer ordering, dine-in QR menus, restaurant dashboards, POS, kitchen display, delivery partner apps, inventory, and multi-outlet admin controls.',
    objective:
      'Show how U&V can deliver a complete restaurant, cloud kitchen, food delivery, multi-outlet, and dine-in operations platform in one Product Demo — Mock Data experience.',
    challenge: [
      'Restaurants needed one story for customer apps, POS, kitchen, and delivery — not disconnected screenshots.',
      'Cloud kitchens and multi-outlet chains needed shared menu, inventory, and admin visibility.',
      'Prospects wanted a working order lifecycle from cart to kitchen to rider handoff.',
    ],
    solution: [
      'Build role-based demos for customer, restaurant manager, kitchen, delivery partner, and admin.',
      'Connect ordering, dine-in QR, POS tickets, kitchen lanes, and delivery OTP flows with shared mock state.',
      'Add inventory, offers, reviews, support/refunds, and platform commercial settings.',
    ],
    features: [
      {
        title: 'Customer ordering',
        description:
          'Restaurant listing, filters, customization, cart, coupons, payments, tracking, history, and reorder.',
      },
      {
        title: 'Dine-in QR menu',
        description:
          'Table selection, QR ordering, waiter request, split bill, pay-at-table, and feedback.',
      },
      {
        title: 'Restaurant dashboard',
        description:
          'Orders, revenue, tables, menu/pricing, staff, offers, reviews, and sales reports.',
      },
      {
        title: 'POS & kitchen display',
        description:
          'Dine-in/takeaway/delivery tickets, hold/resume, bill preview, KDS timers, and item status.',
      },
      {
        title: 'Delivery partner app',
        description:
          'Online toggle, accept/reject, mock navigation, OTP verification, earnings, and wallet.',
      },
      {
        title: 'Inventory & multi-outlet admin',
        description:
          'Stock alerts, purchase orders, suppliers, commissions, zones, promos, refunds, and analytics.',
      },
    ],
    technologies: [
      'Next.js',
      'React',
      'Node.js',
      'PostgreSQL',
      'Realtime updates',
      'Payments',
    ],
    process: [
      {
        title: 'Discover',
        description:
          'Map guest, floor, kitchen, POS, and delivery handoffs across peak service.',
      },
      {
        title: 'Design',
        description:
          'Define role workspaces, order states, menu modifiers, and inventory rules.',
      },
      {
        title: 'Build',
        description:
          'Implement interactive ordering, POS, KDS, delivery, and admin with mock JSON.',
      },
      {
        title: 'Pilot & refine',
        description:
          'Validate lifecycle demos and tighten edge cases before wider rollout conversations.',
      },
    ],
    outcomes: [
      {
        title: 'End-to-end platform story',
        description:
          'Prospects can walk a mock order from customer cart through kitchen and delivery.',
      },
      {
        title: 'Clearer multi-outlet scope',
        description:
          'Manager, POS, inventory, and admin views make chain delivery easier to prioritize.',
      },
      {
        title: 'Faster sales demos',
        description:
          'Role logins replace slideware for restaurants, cloud kitchens, and delivery businesses.',
      },
    ],
    timeline: [
      {
        phase: 'Discovery & workflow mapping',
        duration: '1–2 weeks',
        description: 'Observe service flow and define the ordering state model.',
      },
      {
        phase: 'UX & architecture',
        duration: '2–3 weeks',
        description: 'Finalize guest, kitchen, POS, delivery, and admin journeys.',
      },
      {
        phase: 'Build & integrations',
        duration: '8–12 weeks',
        description: 'Deliver core ordering, KDS, POS, delivery, and inventory modules.',
      },
      {
        phase: 'Pilot support',
        duration: '2–4 weeks',
        description: 'Stabilize during live service scenarios and document playbooks.',
      },
    ],
    visuals: [
      {
        label: 'Customer ordering',
        caption: 'Restaurant listing, cart, and live mock tracking.',
      },
      {
        label: 'POS & kitchen board',
        caption: 'Ticket building and preparation lanes with timers.',
      },
      {
        label: 'Delivery & admin',
        caption: 'Rider OTP flow and multi-outlet platform controls.',
      },
    ],
    illustration: 'hospitality',
    icon: 'UtensilsCrossed',
    featured: true,
    liveDemoHref: '/demo/restaurant-platform',
    seo: {
      title: 'Product Demo: Restaurant, Food Delivery & POS Platform | U&V Portfolio',
      description:
        'Interactive restaurant platform demo with customer ordering, dine-in QR, POS, kitchen display, delivery partner app, inventory, and multi-outlet admin — mock data only.',
      keywords: [
        'restaurant POS software demo',
        'food delivery platform demo',
        'kitchen display system demo',
        'dine-in QR ordering software',
      ],
    },
  },
  {
    slug: 'travel-booking-website',
    title: 'Travel Booking Website',
    businessType: 'Tour operator and travel packages brand',
    industry: 'Travel & tourism',
    category: 'Travel & Tourism',
    services: ['Website development', 'Custom software', 'Digital marketing'],
    relatedServiceSlugs: [
      'travel-tourism-software',
      'website-development',
      'digital-marketing',
    ],
    summary:
      'A concept booking website for packages, itineraries, and inquiry-to-reservation flows built for seasonal travel demand.',
    objective:
      'Help travelers evaluate packages clearly and give the operations team a structured booking pipeline.',
    challenge: [
      'Package details lived across PDFs, WhatsApp replies, and outdated web pages.',
      'Inquiries arrived without enough context, creating slow back-and-forth before confirmation.',
      'Seasonal campaigns needed landing experiences that matched offer messaging.',
    ],
    solution: [
      'Build a package catalog with itinerary clarity, inclusions, and booking intent paths.',
      'Capture structured inquiries that feed a simple operations queue.',
      'Prepare SEO and campaign landing foundations so traffic can convert into conversations.',
    ],
    features: [
      {
        title: 'Package catalog',
        description:
          'Destination collections with pricing context, inclusions, and departure windows.',
      },
      {
        title: 'Itinerary presentation',
        description:
          'Day-wise plans that help travelers understand what they are buying.',
      },
      {
        title: 'Inquiry & booking forms',
        description:
          'Structured requests that reduce incomplete lead details.',
      },
      {
        title: 'Operations queue',
        description:
          'A simple admin view for follow-ups, statuses, and reservation notes.',
      },
      {
        title: 'Campaign landing support',
        description:
          'Pages designed to match seasonal offers and paid traffic messaging.',
      },
      {
        title: 'SEO foundations',
        description:
          'Indexable package structure and metadata ready for long-term discovery.',
      },
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'SEO',
      'Analytics',
      'WhatsApp handoff',
    ],
    process: [
      {
        title: 'Discover',
        description:
          'Audit current package presentation and inquiry handling.',
      },
      {
        title: 'Information architecture',
        description:
          'Define catalog structure, filters, and conversion paths.',
      },
      {
        title: 'Build',
        description:
          'Implement website, forms, and operations tools with content templates.',
      },
      {
        title: 'Launch readiness',
        description:
          'Wire analytics, train the team, and prepare campaign entry points.',
      },
    ],
    outcomes: [
      {
        title: 'Clearer package understanding',
        description:
          'Travelers can evaluate itineraries without relying only on PDFs and chats.',
      },
      {
        title: 'Higher-quality inquiries',
        description:
          'Structured forms give the team the context needed for faster follow-up.',
      },
      {
        title: 'Campaign-ready pages',
        description:
          'Seasonal offers can land on focused experiences instead of a generic homepage.',
      },
    ],
    timeline: [
      {
        phase: 'Discovery & content model',
        duration: '1–2 weeks',
        description: 'Define package fields and booking intent paths.',
      },
      {
        phase: 'Design & IA',
        duration: '2–3 weeks',
        description: 'Finalize catalog UX and operations requirements.',
      },
      {
        phase: 'Build',
        duration: '5–8 weeks',
        description: 'Deliver website, inquiry flows, and admin queue.',
      },
      {
        phase: 'Launch support',
        duration: '1–2 weeks',
        description: 'Analytics checks and team handover.',
      },
    ],
    visuals: [
      {
        label: 'Package listing',
        caption: 'Concept placeholder for destination and package cards.',
      },
      {
        label: 'Itinerary detail',
        caption: 'Concept placeholder for day-wise trip presentation.',
      },
      {
        label: 'Inquiry flow',
        caption: 'Concept placeholder for booking request form.',
      },
    ],
    illustration: 'travel',
    icon: 'Plane',
    featured: true,
    seo: {
      title: 'Demo Case Study: Travel Booking Website | U&V Portfolio',
      description:
        'Demo project concept for a travel booking website with package catalogs, itineraries, and inquiry-to-reservation flows.',
      keywords: [
        'travel booking website demo',
        'tour package website',
        'tourism software case study',
        'travel inquiry system concept',
      ],
    },
  },
  {
    slug: 'mlm-management-software',
    title: 'MLM Management Software',
    businessType: 'Network marketing organization',
    industry: 'Network marketing',
    category: 'MLM Software',
    services: ['Custom software', 'Mobile app development', 'AI automation readiness'],
    relatedServiceSlugs: [
      'mlm-software',
      'custom-software-development',
      'mobile-app-development',
    ],
    summary:
      'A concept platform for genealogy visibility, commission logic, member dashboards, and payout workflows with auditability.',
    objective:
      'Give members transparent earnings views while giving admins reliable controls for plans, wallets, and support.',
    challenge: [
      'Commission calculations were difficult to explain and hard to audit after plan changes.',
      'Members needed mobile-friendly visibility into team structure and wallet status.',
      'Support teams spent too much time reconstructing payout history from spreadsheets.',
    ],
    solution: [
      'Model genealogy and compensation rules in a system designed for explainability.',
      'Provide member dashboards for earnings, ranks, and downline context.',
      'Add admin tools for configuration, payout approvals, and investigation trails.',
    ],
    features: [
      {
        title: 'Genealogy tree views',
        description:
          'Sponsor and downline visibility with roles that match plan design.',
      },
      {
        title: 'Commission engine',
        description:
          'Configurable plan logic with calculation history for audits.',
      },
      {
        title: 'Member dashboard',
        description:
          'Earnings, wallet balance, announcements, and progress indicators.',
      },
      {
        title: 'Payout workflows',
        description:
          'Withdrawal requests with approval steps and status tracking.',
      },
      {
        title: 'Admin configuration',
        description:
          'Plan settings, member support tools, and operational reports.',
      },
      {
        title: 'Mobile access',
        description:
          'Distributor-friendly experiences for on-the-go network activity.',
      },
    ],
    technologies: [
      'Node.js',
      'PostgreSQL',
      'React',
      'Queue workers',
      'Secure auth',
      'Reporting',
    ],
    process: [
      {
        title: 'Plan modeling',
        description:
          'Document compensation rules, edge cases, and compliance needs.',
      },
      {
        title: 'Architecture',
        description:
          'Design calculation, wallet, and admin permission boundaries.',
      },
      {
        title: 'Build & validate',
        description:
          'Implement core modules and verify sample network scenarios.',
      },
      {
        title: 'Operational hardening',
        description:
          'Add audit trails, training materials, and controlled rollout steps.',
      },
    ],
    outcomes: [
      {
        title: 'Explainable payouts',
        description:
          'Members and admins can trace how earnings were calculated.',
      },
      {
        title: 'Lower support load',
        description:
          'Self-serve dashboards reduce repetitive status questions.',
      },
      {
        title: 'Safer plan changes',
        description:
          'Configurable rules with history make adjustments less fragile.',
      },
    ],
    timeline: [
      {
        phase: 'Compensation modeling',
        duration: '2–3 weeks',
        description: 'Capture plan rules and validation scenarios.',
      },
      {
        phase: 'System design',
        duration: '2 weeks',
        description: 'Finalize data model and permission architecture.',
      },
      {
        phase: 'Core build',
        duration: '8–12 weeks',
        description: 'Deliver genealogy, commissions, wallets, and dashboards.',
      },
      {
        phase: 'Pilot payouts',
        duration: '2–4 weeks',
        description: 'Run controlled cycles and refine audit tooling.',
      },
    ],
    visuals: [
      {
        label: 'Genealogy view',
        caption: 'Concept placeholder for network tree visualization.',
      },
      {
        label: 'Member earnings',
        caption: 'Concept placeholder for wallet and commission summary.',
      },
      {
        label: 'Admin payout console',
        caption: 'Concept placeholder for approval workflows.',
      },
    ],
    illustration: 'mlm',
    icon: 'Network',
    featured: true,
    liveDemoHref: '/demo/mlm',
    seo: {
      title: 'Product Demo: MLM Management Software | U&V Portfolio',
      description:
        'Interactive MLM software demo with admin/member login, genealogy, wallet, commissions, KYC, e-pin, products, and orders.',
      keywords: [
        'MLM software demo',
        'network marketing platform demo',
        'commission management demo',
        'genealogy software demo',
      ],
    },
  },
  {
    slug: 'taxi-booking-application',
    title: 'Smart Mobility Platform',
    businessType: 'Multi-vehicle mobility operator',
    industry: 'Mobility',
    category: 'Taxi Booking',
    services: [
      'Mobile app development',
      'Custom software',
      'Realtime operations tooling',
    ],
    relatedServiceSlugs: [
      'taxi-booking-software',
      'mobile-app-development',
      'custom-software-development',
    ],
    summary:
      'A unified smart mobility platform for Bike Taxi, Auto Rickshaw booking, Cab/Car booking, Rental Vehicles, Parcel Delivery, Driver Partner App, and Admin & Fleet Management.',
    objective:
      'Give operators one production-minded system for multi-vehicle booking, partner apps, and fleet control instead of disconnected single-mode tools.',
    challenge: [
      'Demand spanned bike, auto, cab, rental, and parcel — but tools were fragmented by vehicle type.',
      'Riders lacked reliable trip status after a vehicle was assigned.',
      'Operations needed one console for drivers, fares, zones, promos, and fleet utilization.',
    ],
    solution: [
      'Create a customer booking experience with multi-category vehicle selection and fare estimates.',
      'Equip drivers with online status, ride offers, trip controls, earnings, and document status.',
      'Provide an admin dashboard for rides, partners, fares, promos, zones, fleet, and support.',
    ],
    features: [
      {
        title: 'Multi-vehicle booking',
        description:
          'Bike, Auto, Mini Cab, Sedan, SUV, Rental, and Parcel Delivery in one flow.',
      },
      {
        title: 'Driver partner app',
        description:
          'Online/offline, accept/reject, start/complete trip, earnings, and compliance.',
      },
      {
        title: 'Admin & fleet console',
        description:
          'Rides, drivers, customers, fares, promos, zones, fleet assets, and tickets.',
      },
      {
        title: 'Live trip lifecycle',
        description:
          'Search, assign, track, OTP, SOS, payment, and completion states.',
      },
      {
        title: 'Corporate & fleet lanes',
        description:
          'Support for corporate travel policies and partner fleet operations.',
      },
      {
        title: 'Interactive product demo',
        description:
          'Explore a working frontend demo at /demo/smart-mobility with mock data.',
      },
    ],
    technologies: [
      'React Native / Flutter',
      'Next.js',
      'Node.js',
      'Maps & GPS APIs',
      'PostgreSQL',
      'Realtime updates',
      'Payments',
    ],
    process: [
      {
        title: 'Operations mapping',
        description:
          'Document booking, assignment, and exception handling across vehicle modes.',
      },
      {
        title: 'Product design',
        description:
          'Define rider, driver, and admin journeys for launch scope.',
      },
      {
        title: 'Build',
        description:
          'Implement apps, backend hooks, maps, and notification/payment integrations.',
      },
      {
        title: 'Fleet pilot',
        description:
          'Run with a controlled set of vehicles and refine before expansion.',
      },
    ],
    outcomes: [
      {
        title: 'One platform, many modes',
        description:
          'Bike, auto, cab, rental, and parcel share a coherent booking and ops model.',
      },
      {
        title: 'Better rider confidence',
        description:
          'Trip status, OTP, and partner details make waits clearer.',
      },
      {
        title: 'Operational visibility',
        description:
          'Admin teams can manage fares, zones, fleets, and support from one console.',
      },
    ],
    timeline: [
      {
        phase: 'Discovery',
        duration: '2 weeks',
        description: 'Map multi-vehicle operations and fare logic.',
      },
      {
        phase: 'UX & architecture',
        duration: '2–3 weeks',
        description: 'Finalize customer, driver, and admin journeys.',
      },
      {
        phase: 'Build',
        duration: '8–14 weeks',
        description: 'Deliver booking, partner, and ops experiences.',
      },
      {
        phase: 'Pilot',
        duration: '3–5 weeks',
        description: 'Stabilize with a limited fleet before wider rollout.',
      },
    ],
    visuals: [
      {
        label: 'Customer booking',
        caption: 'Multi-vehicle selection and fare estimate screen.',
      },
      {
        label: 'Driver job card',
        caption: 'Incoming request and trip control surfaces.',
      },
      {
        label: 'Admin console',
        caption: 'Fleet, fare, and ride management overview.',
      },
    ],
    illustration: 'taxi',
    icon: 'Car',
    featured: true,
    liveDemoHref: '/demo/smart-mobility',
    seo: {
      title: 'Product Demo: Smart Mobility Platform | U&V Portfolio',
      description:
        'Smart mobility platform demo covering Bike, Auto, Cab, Rental, Parcel Delivery, Driver Partner App, and Admin & Fleet Management.',
      keywords: [
        'smart mobility platform demo',
        'bike auto cab booking software',
        'parcel delivery app demo',
        'fleet management mobility',
        'driver partner app',
      ],
    },
  },
  {
    slug: 'enterprise-erp-crm-software',
    title: 'Enterprise ERP & CRM Suite',
    businessType: 'Multi-department mid-market enterprise',
    industry: 'Enterprise operations',
    category: 'ERP Systems',
    services: ['ERP software', 'CRM', 'Custom software'],
    relatedServiceSlugs: [
      'erp-software',
      'crm-software',
      'custom-software-development',
    ],
    summary:
      'An interactive enterprise suite covering CRM, HR, inventory, accounting, admin controls, and connected travel operations in one product demo.',
    objective:
      'Give sales, HR, operations, and travel teams one shared system for customers, people, stock, finance, and bookings.',
    challenge: [
      'Customer, inventory, payroll, and travel booking data lived in disconnected tools.',
      'Sales leadership lacked a reliable pipeline and quotation trail.',
      'Managers needed role-aware dashboards without exposing every module to every user.',
    ],
    solution: [
      'Unify CRM, HR, inventory, accounting, and travel modules behind shared navigation.',
      'Provide Admin, Sales, HR, and Travel Manager demo personas with scoped access.',
      'Surface operational charts, queues, and reports from mock enterprise data.',
    ],
    features: [
      {
        title: 'Customer & CRM suite',
        description:
          'Leads, customers, follow-ups, quotations, pipeline, deals, tasks, and communication timeline.',
      },
      {
        title: 'HR operations',
        description:
          'Employees, departments, attendance, leave management, and payroll overview.',
      },
      {
        title: 'Inventory & purchase',
        description:
          'Products, categories, stock, purchase orders, suppliers, and low-stock alerts.',
      },
      {
        title: 'Accounting & settlements',
        description:
          'Income, expenses, invoices, payments, receipts, P&L, and travel/agent settlements.',
      },
      {
        title: 'Role-based admin',
        description:
          'Users, roles, permissions, branches, tax, currency, notifications, and audit log.',
      },
      {
        title: 'Enterprise dashboard',
        description:
          'Charts and queues tailored to the signed-in persona, including travel KPIs.',
      },
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL-ready design',
      'Role-based access',
      'Reporting views',
    ],
    process: [
      {
        title: 'Module mapping',
        description: 'Define CRM, HR, inventory, finance, and travel boundaries.',
      },
      {
        title: 'Role design',
        description: 'Shape Admin, Sales, HR, and Travel Manager permission scopes.',
      },
      {
        title: 'Interactive demo build',
        description: 'Ship navigable screens with mock enterprise datasets.',
      },
      {
        title: 'Walkthrough readiness',
        description: 'Validate flows for sales, people, operations, and travel demos.',
      },
    ],
    outcomes: [
      {
        title: 'One workspace story',
        description:
          'Prospects can explore ERP, CRM, and travel operations together instead of isolated decks.',
      },
      {
        title: 'Clear ownership',
        description:
          'Role-based navigation shows how teams would actually use the product.',
      },
      {
        title: 'Faster scoping',
        description:
          'Module coverage helps conversations move from concept to delivery plan.',
      },
    ],
    timeline: [
      {
        phase: 'Discovery & module map',
        duration: '2–3 weeks',
        description: 'Capture process owners and priority modules.',
      },
      {
        phase: 'Information architecture',
        duration: '2 weeks',
        description: 'Finalize navigation, roles, and reporting needs.',
      },
      {
        phase: 'Core build',
        duration: '10–14 weeks',
        description: 'Deliver CRM, HR, inventory, accounting, and travel foundations.',
      },
      {
        phase: 'Pilot & training',
        duration: '2–4 weeks',
        description: 'Run department pilots and refine permissions.',
      },
    ],
    visuals: [
      {
        label: 'Enterprise dashboard',
        caption: 'Charts and operational queues for leadership.',
      },
      {
        label: 'CRM pipeline',
        caption: 'Stage board for qualification through close.',
      },
      {
        label: 'Travel operations',
        caption: 'Packages, bookings, and settlement views in one suite.',
      },
    ],
    illustration: 'erp',
    icon: 'Building2',
    featured: true,
    liveDemoHref: '/demo/enterprise-suite',
    seo: {
      title: 'Product Demo: Enterprise ERP & CRM Suite | U&V Portfolio',
      description:
        'Interactive enterprise suite demo with Admin/Sales/HR/Travel login, CRM, HR, inventory, accounting, and travel operations.',
      keywords: [
        'ERP CRM demo',
        'enterprise ERP software demo',
        'CRM pipeline demo',
        'enterprise suite travel ERP demo',
      ],
    },
  },
  {
    slug: 'travel-tourism-management-suite',
    title: 'Travel & Tourism Platform',
    businessType: 'Travel marketplace and agency platform',
    industry: 'Travel & tourism',
    category: 'Travel & Tourism',
    services: [
      'Travel & tourism software',
      'Custom software',
      'Web applications',
    ],
    relatedServiceSlugs: [
      'travel-tourism-software',
      'custom-software-development',
      'web-application-development',
    ],
    summary:
      'An interactive travel booking platform concept with customer portal, package explorer, hotels, flights, visa, insurance, car rental, sightseeing, wallet, offers, admin revenue controls, and a travel agent dashboard.',
    objective:
      'Show how travelers, agents, and admins can work in one Product Demo — Mock Data platform from search to confirmation.',
    challenge: [
      'Travel brands needed a premium booking story beyond a static landing page.',
      'Customer, agent, and admin journeys were usually demonstrated in disconnected decks.',
      'Prospects wanted searchable hotels, fare cards, packages, and mock checkout in one place.',
    ],
    solution: [
      'Build a role-based frontend demo for traveler, agent, and admin personas.',
      'Cover flights, trains, buses, hotels, packages, visa, insurance, car rental, and sightseeing.',
      'Add wallet, offers, mock checkout, confirmation, admin reports, and agent commission flows.',
    ],
    features: [
      {
        title: 'Customer portal',
        description:
          'Flight, train, bus, hotel, packages, visa, insurance, car rental, sightseeing, history, wallet, and offers.',
      },
      {
        title: 'Package explorer',
        description:
          'Domestic, international, honeymoon, family, adventure, and pilgrimage tours with itineraries.',
      },
      {
        title: 'Hotel & flight modules',
        description:
          'Hotel search/filters/rooms/gallery plus one-way, round-trip, and multi-city fare cards.',
      },
      {
        title: 'Mock checkout',
        description:
          'Traveler details, promo codes, UPI/card/wallet payment simulation, and confirmation.',
      },
      {
        title: 'Admin panel',
        description:
          'Customers, bookings, packages, hotels, flights, reports, and revenue dashboard.',
      },
      {
        title: 'Travel agent dashboard',
        description:
          'Booking requests, customer management, commission, and payment settlement status.',
      },
    ],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'TypeScript',
      'Role-based access',
    ],
    process: [
      {
        title: 'Journey mapping',
        description: 'Define traveler, agent, and admin paths from search to settlement.',
      },
      {
        title: 'Catalog & fare model',
        description: 'Shape packages, hotels, flights, and add-on services for demo inventory.',
      },
      {
        title: 'Interactive demo build',
        description: 'Ship searchable modules, checkout, and role dashboards with mock JSON.',
      },
      {
        title: 'Walkthrough readiness',
        description: 'Validate filters, booking state, and portfolio Live Demo entry.',
      },
    ],
    outcomes: [
      {
        title: 'Premium product story',
        description:
          'Prospects can book mock trips end-to-end instead of reviewing a landing page only.',
      },
      {
        title: 'Multi-persona clarity',
        description:
          'Traveler, agent, and admin views make delivery scope easier to discuss.',
      },
      {
        title: 'Faster scoping',
        description:
          'Module breadth helps travel businesses prioritize portal vs operations phases.',
      },
    ],
    timeline: [
      {
        phase: 'Discovery',
        duration: '2 weeks',
        description: 'Map booking lanes and role permissions.',
      },
      {
        phase: 'Design',
        duration: '2–3 weeks',
        description: 'Finalize portal IA, search forms, and dashboards.',
      },
      {
        phase: 'Build',
        duration: '8–12 weeks',
        description: 'Deliver booking modules, checkout, admin, and agent views.',
      },
      {
        phase: 'Pilot',
        duration: '2–3 weeks',
        description: 'Run demo walkthroughs and refine conversion flows.',
      },
    ],
    visuals: [
      {
        label: 'Customer portal',
        caption: 'Service grid, wallet, offers, and upcoming bookings.',
      },
      {
        label: 'Search & packages',
        caption: 'Flights, hotels, and holiday package explorer.',
      },
      {
        label: 'Admin & agent',
        caption: 'Revenue dashboard and commission request queues.',
      },
    ],
    illustration: 'travel',
    icon: 'Plane',
    featured: true,
    liveDemoHref: '/demo/travel',
    seo: {
      title: 'Product Demo: Travel & Tourism Platform | U&V Portfolio',
      description:
        'Interactive travel booking platform demo with customer portal, packages, hotels, flights, visa, wallet, admin, and agent dashboards — mock data only.',
      keywords: [
        'travel booking platform demo',
        'holiday package software demo',
        'hotel flight booking demo',
        'travel agent dashboard demo',
      ],
    },
  },
  {
    slug: 'business-erp-system',
    title: 'Business ERP System',
    businessType: 'Growing wholesale and distribution business',
    industry: 'Enterprise operations',
    category: 'ERP Systems',
    services: ['ERP software', 'Custom software', 'Systems integration'],
    relatedServiceSlugs: [
      'erp-software',
      'custom-software-development',
      'crm-software',
    ],
    summary:
      'A concept ERP for inventory, purchasing, sales orders, and operational reporting that replaces fragmented spreadsheets.',
    objective:
      'Create one operational source of truth across stock, purchasing, and order fulfillment.',
    challenge: [
      'Inventory counts differed between warehouse notes and sales spreadsheets.',
      'Purchase and sales teams lacked a shared status model for open orders.',
      'Leadership reporting required manual consolidation at week’s end.',
    ],
    solution: [
      'Implement modular ERP workflows for inventory, purchasing, and sales.',
      'Introduce role-based dashboards for warehouse, sales, and management.',
      'Phase rollout so teams adopt modules without freezing daily work.',
    ],
    features: [
      {
        title: 'Inventory control',
        description:
          'Stock movements, low-stock signals, and location-aware quantities.',
      },
      {
        title: 'Purchase orders',
        description:
          'Supplier orders with receiving states and linked inventory updates.',
      },
      {
        title: 'Sales order workflow',
        description:
          'Order capture through fulfillment status with clearer ownership.',
      },
      {
        title: 'Role dashboards',
        description:
          'Views tailored for warehouse, sales, and leadership needs.',
      },
      {
        title: 'Operational reports',
        description:
          'Exports and summaries that reduce weekend spreadsheet assembly.',
      },
      {
        title: 'Integration hooks',
        description:
          'Ready paths for accounting, ecommerce, or CRM connections later.',
      },
    ],
    technologies: [
      'NestJS',
      'PostgreSQL',
      'React dashboards',
      'Reporting',
      'API integrations',
      'Cloud hosting',
    ],
    process: [
      {
        title: 'Systems audit',
        description:
          'Inventory current tools, data quality, and module priorities.',
      },
      {
        title: 'Blueprint',
        description:
          'Define phased ERP scope, migration approach, and training plan.',
      },
      {
        title: 'Configure & build',
        description:
          'Deliver modules with validation against real operational scenarios.',
      },
      {
        title: 'Phased go-live',
        description:
          'Roll out by team, stabilize reporting, and document processes.',
      },
    ],
    outcomes: [
      {
        title: 'Shared operational data',
        description:
          'Teams work from one inventory and order picture instead of conflicting files.',
      },
      {
        title: 'Cleaner purchasing cycles',
        description:
          'Receiving and stock updates stay connected to purchase activity.',
      },
      {
        title: 'Faster leadership visibility',
        description:
          'Core reports become available without manual week-end collation.',
      },
    ],
    timeline: [
      {
        phase: 'Audit & prioritization',
        duration: '2–3 weeks',
        description: 'Choose first modules and migration approach.',
      },
      {
        phase: 'Design & data model',
        duration: '2–4 weeks',
        description: 'Finalize workflows and role permissions.',
      },
      {
        phase: 'Module delivery',
        duration: '10–16 weeks',
        description: 'Build and validate inventory, purchasing, and sales flows.',
      },
      {
        phase: 'Phased adoption',
        duration: '3–6 weeks',
        description: 'Train teams and stabilize after each module launch.',
      },
    ],
    visuals: [
      {
        label: 'Inventory dashboard',
        caption: 'Concept placeholder for stock and movement overview.',
      },
      {
        label: 'Order workflow',
        caption: 'Concept placeholder for sales and fulfillment states.',
      },
      {
        label: 'Management report',
        caption: 'Concept placeholder for operational summary views.',
      },
    ],
    illustration: 'erp',
    icon: 'Layers',
    seo: {
      title: 'Demo Case Study: Business ERP System | U&V Portfolio',
      description:
        'Demo project concept for a business ERP system covering inventory, purchasing, sales orders, and reporting.',
      keywords: [
        'ERP system demo',
        'inventory ERP case study',
        'business operations software concept',
        'wholesale ERP demo',
      ],
    },
  },
  {
    slug: 'ecommerce-store',
    title: 'E-Commerce Store',
    businessType: 'D2C product brand',
    industry: 'Retail & commerce',
    category: 'E-Commerce',
    services: [
      'E-commerce solutions',
      'Website development',
      'Digital marketing',
    ],
    relatedServiceSlugs: [
      'ecommerce-solutions',
      'website-development',
      'digital-marketing',
    ],
    summary:
      'A concept online store with catalog UX, checkout, order operations, and SEO foundations for brand-owned commerce.',
    objective:
      'Launch a conversion-focused storefront that the team can operate without relying only on marketplaces.',
    challenge: [
      'Marketplace dependence limited brand control over customer experience.',
      'Product pages needed clearer storytelling and mobile conversion design.',
      'Order status and stock updates were difficult to keep aligned manually.',
    ],
    solution: [
      'Design a brand storefront with catalog, cart, and checkout clarity.',
      'Add admin order tools and inventory sync points for daily operations.',
      'Build SEO and analytics foundations for organic and paid acquisition.',
    ],
    features: [
      {
        title: 'Product catalog UX',
        description:
          'Collections, variants, and detail pages designed for mobile conversion.',
      },
      {
        title: 'Checkout & payments',
        description:
          'Secure checkout with common payment options and confirmation states.',
      },
      {
        title: 'Order management',
        description:
          'Admin statuses, notes, and fulfillment tracking for the operations team.',
      },
      {
        title: 'Inventory awareness',
        description:
          'Stock signals that reduce overselling and manual corrections.',
      },
      {
        title: 'Promotions support',
        description:
          'Coupons and campaign landing patterns for launches and seasonal sales.',
      },
      {
        title: 'SEO for commerce',
        description:
          'Indexable category and product structures for long-term discovery.',
      },
    ],
    technologies: [
      'Next.js',
      'Headless commerce patterns',
      'PostgreSQL',
      'Payment gateways',
      'SEO',
      'Analytics',
    ],
    process: [
      {
        title: 'Offer & catalog discovery',
        description:
          'Clarify assortment, fulfillment model, and conversion goals.',
      },
      {
        title: 'Store design',
        description:
          'Define IA, product templates, and checkout requirements.',
      },
      {
        title: 'Build',
        description:
          'Implement storefront, admin, payments, and tracking.',
      },
      {
        title: 'Launch & optimize',
        description:
          'Go live with analytics and iterate on conversion friction.',
      },
    ],
    outcomes: [
      {
        title: 'Brand-owned journey',
        description:
          'Customers can discover and buy without leaving the brand experience.',
      },
      {
        title: 'Cleaner order ops',
        description:
          'Orders, payments, and fulfillment notes stay connected.',
      },
      {
        title: 'Acquisition readiness',
        description:
          'Pages and tracking support SEO and paid campaigns from day one.',
      },
    ],
    timeline: [
      {
        phase: 'Discovery',
        duration: '1–2 weeks',
        description: 'Catalog model and fulfillment assumptions.',
      },
      {
        phase: 'Design',
        duration: '2–3 weeks',
        description: 'Storefront UX and operations requirements.',
      },
      {
        phase: 'Build',
        duration: '6–10 weeks',
        description: 'Deliver store, checkout, and admin tools.',
      },
      {
        phase: 'Launch support',
        duration: '1–3 weeks',
        description: 'Stabilize orders and conversion tracking.',
      },
    ],
    visuals: [
      {
        label: 'Collection page',
        caption: 'Concept placeholder for product listing layout.',
      },
      {
        label: 'Product detail',
        caption: 'Concept placeholder for PDP and add-to-cart flow.',
      },
      {
        label: 'Order admin',
        caption: 'Concept placeholder for fulfillment status board.',
      },
    ],
    illustration: 'commerce',
    icon: 'ShoppingCart',
    seo: {
      title: 'Demo Case Study: E-Commerce Store | U&V Portfolio',
      description:
        'Demo project concept for an e-commerce store with catalog UX, checkout, order operations, and SEO foundations.',
      keywords: [
        'ecommerce store demo',
        'D2C website case study',
        'online store concept',
        'ecommerce development portfolio',
      ],
    },
  },
  {
    slug: 'hotel-management-software',
    title: 'Hotel Management Software',
    businessType: 'Boutique hotel and property operator',
    industry: 'Hospitality',
    category: 'Travel & Tourism',
    services: [
      'Hotel & restaurant software',
      'Custom software',
      'Website booking widgets',
    ],
    relatedServiceSlugs: [
      'hotel-restaurant-software',
      'website-development',
      'custom-software-development',
    ],
    summary:
      'An interactive hotel operations demo for reservations, room inventory, check-in/out, housekeeping, billing, maintenance, staff tasks, and guest stay history.',
    objective:
      'Help prospects explore a full property management story — from booking to housekeeping to checkout — in one Product Demo — Mock Data workspace.',
    challenge: [
      'Reservations and room readiness were tracked in separate places.',
      'Guest confirmations and reminders depended on manual follow-up.',
      'Managers needed a cleaner daily view of arrivals, departures, and occupancy.',
    ],
    solution: [
      'Centralize reservations, room status, and guest stay records in a role-based demo.',
      'Connect front desk check-in/out, housekeeping status, billing, and maintenance workflows.',
      'Provide admin reports plus a guest portal for booking history.',
    ],
    features: [
      {
        title: 'Reservation management',
        description:
          'New bookings, availability calendar, room assignment, and booking history.',
      },
      {
        title: 'Room status board',
        description:
          'Clean, occupied, dirty, ready, and maintenance states for house and front desk.',
      },
      {
        title: 'Check-in / check-out',
        description:
          'Assign ready rooms, collect balances, and release rooms to housekeeping.',
      },
      {
        title: 'Housekeeping & maintenance',
        description:
          'Room status updates, task queues, and maintenance request tracking.',
      },
      {
        title: 'Billing & reports',
        description:
          'Invoice preview, payment status, occupancy and revenue summaries.',
      },
      {
        title: 'Guest portal',
        description:
          'Guest login for current stay details and booking history.',
      },
    ],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Payments',
      'Cloud hosting',
    ],
    process: [
      {
        title: 'Property workflow review',
        description:
          'Map front desk, housekeeping, and reservation handoffs.',
      },
      {
        title: 'Module design',
        description:
          'Define reservation, room, billing, and role permissions.',
      },
      {
        title: 'Interactive demo build',
        description:
          'Ship admin, reception, housekeeping, and guest workspaces with mock JSON.',
      },
      {
        title: 'Staff pilot',
        description:
          'Validate check-in/out and housekeeping flows during demo walkthroughs.',
      },
    ],
    outcomes: [
      {
        title: 'Fewer booking conflicts',
        description:
          'Shared reservation and availability views reduce double-booking risk in demos.',
      },
      {
        title: 'Smoother daily handoffs',
        description:
          'Room status visibility helps front desk and housekeeping stay aligned.',
      },
      {
        title: 'Clearer product story',
        description:
          'Prospects can walk a full stay lifecycle instead of reviewing placeholders.',
      },
    ],
    timeline: [
      {
        phase: 'Discovery',
        duration: '1–2 weeks',
        description: 'Document property workflows and channel needs.',
      },
      {
        phase: 'Design',
        duration: '2–3 weeks',
        description: 'Finalize reservation and room status models.',
      },
      {
        phase: 'Build',
        duration: '6–10 weeks',
        description: 'Deliver ops dashboard and booking workflows.',
      },
      {
        phase: 'Staff adoption',
        duration: '2–3 weeks',
        description: 'Pilot with front desk and housekeeping.',
      },
    ],
    visuals: [
      {
        label: 'Reservations calendar',
        caption: 'Availability grid and booking queue.',
      },
      {
        label: 'Room status',
        caption: 'Housekeeping board with ready/dirty states.',
      },
      {
        label: 'Front-desk day view',
        caption: 'Arrivals, departures, occupancy, and revenue.',
      },
    ],
    illustration: 'hospitality',
    icon: 'Hotel',
    featured: true,
    liveDemoHref: '/demo/hotel-management',
    seo: {
      title: 'Product Demo: Hotel Management Software | U&V Portfolio',
      description:
        'Interactive hotel management demo with reservations, room status, check-in/out, housekeeping, billing, and guest portal — mock data only.',
      keywords: [
        'hotel management software demo',
        'property management system demo',
        'hotel PMS check-in demo',
        'housekeeping room status software',
      ],
    },
  },
  {
    slug: 'ai-customer-support-automation',
    title: 'AI Customer Support Automation',
    businessType: 'Growing customer-support team at a service business',
    industry: 'Customer operations',
    category: 'AI Automation',
    services: ['AI automation', 'Custom software', 'CRM integration'],
    relatedServiceSlugs: [
      'ai-automation',
      'crm-software',
      'custom-software-development',
    ],
    summary:
      'A concept AI support layer for FAQs, ticket drafting, and escalation — designed with human review controls.',
    objective:
      'Reduce repetitive support load while keeping sensitive or complex cases with human agents.',
    challenge: [
      'Agents spent significant time answering the same product and policy questions.',
      'Ticket drafts and summaries were inconsistent across the team.',
      'Leadership wanted automation without uncontrolled customer-facing decisions.',
    ],
    solution: [
      'Introduce an AI assistant grounded in approved knowledge sources.',
      'Automate first-draft replies and ticket summaries with human approval paths.',
      'Route complex or high-risk cases to agents with full conversation context.',
    ],
    features: [
      {
        title: 'Knowledge-grounded answers',
        description:
          'Responses drawn from approved FAQs, policies, and product docs.',
      },
      {
        title: 'Draft reply assist',
        description:
          'First-draft customer replies agents can edit before sending.',
      },
      {
        title: 'Ticket summarization',
        description:
          'Concise histories that speed handoffs between agents.',
      },
      {
        title: 'Escalation rules',
        description:
          'Human-in-the-loop controls for refunds, complaints, and edge cases.',
      },
      {
        title: 'Channel handoff',
        description:
          'Integration patterns for email, chat, or WhatsApp support queues.',
      },
      {
        title: 'Quality review loop',
        description:
          'Feedback capture so prompts and knowledge stay accurate over time.',
      },
    ],
    technologies: [
      'LLM APIs',
      'Node.js / Python',
      'Vector search',
      'CRM / helpdesk APIs',
      'Workflow automation',
      'Analytics',
    ],
    process: [
      {
        title: 'Support audit',
        description:
          'Identify high-volume intents, risks, and knowledge gaps.',
      },
      {
        title: 'Guardrail design',
        description:
          'Define what AI may answer, draft, or must escalate.',
      },
      {
        title: 'Pilot automation',
        description:
          'Launch on a narrow intent set with agent review.',
      },
      {
        title: 'Expand & measure',
        description:
          'Grow coverage based on deflection quality and agent feedback.',
      },
    ],
    outcomes: [
      {
        title: 'Less repetitive answering',
        description:
          'Common questions can be handled or drafted faster with consistent guidance.',
      },
      {
        title: 'Cleaner handoffs',
        description:
          'Summaries help agents continue conversations without rereading entire threads.',
      },
      {
        title: 'Controlled automation',
        description:
          'Escalation rules keep sensitive decisions with people.',
      },
    ],
    timeline: [
      {
        phase: 'Intent & knowledge audit',
        duration: '1–2 weeks',
        description: 'Prioritize safe automation candidates.',
      },
      {
        phase: 'Prototype',
        duration: '2–3 weeks',
        description: 'Build grounded Q&A and draft flows.',
      },
      {
        phase: 'Pilot with agents',
        duration: '3–5 weeks',
        description: 'Validate quality with human review.',
      },
      {
        phase: 'Expansion',
        duration: 'Ongoing',
        description: 'Add intents carefully based on measured confidence.',
      },
    ],
    visuals: [
      {
        label: 'Agent assist panel',
        caption: 'Concept placeholder for draft reply suggestions.',
      },
      {
        label: 'Knowledge sources',
        caption: 'Concept placeholder for approved document grounding.',
      },
      {
        label: 'Escalation rules',
        caption: 'Concept placeholder for human-in-the-loop controls.',
      },
    ],
    illustration: 'ai',
    icon: 'Bot',
    featured: true,
    seo: {
      title:
        'Demo Case Study: AI Customer Support Automation | U&V Portfolio',
      description:
        'Demo project concept for AI customer support automation with grounded answers, draft assist, and human escalation controls.',
      keywords: [
        'AI customer support demo',
        'support automation case study',
        'AI helpdesk concept',
        'customer service AI portfolio',
      ],
    },
  },
  {
    slug: 'corporate-website-platform',
    title: 'Corporate Website Platform',
    businessType: 'Growing B2B services company',
    industry: 'Professional services',
    category: 'Website Development',
    services: ['Website development', 'Branding', 'SEO readiness'],
    relatedServiceSlugs: ['website-development', 'branding-logo-design', 'digital-marketing'],
    summary:
      'A premium marketing website concept with clear positioning, service storytelling, and inquiry paths designed for conversion.',
    objective:
      'Present the business with enterprise clarity while making it easy for prospects to start a conversation.',
    challenge: [
      'The public site did not communicate capability with enough specificity.',
      'Service pages competed for attention without a clear journey.',
      'Inquiry handoff between marketing and sales lacked structure.',
    ],
    solution: [
      'Design a modular website architecture for services, proof, and contact.',
      'Build responsive page templates with strong SEO foundations.',
      'Connect inquiry flows to follow-up-ready messaging.',
    ],
    features: [
      {
        title: 'Service storytelling pages',
        description: 'Clear narratives for each offer without clutter.',
      },
      {
        title: 'Lead capture journeys',
        description: 'Consultation and WhatsApp paths that stay easy to use.',
      },
      {
        title: 'SEO-ready structure',
        description: 'Metadata, hierarchy, and performance-minded layout.',
      },
      {
        title: 'Brand-consistent UI',
        description: 'Typography and visual system aligned to enterprise tone.',
      },
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'CMS-ready content model'],
    process: [
      { title: 'Discovery', description: 'Clarify brand message and audience.' },
      { title: 'IA & design', description: 'Map pages and visual direction.' },
      { title: 'Build', description: 'Implement responsive templates.' },
      { title: 'Launch', description: 'Ship with SEO and analytics hooks.' },
    ],
    outcomes: [
      {
        title: 'Clearer first impression',
        description: 'Visitors understand what the business does faster.',
      },
      {
        title: 'Better inquiry quality',
        description: 'Structured contact paths reduce vague inbound messages.',
      },
    ],
    timeline: [
      { phase: 'Discovery', duration: '1 week', description: 'Message and page map.' },
      { phase: 'Design & build', duration: '3–5 weeks', description: 'Templates and content.' },
      { phase: 'Launch', duration: '1 week', description: 'Go-live and handoff.' },
    ],
    visuals: [
      { label: 'Homepage hero', caption: 'Image placeholder for brand-first hero.' },
      { label: 'Services grid', caption: 'Image placeholder for offer cards.' },
    ],
    illustration: 'web',
    icon: 'Globe',
    featured: true,
    seo: {
      title: 'Product Demo: Corporate Website Platform | U&V Portfolio',
      description:
        'Website development demo for a premium B2B marketing site with service storytelling and inquiry journeys.',
      keywords: ['website development demo', 'corporate website portfolio', 'Next.js website concept'],
    },
  },
  {
    slug: 'field-operations-mobile-app',
    title: 'Field Operations Mobile App',
    businessType: 'Distributed field services organization',
    industry: 'Operations',
    category: 'Mobile Apps',
    services: ['Mobile app development', 'Custom software', 'AI automation readiness'],
    relatedServiceSlugs: ['mobile-app-development', 'custom-software-development', 'ai-automation'],
    summary:
      'A mobile app concept for task assignment, status updates, photo evidence, and supervisor visibility in the field.',
    objective:
      'Give field teams a reliable mobile workflow and managers a live operating picture.',
    challenge: [
      'Updates were delayed through calls and chat threads.',
      'Photo evidence and job notes were hard to retrieve later.',
      'Supervisors lacked a clean view of open vs completed work.',
    ],
    solution: [
      'Design offline-tolerant mobile flows for assignments and checklists.',
      'Capture media and notes against each job record.',
      'Sync status to a supervisor dashboard for follow-up.',
    ],
    features: [
      { title: 'Job queue', description: 'Assigned tasks with priority and location context.' },
      { title: 'Checklist completion', description: 'Guided steps with completion states.' },
      { title: 'Media capture', description: 'Photo and note attachment against jobs.' },
      { title: 'Supervisor sync', description: 'Live progress visibility for managers.' },
    ],
    technologies: ['Flutter', 'Node.js', 'Firebase', 'PostgreSQL'],
    process: [
      { title: 'Workflow mapping', description: 'Document field realities and edge cases.' },
      { title: 'Mobile UX', description: 'Design for one-handed outdoor use.' },
      { title: 'Build & pilot', description: 'Ship a pilot lane with feedback loops.' },
      { title: 'Scale', description: 'Expand roles and reporting.' },
    ],
    outcomes: [
      {
        title: 'Faster status clarity',
        description: 'Teams spend less time chasing updates by phone.',
      },
      {
        title: 'Better audit trail',
        description: 'Job evidence stays attached to the work record.',
      },
    ],
    timeline: [
      { phase: 'Discovery', duration: '1–2 weeks', description: 'Map jobs and roles.' },
      { phase: 'Build', duration: '6–10 weeks', description: 'App + admin sync.' },
      { phase: 'Pilot', duration: '2–4 weeks', description: 'Validate with field teams.' },
    ],
    visuals: [
      { label: 'Mobile job screen', caption: 'Image placeholder for field task UI.' },
      { label: 'Supervisor board', caption: 'Image placeholder for progress board.' },
    ],
    illustration: 'mobile',
    icon: 'Smartphone',
    seo: {
      title: 'Product Demo: Field Operations Mobile App | U&V Portfolio',
      description:
        'Mobile apps demo for field operations — assignments, checklists, media capture, and supervisor visibility.',
      keywords: ['mobile app demo', 'Flutter field app', 'operations mobile portfolio'],
    },
  },
  {
    slug: 'sales-crm-platform',
    title: 'Sales CRM Platform',
    businessType: 'Multi-team B2B sales organization',
    industry: 'Sales operations',
    category: 'CRM Solutions',
    services: ['CRM', 'Custom software', 'AI automation'],
    relatedServiceSlugs: ['crm-software', 'custom-software-development', 'ai-automation'],
    summary:
      'A CRM concept for pipeline stages, follow-ups, ownership clarity, and leadership visibility without spreadsheet chaos.',
    objective:
      'Help teams manage opportunities consistently from lead to close with accountable next steps.',
    challenge: [
      'Deal status lived in personal spreadsheets and chat.',
      'Follow-ups were easy to miss across a growing team.',
      'Leaders could not see pipeline health in one place.',
    ],
    solution: [
      'Model pipeline stages with ownership and activity history.',
      'Add reminders and task discipline around key moments.',
      'Provide leadership views that stay explainable.',
    ],
    features: [
      { title: 'Pipeline board', description: 'Stage-based opportunity tracking.' },
      { title: 'Activity timeline', description: 'Calls, notes, and next actions in one record.' },
      { title: 'Follow-up reminders', description: 'Nudges that reduce silent deals.' },
      { title: 'Leadership views', description: 'Clear pipeline summaries without vanity metrics.' },
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AI assist hooks'],
    process: [
      { title: 'Sales process design', description: 'Agree stages and ownership rules.' },
      { title: 'CRM configuration', description: 'Build fields, views, and permissions.' },
      { title: 'Adoption', description: 'Train teams and refine workflows.' },
    ],
    outcomes: [
      {
        title: 'Shared pipeline truth',
        description: 'Teams stop negotiating whose spreadsheet is current.',
      },
      {
        title: 'More consistent follow-up',
        description: 'Next actions are visible and assignable.',
      },
    ],
    timeline: [
      { phase: 'Process workshop', duration: '1 week', description: 'Define stages.' },
      { phase: 'Build', duration: '4–8 weeks', description: 'CRM modules and views.' },
      { phase: 'Rollout', duration: '2–3 weeks', description: 'Training and cleanup.' },
    ],
    visuals: [
      { label: 'Pipeline board', caption: 'Image placeholder for CRM stages.' },
      { label: 'Contact record', caption: 'Image placeholder for account timeline.' },
    ],
    illustration: 'crm',
    icon: 'Users',
    featured: true,
    seo: {
      title: 'Product Demo: Sales CRM Platform | U&V Portfolio',
      description:
        'CRM solutions demo for pipeline stages, follow-ups, ownership, and leadership visibility.',
      keywords: ['CRM demo', 'sales CRM portfolio', 'pipeline software concept'],
    },
  },
  {
    slug: 'hospital-management-system',
    title: 'Hospital Management System',
    businessType: 'Multi-department healthcare facility',
    industry: 'Healthcare',
    category: 'Hospital Management',
    services: ['Custom software', 'ERP-style operations', 'Website patient portals'],
    relatedServiceSlugs: ['custom-software-development', 'erp-software', 'website-development'],
    summary:
      'A hospital operations concept covering appointments, patient records access controls, billing readiness, and department coordination.',
    objective:
      'Reduce operational friction across front desk, clinical coordination, and administration.',
    challenge: [
      'Appointment and record handoffs were fragmented across tools.',
      'Staff needed role-aware access without slowing daily work.',
      'Billing and operational status were hard to reconcile quickly.',
    ],
    solution: [
      'Design modular workflows for appointments, records, and admin tasks.',
      'Apply role-based access and audit-friendly history.',
      'Connect operational status views for supervisors.',
    ],
    features: [
      { title: 'Appointment scheduling', description: 'Department-aware booking and status.' },
      { title: 'Records workspace', description: 'Role-based access to patient information.' },
      { title: 'Billing readiness', description: 'Operational cues that support settlement workflows.' },
      { title: 'Admin controls', description: 'Users, departments, and configuration.' },
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Secure auth'],
    process: [
      { title: 'Department workshops', description: 'Map real clinical-admin flows.' },
      { title: 'Architecture', description: 'Design modules and access boundaries.' },
      { title: 'Phased delivery', description: 'Launch critical lanes first.' },
    ],
    outcomes: [
      {
        title: 'Clearer coordination',
        description: 'Teams share status without parallel notebooks.',
      },
      {
        title: 'Safer access patterns',
        description: 'Roles and history support accountable operations.',
      },
    ],
    timeline: [
      { phase: 'Discovery', duration: '2 weeks', description: 'Process and risk mapping.' },
      { phase: 'MVP modules', duration: '8–12 weeks', description: 'Core operational lanes.' },
      { phase: 'Expansion', duration: 'Ongoing', description: 'Add departments carefully.' },
    ],
    visuals: [
      { label: 'Scheduling board', caption: 'Image placeholder for appointments UI.' },
      { label: 'Records workspace', caption: 'Image placeholder for secure records view.' },
    ],
    illustration: 'software',
    icon: 'HeartPulse',
    seo: {
      title: 'Product Demo: Hospital Management System | U&V Portfolio',
      description:
        'Hospital management demo covering appointments, role-aware records, and operational coordination.',
      keywords: ['hospital management software demo', 'healthcare ERP concept', 'HMS portfolio'],
    },
  },
  {
    slug: 'school-erp-platform',
    title: 'School ERP Platform',
    businessType: 'Multi-campus school administration team',
    industry: 'Education',
    category: 'School ERP',
    services: ['ERP software', 'Custom software', 'Mobile parent apps'],
    relatedServiceSlugs: ['erp-software', 'mobile-app-development', 'custom-software-development'],
    summary:
      'A school ERP concept for admissions, attendance, fees, academics, and parent communication under one operating system.',
    objective:
      'Help administrators run daily school operations with fewer disconnected tools.',
    challenge: [
      'Attendance, fees, and academics lived in separate systems.',
      'Parent updates depended on manual broadcasts.',
      'Leadership lacked a unified operational view.',
    ],
    solution: [
      'Unify core modules around student records as the source of truth.',
      'Add fee and attendance workflows with clear statuses.',
      'Provide parent-facing updates where appropriate.',
    ],
    features: [
      { title: 'Student records', description: 'Central profiles across academic years.' },
      { title: 'Attendance', description: 'Daily capture with class-level views.' },
      { title: 'Fees workspace', description: 'Due, paid, and reminder-ready statuses.' },
      { title: 'Parent updates', description: 'Structured communication for key events.' },
    ],
    technologies: ['Next.js', 'Flutter', 'Node.js', 'PostgreSQL'],
    process: [
      { title: 'Admin workshops', description: 'Map academic and fee cycles.' },
      { title: 'Module design', description: 'Prioritize high-friction workflows.' },
      { title: 'Rollout', description: 'Train staff and stabilize adoption.' },
    ],
    outcomes: [
      {
        title: 'Less tool switching',
        description: 'Core school operations share one student context.',
      },
      {
        title: 'Clearer fee visibility',
        description: 'Statuses reduce manual reconciliation work.',
      },
    ],
    timeline: [
      { phase: 'Discovery', duration: '1–2 weeks', description: 'Process mapping.' },
      { phase: 'Core modules', duration: '8–14 weeks', description: 'Records, attendance, fees.' },
      { phase: 'Parent layer', duration: '3–5 weeks', description: 'Communication surfaces.' },
    ],
    visuals: [
      { label: 'Admin dashboard', caption: 'Image placeholder for school operations.' },
      { label: 'Fees screen', caption: 'Image placeholder for fee status UI.' },
    ],
    illustration: 'erp',
    icon: 'GraduationCap',
    seo: {
      title: 'Product Demo: School ERP Platform | U&V Portfolio',
      description:
        'School ERP demo for admissions, attendance, fees, academics, and parent communication.',
      keywords: ['school ERP demo', 'education management software', 'school software portfolio'],
    },
  },
];

export function getAllCaseStudies() {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(limit = 4) {
  const featured = caseStudies.filter((study) => study.featured);
  return (featured.length >= limit ? featured : caseStudies).slice(0, limit);
}

export function getCaseStudiesByCategory(category: PortfolioCategory) {
  if (category === 'All') return caseStudies;
  return caseStudies.filter((study) => study.category === category);
}
