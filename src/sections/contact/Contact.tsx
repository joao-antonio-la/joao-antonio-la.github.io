import { Section } from "@/components/layout/Section";
import { ArcadeLink } from "@/components/ui/ArcadeButton";
import { EMAIL } from "@/lib/contact";
import { mailtoUrl } from "@/lib/identity";
import { PROFILE } from "@/lib/profile";
import { SECTION_IDS } from "@/lib/sections";
import { ContactChannels } from "./ContactChannels";
import { InteractiveTerminal } from "./InteractiveTerminal";

export const Contact = () => {
  return (
    <Section
      id={SECTION_IDS.contact}
      title="Contato"
      titleClassName="ml-2 self-start sm:ml-0 md:ml-24"
      className="contact-glow gap-12 pt-32 pb-16 sm:px-8"
      containerClassName="flex-col gap-24 max-lg:gap-16"
    >
      <div className="grid w-full max-w-7xl grid-cols-1 gap-16 max-lg:gap-12 lg:grid-cols-5">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <div className="space-y-6">
            <p className="flex items-center gap-3 text-xs text-accent">
              <span aria-hidden className="contact-status size-2.5 bg-accent" />
              Aberto a oportunidades e colaborações
            </p>
            <h3 className="text-2xl leading-relaxed max-sm:text-xl">
              Vamos construir algo <span className="text-accent-secondary">com propósito</span>?
            </h3>
            <p className="text-sm leading-relaxed text-plum-200">
              Seja uma vaga, um projeto open-source ou só uma conversa sobre tecnologia, minha caixa de entrada está
              aberta. Respondo o mais rápido possível.
            </p>
          </div>

          <ContactChannels />

          <ArcadeLink href={mailtoUrl(EMAIL)} variant="accent" baseClassName="max-xs:w-full" className="max-xs:w-full">
            Enviar e-mail
          </ArcadeLink>
        </div>

        <div className="lg:col-span-3">
          <InteractiveTerminal />
        </div>
      </div>

      <footer className="flex w-full max-w-7xl flex-wrap justify-between gap-4 border-t border-plum-700 pt-6 pr-16 text-2xs text-plum-400 sm:pr-20 lg:pr-28">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <p>
          Feito com <span className="text-accent">React</span> + <span className="text-accent">Tailwind</span>
        </p>
      </footer>
    </Section>
  );
};
