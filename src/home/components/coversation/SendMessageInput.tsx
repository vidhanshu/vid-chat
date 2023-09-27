"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import useSocket from "../../context/socket/use-socket";
import useChat from "../../context/chat/use-chat";
import { useAuth } from "@/src/auth/context/use-auth";

import { ChatService } from "../../service/chat.service";

const formSchema = z.object({
  message: z.string(),
});

const chatService = new ChatService();
const SendMessageInput = () => {
  const { toast } = useToast();
  const { socket } = useSocket();
  const { activeChat } = useChat();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.message.trim() === "") return toast({ title: "Empty message" });
    
    await chatService.sendMessage(values.message, activeChat?._id);

    socket?.emit("sendMessage", {
      message: values.message,
      receiver: activeChat?._id,
      sender: user?._id,
    });

    form.setValue("message", "");
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
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
          <Button isLoading={isSubmitting} type="submit">
            <Send className="w-5 h-5 text-white" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendMessageInput;
