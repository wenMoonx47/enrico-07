import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import { Footer } from "@/components/Footer";
import { getCaseStudyBySlug, caseStudies } from "@/lib/data/case-studies";
import { routing } from "@/lib/i18n/routing";
import { ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((cs) => ({ locale, slug: cs.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enricoperania.dev";

  return {
    title: cs.title[locale as "es" | "en"],
    description: cs.subtitle[locale as "es" | "en"],
    alternates: {
      canonical: `${siteUrl}/${locale}/work/${slug}`,
      languages: {
        es: `${siteUrl}/es/work/${slug}`,
        en: `${siteUrl}/en/work/${slug}`,
      },
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as "es" | "en";
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <>
      <article className="py-16">
        <div className="section-container max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs text-text-dim mb-8">
            <Link
              href="/"
              className="hover:text-accent-from transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              {t("backToHome")}
            </Link>
            <span className="text-border">/</span>
            <Link
              href="/work"
              className="hover:text-accent-from transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
            >
              work
            </Link>
            <span className="text-border">/</span>
            <span className="text-text-muted truncate max-w-50">{cs.company.toLowerCase()}</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <TerminalPrompt path="~/work" command="cat case-study.md" className="mb-4" />

            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 relative shrink-0 flex items-center justify-center rounded bg-surface-2 p-1" aria-hidden="true">
                <Image
                  src={cs.logoPath}
                  alt={cs.company}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <a
                href={cs.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-accent-from hover:text-accent-to transition-colors duration-150 flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                {cs.company}
                <ExternalLink size={11} />
              </a>
              <span className="text-text-dim">·</span>
              <span className="font-mono text-xs text-text-dim">{cs.period}</span>
            </div>

            <h1 className="font-mono text-2xl sm:text-3xl font-bold text-text-primary leading-snug mb-3">
              {cs.title[loc]}
            </h1>
            <p className="font-sans text-lg text-text-muted leading-relaxed">
              {cs.subtitle[loc]}
            </p>

            {/* Role badge */}
            <div className="mt-4">
              <Badge className="font-mono text-xs bg-accent-from/10 text-accent-from border-accent-from/30">
                {cs.role[loc]}
              </Badge>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12 p-5 rounded-lg border border-border bg-surface">
            {cs.metrics.map((m) => (
              <div key={m.label[loc]} className="text-center">
                <div className="font-mono text-2xl font-bold gradient-text">
                  {m.value}{m.unit}
                </div>
                <div className="font-sans text-xs text-text-dim mt-1">
                  {m.label[loc]}
                </div>
              </div>
            ))}
          </div>

          {/* Content sections */}
          <div className="space-y-10 prose-terminal">
            {/* Context */}
            <section>
              <h2 className="font-mono text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
                <span className="text-accent-from text-sm">01.</span>
                {t("problem")}
              </h2>
              <p className="font-sans text-text-muted leading-relaxed">{cs.context[loc]}</p>
            </section>

            {/* Challenges */}
            <section>
              <h2 className="font-mono text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
                <span className="text-accent-from text-sm">02.</span>
                Desafíos / Challenges
              </h2>
              <ul className="space-y-2">
                {cs.challenges[loc].map((ch, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-accent-from mt-1 shrink-0">→</span>
                    <span className="font-sans text-sm text-text-muted leading-relaxed">{ch}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Approach */}
            <section>
              <h2 className="font-mono text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
                <span className="text-accent-from text-sm">03.</span>
                {t("approach")}
              </h2>
              <p className="font-sans text-text-muted leading-relaxed mb-4">{cs.solution[loc]}</p>
              <div className="p-4 rounded border border-border bg-surface-2">
                <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-2">
                  {t("techStack")}
                </p>
                <p className="font-sans text-sm text-text-muted">{cs.architecture[loc]}</p>
              </div>
            </section>

            {/* Outcome */}
            <section>
              <h2 className="font-mono text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
                <span className="text-accent-from text-sm">04.</span>
                {t("outcome")}
              </h2>
              <ul className="space-y-2">
                {cs.results[loc].map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <TrendingUp size={13} className="text-success mt-1 shrink-0" />
                    <span className="font-sans text-sm text-text-muted leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Tech stack pills */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">
              {t("techStack")}
            </p>
            <div className="flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-xs bg-surface-2 text-text-muted border-border hover:border-accent-from/30 hover:text-accent-from transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
