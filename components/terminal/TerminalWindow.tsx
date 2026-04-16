import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  /** Filename shown in the title bar, e.g. "full_stack.dev" */
  filename: string;
  children: React.ReactNode;
  className?: string;
  /** Optional decorative code snippet rendered at 10% opacity behind content */
  bgSnippet?: string;
  /** Highlight border on hover — emerald glow variant */
  glowOnHover?: boolean;
}

/**
 * Card styled as a terminal window.
 *
 * Structure:
 *   ┌──────────────────────────────┐
 *   │  ● ● ●   filename.ext        │  ← title bar
 *   ├──────────────────────────────┤
 *   │  {children}                  │  ← content (+ optional bg snippet)
 *   └──────────────────────────────┘
 */
export function TerminalWindow({
  filename,
  children,
  className,
  bgSnippet,
  glowOnHover = false,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        // Base card
        "relative overflow-hidden rounded-lg border border-border",
        "bg-surface flex flex-col",
        "transition-all duration-150",
        glowOnHover && "hover:glow-emerald-border hover:border-accent-from/30",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-2 shrink-0">
        {/* macOS-style dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-rose-500/60" />
          <span className="size-2.5 rounded-full bg-amber-400/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
        </div>
        {/* Filename */}
        <span className="font-mono text-xs text-text-muted tracking-wide">
          {filename}
        </span>
      </div>

      {/* Content area */}
      <div className="relative flex-1">
        {/* Decorative background code snippet */}
        {bgSnippet && (
          <pre
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 p-4 font-mono text-[10px] leading-relaxed text-accent-from opacity-[0.07] overflow-hidden select-none"
          >
            {bgSnippet}
          </pre>
        )}
        {/* Actual content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
