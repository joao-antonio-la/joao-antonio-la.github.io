import { HOME, absolutePath, compareNames, lookup } from "@/lib/filesystem";
import { COMMAND_NAMES, type Segment, type Session } from "./commands";

export type Completion =
  { type: "insert"; input: string; caret: number } | { type: "ambiguous"; options: Segment[] } | { type: "none" };

type Candidate = { name: string; isDir: boolean };

const escapeName = (name: string) => name.replace(/[\s'"\\]/g, "\\$&");

const commonPrefix = (names: string[]) =>
  names.reduce((prefix, name) => {
    let i = 0;
    while (i < prefix.length && prefix[i] === name[i]) i++;
    return prefix.slice(0, i);
  });

const pathCandidates = (session: Session, word: string, onlyDirs: boolean) => {
  const slash = word.lastIndexOf("/");
  const dirPart = word.slice(0, slash + 1).replace(/^~(?=\/)/, absolutePath(HOME));
  const prefix = word.slice(slash + 1);

  const found = lookup(session.cwd, dirPart || ".");
  if (!("node" in found) || found.node.type !== "dir") return { prefix, candidates: [] };

  const candidates = [...found.node.children.values()]
    .filter((node) => node.name.startsWith(prefix))
    .filter((node) => prefix.startsWith(".") || !node.name.startsWith("."))
    .filter((node) => !onlyDirs || node.type === "dir")
    .map((node) => ({ name: node.name, isDir: node.type === "dir" }));
  return { prefix, candidates };
};

export const complete = (input: string, caret: number, session: Session): Completion => {
  const before = input.slice(0, caret);
  const wordStart = before.search(/\S*$/);
  const word = before.slice(wordStart);
  const isCommandWord = !before.slice(0, wordStart).trim();

  if (!isCommandWord && word === "~") {
    return { type: "insert", input: `${before}/${input.slice(caret)}`, caret: caret + 1 };
  }

  let prefix: string;
  let candidates: Candidate[];
  if (isCommandWord && !word.includes("/")) {
    prefix = word;
    candidates = COMMAND_NAMES.filter((name) => name.startsWith(word)).map((name) => ({ name, isDir: false }));
  } else {
    const command = input.trimStart().split(/\s+/)[0];
    ({ prefix, candidates } = pathCandidates(session, word, command === "cd"));
  }
  if (!candidates.length) return { type: "none" };

  const insert = (completion: string) => {
    const start = caret - prefix.length;
    return {
      type: "insert" as const,
      input: input.slice(0, start) + completion + input.slice(caret),
      caret: start + completion.length,
    };
  };

  if (candidates.length === 1) {
    const [{ name, isDir }] = candidates;
    return insert(escapeName(name) + (isDir ? "/" : " "));
  }

  const shared = commonPrefix(candidates.map(({ name }) => name));
  if (shared.length > prefix.length) return insert(escapeName(shared));

  const options = candidates
    .sort((a, b) => compareNames(a.name, b.name))
    .flatMap(({ name, isDir }, i): Segment[] => {
      const option: Segment = isDir ? { text: `${name}/`, tone: "dir" } : { text: name };
      return i ? [{ text: "  " }, option] : [option];
    });
  return { type: "ambiguous", options };
};
