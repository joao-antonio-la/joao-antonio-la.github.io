import type { ContentFile, ProjectData } from "@/content/schema";

export default {
  modified: "2026-10-11T14:30:00",
  content: {
    name: "jaJSON",
    version: "1.1.0",
    meta: "C · Windows/Linux · MIT",
    description: "Biblioteca mid/high-level para C que simplifica a manipulação de JSON.",
    snippet: [
      "ja_val *data = ja_new_set_obj(2,",
      '  "name", ja_new_str("Joao"),',
      '  "age",  ja_new_num(19));',
      "ja_print(data);",
      '// {"name":"Joao","age":19}',
    ],
    features: ["Parsing abstrato", "Memória gerenciada", "Leitura e escrita de arquivos"],
    tags: ["C", "Lib", "JSON"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/joao-antonio-la/jaJSON",
      },
    ],
    icon: "c",
    color: "#00599c",
  },
} satisfies ContentFile<ProjectData>;
