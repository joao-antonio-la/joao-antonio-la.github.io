import { cn } from "@/lib/utils";

const BASE =
  "pixel-button inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 border border-transparent bg-clip-padding text-sm whitespace-nowrap transition-all outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50";

const VARIANTS = {
  default: "text-neutral-900 [--button-color:var(--color-primary)]",
  accent: "text-white [--button-color:var(--color-accent)]",
};

const SIZES = {
  default: "h-8 px-2.5",
  icon: "size-8",
  "icon-lg": "size-9",
};

export type ButtonVariantProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
};

export const buttonVariants = ({ variant = "default", size = "default" }: ButtonVariantProps = {}) => {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
};
