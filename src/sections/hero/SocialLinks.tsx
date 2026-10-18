import { SOCIAL_LINKS } from "@/lib/contact";
import { EXTERNAL_LINK_PROPS } from "@/lib/utils";

export const SocialLinks = () => {
  return (
    <div className="flex gap-2">
      {SOCIAL_LINKS.map(({ label, href, icon, external }) => (
        <a
          key={href}
          href={href}
          {...(external && EXTERNAL_LINK_PROPS)}
          className="block size-10 transition-transform hover:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <img src={icon} alt={label} className="size-full" />
        </a>
      ))}
    </div>
  );
};
