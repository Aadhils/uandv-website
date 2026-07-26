import type { IconName } from '@uandv/ui';

export const fintechPositioning = {
  eyebrow: 'Financial Technology Development Company',
  headline: 'Build the secure FinTech platform your business runs on',
  subheadline:
    'U&V is a financial technology development company. We design and build software, platforms, automation, CRM systems, client portals, mobile apps, and API integrations for financial-market businesses.',
  heroSummary:
    'Whether you need a broker CRM, client portal, operations dashboard, or full product engineering — U&V delivers secure, scalable technology your team and clients can rely on every day.',
  trustLine:
    'We build software. We do not trade, provide financial advice, manage investments, or guarantee returns.',
} as const;

export const fintechAudiences = [
  'Stock brokers modernising client onboarding and day-to-day operations',
  'Proprietary trading firms scaling internal systems and admin workflows',
  'Financial advisors who need secure client portals and organised workflows',
  'Wealth managers coordinating client data across teams and tools',
  'Research firms publishing structured insights to subscribers',
  'FinTech startups launching MVPs and production platforms',
  'Financial education businesses delivering digital programs at scale',
  'Portfolio operations teams needing tracking and reporting software — not U&V-managed portfolios',
  'Independent traders building personal workflow and journal tools',
  'Domestic and international financial businesses expanding digitally',
] as const;

export const fintechSolutions: ReadonlyArray<{
  title: string;
  problem: string;
  outcome: string;
  icon: IconName;
}> = [
  {
    title: 'Broker CRM and Client Portals',
    problem:
      'Client data, onboarding, and communication are scattered across spreadsheets, email, and legacy tools.',
    outcome:
      'A unified CRM and secure client portal tailored to broker workflows — onboarding, documents, and client access in one professional system.',
    icon: 'Users',
  },
  {
    title: 'Financial Analytics Dashboards',
    problem:
      'Leaders cannot see operational performance clearly without pulling data from multiple disconnected sources.',
    outcome:
      'Custom analytics views and KPI panels connected to your approved data — so teams make decisions from one reliable interface.',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Risk Management Dashboards',
    problem:
      'Exposure, limits, and compliance reporting are hard to monitor consistently as volume grows.',
    outcome:
      'Operational dashboards for limits, exposure views, alerts, and audit-friendly reporting your operations team can trust.',
    icon: 'CircleAlert',
  },
  {
    title: 'Broker and Market Data API Integrations',
    problem:
      'Your platform needs to stay connected to brokers, data vendors, and internal systems without fragile manual workarounds.',
    outcome:
      'Reliable API integrations that keep data flowing between your platform and the services your business depends on.',
    icon: 'Database',
  },
  {
    title: 'Mobile Financial Applications',
    problem:
      'Clients and field teams expect secure mobile access, but a desktop-only experience limits engagement.',
    outcome:
      'iOS and Android apps for clients, agents, and internal teams — with authentication, notifications, and workflows built for mobile use.',
    icon: 'Smartphone',
  },
  {
    title: 'Trading Journal Platforms',
    problem:
      'Traders and teams lack a structured way to log activity, review decisions, and improve process over time.',
    outcome:
      'Custom journal software for trade logging, tagging, and review workflows — your platform, not trading signals from U&V.',
    icon: 'ClipboardList',
  },
  {
    title: 'Market Research Portals',
    problem:
      'Research content is difficult to publish, gate, and deliver consistently to paying subscribers.',
    outcome:
      'A publishing platform for research notes, categories, subscriptions, and gated content delivery your audience can access professionally.',
    icon: 'FileText',
  },
  {
    title: 'Prop Firm Platforms',
    problem:
      'Evaluation flows, account rules, and admin oversight become unmanageable as trader volume increases.',
    outcome:
      'Platform infrastructure for evaluations, account dashboards, rule tracking, and admin tooling — built for how prop firms actually operate.',
    icon: 'Building2',
  },
  {
    title: 'Portfolio Tracking Systems',
    problem:
      'Holdings, activity, and reporting views are fragmented or depend on tools that do not fit your business model.',
    outcome:
      'Technology to track holdings, activity, and reporting views — built as your platform, not as U&V portfolio management.',
    icon: 'Layers',
  },
  {
    title: 'Workflow Automation',
    problem:
      'Repetitive operational tasks consume staff time and introduce errors as your business scales.',
    outcome:
      'Automation across onboarding, notifications, data processing, and internal workflows — so your team focuses on clients, not manual admin.',
    icon: 'Workflow',
  },
  {
    title: 'AI-Assisted Performance Insights',
    problem:
      'Large volumes of trading or operational data are hard to review manually for patterns and process improvement.',
    outcome:
      'AI-assisted analysis and summaries on your data — for internal insight and workflow support, not buy/sell recommendations from U&V.',
    icon: 'Bot',
  },
  {
    title: 'Subscription and Affiliate Management',
    problem:
      'Billing, plan changes, and partner tracking are awkward to manage alongside your core platform.',
    outcome:
      'Billing portals, plan management, affiliate tracking, and partner dashboards aligned to your FinTech revenue model.',
    icon: 'CreditCard',
  },
];

export const fintechProcess = [
  {
    title: 'Discovery',
    description:
      'Understand your users, workflows, compliance constraints, data sources, and how your business operates today — before any build begins.',
  },
  {
    title: 'Architecture',
    description:
      'Plan modules, security boundaries, APIs, and integrations so your CRM, portals, dashboards, and mobile apps scale together.',
  },
  {
    title: 'Development',
    description:
      'Engineer software, automation, CRM, portals, and interfaces to production standards — with maintainable code your business can grow on.',
  },
  {
    title: 'Launch & support',
    description:
      'Deploy, stabilise, monitor, and extend your platform as requirements evolve — with a partner who stays accountable after go-live.',
  },
] as const;

export const fintechWhyUandv = [
  {
    title: 'A technology partner — not a trading desk',
    description:
      'U&V builds software and digital platforms. We do not execute trades, publish signals, or promise investment outcomes.',
  },
  {
    title: 'Full-stack FinTech engineering',
    description:
      'Web, mobile, CRM, dashboards, automation, and API integrations under one accountable development partner — not a patchwork of vendors.',
  },
  {
    title: 'Security-minded delivery',
    description:
      'Role-based access, audit-friendly flows, and practical engineering discipline for the financial operations software your business depends on.',
  },
  {
    title: 'Platforms that connect to your stack',
    description:
      'Systems designed to work with your existing tools, data vendors, and growth plans — not isolated prototypes that stall after launch.',
  },
] as const;

export const fintechCompliance = {
  statement:
    'U&V provides software development and technology solutions for financial businesses. We do not provide investment advice, trading recommendations, portfolio management, or guaranteed returns.',
  exclusions: [
    'We are not a broker or trading company',
    'We are not an investment advisor or wealth manager',
    'We are not a signal provider or trade-calling service',
    'We do not guarantee profits, returns, or trading performance',
  ],
} as const;

export const fintechCapabilities = [
  'Custom software & platform engineering',
  'Workflow automation & AI',
  'CRM & secure client portals',
  'Dashboards & operational reporting',
  'Mobile apps for clients & teams',
  'API & data integrations',
] as const;
