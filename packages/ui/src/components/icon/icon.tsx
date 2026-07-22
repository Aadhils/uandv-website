import {
  ArrowRight,
  Bell,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  ClipboardList,
  Clock,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Cpu,
  Database,
  Eye,
  EyeOff,
  Factory,
  FileText,
  Globe,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  Hotel,
  Info,
  Layers,
  Linkedin,
  LoaderCircle,
  type LucideIcon,
  type LucideProps,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Moon,
  Network,
  Package,
  Palette,
  Phone,
  Plane,
  Plus,
  Rocket,
  Search,
  Settings,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Sun,
  Trash2,
  Truck,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
  Workflow,
  Wrench,
  X,
  Bike,
} from 'lucide-react';

import { cn } from '../../lib/cn';

/** Curated icon registry — extend as product needs grow */
export const icons = {
  ArrowRight,
  Bell,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  Car,
  Check,
  ClipboardList,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  Clock,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Cpu,
  Database,
  Eye,
  EyeOff,
  Factory,
  FileText,
  Globe,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  Hotel,
  Info,
  Layers,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Moon,
  Network,
  Package,
  Palette,
  Phone,
  Plane,
  Plus,
  Rocket,
  Search,
  Settings,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Sun,
  Trash2,
  Truck,
  User,
  Users,
  UtensilsCrossed,
  Wallet,
  Workflow,
  Wrench,
  X,
  Bike,
} as const;

export type IconName = keyof typeof icons;

const iconSizes = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
} as const;

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  size?: keyof typeof iconSizes;
  label?: string;
}

export function Icon({
  name,
  size = 'md',
  className,
  label,
  ...props
}: IconProps) {
  const LucideIconComponent = icons[name] as LucideIcon | undefined;

  if (!LucideIconComponent) {
    return null;
  }

  return (
    <LucideIconComponent
      className={cn(iconSizes[size], 'shrink-0', className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      suppressHydrationWarning
      {...props}
    />
  );
}

export type { LucideIcon, LucideProps };
