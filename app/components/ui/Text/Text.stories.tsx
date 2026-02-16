import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text from "./index";
import TextSkeleton from "./TextSkeleton";

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
];

const weightOptions = ["regular", "medium", "semibold", "bold"];

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

export const Skeleton: Story = {
  args: {
    component: "p",
    size: "text-base",
  },
  argTypes: {
    component: {
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
  render: ({ size }) => (
    <div style={{ maxWidth: "20rem", padding: "0.5rem" }}>
      <TextSkeleton size={size} />
    </div>
  ),
};
