/**
 * Blinking block cursor — pure CSS animation, renders server-side.
 * Respects prefers-reduced-motion via the CSS rule in globals.css.
 */
export function TerminalCursor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`cursor-blink ${className}`}
      aria-hidden="true"
    />
  );
}
