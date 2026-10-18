import { useEffect, useState } from "react";

export const useHasScrolledPast = (viewportRatio: number) => {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const update = () => setHasScrolledPast(window.scrollY > window.innerHeight * viewportRatio);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [viewportRatio]);

  return hasScrolledPast;
};
