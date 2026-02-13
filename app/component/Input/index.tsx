import { useId } from "react";
import type { ComponentPropsWithRef } from "react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import Text from "../Text";
import type { TextWeight } from "../Text";

export type InputSize = "sm" | "md" | "lg" | "xl";

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
        size="sm"
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
        size={size}
        type={type}
        value={fieldValue ?? ""}
        weight={weight}
      />
      {resolvedError ? (
        <Text component="p" id={errorId} size="sm" weight="medium">
          {resolvedError}
        </Text>
      ) : null}
    </div>
  );
};

export default Input;
