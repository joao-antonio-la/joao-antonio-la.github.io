import { Section } from "@/components/layout/Section";
import { PixelArrow } from "@/components/ui/icons/PixelArrow";
import { GITHUB_URL } from "@/lib/contact";
import { SECTION_IDS } from "@/lib/sections";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";
import { FUTURE_PROJECTS, PROJECTS } from "./data";
import { ProjectCard } from "./ProjectCard";
import { Roadmap } from "./Roadmap";

export const Projects = () => {
  return (
    <Section
      id={SECTION_IDS.projects}
      title="Projetos"
      titleClassName="mr-2 self-end md:mr-26"
      className="projects-glow pt-32 pb-24 sm:px-8"
    >
      <div className="flex w-full max-w-7xl flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-4 text-xs">
          <p className="text-plum-200">
            <span className="text-accent">{PROJECTS.length}</span> lançados ·{" "}
            <span className="text-accent-secondary">{FUTURE_PROJECTS.length}</span> em construção
          </p>
          <a
            href={GITHUB_URL}
            {...EXTERNAL_LINK_PROPS}
            className="border-b-2 border-accent pb-1 transition-colors hover:text-accent"
          >
            Ver tudo no GitHub <PixelArrow direction="up-right" className="inline-block size-[1em] align-[-0.1em]" />
          </a>
        </div>

        <ul className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <li key={project.name} className="last:md:max-xl:col-span-2">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <Roadmap />
      </div>
    </Section>
  );
};
