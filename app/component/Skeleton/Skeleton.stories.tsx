import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Skeleton from "./index";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    width: {
      control: false,
      table: { disable: true },
    },
    height: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    width: undefined,
    height: undefined,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: "20rem", padding: "0.5rem" }}>
      <Skeleton
        {...args}
        style={{ borderRadius: "var(--radius-sm)", height: "1rem", width: "100%" }}
      />
    </div>
  ),
};
