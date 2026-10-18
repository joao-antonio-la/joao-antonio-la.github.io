import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const COLUMNS = 64;

const noise = (x: number, y: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

const buildMask = (rows: number) => {
  const blocks: string[] = [];
  for (let y = 0; y < rows; y++) {
    const density = (y + 1) / rows;
    for (let x = 0; x < COLUMNS; x++) {
      if (noise(x, y) < density) blocks.push(`M${x} ${y}h1v1h-1z`);
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${COLUMNS} ${rows}" preserveAspectRatio="none" shape-rendering="crispEdges"><path d="${blocks.join("")}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

type PixelDissolveProps = {
  rows?: number;
  blockSize?: string;
  color?: string;
  className?: string;
};

export const PixelDissolve = ({
  rows = 8,
  blockSize = "0.75rem",
  color = "var(--background)",
  className,
}: PixelDissolveProps) => {
  return (
    <div
      aria-hidden
      className={cn("pixel-dissolve pointer-events-none absolute inset-x-0 bottom-0", className)}
      style={
        {
          "--dissolve-mask": buildMask(rows),
          "--dissolve-tile-width": `calc(${COLUMNS} * ${blockSize})`,
          height: `calc(${rows} * ${blockSize})`,
          background: color,
        } as CSSProperties
      }
    />
  );
};
