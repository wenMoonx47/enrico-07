"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export function EducationSection() {
  const t = useTranslations("education");

  return (
    <section id="education" className="py-24" aria-labelledby="edu-heading">
      <div className="section-container">
        <FadeUp>
          <TerminalPrompt path="~/education" command="cat degree.md" className="mb-3" />
          <h2 id="edu-heading" className="font-mono text-2xl font-bold gradient-text mb-2">
            {t("title")}
          </h2>
          <p className="font-sans text-sm text-text-muted mb-10">{t("subtitle")}</p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="max-w-2xl rounded-lg border border-border bg-surface p-6 hover:border-accent-from/25 transition-colors duration-150">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg border border-accent-from/20 bg-accent-from/5 shrink-0">
                <GraduationCap size={22} className="text-accent-from" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-mono text-lg font-semibold text-text-primary">
                  {t("degree")}
                </h3>
                <p className="font-sans text-base text-accent-from font-medium">
                  {t("university")}
                </p>
                <div className="flex flex-wrap items-center gap-5 pt-1">
                  <div className="flex items-center gap-1.5 text-sm text-text-muted">
                    <MapPin size={13} className="text-accent-from shrink-0" />
                    <span>{t("location")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-text-muted">
                    <Calendar size={13} className="text-accent-from shrink-0" />
                    <span>{t("graduated")} {t("year")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
