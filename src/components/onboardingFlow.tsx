"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { updateUserSchema } from "@/db/zod";
import { useAction } from "next-safe-action/hooks";
import { registerUser } from "@/app/actions/register";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uUser } from "@/lib/types";
import { TagInput, Tag } from "./ui/tag/tag-input";
import { useState } from "react";

export default function OnboardingFlow() {
  const { push } = useRouter();
  const [roles, setRoles] = useState<Tag[]>([]);
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: new Date(),
      phone: "",
      roles: [],
    },
  });

  const { execute: runRegisterUser, result: registerUserResult } = useAction(
    registerUser,
    {
      onSuccess: ({ data }) => {
        if (data?.success) {
          console.log("Successful Registration! Redirecting soon...");
        }
      },
      onError: ({ error: { serverError, validationErrors } }) => {
        if (serverError) {
        }
      },
    }
  );

  async function onSubmit(values: uUser) {
    const res = await runRegisterUser(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={() => (
            <FormItem>
              <FormLabel>
                <span>First Name</span>
              </FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={() => (
            <FormItem>
              <FormLabel>
                <span>Last Name</span>
              </FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={() => (
            <FormItem>
              <FormLabel>
                <span>Birthday</span>
              </FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={() => (
            <FormItem>
              <FormLabel>
                <span>Phone Number</span>
              </FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="pb-2 text-left"></FormLabel>
              <FormControl className="min-h-[80px]">
                <TagInput
                  inputFieldPostion="top"
                  {...field}
                  placeholder="Type and then press enter to add a skill..."
                  tags={roles}
                  className="sm:min-w-[450px]"
                  setTags={(newTags) => {
                    setRoles(newTags);
                    field.onChange(newTags as [Tag, ...Tag[]]);
                  }}
                />
              </FormControl>
              <FormDescription className="!mt-0">
                  Please enter any positions, past or present, that you have been a part of.
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

