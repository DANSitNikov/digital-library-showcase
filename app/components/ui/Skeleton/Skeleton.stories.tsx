import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Skeleton from "./index";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
  },
  args: {
    width: 320,
    height: 20,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        maxWidth: "24rem",
      }}
    >
      <Skeleton
        {...args}
        style={{ borderRadius: "var(--radius-sm)" }}
      />
    </div>
  ),
};
