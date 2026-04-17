"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { TerminalCursor } from "@/components/terminal/TerminalCursor";
import { heroTitles, profile } from "@/lib/data/profile";
import { ExternalLink, ArrowDown, Circle } from "lucide-react";

type Phase = "typing" | "waiting" | "deleting";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as "es" | "en";
  const titles = heroTitles[locale];

  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  // Typing state machine
  useEffect(() => {
    const current = titles[titleIndex];

    if (phase === "typing") {
      if (displayText.length < current.length) {
        const t = setTimeout(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          75
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("waiting"), 2200);
        return () => clearTimeout(t);
      }
    }

    if (phase === "waiting") {
      const t = setTimeout(() => setPhase("deleting"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        const t = setTimeout(
          () => setDisplayText((d) => d.slice(0, -1)),
          38
        );
        return () => clearTimeout(t);
      } else {
        setTitleIndex((i) => (i + 1) % titles.length);
        setPhase("typing");
      }
    }
  }, [displayText, titleIndex, phase, titles]);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const downloadCv = useCallback(() => {
    window.open(profile.resume[locale], "_blank", "noopener");
  }, [locale]);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Dot grid + emerald glow */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(5,150,105,0.09) 0%, rgba(8,145,178,0.04) 35%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 section-container w-full flex flex-col items-start py-20">
        {/* Entrance animation wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-success/30 bg-success/5"
          >
            <Circle
              size={6}
              className="fill-success text-success animate-pulse"
            />
            <span className="font-mono text-xs text-success">
              {t("available")}
            </span>
          </motion.div>

          {/* Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="font-mono text-sm text-accent-from mb-3 flex items-center gap-2"
          >
            <span className="text-text-dim">$</span>
            <span>{t("prompt").replace("$ ", "")}</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono font-bold leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            <span className="gradient-text">{t("name")}</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-0 mb-3 min-h-[2rem]"
          >
            <span className="font-mono text-xl sm:text-2xl text-text-primary">
              {displayText}
            </span>
            <TerminalCursor />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="font-sans text-text-muted text-base sm:text-lg mb-10 max-w-xl"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            {/* Primary CTA */}
            <Button
              onClick={scrollToContact}
              className="font-mono text-sm bg-accent-from text-background hover:bg-accent-to transition-colors duration-150 gap-2 h-10 px-5"
            >
              <span className="text-background/60">$</span>
              {t("ctaContact")}
            </Button>

            {/* Secondary CTA */}
            <Button
              onClick={downloadCv}
              variant="outline"
              className="font-mono text-sm border-border text-text-muted hover:border-accent-from hover:text-accent-from transition-colors duration-150 gap-2 h-10 px-5"
            >
              <ExternalLink size={14} />
              {t("ctaResume")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-mono text-xs text-text-dim">{t("scrollHint")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-text-dim" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
