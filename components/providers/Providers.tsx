"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { Toaster } from "sonner";
import { CommandPalette } from "@/components/CommandPalette";

// ── Command palette context ───────────────────────────────────────
interface PaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

export const usePalette = () => useContext(PaletteContext);

// ── Root providers component ──────────────────────────────────────
export function Providers({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const toggle = useCallback(() => setPaletteOpen((v) => !v), []);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);

  return (
    <PaletteContext.Provider
      value={{ open: paletteOpen, setOpen: setPaletteOpen, toggle }}
    >
      {children}

      {/* Global command palette — renders via portal */}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
          },
          classNames: {
            success: "!border-success/40",
            error:   "!border-error/40",
          },
        }}
      />
    </PaletteContext.Provider>
  );
}
