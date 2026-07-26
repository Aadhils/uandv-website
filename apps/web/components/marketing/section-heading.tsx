import {
  MarketingEyebrow,
  MarketingLead,
  MarketingSectionTitle,
} from './marketing-primitives';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto max-w-2xl min-w-0 text-center'
          : 'max-w-2xl min-w-0'
      }
    >
      <MarketingEyebrow>{eyebrow}</MarketingEyebrow>
      <MarketingSectionTitle className="mt-3">{title}</MarketingSectionTitle>
      <MarketingLead className="mt-4">{description}</MarketingLead>
    </div>
  );
}
