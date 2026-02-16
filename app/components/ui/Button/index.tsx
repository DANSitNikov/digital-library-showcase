import clsx from "clsx";
import type { ComponentPropsWithRef, ReactNode } from "react";
import Text from "../Text";
import type { TextSize, TextWeight } from "../Text";
import styles from "./Button.module.scss";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
const buttonSize: Record<ButtonSize, TextSize> = {
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
  ref,
  children,
  className,
  disabled,
  fullWidth = false,
  size = "md",
  weight = "semibold",
  type = "button",
  ...rest
}: ButtonProps) => {
  const clsxClassName = clsx(
    styles.button,
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  );

  return (
    <Text
      className={clsxClassName}
      component="button"
      disabled={disabled}
      ref={ref}
      size={buttonSize[size]}
      weight={weight}
      type={type}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Button;
