import type { IconName } from '@uandv/ui';

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDefinition = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  overview: string[];
  icon: IconName;
  illustration: ServiceIllustrationKey;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  features: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  process: { title: string; description: string }[];
  technologies: string[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
};

export type ServiceIllustrationKey =
  | 'web'
  | 'mobile'
  | 'software'
  | 'ai'
  | 'erp'
  | 'crm'
  | 'mlm'
  | 'taxi'
  | 'travel'
  | 'hospitality'
  | 'commerce'
  | 'marketing'
  | 'branding'
  | 'consulting'
  | 'registration';

const discoveryProcess = (
  discover: string,
  plan: string,
  build: string,
  launch: string,
): ServiceDefinition['process'] => [
  { title: 'Discover', description: discover },
  { title: 'Plan', description: plan },
  { title: 'Build', description: build },
  { title: 'Launch & support', description: launch },
];

export const serviceCatalog: ServiceDefinition[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    shortTitle: 'Websites',
    tagline: 'Fast, conversion-focused websites built for growth.',
    summary:
      'Premium marketing sites, business websites, and web platforms engineered for speed, SEO, and measurable conversions.',
    overview: [
      'Your website is often the first proof that your business is real, trustworthy, and ready to serve. We design and build websites that look premium, load quickly, and guide visitors toward clear next steps.',
      'From launch sites for new companies to multi-page platforms for growing brands, every build is structured for maintainability, search visibility, and long-term performance.',
    ],
    icon: 'Globe',
    illustration: 'web',
    seo: {
      title: 'Website Development Company in Tamil Nadu | U&V',
      description:
        'U&V builds premium, SEO-ready websites for startups, SMEs, and enterprises — fast, conversion-focused, and production-ready.',
      keywords: [
        'website development',
        'web design India',
        'SEO website',
        'business website Tamil Nadu',
        'Next.js website development',
      ],
    },
    features: [
      {
        title: 'Conversion-led structure',
        description:
          'Clear information hierarchy, strong CTAs, and page flows designed around how your customers decide.',
      },
      {
        title: 'SEO foundations',
        description:
          'Technical SEO, metadata, sitemap structure, and performance so search engines can find and rank you.',
      },
      {
        title: 'Responsive craft',
        description:
          'Pixel-disciplined layouts that stay sharp on mobile, tablet, and desktop without feeling template-built.',
      },
      {
        title: 'CMS-ready options',
        description:
          'Editable content workflows when you need to update pages without waiting on engineering for every change.',
      },
      {
        title: 'Analytics wiring',
        description:
          'Tracking and event setup so you can see which pages and actions actually drive inquiries.',
      },
      {
        title: 'Secure hosting path',
        description:
          'Production deployment guidance with HTTPS, backups, and a maintainable release process.',
      },
    ],
    benefits: [
      {
        title: 'Credibility from first visit',
        description:
          'A polished site helps prospects trust your offer before they ever speak to your team.',
      },
      {
        title: 'More qualified inquiries',
        description:
          'Clear messaging and CTAs turn traffic into conversations instead of bounce-and-leave visits.',
      },
      {
        title: 'Room to scale',
        description:
          'Architecture that can grow into portals, dashboards, or connected product experiences later.',
      },
    ],
    process: discoveryProcess(
      'We clarify your audience, offer, competitors, and the outcomes the website must drive.',
      'Information architecture, page map, visual direction, and a prioritized launch scope.',
      'Design and engineering with performance, accessibility, and SEO built into the delivery.',
      'Go-live checklist, analytics verification, and iteration support after launch.',
    ),
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'SEO',
      'Analytics',
      'Cloud hosting',
    ],
    faqs: [
      {
        question: 'How long does a business website take?',
        answer:
          'Most marketing websites take a few weeks depending on page count, content readiness, and integrations. We share a clear timeline after discovery.',
      },
      {
        question: 'Will my website be mobile-friendly and SEO ready?',
        answer:
          'Yes. Responsive design, technical SEO foundations, and performance budgets are part of every website engagement.',
      },
      {
        question: 'Can you redesign an existing website?',
        answer:
          'Yes. We can rebuild from scratch or modernize your current site while preserving what already converts.',
      },
    ],
    relatedSlugs: [
      'digital-marketing',
      'branding-logo-design',
      'ecommerce-solutions',
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile apps',
    tagline: 'Native-feeling apps for iOS and Android that people actually use.',
    summary:
      'Product-minded mobile apps for customer journeys, internal operations, and multi-sided business workflows.',
    overview: [
      'We design and develop mobile applications that feel fast, intuitive, and reliable — whether you need a customer-facing product or an operational tool for your team.',
      'Our approach balances UX clarity with solid engineering so your app can ship, iterate, and scale without becoming fragile.',
    ],
    icon: 'Smartphone',
    illustration: 'mobile',
    seo: {
      title: 'Mobile App Development | iOS & Android | U&V',
      description:
        'U&V builds production-ready mobile apps for startups and growing businesses — from MVP to scalable product experiences.',
      keywords: [
        'mobile app development',
        'iOS Android app',
        'React Native',
        'business mobile app India',
        'MVP app development',
      ],
    },
    features: [
      {
        title: 'Cross-platform delivery',
        description:
          'Shared codebases that reach iOS and Android efficiently without sacrificing polish.',
      },
      {
        title: 'UX-first product flows',
        description:
          'Onboarding, navigation, and core actions designed around real user jobs — not feature checklists.',
      },
      {
        title: 'API & backend integration',
        description:
          'Secure connections to your systems, payments, notifications, and third-party services.',
      },
      {
        title: 'Push & engagement',
        description:
          'Notification strategies and in-app prompts that keep users returning for the right reasons.',
      },
      {
        title: 'Store readiness',
        description:
          'App Store and Play Store packaging, screenshots guidance, and release checklist support.',
      },
      {
        title: 'Post-launch iteration',
        description:
          'Crash monitoring, feedback loops, and prioritized improvement cycles after go-live.',
      },
    ],
    benefits: [
      {
        title: 'Direct customer channel',
        description:
          'Own a persistent presence on your customers’ phones beyond social feeds and ads.',
      },
      {
        title: 'Operational leverage',
        description:
          'Field teams, drivers, staff, and partners can work from purpose-built mobile workflows.',
      },
      {
        title: 'Faster product learning',
        description:
          'Ship an MVP, measure usage, and refine based on real behavior instead of assumptions.',
      },
    ],
    process: discoveryProcess(
      'We map users, journeys, constraints, and the MVP that proves value fastest.',
      'Wireframes, product scope, technical architecture, and release milestones.',
      'UI design, app engineering, API integration, and quality validation.',
      'Store submission support, monitoring setup, and continuous improvement.',
    ),
    technologies: [
      'React Native',
      'Flutter',
      'TypeScript',
      'Node.js',
      'REST / GraphQL',
      'Push notifications',
      'Cloud backends',
    ],
    faqs: [
      {
        question: 'Do you build native or cross-platform apps?',
        answer:
          'We typically recommend a cross-platform approach when it fits your goals, and we advise on native when platform-specific depth is required.',
      },
      {
        question: 'Can you start with an MVP?',
        answer:
          'Yes. Many clients begin with a focused MVP that validates the core workflow before expanding features.',
      },
      {
        question: 'Will you help publish to app stores?',
        answer:
          'Yes. We support packaging, store listing readiness, and the release process for iOS and Android.',
      },
    ],
    relatedSlugs: [
      'custom-software-development',
      'taxi-booking-software',
      'ai-automation',
    ],
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortTitle: 'Custom software',
    tagline: 'Software shaped around your workflows — not generic templates.',
    summary:
      'Bespoke platforms, portals, and internal tools that automate operations and connect your business systems.',
    overview: [
      'Off-the-shelf tools often force your team to adapt around someone else’s process. Custom software lets you encode how your business actually works — with the controls, data model, and integrations you need.',
      'We build production systems for operations, customer portals, admin workflows, and multi-role platforms with long-term maintainability in mind.',
    ],
    icon: 'Code2',
    illustration: 'software',
    seo: {
      title: 'Custom Software Development Company | U&V',
      description:
        'U&V designs and builds custom software, portals, and internal tools tailored to your workflows, integrations, and growth stage.',
      keywords: [
        'custom software development',
        'business software India',
        'web application development',
        'internal tools',
        'enterprise software Tamil Nadu',
      ],
    },
    features: [
      {
        title: 'Workflow modeling',
        description:
          'We translate your real processes into clear roles, states, permissions, and automation rules.',
      },
      {
        title: 'Secure multi-role access',
        description:
          'Admin, staff, partner, and customer experiences with authentication and authorization built in.',
      },
      {
        title: 'System integrations',
        description:
          'Connect accounting, CRM, payments, messaging, and other tools into one operational flow.',
      },
      {
        title: 'Reporting & visibility',
        description:
          'Dashboards and exports so leaders can see status, bottlenecks, and outcomes without spreadsheet chaos.',
      },
      {
        title: 'Scalable architecture',
        description:
          'Modular services and data design that can expand as your volumes and product surface grow.',
      },
      {
        title: 'Handover & documentation',
        description:
          'Clean delivery with documentation so your team can operate and extend the system confidently.',
      },
    ],
    benefits: [
      {
        title: 'Less manual work',
        description:
          'Replace repetitive handoffs with software that moves work forward automatically.',
      },
      {
        title: 'Fewer tool gaps',
        description:
          'One coherent system instead of disconnected spreadsheets, chats, and patched SaaS apps.',
      },
      {
        title: 'Competitive advantage',
        description:
          'Operational software becomes a durable asset unique to how you serve customers.',
      },
    ],
    process: discoveryProcess(
      'Deep dive into current tools, pain points, data, and success metrics.',
      'Solution blueprint, module priorities, UX direction, and delivery roadmap.',
      'Iterative development with demos, testing, and integration checkpoints.',
      'Production rollout, training support, and a plan for ongoing improvements.',
    ),
    technologies: [
      'Next.js',
      'NestJS',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Cloud & DevOps',
    ],
    faqs: [
      {
        question: 'When is custom software better than SaaS?',
        answer:
          'When your workflows are unique, integrations are critical, or off-the-shelf tools create more friction than value. We help you decide honestly before building.',
      },
      {
        question: 'Can you modernize a legacy system?',
        answer:
          'Yes. We can rebuild modules gradually, migrate data carefully, and reduce risk with phased cutovers.',
      },
      {
        question: 'Do you provide ongoing maintenance?',
        answer:
          'Yes. We can support monitoring, enhancements, and operational improvements after launch.',
      },
    ],
    relatedSlugs: ['erp-software', 'crm-software', 'ai-automation'],
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    shortTitle: 'AI automation',
    tagline: 'Practical AI that removes busywork and speeds decisions.',
    summary:
      'AI assistants, workflow automation, and intelligent document processing designed for real business outcomes — not hype.',
    overview: [
      'We implement AI where it creates measurable leverage: lead qualification, support drafts, document extraction, internal knowledge search, and process automation.',
      'Every engagement starts with the workflow, data quality, and governance — so automation stays useful, safe, and maintainable.',
    ],
    icon: 'Bot',
    illustration: 'ai',
    seo: {
      title: 'AI Automation Services for Businesses | U&V',
      description:
        'U&V builds practical AI automation for sales, support, operations, and knowledge workflows — tailored to your business processes.',
      keywords: [
        'AI automation',
        'business AI solutions',
        'workflow automation',
        'AI chatbot',
        'AI consulting India',
      ],
    },
    features: [
      {
        title: 'Process automation',
        description:
          'Automate repetitive steps across forms, approvals, follow-ups, and status updates.',
      },
      {
        title: 'AI assistants',
        description:
          'Internal or customer-facing assistants trained on your approved knowledge and tone.',
      },
      {
        title: 'Document intelligence',
        description:
          'Extract and structure information from invoices, forms, resumes, and operational documents.',
      },
      {
        title: 'Human-in-the-loop controls',
        description:
          'Review steps and escalation rules so AI supports your team without uncontrolled decisions.',
      },
      {
        title: 'Integration layer',
        description:
          'Connect AI outputs into CRM, WhatsApp, email, ERP, and your existing software stack.',
      },
      {
        title: 'Measurement & iteration',
        description:
          'Track accuracy, time saved, and conversion impact — then refine prompts and workflows.',
      },
    ],
    benefits: [
      {
        title: 'Faster response times',
        description:
          'Handle routine requests quickly so your team focuses on high-value conversations.',
      },
      {
        title: 'Consistent quality',
        description:
          'Reduce variation in follow-ups, summaries, and operational handoffs.',
      },
      {
        title: 'Lower operating drag',
        description:
          'Cut hours spent on copy-paste work, manual classification, and status chasing.',
      },
    ],
    process: discoveryProcess(
      'Identify high-volume tasks, data sources, risks, and automation candidates.',
      'Design the workflow, model strategy, guardrails, and integration plan.',
      'Prototype, evaluate quality, and implement production automation.',
      'Monitor outcomes, improve prompts/rules, and expand to adjacent workflows.',
    ),
    technologies: [
      'OpenAI / LLM APIs',
      'Python / Node.js',
      'Vector search',
      'Workflow automation',
      'WhatsApp Business',
      'CRM integrations',
      'Cloud infrastructure',
    ],
    faqs: [
      {
        question: 'Do we need perfect data before starting AI?',
        answer:
          'No. We start with the cleanest high-value workflow and improve data quality as part of delivery. Perfect data is rarely a prerequisite.',
      },
      {
        question: 'Will AI replace our team?',
        answer:
          'Our focus is augmentation — removing repetitive work so people can do higher-judgment work better and faster.',
      },
      {
        question: 'How do you handle privacy and control?',
        answer:
          'We define what data is used, where it is processed, and which actions require human approval before automation goes live.',
      },
    ],
    relatedSlugs: [
      'custom-software-development',
      'crm-software',
      'digital-marketing',
    ],
  },
  {
    slug: 'erp-software',
    title: 'ERP Software',
    shortTitle: 'ERP',
    tagline: 'Unified operations across finance, inventory, and teams.',
    summary:
      'ERP systems that connect inventory, purchasing, finance, HR, and operations into one source of truth.',
    overview: [
      'Growing businesses outgrow spreadsheets and disconnected tools. An ERP brings your core operations into a coherent system so teams work from the same data.',
      'We implement and customize ERP solutions around your industry workflows — with phased rollouts that reduce disruption.',
    ],
    icon: 'Layers',
    illustration: 'erp',
    seo: {
      title: 'ERP Software Development & Implementation | U&V',
      description:
        'U&V delivers ERP software and implementation for inventory, finance, purchasing, and operations — tailored to your business.',
      keywords: [
        'ERP software',
        'ERP implementation India',
        'inventory management system',
        'business ERP',
        'custom ERP development',
      ],
    },
    features: [
      {
        title: 'Modular ERP core',
        description:
          'Inventory, purchasing, sales, finance, and operations modules aligned to your priorities.',
      },
      {
        title: 'Role-based dashboards',
        description:
          'Different views for owners, managers, warehouse, and finance without exposing everything to everyone.',
      },
      {
        title: 'Stock & order control',
        description:
          'Track stock movements, purchase orders, and fulfillment with fewer manual reconciliations.',
      },
      {
        title: 'Financial visibility',
        description:
          'Connect operational activity to invoices, expenses, and reporting your leadership can trust.',
      },
      {
        title: 'Integration readiness',
        description:
          'Connect ecommerce, CRM, payment gateways, and accounting tools as needed.',
      },
      {
        title: 'Phased rollout',
        description:
          'Go live module by module so your team can adopt without freezing day-to-day work.',
      },
    ],
    benefits: [
      {
        title: 'One operational picture',
        description:
          'Stop reconciling conflicting numbers across departments and tools.',
      },
      {
        title: 'Better inventory decisions',
        description:
          'See what you have, what is moving, and what needs replenishment earlier.',
      },
      {
        title: 'Scale without chaos',
        description:
          'Add locations, products, and staff without multiplying spreadsheet debt.',
      },
    ],
    process: discoveryProcess(
      'Audit current systems, data quality, and must-have operational modules.',
      'Configure the ERP blueprint, migration plan, and training approach.',
      'Customize, integrate, migrate data, and validate with real scenarios.',
      'Roll out in phases, train users, and stabilize reporting after go-live.',
    ),
    technologies: [
      'PostgreSQL',
      'Node.js',
      'NestJS',
      'React dashboards',
      'Reporting engines',
      'API integrations',
      'Cloud hosting',
    ],
    faqs: [
      {
        question: 'Can ERP be customized for our industry?',
        answer:
          'Yes. We adapt modules, fields, and workflows to manufacturing, trade, services, or other operating models.',
      },
      {
        question: 'Do you migrate data from Excel or old software?',
        answer:
          'Yes. Data migration and cleanup are part of a careful ERP rollout plan.',
      },
      {
        question: 'How long does ERP implementation take?',
        answer:
          'Timelines vary by module scope and data readiness. We recommend a phased plan so value appears early.',
      },
    ],
    relatedSlugs: [
      'crm-software',
      'custom-software-development',
      'ecommerce-solutions',
    ],
  },
  {
    slug: 'crm-software',
    title: 'CRM Software',
    shortTitle: 'CRM',
    tagline: 'A clear pipeline from lead to loyal customer.',
    summary:
      'CRM platforms that organize leads, follow-ups, deals, and customer history so sales and support stay aligned.',
    overview: [
      'When leads live in chats, notebooks, and inboxes, revenue leaks. A CRM gives your team one place to capture interest, nurture relationships, and close with accountability.',
      'We build and configure CRM systems that match how your sales cycle actually works — including WhatsApp-heavy Indian business workflows.',
    ],
    icon: 'Users',
    illustration: 'crm',
    seo: {
      title: 'CRM Software Development & Setup | U&V',
      description:
        'U&V builds CRM software for lead tracking, follow-ups, sales pipelines, and customer history — built for real Indian business workflows.',
      keywords: [
        'CRM software',
        'sales CRM India',
        'lead management system',
        'WhatsApp CRM',
        'custom CRM development',
      ],
    },
    features: [
      {
        title: 'Lead capture & assignment',
        description:
          'Bring leads from website, ads, WhatsApp, and referrals into one assignable pipeline.',
      },
      {
        title: 'Follow-up discipline',
        description:
          'Reminders, stage tracking, and activity history so opportunities do not go cold.',
      },
      {
        title: 'Deal visibility',
        description:
          'Pipeline views that show where deals stall and which owners need support.',
      },
      {
        title: 'Customer timeline',
        description:
          'A single history of conversations, notes, and outcomes across the relationship.',
      },
      {
        title: 'WhatsApp & email sync',
        description:
          'Connect the channels your team already uses so CRM adoption stays practical.',
      },
      {
        title: 'Reporting for owners',
        description:
          'See conversion rates, response times, and source performance without manual collation.',
      },
    ],
    benefits: [
      {
        title: 'Higher close rates',
        description:
          'Consistent follow-up and clearer ownership turn more inquiries into customers.',
      },
      {
        title: 'Team continuity',
        description:
          'When people change roles, the customer context stays in the system — not in someone’s head.',
      },
      {
        title: 'Marketing feedback',
        description:
          'Know which channels create real pipeline so spend and messaging improve over time.',
      },
    ],
    process: discoveryProcess(
      'Map your sales stages, lead sources, and current follow-up habits.',
      'Design pipeline stages, fields, permissions, and integration points.',
      'Configure or build the CRM, connect channels, and train the team.',
      'Refine stages and automation based on early usage and conversion data.',
    ),
    technologies: [
      'React',
      'NestJS',
      'PostgreSQL',
      'WhatsApp Business API',
      'Email integrations',
      'Analytics',
      'Automation rules',
    ],
    faqs: [
      {
        question: 'Do you customize existing CRM tools or build new ones?',
        answer:
          'Both. We configure proven CRM platforms when they fit, and build custom CRM when your process needs deeper control.',
      },
      {
        question: 'Can CRM work with WhatsApp?',
        answer:
          'Yes. WhatsApp is often central to Indian sales workflows, and we design CRM around that reality.',
      },
      {
        question: 'How do you improve CRM adoption?',
        answer:
          'We keep fields lean, match real sales stages, and train around daily habits instead of forcing unused complexity.',
      },
    ],
    relatedSlugs: [
      'digital-marketing',
      'ai-automation',
      'custom-software-development',
    ],
  },
  {
    slug: 'mlm-software',
    title: 'MLM Software',
    shortTitle: 'MLM software',
    tagline: 'Transparent network marketing systems with reliable payouts.',
    summary:
      'MLM and network marketing platforms with genealogy trees, commission plans, wallets, and member dashboards.',
    overview: [
      'Network marketing businesses need software that calculates commissions accurately, shows clear genealogy, and earns member trust through transparency.',
      'We build MLM platforms with configurable plans, secure member areas, and admin controls designed for operational clarity.',
    ],
    icon: 'Network',
    illustration: 'mlm',
    seo: {
      title: 'MLM Software Development | Network Marketing Systems | U&V',
      description:
        'U&V develops MLM software with genealogy, commissions, wallets, and member dashboards for network marketing businesses.',
      keywords: [
        'MLM software',
        'network marketing software',
        'commission management system',
        'genealogy tree software',
        'MLM software India',
      ],
    },
    features: [
      {
        title: 'Genealogy management',
        description:
          'Clear sponsor trees and downline visibility with roles that match your plan design.',
      },
      {
        title: 'Commission engines',
        description:
          'Configurable binary, unilevel, matrix, or hybrid plans with auditable calculations.',
      },
      {
        title: 'Member dashboards',
        description:
          'Self-serve views for earnings, team growth, rank progress, and announcements.',
      },
      {
        title: 'Wallet & payouts',
        description:
          'Wallet balances, withdrawal requests, and payout workflows with admin approval controls.',
      },
      {
        title: 'KYC & compliance hooks',
        description:
          'Member verification steps and record-keeping support aligned to your operating policies.',
      },
      {
        title: 'Admin operations',
        description:
          'Tools for plan configuration, member support, reports, and dispute investigation.',
      },
    ],
    benefits: [
      {
        title: 'Member trust',
        description:
          'Transparent calculations and history reduce disputes and support load.',
      },
      {
        title: 'Operational control',
        description:
          'Admins can manage plans, payouts, and exceptions without spreadsheet risk.',
      },
      {
        title: 'Growth readiness',
        description:
          'Architecture that can handle expanding networks without recalculating chaos.',
      },
    ],
    process: discoveryProcess(
      'Document your compensation plan, ranks, payout rules, and compliance needs.',
      'Model the commission engine, member journeys, and admin controls.',
      'Build, validate calculations with sample trees, and harden security.',
      'Launch with training, monitoring, and a controlled payout checklist.',
    ),
    technologies: [
      'Node.js',
      'PostgreSQL',
      'React dashboards',
      'Queue workers',
      'Secure auth',
      'Payment integrations',
      'Reporting',
    ],
    faqs: [
      {
        question: 'Can you implement our exact commission plan?',
        answer:
          'Yes. We model your rules carefully and validate with sample networks before production payouts.',
      },
      {
        question: 'Is the system secure for member data and wallets?',
        answer:
          'Security, access control, and audit trails are treated as first-class requirements for MLM platforms.',
      },
      {
        question: 'Do you support mobile-friendly member access?',
        answer:
          'Yes. Member experiences are designed to work well on mobile, where most distributors operate.',
      },
    ],
    relatedSlugs: [
      'custom-software-development',
      'crm-software',
      'mobile-app-development',
    ],
  },
  {
    slug: 'taxi-booking-software',
    title: 'Taxi Booking Software',
    shortTitle: 'Taxi booking',
    tagline: 'Dispatch, booking, and driver apps for mobility businesses.',
    summary:
      'Taxi and cab booking platforms with rider apps, driver apps, dispatch controls, fares, and live tracking.',
    overview: [
      'Mobility businesses need reliable booking, fair dispatch, transparent fares, and live operational visibility. We build taxi booking software that covers the full ride lifecycle.',
      'Whether you run a city fleet or a specialized transport service, we tailor workflows for riders, drivers, and operations teams.',
    ],
    icon: 'Car',
    illustration: 'taxi',
    seo: {
      title: 'Taxi Booking Software Development | U&V',
      description:
        'U&V builds taxi booking software with rider apps, driver apps, dispatch, fares, and live tracking for mobility businesses.',
      keywords: [
        'taxi booking software',
        'cab booking app',
        'dispatch software',
        'driver app development',
        'ride booking system India',
      ],
    },
    features: [
      {
        title: 'Rider booking flows',
        description:
          'Pickup, drop, fare estimate, booking confirmation, and ride status in a clear mobile journey.',
      },
      {
        title: 'Driver application',
        description:
          'Job offers, navigation handoff, trip status updates, and earnings visibility for drivers.',
      },
      {
        title: 'Dispatch console',
        description:
          'Assign rides manually or automatically with live fleet awareness for operations teams.',
      },
      {
        title: 'Fare & promo engine',
        description:
          'Configurable pricing, surge rules, coupons, and payment collection options.',
      },
      {
        title: 'Live tracking',
        description:
          'Map-based tracking and ETAs that keep riders informed and reduce support calls.',
      },
      {
        title: 'Ratings & safety basics',
        description:
          'Trip history, ratings, and operational controls that support service quality.',
      },
    ],
    benefits: [
      {
        title: 'Smoother operations',
        description:
          'Centralize bookings and dispatch instead of phone-only coordination.',
      },
      {
        title: 'Better rider experience',
        description:
          'Transparent status and fares increase trust and repeat usage.',
      },
      {
        title: 'Fleet accountability',
        description:
          'See utilization, trip outcomes, and driver performance with clearer data.',
      },
    ],
    process: discoveryProcess(
      'Map your city operations, vehicle types, fare logic, and staffing model.',
      'Define app journeys, dispatch rules, and admin controls for launch.',
      'Build rider/driver apps, backend, maps integration, and payment flows.',
      'Pilot with a controlled fleet, then expand after operational hardening.',
    ),
    technologies: [
      'React Native / Flutter',
      'Node.js',
      'Maps & GPS APIs',
      'PostgreSQL',
      'Realtime updates',
      'Payments',
      'Push notifications',
    ],
    faqs: [
      {
        question: 'Can this work for local taxi or corporate fleets?',
        answer:
          'Yes. We tailor booking rules, user roles, and dispatch behavior for consumer, corporate, or hybrid models.',
      },
      {
        question: 'Do you include payments and invoices?',
        answer:
          'We can integrate digital payments and generate trip records/invoices based on your operating needs.',
      },
      {
        question: 'How do you handle live tracking?',
        answer:
          'We integrate map and location services with trip state management so riders and ops see reliable status updates.',
      },
    ],
    relatedSlugs: [
      'mobile-app-development',
      'custom-software-development',
      'travel-tourism-software',
    ],
  },
  {
    slug: 'travel-tourism-software',
    title: 'Travel & Tourism Software',
    shortTitle: 'Travel software',
    tagline: 'Booking and operations systems for tours, travel, and experiences.',
    summary:
      'Travel platforms for packages, itineraries, bookings, agents, and customer journeys across tourism businesses.',
    overview: [
      'Tour operators and travel brands need software that presents packages clearly, manages bookings reliably, and keeps agents and customers aligned.',
      'We build travel and tourism systems for package catalogs, itinerary management, reservations, and partner workflows.',
    ],
    icon: 'Plane',
    illustration: 'travel',
    seo: {
      title: 'Travel & Tourism Software Development | U&V',
      description:
        'U&V builds travel and tourism software for packages, itineraries, bookings, agents, and customer experiences.',
      keywords: [
        'travel software',
        'tourism booking system',
        'tour package software',
        'travel agency software India',
        'itinerary management system',
      ],
    },
    features: [
      {
        title: 'Package catalog',
        description:
          'Showcase destinations, inclusions, pricing, and seasonal offers with clear booking paths.',
      },
      {
        title: 'Itinerary builder',
        description:
          'Organize day-wise plans, activities, transport, and stay details in one place.',
      },
      {
        title: 'Booking & payments',
        description:
          'Reservations, deposits, confirmations, and payment tracking for customers and agents.',
      },
      {
        title: 'Agent portal',
        description:
          'Give partners tools to browse inventory, book for clients, and track commissions where needed.',
      },
      {
        title: 'Customer communications',
        description:
          'Automated confirmations, reminders, and trip updates through email or WhatsApp.',
      },
      {
        title: 'Operations dashboard',
        description:
          'See upcoming departures, occupancy, and open tasks for your operations team.',
      },
    ],
    benefits: [
      {
        title: 'Fewer booking errors',
        description:
          'Structured inventory and confirmations reduce manual mistakes during peak seasons.',
      },
      {
        title: 'Stronger online presence',
        description:
          'A professional booking experience helps travelers choose you with confidence.',
      },
      {
        title: 'Partner-ready growth',
        description:
          'Agent workflows let you expand distribution without losing operational control.',
      },
    ],
    process: discoveryProcess(
      'Review your packages, seasonality, agent model, and current booking friction.',
      'Design catalog structure, booking rules, and operational dashboards.',
      'Build the customer and admin experiences with payment and messaging integrations.',
      'Launch with training, then refine based on seasonal booking patterns.',
    ),
    technologies: [
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Payment gateways',
      'WhatsApp / email',
      'Maps',
      'Admin dashboards',
    ],
    faqs: [
      {
        question: 'Can you support both B2C and travel agent bookings?',
        answer:
          'Yes. We can design customer booking flows and agent portals in one platform when needed.',
      },
      {
        question: 'Do you integrate hotels or transport vendors?',
        answer:
          'We can integrate or model vendor inventory based on how your business currently sources services.',
      },
      {
        question: 'Is multilingual content possible?',
        answer:
          'Yes. Multilingual package content can be planned into the information architecture when required.',
      },
    ],
    relatedSlugs: [
      'hotel-restaurant-software',
      'website-development',
      'digital-marketing',
    ],
  },
  {
    slug: 'hotel-restaurant-software',
    title: 'Hotel & Restaurant Software',
    shortTitle: 'Hospitality software',
    tagline: 'Operations software for stays, tables, and guest experiences.',
    summary:
      'Hospitality systems for reservations, menus, orders, billing, and guest service across hotels and restaurants.',
    overview: [
      'Hotels and restaurants run on timing, coordination, and guest experience. Software should make front-of-house and back-of-house work smoother — not add another screen to fight.',
      'We build hospitality systems for reservations, table/order management, billing, and guest communication tailored to your property or brand.',
    ],
    icon: 'Hotel',
    illustration: 'hospitality',
    seo: {
      title: 'Hotel & Restaurant Software Development | U&V',
      description:
        'U&V builds hotel and restaurant software for reservations, orders, billing, and guest experience management.',
      keywords: [
        'hotel management software',
        'restaurant POS software',
        'reservation system',
        'hospitality software India',
        'restaurant management system',
      ],
    },
    features: [
      {
        title: 'Reservations & occupancy',
        description:
          'Room or table bookings with availability, deposits, and confirmation workflows.',
      },
      {
        title: 'Menu & order management',
        description:
          'Digital menus, order taking, kitchen/service handoff, and status tracking.',
      },
      {
        title: 'Billing & invoices',
        description:
          'Itemized billing, taxes, discounts, and payment collection suited to hospitality operations.',
      },
      {
        title: 'Staff roles',
        description:
          'Permissions for reception, wait staff, kitchen, and managers with clear task ownership.',
      },
      {
        title: 'Guest communication',
        description:
          'Confirmations, reminders, and feedback collection through the channels guests actually use.',
      },
      {
        title: 'Owner reporting',
        description:
          'Daily sales, occupancy, popular items, and operational summaries without manual assembly.',
      },
    ],
    benefits: [
      {
        title: 'Faster service',
        description:
          'Reduce wait and handoff friction between booking, kitchen, and billing.',
      },
      {
        title: 'Fewer lost reservations',
        description:
          'Centralized booking records prevent double-booking and missed confirmations.',
      },
      {
        title: 'Clearer commercial insight',
        description:
          'Know what sells, when demand peaks, and where operations need attention.',
      },
    ],
    process: discoveryProcess(
      'Observe current front-desk, floor, and kitchen workflows with your team.',
      'Define modules for reservations, orders, billing, and reporting priorities.',
      'Implement, integrate payments/devices as needed, and train staff.',
      'Stabilize during live service and iterate based on peak-hour feedback.',
    ),
    technologies: [
      'React',
      'Node.js',
      'PostgreSQL',
      'POS integrations',
      'Payments',
      'WhatsApp / SMS',
      'Cloud hosting',
    ],
    faqs: [
      {
        question: 'Can one system cover both hotel and restaurant needs?',
        answer:
          'Yes, when your operation requires it. We can also deliver focused modules if you only need restaurant or hotel workflows first.',
      },
      {
        question: 'Do you support online ordering or booking widgets?',
        answer:
          'Yes. Customer-facing booking or ordering can be added to your website or mobile experience.',
      },
      {
        question: 'Will staff need heavy training?',
        answer:
          'We design for busy hospitality floors — simple actions, clear statuses, and practical training during rollout.',
      },
    ],
    relatedSlugs: [
      'travel-tourism-software',
      'website-development',
      'digital-marketing',
    ],
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-Commerce Solutions',
    shortTitle: 'E-commerce',
    tagline: 'Online stores built to sell, fulfill, and scale.',
    summary:
      'E-commerce websites and commerce platforms with catalogs, carts, payments, and order operations.',
    overview: [
      'A store should do more than display products — it should convert visitors, capture orders cleanly, and keep fulfillment organized.',
      'We build e-commerce experiences for D2C brands, retailers, and product businesses that need premium UX with practical backend operations.',
    ],
    icon: 'ShoppingCart',
    illustration: 'commerce',
    seo: {
      title: 'E-Commerce Website & Store Development | U&V',
      description:
        'U&V builds e-commerce solutions with product catalogs, checkout, payments, and order management for growing brands.',
      keywords: [
        'ecommerce development',
        'online store India',
        'Shopify alternative custom store',
        'ecommerce website Tamil Nadu',
        'D2C website development',
      ],
    },
    features: [
      {
        title: 'Product catalog UX',
        description:
          'Collections, filters, variants, and product detail pages designed for clarity and conversion.',
      },
      {
        title: 'Checkout & payments',
        description:
          'Secure checkout flows with popular Indian payment options and order confirmation.',
      },
      {
        title: 'Order management',
        description:
          'Admin tools for statuses, fulfillment notes, returns handling, and customer updates.',
      },
      {
        title: 'Inventory sync',
        description:
          'Keep stock accurate across channels to reduce overselling and manual corrections.',
      },
      {
        title: 'Promotions engine',
        description:
          'Coupons, offers, and campaign landing support for launches and seasonal sales.',
      },
      {
        title: 'SEO for commerce',
        description:
          'Indexable product and category pages structured for discovery and long-term organic growth.',
      },
    ],
    benefits: [
      {
        title: 'Sell beyond local reach',
        description:
          'Open a professional storefront that works while your team sleeps.',
      },
      {
        title: 'Cleaner operations',
        description:
          'Orders, payments, and stock stay connected instead of living in separate chats.',
      },
      {
        title: 'Brand-controlled experience',
        description:
          'Own your customer journey instead of depending only on marketplaces.',
      },
    ],
    process: discoveryProcess(
      'Clarify catalog size, fulfillment model, payment needs, and growth goals.',
      'Design store IA, checkout flow, and operations dashboard requirements.',
      'Build storefront and admin, connect payments/shipping, and test end-to-end.',
      'Launch with analytics, then optimize conversion and fulfillment loops.',
    ),
    technologies: [
      'Next.js',
      'Headless commerce',
      'PostgreSQL',
      'Payment gateways',
      'Shipping APIs',
      'SEO',
      'Analytics',
    ],
    faqs: [
      {
        question: 'Do you build custom stores or use platforms like Shopify?',
        answer:
          'We recommend the best fit. Some brands need a managed platform; others need a custom or headless store. We advise before building.',
      },
      {
        question: 'Can you migrate an existing store?',
        answer:
          'Yes. We can migrate products, customers, and essential history with a careful cutover plan.',
      },
      {
        question: 'Will the store work well on mobile?',
        answer:
          'Yes. Mobile conversion is treated as a primary design constraint, not an afterthought.',
      },
    ],
    relatedSlugs: [
      'website-development',
      'digital-marketing',
      'erp-software',
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Digital marketing',
    tagline: 'Campaigns and systems that attract the right customers.',
    summary:
      'Performance-minded digital marketing across SEO, content, ads, and conversion systems that compound over time.',
    overview: [
      'Marketing only works when message, channel, and landing experience are aligned. We help you attract qualified demand and turn it into conversations your team can close.',
      'Our approach combines creative, tracking, and iteration — so spend and effort go toward what actually moves pipeline.',
    ],
    icon: 'Megaphone',
    illustration: 'marketing',
    seo: {
      title: 'Digital Marketing Services for Growing Businesses | U&V',
      description:
        'U&V provides digital marketing services spanning SEO, content, ads, and conversion systems for startups and SMEs.',
      keywords: [
        'digital marketing agency',
        'SEO services India',
        'performance marketing',
        'lead generation Tamil Nadu',
        'Google Ads Meta Ads',
      ],
    },
    features: [
      {
        title: 'SEO & content systems',
        description:
          'Technical SEO, topic strategy, and content that matches how your buyers search.',
      },
      {
        title: 'Paid acquisition',
        description:
          'Campaign setup and optimization across search and social with clear conversion goals.',
      },
      {
        title: 'Landing page alignment',
        description:
          'Message match between ads/content and pages so traffic does not bounce away.',
      },
      {
        title: 'Tracking & attribution',
        description:
          'Analytics and conversion events so you can see which channels create real inquiries.',
      },
      {
        title: 'WhatsApp & CRM handoff',
        description:
          'Route leads into follow-up systems your sales team will actually use.',
      },
      {
        title: 'Iteration cadence',
        description:
          'Regular review cycles that improve creative, targeting, and conversion paths.',
      },
    ],
    benefits: [
      {
        title: 'More qualified demand',
        description:
          'Attract people who are actually looking for what you offer.',
      },
      {
        title: 'Clearer ROI signals',
        description:
          'Know what to scale and what to stop based on inquiry and pipeline data.',
      },
      {
        title: 'Compounding presence',
        description:
          'SEO and content assets keep working after campaign bursts end.',
      },
    ],
    process: discoveryProcess(
      'Audit your current channels, offer clarity, analytics, and conversion paths.',
      'Set channel priorities, messaging angles, and a 90-day execution plan.',
      'Launch campaigns/content, improve landing experiences, and wire tracking.',
      'Optimize weekly/monthly based on lead quality and cost efficiency.',
    ),
    technologies: [
      'Google Analytics',
      'Search Console',
      'Google Ads',
      'Meta Ads',
      'SEO tooling',
      'CRM / WhatsApp',
      'Landing pages',
    ],
    faqs: [
      {
        question: 'Do you guarantee rankings or leads?',
        answer:
          'No honest partner can guarantee rankings. We focus on measurable systems, clear reporting, and continuous improvement toward qualified inquiries.',
      },
      {
        question: 'Can marketing work without a good website?',
        answer:
          'Weak websites waste spend. We often improve landing experience alongside campaigns so traffic can convert.',
      },
      {
        question: 'What budget do we need to start?',
        answer:
          'It depends on your market and goals. We help you start with a focused plan instead of spreading thin across too many channels.',
      },
    ],
    relatedSlugs: [
      'website-development',
      'branding-logo-design',
      'crm-software',
    ],
  },
  {
    slug: 'branding-logo-design',
    title: 'Branding & Logo Design',
    shortTitle: 'Branding',
    tagline: 'Identity systems that make your business memorable.',
    summary:
      'Brand identity, logo design, and visual systems that communicate trust and differentiation from day one.',
    overview: [
      'Strong branding is not decoration — it is how customers recognize you, remember you, and decide you feel credible.',
      'We create logos and brand systems that work across website, social, packaging, and sales materials with consistency and clarity.',
    ],
    icon: 'Palette',
    illustration: 'branding',
    seo: {
      title: 'Branding & Logo Design Services | U&V',
      description:
        'U&V designs brand identities and logos for startups and growing companies — distinctive, practical, and ready for digital use.',
      keywords: [
        'logo design',
        'brand identity design',
        'startup branding India',
        'visual identity system',
        'branding agency Tamil Nadu',
      ],
    },
    features: [
      {
        title: 'Brand discovery',
        description:
          'Clarify positioning, audience perception, and the personality your brand should express.',
      },
      {
        title: 'Logo design',
        description:
          'Distinctive marks designed for clarity at every size — from app icon to signage.',
      },
      {
        title: 'Visual system',
        description:
          'Color, type, spacing, and graphic language that stay coherent across touchpoints.',
      },
      {
        title: 'Brand guidelines',
        description:
          'Practical rules so your team and vendors apply the brand consistently.',
      },
      {
        title: 'Digital-ready assets',
        description:
          'Export packs for web, social, presentations, and print without quality loss.',
      },
      {
        title: 'Launch application',
        description:
          'Apply the identity to website hero, social templates, or stationery as needed.',
      },
    ],
    benefits: [
      {
        title: 'Instant recognition',
        description:
          'A coherent look helps people remember you across ads, WhatsApp, and your website.',
      },
      {
        title: 'Higher perceived quality',
        description:
          'Professional identity signals seriousness before a prospect reads a single paragraph.',
      },
      {
        title: 'Faster creative production',
        description:
          'Guidelines and templates reduce redesign debates every time you publish something new.',
      },
    ],
    process: discoveryProcess(
      'Understand your market, competitors, and the impression you need to own.',
      'Explore directions, refine a chosen path, and lock core identity decisions.',
      'Deliver final logo files, system components, and usage guidelines.',
      'Support first applications on web and marketing materials after approval.',
    ),
    technologies: [
      'Figma',
      'Vector logo systems',
      'Brand guidelines',
      'Social templates',
      'Web application',
      'Asset export packs',
    ],
    faqs: [
      {
        question: 'Do you only design logos or full brand systems?',
        answer:
          'Both. Some clients need a focused logo package; others need a full visual system and guidelines.',
      },
      {
        question: 'How many concepts do we get?',
        answer:
          'We present curated directions based on discovery, then refine the strongest path instead of dumping dozens of weak options.',
      },
      {
        question: 'Will assets work for both print and digital?',
        answer:
          'Yes. Delivery includes formats suited for web, social, and print usage.',
      },
    ],
    relatedSlugs: [
      'website-development',
      'digital-marketing',
      'startup-business-consulting',
    ],
  },
  {
    slug: 'startup-business-consulting',
    title: 'Startup Business Consulting',
    shortTitle: 'Startup consulting',
    tagline: 'Clarity from idea to operating company.',
    summary:
      'Business planning and founder consulting to validate direction, prioritize milestones, and prepare for build and launch.',
    overview: [
      'Many startups struggle not from lack of effort, but from unclear sequencing — what to build first, who to sell to, and which decisions can wait.',
      'We help founders turn ideas into practical business plans, milestone maps, and technology/growth priorities that match their stage.',
    ],
    icon: 'Rocket',
    illustration: 'consulting',
    seo: {
      title: 'Startup Business Consulting & Planning | U&V',
      description:
        'U&V provides startup business consulting — planning, prioritization, and go-to-market clarity for founders ready to build.',
      keywords: [
        'startup consulting India',
        'business planning',
        'founder consulting',
        'startup roadmap',
        'business model consulting Tamil Nadu',
      ],
    },
    features: [
      {
        title: 'Idea & model clarity',
        description:
          'Pressure-test the offer, customer, and revenue logic before heavy spending begins.',
      },
      {
        title: 'Milestone roadmap',
        description:
          'A practical sequence for registration, branding, product, and first customers.',
      },
      {
        title: 'Go-to-market outline',
        description:
          'Identify the first channels and messages that can generate early traction.',
      },
      {
        title: 'Technology advisory',
        description:
          'Decide what to build now versus later so MVP scope stays focused and fundable.',
      },
      {
        title: 'Pitch-ready narrative',
        description:
          'Help structure how you explain the business to partners, hires, and early customers.',
      },
      {
        title: 'Execution partnership',
        description:
          'Continue into branding, product, and marketing when you are ready to build.',
      },
    ],
    benefits: [
      {
        title: 'Fewer expensive wrong turns',
        description:
          'Validate direction before committing budget to the wrong product or channel.',
      },
      {
        title: 'Founder focus',
        description:
          'Replace scattershot tasks with a clear weekly priority list.',
      },
      {
        title: 'Smoother handoff to build',
        description:
          'Enter design and development with requirements that are actually decision-ready.',
      },
    ],
    process: discoveryProcess(
      'Founder interview covering vision, constraints, market, and current traction.',
      'Business plan outline, assumptions list, and prioritized 30/60/90 plan.',
      'Workshops to refine offer, customer profile, and first execution bets.',
      'Optional continuation into registration, branding, product, or marketing delivery.',
    ),
    technologies: [
      'Business model canvases',
      'Roadmapping',
      'Market research synthesis',
      'MVP scoping',
      'KPI frameworks',
    ],
    faqs: [
      {
        question: 'Is this only for tech startups?',
        answer:
          'No. We work with product, service, and hybrid businesses that need clearer planning and execution sequencing.',
      },
      {
        question: 'Can you help if I only have an idea?',
        answer:
          'Yes. Many engagements begin at idea stage and move into registration, branding, and build when ready.',
      },
      {
        question: 'Do you also implement the plan?',
        answer:
          'Yes. Consulting can stand alone, or continue into U&V delivery across product, brand, and growth.',
      },
    ],
    relatedSlugs: [
      'business-registration-support',
      'branding-logo-design',
      'website-development',
    ],
  },
  {
    slug: 'business-registration-support',
    title: 'Business Registration Support',
    shortTitle: 'Registration support',
    tagline: 'Hands-on help to establish your business the right way.',
    summary:
      'Assistance with company registration readiness, documentation guidance, and launch setup so you can operate formally with confidence.',
    overview: [
      'Starting a company involves structure decisions, documentation, and compliance steps that are easy to delay — and costly to redo later.',
      'We provide practical business registration support so founders can move from idea to a formally set-up business with clearer next steps.',
    ],
    icon: 'Briefcase',
    illustration: 'registration',
    seo: {
      title: 'Business Registration Support | Startup Setup Help | U&V',
      description:
        'U&V helps founders with business registration support, documentation guidance, and launch readiness across Tamil Nadu and India.',
      keywords: [
        'business registration support',
        'company registration help India',
        'startup registration',
        'business setup Tamil Nadu',
        'company formation assistance',
      ],
    },
    features: [
      {
        title: 'Structure guidance',
        description:
          'Clarify which business structure fits your stage, partners, and operating model.',
      },
      {
        title: 'Documentation readiness',
        description:
          'Prepare the information and paperwork checklist needed for registration workflows.',
      },
      {
        title: 'Process coordination',
        description:
          'Practical support through registration steps so founders are not stuck guessing what comes next.',
      },
      {
        title: 'Banking & launch prep',
        description:
          'Guidance on common post-registration setup tasks needed to start operating.',
      },
      {
        title: 'Brand & digital next steps',
        description:
          'Connect registration momentum into logo, website, and go-to-market when you are ready.',
      },
      {
        title: 'Founder-friendly communication',
        description:
          'Clear explanations without unnecessary jargon — so decisions stay understandable.',
      },
    ],
    benefits: [
      {
        title: 'Faster formal start',
        description:
          'Reduce delays caused by incomplete documents or unclear sequencing.',
      },
      {
        title: 'Fewer rework cycles',
        description:
          'Make structure and naming decisions carefully before they become expensive to change.',
      },
      {
        title: 'Confidence to operate',
        description:
          'Move into banking, branding, and sales with a properly established foundation.',
      },
    ],
    process: discoveryProcess(
      'Understand founders, ownership, business activity, and target timeline.',
      'Recommend structure path and prepare a documentation/action checklist.',
      'Support registration steps and coordinate practical follow-through.',
      'Hand off into branding, banking readiness, and digital launch planning.',
    ),
    technologies: [
      'Documentation checklists',
      'Process tracking',
      'Secure file sharing',
      'Founder onboarding kits',
    ],
    faqs: [
      {
        question: 'Do you file registrations directly as a government portal?',
        answer:
          'We provide hands-on support and coordination for registration readiness. Exact filing pathways depend on your entity type and requirements, which we clarify during discovery.',
      },
      {
        question: 'Can you help after registration too?',
        answer:
          'Yes. Many clients continue into branding, website, software, and marketing once the business is formally set up.',
      },
      {
        question: 'How quickly can we start?',
        answer:
          'You can begin with a discovery conversation immediately. Timelines then depend on document readiness and the registration path selected.',
      },
    ],
    relatedSlugs: [
      'startup-business-consulting',
      'branding-logo-design',
      'website-development',
    ],
  },
];

export function getAllServices() {
  return serviceCatalog;
}

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug);
}

export function getRelatedServices(service: ServiceDefinition) {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is ServiceDefinition => Boolean(item));
}

export function getServicePath(slug: string) {
  return `/services/${slug}`;
}
