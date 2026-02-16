import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Error from "./index";

const meta = {
  title: "Components/Form/Error",
  component: Error,
  argTypes: {
    id: {
      control: false,
      table: { disable: true },
    },
    message: {
      control: "text",
    },
  },
  args: {
    id: "field-error",
    message: "This field is required",
  },
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
