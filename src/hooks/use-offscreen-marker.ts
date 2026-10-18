import { useEffect, useRef } from "react";

const ROOT_MARGIN = "200px 0px";

export const useOffscreenMarker = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => element.toggleAttribute("data-offscreen", !entry.isIntersecting),
      { rootMargin: ROOT_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
};
