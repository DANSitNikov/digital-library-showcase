import clsx from "clsx";
import { useId } from "react";
import type { ComponentPropsWithRef } from "react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import Text from "../../Text";
import type { TextSize, TextWeight } from "../../Text";
import Error from "../Error";
import styles from "./Input.module.scss";

export type InputSize = "sm" | "md" | "lg" | "xl";
const inputSizeToTextSize: Record<InputSize, TextSize> = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xl: "text-xl",
};

export type InputProps = Omit<
  ComponentPropsWithRef<"input">,
  | "defaultValue"
  | "id"
  | "name"
  | "onBlur"
  | "onChange"
  | "ref"
  | "size"
  | "value"
> & {
  size?: InputSize;
  weight?: TextWeight;
  label: string;
  name: FieldPath<FieldValues>;
  error?: string;
};

const Input = ({
  error,
  label,
  name,
  className,
  size = "md",
  type = "text",
  weight = "regular",
  ...rest
}: InputProps) => {
  const { field, fieldState } = useController({ name });
  const inputId = useId();
  const resolvedError = error ?? fieldState.error?.message;
  const errorId = resolvedError ? `${inputId}-error` : undefined;
  const hasError = Boolean(resolvedError);

  return (
    <div className={styles.root}>
      <Text
        className={styles.label}
        component="label"
        htmlFor={inputId}
        size="text-sm"
        weight="medium"
      >
        {label}
      </Text>
      <Text
        {...rest}
        aria-describedby={errorId}
        aria-invalid={Boolean(resolvedError) || undefined}
        component="input"
        id={inputId}
        className={clsx(
          styles.field,
          styles[size],
          hasError && styles.invalid,
          className,
        )}
        size={inputSizeToTextSize[size]}
        type={type}
        weight={weight}
        {...field}
      />
      <Error id={errorId} message={resolvedError} />
    </div>
  );
};

export default Input;
