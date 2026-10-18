import { Fragment } from "react";
import { PixelFrame } from "@/components/ui/PixelFrame";
import { cn } from "@/lib/utils";
import { FUTURE_PROJECTS, STAGES, type FutureProject } from "./data";

type StageBarProps = {
  stage: number;
};

const StageBar = ({ stage }: StageBarProps) => {
  return (
    <div className="space-y-2">
      <div
        role="meter"
        aria-label="Fase do projeto"
        aria-valuemin={1}
        aria-valuemax={STAGES.length}
        aria-valuenow={stage + 1}
        aria-valuetext={STAGES[stage]}
        className="flex gap-1"
      >
        {STAGES.map((name, i) => (
          <span
            key={name}
            className={cn(
              "roadmap__block h-3 flex-1",
              i <= stage && "roadmap__block--done",
              i === stage + 1 && "roadmap__block--next",
            )}
          />
        ))}
      </div>
      <p className="flex justify-between text-2xs">
        <span className="text-accent">{STAGES[stage]}</span>
        <span className="text-plum-400">
          {stage + 1}/{STAGES.length}
        </span>
      </p>
    </div>
  );
};

type RoadmapItemProps = {
  project: FutureProject;
};

const RoadmapItem = ({ project }: RoadmapItemProps) => {
  return (
    <li className="flex flex-1 flex-col gap-4">
      <h4 className="text-base">{project.name}</h4>
      <p className="text-xs leading-relaxed text-white/80">{project.description}</p>
      <ul className="mt-auto flex flex-wrap gap-2 text-2xs text-plum-200">
        {project.tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>
      <div className="pt-1">
        <StageBar stage={project.stage} />
      </div>
    </li>
  );
};

export const Roadmap = () => {
  return (
    <PixelFrame color="#243d40" contentClassName="p-6 max-sm:p-4">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-lg">Em construção</h3>
        <p aria-hidden className="text-2xs text-plum-200">
          carregando próximas fases
          <span className="roadmap__dots" />
        </p>
      </div>
      <ul className="flex gap-8 max-lg:flex-col">
        {FUTURE_PROJECTS.map((project, i) => (
          <Fragment key={project.name}>
            <RoadmapItem project={project} />
            {i < FUTURE_PROJECTS.length - 1 && (
              <li aria-hidden className="flex items-center justify-center">
                <span className="roadmap__arrow text-4xl max-lg:rotate-90">&gt;&gt;&gt;</span>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </PixelFrame>
  );
};
