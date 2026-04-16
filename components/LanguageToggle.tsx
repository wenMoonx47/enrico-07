"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  /** "pill" = both options side by side, "text" = just the inactive locale */
  variant?: "pill" | "text";
}

/**
 * Switches between ES and EN by replacing the current path with the new locale.
 * The choice is persisted automatically via the NEXT_LOCALE cookie set by next-intl.
 */
export function LanguageToggle({
  className,
  variant = "pill",
}: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  if (variant === "text") {
    const next = locale === "es" ? "en" : "es";
    return (
      <button
        onClick={() => switchLocale(next)}
        className={cn(
          "font-mono text-xs text-text-muted hover:text-accent-from transition-colors duration-150 uppercase tracking-widest",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from rounded",
          className
        )}
        aria-label={next === "en" ? "Switch to English" : "Cambiar a Español"}
      >
        {next}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex w-max items-center gap-px font-mono text-xs rounded border border-border overflow-hidden",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {(["es", "en"] as const).map((lang) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            onClick={() => switchLocale(lang)}
            disabled={active}
            className={cn(
              "px-2 py-0.5 uppercase tracking-widest transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent-from",
              active
                ? "bg-accent-from text-background font-semibold cursor-default"
                : "bg-surface-2 text-text-muted hover:text-text-primary"
            )}
            aria-pressed={active}
            aria-label={lang === "es" ? "Español" : "English"}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
