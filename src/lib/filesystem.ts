import type { ContentFile } from "@/content/schema";
import { USER } from "./identity";

export type FileNode = {
  type: "file";
  name: string;
  size: number;
  modified: Date;
  content: string[];
  data: unknown;
};

export type DirNode = {
  type: "dir";
  name: string;
  modified: Date;
  children: Map<string, FsNode>;
};

export type FsNode = FileNode | DirNode;

export type FsPath = string[];

export const HOME: FsPath = ["home", USER];

const CONTENT_DIR = "/src/content/";

const encoder = new TextEncoder();

const createDir = (name: string): DirNode => ({
  type: "dir",
  name,
  modified: new Date(0),
  children: new Map(),
});

const stampDirs = (dir: DirNode): number => {
  let latest = 0;
  for (const child of dir.children.values()) {
    latest = Math.max(latest, child.type === "dir" ? stampDirs(child) : child.modified.getTime());
  }
  dir.modified = new Date(latest);
  return latest;
};

const displayedLines = (name: string, content: unknown) =>
  name.endsWith(".json") ? JSON.stringify(content, null, 2).split("\n") : (content as string[]);

const buildTree = () => {
  const files = import.meta.glob<ContentFile<unknown>>(["/src/content/**/*.ts", "!/src/content/schema.ts"], {
    eager: true,
    import: "default",
  });
  const root = createDir("/");

  for (const [diskPath, file] of Object.entries(files)) {
    const dirNames = diskPath.slice(CONTENT_DIR.length).split("/");
    const name = dirNames.pop()!.replace(/\.ts$/, "");
    let dir = root;
    for (const dirName of dirNames) {
      let child = dir.children.get(dirName);
      if (child?.type !== "dir") {
        child = createDir(dirName);
        dir.children.set(dirName, child);
      }
      dir = child;
    }

    const content = displayedLines(name, file.content);
    dir.children.set(name, {
      type: "file",
      name,
      size: encoder.encode(`${content.join("\n")}\n`).length,
      modified: new Date(file.modified),
      content,
      data: file.content,
    });
  }

  stampDirs(root);
  return root;
};

const ROOT = buildTree();

export type LookupError = "ENOENT" | "ENOTDIR";

export const ERROR_MESSAGES: Record<LookupError, string> = {
  ENOENT: "No such file or directory",
  ENOTDIR: "Not a directory",
};

export type Lookup = { node: FsNode; path: FsPath } | { error: LookupError };

export const lookup = (cwd: FsPath, input: string): Lookup => {
  if (!input) return { error: "ENOENT" };

  const stack: FsNode[] = [ROOT];
  if (!input.startsWith("/")) {
    for (const name of cwd) stack.push((stack[stack.length - 1] as DirNode).children.get(name)!);
  }

  for (const name of input.split("/").filter(Boolean)) {
    const current = stack[stack.length - 1];
    if (current.type !== "dir") return { error: "ENOTDIR" };
    if (name === ".") continue;
    if (name === "..") {
      if (stack.length > 1) stack.pop();
      continue;
    }
    const child = current.children.get(name);
    if (!child) return { error: "ENOENT" };
    stack.push(child);
  }

  const node = stack[stack.length - 1];
  if (input.endsWith("/") && node.type !== "dir") return { error: "ENOTDIR" };
  return { node, path: stack.slice(1).map((entry) => entry.name) };
};

export const absolutePath = (path: FsPath) => `/${path.join("/")}`;

export const displayPath = (path: FsPath) => {
  const inHome = HOME.every((name, i) => path[i] === name);
  return inHome ? ["~", ...path.slice(HOME.length)].join("/") : absolutePath(path);
};

const sortKey = (name: string) => name.replace(/^\.+/, "").toLowerCase();

export const compareNames = (a: string, b: string) => sortKey(a).localeCompare(sortKey(b), "en") || a.localeCompare(b);

const find = (path: string) => {
  const found = lookup(HOME, path.replace(/^~(?=\/|$)/, absolutePath(HOME)));
  if ("error" in found) throw new Error(`${path}: ${ERROR_MESSAGES[found.error]}`);
  return found.node;
};

const readFile = (path: string) => {
  const node = find(path);
  if (node.type !== "file") throw new Error(`${path}: Is a directory`);
  return node;
};

export const readText = (path: string) => readFile(path).content;

export const readJson = <T>(path: string) => readFile(path).data as T;

export const readJsonDir = <T>(path: string) => {
  const dir = find(path);
  if (dir.type !== "dir") throw new Error(`${path}: ${ERROR_MESSAGES.ENOTDIR}`);
  return [...dir.children.values()]
    .filter((node): node is FileNode => node.type === "file" && node.name.endsWith(".json"))
    .sort((a, b) => compareNames(a.name, b.name))
    .map((node) => node.data as T);
};
