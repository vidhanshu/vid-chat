"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import useChat from "../../context/chat/use-chat";
import useSocket from "../../context/socket/use-socket";
import { useAuth } from "@/src/auth/context/use-auth";

import IconButton from "@/components/ui/icon-button";
import ActionTooltip from "@/src/common/components/Tooltip";

import Conversation from "./Conversation";
import NoActiveChat from "./NoActiveChat";
import ConversationSkeleton from "./ConversationSkeleton";

import { ChatService } from "../../service/chat.service";

import { TMessage } from "../../types";
import SendMessageInput from "./SendMessageInput";
import ConversationHeader from "./ConversationHeader";
import { TChat } from "../types";

const chatService = new ChatService();
const ConversationSection = () => {
  const { user } = useAuth();
  const { onlineUsers } = useChat();
  const { socket } = useSocket();
  const {
    activeChat,
    setActiveChat,
    messages,
    loading,
    setMessages,
    activeChats,
    setActiveChats,
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [bottomRef.current, messages]);

  useEffect(() => {
    // to fetch chats if new message is recieved
    async function fetchChats() {
      const { data, error } = await chatService.getChats();
      if (!error) {
        setActiveChats(data);
      }
    }
    const getAndSetNewMessage = async (data: TMessage) => {
      // to update messages
      setMessages((prev: TMessage[]) => [...prev, data]);
      // to update last message in chats
      setActiveChats((prev: TChat[]) => {
        const chats = [...prev];
        const sender = data.sender;
        const receiver = data.receiver;
        const chatIndex = chats.findIndex((chat) => {
          const participants = chat.participants.map((p) => p._id);
          return (
            participants.includes(sender) && participants.includes(receiver)
          );
        });
        if (chatIndex !== -1) {
          chats[chatIndex].last_message = data.message;
        }
        return chats;
      });

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
  }, [socket, activeChats]);

  return (
    <div className="col-span-8 border-l-[1px] flex flex-col justify-between">
      <div className="border-b-[1px] p-2 flex justify-between items-center h-14">
        <ConversationHeader
          username={activeChat?.username}
          online={onlineUsers[activeChat?._id || ""]}
        />
        {activeChat ? (
          <ActionTooltip description="Close this chat">
            <IconButton onClick={() => setActiveChat(null)}>
              <X className="w-5 h-5 text-gray-600" />
            </IconButton>
          </ActionTooltip>
        ) : null}
      </div>
      {activeChat ? (
        loading.chats ? (
          <ConversationSkeleton />
        ) : (
          <>
            <Conversation
              ref={bottomRef}
              messages={messages}
              myId={user?._id}
              recieverUsername={activeChat?.username}
            />
            <SendMessageInput />
          </>
        )
      ) : (
        <NoActiveChat />
      )}
    </div>
  );
};

export default ConversationSection;
