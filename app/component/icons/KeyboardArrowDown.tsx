import type { ComponentPropsWithoutRef } from "react";

type KeyboardArrowDownProps = ComponentPropsWithoutRef<"svg"> & {
  decorative?: boolean;
  size?: number | string;
  title?: string;
};

const KeyboardArrowDown = ({
  decorative = true,
  size = 24,
  title = "Expand",
  ...props
}: KeyboardArrowDownProps) => {
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
        d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default KeyboardArrowDown;
