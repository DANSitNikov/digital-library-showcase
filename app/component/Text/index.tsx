import { createElement } from "react";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

export type TextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "display-xs"
  | "display-sm"
  | "display-md"
  | "display-lg"
  | "display-xl"
  | "display-2xl";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";

export type TextBaseProps<C extends ElementType = "span"> = {
  size?: TextSize;
  weight?: TextWeight;
  children?: ReactNode;
  className?: string;
  component: C;
};

export type TextProps<C extends ElementType> = TextBaseProps<C> &
  Omit<ComponentPropsWithRef<C>, keyof TextBaseProps<C>>;

const textSizeInRem: Record<TextSize, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "display-xs": "1.5rem",
  "display-sm": "1.875rem",
  "display-md": "2.25rem",
  "display-lg": "3rem",
  "display-xl": "3.75rem",
  "display-2xl": "4.5rem",
};

const textWeightValue: Record<TextWeight, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const Text = <C extends ElementType>({
  children,
  className,
  component,
  ref,
  style,
  size = "md",
  weight = "regular",
  ...rest
}: TextProps<C>) => {
  return createElement(
    component,
    {
      ref,
      ...rest,
      className,
      style: {
        ...style,
        fontSize: textSizeInRem[size],
        fontWeight: textWeightValue[weight],
      },
    },
    children,
  );
};

export default Text;
