"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Badge } from "@/components/ui/badge";
import { Lightbox, type LightboxImage } from "@/components/ui/Lightbox";
import { getFeaturedCaseStudies } from "@/lib/data/case-studies";
import { ArrowDown, ArrowRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Flow step types ────────────────────────────────────────────── */

const FLOW_STEPS = ["problem", "approach", "outcome"] as const;
type FlowStep = (typeof FLOW_STEPS)[number];

const STEP_STYLE: Record<FlowStep, string> = {
  problem:  "border-red-400/25   bg-red-400/5   text-red-300",
  approach: "border-amber-400/25  bg-amber-400/5  text-amber-300",
  outcome:  "border-emerald-400/25 bg-emerald-400/5 text-emerald-300",
};

/* ─── FlowNode ───────────────────────────────────────────────────── */

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
      <div className={cn("rounded border p-3", STEP_STYLE[step])}>
        <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70 block mb-1.5">
          {label}
        </span>
        <p className="font-sans text-sm leading-relaxed text-text-muted line-clamp-3">
          {text}
        </p>
      </div>
      {!isLast && (
        <div className="flex justify-center py-1.5 text-border">
          <ArrowDown size={13} strokeWidth={1.5} />
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

  const [lightbox, setLightbox] = useState<{
    images: LightboxImage[];
    index: number;
  } | null>(null);

  const openLightbox = (images: LightboxImage[], index: number) =>
    setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () =>
    setLightbox((lb) => lb && lb.index > 0 ? { ...lb, index: lb.index - 1 } : lb);
  const nextImage = () =>
    setLightbox((lb) => lb && lb.index < lb.images.length - 1 ? { ...lb, index: lb.index + 1 } : lb);

  return (
    <section id="work" className="py-24" aria-labelledby="work-heading">
      <div className="section-container">
        <FadeUp>
          <TerminalPrompt path="~/work" command="git log --oneline --graph" className="mb-2" />
          <h2 id="work-heading" className="sr-only">{t("title")}</h2>
          <p className="font-mono text-xs text-text-dim mb-10">{t("subtitle")}</p>
        </FadeUp>

        {/* 2-column grid gives each card more room */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((cs, i) => (
            <FadeUp key={cs.slug} delay={i * 0.08}>
              <article className="group rounded-lg border border-border bg-surface hover:border-accent-from/30 transition-all duration-200 flex flex-col h-full overflow-hidden">

                {/* ── Screenshot flowchart ─────────────────────── */}
                <div className="border-b border-border bg-surface-2/40 p-4">
                  {/* Company badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                      <Image
                        src={cs.logoPath}
                        alt={cs.company}
                        width={16}
                        height={16}
                        className="object-contain invert brightness-90"
                      />
                    </div>
                    <span className="font-mono text-xs text-text-dim">{cs.company}</span>
                    <span className="font-mono text-xs text-text-dim ml-auto">
                      {cs.period.split(" – ")[0]}
                    </span>
                  </div>

                  {/* 3 screenshots + arrows — click to enlarge */}
                  <div className="flex items-start gap-2">
                    {cs.screenshots.map((shot, idx) => {
                      const lightboxImages = cs.screenshots.map((s) => ({
                        path: s.path,
                        label: s.label[locale],
                      }));
                      return (
                        <div key={shot.path} className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                            <button
                              onClick={() => openLightbox(lightboxImages, idx)}
                              className="relative h-28 rounded overflow-hidden border border-border/50 group/img w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from"
                              aria-label={`Enlarge: ${shot.label[locale]}`}
                            >
                              <Image
                                src={shot.path}
                                alt={shot.label[locale]}
                                fill
                                className="object-cover object-top transition-transform duration-200 group-hover/img:scale-105"
                                sizes="200px"
                                priority={i === 0}
                              />
                              {/* Zoom hint overlay */}
                              <div className="absolute inset-0 bg-background/0 group-hover/img:bg-background/40 transition-colors duration-200 flex items-center justify-center">
                                <ZoomIn
                                  size={20}
                                  className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 drop-shadow"
                                />
                              </div>
                            </button>
                            <span className="font-mono text-xs text-text-dim text-center truncate">
                              {shot.label[locale]}
                            </span>
                          </div>
                          {idx < cs.screenshots.length - 1 && (
                            <ArrowRight
                              size={12}
                              strokeWidth={1.5}
                              className="text-border shrink-0 mb-5"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Card body ──────────────────────────────────── */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  {/* Title */}
                  <h3 className="font-mono text-base font-semibold text-text-primary leading-snug">
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
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.slice(0, 6).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-xs bg-surface-2 text-text-dim border-border"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {cs.tags.length > 6 && (
                      <Badge
                        variant="secondary"
                        className="font-mono text-xs bg-surface-2 text-text-dim border-border"
                      >
                        +{cs.tags.length - 6}
                      </Badge>
                    )}
                  </div>

                  {/* Read more */}
                  <Link
                    href={`/work/${cs.slug}` as "/"}
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-accent-from hover:text-accent-to transition-colors duration-150 group-hover:gap-2.5 focus-visible:outline-none focus-visible:underline"
                  >
                    {t("readMore")}
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
