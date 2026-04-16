"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { techStack } from "@/lib/data/tech-stack";

export function TechStackSection() {
  const t = useTranslations("techStack");

  return (
    <section id="stack" className="py-24" aria-labelledby="stack-heading">
      <div className="section-container">
        <FadeUp>
          <TerminalPrompt
            path="~/stack"
            command="cat package.json | jq '.dependencies'"
            className="mb-2"
          />
          <h2 id="stack-heading" className="sr-only">{t("title")}</h2>
          <p className="font-mono text-xs text-text-dim mb-10">{t("subtitle")}</p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techStack.map((category, ci) => (
            <FadeUp key={category.id} delay={ci * 0.06}>
              <div className="rounded-lg border border-border bg-surface p-5">
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                  <span className="font-mono text-[10px] text-accent-from">~/</span>
                  <h3 className="font-mono text-xs font-semibold text-text-primary uppercase tracking-widest">
                    {(t as any)(`categories.${category.id}`)}
                  </h3>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item, ii) => (
                    <motion.span
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.06 + ii * 0.03, duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-2 py-0.5 rounded border border-border bg-surface-2 font-mono text-[11px] text-text-muted
                                 hover:border-accent-from/40 hover:text-accent-from hover:bg-accent-from/5
                                 transition-colors duration-150 cursor-default"
                    >
                      {item.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
