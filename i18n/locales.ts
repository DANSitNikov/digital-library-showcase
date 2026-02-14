export const locales = ["en", "it", "de"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

export const localeLabels: Record<AppLocale, string> = {
  de: "Deutsch",
  en: "English",
  it: "Italiano",
};
