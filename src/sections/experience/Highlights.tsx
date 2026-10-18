import { PixelArrow } from "@/components/ui/icons/PixelArrow";
import type { Highlight } from "@/content/schema";
import { readJson } from "@/lib/filesystem";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = readJson<Highlight[]>("~/experiencia/destaques.json");

type HighlightCardProps = {
  highlight: Highlight;
  mirrored: boolean;
};

const HighlightCard = ({ highlight, mirrored }: HighlightCardProps) => {
  return (
    <article
      className={cn(
        "flex gap-4 border-t border-accent pt-6 lg:first:border-t-0 lg:first:pt-0",
        mirrored && "lg:flex-row-reverse lg:text-right",
      )}
    >
      <PixelArrow direction="right" className={cn("animate-left-bounce text-accent", mirrored && "lg:-scale-x-100")} />
      <div className="min-w-0 space-y-3">
        <h3 className="leading-relaxed">{highlight.title}</h3>
        <ul className="space-y-1 text-sm leading-relaxed">
          {highlight.items.map(({ label, detail }) => (
            <li key={label} className={cn("flex gap-2", mirrored && "lg:flex-row-reverse")}>
              <span aria-hidden className="text-accent">
                <span className={cn(mirrored && "lg:hidden")}>&gt;</span>
                {mirrored && <span className="max-lg:hidden">&lt;</span>}
              </span>
              <span>
                {label} <span className="text-accent-secondary">({detail})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export const Highlights = () => {
  return (
    <div className="flex flex-col justify-evenly max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-8 max-lg:gap-y-10 max-sm:grid-cols-1">
      {HIGHLIGHTS.map((highlight, i) => (
        <HighlightCard key={highlight.title} highlight={highlight} mirrored={i % 2 === 1} />
      ))}
    </div>
  );
};
