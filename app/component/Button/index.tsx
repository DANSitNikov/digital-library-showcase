import clsx from "clsx";
import type { ComponentPropsWithRef, ReactNode } from "react";
import Text from "../Text";
import type { TextSize, TextWeight } from "../Text";
import styles from "./Button.module.scss";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
const buttonSizeToTextSize: Record<ButtonSize, TextSize> = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xl: "text-xl",
};

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: ReactNode;
  size?: ButtonSize;
  weight?: TextWeight;
  fullWidth?: boolean;
};

const Button = ({
  children,
  className,
  disabled,
  fullWidth = false,
  ref,
  size = "md",
  weight = "semibold",
  type = "button",
  ...rest
}: ButtonProps) => {
  const resolvedClassName = clsx(
    styles.button,
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  );

  return (
    <Text
      className={resolvedClassName}
      component="button"
      disabled={disabled}
      ref={ref}
      size={buttonSizeToTextSize[size]}
      weight={weight}
      type={type}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Button;
