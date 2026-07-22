import { Heading, Text } from '@uandv/ui';

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <Text variant="overline" className="text-uv-brand">
        {eyebrow}
      </Text>
      <Heading
        level={2}
        className="mt-3 font-[family-name:var(--font-uv-display)] tracking-tight"
      >
        {title}
      </Heading>
      <Text muted className="mt-4 text-base sm:text-lg">
        {description}
      </Text>
    </div>
  );
}
