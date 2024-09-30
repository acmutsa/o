"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
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
import { TagInput, Tag } from "@/components/ui/tag/tag-input";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DatePickerWithPresetsComponent } from "./date-picker-with-presets";
import { CalendarWithYears } from "./ui/calendarWithYearSelect";

const userUpdateRequiredSchema = updateUserSchema.required();

export default function OnboardingFlow() {
  const { push } = useRouter();
  const [roles, setRoles] = useState<Tag[]>([]);
  const form = useForm<z.infer<typeof userUpdateRequiredSchema>>({
    resolver: zodResolver(userUpdateRequiredSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      roles: [],
    },
  });

  const { execute: runRegisterUser, isExecuting: isLoading } = useAction(
    registerUser,
    {
      onSuccess: ({ data }) => {
        toast.dismiss();
        if (data?.success) {
          toast.success("Account setup successful!", {
            description: "You'll be redirected shortly.",
          });
          redirect("/app");
        }
      },
      onError: ({ error }) => {
        toast.success("An unknown error has occurred");
        console.log({ error });
      },
    }
  );

  async function onSubmit(values: z.infer<typeof userUpdateRequiredSchema>) {
    console.log(values);
    toast.loading("Creating Officer w/ Info...");
    const res = await runRegisterUser(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full border border-muted-foreground/80 rounded-md p-8 grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>First Name</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John" onChange={field.onChange} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Last Name</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Doe" onChange={field.onChange} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birthday</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal clear-left w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <CalendarWithYears
                      captionLayout="dropdown-buttons"
                      classNames={{ caption_label: "hidden" }}
                      mode="single"
                      selected={field.value == null ? undefined : field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      fromYear={new Date().getFullYear() - 100}
                      toYear={new Date().getFullYear()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Phone Number</span>
                </FormLabel>
                <FormControl>
                  <Input onChange={field.onChange} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full">
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="pb-2 text-left">Roles</FormLabel>
                  <FormControl className="min-h-[80px]">
                    <TagInput
                      inputFieldPostion="top"
                      {...field}
                      value={field.value!.map((val) => val.text)}
                      placeholder="Type and then press enter to add a skill..."
                      tags={roles}
                      className="sm:min-w-[450px] w-full"
                      setTags={(newTags) => {
                        setRoles(newTags);
                        field.onChange(newTags as [Tag, ...Tag[]]);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="!mt-0">
                    Please enter current officer roles
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-row-reverse">
          <Button type="submit" disabled={isLoading} className="w-fit p-5 mt-8">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>

        <FormMessage />
      </form>
    </Form>
  );
}
