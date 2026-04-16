"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePalette } from "@/components/providers/Providers";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

/**
 * Fixed bottom status bar — VS Code aesthetic.
 * Layout:  ● online  |  🇪🇸 ES / EN  |  Lima, Perú GMT-5  |  ⌘K for menu
 */
export function StatusBar() {
  const t = useTranslations("statusBar");
  const locale = useLocale();
  const { toggle } = usePalette();

  const flagEmoji = locale === "es" ? "🇪🇸" : "🇺🇸";

  return (
    <div
      role="status"
      aria-label="Site status bar"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40",
        "h-[var(--status-bar-height)] px-3",
        "flex items-center gap-0",
        "bg-surface-2 border-t border-border",
        "font-mono text-[11px] text-text-muted",
        "select-none"
      )}
    >
      {/* Online indicator */}
      <span className="flex items-center gap-1.5 px-2 border-r border-border h-full">
        <span className="size-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
        <span className="text-success">{t("online")}</span>
      </span>

      {/* Language toggle */}
      <span className="flex items-center gap-2 px-3 border-r border-border h-full">
        <span aria-hidden="true">{flagEmoji}</span>
        <LanguageToggle variant="pill" />
      </span>

      {/* Location / timezone */}
      <span className="hidden sm:flex items-center px-3 border-r border-border h-full">
        {t("location")}
      </span>

      {/* ⌘K hint — clickable */}
      <button
        onClick={toggle}
        className={cn(
          "flex items-center gap-1.5 px-3 h-full",
          "hover:bg-surface hover:text-text-primary transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent-from",
          "cursor-pointer ml-auto"
        )}
        aria-label="Open command palette (⌘K)"
      >
        {t("palette")}
      </button>
    </div>
  );
}
