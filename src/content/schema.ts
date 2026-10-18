export type ContentFile<T = string[]> = {
  modified: string;
  content: T;
};

export type Contact = {
  email: string;
  github: string;
  linkedin: string;
};

export type StackItem = {
  label: string;
  icon: string;
};

export type Commit = {
  hash: string;
  role: string;
  place: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
};

export type Highlight = {
  title: string;
  items: {
    label: string;
    detail: string;
  }[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectData = {
  name: string;
  version: string;
  meta: string;
  description: string;
  snippet: string[];
  features: string[];
  tags: string[];
  links: ProjectLink[];
  icon: string;
  color: string;
};

export const STAGES = ["Ideia", "Pesquisa", "Protótipo", "Desenvolvimento", "Lançamento"] as const;

export type Stage = (typeof STAGES)[number];

export type FutureProjectData = {
  name: string;
  description: string;
  tags: string[];
  stage: Stage;
};
