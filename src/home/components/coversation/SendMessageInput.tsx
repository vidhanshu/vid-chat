"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useSocket from "../../context/socket/use-socket";
import useChat from "../../context/chat/use-chat";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/src/auth/context/use-auth";
import { useDebounce } from "@/src/common/hooks/use-debounce";

import { ChatService } from "../../service/chat.service";

import { TMessage, TReceiverTyping } from "@/src/home/types";

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.trim() === "") return toast({ title: "Empty message" });

    /**
     * for sending message quickly emitting the event before messaging saving
     */
    socket?.emit("sendMessage", {
      message: message,
      receiver: activeChat?._id,
      sender: user?._id,
    });
    
    await audioRef.current?.play();
    
    const dummyMessage = {
      _id: new Date().toISOString(),
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
     * Store message to db aramse
     */
    await chatService.sendMessage(message, activeChat?._id);
  }

  return (
    <>
      <div className="border-t-[1px] p-2">
        <form
          onSubmit={onSubmit}
          className="flex justify-between items-center gap-x-2"
        >
          <Input
            autoComplete="off"
            autoCorrect="off"
            className="focus-visible:ring-0 focus-visible:ring-transparent"
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
