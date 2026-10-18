import {
  ERROR_MESSAGES,
  HOME,
  absolutePath,
  compareNames,
  lookup,
  type DirNode,
  type FsNode,
  type FsPath,
} from "@/lib/filesystem";
import { USER } from "@/lib/identity";

export type Segment = { text: string; tone?: "dir" };
export type OutputLine = string | Segment[];

export type Session = {
  cwd: FsPath;
  oldPwd?: FsPath;
};

export type CommandResult = {
  output: OutputLine[];
  session: Session;
  clear?: boolean;
};

type Command = (args: string[], session: Session) => CommandResult;

const ALIASES = new Map([
  ["whoami", "cat ~/documentos/quem-sou-eu.txt"],
  ["help", "cat ~/documentos/ajuda.txt"],
]);

const expandAlias = (line: string) => {
  const [, first = "", rest = ""] = line.match(/^\s*(\S+)(.*)$/s) ?? [];
  return ALIASES.get(first)?.concat(rest) ?? line;
};

const tokenize = (line: string) => {
  const words: string[] = [];
  let word = "";
  let inWord = false;
  let quote: "'" | '"' | null = null;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (quote) {
      if (char === quote) quote = null;
      else if (quote === '"' && char === "\\" && (next === '"' || next === "\\")) word += line[++i];
      else word += char;
    } else if (/\s/.test(char)) {
      if (inWord) words.push(word);
      word = "";
      inWord = false;
    } else {
      if (!inWord && char === "~" && (next === undefined || /[\s/]/.test(next))) word += absolutePath(HOME);
      else if (char === "'" || char === '"') quote = char;
      else if (char === "\\" && next !== undefined) word += line[++i];
      else word += char;
      inWord = true;
    }
  }

  if (inWord) words.push(word);
  return words;
};

type ParsedOptions = { flags: Set<string>; operands: string[] } | { error: OutputLine[] };

const parseOptions = (
  command: string,
  args: string[],
  shortFlags: string,
  longFlags: Record<string, string> = {},
): ParsedOptions => {
  const flags = new Set<string>();
  const operands: string[] = [];
  const fail = (message: string) => ({
    error: [message, `Try '${command} --help' for more information.`],
  });

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--") {
      operands.push(...args.slice(i + 1));
      break;
    }
    if (arg.startsWith("--")) {
      if (!Object.hasOwn(longFlags, arg)) return fail(`${command}: unrecognized option '${arg}'`);
      flags.add(longFlags[arg]);
    } else if (arg.startsWith("-") && arg !== "-") {
      for (const flag of arg.slice(1)) {
        if (!shortFlags.includes(flag)) return fail(`${command}: invalid option -- '${flag}'`);
        flags.add(flag);
      }
    } else {
      operands.push(arg);
    }
  }

  return { flags, operands };
};

