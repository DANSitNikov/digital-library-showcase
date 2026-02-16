import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Select from "./index";
import type { SelectOption } from "./index";
import SelectSkeleton from "./SelectSkeleton";

const sizeOptions = ["sm", "md", "lg", "xl"];
const weightOptions = ["regular", "medium", "semibold", "bold"];
const labelModeOptions = ["visible", "aria"];
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
  const form = useForm<SelectFormValues>({
    defaultValues: {
      value: "en",
    },
    mode: "onBlur",
    resolver: zodResolver(selectSchema),
  });

  return (
    <FormProvider {...form}>
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
    labelMode: {
      control: "select",
      options: labelModeOptions,
    },
    weight: {
      control: "select",
      options: weightOptions,
    },
  },
  args: {
    label: "Language",
    options: selectOptions,
    labelMode: "visible",
    size: "md",
    weight: "regular",
    disabled: false,
  },
} satisfies Meta<SelectStoryArgs>;

export default meta;
type Story = StoryObj<SelectStoryArgs>;
type SelectSkeletonStoryArgs = SelectStoryArgs & {
  showLabel?: boolean;
};

export const Playground: Story = {
  render: (args) => <SelectPlayground {...args} />,
};

export const Skeleton: StoryObj<SelectSkeletonStoryArgs> = {
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
    labelMode: {
      control: false,
      table: { disable: true },
    },
    options: {
      control: false,
      table: { disable: true },
    },
    weight: {
      control: false,
      table: { disable: true },
    },
    showLabel: {
      control: "boolean",
    },
  },
  render: ({ showLabel = true, size }) => (
    <div style={{ maxWidth: "28rem" }}>
      <SelectSkeleton showLabel={showLabel} size={size} />
    </div>
  ),
  args: {
    showLabel: true,
  },
};
