import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["es", "en"],
  // Default locale (Spanish)
  defaultLocale: "es",
  // Keep the default locale prefix in the URL for clarity
  localePrefix: "always",
  // Never infer locale from browser Accept-Language header
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
