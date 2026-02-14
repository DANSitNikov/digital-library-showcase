import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "./index";

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
  const methods = useForm<InputFormValues>({
    mode: "onBlur",
    resolver: zodResolver(inputSchema),
    defaultValues: { value: "" },
  });

  return (
    <FormProvider {...methods}>
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
