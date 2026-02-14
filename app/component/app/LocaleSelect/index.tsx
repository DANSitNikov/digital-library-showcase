"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AppLocale } from "@/i18n/locales";
import { localeLabels, locales } from "@/i18n/locales";

const localeOptions = locales.map((locale) => ({
  id: locale,
  label: localeLabels[locale],
  value: locale,
}));

const LocaleSelect = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLocaleChange = (nextLocale: string) => {
    const segments = pathname.split("/");
    const currentLocale = segments[1];

    if (locales.includes(currentLocale as AppLocale)) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    const query = searchParams.toString();
    const nextPathname = segments.join("/");

    router.replace(query ? `${nextPathname}?${query}` : nextPathname);
  };

  return (
    <select
      aria-label="Select language"
      onChange={(event) => handleLocaleChange(event.target.value)}
      value={locale}
    >
      {localeOptions.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LocaleSelect;
