export const profile = {
  name: "Enrico Perania",
  title: {
    es: "Ingeniero de Software Senior · Backend & AI Systems",
    en: "Senior Software Engineer · Backend & AI Systems",
  },
  address: {
    street: "Av. Universitaria 742, Urb. Ingeniería",
    district: "Distrito de San Martín de Porres",
    city: "Lima, Perú",
    country: "PE",
  },
  phone: "+1 928-268-8561",
  email: "enricoperania@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/enrico-perania-3689ba403/",
    github: "https://github.com/ethhandy",
    twitter: "https://twitter.com/ThepaulCreative",
    twitterHandle: "@ThepaulCreative",
    whatsapp: "https://wa.me/19282688561",
  },
  languages: [
    { code: "es", name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" }, bars: 5 },
    { code: "en", name: { es: "Inglés", en: "English" }, level: { es: "Fluido", en: "Fluent" }, bars: 5 },
    { code: "ja", name: { es: "Japonés", en: "Japanese" }, level: { es: "Fluido", en: "Fluent" }, bars: 4 },
  ],
  education: {
    degree: { es: "B.Sc. en Ciencias de la Computación", en: "B.Sc. in Computer Science" },
    institution: "Universidad Nacional de Ingeniería",
    location: "Lima, Perú",
    year: 2016,
  },
  resume: {
    en: "https://docs.google.com/document/d/12lCanUWt-cXKZ_E5bKVOnvtbhr6259ClRT4qc3EbJzA/edit?usp=sharing",
    es: "https://docs.google.com/document/d/1NjXOfmBU4Jc6W6rYWrQ0d66361J7bIVPfqqJ12-CdPE/edit?usp=sharing",
  },
  timezone: "America/Lima",
  timezoneOffset: "GMT-5",
  yearsExperience: 9,
} as const;

export type Profile = typeof profile;

/** Cycling titles for the hero typing animation — keyed by locale */
export const heroTitles: Record<"es" | "en", string[]> = {
  es: [
    "Ingeniero de Software Senior",
    "Arquitecto de Sistemas Backend",
    "Especialista en Sistemas de IA",
    "Tech Lead & Mentor",
  ],
  en: [
    "Senior Software Engineer",
    "Backend Systems Architect",
    "AI Systems Specialist",
    "Tech Lead & Mentor",
  ],
};
