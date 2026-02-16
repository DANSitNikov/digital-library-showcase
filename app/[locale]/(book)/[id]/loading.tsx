import Skeleton from "@/app/components/ui/Skeleton";
import TextSkeleton from "@/app/components/ui/Text/TextSkeleton";
import styles from "./page.module.scss";

const BookLoadingPage = () => {
  return (
    <section className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.coverWrap}>
          <Skeleton height="100%" width="100%" />
        </div>
        <section>
          <div className={styles.content}>
            <TextSkeleton size="text-3xl" width="70%" />
            <TextSkeleton size="text-sm" width="55%" />
            <TextSkeleton size="text-sm" width="65%" />
            <TextSkeleton size="text-sm" width="50%" />
            <TextSkeleton size="text-sm" width="45%" />
            <TextSkeleton size="text-sm" width="40%" />
            <TextSkeleton size="text-sm" width="60%" />
          </div>
        </section>
        <section className={styles.secondary}>
          <TextSkeleton size="text-base" width="100%" />
          <TextSkeleton size="text-base" width="92%" />
          <TextSkeleton size="text-base" width="86%" />
          <div className={styles.links}>
            <TextSkeleton size="text-sm" width="7rem" />
            <TextSkeleton size="text-sm" width="9rem" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default BookLoadingPage;
