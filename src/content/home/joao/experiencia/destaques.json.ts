import type { ContentFile, Highlight } from "@/content/schema";

export default {
  modified: "2026-10-13T19:10:00",
  content: [
    {
      title: "Estágio em Engenharia de Software - Metaprime Sistemas",
      items: [
        {
          label: "Sistema Legado",
          detail: "Java/JSF",
        },
        {
          label: "Correção de Bugs",
          detail: "Back/Front",
        },
        {
          label: "Operações de DB",
          detail: "PostgreSQL",
        },
      ],
    },
    {
      title: "Líder em desenvolvimento (eventos acadêmicos)",
      items: [
        {
          label: "FEMATEC XII",
          detail: "2023/1",
        },
        {
          label: "FEMATEC XIII",
          detail: "2023/2",
        },
        {
          label: "INOVATEC I",
          detail: "2025/1",
        },
      ],
    },
    {
      title: "Criação de soluções open-source originais",
      items: [
        {
          label: "jaJSON",
          detail: "C",
        },
        {
          label: "setuppy",
          detail: "Python",
        },
        {
          label: "Simple Finance CLI",
          detail: "Python",
        },
      ],
    },
    {
      title: "Cursos extracurriculares",
      items: [
        {
          label: "CS50",
          detail: "Harvard",
        },
        {
          label: "Projetos de Sistemas de TI",
          detail: "Fundação Bradesco",
        },
        {
          label: "Aprendendo com Python",
          detail: "EVG",
        },
      ],
    },
  ],
} satisfies ContentFile<Highlight[]>;
