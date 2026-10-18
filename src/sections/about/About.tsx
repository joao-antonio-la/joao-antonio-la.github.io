import type { CSSProperties } from "react";
import { Section } from "@/components/layout/Section";
import { PixelDissolve } from "@/components/ui/PixelDissolve";
import { TerminalFrame, TerminalPrompt } from "@/components/ui/TerminalFrame";
import { readText } from "@/lib/filesystem";
import { SECTION_IDS } from "@/lib/sections";
import { LegacyArt } from "./LegacyArt";

const EDGE_STEP_COUNT = 25;
const EDGE_STEP_WIDTH = 80;
const EDGE_HEIGHT = 80;
const EDGE_TILE_WIDTH = EDGE_STEP_COUNT * EDGE_STEP_WIDTH;
const EDGE_STEP_MIN_Y = -10;
const EDGE_STEP_RANGE_Y = 64;

const buildEdgeStyle = () => {
  const steps = Array.from({ length: EDGE_STEP_COUNT }, (_, i) => {
    const y = Math.round(EDGE_STEP_MIN_Y + Math.abs(Math.sin(i * 15)) * EDGE_STEP_RANGE_Y);
    return `L${i * EDGE_STEP_WIDTH} ${y} L${(i + 1) * EDGE_STEP_WIDTH} ${y}`;
  });
  const path = [`M0 ${EDGE_HEIGHT}`, ...steps, `L${EDGE_TILE_WIDTH} ${EDGE_HEIGHT} Z`].join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${EDGE_TILE_WIDTH}" height="${EDGE_HEIGHT}"><path d="${path}" fill="black"/></svg>`;

  return {
    "--edge-mask": `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    "--edge-tile-width": `${EDGE_TILE_WIDTH}px`,
    "--edge-height": `${EDGE_HEIGHT}px`,
  } as CSSProperties;
};

const EDGE_STYLE = buildEdgeStyle();

const PARAGRAPHS = readText("~/documentos/sobre-mim.txt").filter(Boolean);

export const About = () => {
  return (
    <Section
      id={SECTION_IDS.about}
      title="Sobre"
      titleClassName="mt-4 mr-2 self-end md:mr-26"
      className="stepped-edge pb-24"
      containerClassName="max-lg:flex-col-reverse max-lg:gap-12"
      style={EDGE_STYLE}
    >
      <div aria-hidden className="stepped-edge__backdrop">
        <div className="stepped-edge__fill bg-background shadow-[inset_0_6rem_24rem_-8rem_var(--accent-secondary)]" />
      </div>
      <LegacyArt />
      <TerminalFrame
        title="bash - ~/documentos"
        className="max-w-180 max-lg:w-full max-lg:max-w-250"
        contentClassName="space-y-4"
      >
        <TerminalPrompt path="~/documentos" className="text-2xs">
          cat sobre-mim.txt
        </TerminalPrompt>
        {PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <TerminalPrompt path="~/documentos" cursor className="text-2xs" />
      </TerminalFrame>
      <PixelDissolve className="-z-10" />
    </Section>
  );
};
