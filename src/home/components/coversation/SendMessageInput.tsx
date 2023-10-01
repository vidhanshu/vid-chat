"use client";

import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Textarea } from "@/components/ui/textarea";

import useSocket from "@/src/home/context/socket/use-socket";
import useChat from "@/src/home/context/chat/use-chat";
import useAuth from "@/src/auth/context/use-auth";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@/src/common/hooks/use-debounce";
import { useModal } from "@/src/common/hooks/use-modal";

import { sendMessageHandler } from "@/src/home/utils/send-message-handler";

import { TReceiverTyping } from "@/src/home/types";

type SendMessageInputProps = {
  receiverTyping: TReceiverTyping;
  setReceiverTyping: React.Dispatch<React.SetStateAction<TReceiverTyping>>;
};
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
  const { onOpen } = useModal();

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
    sendMessageHandler({
      audioRef,
      receiver: activeChat?._id!,
      sender: user?._id!,
      setMessage,
      setMessages,
      message,
      socket,
    });
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
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              onOpen("SEND_FILE");
            }}
          >
            <Paperclip className="w-6 h-6 text-gray-600" />
          </IconButton>
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
