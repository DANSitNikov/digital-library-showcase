"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useLocale } from "next-intl";
import { z } from "zod";
import Card from "../Card";
import Input from "../Input";
import Text from "../Text";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useGetBooks } from "@/app/hooks/useGetBooks";

type SearchFormValues = {
  query: string;
};

const searchSchema = z.object({
  query: z.string().trim().min(3, "Enter at least 3 characters"),
});

const Search = () => {
  const locale = useLocale();
  const methods = useForm<SearchFormValues>({
    defaultValues: {
      query: "programming",
    },
    mode: "onChange",
    resolver: zodResolver(searchSchema),
  });

  const query = useWatch({
    control: methods.control,
    name: "query",
  });
  const debouncedQuery = useDebounce(query ?? "", 350).trim();

  const { data, error, isError, isFetching, isLoading } = useGetBooks({
    enabled: methods.formState.isValid && debouncedQuery.length > 0,
    limit: 50,
    q: debouncedQuery,
  });

  const books = data?.docs ?? [];

  return (
    <section>
      <Text component="h2" size="text-2xl" weight="bold">
        Book Search
      </Text>
      <FormProvider {...methods}>
        <div style={{ marginTop: "1rem" }}>
          <Input
            label="Search books"
            name="query"
            placeholder="Try: programming, design patterns, architecture..."
          />
        </div>
      </FormProvider>

      <div style={{ marginTop: "1rem" }}>
        {isLoading || isFetching ? (
          <Text component="p">Loading books...</Text>
        ) : null}
        {isError ? (
          <Text component="p">
            {(error as Error)?.message || "Something went wrong"}
          </Text>
        ) : null}
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          marginTop: "1rem",
        }}
      >
        {books.map((book) => {
          const bookId = book.key.split("/").filter(Boolean).pop() ?? "unknown";
          const coverImage = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "/window.svg";

          return (
            <Card
              author={book.author_name?.[0] ?? "Unknown author"}
              blurb={`First published: ${book.first_publish_year ?? "Unknown"}`}
              coverImage={coverImage}
              genre={book.subject?.[0] ?? "General"}
              href={`/${locale}/book/${bookId}`}
              key={book.key}
              pages={book.number_of_pages_median ?? 0}
              title={book.title}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Search;
