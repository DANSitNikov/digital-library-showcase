import BookCardSkeleton from "@/app/[locale]/components/BookCard/BookCardSkeleton";
import InputSkeleton from "@/app/component/form/Input/InputSkeleton";
import styles from "./loading.module.scss";

const LocaleLoadingPage = () => {
  return (
    <section className={styles.content}>
      <InputSkeleton size="md" />
      <div className={styles.cards}>
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
      </div>
    </section>
  );
};

export default LocaleLoadingPage;
