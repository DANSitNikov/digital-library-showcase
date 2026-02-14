import Text from "../../Text";

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
      component="p"
      id={id}
      size="text-sm"
      style={{ color: "var(--color-red-strong)" }}
      weight="medium"
    >
      {message}
    </Text>
  );
};

export default Error;
