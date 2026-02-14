import Text from "../../Text";
import styles from "./Error.module.scss";

export type ErrorProps = {
  id?: string;
  message?: string;
};

const Error = ({ id, message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <Text
      className={styles.error}
      component="p"
      id={id}
      size="text-sm"
      weight="medium"
    >
      {message}
    </Text>
  );
};

export default Error;
