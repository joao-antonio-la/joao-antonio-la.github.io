import { TerminalFrame, TerminalPrompt } from "@/components/ui/TerminalFrame";
import type { Commit } from "@/content/schema";
import { readJson } from "@/lib/filesystem";

const COMMITS = readJson<Commit[]>("~/experiencia/historico.json");

const PATH = "~/experiencia";

type CommitEntryProps = {
  commit: Commit;
  last: boolean;
};

const CommitEntry = ({ commit, last }: CommitEntryProps) => {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4">
      <div aria-hidden className="flex flex-col items-center">
        <span className="mt-1 size-2.5 shrink-0 bg-accent" />
        {!last && <span className="w-0.5 flex-1 bg-plum-700" />}
      </div>
      <article className={last ? undefined : "pb-8"}>
        <p className="text-2xs leading-relaxed">
          <span className="text-plum-400">commit {commit.hash}</span>
          {commit.current && <span className="text-accent"> (HEAD -&gt; atual)</span>}
          <span className="text-plum-400"> · {commit.period}</span>
        </p>
        <h3 className="mt-3 leading-relaxed">
          {commit.role} <span className="text-accent-secondary">@ {commit.place}</span>
        </h3>
        <p className="mt-3 leading-relaxed text-plum-200 max-lg:hidden">{commit.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-2xs">
          {commit.tags.map((tag) => (
            <li key={tag} className="bg-plum-800 px-2 py-1 text-accent">
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
};

export const CommitLog = () => {
  return (
    <TerminalFrame
      title={`bash - ${PATH}`}
      className="min-w-0"
      contentClassName="space-y-6"
      status={
        <>
          <span>main</span>
          <span>{COMMITS.length} commits</span>
        </>
      }
    >
      <TerminalPrompt path={PATH} className="text-2xs">
        git log --graph
      </TerminalPrompt>
      <ol>
        {COMMITS.map((commit, i) => (
          <CommitEntry key={commit.hash} commit={commit} last={i === COMMITS.length - 1} />
        ))}
      </ol>
      <TerminalPrompt path={PATH} cursor className="text-2xs" />
    </TerminalFrame>
  );
};
