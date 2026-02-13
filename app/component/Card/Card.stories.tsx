import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "./index";

const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    title: {
      control: "text",
    },
    author: {
      control: "text",
    },
    blurb: {
      control: "text",
    },
    coverImage: {
      control: "text",
    },
    pages: {
      control: { type: "number", min: 1, step: 1 },
    },
    genre: {
      control: "text",
    },
    href: {
      control: "text",
    },
  },
  args: {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    blurb: "A portrait of wealth, longing, and the American dream.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    pages: 180,
    genre: "Classic",
    href: "/books/the-great-gatsby",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
