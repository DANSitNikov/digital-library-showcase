import type { ComponentPropsWithRef, ReactNode } from "react";
import Text from "../Text";
import type { TextWeight } from "../Text";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
const buttonSizeToTextSize = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xl: "text-xl",
} as const;

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: ReactNode;
  size?: ButtonSize;
  weight?: TextWeight;
  loading?: boolean;
};

const Button = ({
  children,
  disabled,
  loading,
  ref,
  size = "md",
  weight = "semibold",
  type = "button",
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Text
      component="button"
      disabled={isDisabled}
      ref={ref}
      size={buttonSizeToTextSize[size]}
      weight={weight}
      type={type}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </Text>
  );
};

export default Button;
