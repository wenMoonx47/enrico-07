import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Footer } from "@/components/Footer";
import { usesData } from "@/lib/data/uses";
import { routing } from "@/lib/i18n/routing";
import { Monitor, Terminal, Layers, Cloud, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.uses" });
  return { title: t("title"), description: t("description") };
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor, Terminal, Layers, Cloud,
};

export default async function UsesPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as "es" | "en";
  const t = await getTranslations({ locale, namespace: "uses" });

  return (
    <>
      <div className="py-16">
        <div className="section-container">
          <TerminalPrompt path="~/uses" command="cat setup.md" className="mb-6" />
          <h1 className="font-mono text-3xl font-bold gradient-text mb-2">{t("title")}</h1>
          <p className="font-sans text-text-muted mb-12">{t("subtitle")}</p>

          <div className="space-y-8">
            {usesData.map((category) => {
              const Icon = ICON_MAP[category.icon] ?? Monitor;
              const categoryLabel = (t as any)(`categories.${category.id}`);

              return (
                <TerminalWindow
                  key={category.id}
                  filename={`${category.id}.md`}
                  glowOnHover
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <Icon size={14} className="text-accent-from" />
                      <h2 className="font-mono text-sm font-semibold text-text-primary uppercase tracking-wider">
                        {categoryLabel}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          className="p-4 rounded border border-border bg-surface-2 hover:border-accent-from/25 transition-colors duration-150"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <h3 className="font-mono text-sm font-medium text-text-primary">
                              {item.name}
                            </h3>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${item.name} website`}
                                className="text-text-dim hover:text-accent-from transition-colors focus-visible:outline-none focus-visible:text-accent-from"
                              >
                                <ExternalLink size={11} />
                              </a>
                            )}
                          </div>
                          <p className="font-sans text-xs text-text-muted leading-relaxed">
                            {item.description[loc]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TerminalWindow>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
