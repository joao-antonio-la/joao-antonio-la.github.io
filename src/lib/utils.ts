import { twMerge } from "tailwind-merge";

export const cn = (...classes: (string | false | null | undefined)[]) => twMerge(classes);

export const EXTERNAL_LINK_PROPS = { target: "_blank", rel: "noopener noreferrer" } as const;
