"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import useChat from "@/src/home/context/chat/use-chat";
import useSocket from "@/src/home/context/socket/use-socket";
import { useModal } from "@/src/common/hooks/use-modal";

import chatService from "@/src/home/service/chat.service";

import { TMessage } from "@/src/home/types";

const DeleteMessageModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { socket } = useSocket();
  const { setMessages, activeChat } = useChat();
  const {
    isOpen,
    onClose,
    type,
    data: { message },
  } = useModal();

  const isModalOpen = isOpen && type === "DELETE_MESSAGE";

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const { error } = await chatService.deleteMessage(
        message?._id || "",
        message?.fileUrl
      );
      if (error) throw new Error(error);

      setMessages((prev: TMessage[]) =>
        prev.map((m) =>
          m._id === message?._id
            ? { ...m, deleted: true, message: "This message has been deleted" }
            : m
        )
      );

      socket?.emit("deleteMessage", {
        messageId: message?._id,
        receiver: activeChat?._id,
        isFileDeleted: !!message?.fileUrl,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-zinc-900 text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete ? <br /> This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 dark:bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              isLoading={isLoading}
              onClick={() => onClose()}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={onDelete} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMessageModal;
