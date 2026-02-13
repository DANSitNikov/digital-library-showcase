import type { Metadata } from "next";
// import { useTranslations } from "next-intl";
import Search from "@/app/component/Search";
import styles from "../page.module.css";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

const metadataByLocale: Record<
  "de" | "en" | "it",
  { description: string; title: string }
> = {
  de: {
    description: "Suche und entdecke Buecher aus OpenLibrary.",
    title: "Digitale Bibliothek",
  },
  en: {
    description: "Search and explore books from OpenLibrary.",
    title: "Digital Library",
  },
  it: {
    description: "Cerca ed esplora libri da OpenLibrary.",
    title: "Biblioteca Digitale",
  },
};

export const generateMetadata = async ({
  params,
}: LocalePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const selected =
    metadataByLocale[(locale as keyof typeof metadataByLocale) ?? "en"] ??
    metadataByLocale.en;

  return {
    description: selected.description,
    title: selected.title,
  };
};

export default function Home() {
  // const t = useTranslations("HomePage");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ marginTop: "2rem", width: "100%" }}>
          <Search />
        </div>
      </main>
    </div>
  );
}
