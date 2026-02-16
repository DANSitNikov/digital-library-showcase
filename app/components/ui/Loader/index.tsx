import clsx from "clsx";
import Sync from "../icons/Sync";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={clsx(styles.loader)}>
      <Sync decorative className={styles.icon} size="100%" />
    </div>
  );
};

export default Loader;
