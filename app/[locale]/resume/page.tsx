"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, User, Briefcase, Code2 } from "lucide-react";
import { profile } from "@/lib/data/profile";

export default function ResumePage() {
  const t = useTranslations("resume");
  const locale = useLocale() as "es" | "en";
  const [viewing, setViewing] = useState<"es" | "en">(locale);

  const driveUrl = profile.resume[viewing];

  return (
    <>
      <div className="py-16 min-h-screen">
        <div className="section-container max-w-2xl">
          <TerminalPrompt path="~/resume" command="cat README.md" className="mb-6" />
          <h1 className="font-mono text-3xl font-bold gradient-text mb-2">{t("title")}</h1>
          <p className="font-sans text-text-muted mb-8">{t("subtitle")}</p>

          {/* Language selector */}
          <div className="inline-flex rounded border border-border overflow-hidden mb-8">
            {(["es", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setViewing(lang)}
                className={[
                  "px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent-from",
                  viewing === lang
                    ? "bg-accent-from text-background font-semibold"
                    : "bg-surface-2 text-text-muted hover:text-text-primary",
                ].join(" ")}
                aria-pressed={viewing === lang}
              >
                {lang === "es" ? "🇪🇸 Español" : "🇺🇸 English"}
              </button>
            ))}
          </div>

          {/* Terminal card */}
          <div className="rounded-lg border border-border bg-surface overflow-hidden">
            {/* Titlebar */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-2">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-rose-500/50" />
                <span className="size-2.5 rounded-full bg-amber-400/50" />
                <span className="size-2.5 rounded-full bg-success/50" />
              </div>
              <FileText size={12} className="text-text-dim" />
              <span className="font-mono text-xs text-text-dim">
                {viewing === "es" ? t("viewingEs") : t("viewingEn")}
              </span>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col items-center gap-6 text-center">
              {/* Icon */}
              <div className="size-16 rounded-full bg-accent-from/10 border border-accent-from/20 flex items-center justify-center">
                <FileText size={28} className="text-accent-from" />
              </div>

              {/* Info */}
              <div>
                <p className="font-mono text-sm font-semibold text-text-primary mb-1">
                  {profile.name}
                </p>
                <p className="font-sans text-sm text-text-muted">
                  {profile.title[viewing]}
                </p>
              </div>

              {/* Quick stats row */}
              <div className="flex items-center gap-6 text-center">
                <div className="flex flex-col items-center gap-1">
                  <User size={14} className="text-accent-from" />
                  <span className="font-mono text-xs text-text-dim">{profile.yearsExperience}+ yrs</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex flex-col items-center gap-1">
                  <Briefcase size={14} className="text-accent-from" />
                  <span className="font-mono text-xs text-text-dim">Lead Engineer</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex flex-col items-center gap-1">
                  <Code2 size={14} className="text-accent-from" />
                  <span className="font-mono text-xs text-text-dim">Backend · AI</span>
                </div>
              </div>

              {/* Note */}
              <p className="font-mono text-xs text-text-dim max-w-sm">
                {viewing === "es"
                  ? "El CV se actualiza directamente en Google Drive."
                  : "The CV is updated directly on Google Drive."}
              </p>

              {/* CTA */}
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="font-mono text-sm bg-accent-from text-background hover:bg-accent-to transition-colors gap-2 w-full sm:w-auto"
                >
                  <ExternalLink size={15} />
                  {viewing === "es" ? t("viewDriveEs") : t("viewDriveEn")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