const quoteName = (name: string) => (!name || /[\s'"\\]/.test(name) ? `'${name}'` : name);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SIX_MONTHS_MS = 15_778_476_000;
const BLOCK_SIZE = 4096;

const formatDate = (date: Date) => {
  const age = Date.now() - date.getTime();
  const time =
    age >= 0 && age < SIX_MONTHS_MS
      ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
      : String(date.getFullYear()).padStart(5);
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2)} ${time}`;
};

type Entry = { name: string; node: FsNode };

const nameSegment = ({ name, node }: Entry): Segment => ({
  text: name,
  tone: node.type === "dir" ? "dir" : undefined,
});

const longListing = (entries: Entry[]): OutputLine[] => {
  const rows = entries.map(({ node }) => ({
    mode: node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--",
    links: String(
      node.type === "dir" ? 2 + [...node.children.values()].filter((child) => child.type === "dir").length : 1,
    ),
    size: String(node.type === "dir" ? BLOCK_SIZE : node.size),
  }));
  const linksWidth = Math.max(...rows.map((row) => row.links.length));
  const sizeWidth = Math.max(...rows.map((row) => row.size.length));

  return entries.map((entry, i) => {
    const { mode, links, size } = rows[i];
    const info = `${mode} ${links.padStart(linksWidth)} ${USER} ${USER} ${size.padStart(sizeWidth)} ${formatDate(entry.node.modified)} `;
    return [{ text: info }, nameSegment(entry)];
  });
};

const totalBlocks = (entries: Entry[]) =>
  entries.reduce((total, { node }) => total + (node.type === "dir" ? 4 : Math.ceil(node.size / BLOCK_SIZE) * 4), 0);

const listing = (entries: Entry[], long: boolean): OutputLine[] => {
  if (long) return longListing(entries);
  if (!entries.length) return [];
  return [entries.flatMap((entry, i) => (i ? [{ text: "  " }, nameSegment(entry)] : [nameSegment(entry)]))];
};

const dirEntries = (dir: DirNode, path: FsPath, showAll: boolean): Entry[] => {
  const children = [...dir.children.values()]
    .filter((child) => showAll || !child.name.startsWith("."))
    .map((node) => ({ name: node.name, node }));
  if (showAll) {
    const parent = lookup(path, "..");
    children.push({ name: ".", node: dir });
    if ("node" in parent) children.push({ name: "..", node: parent.node });
  }
  return children.sort((a, b) => compareNames(a.name, b.name));
};

const ls: Command = (args, session) => {
  const parsed = parseOptions("ls", args, "al", { "--all": "a" });
  if ("error" in parsed) return { output: parsed.error, session };

  const showAll = parsed.flags.has("a");
  const long = parsed.flags.has("l");
  const targets = parsed.operands.length ? parsed.operands : ["."];

  const errors: OutputLine[] = [];
  const files: Entry[] = [];
  const dirs: { name: string; node: DirNode; path: FsPath }[] = [];
  for (const target of targets) {
    const found = lookup(session.cwd, target);
    if ("error" in found) errors.push(`ls: cannot access '${target}': ${ERROR_MESSAGES[found.error]}`);
    else if (found.node.type === "dir") dirs.push({ name: target, node: found.node, path: found.path });
    else files.push({ name: target, node: found.node });
  }
  files.sort((a, b) => compareNames(a.name, b.name));
  dirs.sort((a, b) => compareNames(a.name, b.name));

  const blocks: OutputLine[][] = [];
  if (files.length) blocks.push(listing(files, long));
  for (const dir of dirs) {
    const entries = dirEntries(dir.node, dir.path, showAll);
    blocks.push([
      ...(targets.length > 1 ? [`${dir.name}:`] : []),
      ...(long ? [`total ${totalBlocks(entries)}`] : []),
      ...listing(entries, long),
    ]);
  }

  const output = [...errors, ...blocks.flatMap((block, i) => (i ? ["", ...block] : block))];
  return { output, session };
};

const cd: Command = (args, session) => {
  const fail = (...output: OutputLine[]) => ({ output, session });
  if (args.length > 1) return fail("bash: cd: too many arguments");

  const [target = absolutePath(HOME)] = args;
  if (target === "-") {
    if (!session.oldPwd) return fail("bash: cd: OLDPWD not set");
    return {
      output: [absolutePath(session.oldPwd)],
      session: { cwd: session.oldPwd, oldPwd: session.cwd },
    };
  }
  if (target.startsWith("-")) {
    return fail(`bash: cd: ${target}: invalid option`, "cd: usage: cd [-L|[-P [-e]] [-@]] [dir]");
  }

  if (!target) return { output: [], session };

  const found = lookup(session.cwd, target);
  if ("error" in found) return fail(`bash: cd: ${target}: ${ERROR_MESSAGES[found.error]}`);
  if (found.node.type !== "dir") return fail(`bash: cd: ${target}: ${ERROR_MESSAGES.ENOTDIR}`);
  return { output: [], session: { cwd: found.path, oldPwd: session.cwd } };
};

const cat: Command = (args, session) => {
  const parsed = parseOptions("cat", args, "");
  if ("error" in parsed) return { output: parsed.error, session };

  const output = parsed.operands.flatMap((target): OutputLine[] => {
    const found = lookup(session.cwd, target);
    if ("error" in found) return [`cat: ${quoteName(target)}: ${ERROR_MESSAGES[found.error]}`];
    if (found.node.type === "dir") return [`cat: ${quoteName(target)}: Is a directory`];
    return found.node.content;
  });
  return { output, session };
};

const clear: Command = (_args, session) => ({ output: [], session, clear: true });

const COMMANDS = new Map<string, Command>([
  ["ls", ls],
  ["cd", cd],
  ["cat", cat],
  ["clear", clear],
]);

export const COMMAND_NAMES = [...COMMANDS.keys(), ...ALIASES.keys()].sort();

export const execute = (line: string, session: Session): CommandResult => {
  const [name, ...args] = tokenize(expandAlias(line));
  if (name === undefined) return { output: [], session };

  const command = COMMANDS.get(name);
  if (!command) return { output: [`bash: ${name}: command not found`], session };
  return command(args, session);
};
