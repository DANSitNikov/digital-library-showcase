"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import Input from "@/app/component/form/Input";
import { useDebounce } from "@/app/hooks/useDebounce";

type SearchFormValues = {
  query: string;
};

type SearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const Search = ({ onQueryChange, query }: SearchProps) => {
  const tSearch = useTranslations("HomePage.search");
  const form = useForm<SearchFormValues>({
    defaultValues: {
      query,
    },
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        query: z.string().trim().min(3, tSearch("validationMin")),
      }),
    ),
  });

  const formQuery = useWatch({
    control: form.control,
    name: "query",
  });
  const debouncedQuery = useDebounce(formQuery ?? "", 350).trim();
  const isValidSearch = form.formState.isValid && debouncedQuery.length > 0;

  useEffect(() => {
    onQueryChange(isValidSearch ? debouncedQuery : "");
  }, [debouncedQuery, isValidSearch, onQueryChange]);

  return (
    <section>
      <FormProvider {...form}>
        <form>
          <Input
            label={tSearch("label")}
            name="query"
            placeholder={tSearch("placeholder")}
          />
        </form>
      </FormProvider>
    </section>
  );
};

export default Search;
