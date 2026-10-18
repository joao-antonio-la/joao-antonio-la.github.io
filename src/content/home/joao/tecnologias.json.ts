import type { ContentFile, StackItem } from "@/content/schema";

export default {
  modified: "2026-10-10T17:20:00",
  content: [
    [
      {
        label: "c lang",
        icon: "c",
      },
      {
        label: "java",
        icon: "java",
      },
      {
        label: "javascript",
        icon: "javascript",
      },
      {
        label: "python",
        icon: "python",
      },
    ],
    [
      {
        label: "typescript",
        icon: "typescript",
      },
      {
        label: "electron",
        icon: "electron",
      },
      {
        label: "react",
        icon: "react",
      },
      {
        label: "flask",
        icon: "flask",
      },
    ],
    [
      {
        label: "git",
        icon: "git",
      },
      {
        label: "github",
        icon: "github",
      },
      {
        label: "sql",
        icon: "sql",
      },
    ],
  ],
} satisfies ContentFile<StackItem[][]>;
