import type { ContentFile, ProjectData } from "@/content/schema";

export default {
  modified: "2026-10-11T14:34:00",
  content: {
    name: "setuppy",
    version: "1.0",
    meta: "Python · Desktop",
    description: "App desktop para automatizar sequências de comandos shell com interface moderna.",
    snippet: ["{", '  "Dev Setup": [', '    "git pull",', '    "npm install"', "  ]", "}"],
    features: ["Setups em JSON", "Saída em tempo real", "Temas e notificações"],
    tags: ["Python", "Flet", "Automação", "UI"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/joao-antonio-la/setuppy",
      },
    ],
    icon: "python",
    color: "#2a8c34",
  },
} satisfies ContentFile<ProjectData>;
