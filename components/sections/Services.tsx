"use client";

import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data/services";
import {
  Code2, Cloud, GitBranch, Brain, Network, Users,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, Cloud, GitBranch, Brain, Network, Users,
};

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-24 bg-surface" aria-labelledby="services-heading">
      <div className="section-container">
        <FadeUp>
          <TerminalPrompt path="~/services" command="ls -la" className="mb-2" />
          <h2 id="services-heading" className="sr-only">{t("title")}</h2>
          <p className="font-mono text-xs text-text-dim mb-10">{t("subtitle")}</p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon];
            const item = (t as any).raw(`items.${svc.id}`) as {
              file: string; title: string; description: string; tags: string[];
            };

            return (
              <FadeUp key={svc.id} delay={i * 0.07}>
                <TerminalWindow
                  filename={svc.filename}
                  bgSnippet={svc.bgSnippet}
                  glowOnHover
                  className="h-full"
                >
                  <div className="p-5 flex flex-col gap-3 h-full">
                    {/* Icon + title */}
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div className="p-2 rounded border border-accent-from/20 bg-accent-from/5">
                          <Icon size={16} className="text-accent-from" />
                        </div>
                      )}
                      <h3 className="font-mono text-sm font-semibold text-text-primary">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-sm text-text-muted leading-relaxed flex-1">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-mono text-[10px] bg-surface-2 text-text-dim border-border hover:border-accent-from/30 hover:text-accent-from transition-colors duration-150"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TerminalWindow>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
