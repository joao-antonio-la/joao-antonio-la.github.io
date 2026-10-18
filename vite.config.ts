import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite";
import contact from "./src/content/home/joao/contato.json.ts";
import whoami from "./src/content/home/joao/documentos/quem-sou-eu.txt.ts";
import manifesto from "./src/content/home/joao/manifesto.txt.ts";
import { githubUrl, HOST, linkedinUrl, mailtoUrl, parseProfile, USER } from "./src/lib/identity.ts";

const OG_IMAGE = { path: "og-image.png", width: "1200", height: "630" };

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const siteHtml = (siteUrl?: string): Plugin => {
  const profile = parseProfile(whoami.content, manifesto.content);
  const roles = profile.roles.join(" · ");
  const manifestoLine = profile.manifesto.join(" ");

  const values = new Map([
    ["SITE_NAME", profile.name],
    ["SITE_TITLE", `${profile.name} | ${profile.roles[0]}`],
    ["SITE_DESCRIPTION", `${roles}. ${manifestoLine}`],
    ["SITE_ROLES", roles],
    ["SITE_MANIFESTO", manifestoLine],
    ["PROMPT_USER", `${USER}@${HOST}`],
    ["CONTACT_EMAIL", contact.content.email],
    ["CONTACT_MAILTO", mailtoUrl(contact.content.email)],
    ["GITHUB_URL", githubUrl(contact.content.github)],
    ["LINKEDIN_URL", linkedinUrl(contact.content.linkedin)],
  ]);

  const absoluteTags = (url: string): HtmlTagDescriptor[] => {
    const image = `${url}${OG_IMAGE.path}`;
    return [
      { tag: "link", attrs: { rel: "canonical", href: url } },
      { tag: "meta", attrs: { property: "og:url", content: url } },
      { tag: "meta", attrs: { property: "og:image", content: image } },
      { tag: "meta", attrs: { property: "og:image:width", content: OG_IMAGE.width } },
      { tag: "meta", attrs: { property: "og:image:height", content: OG_IMAGE.height } },
      { tag: "meta", attrs: { property: "og:image:alt", content: values.get("SITE_TITLE") } },
      { tag: "meta", attrs: { name: "twitter:image", content: image } },
    ];
  };

  return {
    name: "site-html",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => ({
        html: html.replace(/%(\w+)%/g, (match, key: string) => {
          const value = values.get(key);
          return value === undefined ? match : escapeHtml(value);
        }),
        tags: siteUrl ? absoluteTags(siteUrl) : [],
      }),
    },
  };
};

const siteUrl = process.env.SITE_URL?.replace(/\/?$/, "/");

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), siteHtml(siteUrl)],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
