"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";

import useSocket from "@/src/home/context/socket/use-socket";
import useChat from "@/src/home/context/chat/use-chat";
import useAuth from "@/src/auth/context/use-auth";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@/src/common/hooks/use-debounce";

import { ChatService } from "@/src/home/service/chat.service";

import { TMessage, TReceiverTyping } from "@/src/home/types";
import { Textarea } from "@/components/ui/textarea";

type SendMessageInputProps = {
  receiverTyping: TReceiverTyping;
  setReceiverTyping: React.Dispatch<React.SetStateAction<TReceiverTyping>>;
};
const chatService = new ChatService();
const SendMessageInput: React.FC<SendMessageInputProps> = ({
  receiverTyping,
  setReceiverTyping,
}) => {
  const [message, setMessage] = useState("");
  const [meTyping, setMeTyping] = useState(false);
  const debouncedMessage = useDebounce(message, 500);

  const { toast } = useToast();
  const { socket } = useSocket();
  const { user } = useAuth();
  const { activeChat, setMessages } = useChat();

  const audioRef = useRef<HTMLAudioElement>(null);

  // for me typingcan I use the above function
  useEffect(() => {
    socket?.emit("typing", {
      receiver: activeChat?._id,
      sender: user?._id,
      meTyping,
    });
  }, [meTyping]);

  // me is typing
  useEffect(() => {
    setMeTyping(!!debouncedMessage);
  }, [debouncedMessage]);

  // receiver is typing
  useEffect(() => {
    socket?.on(
      "receiverTyping",
      ({ typing, sender }: { typing: boolean; sender: string }) => {
        setReceiverTyping({
          typing,
          sender,
        });
      }
    );

    return () => {
      socket?.off("receiverTyping");
    };
  }, [receiverTyping]);

  async function onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (message.trim() === "") return toast({ title: "Empty message" });

    await audioRef.current?.play();

    /**
     * for sending message quickly generating the message dummy and storing it in the context
     */
    const dummyId = new Date().toISOString();
    const chatId = new Date().toISOString();
    const dummyMessage = {
      _id: dummyId,
      chat: chatId,
      message: message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sender: user?._id,
      receiver: activeChat?._id,
      read: false,
    };

    setMessages((prev: TMessage[]) => [...prev, dummyMessage]);
    setMessage("");

    /**
     * Store message to db
     */
    const { data } = await chatService.sendMessage(message, activeChat?._id);

    /**
     * emiting event after saving message to db because we need _id for edit/delete message purpose
     */
    socket?.emit("sendMessage", {
      chat: data?.chat,
      _id: data?._id,
      message: message,
      receiver: activeChat?._id,
      sender: user?._id,
    });

    /**
     * replace dummy message with actual message after saving to db
     */
    setMessages((prev: TMessage[]) =>
      prev.map((m) => (m._id === dummyId ? data : m))
    );
  }

  const handleKeys = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      setMessage((prev) => prev + "\n");
    } else if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <>
      <div className="border-t-[1px] p-2">
        <form
          onSubmit={onSubmit}
          className="flex justify-between items-center gap-x-2"
        >
          <Textarea
            rows={1}
            onKeyDown={handleKeys}
            autoComplete="off"
            autoCorrect="off"
            className="focus-visible:ring-0 focus-visible:ring-transparent resize-none"
            placeholder="Enter message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            // isLoading={loading}
            type="submit"
          >
            <Send className="w-5 h-5 text-white" />
          </Button>
        </form>
      </div>
      <audio className="hidden" ref={audioRef} src="/message_sent.mp3" />
    </>
  );
};

export default SendMessageInput;
