import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/Navbar";
import { StatusBar } from "@/components/StatusBar";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "../globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enricoperania.dev";

  return {
    title: {
      default: t("title"),
      template: "%s — Enrico Perania",
    },
    description: t("description"),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/es`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
      siteName: "Enrico Perania",
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/api/og?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@ThepaulCreative",
      images: [`${siteUrl}/api/og?locale=${locale}`],
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-text-primary min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {/* Fixed top navigation */}
            <Navbar />

            {/* Main content — pt-14 clears the fixed navbar */}
            <main id="main-content" className="pt-14">
              {children}
            </main>

            {/* Fixed bottom status bar */}
            <StatusBar />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
