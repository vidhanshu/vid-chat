"use client";

import * as z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useSocket from "@/src/home/context/socket/use-socket";
import useChat from "@/src/home/context/chat/use-chat";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/src/common/hooks/use-modal";

import chatService from "@/src/home/service/chat.service";

import { TMessage } from "@/src/home/types";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Please enter a server name",
  }),
});
const EditMessageModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { message },
  } = useModal();
  const { socket } = useSocket();
  const { toast } = useToast();
  const { activeChat, setMessages } = useChat();

  const isModalOpen = isOpen && type === "EDIT_MESSAGE";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (message) {
      form.setValue("message", message.message || "");
    }
  }, [message, form]);

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!message)
      return toast({
        title: "Info",
        description: "Message cannot be empty",
      });

    const { error } = await chatService.updateMessage(
      message?._id || "",
      values.message
    );
    if (error) return;

    setMessages((prev: TMessage[]) =>
      prev.map((m) =>
        m._id === message?._id
          ? { ...m, edited: true, message: values.message }
          : m
      )
    );

    socket?.emit("editMessage", {
      messageId: message?._id,
      receiver: activeChat?._id,
      message: values.message,
    });

    handleClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Once you edit a message, there is no going back. Please be certain.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Edited message
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isSubmitting}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMessageModal;
