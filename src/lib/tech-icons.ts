const ICONS_DIR = "/src/assets/icons/tech/";

const ICONS = import.meta.glob<string>("/src/assets/icons/tech/*.png", { eager: true, import: "default" });

export const techIcon = (name: string) => {
  const icon = ICONS[`${ICONS_DIR}${name}.png`];
  if (!icon) throw new Error(`Ícone de tecnologia não encontrado: ${name}`);
  return icon;
};
