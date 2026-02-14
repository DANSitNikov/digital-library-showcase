import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Text from "@/app/component/ui/Text";
import LocaleSelect from "@/app/[locale]/components/LocaleSelect";
import type { AppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import styles from "./layout.module.scss";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const titleByLocale: Record<AppLocale, string> = {
  de: "Digitale Bibliothek",
  en: "Digital Library",
  it: "Biblioteca Digitale",
};
const footerByLocale: Record<AppLocale, string> = {
  de: "Datenquelle: OpenLibrary",
  en: "Data source: OpenLibrary",
  it: "Fonte dati: OpenLibrary",
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={styles.page}>
        <header className={styles.siteHeader} data-layout-header>
          <div className={styles.headerInner}>
            <Text
              className={styles.title}
              component="h1"
              size="text-3xl"
              weight="bold"
            >
              {titleByLocale[locale as AppLocale] ?? titleByLocale.en}
            </Text>
            <div className={styles.localeSelectWrap}>
              <LocaleSelect />
            </div>
          </div>
        </header>
        <main className={styles.siteMain}>{children}</main>
        <footer className={styles.siteFooter} data-layout-footer>
          <div className={styles.footerInner}>
            <Text component="p" size="text-sm">
              {footerByLocale[locale as AppLocale] ?? footerByLocale.en}
            </Text>
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
