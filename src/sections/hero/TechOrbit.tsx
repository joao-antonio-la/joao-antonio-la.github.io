import { useEffect, useRef, useState, type CSSProperties } from "react";
import codeIcon from "@/assets/arts/code.png";
import ringImage from "@/assets/arts/ring.png";
import type { StackItem } from "@/content/schema";
import { readJson } from "@/lib/filesystem";
import { techIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

const ORBITS = readJson<StackItem[][]>("~/tecnologias.json").map((technologies) =>
  technologies.map(({ label, icon }) => ({ label, icon: techIcon(icon) })),
);

const RING_COUNT = 3;
const ORBIT_BASE_DURATION_S = 120;
const ORBIT_DURATION_STEP_S = 10;
const LABEL_VISIBLE_MS = 3000;

export const TechOrbit = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const hideTimeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(hideTimeout.current), []);

  const showLabel = (label: string) => {
    window.clearTimeout(hideTimeout.current);
    setActiveLabel(label);
    hideTimeout.current = window.setTimeout(() => setActiveLabel(null), LABEL_VISIBLE_MS);
  };

  return (
    <div role="group" aria-label="Tecnologias" className="tech-orbit relative select-none">
      <div className="tech-orbit__stage relative grid place-items-center">
        <div
          aria-hidden
          className="tech-orbit__rings pointer-events-none absolute grid h-full w-full place-items-center"
        >
          {Array.from({ length: RING_COUNT }, (_, ringIndex) => (
            <img
              key={ringIndex}
              src={ringImage}
              alt=""
              className="tech-orbit__ring absolute top-1/2 h-auto -translate-y-1/2 opacity-70"
              style={{
                rotate: `${ringIndex * (180 / RING_COUNT)}deg`,
                animationDelay: `-${ringIndex}s`,
              }}
            />
          ))}
        </div>
        {ORBITS.map((technologies, orbitIndex) => {
          const tilt = orbitIndex * (360 / ORBITS.length);
          const duration = ORBIT_BASE_DURATION_S + ORBIT_DURATION_STEP_S * orbitIndex;
          const hasActive = technologies.some(({ label }) => label === activeLabel);
          return (
            <div
              key={orbitIndex}
              className={cn("tech-orbit__path pointer-events-none absolute", hasActive && "z-20")}
              style={{ rotate: `${tilt}deg` }}
            >
              {technologies.map(({ icon, label }, techIndex) => (
                <button
                  key={label}
                  type="button"
                  data-active={label === activeLabel || undefined}
                  onClick={() => showLabel(label)}
                  className="tech-orbit__item group pointer-events-auto grid cursor-pointer place-items-center p-2 [-webkit-tap-highlight-color:transparent]"
                  style={
                    {
                      "--orbit-duration": `${duration}s`,
                      "--orbit-delay": `-${(techIndex * duration) / technologies.length}s`,
                      "--orbit-tilt": `${tilt}deg`,
                    } as CSSProperties
                  }
                >
                  <img src={icon} alt="" className="tech-orbit__icon" />
                  <span className="grid h-0 place-items-center border-2 border-accent bg-background text-xs uppercase opacity-0 transition-all group-hover:h-10 group-hover:p-2 group-hover:opacity-100 group-focus-visible:h-10 group-focus-visible:p-2 group-focus-visible:opacity-100 group-data-active:h-10 group-data-active:p-2 group-data-active:opacity-100 xl:text-sm">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          );
        })}
        <div aria-hidden className="tech-orbit__nucleus absolute top-1/2 left-1/2 z-10 -translate-1/2">
          <img src={codeIcon} alt="" className="tech-orbit__nucleus-icon size-full" />
        </div>
      </div>
    </div>
  );
};
