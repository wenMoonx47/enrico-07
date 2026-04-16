"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { profile } from "@/lib/data/profile";
import {
  User,
  Briefcase,
  Code2,
  Clock,
  Layers,
  Mail,
  Download,
  Globe,
  Terminal,
  Wrench,
} from "lucide-react";

// ── Section anchors on the home page ─────────────────────────────
const NAV_SECTIONS = [
  { id: "about",      icon: User,      labelKey: "about"      },
  { id: "services",   icon: Code2,     labelKey: "services"   },
  { id: "work",       icon: Briefcase, labelKey: "work"       },
  { id: "experience", icon: Clock,     labelKey: "experience" },
  { id: "stack",      icon: Layers,    labelKey: "stack"      },
  { id: "contact",    icon: Mail,      labelKey: "contact"    },
] as const;

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Global ⌘K command palette built with cmdk.
 * Provides: section navigation, page navigation, CV download, locale switch.
 *
 * Open/close state is managed by CommandPaletteProvider so the StatusBar
 * and keyboard shortcut both share the same state.
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const t = useTranslations("commandPalette");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Scroll to a section on the home page
  const scrollTo = (id: string) => {
    close();
    // If not on home, navigate home first then scroll
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navigate = (href: string) => {
    close();
    router.push(href as "/");
  };

  const switchLocale = (next: "es" | "en") => {
    close();
    router.replace(pathname, { locale: next });
  };

  const downloadCV = () => {
    close();
    window.open(profile.resume[locale as "es" | "en"], "_blank", "noopener");
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      // Portal renders outside the normal DOM tree to avoid stacking issues
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
        <div
          className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface-2 shadow-2xl"
          style={{ boxShadow: "0 0 0 1px rgba(52,211,153,0.15), 0 25px 50px rgba(0,0,0,0.5)" }}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Terminal size={14} className="text-accent-from shrink-0" />
            <Command.Input
              placeholder={t("placeholder")}
              className="flex-1 bg-transparent font-mono text-sm text-text-primary placeholder:text-text-dim outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-text-dim border border-border rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center font-mono text-sm text-text-muted">
              {t("noResults")}
            </Command.Empty>

            {/* ── Navigate sections ── */}
            <Command.Group
              heading={
                <span className="px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                  {t("navigate")}
                </span>
              }
            >
              {NAV_SECTIONS.map(({ id, icon: Icon, labelKey }) => (
                <Command.Item
                  key={id}
                  value={`navigate ${id} ${nav(labelKey)}`}
                  onSelect={() => scrollTo(id)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted cursor-pointer
                             data-[selected=true]:bg-surface data-[selected=true]:text-text-primary
                             hover:bg-surface hover:text-text-primary transition-colors duration-100"
                >
                  <Icon size={14} className="text-accent-from shrink-0" />
                  <span>{nav(labelKey)}</span>
                  <span className="ml-auto text-[10px] text-text-dim">#{id}</span>
                </Command.Item>
              ))}

              {/* Extra pages */}
              <Command.Item
                value="navigate uses tools setup"
                onSelect={() => navigate("/uses")}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted cursor-pointer
                           data-[selected=true]:bg-surface data-[selected=true]:text-text-primary
                           hover:bg-surface hover:text-text-primary transition-colors duration-100"
              >
                <Wrench size={14} className="text-accent-from shrink-0" />
                <span>{nav("uses")}</span>
              </Command.Item>

              <Command.Item
                value="navigate resume cv"
                onSelect={() => navigate("/resume")}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted cursor-pointer
                           data-[selected=true]:bg-surface data-[selected=true]:text-text-primary
                           hover:bg-surface hover:text-text-primary transition-colors duration-100"
              >
                <Download size={14} className="text-accent-from shrink-0" />
                <span>{nav("resume")}</span>
              </Command.Item>
            </Command.Group>

            {/* ── Actions ── */}
            <Command.Group
              heading={
                <span className="px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                  {t("actions")}
                </span>
              }
            >
              <Command.Item
                value="download cv resume pdf"
                onSelect={downloadCV}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted cursor-pointer
                           data-[selected=true]:bg-surface data-[selected=true]:text-text-primary
                           hover:bg-surface hover:text-text-primary transition-colors duration-100"
              >
                <Download size={14} className="text-accent-from shrink-0" />
                <span>{t("downloadCV")}</span>
              </Command.Item>

              <Command.Item
                value="contact message email"
                onSelect={() => scrollTo("contact")}
                className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted cursor-pointer
                           data-[selected=true]:bg-surface data-[selected=true]:text-text-primary
                           hover:bg-surface hover:text-text-primary transition-colors duration-100"
              >
                <Mail size={14} className="text-accent-from shrink-0" />
                <span>{t("openContact")}</span>
              </Command.Item>

              {locale !== "en" && (
                <Command.Item
                  value="switch language english en"
                  onSelect={() => switchLocale("en")}
                  className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted cursor-pointer
                             data-[selected=true]:bg-surface data-[selected=true]:text-text-primary
                             hover:bg-surface hover:text-text-primary transition-colors duration-100"
                >
                  <Globe size={14} className="text-accent-from shrink-0" />
                  <span>{t("switchToEn")}</span>
                </Command.Item>
              )}

              {locale !== "es" && (
                <Command.Item
                  value="switch language spanish español es"
                  onSelect={() => switchLocale("es")}
                  className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted cursor-pointer
                             data-[selected=true]:bg-surface data-[selected=true]:text-text-primary
                             hover:bg-surface hover:text-text-primary transition-colors duration-100"
                >
                  <Globe size={14} className="text-accent-from shrink-0" />
                  <span>{t("switchToEs")}</span>
                </Command.Item>
              )}
            </Command.Group>
          </Command.List>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border">
            <div className="flex items-center gap-3 text-[10px] font-mono text-text-dim">
              <span><kbd className="border border-border rounded px-1">↑↓</kbd> navegar</span>
              <span><kbd className="border border-border rounded px-1">↵</kbd> abrir</span>
            </div>
            <span className="text-[10px] font-mono text-text-dim">
              ⌘K <span className="text-text-dim">/ Ctrl+K</span>
            </span>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
}
