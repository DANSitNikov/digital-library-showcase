import Skeleton from "@/app/component/Skeleton";
import styles from "./BookCardSkeleton.module.scss";

const BookCardSkeleton = () => {
  return (
    <article className={styles.card}>
      <Skeleton className={styles.cover} />
      <div className={styles.content}>
        <Skeleton className={styles.title} height="1.75rem" width="75%" />
        <Skeleton className={styles.line} height="1.25rem" width="60%" />
        <Skeleton className={styles.line} height="1.25rem" width="70%" />
        <Skeleton className={styles.line} height="1.25rem" width="55%" />
        <Skeleton className={styles.line} height="1.25rem" width="50%" />
      </div>
    </article>
  );
};

export default BookCardSkeleton;
