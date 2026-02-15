import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "./index";
import InputSkeleton from "./InputSkeleton";

const sizeOptions = ["sm", "md", "lg", "xl"];
const weightOptions = ["regular", "medium", "semibold", "bold"];
const typeOptions = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
  "number",
];
type InputStoryArgs = Omit<ComponentProps<typeof Input>, "name">;
const inputSchema = z.object({
  value: z.string().min(1, "Name is required"),
});
type InputFormValues = z.infer<typeof inputSchema>;

const InputPlayground = (args: InputStoryArgs) => {
  const form = useForm<InputFormValues>({
    mode: "onBlur",
    resolver: zodResolver(inputSchema),
    defaultValues: { value: "" },
  });

  return (
    <FormProvider {...form}>
      <form style={{ maxWidth: "28rem" }}>
        <Input {...args} name="value" />
      </form>
    </FormProvider>
  );
};

const meta = {
  title: "Components/Form/Input",
  component: InputPlayground,
  argTypes: {
    label: {
      control: "text",
    },
    error: {
      control: false,
      table: { disable: true },
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
    weight: {
      control: "select",
      options: weightOptions,
    },
    type: {
      control: "select",
      options: typeOptions,
    },
  },
  args: {
    type: "text",
    label: "Name",
    size: "md",
    weight: "regular",
    placeholder: "Type here...",
    disabled: false,
  },
} satisfies Meta<InputStoryArgs>;

export default meta;
type Story = StoryObj<InputStoryArgs>;

export const Playground: Story = {
  render: (args) => <InputPlayground {...args} />,
};

export const Skeleton: Story = {
  argTypes: {
    disabled: {
      control: false,
      table: { disable: true },
    },
    error: {
      control: false,
      table: { disable: true },
    },
    label: {
      control: false,
      table: { disable: true },
    },
    placeholder: {
      control: false,
      table: { disable: true },
    },
    type: {
      control: false,
      table: { disable: true },
    },
    weight: {
      control: false,
      table: { disable: true },
    },
  },
  render: ({ size }) => (
    <div style={{ maxWidth: "28rem" }}>
      <InputSkeleton size={size} />
    </div>
  ),
};
