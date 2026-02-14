"use client";

import clsx from "clsx";
import { useId } from "react";
import type { ComponentPropsWithRef } from "react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import Text from "../../Text";
import type { TextSize, TextWeight } from "../../Text";
import Error from "../Error";
import styles from "./Select.module.scss";

export type SelectOption = {
  id: string;
  label: string;
  value: string | number;
};

export type SelectSize = "sm" | "md" | "lg" | "xl";
const selectSizeToTextSize: Record<SelectSize, TextSize> = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xl: "text-xl",
};

export type SelectProps = Omit<
  ComponentPropsWithRef<"select">,
  | "children"
  | "defaultValue"
  | "id"
  | "name"
  | "onBlur"
  | "onChange"
  | "ref"
  | "size"
  | "value"
> & {
  label: string;
  name: FieldPath<FieldValues>;
  options: SelectOption[];
  size?: SelectSize;
  weight?: TextWeight;
  error?: string;
};

const Select = ({
  error,
  label,
  name,
  options,
  className,
  disabled,
  size = "md",
  weight = "regular",
  ...rest
}: SelectProps) => {
  const { field, fieldState } = useController({ name });
  const selectId = useId();
  const resolvedError = error ?? fieldState.error?.message;
  const errorId = resolvedError ? `${selectId}-error` : undefined;
  const hasError = Boolean(resolvedError);
  const isNumericOptions = typeof options[0]?.value === "number";
  const handleChange: ComponentPropsWithRef<"select">["onChange"] = (event) => {
    field.onChange(
      isNumericOptions ? Number(event.target.value) : event.target.value,
    );
  };

  return (
    <div className={styles.root}>
      <Text
        className={styles.label}
        component="label"
        htmlFor={selectId}
        size="text-sm"
        weight="medium"
      >
        {label}
      </Text>
      <Text
        {...rest}
        aria-describedby={errorId}
        aria-invalid={Boolean(resolvedError) || undefined}
        component="select"
        id={selectId}
        {...field}
        className={clsx(
          styles.field,
          styles[size],
          hasError && styles.invalid,
          className,
        )}
        onChange={handleChange}
        size={selectSizeToTextSize[size]}
        value={field.value != null ? String(field.value) : ""}
        weight={weight}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </Text>
      <Error id={errorId} message={resolvedError} />
    </div>
  );
};

export default Select;
