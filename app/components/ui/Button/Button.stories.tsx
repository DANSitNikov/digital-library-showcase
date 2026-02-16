import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import Button from "./index";
import ButtonSkeleton from "./ButtonSkeleton";

const sizeOptions = ["sm", "md", "lg", "xl"];
const weightOptions = ["regular", "medium", "semibold", "bold"];
type ButtonStoryArgs = ComponentProps<typeof Button> & { text?: string };

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    text: {
      control: "text",
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
    weight: {
      control: "select",
      options: weightOptions,
    },
    children: {
      control: false,
      table: { disable: true },
    },
    type: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    text: "Button",
    size: "md",
    weight: "semibold",
    disabled: false,
    fullWidth: false,
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Playground: Story = {
  render: ({ text = "Button", ...args }: ButtonStoryArgs) => (
    <Button {...args} type="button">
      {text}
    </Button>
  ),
  args: {
    text: "Button",
  },
};

export const Skeleton: Story = {
  argTypes: {
    disabled: {
      control: false,
      table: { disable: true },
    },
    text: {
      control: false,
      table: { disable: true },
    },
    weight: {
      control: false,
      table: { disable: true },
    },
  },
  render: ({ fullWidth, size }) => (
    <ButtonSkeleton fullWidth={fullWidth} size={size} />
  ),
  args: {
    fullWidth: false,
    size: "md",
  },
};
