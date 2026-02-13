import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "../page.module.css";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          alt="Next.js logo"
          className={styles.logo}
          height={20}
          priority
          src="/next.svg"
          width={100}
        />
        <div className={styles.intro}>
          <h1>{t("title")}</h1>
          <p>
            {t.rich("description", {
              learning: (chunks) => (
                <a
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {chunks}
                </a>
              ),
              templates: (chunks) => (
                <a
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Vercel logomark"
              className={styles.logo}
              height={16}
              src="/vercel.svg"
              width={16}
            />
            {t("deployNow")}
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("documentation")}
          </a>
        </div>
      </main>
    </div>
  );
}
