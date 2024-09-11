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
import { editRoomAction } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { Room } from '@/db/schema';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  tags: z.string().optional(),
  githubRepo: z.string().optional(),
});

export default function EditRoomForm({ room }: { room: Room }) {
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name || "",
      description: room.description || "",
      tags: room.tags || "",
      githubRepo: room.githubRepo || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editRoomAction({ id: params.roomId as string, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Dev Finder is Awesome" />
              </FormControl>
              <FormDescription>
                Enter the name of the room you want to create
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="I'm working on a side project, come join me"
                />
              </FormControl>
              <FormDescription>
                Please describe about your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/ezhil56x/project"
                />
              </FormControl>
              <FormDescription>
                Enter the link to your project&apos;s GitHub repository
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
