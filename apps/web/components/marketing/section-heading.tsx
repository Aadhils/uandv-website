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
    <div className="max-w-2xl min-w-0">
      <Text variant="overline" className="text-uv-brand">
        {eyebrow}
      </Text>
      <Heading
        level={2}
        className="mt-3 break-words font-[family-name:var(--font-uv-display)] tracking-tight"
      >
        {title}
      </Heading>
      <Text muted className="mt-4 break-words text-base sm:text-lg">
        {description}
      </Text>
    </div>
  );
}
