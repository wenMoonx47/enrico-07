"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/lib/data/profile";
import { MapPin, Clock, GraduationCap, Wifi } from "lucide-react";

/** Filled / empty bar characters for language proficiency */
function LanguageBar({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span className="font-mono text-sm tracking-widest" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < filled ? "text-accent-from" : "text-text-dim"}>
          {i < filled ? "▰" : "▱"}
        </span>
      ))}
    </span>
  );
}

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-24" aria-labelledby="about-heading">
      <div className="section-container">
        {/* Section header */}
        <FadeUp>
          <TerminalPrompt path="~/about" command="cat bio.md" className="mb-8" />
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Bio — 2/3 width */}
          <div className="lg:col-span-2 space-y-5">
            <FadeUp delay={0.05}>
              <p className="font-sans text-text-muted leading-relaxed text-base">{t("bio1")}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans text-text-muted leading-relaxed text-base">{t("bio2")}</p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="font-sans text-text-muted leading-relaxed text-base">{t("bio3")}</p>
            </FadeUp>
          </div>

          {/* Sidebar */}
          <FadeUp delay={0.2}>
            <div className="rounded-lg border border-border bg-surface p-5 space-y-6">
              {/* Available badge */}
              <div>
                <Badge className="font-mono text-xs bg-success/10 text-success border-success/30 hover:bg-success/15">
                  <span className="size-1.5 rounded-full bg-success mr-1.5 animate-pulse inline-block" />
                  {t("availableBadge")}
                </Badge>
              </div>

              {/* Languages */}
              <div>
                <h3
                  id="about-heading"
                  className="font-mono text-xs uppercase tracking-widest text-text-dim mb-3"
                >
                  {t("languagesTitle")}
                </h3>
                <ul className="space-y-2.5" aria-label={t("languagesTitle")}>
                  {profile.languages.map((lang) => (
                    <li key={lang.code} className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-text-primary w-14">
                        {(t as any)(`languages.${lang.code}`)}
                      </span>
                      <LanguageBar filled={lang.bars} />
                      <span className="font-mono text-[10px] text-text-dim w-12 text-right">
                        {(t as any)(`languageLevels.${lang.code}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <MapPin size={13} className="text-accent-from shrink-0" />
                  <span className="font-sans">{t("location")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Clock size={13} className="text-accent-from shrink-0" />
                  <span className="font-mono text-xs">{t("timezone")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Wifi size={13} className="text-accent-from shrink-0" />
                  <span className="font-sans text-xs">Remote-first</span>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-2">
                  {t("educationTitle")}
                </h3>
                <div className="flex items-start gap-2">
                  <GraduationCap size={13} className="text-accent-from mt-0.5 shrink-0" />
                  <div>
                    <p className="font-sans text-sm text-text-primary">{t("education")}</p>
                    <p className="font-mono text-xs text-text-muted">{t("university")}</p>
                    <p className="font-mono text-xs text-text-dim">{t("graduationYear")}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
