/**
 * Why U&V — cinematic story chapters (one continuous brand film)
 */

import { wuvPrinciples } from './why-uandv-content';

export type WuvFilmChapterId =
  | 'idea'
  | 'disappointed'
  | 'understood'
  | 'build'
  | 'launch'
  | 'partnership';

export type WuvFilmChapter = {
  id: WuvFilmChapterId;
  chapter: number;
  feeling: string;
  title: string;
  image: string;
  imageAlt: string;
  /** Existing page copy woven into the scene */
  body: readonly string[];
  beats?: readonly string[];
};

const STORY_BASE = '/images/why-uandv/story';

export const wuvFilmChapters: readonly WuvFilmChapter[] = [
  {
    id: 'idea',
    chapter: 1,
    feeling: 'I have an idea.',
    title: 'Why Partnership Matters More Than Software',
    image: `${STORY_BASE}/chapter-01-idea.webp`,
    imageAlt:
      'A business founder shares her idea with a U&V consultant in a bright modern office',
    body: [
      'Choosing a software partner is not really a technology decision. It is a trust decision.',
      'Most business owners have been here before. A vendor promises the world, delivers something that almost works, and moves on. You are left managing the gap — fixing what should have been right the first time, explaining delays to your team, wondering whether anyone on the other side actually cares about your business.',
    ],
  },
  {
    id: 'disappointed',
    chapter: 2,
    feeling: 'I have been disappointed before.',
    title: 'That experience is common. It is also avoidable.',
    image: `${STORY_BASE}/chapter-02-disappointed.webp`,
    imageAlt:
      'The pain of late delivery and broken vendor promises transitions into a reassuring U&V partnership',
    body: [
      'Before choosing the right partner, many businesses live through the same cycle — overpromising, delays, poor communication, incomplete delivery, and a vendor who disappears once the invoice is paid.',
      'U&V was built on a different premise: your business matters more than any single project. We do not measure success by what we ship — we measure it by whether your business is stronger because we were involved.',
    ],
    beats: ['Late delivery', 'No support', 'Broken promises'],
  },
  {
    id: 'understood',
    chapter: 3,
    feeling: 'Now someone finally understands me.',
    title: 'We listen first. Then we plan with clarity.',
    image: `${STORY_BASE}/chapter-03-understood.webp`,
    imageAlt:
      'Founder and U&V consultant planning together at a whiteboard with roadmap and laptops',
    body: [
      'We understand your business, challenges, customers and goals before recommending technology.',
      'We shape the right solution, priorities and roadmap around your business needs.',
      wuvPrinciples.intro,
    ],
    beats: ['Planning together', 'Roadmap', 'Eye contact', 'Trust'],
  },
  {
    id: 'build',
    chapter: 4,
    feeling: 'We build together.',
    title: 'Turn ideas into products — with precision.',
    image: `${STORY_BASE}/chapter-04-build.webp`,
    imageAlt:
      'Founder and U&V consultant reviewing website, mobile app and dashboard development',
    body: [
      'We design and develop websites, apps, software, CRM and automation with clarity.',
      'What we deliver is meant to run your business day after day — reliable, maintainable, and ready for the pressure of real operations.',
    ],
    beats: ['Design', 'Development', 'Testing', 'Dashboard', 'Mobile'],
  },
  {
    id: 'launch',
    chapter: 5,
    feeling: 'We launch.',
    title: 'Go live with confidence.',
    image: `${STORY_BASE}/chapter-05-launch.webp`,
    imageAlt:
      'Launch celebration as the product goes live and customers receive notifications',
    body: [
      'We test, refine and support the product through a reliable launch.',
      'Launch is a milestone, not goodbye. We remain your partner for support, improvement, and the next stage of growth.',
    ],
    beats: ['Live notification', 'Customer receives product', 'Growth begins'],
  },
  {
    id: 'partnership',
    chapter: 6,
    feeling: 'They never disappeared.',
    title: 'A good partnership keeps your business moving.',
    image: `${STORY_BASE}/chapter-06-partnership.webp`,
    imageAlt:
      'Long-term U&V support with analytics improving and the business growing',
    body: [
      'We do not ask you to trust slogans. We ask you to trust a delivery framework you can see — clear milestones, written scope, and support that continues after launch.',
      'Anyone can promise a project. U&V shows up for the business behind it. That is who we are. That is what you can expect.',
      wuvPrinciples.outro,
    ],
    beats: ['Support', 'Updates', 'Analytics improving', 'Business growing'],
  },
] as const;

export const wuvFilmIndustries =
  'Trusted by businesses across healthcare, finance, education, travel, hospitality, and logistics.';
