import { cn } from "@/lib/utils";

interface TerminalPromptProps {
  /** e.g. "~/about" */
  path?: string;
  /** e.g. "cat bio.md" */
  command: string;
  className?: string;
}

/**
 * Renders a styled terminal prompt header:
 *   ~/path $ command
 *
 * Path segment is muted, $ is emerald, command is primary text.
 */
export function TerminalPrompt({
  path,
  command,
  className,
}: TerminalPromptProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 font-mono text-sm select-none",
        className
      )}
      aria-label={path ? `${path} $ ${command}` : `$ ${command}`}
    >
      {path && (
        <span className="text-text-muted">{path}</span>
      )}
      <span className="text-accent-from font-semibold">$</span>
      <span className="text-text-primary">{command}</span>
    </div>
  );
}
