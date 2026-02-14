import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Select from "./index";
import type { SelectOption } from "./index";

const sizeOptions = ["sm", "md", "lg", "xl"];
const weightOptions = ["regular", "medium", "semibold", "bold"];
const selectOptions: SelectOption[] = [
  { id: "en", label: "English", value: "en" },
  { id: "it", label: "Italiano", value: "it" },
  { id: "de", label: "Deutsch", value: "de" },
];

type SelectStoryArgs = Omit<ComponentProps<typeof Select>, "name">;

const selectSchema = z.object({
  value: z.string().min(1, "Please select a value"),
});

type SelectFormValues = z.infer<typeof selectSchema>;

const SelectPlayground = (args: SelectStoryArgs) => {
  const methods = useForm<SelectFormValues>({
    defaultValues: {
      value: "en",
    },
    mode: "onBlur",
    resolver: zodResolver(selectSchema),
  });

  return (
    <FormProvider {...methods}>
      <form style={{ maxWidth: "28rem" }}>
        <Select {...args} name="value" />
      </form>
    </FormProvider>
  );
};

const meta = {
  title: "Components/Form/Select",
  component: SelectPlayground,
  argTypes: {
    label: {
      control: "text",
    },
    error: {
      control: false,
      table: { disable: true },
    },
    options: {
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
  },
  args: {
    label: "Language",
    options: selectOptions,
    size: "md",
    weight: "regular",
    disabled: false,
  },
} satisfies Meta<SelectStoryArgs>;

export default meta;
type Story = StoryObj<SelectStoryArgs>;

export const Playground: Story = {
  render: (args) => <SelectPlayground {...args} />,
};

export const Disabled: Story = {
  render: (args) => <SelectPlayground {...args} />,
  args: {
    disabled: true,
  },
};
