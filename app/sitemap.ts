import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { caseStudies } from "@/lib/data/case-studies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enricoperania.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  // Static routes per locale
  const staticRoutes = ["", "/work", "/uses", "/resume"];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${route}`])
        ),
      },
    }))
  );

  // Case study pages
  const caseStudyEntries = locales.flatMap((locale) =>
    caseStudies.map((cs) => ({
      url: `${siteUrl}/${locale}/work/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}/work/${cs.slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...caseStudyEntries];
}
