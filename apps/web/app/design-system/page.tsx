'use client';

import type { ReactNode } from 'react';

import {
  Alert,
  AppShell,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
  Checkbox,
  Container,
  Fieldset,
  Footer,
  Form,
  FormField,
  Grid,
  GridItem,
  Heading,
  Hide,
  Icon,
  Input,
  InputGroup,
  NavBrand,
  Navbar,
  Radio,
  RadioGroup,
  Section,
  Select,
  Separator,
  Show,
  Sidebar,
  Stack,
  Switch,
  Text,
  Textarea,
  ThemeToggle,
  brandColors,
  designTokens,
  neutralColors,
  semanticColors,
} from '@uandv/ui';

function Swatch({ name, color }: { name: string; color: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-16 rounded-uv-lg border border-uv-border shadow-uv-sm"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="text-xs font-medium text-uv-foreground">{name}</p>
        <p className="font-mono text-xs text-uv-foreground-muted">{color}</p>
      </div>
    </div>
  );
}

function ComponentSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Section id={id} spacing="md" className="border-b border-uv-border scroll-mt-20">
      <Stack gap={6}>
        <div>
          <Heading level={2}>{title}</Heading>
          <Text muted className="mt-2 max-w-2xl">
            {description}
          </Text>
        </div>
        {children}
      </Stack>
    </Section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="uv-root min-h-screen">
      <Navbar
        brand={<NavBrand>U&V Design System</NavBrand>}
        links={[
          { label: 'Colors', href: '#colors', active: true },
          { label: 'Type', href: '#typography' },
          { label: 'Buttons', href: '#buttons' },
          { label: 'Forms', href: '#forms' },
          { label: 'Layout', href: '#layout' },
        ]}
        actions={
          <Stack direction="horizontal" gap={2} align="center">
            <ThemeToggle variant="segmented" />
          </Stack>
        }
      />

      <Section spacing="xl" containerSize="lg">
        <Stack gap={4}>
          <Text variant="overline">Complete UI kit</Text>
          <Heading level={1} variant="display">
            U&V Design System
          </Heading>
          <Text variant="body-lg" muted className="max-w-3xl">
            Reusable tokens and components for every U&V surface. Preview only —
            not a marketing landing page or dashboard.
          </Text>
        </Stack>
      </Section>

      <ComponentSection
        id="colors"
        title="Color Palette"
        description="Brand, neutral, and semantic colors with light/dark theme roles."
      >
        <Text variant="label">Brand</Text>
        <Grid cols={2} sm={3} md={4} lg={6} gap={4}>
          {Object.entries(brandColors).map(([shade, color]) => (
            <GridItem key={shade}>
              <Swatch name={`brand-${shade}`} color={color} />
            </GridItem>
          ))}
        </Grid>
        <Text variant="label" className="mt-4">
          Neutrals
        </Text>
        <Grid cols={2} sm={3} md={4} lg={6} gap={4}>
          {Object.entries(neutralColors).map(([shade, color]) => (
            <GridItem key={shade}>
              <Swatch name={`neutral-${shade}`} color={color} />
            </GridItem>
          ))}
        </Grid>
        <Text variant="label" className="mt-4">
          Semantic
        </Text>
        <Grid cols={2} sm={4} gap={4}>
          {Object.entries(semanticColors).map(([name, color]) => (
            <GridItem key={name}>
              <Swatch name={name} color={color} />
            </GridItem>
          ))}
        </Grid>
      </ComponentSection>

      <ComponentSection
        id="typography"
        title="Typography"
        description="Responsive type scale with display, headings, and body styles."
      >
        <Stack gap={4}>
          <Heading level={1} variant="display">
            Display
          </Heading>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Heading level={5}>Heading 5</Heading>
          <Heading level={6}>Heading 6</Heading>
          <Text variant="body-lg">Body large — supporting copy for heroes.</Text>
          <Text>Body — default reading size.</Text>
          <Text variant="body-sm">Body small — dense UI text.</Text>
          <Text variant="caption">Caption — metadata and hints.</Text>
          <Text variant="overline">Overline — section labels</Text>
        </Stack>
      </ComponentSection>

      <ComponentSection
        id="buttons"
        title="Button Library"
        description="Variants, sizes, icons, loading, groups, and full-width actions."
      >
        <Stack gap={4}>
          <Stack direction="horizontal" gap={3} className="flex-wrap">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </Stack>
          <Stack direction="horizontal" gap={3} className="flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button isLoading>Loading</Button>
            <Button leftIcon={<Icon name="Plus" size="sm" />}>Add item</Button>
            <Button
              variant="outline"
              rightIcon={<Icon name="ArrowRight" size="sm" />}
            >
              Continue
            </Button>
            <Button size="icon" variant="outline" aria-label="Settings">
              <Icon name="Settings" size="sm" />
            </Button>
          </Stack>
          <ButtonGroup attached>
            <Button variant="outline">Day</Button>
            <Button variant="outline">Week</Button>
            <Button variant="outline">Month</Button>
          </ButtonGroup>
          <Button fullWidth>Full width CTA</Button>
        </Stack>
      </ComponentSection>

      <ComponentSection
        id="cards"
        title="Cards"
        description="Surface containers with variants for content grouping."
      >
        <Grid cols={1} md={2} lg={3} gap={6}>
          <Card>
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Bordered with subtle shadow.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text muted>Use for standard content blocks.</Text>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Stronger elevation, no hard border.</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>Featured</Badge>
            </CardContent>
          </Card>
          <Card variant="outlined" interactive>
            <CardMedia className="flex h-28 items-center justify-center">
              <Icon name="Store" className="text-uv-brand" size="xl" />
            </CardMedia>
            <CardHeader>
              <CardTitle>Interactive + media</CardTitle>
              <CardDescription>Hover/focus affordance for selection.</CardDescription>
            </CardHeader>
          </Card>
        </Grid>
      </ComponentSection>

      <ComponentSection
        id="forms"
        title="Forms"
        description="Accessible inputs, groups, radios, switches, and validation states."
      >
        <Container size="md" className="px-0">
          <Form>
            <FormField label="Email" required hint="Work email preferred.">
              <InputGroup startAdornment={<Icon name="Mail" size="sm" />}>
                <Input type="email" placeholder="you@company.com" />
              </InputGroup>
            </FormField>
            <FormField label="Message">
              <Textarea placeholder="Tell us about your business..." />
            </FormField>
            <FormField label="Plan">
              <Select defaultValue="">
                <option value="" disabled>
                  Select a plan
                </option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </Select>
            </FormField>
            <FormField label="Website" error="Please enter a valid URL.">
              <Input placeholder="https://" error />
            </FormField>
            <RadioGroup legend="Account type" orientation="horizontal">
              <Radio name="account" label="Personal" defaultChecked />
              <Radio name="account" label="Business" />
            </RadioGroup>
            <Switch label="Email me product updates" defaultChecked />
            <Checkbox label="I agree to the terms of service" />
            <Fieldset
              legend="Team invite"
              description="Optional — invite a teammate later."
            >
              <FormField label="Teammate email">
                <Input type="email" placeholder="teammate@company.com" />
              </FormField>
            </Fieldset>
            <Button type="button">Submit</Button>
          </Form>
        </Container>
      </ComponentSection>

      <ComponentSection
        id="icons"
        title="Icons"
        description="Curated Lucide set via the typed Icon component."
      >
        <Stack direction="horizontal" gap={4} className="flex-wrap">
          {(
            [
              'Home',
              'User',
              'Store',
              'MessageCircle',
              'Sparkles',
              'CreditCard',
              'Bell',
              'Search',
              'Settings',
              'Building2',
            ] as const
          ).map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-uv-lg border border-uv-border p-3"
            >
              <Icon name={name} className="text-uv-brand" />
              <Text variant="caption">{name}</Text>
            </div>
          ))}
        </Stack>
      </ComponentSection>

      <ComponentSection
        id="feedback"
        title="Badges, Alerts & Avatars"
        description="Status and identity primitives used across surfaces."
      >
        <Stack direction="horizontal" gap={2} className="flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </Stack>
        <Stack gap={3} className="mt-4 max-w-2xl">
          <Alert variant="info" title="Information">
            Neutral system message for guidance.
          </Alert>
          <Alert variant="success" title="Success">
            Your changes were saved.
          </Alert>
          <Alert variant="warning" title="Warning">
            Review before continuing.
          </Alert>
          <Alert variant="error" title="Error">
            Something went wrong.
          </Alert>
        </Stack>
        <Stack direction="horizontal" gap={3} align="center" className="mt-4">
          <Avatar size="sm" alt="Ada Lovelace" />
          <Avatar size="md" alt="Grace Hopper" />
          <Avatar size="lg" alt="Alan Turing" fallback="AT" />
          <Avatar size="xl" alt="U and V" fallback="UV" />
        </Stack>
      </ComponentSection>

      <ComponentSection
        id="navigation"
        title="Navigation"
        description="Top navbar (above) and reusable sidebar for app shells."
      >
        <div className="overflow-hidden rounded-uv-xl border border-uv-border">
          <AppShell
            sidebar={
              <Sidebar
                brand={<NavBrand>U&V</NavBrand>}
                items={[
                  { label: 'Home', href: '#', icon: 'Home', active: true },
                  { label: 'Business', href: '#', icon: 'Building2' },
                  { label: 'Messages', href: '#', icon: 'MessageCircle' },
                  { label: 'Settings', href: '#', icon: 'Settings' },
                ]}
              />
            }
            header={
              <div className="flex h-14 items-center justify-between border-b border-uv-border px-4">
                <Text variant="label">App shell preview</Text>
                <Avatar size="sm" alt="Demo User" fallback="DU" />
              </div>
            }
          >
            <div className="p-6">
              <Text muted>
                Sidebar + header layout primitive. Not a real dashboard.
              </Text>
            </div>
          </AppShell>
        </div>
      </ComponentSection>

      <ComponentSection
        id="layout"
        title="Responsive Layout"
        description="Container, grid, show/hide breakpoints, and separators."
      >
        <Grid cols={1} md={3} gap={4}>
          {[1, 2, 3].map((item) => (
            <GridItem key={item}>
              <div className="rounded-uv-lg border border-uv-border bg-uv-background-muted p-6 text-center text-sm">
                Column {item}
              </div>
            </GridItem>
          ))}
        </Grid>
        <Grid cols={1} md={12} gap={4} className="mt-4">
          <GridItem mdSpan={8}>
            <div className="rounded-uv-lg border border-uv-border bg-uv-brand-muted p-6 text-sm">
              Main (8 cols)
            </div>
          </GridItem>
          <GridItem mdSpan={4}>
            <div className="rounded-uv-lg border border-uv-border bg-uv-background-muted p-6 text-sm">
              Side (4 cols)
            </div>
          </GridItem>
        </Grid>
        <Separator className="my-6" />
        <Stack direction="horizontal" gap={4} className="flex-wrap">
          <Show from="md">
            <Badge variant="info">Visible from md+</Badge>
          </Show>
          <Hide from="md">
            <Badge variant="warning">Hidden from md+</Badge>
          </Hide>
        </Stack>
        <Card className="mt-4">
          <CardContent className="pt-6">
            <pre className="overflow-x-auto rounded-uv-lg bg-uv-background-muted p-4 text-xs">
              {JSON.stringify(
                {
                  breakpoints: designTokens.breakpoints,
                  spacing: designTokens.spacing,
                  radii: designTokens.radii,
                  motion: designTokens.motion,
                },
                null,
                2,
              )}
            </pre>
          </CardContent>
        </Card>
      </ComponentSection>

      <ComponentSection
        id="themes"
        title="Light & Dark Mode"
        description="ThemeProvider + ThemeScript + ThemeToggle (light / dark / system)."
      >
        <ThemeToggle variant="segmented" />
        <Text muted className="mt-4 max-w-xl">
          Surfaces, borders, and brand roles update via CSS variables
          (`data-theme` / `.dark`). Use ThemeScript in the document head to
          avoid flash of incorrect theme.
        </Text>
      </ComponentSection>

      <Footer
        brand="U&V"
        description="Complete reusable design system for the U&V platform."
        columns={[
          {
            title: 'Foundation',
            links: [
              { label: 'Colors', href: '#colors' },
              { label: 'Typography', href: '#typography' },
            ],
          },
          {
            title: 'Components',
            links: [
              { label: 'Buttons', href: '#buttons' },
              { label: 'Forms', href: '#forms' },
              { label: 'Cards', href: '#cards' },
            ],
          },
          {
            title: 'Structure',
            links: [
              { label: 'Navigation', href: '#navigation' },
              { label: 'Layout', href: '#layout' },
              { label: 'Themes', href: '#themes' },
            ],
          },
        ]}
        social={[
          { label: 'Mail', href: '#', icon: 'Mail' },
          { label: 'Messages', href: '#', icon: 'MessageCircle' },
        ]}
        bottom={
          <p>© {new Date().getFullYear()} U&V. Internal design system catalog.</p>
        }
      />
    </div>
  );
}
