import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { ServicesSection } from "@/components/sections/Services";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EducationSection } from "@/components/sections/EducationSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { profile } from "@/lib/data/profile";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enricoperania.dev";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { es: `${siteUrl}/es`, en: `${siteUrl}/en`, "x-default": `${siteUrl}/es` },
    },
  };
}

/** Schema.org Person + ProfessionalService structured data */
function JsonLd({ locale }: { locale: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enricoperania.dev";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        jobTitle:
          locale === "es"
            ? "Ingeniero de Software Senior"
            : "Senior Software Engineer",
        url: siteUrl,
        email: profile.email,
        telephone: profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lima",
          addressCountry: "PE",
        },
        sameAs: [
          profile.social.linkedin,
          profile.social.github,
          profile.social.twitter,
        ],
        knowsLanguage: ["es", "en", "ja"],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad Nacional de Ingeniería",
          address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
        },
        worksFor: {
          "@type": "Organization",
          name: "Kueski",
          url: "https://kueski.com",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: profile.name,
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: "Software Engineering & AI Systems Consulting",
        areaServed: ["ES", "MX", "US", "LATAM"],
        url: siteUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function HomePage({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <>
      {/* Structured data */}
      <JsonLd locale={locale} />

      {/* 8 home sections */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CaseStudiesSection />
      <ExperienceTimeline />
      <EducationSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
    </>
  );
}
