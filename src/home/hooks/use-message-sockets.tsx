import React, { useEffect, useRef, useState } from "react";

import chatService from "@/src/home/service/chat.service";

import useChat from "@/src/home/context/chat/use-chat";
import useSocket from "@/src/home/context/socket/use-socket";

import { updateActiveChats } from "@/src/home/utils/update-active-chats";

import { TChat, TMessage, TReceiverTyping } from "@/src/home/types";
import { scrollInView } from "@/src/common/utils/scroll-in-view";

type useMessageSocketsReturn = {
  receiverTyping: TReceiverTyping;
  setReceiverTyping: React.Dispatch<React.SetStateAction<TReceiverTyping>>;
  bottomRef: React.RefObject<HTMLDivElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
};
const useMessageSockets = (): useMessageSocketsReturn => {
  const [receiverTyping, setReceiverTyping] = useState<TReceiverTyping>({
    typing: false,
    sender: "",
  });

  const { socket } = useSocket();
  const { setActiveChats, activeChat, activeChats, setMessages, messages } =
    useChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    scrollInView(bottomRef);
  }, [bottomRef.current, messages, receiverTyping]);

  async function fetchChats() {
    const { data, error } = await chatService.getChats();
    if (!error) {
      setActiveChats(data);
    }
  }

  useEffect(() => {
    const getAndSetNewMessage = async (data: TMessage) => {
      // to update messages, iff the message is from active chat
      if (data.sender === activeChat?._id) {
        setMessages((prev: TMessage[]) => [...prev, data]);
      }
      // play sound
      await audioRef.current?.play();
      // to update last message in chats
      setActiveChats((prev: TChat[]) => updateActiveChats(prev, data));
      // check if the message is coming from new user
      const isNewChatRequest = !activeChats.some((chat) => {
        const participants = chat.participants.map((p) => p._id);
        return (
          participants.includes(data.sender) &&
          participants.includes(data.receiver)
        );
      });

      if (isNewChatRequest) {
        // fetch chats if new chat is created
        fetchChats();
      }
    };
    socket?.on("newMessage", getAndSetNewMessage);

    return () => {
      socket?.off("newMessage", getAndSetNewMessage);
    };
  }, [socket, activeChats, activeChat]);

  useEffect(() => {
    socket?.on(
      "deleteMessage",
      async ({
        messageId,
        isFileDeleted,
      }: {
        messageId: string;
        receiver: string;
        isFileDeleted?: boolean;
      }) => {
        setMessages((prev: TMessage[]) => {
          return prev.map((m) =>
            m._id === messageId
              ? {
                  ...m,
                  deleted: true,
                  message: "This message was deleted",
                  fileUrl: isFileDeleted ? undefined : m.fileUrl,
                }
              : m
          );
        });
        // to update last message in chats
        await fetchChats();
      }
    );

    return () => {
      socket?.off("deleteMessage");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("editMessage", async ({ messageId, message }) => {
      setMessages((prev: TMessage[]) => {
        return prev.map((m) =>
          m._id === messageId ? { ...m, edited: true, message } : m
        );
      });

      // to update last message in chats
      await fetchChats();
    });

    return () => {
      socket?.off("editMessage");
    };
  }, [socket]);

  return { receiverTyping, setReceiverTyping, bottomRef, audioRef };
};

export default useMessageSockets;
