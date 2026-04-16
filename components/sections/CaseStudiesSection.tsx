"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Badge } from "@/components/ui/badge";
import { getFeaturedCaseStudies } from "@/lib/data/case-studies";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Flow step types ────────────────────────────────────────────── */

const FLOW_STEPS = ["problem", "approach", "outcome"] as const;
type FlowStep = (typeof FLOW_STEPS)[number];

const STEP_STYLE: Record<FlowStep, string> = {
  problem:  "border-red-400/25   bg-red-400/5   text-red-300",
  approach: "border-amber-400/25  bg-amber-400/5  text-amber-300",
  outcome:  "border-emerald-400/25 bg-emerald-400/5 text-emerald-300",
};

/* ─── FlowNode (text) ────────────────────────────────────────────── */

function FlowNode({
  label,
  text,
  step,
  isLast,
}: {
  label: string;
  text: string;
  step: FlowStep;
  isLast: boolean;
}) {
  return (
    <>
      <div className={cn("rounded border p-2.5", STEP_STYLE[step])}>
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest opacity-60 block mb-1">
          {label}
        </span>
        <p className="font-sans text-[11px] leading-relaxed text-text-muted line-clamp-3">
          {text}
        </p>
      </div>
      {!isLast && (
        <div className="flex justify-center py-1 text-border">
          <ArrowDown size={11} strokeWidth={1.5} />
        </div>
      )}
    </>
  );
}

/* ─── CaseStudiesSection ─────────────────────────────────────────── */

export function CaseStudiesSection() {
  const t = useTranslations("caseStudies");
  const locale = useLocale() as "es" | "en";
  const featured = getFeaturedCaseStudies();

  return (
    <section id="work" className="py-24" aria-labelledby="work-heading">
      <div className="section-container">
        <FadeUp>
          <TerminalPrompt path="~/work" command="git log --oneline --graph" className="mb-2" />
          <h2 id="work-heading" className="sr-only">{t("title")}</h2>
          <p className="font-mono text-xs text-text-dim mb-10">{t("subtitle")}</p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {featured.map((cs, i) => (
            <FadeUp key={cs.slug} delay={i * 0.08}>
              <article className="group rounded-lg border border-border bg-surface hover:border-accent-from/30 transition-all duration-200 flex flex-col h-full overflow-hidden">

                {/* ── Screenshot flowchart (3 thumbnails + arrows) ── */}
                <div className="border-b border-border bg-surface-2/40 p-3">
                  {/* company badge */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                      <Image
                        src={cs.logoPath}
                        alt={cs.company}
                        width={14}
                        height={14}
                        className="object-contain invert brightness-90"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-text-dim">{cs.company}</span>
                    <span className="font-mono text-[10px] text-text-dim ml-auto">
                      {cs.period.split(" – ")[0]}
                    </span>
                  </div>

                  {/* 3 screenshots connected by arrows */}
                  <div className="flex items-center gap-1.5">
                    {cs.screenshots.map((shot, idx) => (
                      <div key={shot.path} className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <div className="relative h-16 rounded overflow-hidden border border-border/50">
                            <Image
                              src={shot.path}
                              alt={shot.label[locale]}
                              fill
                              className="object-cover object-top"
                              sizes="120px"
                              priority={i === 0}
                            />
                          </div>
                          <span className="font-mono text-[8px] text-text-dim text-center truncate leading-tight">
                            {shot.label[locale]}
                          </span>
                        </div>
                        {idx < cs.screenshots.length - 1 && (
                          <ArrowRight
                            size={9}
                            strokeWidth={1.5}
                            className="text-border shrink-0 mb-4"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Card body ──────────────────────────────────── */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  {/* Title */}
                  <h3 className="font-mono text-sm font-semibold text-text-primary leading-snug">
                    {cs.title[locale]}
                  </h3>

                  {/* Flowchart: Problem → Approach → Outcome */}
                  <div className="flex-1">
                    {FLOW_STEPS.map((step, idx) => (
                      <FlowNode
                        key={step}
                        label={t(step)}
                        text={cs[step][locale]}
                        step={step}
                        isLast={idx === FLOW_STEPS.length - 1}
                      />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {cs.tags.slice(0, 5).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-[10px] bg-surface-2 text-text-dim border-border"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {cs.tags.length > 5 && (
                      <Badge
                        variant="secondary"
                        className="font-mono text-[10px] bg-surface-2 text-text-dim border-border"
                      >
                        +{cs.tags.length - 5}
                      </Badge>
                    )}
                  </div>

                  {/* Read more */}
                  <Link
                    href={`/work/${cs.slug}` as "/"}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-from hover:text-accent-to transition-colors duration-150 group-hover:gap-2.5 focus-visible:outline-none focus-visible:underline"
                  >
                    {t("readMore")}
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
