import { Section } from "@/components/layout/Section";
import { SECTION_IDS } from "@/lib/sections";
import { CommitLog } from "./CommitLog";
import { Highlights } from "./Highlights";

export const Experience = () => {
  return (
    <Section
      id={SECTION_IDS.experience}
      title="Experiência"
      titleClassName="ml-2 self-start sm:ml-0 md:ml-24"
      className="scroll-mt-4 justify-center gap-12 pt-16 pb-24 sm:px-8"
      containerClassName="h-full max-lg:justify-start"
    >
      <div className="grid w-full max-w-7xl gap-16 max-lg:gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <CommitLog />
        <Highlights />
      </div>
    </Section>
  );
};
