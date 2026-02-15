import Skeleton from "@/app/component/Skeleton";
import TextSkeleton from "@/app/component/Text/TextSkeleton";
import styles from "./[id]/page.module.scss";

const BookSegmentLoadingPage = () => {
  return (
    <main className={styles.main}>
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
    </main>
  );
};

export default BookSegmentLoadingPage;
