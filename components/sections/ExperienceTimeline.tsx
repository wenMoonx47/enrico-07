"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data/experience";

export function ExperienceTimeline() {
  const t = useTranslations("experience");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="experience" className="py-24 bg-surface" aria-labelledby="exp-heading">
      <div className="section-container">
        <FadeUp>
          <TerminalPrompt
            path="~/experience"
            command="git log --all --format='%H %s'"
            className="mb-3"
          />
          <h2 id="exp-heading" className="font-mono text-2xl font-bold gradient-text mb-2">{t("title")}</h2>
          <p className="font-sans text-sm text-text-muted mb-12">{t("subtitle")}</p>
        </FadeUp>

        <div className="relative">
          {/* Vertical emerald line */}
          <div
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-from/80 via-accent-from/40 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-10 pl-8">
            {experience.map((entry, i) => (
              <FadeUp key={entry.id} delay={i * 0.1}>
                <article className="relative" aria-label={`${entry.company} — ${entry.role[locale]}`}>
                  {/* Commit dot */}
                  <div
                    className="absolute -left-[29px] top-1 size-3 rounded-full bg-accent-from border-2 border-background"
                    aria-hidden="true"
                  />

                  {/* Commit header */}
                  <div className="font-mono text-xs text-text-dim mb-1.5">
                    <span className="text-accent-from">● commit </span>
                    <span className="text-text-muted">{entry.commitHash}</span>
                    <span className="text-text-dim"> — {entry.company}/{entry.role[locale].toLowerCase().replace(/\s+/g, "-")}</span>
                  </div>

                  {/* Commit meta */}
                  <div className="font-mono text-xs text-text-dim space-y-0.5 mb-3 border-l-2 border-border pl-4">
                    <div>
                      <span className="text-text-muted">{t("author")}</span>
                    </div>
                    <div>
                      <span className="text-text-dim">Date:&nbsp;&nbsp;&nbsp;</span>
                      <span className="text-text-muted">
                        {entry.startDate} – {entry.endDate ?? t("present")}
                      </span>
                      <span className="ml-3 text-text-dim">&bull; {entry.location[locale]}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="rounded-lg border border-border bg-background p-5 hover:border-accent-from/25 transition-colors duration-150">
                    {/* Company + role */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div className="flex items-start gap-3">
                        {/* Company logo */}
                        <div className="mt-0.5 w-7 h-7 relative shrink-0 flex items-center justify-center rounded bg-surface-2 p-1" aria-hidden="true">
                          <Image
                            src={entry.logoPath}
                            alt={entry.company}
                            width={20}
                            height={20}
                            className="object-contain"
                            style={{ maxWidth: 20, maxHeight: 20 }}
                          />
                        </div>
                        <div>
                          <a
                            href={entry.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-base font-semibold text-accent-from hover:text-accent-to transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                          >
                            {entry.company}
                          </a>
                          <p className="font-sans text-sm text-text-muted mt-0.5">{entry.role[locale]}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-text-dim">
                        {entry.startDate} – {entry.endDate ?? <span className="text-success">Present</span>}
                      </span>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-1.5 mb-4" aria-label="Achievements">
                      {entry.achievements[locale].map((ach, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="font-mono text-xs text-accent-from mt-0.5 shrink-0">│</span>
                          <span className="font-sans text-sm text-text-muted leading-relaxed">{ach}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-mono text-xs bg-surface text-text-dim border-border hover:text-accent-from hover:border-accent-from/30 transition-colors duration-150"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
