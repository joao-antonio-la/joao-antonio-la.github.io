import { Fragment } from "react";
import { Section } from "@/components/layout/Section";
import { ArcadeButton } from "@/components/ui/ArcadeButton";
import { TerminalFrame, TerminalPrompt } from "@/components/ui/TerminalFrame";
import { PROFILE } from "@/lib/profile";
import { SECTION_IDS, scrollToSection } from "@/lib/sections";
import { SocialLinks } from "./SocialLinks";
import { TechOrbit } from "./TechOrbit";
import { WaveBackground } from "./WaveBackground";

const keepHyphenated = (text: string) => {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export const Hero = () => {
  return (
    <Section
      id={SECTION_IDS.hero}
      className="hero-glow min-h-[calc(100svh-4rem)] pt-24 pb-32"
      containerClassName="gap-24"
    >
      <WaveBackground />
      <div className="flex max-w-full flex-col gap-8 max-sm:gap-6">
        <TerminalFrame title="bash - ~" contentClassName="space-y-4">
          <TerminalPrompt className="text-2xs">cat manifesto.txt</TerminalPrompt>
          <h1 className="text-2xl italic max-sm:text-xl">
            "
            {PROFILE.manifesto.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
            "
          </h1>
          <TerminalPrompt className="text-2xs">whoami</TerminalPrompt>
          <div>
            <p className="mb-4">{PROFILE.name}</p>
            {PROFILE.roles.map((role) => (
              <p key={role}>{keepHyphenated(role)}</p>
            ))}
          </div>
          <TerminalPrompt cursor className="text-2xs" />
        </TerminalFrame>
        <div className="flex w-fit gap-4 max-lg:w-full max-xs:flex-col">
          <ArcadeButton
            variant="accent"
            baseClassName="w-full"
            className="w-full"
            onClick={() => scrollToSection(SECTION_IDS.projects)}
          >
            Ver projetos
          </ArcadeButton>
          <ArcadeButton
            baseClassName="max-lg:w-full"
            className="max-lg:w-full"
            onClick={() => scrollToSection(SECTION_IDS.contact)}
          >
            Entre em contato
          </ArcadeButton>
        </div>
        <SocialLinks />
      </div>
      <TechOrbit />
    </Section>
  );
};
