import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import Button from "./index";

const sizeOptions = ["sm", "md", "lg", "xl"] as const;
const weightOptions = ["regular", "medium", "semibold", "bold"] as const;
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
    loading: false,
    disabled: false,
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
