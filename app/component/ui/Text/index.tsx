import { createElement } from "react";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

export type TextSize =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl";

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
  "text-xs": "0.75rem",
  "text-sm": "0.875rem",
  "text-base": "1rem",
  "text-lg": "1.125rem",
  "text-xl": "1.25rem",
  "text-2xl": "1.5rem",
  "text-3xl": "1.875rem",
  "text-4xl": "2.25rem",
  "text-5xl": "3rem",
  "text-6xl": "3.75rem",
  "text-7xl": "4.5rem",
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
  size = "text-base",
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
