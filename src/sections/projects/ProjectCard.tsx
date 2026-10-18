import type { CSSProperties } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { PixelArrow } from "@/components/ui/icons/PixelArrow";
import { PixelFrame } from "@/components/ui/PixelFrame";
import { cn, EXTERNAL_LINK_PROPS } from "@/lib/utils";
import type { Project } from "./data";

const TOKEN = /("[^"]*"|\/\/.*$|^\$ )/;

const tokenClassName = (part: string) => {
  if (part.startsWith('"')) return "text-(--frame-light)";
  if (part.startsWith("//")) return "text-plum-400";
  if (part === "$ ") return "text-accent";
  return undefined;
};

type SnippetLineProps = {
  line: string;
};

const SnippetLine = ({ line }: SnippetLineProps) => {
  return (
    <span className="block whitespace-pre">
      {line
        .split(TOKEN)
        .filter(Boolean)
        .map((part, i) => (
          <span key={i} className={tokenClassName(part)}>
            {part}
          </span>
        ))}
    </span>
  );
};

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const snippetStyle = {
    "--snippet-chars": Math.max(...project.snippet.map((line) => line.length)),
  } as CSSProperties;

  return (
    <PixelFrame
      color={project.color}
      className="project-card h-full"
      contentClassName="@container flex h-full flex-col gap-5"
    >
      <header className="flex items-center gap-4">
        <img src={project.img} alt="" className="size-12 shrink-0" />
        <div className="w-full min-w-0 space-y-2">
          <div className="flex w-full justify-between gap-2">
            <h3 className="text-lg leading-tight">{project.name}</h3>
            <p className="text-xs" style={{ color: project.color }}>
              {project.version}
            </p>
          </div>
          <p className="text-2xs text-plum-200">{project.meta}</p>
        </div>
      </header>

      <p className="border-t border-(--frame-color) pt-4 text-sm leading-relaxed">{project.description}</p>

      <pre
        className="project-card__screen overflow-x-auto p-3 font-pixel leading-loose text-white/90"
        style={snippetStyle}
      >
        <code className="font-pixel">
          {project.snippet.map((line, i) => (
            <SnippetLine key={i} line={line} />
          ))}
        </code>
      </pre>

      <ul className="space-y-1 text-xs leading-relaxed">
        {project.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden className="text-(--frame-light)">
              &gt;
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-2 text-2xs">
        {project.tags.map((tag) => (
          <li key={tag} className="project-card__tag px-2 py-1">
            {tag}
          </li>
        ))}
      </ul>

      <footer className="mt-auto flex flex-wrap gap-3 pt-2">
        {project.links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            {...EXTERNAL_LINK_PROPS}
            className={cn(buttonVariants(), "h-auto px-3 py-2 text-2xs text-white [--button-color:var(--frame-dark)]")}
          >
            {label}
            <PixelArrow direction="up-right" className="size-[1em]" />
          </a>
        ))}
      </footer>
    </PixelFrame>
  );
};
