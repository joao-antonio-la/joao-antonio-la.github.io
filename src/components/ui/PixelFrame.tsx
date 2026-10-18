import type { CSSProperties, ReactNode } from "react";
import { INNER_CLIP_PATH, OUTLINE_STYLE, px } from "@/lib/pixel-art";
import { cn } from "@/lib/utils";

const BORDER_STYLE = { padding: px(3), clipPath: INNER_CLIP_PATH };

type PixelFrameProps = {
  children: ReactNode;
  color?: string;
  className?: string;
  contentClassName?: string;
};

export const PixelFrame = ({ children, color, className, contentClassName }: PixelFrameProps) => {
  const style = color ? ({ "--frame-color": color } as CSSProperties) : undefined;

  return (
    <div className={cn("pixel-frame hard-shadow", className)} style={style}>
      <div className="h-full bg-(--frame-outline)" style={OUTLINE_STYLE}>
        <div className="pixel-frame__border h-full" style={BORDER_STYLE}>
          <div className={cn("pixel-frame__content p-4 text-white", contentClassName)}>{children}</div>
        </div>
      </div>
    </div>
  );
};
