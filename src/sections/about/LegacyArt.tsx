import type { CSSProperties } from "react";
import computerArt from "@/assets/arts/computer.png";
import pickaxeArt from "@/assets/arts/pickaxe.png";

const CHIPS = [
  {
    tag: "ERR",
    text: "null",
    tone: "var(--color-red-500)",
    dx: "-10rem",
    dy: "-7rem",
    rotate: "-16deg",
    delay: "0s",
  },
  {
    tag: "404",
    text: "not found",
    tone: "var(--color-amber-400)",
    dx: "-1rem",
    dy: "-11rem",
    rotate: "6deg",
    delay: "0.06s",
  },
  {
    tag: "FATAL",
    text: "0x00 :C",
    tone: "var(--color-fuchsia-500)",
    dx: "9rem",
    dy: "-6rem",
    rotate: "14deg",
    delay: "0.03s",
  },
];

const DEBRIS = [
  { dx: "-5rem", dy: "-3rem", rotate: "90deg", size: "0.5rem", tone: "var(--accent)" },
  { dx: "-3rem", dy: "-6rem", rotate: "-45deg", size: "0.375rem", tone: "var(--color-red-500)" },
  { dx: "2rem", dy: "-7rem", rotate: "180deg", size: "0.5rem", tone: "var(--color-amber-400)" },
  { dx: "5rem", dy: "-3.5rem", rotate: "-90deg", size: "0.375rem", tone: "var(--accent)" },
  { dx: "4rem", dy: "-1rem", rotate: "45deg", size: "0.25rem", tone: "var(--color-fuchsia-500)" },
  { dx: "-6rem", dy: "-0.5rem", rotate: "-135deg", size: "0.25rem", tone: "var(--color-amber-400)" },
];

export const LegacyArt = () => {
  return (
    <div aria-hidden className="legacy-art relative size-120 shrink-0 select-none max-[22.5rem]:scale-85">
      <div className="legacy-art__pickaxe absolute top-7 z-2 size-50">
        <img src={pickaxeArt} alt="" loading="lazy" />
      </div>
      <img
        src={computerArt}
        alt=""
        loading="lazy"
        className="legacy-art__computer absolute right-0 bottom-4 z-1 size-100"
      />
      <div className="legacy-art__flash absolute z-3 mt-6 size-12" />
      {DEBRIS.map(({ dx, dy, rotate, size, tone }) => (
        <span
          key={dx + dy}
          className="legacy-art__particle legacy-art__particle--debris absolute z-3"
          style={
            {
              "--particle-dx": dx,
              "--particle-dy": dy,
              "--particle-rotate": rotate,
              "--particle-tone": tone,
              width: size,
              height: size,
            } as CSSProperties
          }
        />
      ))}
      {CHIPS.map(({ tag, text, tone, dx, dy, rotate, delay }) => (
        <p
          key={text}
          className="legacy-art__particle error-chip absolute z-4 h-7 text-2xs text-nowrap"
          style={
            {
              "--particle-dx": dx,
              "--particle-dy": dy,
              "--particle-rotate": rotate,
              "--particle-tone": tone,
              "--particle-delay": delay,
            } as CSSProperties
          }
        >
          <span className="error-chip__body flex h-full items-stretch">
            <span className="error-chip__tag grid place-items-center px-1.5 text-black">{tag}</span>
            <span className="error-chip__text grid place-items-center px-2 text-white">{text}</span>
          </span>
        </p>
      ))}
    </div>
  );
};
