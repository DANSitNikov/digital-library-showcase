import type { ComponentPropsWithoutRef } from "react";

type ArrowBackProps = ComponentPropsWithoutRef<"svg"> & {
  decorative?: boolean;
  size?: number | string;
  title?: string;
};

const ArrowBack = ({
  decorative = true,
  size = 24,
  title = "Back",
  ...props
}: ArrowBackProps) => {
  const isDecorative = decorative && !props["aria-label"];

  return (
    <svg
      aria-hidden={isDecorative ? true : undefined}
      focusable="false"
      height={size}
      role={isDecorative ? undefined : "img"}
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {!isDecorative ? <title>{title}</title> : null}
      <path
        d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowBack;
