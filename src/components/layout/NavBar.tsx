import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/button-variants";
import { PixelClose } from "@/components/ui/icons/PixelClose";
import { PixelMenu } from "@/components/ui/icons/PixelMenu";
import { SECTION_IDS } from "@/lib/sections";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { sectionId: SECTION_IDS.about, label: "Sobre" },
  { sectionId: SECTION_IDS.experience, label: "Experiência" },
  { sectionId: SECTION_IDS.projects, label: "Projetos" },
  { sectionId: SECTION_IDS.contact, label: "Contato" },
];

const MOBILE_MENU_ID = "mobile-nav-menu";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") closeMenu();
  };

  const renderLinks = (onNavigate?: () => void) => {
    return NAV_LINKS.map(({ sectionId, label }) => (
      <a key={sectionId} href={`#${sectionId}`} className={buttonVariants()} onClick={onNavigate}>
        {label}
      </a>
    ));
  };

  return (
    <nav className="fixed inset-x-0 top-3 z-20 flex justify-center px-3" onKeyDown={handleKeyDown}>
      <div className="relative flex items-center gap-4 border-x-24 border-accent bg-background px-8 py-2 shadow-lg/20 shadow-accent max-md:border-x-12 max-md:px-4 max-sm:w-full max-sm:justify-between max-sm:border-x-4">
        <a href={`#${SECTION_IDS.hero}`} className="font-bold text-white">
          <span className="max-md:hidden">João Antônio</span>
          <span className="md:hidden">JA</span>
          <span className="font-black text-accent">.</span>
        </a>

        <div className="flex items-center gap-2 max-sm:hidden">{renderLinks()}</div>

        <Button
          size="icon"
          className="sm:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <PixelClose className="size-4" /> : <PixelMenu className="size-4" />}
        </Button>

        <div
          id={MOBILE_MENU_ID}
          inert={!isMenuOpen}
          className={cn(
            "absolute inset-x-0 top-full -z-10 mt-2 flex flex-col gap-2 border-x-4 border-accent bg-background p-3 shadow-lg/20 shadow-accent transition-[translate,opacity] duration-300 ease-out sm:hidden",
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
          )}
        >
          {renderLinks(closeMenu)}
        </div>
      </div>
    </nav>
  );
};
