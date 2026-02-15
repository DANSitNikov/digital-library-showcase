"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Select from "@/app/component/form/Select";
import type { AppLocale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";

type LocaleFormValues = {
  locale: AppLocale;
};

const LocaleSelect = () => {
  const tLocale = useTranslations("HomePage.locale");
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

  const localeOptions = locales.map((item) => ({
    id: item,
    label: tLocale(`options.${item}`),
    value: item,
  }));

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
      <form>
        <Select
          label={tLocale("label")}
          labelMode="aria"
          name="locale"
          options={localeOptions}
          size="sm"
        />
      </form>
    </FormProvider>
  );
};

export default LocaleSelect;
