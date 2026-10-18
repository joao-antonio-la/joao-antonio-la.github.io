import { cn } from "@/lib/utils";

export type IconProps = {
  className?: string;
};

type PixelIconProps = IconProps & {
  src: string;
  shapeClassName?: string;
};

export const PixelIcon = ({ src, className, shapeClassName }: PixelIconProps) => {
  const mask = `url("${src}")`;

  return (
    <div aria-hidden className={cn("size-6 shrink-0", className)}>
      <span
        className={cn("block size-full bg-current mask-contain mask-center mask-no-repeat", shapeClassName)}
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>
  );
};
