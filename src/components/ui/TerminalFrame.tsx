import type { ReactNode } from "react";
import { HOST, USER } from "@/lib/identity";
import { INNER_CLIP_PATH, OUTLINE_STYLE } from "@/lib/pixel-art";
import { cn } from "@/lib/utils";

const CONTROLS = ["minimize", "maximize", "close"] as const;

const INNER_STYLE = { clipPath: INNER_CLIP_PATH };

type TerminalFrameProps = {
  children: ReactNode;
  title?: ReactNode;
  status?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export const TerminalFrame = ({ children, title, status, className, contentClassName }: TerminalFrameProps) => {
  return (
    <div className={cn("terminal-frame hard-shadow", className)}>
      <div className="bg-outline" style={OUTLINE_STYLE}>
        <div className="flex flex-col" style={INNER_STYLE}>
          <div className="terminal-frame__bar relative z-10 flex items-center gap-3 px-3 py-2">
            <span aria-hidden className="text-2xs text-accent">
              &gt;_
            </span>
            <div className="min-w-0 flex-1 truncate text-2xs text-plum-200">{title}</div>
            <div aria-hidden className="flex gap-1.5">
              {CONTROLS.map((icon) => (
                <span key={icon} data-icon={icon} className="terminal-frame__control" />
              ))}
            </div>
          </div>
          <div className={cn("terminal-frame__screen p-6 text-white max-sm:p-4", contentClassName)}>{children}</div>
          {status && (
            <div className="terminal-frame__status relative flex justify-between gap-4 px-3 py-1.5 text-2xs">
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type TerminalPromptProps = {
  children?: ReactNode;
  path?: string;
  cursor?: boolean;
  className?: string;
};

export const TerminalPrompt = ({ children, path = "~", cursor = false, className }: TerminalPromptProps) => {
  return (
    <p className={cn("wrap-break-word", className)}>
      <span className="text-plum-400">
        {USER}@{HOST}
      </span>
      <span className="text-white">:</span>
      <span className="text-accent-secondary">{path}</span>
      <span className="text-accent">$</span> {children}
      {cursor && <span aria-hidden className="terminal-prompt__cursor" />}
    </p>
  );
};
