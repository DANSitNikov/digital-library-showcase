import InputSkeleton from "@/app/components/ui/form/Input/InputSkeleton";
import styles from "./loading.module.scss";
import BookCardSkeleton from "./components/BookCard/BookCardSkeleton";

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
