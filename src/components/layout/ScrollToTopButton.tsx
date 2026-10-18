import { ArcadeButton } from "@/components/ui/ArcadeButton";
import { PixelArrow } from "@/components/ui/icons/PixelArrow";
import { useHasScrolledPast } from "@/hooks/use-has-scrolled-past";
import { SECTION_IDS, scrollToSection } from "@/lib/sections";
import { cn } from "@/lib/utils";

const VISIBILITY_VIEWPORT_RATIO = 0.5;

export const ScrollToTopButton = () => {
  const isVisible = useHasScrolledPast(VISIBILITY_VIEWPORT_RATIO);

  return (
    <ArcadeButton
      baseClassName={cn(
        "fixed right-4 bottom-4 animate-bounce transition-[translate,opacity] duration-300 ease-out [animation-duration:3s] sm:right-8 sm:bottom-8 lg:right-16 lg:bottom-16",
        !isVisible && "pointer-events-none translate-y-8 opacity-0",
      )}
      size="icon-lg"
      variant="accent"
      aria-label="Voltar ao topo"
      inert={!isVisible}
      onClick={() => scrollToSection(SECTION_IDS.hero)}
    >
      <PixelArrow direction="up" className="size-7" />
    </ArcadeButton>
  );
};
