"use client";

import { useId } from "react";
import type { ComponentPropsWithRef } from "react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import Text from "../../Text";
import type { TextWeight } from "../../Text";
import Error from "../Error";

export type SelectOption = {
  id: string;
  label: string;
  value: string | number;
};

export type SelectSize = "sm" | "md" | "lg" | "xl";
const selectSizeToTextSize = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xl: "text-xl",
} as const;

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
  size = "md",
  weight = "regular",
  ...rest
}: SelectProps) => {
  const { field, fieldState } = useController({ name });
  const {
    name: fieldName,
    onBlur: fieldOnBlur,
    onChange: fieldOnChange,
    ref: fieldRef,
    value: fieldValue,
  } = field;
  const selectId = useId();
  const resolvedError = error ?? fieldState.error?.message;
  const errorId = resolvedError ? `${selectId}-error` : undefined;
  const isNumericOptions = typeof options[0]?.value === "number";
  const handleChange: ComponentPropsWithRef<"select">["onChange"] = (event) => {
    fieldOnChange(
      isNumericOptions ? Number(event.target.value) : event.target.value,
    );
  };

  return (
    <div>
      <Text
        component="label"
        htmlFor={selectId}
        size="text-sm"
        style={{ display: "block" }}
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
        name={fieldName}
        onBlur={fieldOnBlur}
        onChange={handleChange}
        ref={fieldRef}
        size={selectSizeToTextSize[size]}
        value={fieldValue != null ? String(fieldValue) : ""}
        weight={weight}
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
