import type { ContentFile, ProjectData } from "@/content/schema";

export default {
  modified: "2026-10-11T14:38:00",
  content: {
    name: "Simple Finance CLI",
    version: "0.0.1",
    meta: "Python · CLI · PyPI",
    description: "CLI para gestão financeira pessoal de gastos e rendas, direto do terminal.",
    snippet: [
      "$ pipx install simple-finance-cli",
      "$ sfcli add income salary 2500",
      "$ sfcli add expense rent 800",
      "$ sfcli balance",
    ],
    features: ["Testes com Pytest", "CI no GitHub Actions", "Deploy automático no PyPI"],
    tags: ["Python", "CLI", "PyPI", "CI/CD"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/joao-antonio-la/simple-finance-cli",
      },
      {
        label: "PyPI",
        href: "https://pypi.org/project/simple-finance-cli/",
      },
    ],
    icon: "python",
    color: "#ffd747",
  },
} satisfies ContentFile<ProjectData>;
