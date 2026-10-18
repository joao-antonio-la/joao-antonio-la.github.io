import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type SyntheticEvent } from "react";
import { TerminalFrame, TerminalPrompt } from "@/components/ui/TerminalFrame";
import { displayPath, HOME } from "@/lib/filesystem";
import { cn } from "@/lib/utils";
import { execute, type OutputLine, type Session } from "./terminal/commands";
import { complete } from "./terminal/completion";

type HistoryEntry = {
  id: number;
  path: string;
  input: string;
  output: OutputLine[];
};

const INITIAL_SESSION: Session = { cwd: HOME };
const INITIAL_COMMAND = "cat boas-vindas.txt";
const INITIAL_ENTRY: HistoryEntry = {
  id: 0,
  path: displayPath(HOME),
  input: INITIAL_COMMAND,
  output: execute(INITIAL_COMMAND, INITIAL_SESSION).output,
};

type OutputProps = {
  line: OutputLine;
};

const Output = ({ line }: OutputProps) => {
  return (
    <p className="min-h-lh wrap-break-word whitespace-pre-wrap">
      {typeof line === "string"
        ? line
        : line.map(({ text, tone }, i) => (
            <span key={i} className={cn(tone === "dir" && "text-accent-secondary")}>
              {text}
            </span>
          ))}
    </p>
  );
};

export const InteractiveTerminal = () => {
  const [session, setSession] = useState(INITIAL_SESSION);
  const [entries, setEntries] = useState([INITIAL_ENTRY]);
  const [input, setInput] = useState("");
  const [caret, setCaret] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(INITIAL_ENTRY.id + 1);
  const pendingCaret = useRef<number | null>(null);
  const lastKeyWasTab = useRef(false);
  const hintId = useId();

  const path = displayPath(session.cwd);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    if (screen) screen.scrollTop = screen.scrollHeight;
  }, [entries, input]);

  useLayoutEffect(() => {
    if (pendingCaret.current === null) return;
    inputRef.current?.setSelectionRange(pendingCaret.current, pendingCaret.current);
    pendingCaret.current = null;
  }, [input, caret]);

  const replaceInput = (value: string, position = value.length) => {
    setInput(value);
    setCaret(position);
    pendingCaret.current = position;
  };

  const appendEntry = (entryInput: string, output: OutputLine[]) => {
    const id = nextId.current++;
    setEntries((current) => [...current, { id, path, input: entryInput, output }]);
  };

  const resetLine = () => {
    setHistoryIndex(null);
    replaceInput("");
  };

  const submit = () => {
    const result = execute(input, session);
    if (result.clear) setEntries([]);
    else appendEntry(input, result.output);
    resetLine();
    setSession(result.session);
    if (input.trim()) setHistory((current) => [...current, input]);
  };

  const autocomplete = (isDoubleTab: boolean) => {
    const completion = complete(input, caret, session);
    if (completion.type === "insert") {
      replaceInput(completion.input, completion.caret);
      lastKeyWasTab.current = false;
    } else if (completion.type === "ambiguous" && isDoubleTab) {
      appendEntry(input, [completion.options]);
    }
  };

  const browseHistory = (step: -1 | 1) => {
    const index = (historyIndex ?? history.length) + step;
    if (index < 0 || index > history.length) return;
    if (historyIndex === null) setDraft(input);
    const isNewLine = index === history.length;
    setHistoryIndex(isNewLine ? null : index);
    replaceInput(isNewLine ? draft : history[index]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey, altKey, metaKey, shiftKey, currentTarget } = event;
    const hasSelection = currentTarget.selectionStart !== currentTarget.selectionEnd;
    const letter = key.toLowerCase();
    const isDoubleTab = lastKeyWasTab.current;
    lastKeyWasTab.current = key === "Tab";

    if (key === "Enter") submit();
    else if (key === "ArrowUp") browseHistory(-1);
    else if (key === "ArrowDown") browseHistory(1);
    else if (key === "Tab" && !ctrlKey && !altKey && !metaKey) {
      if (!shiftKey) autocomplete(isDoubleTab);
    } else if (ctrlKey && letter === "c" && !hasSelection) {
      appendEntry(`${input}^C`, []);
      resetLine();
    } else if (ctrlKey && letter === "l") setEntries([]);
    else if (ctrlKey && letter === "d") currentTarget.blur();
    else return;
    event.preventDefault();
  };

  const syncCaret = (event: SyntheticEvent<HTMLInputElement>) => {
    setCaret(event.currentTarget.selectionStart ?? event.currentTarget.value.length);
  };

  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <TerminalFrame
      title={`bash - ${path}`}
      contentClassName="h-146 p-0 text-sm max-sm:h-96 max-sm:p-0"
      status={
        <>
          <span>Tab completa</span>
          <span>Ctrl+D sai do terminal</span>
        </>
      }
    >
      <div
        ref={screenRef}
        onClick={focusInput}
        className="interactive-terminal h-full cursor-text overflow-y-auto p-6 leading-relaxed max-sm:p-4"
      >
        <div role="log" aria-label="Saída do terminal">
          {entries.map((entry) => (
            <div key={entry.id}>
              <TerminalPrompt path={entry.path} className="whitespace-pre-wrap">
                {entry.input}
              </TerminalPrompt>
              {entry.output.map((line, i) => (
                <Output key={i} line={line} />
              ))}
            </div>
          ))}
        </div>

        <div className="relative">
          <TerminalPrompt path={path} className="whitespace-pre-wrap">
            <span aria-hidden>
              {input.slice(0, caret)}
              <span className={cn("interactive-terminal__caret", isFocused && "interactive-terminal__caret--focused")}>
                {input[caret] ?? " "}
              </span>
              {input.slice(caret + 1)}
            </span>
          </TerminalPrompt>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              syncCaret(event);
            }}
            onSelect={syncCaret}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Comando do terminal"
            aria-describedby={hintId}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            className="pointer-events-none absolute inset-0 text-[16px] opacity-0"
          />
          <span id={hintId} className="sr-only">
            Tab completa comandos e caminhos. Ctrl+D sai do terminal.
          </span>
        </div>
      </div>
    </TerminalFrame>
  );
};
