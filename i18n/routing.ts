import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./locales";

export const routing = defineRouting({
  defaultLocale,
  locales,
  localeDetection: false,
  localePrefix: "always",
});
