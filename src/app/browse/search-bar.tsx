"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string().max(15),
});

export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") || "",
    },
  });

  const search = query.get("search");

  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/?search=${values.search}`);
    } else {
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[400px]"
                  placeholder="Filter rooms by keywords, such as typescript, next.js,"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon size={20} className="mr-2" /> Search
        </Button>

        {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue("search", "");
              router.push("/");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
