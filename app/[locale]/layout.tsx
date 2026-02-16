import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import Text from "@/app/components/Text";
import { routing } from "@/i18n/routing";
import styles from "./layout.module.scss";
import LocaleSelect from "./components/LocaleSelect";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const tLayout = await getTranslations({ locale, namespace: "Layout" });

  return {
    description: tLayout("metadataDescription"),
    title: tLayout("title"),
  };
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tLayout = await getTranslations({ locale, namespace: "Layout" });

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
              {tLayout("title")}
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
              {tLayout("dataSource")}
            </Text>
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
