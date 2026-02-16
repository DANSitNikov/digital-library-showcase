import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Loader from "./index";

const meta = {
  title: "Components/Loader",
  component: Loader,
  args: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
