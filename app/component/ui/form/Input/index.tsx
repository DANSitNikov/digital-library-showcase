import { useId } from "react";
import type { ComponentPropsWithRef } from "react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import Text from "../../Text";
import type { TextWeight } from "../../Text";
import Error from "../Error";

export type InputSize = "sm" | "md" | "lg" | "xl";
const inputSizeToTextSize = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xl: "text-xl",
} as const;

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
  size = "md",
  type = "text",
  weight = "regular",
  ...rest
}: InputProps) => {
  const { field, fieldState } = useController({ name });
  const {
    name: fieldName,
    onBlur: fieldOnBlur,
    onChange: fieldOnChange,
    ref: fieldRef,
    value: fieldValue,
  } = field;
  const inputId = useId();
  const resolvedError = error ?? fieldState.error?.message;
  const errorId = resolvedError ? `${inputId}-error` : undefined;

  return (
    <div>
      <Text
        component="label"
        htmlFor={inputId}
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
        component="input"
        id={inputId}
        onBlur={fieldOnBlur}
        name={fieldName}
        onChange={fieldOnChange}
        ref={fieldRef}
        size={inputSizeToTextSize[size]}
        type={type}
        value={fieldValue ?? ""}
        weight={weight}
      />
      <Error id={errorId} message={resolvedError} />
    </div>
  );
};

export default Input;
