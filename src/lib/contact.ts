import githubIcon from "@/assets/icons/social/github.png";
import linkedinIcon from "@/assets/icons/social/linkedin.png";
import mailIcon from "@/assets/icons/social/mail.png";
import type { Contact } from "@/content/schema";
import { readJson } from "./filesystem";
import { githubUrl, linkedinUrl, mailtoUrl } from "./identity";

const CONTACT = readJson<Contact>("~/contato.json");

export const EMAIL = CONTACT.email;
export const GITHUB_URL = githubUrl(CONTACT.github);

export const SOCIAL_LINKS = [
  { label: "GitHub", handle: CONTACT.github, href: GITHUB_URL, icon: githubIcon, external: true },
  {
    label: "LinkedIn",
    handle: CONTACT.linkedin,
    href: linkedinUrl(CONTACT.linkedin),
    icon: linkedinIcon,
    external: true,
  },
  { label: "E-mail", handle: EMAIL, href: mailtoUrl(EMAIL), icon: mailIcon, external: false },
];
