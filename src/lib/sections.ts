export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  experience: "experience",
  projects: "projects",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const scrollToSection = (id: SectionId) => {
  document.getElementById(id)?.scrollIntoView();
};
