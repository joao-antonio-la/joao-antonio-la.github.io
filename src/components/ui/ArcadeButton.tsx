import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { buttonVariants, type ButtonVariantProps } from "./button-variants";

type ArcadeBaseProps = {
  children: ReactNode;
  className?: string;
};

const ArcadeBase = ({ children, className }: ArcadeBaseProps) => {
  return <div className={cn("arcade-button w-fit hard-shadow", className)}>{children}</div>;
};

type ArcadeButtonProps = ComponentProps<typeof Button> & {
  baseClassName?: string;
};

export const ArcadeButton = ({ baseClassName, ...props }: ArcadeButtonProps) => {
  return (
    <ArcadeBase className={baseClassName}>
      <Button {...props} />
    </ArcadeBase>
  );
};

type ArcadeLinkProps = ComponentProps<"a"> &
  ButtonVariantProps & {
    baseClassName?: string;
  };

export const ArcadeLink = ({ baseClassName, className, variant, size, ...props }: ArcadeLinkProps) => {
  return (
    <ArcadeBase className={baseClassName}>
      <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
    </ArcadeBase>
  );
};
