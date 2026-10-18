import { useEffect, useState } from "react";
import { PixelArrow } from "@/components/ui/icons/PixelArrow";
import { EMAIL, SOCIAL_LINKS } from "@/lib/contact";
import { cn, EXTERNAL_LINK_PROPS } from "@/lib/utils";

const COPIED_FEEDBACK_MS = 2000;

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "shrink-0 cursor-pointer px-2 py-1 text-2xs transition-colors",
        copied ? "text-accent" : "text-plum-400 hover:text-white",
      )}
    >
      <span aria-live="polite">{copied ? "copiado!" : "copiar"}</span>
      <span className="sr-only"> e-mail</span>
    </button>
  );
};

export const ContactChannels = () => {
  return (
    <ul className="flex flex-col gap-3">
      {SOCIAL_LINKS.map(({ label, handle, href, icon, external }) => (
        <li key={href} className="contact-channel flex items-center gap-2 pr-2">
          <a
            href={href}
            {...(external && EXTERNAL_LINK_PROPS)}
            className="group flex min-w-0 flex-1 items-center gap-4 p-3"
          >
            <img src={icon} alt="" className="size-8 shrink-0" />
            <span className="min-w-0 space-y-2">
              <span className="block text-xs text-plum-400">{label}</span>
              <span className="block text-xs wrap-anywhere transition-colors group-hover:text-accent">{handle}</span>
            </span>
            <PixelArrow
              direction="right"
              className="ml-auto size-4 text-accent opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
          {href.startsWith("mailto:") && <CopyEmailButton />}
        </li>
      ))}
    </ul>
  );
};
