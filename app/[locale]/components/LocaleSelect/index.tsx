"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Select from "@/app/component/ui/form/Select";
import type { AppLocale } from "@/i18n/locales";
import { localeLabels, locales } from "@/i18n/locales";

const localeOptions = locales.map((locale) => ({
  id: locale,
  label: localeLabels[locale],
  value: locale,
}));

type LocaleFormValues = {
  locale: AppLocale;
};

const LocaleSelect = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<LocaleFormValues>({
    defaultValues: {
      locale: locale as AppLocale,
    },
  });
  const selectedLocale = useWatch({
    control: form.control,
    name: "locale",
  });

  const handleLocaleChange = useCallback(
    (nextLocale: AppLocale) => {
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
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    form.reset({ locale: locale as AppLocale });
  }, [locale, form]);

  useEffect(() => {
    if (!selectedLocale) {
      return;
    }

    if (selectedLocale === locale) {
      return;
    }

    handleLocaleChange(selectedLocale);
  }, [handleLocaleChange, locale, selectedLocale]);

  return (
    <FormProvider {...form}>
      <Select label="Language" name="locale" options={localeOptions} size="sm" />
    </FormProvider>
  );
};

export default LocaleSelect;
