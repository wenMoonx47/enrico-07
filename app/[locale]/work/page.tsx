import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/lib/data/case-studies";
import { routing } from "@/lib/i18n/routing";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.work" });
  return { title: t("title"), description: t("description") };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as "es" | "en";
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const tWork = await getTranslations({ locale, namespace: "work" });

  return (
    <>
      <div className="py-16">
        <div className="section-container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs text-text-dim mb-8">
            <Link
              href="/"
              className="hover:text-accent-from transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              {tWork("backToHome")}
            </Link>
            <span className="text-border">/</span>
            <span className="text-text-muted">work</span>
          </div>

          <TerminalPrompt path="~/work" command="ls -la *.md" className="mb-8" />
          <h1 className="font-mono text-3xl font-bold gradient-text mb-2">{t("title")}</h1>
          <p className="font-sans text-text-muted mb-12">{t("subtitle")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {caseStudies.map((cs) => (
              <Link key={cs.slug} href={`/work/${cs.slug}` as "/"} className="group block rounded-lg border border-border bg-surface hover:border-accent-from/30 hover:glow-emerald-border transition-all duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-from">
                <div className="p-5 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent-from">{cs.company}</span>
                    <span className="font-mono text-xs text-text-dim">{cs.period.split(" – ")[0]}</span>
                  </div>
                  <h2 className="font-mono text-sm font-semibold text-text-primary leading-snug">
                    {cs.title[loc]}
                  </h2>
                  <p className="font-sans text-xs text-text-muted leading-relaxed flex-1">
                    {cs.subtitle[loc]}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cs.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-mono text-[10px] bg-surface-2 text-text-dim border-border">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-accent-from group-hover:gap-2 transition-[gap]">
                    {t("readMore")} <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
