import type { ContentFile, Commit } from "@/content/schema";

export default {
  modified: "2026-10-13T19:02:00",
  content: [
    {
      hash: "a3f9c1e",
      role: "Estágio Desenvolvimento (Fullstack)",
      place: "Metaprime Sistemas",
      period: "2026 - atual",
      description:
        "Desenvolvimento e manutenção de sistemas legados, com correções adequadas e redução de débito técnico.",
      tags: ["Java", "SQL", "JSF"],
      current: true,
    },
    {
      hash: "7be204d",
      role: "Criador de Soluções Open-Source",
      place: "GitHub",
      period: "2024 - atual",
      description: "Ferramentas CLI e aplicações desktop pensadas em User Experience e Developer Experience.",
      tags: ["C", "Python", "TypeScript"],
    },
    {
      hash: "1d08e5a",
      role: "Engenharia de Software",
      place: "UNIGOIÁS",
      period: "Em andamento",
      description: "Graduação com foco em desenvolvimento web, arquitetura e boas práticas de engenharia.",
      tags: ["Graduação"],
    },
  ],
} satisfies ContentFile<Commit[]>;
