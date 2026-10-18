import { STAGES, type FutureProjectData, type ProjectData } from "@/content/schema";
import { readJsonDir } from "@/lib/filesystem";
import { techIcon } from "@/lib/tech-icons";

export { STAGES };

export type Project = Omit<ProjectData, "icon"> & { img: string };

export type FutureProject = Omit<FutureProjectData, "stage"> & { stage: number };

export const PROJECTS: Project[] = readJsonDir<ProjectData>("~/projetos").map(({ icon, ...project }) => ({
  ...project,
  img: techIcon(icon),
}));

export const FUTURE_PROJECTS: FutureProject[] = readJsonDir<FutureProjectData>("~/projetos/em-construcao").map(
  (project) => ({ ...project, stage: STAGES.indexOf(project.stage) }),
);
