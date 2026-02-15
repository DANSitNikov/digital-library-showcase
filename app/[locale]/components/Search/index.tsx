"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import Input from "@/app/component/form/Input";
import { useDebounce } from "@/app/hooks/useDebounce";

type SearchFormValues = {
  query: string;
};

const searchSchema = z.object({
  query: z.string().trim().min(3, "Enter at least 3 characters"),
});

type SearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const Search = ({ onQueryChange, query }: SearchProps) => {
  const methods = useForm<SearchFormValues>({
    defaultValues: {
      query,
    },
    mode: "onChange",
    resolver: zodResolver(searchSchema),
  });

  const formQuery = useWatch({
    control: methods.control,
    name: "query",
  });
  const debouncedQuery = useDebounce(formQuery ?? "", 350).trim();
  const isValidSearch = methods.formState.isValid && debouncedQuery.length > 0;

  useEffect(() => {
    onQueryChange(isValidSearch ? debouncedQuery : "");
  }, [debouncedQuery, isValidSearch, onQueryChange]);

  return (
    <section>
      <FormProvider {...methods}>
        <form>
          <Input
            label="Search books"
            name="query"
            placeholder="Try: programming, design patterns, architecture..."
          />
        </form>
      </FormProvider>
    </section>
  );
};

export default Search;
