import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text from "./index";

const sizeOptions = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
  "text-7xl",
] as const;

const weightOptions = ["regular", "medium", "semibold", "bold"] as const;

const meta = {
  title: "Components/Text",
  component: Text,
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
    className: {
      control: false,
      table: { disable: true },
    },
    component: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    text: "Readable text sample",
    size: "text-base",
    weight: "regular",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ text, ...args }) => <Text {...args}>{text}</Text>,
  args: {
    component: "p",
    text: "Readable text samplddde",
    size: "text-xl",
    weight: "bold",
  },
};
