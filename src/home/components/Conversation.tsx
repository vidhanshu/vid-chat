"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  message: z.string(),
});

const Conversation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const messages = [
    {
      id: 1,
      sender: 1,
      reciever: 2,
      message:
        "I'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for asking",
    },
    {
      id: 2,
      sender: 2,
      reciever: 1,
      message:
        "I'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for asking",
    },
    {
      id: 3,
      sender: 1,
      reciever: 2,
      message:
        "I'm fine bromther, thanks for asking, I'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for asking, I'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther, thanks for askingI'm fine bromther,",
    },
  ];

  return (
    <div className="col-span-8 border-l-[1px] flex flex-col justify-between">
      <div className="border-b-[1px] p-2">
        <h1 className="text-center font-bold">Conversation</h1>
      </div>
      <div className="h-[calc(900px_-_98px)] p-4 gap-y-4 flex flex-col overflow-y-scroll">
        {messages.map(({ id, reciever, sender, message }) => (
          <div
            className={cn(
              "p-4 rounded-md w-fit max-w-[80%]",
              sender !== 1 ? "bg-slate-100" : "bg-blue-600 text-white",
              sender !== 1 ? "" : "self-end"
            )}
            key={id}
          >
            <div className={cn("border-b-[1px] pb-2", sender === 1 ? "border-blue-700" : "")}>
              <h5>sender</h5>
            </div>
            <p className="py-2">{message}</p>
          </div>
        ))}
      </div>
      <div className="border-t-[1px] p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between items-center gap-x-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Enter message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Conversation;
