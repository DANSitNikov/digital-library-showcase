import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SearchWithBookList from "@/app/[locale]/components/SearchWithBookList";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: LocalePageProps): Promise<Metadata> => {
  const { locale } = await params;
  const tHomeMeta = await getTranslations({
    locale,
    namespace: "HomePage.metadata",
  });

  return {
    description: tHomeMeta("description"),
    title: tHomeMeta("title"),
  };
};

export default function Home() {
  return <SearchWithBookList />;
}
