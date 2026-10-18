import type { ComponentProps } from "react";
import { useOffscreenMarker } from "@/hooks/use-offscreen-marker";
import type { SectionId } from "@/lib/sections";
import { cn } from "@/lib/utils";

type SectionProps = Omit<ComponentProps<"section">, "id" | "title"> & {
  id: SectionId;
  title?: string;
  titleClassName?: string;
  containerClassName?: string;
};

export const Section = ({
  id,
  title,
  titleClassName,
  containerClassName,
  className,
  children,
  ...props
}: SectionProps) => {
  const ref = useOffscreenMarker<HTMLElement>();
  const titleId = `${id}-title`;

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className={cn("relative flex min-h-svh w-full flex-col gap-4 px-6", className)}
      {...props}
    >
      {title && (
        <h2 id={titleId} className={cn("self-center text-2xl", titleClassName)}>
          <a href={`#${id}`} className="border-b-2 border-accent">
            {title}
          </a>
        </h2>
      )}
      <div
        className={cn(
          "flex w-full flex-1 items-center justify-center gap-16 max-xl:gap-8 max-lg:flex-col max-lg:gap-4",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
};
